const plugin = require("tailwindcss/plugin");
const colors = require("../dist/colors.json");
const fonts = require("../dist/fonts.json");
const props = require("../dist/props.json");

const {
  breakpoints,
  borderRadius,
  borderWidth,
  fontFamily,
  fontWeight,
  height,
  letterSpacing,
  margin,
  marginHorizontal,
  marginVertical,
  maxHeight,
  maxWidth,
  minHeight,
  minWidth,
  measure,
  textIndent,
  width
} = props;

module.exports = plugin.withOptions(
  function(options = {}) {
    return function({ addBase, addUtilities, e, theme }) {
      // Base styles
      const base = [
        {
          a: {
            color: theme("colors.primary"),
            "&:visited": { color: theme("colors['violet-70v']") },
            "&:hover": { color: theme("colors['primary-dark']") },
            "&:active": { color: theme("colors['primary-darker']") }
          }
        },
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
        }))
      ];

      addBase(base);

      // New utilities
      const uMeasure = Object.keys(measure.standard).map(key => ({
        [`.${e(`measure-${key}`)}`]: { maxWidth: measure.standard[key] }
      }));

      const uTextIndent = Object.keys(textIndent.standard).map(key => ({
        [`.${e(`text-indent-${key}`)}`]: {
          textIndent: textIndent.standard[key]
        }
      }));

      addUtilities([uMeasure, uTextIndent], { variants: ["responsive"] });
    };
  },
  function(options) {
    return {
      theme: {
        colors,
        screens: breakpoints.standard,
        borderRadius: {
          ...borderRadius.standard,
          ...borderRadius.extended
        },
        borderWidth: {
          default: "1px",
          ...borderWidth.standard
        },
        fontFamily: fontFamily.standard,
        fontWeight: fontWeight.standard,
        height: height.standard,
        letterSpacing: letterSpacing.standard,
        margin: {
          ...margin.standard,
          ...marginHorizontal.standard,
          ...marginVertical.standard
        },
        maxHeight: maxHeight.standard,
        maxWidth: maxWidth.standard,
        minHeight: minHeight.standard,
        minWidth: minWidth.standard,
        width: width.standard
      }
    };
  }
);
