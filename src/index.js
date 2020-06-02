const plugin = require("tailwindcss/plugin");
const colors = require("../build/colors.json");

module.exports = plugin(
  function({ addBase, theme }) {
    addBase({
      a: {
        color: theme("colors.primary.default"),
        "&:visited": {
          color: theme("colors.violet.vivid.70")
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
          default: colors.blue.vivid["60"],
          vivid: colors["blue-warm"].vivid["60"],
          dark: colors["blue-warm"].vivid["70"],
          darker: colors["blue-warm"].vivid["80"],
          darkest: false
        },
        secondary: {
          lightest: false,
          lighter: colors["red-cool"]["10"],
          light: colors.red["30"],
          default: colors.red["50"],
          vivid: colors["red-cool"].vivid["50"],
          dark: colors.red.vivid["60"],
          darker: colors.red.vivid["70"],
          darkest: false
        },
        "accent-warm": {
          lightest: false,
          lighter: colors.orange["10"],
          light: colors.orange.vivid["20"],
          default: colors.orange.vivid["30"],
          dark: colors.orange.vivid["50"],
          darker: colors.orange["60"],
          darkest: false
        },
        "accent-cool": {
          lightest: false,
          lighter: colors["blue-cool"].vivid["5"],
          light: colors["blue-cool"].vivid["20"],
          default: colors.cyan.vivid["30"],
          dark: colors["blue-cool"].vivid["40"],
          darker: colors["blue-cool"].vivid["60"],
          darkest: false
        },
        error: {
          lighter: colors["red-warm"]["10"],
          light: colors["red-warm"].vivid["30"],
          default: colors["red-warm"].vivid["50"],
          dark: colors.red.vivid["60"],
          darker: colors.red["70"]
        },
        warning: {
          lighter: colors.yellow["5"],
          light: colors.yellow.vivid["10"],
          default: colors.gold.vivid["20"],
          dark: colors.gold.vivid["30"],
          darker: colors.gold.vivid["50"]
        },
        success: {
          lighter: colors["green-cool"]["5"],
          light: colors["green-cool"].vivid["20"],
          default: colors["green-cool"].vivid["40"],
          dark: colors["green-cool"]["50"],
          darker: colors["green-cool"]["60"]
        },
        info: {
          lighter: colors.cyan["5"],
          light: colors.cyan["20"],
          default: colors.cyan.vivid["30"],
          dark: colors.cyan.vivid["40"],
          darker: colors["blue-cool"]["60"]
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
