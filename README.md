# U.S. Tailwind Design System

A [TailwindCSS](https://tailwindcss.com/) plugin for adding [U.S. Web Design System](https://designsystem.digital.gov/) design tokens to supported Tailwind utility classes. For use in utility-first projects that favor a JavaScript based configuration and do not require USWDS provided components or page templates out of the box.

## Install

1. Install the plugin:

```
# Using npm
npm install @hursey013/tailwindcss-uswds --save-dev

# Using Yarn
yarn add @hursey013/tailwindcss-uswds -D
```

2. Add it to your tailwind.config.js file:

```js
// tailwind.config.js
module.exports = {
  // ...
  plugins: [require("@hursey013/tailwindcss-uswds")]
};
```

## Options

### `fontPath` (optional)

`tailwindcss-uswds` provides the necessary font files in order to generate all required USWDS `@font-face` rules. If you would prefer to copy the font files directly into your project folder you can update the path to the font directory:

```js
// tailwind.config.js
module.exports = {
  // ...
  plugins: [
    require("@hursey013/tailwindcss-uswds")({
      fontPath: "../path/to/fonts"
    })
  ]
};
```

### `overrides` (optional)

By default, all supported utilities use the `standard` set of design tokens provided by USWDS:

```js
// tailwind.config.js
module.exports = {
  // ...
  plugins: [
    require("@hursey013/tailwindcss-uswds")({
      // ...
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
    })
  ]
};
```

To prevent USWDS design tokens from overriding the default Tailwind values, pass a value of `false`:

```js
// tailwind.config.js
module.exports = {
  // ...
  plugins: [
    require("@hursey013/tailwindcss-uswds")({
      // ...
      overrides: {
        // ..
        flex: false
        // ...
      }
    })
  ]
};
```

To use an extended set of USWDS design tokens for a particular utility, pass a value of `extended` :

```js
// tailwind.config.js
module.exports = {
  // ...
  plugins: [
    require("@hursey013/tailwindcss-uswds")({
      // ...
      overrides: {
        // ..
        color: "extended"
        // ...
      }
    })
  ]
};
```

Currently `color`, `borderRadius`, `fontSize`, `fontWeight`, `letterSpacing`, and `lineHeight` support `extended`.

## Usage

### Utilities

Utility classes follow the default naming conventions provided by Tailwind with USWDS design tokens as values. This creates shorter class names and may also in some cases change the utility name itself:

```css
/* .border-bottom-1 becomes: */
.border-b-1 {
  border-bottom: 0.75rem solid;
}

/* .margin-bottom-neg-2px becomes: */
.-mb-2px {
  margin-bottom: -2px;
}

/* .radius-right-lg becomes: */
.rounded-r-lg {
  border-top-right-radius: 0.5rem;
  border-bottom-right-radius: 0.5rem;
}
```

Out of the box, `tailwindcss-uswds` provides the following USWDS design tokens to each specific utility:

| Key                 | Classes                                                                                                                                                      | Reference                                                                                                                                                 |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`borderRadius`**  | `.rounded-{t\|r\|b\|l\|tl\|tr\|br\|bl}-{0, sm, md, lg, pill}`                                                                                                | [TW](https://tailwindcss.com/docs/border-radius)&nbsp;\|&nbsp;[USWDS](https://designsystem.digital.gov/utilities/border/#utility-radius)                  |
| **`borderWidth`**   | `.border-{t\|r\|b\|l}-{0, 1px, 2px, 05, 1, 105, 2, 205, 3}`                                                                                                  | [TW](https://tailwindcss.com/docs/border-width)&nbsp;\|&nbsp;[USWDS](https://designsystem.digital.gov/utilities/border/#utility-border-width)             |
| **`boxShadow`**     | `.shadow-{none, 1, 2, 3, 4, 5}`                                                                                                                              | [TW](https://tailwindcss.com/docs/box-shadow)&nbsp;\|&nbsp;[USWDS](https://designsystem.digital.gov/utilities/shadow/)                                    |
| **`colors`**        | See [colors](#colors) section                                                                                                                                |
| **`cursor`**        | `.cursor-{auto, default, move, not-allowed, pointer, wait}`                                                                                                  | [TW](https://tailwindcss.com/docs/cursor)                                                                                                                 |
| **`flex`**          | `.flex-{1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, auto, fill}`                                                                                                  | [TW](https://tailwindcss.com/docs/flex)&nbsp;\|&nbsp;[USWDS](https://designsystem.digital.gov/utilities/flex/#utility-flex)                               |
| **`fontFamily`**    | `.font-{alt, body, code, heading, mono, sans, serif, ui}`                                                                                                    | [TW](https://tailwindcss.com/docs/font-family)&nbsp;\|&nbsp;[USWDS](https://designsystem.digital.gov/utilities/font-size-and-family/#utility-font-family) |
| **`fontSize`**      | `.text-{alt, body, code, heading, mono, sans, serif, ui}-{3xs, 2xs, xs, sm, md, lg, xl, 2xl, 3xl}`                                                           | [TW](https://tailwindcss.com/docs/font-size)&nbsp;\|&nbsp;[USWDS](https://designsystem.digital.gov/utilities/font-size-and-family/#utility-font)          |
| **`fontWeight`**    | `.font-{light, normal, bold}`                                                                                                                                | [TW](https://tailwindcss.com/docs/font-weight)&nbsp;\|&nbsp;[USWDS](https://designsystem.digital.gov/utilities/text-styles/#font-weight)                  |
| **`gap`**           | `.gap-{0, 2px, 05, 1, 2, 3, 4, 5, 6, sm, md, lg}`                                                                                                            | [TW](https://tailwindcss.com/docs/gap)&nbsp;\|&nbsp;[USWDS](https://designsystem.digital.gov/utilities/layout-grid/#gutters)                              |
| **`height`**        | `.h-{auto, 0, 1px, 2px, 05, 1, 105, 2, 205, 3, 4, 5, 6, 7, 8, 9, 10, 15, card, card-lg, mobile, full, viewport}`                                             | [TW](https://tailwindcss.com/docs/height)&nbsp;\|&nbsp;[USWDS](https://designsystem.digital.gov/utilities/height-and-width/#height)                       |
| **`letterSpacing`** | `.tracking-{-3, -2, -1, auto, 1, 2, 3}`                                                                                                                      | [TW](https://tailwindcss.com/docs/letter-spacing)&nbsp;\|&nbsp;[USWDS](https://designsystem.digital.gov/utilities/text-styles/#letterspacing)             |
| **`lineHeight`**    | `.leading-{alt, body, code, heading, mono, sans, serif, ui}-{1, 2, 3, 4, 5, 6}`                                                                              | [TW](https://tailwindcss.com/docs/line-height)&nbsp;\|&nbsp;[USWDS](https://designsystem.digital.gov/utilities/paragraph-styles/#line-height)             |
| **`margin`**        | `.m{t\|r\|b\|l\|x\|y}-{-1px, -2px, -05, -1, -105, -2, -205, -3, 0, 1px, 2px, 05, 1, 105, 2, 205, 3, 4, 5, 6, 7, 8, 9, 10, 15, auto, card, card-lg, mobile}`  | [TW](https://tailwindcss.com/docs/margin)&nbsp;\|&nbsp;[USWDS](https://designsystem.digital.gov/utilities/margin-and-padding/#margin)                     |
| **`maxHeight`**     | `.max-h-{none, 05, 1, 105, 2, 205, 3, 4, 5, 6, 7, 8, 9, 10, 15, card, card-lg, mobile, mobile-lg, tablet, tablet-lg, viewport}`                              | [TW](https://tailwindcss.com/docs/max-height)&nbsp;\|&nbsp;[USWDS](https://designsystem.digital.gov/utilities/height-and-width/#maxh)                     |
| **`maxWidth`**      | `.max-w-{none, 05, 1, 105, 2, 205, 3, 4, 5, 6, 7, 8, 9, 10, 15, card, card-lg, mobile, mobile-lg, tablet, tablet-lg, desktop, desktop-lg, widescreen, full}` | [TW](https://tailwindcss.com/docs/max-width)&nbsp;\|&nbsp;[USWDS](https://designsystem.digital.gov/utilities/height-and-width/#maxw)                      |
| **`minHeight`**     | `.min-h-{none, 0, 05, 1, 105, 2, 205, 3, 4, 5, 6, 7, 8, 9, 10, 15, card, card-lg, mobile, mobile-lg, tablet, tablet-lg, viewport}`                           | [TW](https://tailwindcss.com/docs/min-height)&nbsp;\|&nbsp;[USWDS](https://designsystem.digital.gov/utilities/height-and-width/#minh)                     |
| **`minWidth`**      | `.min-w-{none, 0, 05, 1, 105, 2, 205, 3, 4, 5, 6, 7, 8, 9, 10, 15}`                                                                                          | [TW](https://tailwindcss.com/docs/min-width)&nbsp;\|&nbsp;[USWDS](https://designsystem.digital.gov/utilities/height-and-width/#minw)                      |
| **`opacity`**       | `.opacity-{0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100}`                                                                                                      | [TW](https://tailwindcss.com/docs/border-radius)&nbsp;\|&nbsp;[USWDS](https://designsystem.digital.gov/utilities/display/#opacity)                        |
| **`order`**         | `.order-{first, last, initial, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11}`                                                                                        | [TW](https://tailwindcss.com/docs/opacity)&nbsp;\|&nbsp;[USWDS](https://designsystem.digital.gov/utilities/flex/#utility-order)                           |
| **`padding`**       | `.p{t\|r\|b\|l\|x\|y}-{0, 1px, 2px, 05, 1, 105, 2, 205, 3, 4, 5, 6, 7, 8, 9, 10, 15}`                                                                        | [TW](https://tailwindcss.com/docs/padding)&nbsp;\|&nbsp;[USWDS](https://designsystem.digital.gov/utilities/margin-and-padding/#padding)                   |
| **`screens`**       | See [screens](#screens) section                                                                                                                              |
| **`width`**         | `.w-{auto, 0, 05, 1, 105, 2, 205, 3, 4, 5, 6, 7, 8, 9, 10, 15, card, card-lg, mobile, mobile-lg, tablet, tablet-lg, desktop, desktop-lg, widescreen, full}`  | [TW](https://tailwindcss.com/docs/width)&nbsp;\|&nbsp;[USWDS](https://designsystem.digital.gov/utilities/height-and-width/#width)                         |
| **`zIndex`**        | `.z-{auto, bottom, top, 0, 100, 200, 300, 400, 500}`                                                                                                         | [TW](https://tailwindcss.com/docs/z-index)&nbsp;\|&nbsp;[USWDS](https://designsystem.digital.gov/utilities/display/#z-index)                              |

Unless mentioned above, all other utilities provided by Tailwind will be available with their default Tailwind values.

Do note that some Tailwind utilities inherit values defined elsewhere in the config file. For example, the USWDS design tokens defined in `opacity` will also be provided to Tailwind's `borderOpacity`, `backgroundOpacity`, `placeholderOpacity`, and `textOpacity` utilities. Similar functionality is provided for `color` based utilities.

### Additional utilities

Several USWDS-specific utilities are in addition to the defaults provided by Tailwind:

| Key                       | Classes                                                                                                                                 | Reference                                                                              |
| ------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------- |
| **`measure`**             | `.measure-{none, 1, 2, 3, 4, 5, 6}`                                                                                                     | [USWDS](https://designsystem.digital.gov/utilities/paragraph-styles/#max-width)        |
| **`fontFeatureSettings`** | `.text-{tabular, no-tabular, }`                                                                                                         | [USWDS](https://designsystem.digital.gov/utilities/text-styles/#font-feature-settings) |
| **`textIndent`**          | `.text-indent-{-9, -8, -7, -6, -5, -4, -3, -205, -2, -105, -1, -05, -2px, -1px, 0, 1px, 2px, 05, 1, 105, 2, 205, 3, 4, 5, 6, 7, 8, 9 }` | [USWDS](https://designsystem.digital.gov/utilities/paragraph-styles/#text-indent)      |

### Color

By default, `tailwindcss-uswds` provides [theme](https://designsystem.digital.gov/design-tokens/color/theme-tokens/), [state](https://designsystem.digital.gov/design-tokens/color/state-tokens/), and basic color tokens to all color based Tailwind utilities (`.bg-{color}`, `.border-{color}`, and `.text-{color}`). By using `extended` as outlined in the [overrides](#overrides-optional) section, [system](https://designsystem.digital.gov/design-tokens/color/system-tokens/) tokens can be included as well. Do note that including system color tokens will add hundreds of additional colors (and thousands of Tailwind generated utilities), so be sure to use the [purge](https://tailwindcss.com/docs/controlling-file-size/#removing-unused-css) option provided by Tailwind to remove unused CSS.

#### Default color tokens

```js
// tailwind.config.js
module.exports = {
  theme: {
    // ...
    colors: {
      transparent: "rgba(0, 0, 0, 0)",
      black: "rgb(0, 0, 0)",
      white: "rgb(255, 255, 255)",

      // Theme color tokens
      "base-lightest": "rgb(240, 240, 240)",
      "base-lighter": "rgb(223, 225, 226)",
      "base-light": "rgb(169, 174, 177)",
      base: "rgb(113, 118, 122)",
      "base-dark": "rgb(86, 92, 101)",
      "base-darker": "rgb(61, 69, 81)",
      "base-darkest": "rgb(27, 27, 27)",
      ink: "rgb(27, 27, 27)",
      "primary-lighter": "rgb(217, 232, 246)",
      "primary-light": "rgb(115, 179, 231)",
      primary: "rgb(0, 94, 162)",
      "primary-vivid": "rgb(0, 80, 216)",
      "primary-dark": "rgb(26, 68, 128)",
      "primary-darker": "rgb(22, 46, 81)",
      "secondary-lighter": "rgb(243, 225, 228)",
      "secondary-light": "rgb(242, 147, 140)",
      secondary: "rgb(216, 57, 51)",
      "secondary-vivid": "rgb(228, 29, 61)",
      "secondary-dark": "rgb(181, 9, 9)",
      "secondary-darker": "rgb(139, 10, 3)",
      "accent-warm-darker": "rgb(119, 85, 64)",
      "accent-warm-dark": "rgb(192, 86, 0)",
      "accent-warm": "rgb(250, 148, 65)",
      "accent-warm-light": "rgb(255, 188, 120)",
      "accent-warm-lighter": "rgb(242, 228, 212)",
      "accent-cool-darker": "rgb(7, 100, 141)",
      "accent-cool-dark": "rgb(40, 160, 203)",
      "accent-cool": "rgb(0, 189, 227)",
      "accent-cool-light": "rgb(151, 212, 234)",
      "accent-cool-lighter": "rgb(225, 243, 248)",

      // State color tokens
      "info-lighter": "rgb(231, 246, 248)",
      "info-light": "rgb(153, 222, 234)",
      info: "rgb(0, 189, 227)",
      "info-dark": "rgb(0, 158, 193)",
      "info-darker": "rgb(46, 98, 118)",
      "error-lighter": "rgb(244, 227, 219)",
      "error-light": "rgb(243, 146, 104)",
      error: "rgb(213, 67, 9)",
      "error-dark": "rgb(181, 9, 9)",
      "error-darker": "rgb(111, 51, 49)",
      "warning-lighter": "rgb(250, 243, 209)",
      "warning-light": "rgb(254, 230, 133)",
      warning: "rgb(255, 190, 46)",
      "warning-dark": "rgb(229, 160, 0)",
      "warning-darker": "rgb(147, 111, 56)",
      "success-lighter": "rgb(236, 243, 236)",
      "success-light": "rgb(112, 225, 123)",
      success: "rgb(0, 169, 28)",
      "success-dark": "rgb(77, 128, 85)",
      "success-darker": "rgb(68, 100, 67)",
      "disabled-light": "rgb(230, 230, 230)",
      disabled: "rgb(201, 201, 201)",
      "disabled-dark": "rgb(173, 173, 173)",

      // Basic color tokens
      red: "rgb(229, 34, 7)",
      orange: "rgb(230, 111, 14)",
      gold: "rgb(255, 190, 46)",
      yellow: "rgb(254, 230, 133)",
      green: "rgb(83, 130, 0)",
      mint: "rgb(4, 197, 133)",
      cyan: "rgb(0, 158, 193)",
      blue: "rgb(0, 118, 214)",
      indigo: "rgb(103, 108, 200)",
      violet: "rgb(129, 104, 179)",
      magenta: "rgb(215, 45, 121)"
    }
    // ...
  },
  plugins: [require("@hursey013/tailwindcss-uswds")]
};
```

#### Customizing colors

The default USWDS color tokens can be customized by using your project's `tailwind.config.js` file and following the process outlined in the [customizing colors](https://tailwindcss.com/docs/customizing-colors/) docs.

To reference [system](https://designsystem.digital.gov/design-tokens/color/system-tokens/) color tokens directly (without needing to use the `extended` option) you can import the JSON file generated by `tailwindcss-uswds`:

```js
// tailwind.config.js
const colors = require("@hursey013/tailwindcss-uswds/dist/colors");

module.exports = {
  theme: {
    // ...
    extend: {
      colors: {
        // ...
        primary: "#007ace",
        "primary-vivid": colors["blue-warm-50v"]
        // ...
      }
    }
  },
  plugins: [require("@hursey013/tailwindcss-uswds")]
};
```

### Breakpoints

The default breakpoints provided by USWDS are as follows:

```js
// tailwind.config.js
module.exports = {
  theme: {
    // ...
    screens: {
      card: "10rem"
      card-lg: "15rem"
      desktop: "64rem"
      desktop-lg: "75rem"
      mobile: "20rem"
      mobile-lg: "30rem"
      tablet: "40rem"
      tablet-lg: "55rem"
      widescreen: "87.5rem"
    }
    // ...
  },
  plugins: [require("@hursey013/tailwindcss-uswds")]
};
```

### Icons

As an added convenience, all icons provided by USWDS are included in `tailwindcss-uswds`.

```js
import flag from "@hursey013/tailwindcss-uswds/dist/img/us_flag_small.png";
```
