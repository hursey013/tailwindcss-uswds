const fs = require("fs");
const path = require("path");
const mkdirp = require("mkdirp");
const sassExtract = require("sass-extract");
const {
  extractArrayValues,
  extractColorValue,
  extractStringValue,
  removePrefix,
  renameProp,
  stringToCamelCase
} = require("./helpers.js");

const removedPrefixes = ["ls-", "neg"];
const removedProps = [
  "background-color",
  "border-color",
  "color",
  "function",
  "outline-color",
  "text-decoration-color"
];
const renamedProps = { breakpoints: "screens", noValue: "default" };

function flattenFonts(obj) {
  return Object.keys(obj)
    .filter(key => obj[key].value.src)
    .reduce((acc, key) => {
      const {
        ["display-name"]: { value: family },
        src: { value: styles }
      } = obj[key].value;

      Object.keys(styles)
        .filter(style => style !== "dir")
        .forEach(style => {
          const dir = key;
          const weight = styles[style].value;
          const array = Object.keys(weight)
            .filter(key => weight[key].value)
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
          acc[stringToCamelCase(renameProp(key, renamedProps))] = flattenValues(
            value
          );
        }
      } else {
        acc[
          removePrefix(renameProp(key, renamedProps), removedPrefixes)
        ] = extractStringValue(obj[key]);
      }

      return acc;
    }, {});
}

sassExtract
  .render({
    file: path.join(
      path.dirname(require.resolve("uswds/package.json")),
      "/src/stylesheets/uswds.scss"
    )
  })
  .then(rendered => {
    const {
      ["$palettes-color"]: { value: palettesColor },
      ["$palette-font-system"]: { value: paletteFontSystem },
      ["$palette-font-theme"]: { value: paletteFontTheme },
      ["$palettes-font-misc"]: { value: paletteFontMisc },
      ["$system-properties"]: { value: systemProperties },
      ["$system-typeface-tokens"]: { value: systemTypeFaceTokens }
    } = rendered.vars.global;

    const {
      paletteColorRequired,
      paletteColorBasic,
      paletteColorTheme,
      paletteColorState,
      paletteColorSystem
    } = flattenValues(palettesColor);

    const {
      paletteFontSystem: fontSystem,
      paletteFontTheme: fontTheme
    } = flattenValues({
      ...paletteFontMisc,
      ...paletteFontSystem,
      ...paletteFontTheme
    });

    const fonts = flattenFonts(systemTypeFaceTokens);
    const system = flattenValues(systemProperties);

    const props = {
      ...system,
      borderWidth: {
        ...system.borderWidth,
        ...system.border,
        standard: {
          ...system.borderWidth.standard,
          ...system.border.standard
        },
        extended: {
          ...system.borderWidth.extended,
          ...system.border.extended
        }
      },
      colors: {
        standard: {
          ...paletteColorRequired,
          ...paletteColorBasic,
          ...paletteColorTheme,
          ...paletteColorState
        },
        extended: paletteColorSystem
      },
      fontSize: {
        standard: fontTheme,
        extended: fontSystem
      },
      margin: {
        ...system.margin,
        standard: {
          ...system.margin.standard,
          ...system.marginHorizontal.standard,
          ...system.marginVertical.standard
        },
        extended: {
          ...system.margin.extended,
          ...system.marginHorizontal.extended,
          ...system.marginVertical.extended
        }
      }
    };

    ["border", "marginHorizontal", "marginVertical"].forEach(
      e => delete props[e]
    );

    console.info("Exctracting USWDS values!");

    mkdirp("dist").then(made => {
      fs.writeFileSync("dist/colors.json", JSON.stringify(paletteColorSystem));
      fs.writeFileSync("dist/fonts.json", JSON.stringify(fonts));
      fs.writeFileSync("dist/props.json", JSON.stringify(props));
      console.info(JSON.stringify(props, null, 4));

      console.info("Finished extraction.");
    });
  });
