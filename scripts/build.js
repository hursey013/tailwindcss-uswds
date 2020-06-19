const fs = require("fs");
const path = require("path");
const mkdirp = require("mkdirp");
const sassExtract = require("sass-extract");

const rendered = sassExtract.renderSync({
  file: path.join(
    path.dirname(require.resolve("uswds/package.json")),
    "/src/stylesheets/uswds.scss"
  )
});

const filteredProps = [
  "background-color",
  "border-color",
  "box-shadow",
  "color",
  "outline-color",
  "text-decoration-color"
];

const removePrefixes = ["ls-", "neg"];

const vars = rendered.vars.global;
const colors = flattenColors(
  vars["$palettes-color"].value["palette-color"].value
);
const fontWeights = objectValueToArray(vars["$project-font-weights"].value);
const fonts = flattenFontFaces(vars["$system-typeface-tokens"].value);
const props = flattenValues(vars["$system-properties"].value);
const spacing = flattenValues(vars["$palettes-units"].value);

function flattenColors(obj) {
  return Object.keys(obj).reduce((acc, key) => {
    const color = obj[key].value;
    if (color) {
      acc[key] =
        color.a !== 1
          ? `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`
          : color.hex;
    }
    return acc;
  }, {});
}

function flattenFontFaces(obj) {
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
            .filter(key => weight[key].value && fontWeights.includes(+key))
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
        (obj[key].value || obj[key].value === 0) && !filteredProps.includes(key)
    )
    .reduce((acc, key) => {
      const { unit, value } = obj[key];
      const newKey = stringToCamelCase(key);

      if (typeof value === "string" && value.includes(",")) {
        acc[newKey] = value.split();
        return acc;
      }

      if (typeof value === "object") {
        acc[newKey] = flattenValues(value);
        return acc;
      }

      acc[newKey] = `${value}${unit ? unit : ""}`;
      return acc;
    }, {});
}

function objectValueToArray(obj) {
  return Object.keys(obj)
    .filter(key => obj[key].value)
    .map(key => obj[key].value);
}

function stringToCamelCase(str) {
  return str.replace(/-([a-z])/g, function(g) {
    return g[1].toUpperCase();
  });
}

// TODO: Strip and ignore defined prefixes

console.info("Exctracting USWDS values!");

mkdirp("dist").then(made => {
  fs.writeFileSync("dist/colors.json", JSON.stringify(colors));
  console.info(JSON.stringify(colors, null, 4));
  fs.writeFileSync("dist/fonts.json", JSON.stringify(fonts));
  console.info(JSON.stringify(fonts, null, 4));
  fs.writeFileSync("dist/props.json", JSON.stringify(props));
  console.info(JSON.stringify(props, null, 4));
  console.info("Finished extraction.");
});
