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
const renamedProps = {
  breakpoints: "screens"
};

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
            .filter(key => weight[key].value && weights.includes(+key))
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
      const { unit, value } = obj[key];

      if (value.content) {
        if (value.content.value) {
          acc[removePrefix(key)] = `${value.content.value}${
            value.content.unit ? value.content.unit : ""
          }`;
        }
        return acc;
      }

      if (value.hex) {
        acc[removePrefix(key)] =
          value.a !== 1
            ? `rgba(${value.r}, ${value.g}, ${value.b}, ${value.a})`
            : value.hex;
        return acc;
      }

      if (typeof value === "object") {
        acc[
          stringToCamelCase(renamedProps[key] ? renamedProps[key] : key)
        ] = flattenValues(value);
        return acc;
      }

      if (typeof value === "string" && value.includes(",")) {
        acc[removePrefix(key)] = value
          .split(", ")
          .map(s => (s.includes(" ") ? `'${s}'` : s));
        return acc;
      }

      acc[removePrefix(key)] = `${value}${unit ? unit : ""}`;
      return acc;
    }, {});
}

function objToArray(obj) {
  return Object.keys(obj)
    .filter(key => obj[key].value)
    .map(key => obj[key].value);
}

function removePrefix(str) {
  const regex = new RegExp(removedPrefixes.join("|"), "gi");
  return str.replace(regex, "");
}

function stringToCamelCase(str) {
  return str.replace(/-([a-z])/g, function(g) {
    return g[1].toUpperCase();
  });
}

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
      objToArray(vars["$project-font-weights"].value)
    );
    const props = flattenValues({
      ...vars["$system-properties"].value,
      colors: vars["$palettes-color"].value["palette-color"],
      fontSize: vars["$palette-font"].value["palette-font"],
      spacing: vars["$palettes-units"].value["palette-units-system-positive"]
    });

    console.info("Exctracting USWDS values!");

    mkdirp("dist").then(made => {
      fs.writeFileSync("dist/fonts.json", JSON.stringify(fonts));
      console.info(JSON.stringify(fonts, null, 4));
      fs.writeFileSync("dist/props.json", JSON.stringify(props));
      console.info(JSON.stringify(props, null, 4));
      console.info("Finished extraction.");
    });
  });
