const plugin = require("tailwindcss/plugin");
const colors = require("../build/colors.json");

module.exports = plugin(
  function({ addBase, theme }) {
    addBase({
      a: {
        color: theme("colors.primary.default"),
        "&:visited": {
          color: theme("colors.violet.70v")
        },
        "&:hover": {
          color: theme("colors.primary.dark")
        },
        "&:active": {
          color: theme("colors.primary.darker")
        }
      },
      body: {
        backgroundColor: theme("colors.white"),
        color: theme("colors.ink"),
        overflowX: "hidden"
      }
    });
  },
  {
    theme: {
      colors: {
        ...colors,
        base: {
          lightest: colors.gray["5"],
          lighter: colors["gray-cool"]["10"],
          light: colors["gray-cool"]["30"],
          default: colors["gray-cool"]["50"],
          dark: colors["gray-cool"]["60"],
          darker: colors["gray-cool"]["70"],
          darkest: colors.gray["90"]
        },
        ink: colors.gray["90"],
        primary: {
          lightest: false,
          lighter: colors.blue["10"],
          light: colors.blue["30"],
          default: colors.blue["60v"],
          vivid: colors["blue-warm"]["60v"],
          dark: colors["blue-warm"]["70v"],
          darker: colors["blue-warm"]["80v"],
          darkest: false
        },
        secondary: {
          lightest: false,
          lighter: colors["red-cool"]["10"],
          light: colors.red["30"],
          default: colors.red["50"],
          vivid: colors["red-cool"]["50v"],
          dark: colors.red["60v"],
          darker: colors.red["70v"],
          darkest: false
        },
        accent: {
          warm: {
            lightest: false,
            lighter: colors.orange["10"],
            light: colors.orange["20v"],
            default: colors.orange["30v"],
            dark: colors.orange["50v"],
            darker: colors.orange["60"],
            darkest: false
          },
          cool: {
            lightest: false,
            lighter: colors["blue-cool"]["5v"],
            light: colors["blue-cool"]["20v"],
            default: colors.cyan["30v"],
            dark: colors["blue-cool"]["40v"],
            darker: colors["blue-cool"]["60v"],
            darkest: false
          }
        },
        info: {
          lighter: colors.cyan["5"],
          light: colors.cyan["20"],
          default: colors.cyan["30v"],
          dark: colors.cyan["40v"],
          darker: colors["blue-cool"]["60"]
        },
        error: {
          lighter: colors["red-warm"]["10"],
          light: colors["red-warm"]["30v"],
          default: colors["red-warm"]["50v"],
          dark: colors.red["60v"],
          darker: colors.red["70"]
        },
        warning: {
          lighter: colors.yellow["5"],
          light: colors.yellow["10v"],
          default: colors.gold["20v"],
          dark: colors.gold["30v"],
          darker: colors.gold["50v"]
        },
        success: {
          lighter: colors["green-cool"]["5"],
          light: colors["green-cool"]["20v"],
          default: colors["green-cool"]["40v"],
          dark: colors["green-cool"]["50"],
          darker: colors["green-cool"]["60"]
        },
        disabled: {
          light: colors.gray["10"],
          default: colors.gray["20"],
          dark: colors.gray["30"]
        },
        transparent: "transparent",
        black: "black",
        white: "white"
      }
    }
  }
);
