const plugin = require("tailwindcss/plugin");
const fonts = require("../dist/fonts.json");
const props = require("../dist/props.json");

const defaultOptions = {
  fontPath: "~@hursey013/tailwindcss-uswds/dist/fonts",
  overrides: {
    borderRadius: "standard",
    borderWidth: "standard",
    boxShadow: "standard",
    colors: "standard",
    cursor: "standard",
    flex: "standard",
    fontFamily: "standard",
    fontFeatureSettings: "standard",
    fontSize: "standard",
    fontWeight: "standard",
    gap: "standard",
    height: "standard",
    letterSpacing: "standard",
    lineHeight: "standard",
    margin: "standard",
    maxHeight: "standard",
    maxWidth: "standard",
    measure: "standard",
    minHeight: "standard",
    minWidth: "standard",
    opacity: "standard",
    order: "standard",
    padding: "standard",
    screens: "standard",
    textIndent: "standard",
    width: "standard",
    zIndex: "standard"
  }
};

module.exports = plugin.withOptions(
  function(options = {}) {
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
            Object.values(theme("fontWeight")).includes(font.weight)
          )
          .map(font => ({
            "@font-face": {
              fontFamily: font.family,
              fontStyle: font.style,
              fontWeight: font.weight,
              fontDisplay: "fallback",
              src: `url(${opts.fontPath}/${font.dir}/${font.file}.woff2) format("woff2"),
                    url(${opts.fontPath}/${font.dir}/${font.file}.woff) format("woff"),
                    url(${opts.fontPath}/${font.dir}/${font.file}.ttf) format("truetype")`
            }
          })),
        ...Object.keys(theme("fontFamily")).map(key => ({
          [`[class*=${e(`text-${key}`)}]`]: {
            fontFamily: theme("fontFamily")
              [key].split(", ")
              .map(s => (s.includes(" ") ? `'${s}'` : s))
          }
        }))
      ];

      addBase(base);

      const uMeasure = opts.overrides.measure
        ? Object.keys(theme("measure")).map(key => ({
            [`.${e(`measure-${key}`)}`]: { maxWidth: theme("measure")[key] }
          }))
        : {};
      const uTabular = opts.overrides.fontFeatureSettings
        ? Object.keys(theme("fontFeatureSettings")).map(key => ({
            [`.${e(`text-${key}`)}`]: {
              fontFeatureSettings: theme("fontFeatureSettings")[key]
            }
          }))
        : {};
      const uTextIndent = opts.overrides.textIndent
        ? Object.keys(theme("textIndent")).map(key => ({
            [`.${e(
              key.startsWith("-")
                ? `-text-indent-${key.slice(1)}`
                : `text-indent-${key}`
            )}`]: {
              textIndent: theme("textIndent")[key]
            }
          }))
        : {};

      addUtilities([uMeasure, uTabular, uTextIndent], {
        variants: ["responsive"]
      });
    };
  },
  function(options = {}) {
    const opts = {
      ...defaultOptions,
      ...options,
      overrides: {
        ...defaultOptions.overrides,
        ...options.overrides
      }
    };

    return {
      theme: Object.keys(opts.overrides).reduce((acc, key) => {
        const override = opts.overrides[key];

        if (override) {
          acc[key] = {
            ...props[key].standard,
            ...(override === "extended" ? props[key].extended : {})
          };
        }

        return acc;
      }, {})
    };
  }
);
