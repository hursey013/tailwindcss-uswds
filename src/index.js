const plugin = require("tailwindcss/plugin");
const colors = require("../build/colors.json");
const spacing = require("../build/spacing.json");
const fonts = require("../build/fonts.json");

module.exports = plugin.withOptions(
  function(options = {}) {
    return function({ addBase, theme }) {
      let base = [
        {
          a: {
            color: theme("colors.primary"),
            "&:visited": {
              color: theme("colors['violet-70v']")
            },
            "&:hover": {
              color: theme("colors['primary-dark']")
            },
            "&:active": {
              color: theme("colors['primary-darker']")
            }
          }
        },
        {
          body: {
            backgroundColor: theme("colors.white"),
            color: theme("colors.ink"),
            overflowX: "hidden"
          }
        }
      ];

      if (options.fontPath) {
        base = [
          ...base,
          ...fonts.map(font => ({
            "@font-face": {
              fontFamily: font.family,
              fontStyle: font.style,
              fontWeight: font.weight,
              fontDisplay: "fallback",
              src: `url(${options.fontPath}/${font.dir}/${font.file}.woff2) format("woff2"), url(${options.fontPath}/${font.dir}/${font.file}.woff) format("woff"), url(${options.fontPath}/${font.dir}/${font.file}.ttf) format("truetype")`
            }
          }))
        ];
      }

      addBase(base);
    };
  },
  function(options) {
    return {
      theme: {
        screens: {
          ...spacing["palette-units-system-positive-large"],
          ...spacing["palette-units-system-positive-larger"],
          ...spacing["palette-units-system-positive-largest"]
        },
        colors,
        spacing: {
          ...spacing["palette-units-system-positive-smaller"],
          ...spacing["palette-units-system-positive-small"],
          ...spacing["palette-units-system-positive-medium"],
          ...spacing["palette-units-zero"]
        },
        borderRadius: {
          ...spacing["palette-units-system-positive-smaller"],
          ...spacing["palette-units-system-positive-small"],
          ...spacing["palette-units-zero"],
          sm: "2px",
          md: "4px",
          lg: "8px",
          pill: "99rem"
        },
        borderWidth: {
          default: "1px",
          ...spacing["palette-units-system-positive-smaller"],
          ...spacing["palette-units-system-positive-small"],
          ...spacing["palette-units-zero"]
        },
        fontFamily: {
          display: ["Roboto Mono", "sans-serif"],
          body: ["Roboto Mono", "sans-serif"]
        },
        height: theme => ({
          auto: "auto",
          ...theme("spacing"),
          ...spacing["palette-units-system-positive-large"],
          full: "100%",
          viewport: "100vh"
        }),
        margin: theme => ({
          auto: "auto",
          ...theme("spacing"),
          ...spacing["palette-units-system-positive-large"]
        }),
        maxHeight: theme => ({
          none: "none",
          ...theme("spacing"),
          ...spacing["palette-units-system-positive-large"],
          ...spacing["palette-units-system-positive-larger"],
          viewport: "100vh"
        }),
        maxWidth: theme => ({
          none: "none",
          ...theme("spacing"),
          ...theme("screens"),
          full: "100%"
        }),
        minHeight: theme => ({
          ...theme("spacing"),
          ...spacing["palette-units-system-positive-large"],
          ...spacing["palette-units-system-positive-larger"],
          full: "100%",
          viewport: "100vh"
        }),
        minWidth: theme => theme("spacing"),
        negativeMargin: {
          ...spacing["palette-units-system-positive-smaller-negative"],
          ...spacing["palette-units-system-positive-small-negative"]
        },
        width: theme => ({
          auto: "auto",
          ...theme("spacing"),
          ...theme("screens"),
          full: "100%"
        })
      }
    };
  }
);

// box-shadow
// fonts
// line-height
// measure
// opacity
// text-indent
