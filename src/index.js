const plugin = require("tailwindcss/plugin");
const defaultConfig = require("tailwindcss/defaultConfig");
const fonts = require("../dist/fonts.json");
const props = require("../dist/props.json");

const defaultOptions = {
  borderRadius: true,
  borderWidth: true,
  colors: true,
  fontFamily: true,
  fontSize: true,
  fontWeight: true,
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
  spacing: true,
  screens: true,
  textIndent: true,
  width: true
};

const {
  borderRadius,
  borderWidth,
  colors,
  fontFamily,
  fontSize,
  fontWeight,
  height,
  letterSpacing,
  lineHeight,
  margin,
  marginHorizontal,
  marginVertical,
  maxHeight,
  maxWidth,
  minHeight,
  minWidth,
  measure,
  opacity,
  order,
  screens,
  spacing,
  textIndent,
  width
} = props;

module.exports = plugin.withOptions(
  function(options) {
    options = { ...defaultOptions, ...options };

    return function({ addBase, addComponents, addUtilities, e, theme }) {
      const base = [
        {
          body: {
            backgroundColor: theme("colors.white"),
            color: theme("colors.ink"),
            overflowX: "hidden"
          }
        },
        ...fonts.map(font => ({
          "@font-face": {
            fontFamily: font.family,
            fontStyle: font.style,
            fontWeight: font.weight,
            fontDisplay: "fallback",
            src: `url(${options.fontPath}/${font.dir}/${font.file}.woff2) format("woff2"),
                  url(${options.fontPath}/${font.dir}/${font.file}.woff) format("woff"),
                  url(${options.fontPath}/${font.dir}/${font.file}.ttf) format("truetype")`
          }
        })),
        ...Object.keys(theme("fontFamily")).map(key => ({
          [`[class*=${e(`text-${key}`)}]`]: {
            fontFamily: theme("fontFamily")[key].join(", ")
          }
        }))
      ];
      addBase(base);

      const uMeasure = options.measure
        ? Object.keys(theme("measure")).map(key => ({
            [`.${e(`measure-${key}`)}`]: { maxWidth: theme("measure")[key] }
          }))
        : {};
      const uTextIndent = options.textIndent
        ? Object.keys(theme("textIndent")).map(key => ({
            [`.${e(`text-indent-${key}`)}`]: {
              textIndent: theme("textIndent")[key]
            }
          }))
        : {};
      addUtilities([uMeasure, uTextIndent], {
        variants: ["responsive"]
      });
    };
  },
  function(options) {
    options = { ...defaultOptions, ...options };

    return {
      theme: {
        screens: options.screens ? screens.standard : defaultConfig.screens,
        colors: options.colors ? colors : defaultConfig.colors,
        spacing: options.spacing ? spacing : defaultConfig.spacing,
        borderRadius: options.borderRadius
          ? {
              ...borderRadius.standard,
              ...borderRadius.extended
            }
          : defaultConfig.borderRadius,
        borderWidth: options.borderWidth
          ? {
              default: "1px",
              ...borderWidth.standard
            }
          : defaultConfig.borderWidth,
        fontFamily: options.fontFamily
          ? fontFamily.standard
          : defaultConfig.fontFamily,
        fontSize: options.fontSize ? fontSize : defaultConfig.fontSize,
        fontWeight: options.fontWeight
          ? fontWeight.standard
          : defaultConfig.fontWeight,
        height: options.height ? height.standard : defaultConfig.height,
        letterSpacing: options.letterSpacing
          ? letterSpacing.standard
          : defaultConfig.letterSpacing,
        lineHeight: options.lineHeight
          ? lineHeight.standard
          : defaultConfig.lineHeight,
        margin: options.margin
          ? {
              ...margin.standard,
              ...marginHorizontal.standard,
              ...marginVertical.standard
            }
          : defaultConfig.margin,
        maxHeight: options.maxHeight
          ? maxHeight.standard
          : defaultConfig.maxHeight,
        maxWidth: options.maxWidth ? maxWidth.standard : defaultConfig.maxWidth,
        measure: options.measure ? measure.standard : defaultConfig.measure,
        minHeight: options.minHeight
          ? minHeight.standard
          : defaultConfig.minHeight,
        minWidth: options.minWidth ? minWidth.standard : defaultConfig.minWidth,
        opacity: options.opacity ? opacity.standard : defaultConfig.opacity,
        order: options.order ? order.standard : defaultConfig.order,
        textIndent: options.textIndent
          ? textIndent.standard
          : defaultConfig.textIndent,
        width: options.width ? width.standard : defaultConfig.width
      }
    };
  }
);
