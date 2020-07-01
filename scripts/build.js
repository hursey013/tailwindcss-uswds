const fs = require("fs");
const path = require("path");
const sassExtract = require("sass-extract");
require("sass-extract/lib/plugins/filter");
require("sass-extract-js");

const removedPrefixes = ["ls-", "neg"];
const removedProps = [
  "background-color",
  "border-color",
  "color",
  "function",
  "outline-color",
  "palette-color",
  "text-decoration-color"
];
const renamedProps = { breakpoints: "screens", noValue: "default" };

const removePrefix = (string, source) => {
  const regex = new RegExp(source.join("|"), "gi");
  return string.replace(regex, "");
};

const renameProp = (key, source) => (source[key] ? source[key] : key);

const stringToCamelCase = string =>
  string.replace(/-([a-z])/g, g => g[1].toUpperCase());

function parseFonts(obj) {
  return Object.keys(obj)
    .filter(key => obj[key].src)
    .reduce((acc, key) => {
      const { ["display-name"]: family, src } = obj[key];

      Object.keys(src)
        .filter(style => style !== "dir")
        .forEach(style => {
          const weight = src[style];
          const array = Object.keys(weight)
            .filter(key => weight[key])
            .map(key => ({
              dir: src.dir,
              family,
              file: weight[key],
              style: style === "roman" ? "normal" : style,
              weight: key
            }));
          acc.push(...array);
        });

      return acc;
    }, []);
}

function parseValues(obj) {
  return Object.keys(obj)
    .filter(key => obj[key] && !removedProps.includes(key))
    .reduce((acc, key) => {
      const newKey = removePrefix(
        renameProp(key, renamedProps),
        removedPrefixes
      );
      if (typeof obj[key] === "object") {
        if (obj[key].slug) {
          if (obj[key].content) {
            acc[obj[newKey].slug] = obj[key].content;
          }
        } else {
          acc[stringToCamelCase(newKey)] = parseValues(obj[key]);
        }
      } else {
        acc[newKey] = obj[key].toString();
      }

      return acc;
    }, {});
}

sassExtract
  .render(
    {
      file: require.resolve("uswds/src/stylesheets/uswds.scss")
    },
    {
      plugins: [
        {
          plugin: "filter",
          options: {
            only: {
              props: [
                "$palettes-color",
                "$palette-font-system",
                "$palette-font-theme",
                "$project-font-weights",
                "$system-properties",
                "$system-typeface-tokens"
              ]
            }
          }
        },
        { plugin: "sass-extract-js", options: { camelCase: false } }
      ]
    }
  )
  .then(rendered => {
    const {
      palettesColor: {
        paletteColorRequired,
        paletteColorBasic,
        paletteColorTheme,
        paletteColorState,
        paletteColorSystem: colors
      },
      paletteFontTheme: { paletteFontTheme: fontTheme },
      paletteFontSystem: { paletteFontSystem: fontSystem },
      paletteFontTheme,
      projectFontWeights,
      systemProperties,
      systemTypefaceTokens
    } = parseValues(rendered.vars);

    const props = {
      ...systemProperties,
      borderWidth: {
        standard: {
          ...systemProperties.borderWidth.standard,
          ...systemProperties.border.standard
        },
        extended: {
          ...systemProperties.borderWidth.extended,
          ...systemProperties.border.extended
        }
      },
      colors: {
        standard: {
          ...paletteColorRequired,
          ...paletteColorBasic,
          ...paletteColorTheme,
          ...paletteColorState
        },
        extended: colors
      },
      fontSize: {
        standard: fontTheme,
        extended: fontSystem
      },
      fontWeight: {
        standard: projectFontWeights,
        extended: systemProperties.fontWeight.extended
      },
      margin: {
        standard: {
          ...systemProperties.margin.standard,
          ...systemProperties.marginHorizontal.standard,
          ...systemProperties.marginVertical.standard
        },
        extended: {
          ...systemProperties.margin.extended,
          ...systemProperties.marginHorizontal.extended,
          ...systemProperties.marginVertical.extended
        }
      }
    };

    return { colors, fonts: parseFonts(systemTypefaceTokens), props };
  })
  .then(res => {
    const { colors, fonts, props } = res;
    Object.keys(res).forEach(key => {
      fs.writeFileSync(`dist/${key}.json`, JSON.stringify(res[key]));
    });
  });
