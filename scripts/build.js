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

const colors = flattenColors(
  rendered.vars.global["$palettes-color"].value["palette-color"].value
);

const fontWeights = flattenFontsWeights(
  rendered.vars.global["$project-font-weights"].value
);

const fonts = flattenFonts(
  rendered.vars.global["$system-typeface-tokens"].value
);

const spacing = flattenSpacing({
  ...rendered.vars.global["$palettes-units"].value,
  ...rendered.vars.global["$palettes-units-misc"].value
});

function flattenColors(obj) {
  return Object.keys(obj).reduce((acc, key) => {
    if (obj[key].value) {
      if (obj[key].value.a !== 1) {
        acc[
          key
        ] = `rgba(${obj[key].value.r}, ${obj[key].value.g}, ${obj[key].value.b}, ${obj[key].value.a})`;
      } else {
        acc[key] = obj[key].value.hex;
      }
    }
    return acc;
  }, {});
}

function flattenFonts(obj) {
  return Object.keys(obj)
    .filter(key => obj[key].value.src)
    .reduce((acc, key) => {
      const {
        roman: { value: normal },
        italic: { value: italic }
      } = obj[key].value.src.value;
      const dir = key;
      const family = obj[key].value["display-name"].value;
      const normalArray = Object.keys(normal)
        .filter(key => normal[key].value && fontWeights.includes(+key))
        .map(key => ({
          dir,
          family,
          file: normal[key].value,
          style: "normal",
          weight: key
        }));
      const italicArray = Object.keys(italic)
        .filter(key => italic[key].value && fontWeights.includes(+key))
        .map(key => ({
          dir,
          family,
          file: italic[key].value,
          style: "italic",
          weight: key
        }));

      acc.push(...normalArray, ...italicArray);

      return acc;
    }, []);
}

function flattenFontsWeights(obj) {
  return Object.keys(obj)
    .filter(key => obj[key].value)
    .map(key => obj[key].value);
}

function flattenSpacing(obj) {
  return Object.keys(obj).reduce((acc, key) => {
    if (typeof obj[key].value === "object") {
      return { ...acc, [key]: flattenSpacing(obj[key].value) };
    } else {
      acc[key] = `${obj[key].value}${obj[key].unit ? obj[key].unit : ""}`;
    }
    return acc;
  }, {});
}

console.info("Exctracting USWDS values!");

mkdirp("build").then(made => {
  fs.writeFileSync("build/colors.json", JSON.stringify(colors));
  console.info(JSON.stringify(colors, null, 4));
  fs.writeFileSync("build/fonts.json", JSON.stringify(fonts));
  console.info(JSON.stringify(fonts, null, 4));
  fs.writeFileSync("build/spacing.json", JSON.stringify(spacing));
  console.info(JSON.stringify(spacing, null, 4));
  console.info("Finished extraction.");
});
