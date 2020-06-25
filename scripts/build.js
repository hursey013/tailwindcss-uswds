const fs = require("fs");
const path = require("path");
const mkdirp = require("mkdirp");
const sassExtract = require("sass-extract");

const removedPrefixes = ["ls-", "neg"];
const removedProps = [
  "background-color",
  "border-color",
  "color",
  "noValue",
  "outline-color",
  "text-decoration-color"
];
const renamedProps = { breakpoints: "screens" };

function flattenFonts(obj, weights) {
  return Object.keys(obj)
    .filter(key => obj[key].value.src)
    .reduce((acc, key) => {
      const dir = key;
      const family = obj[key].value["display-name"].value;
      const styles = obj[key].value.src.value;

      Object.keys(styles)
        .filter(style => style !== "dir")
        .forEach(style => {
          const weight = styles[style].value;
          const array = Object.keys(weight)
            .filter(
              key => weight[key].value && objToArray(weights).includes(+key)
            )
            .map(key => ({
              dir,
              family,
              file: weight[key].value,
              style: style === "roman" ? "normal" : style,
              weight: key
            }));
          acc.push(...array);
        });

      return acc;
    }, []);
}

function flattenValues(obj) {
  return Object.keys(obj)
    .filter(
      key =>
        (obj[key].value || obj[key].value === 0) && !removedProps.includes(key)
    )
    .reduce((acc, key) => {
      const {
        unit,
        value: { content, hex, slug },
        value
      } = obj[key];

      if (typeof value === "object") {
        if (content) {
          if (content.value) {
            acc[slug.value] = extractStringValue(content);
          }
        } else if (hex) {
          acc[key] = extractColorValue(value);
        } else {
          acc[stringToCamelCase(renameProp(key))] = flattenValues(value);
        }
      } else {
        acc[removePrefix(key)] = extractStringValue(obj[key]);
      }

      return acc;
    }, {});
}

const extractArrayValues = value =>
  value.split(", ").map(s => (s.includes(" ") ? `'${s}'` : s));

const extractColorValue = ({ r, g, b, a, hex }) =>
  a !== 1 ? `rgba(${r}, ${g}, ${b}, ${a})` : hex;

const extractStringValue = ({ unit, value }) =>
  typeof value === "string" && value.includes(",")
    ? extractArrayValues(value)
    : `${value}${unit ? unit : ""}`;

const objToArray = obj =>
  Object.keys(obj)
    .filter(key => obj[key].value)
    .map(key => obj[key].value);

const removePrefix = string => {
  const regex = new RegExp(removedPrefixes.join("|"), "gi");
  return string.replace(regex, "");
};

const renameProp = key => (renamedProps[key] ? renamedProps[key] : key);

const stringToCamelCase = string =>
  string.replace(/-([a-z])/g, g => g[1].toUpperCase());

sassExtract
  .render({
    file: path.join(
      path.dirname(require.resolve("uswds/package.json")),
      "/src/stylesheets/uswds.scss"
    )
  })
  .then(rendered => {
    const vars = rendered.vars.global;
    const fonts = flattenFonts(
      vars["$system-typeface-tokens"].value,
      vars["$palettes-font-misc"].value["palette-font-weight-theme"].value
    );
    const props = flattenValues({
      ...vars["$system-properties"].value,
      colors: vars["$palettes-color"].value["palette-color"],
      fontSize: vars["$palette-font"].value["palette-font"]
    });

    console.info("Exctracting USWDS values!");

    mkdirp("dist").then(made => {
      fs.writeFileSync("dist/fonts.json", JSON.stringify(fonts));
      fs.writeFileSync("dist/props.json", JSON.stringify(props));
      console.info(JSON.stringify(props, null, 4));

      console.info("Finished extraction.");
    });
  });
