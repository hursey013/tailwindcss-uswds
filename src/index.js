const plugin = require("tailwindcss/plugin");
const defaultConfig = require("tailwindcss/defaultConfig");
const { parseOptions, renameProp } = require("../scripts/helpers.js");
const fonts = require("../dist/fonts.json");
const props = require("../dist/props.json");

const defaultOptions = {
  overrides: {
    borderRadius: true,
    borderWidth: {
      defaultValue: "1px"
    },
    colors: true,
    fontFamily: true,
    fontSize: true,
    fontWeight: true,
    gap: true,
    height: true,
    letterSpacing: true,
    lineHeight: true,
    margin: true,
    maxHeight: true,
    maxWidth: true,
    measure: true,
    minHeight: true,
    minWidth: true,
    opacity: true,
    order: true,
    screens: true,
    textIndent: true,
    width: true
  }
};

const convertedFontWeights = {
  normal: "400",
  bold: "700"
};

module.exports = plugin.withOptions(
  function(options) {
    const opts = {
      ...defaultOptions,
      ...options,
      overrides: {
        ...defaultOptions.overrides,
        ...options.overrides
      }
    };

    return function({ addBase, addComponents, addUtilities, e, theme }) {
      const base = [
        {
          body: {
            backgroundColor: theme("colors.white"),
            color: theme("colors.ink"),
            overflowX: "hidden"
          }
        },
        ...fonts
          .filter(font =>
            Object.values(theme("fontWeight"))
              .map(weight => renameProp(weight, convertedFontWeights))
              .includes(font.weight)
          )
          .map(font => ({
            "@font-face": {
              fontFamily: font.family,
              fontStyle: font.style,
              fontWeight: font.weight,
              fontDisplay: "fallback",
              src: `url(${options.fontPath}/${font.dir}/${font.file}.woff2) format("woff2"), url(${options.fontPath}/${font.dir}/${font.file}.woff) format("woff"), url(${options.fontPath}/${font.dir}/${font.file}.ttf) format("truetype")`
            }
          })),
        ...Object.keys(theme("fontFamily")).map(key => ({
          [`[class*=${e(`text-${key}`)}]`]: {
            fontFamily: theme("fontFamily")[key].join(", ")
          }
        }))
      ];

      addBase(base);

      const uMeasure = opts.measure
        ? Object.keys(theme("measure")).map(key => ({
            [`.${e(`measure-${key}`)}`]: { maxWidth: theme("measure")[key] }
          }))
        : {};
      const uTextIndent = opts.textIndent
        ? Object.keys(theme("textIndent")).map(key => ({
            [`.${e(`text-indent-${key}`)}`]: {
              textIndent: theme("textIndent")[key]
            }
          }))
        : {};

      addUtilities([uMeasure, uTextIndent], { variants: ["responsive"] });
    };
  },
  function(options) {
    const opts = {
      ...defaultOptions,
      ...options,
      overrides: {
        ...defaultOptions.overrides,
        ...options.overrides
      }
    };

    return {
      theme: parseOptions(opts.overrides, props)
    };
  }
);
