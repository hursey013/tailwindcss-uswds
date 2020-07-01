# U.S. Tailwind Design System

A [TailwindCSS](https://tailwindcss.com/) plugin for adding [U.S. Web Design System](https://designsystem.digital.gov/) design tokens to supported utility classes. For use in utility-first projects that prefer a JavaScript based configuration and do not require USWDS provided components or page templates.

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

To disable the use of USWDS design tokens for a particular utility (falling back to the defaults provided by Tailwind), pass a value of `false`:

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

Currently `color`, `borderRadius`, `fontSize`, `fontWeight`, `letterSpacing`, `lineHeight` support the use of the `extended` value.

## Usage

### Utilities

Utility classes follow the default naming conventions provided by Tailwind with USWDS design tokens as values. This creates more terse class names and may sometimes also change the utility name itself:

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

Several USWDS-specific utilities are also provided as part of `tailwindcss-uswds`:

| Key                       | Classes                                                                                                                                 | Reference                                                                              |
| ------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------- |
| **`measure`**             | `.measure-{none, 1, 2, 3, 4, 5, 6}`                                                                                                     | [USWDS](https://designsystem.digital.gov/utilities/paragraph-styles/#max-width)        |
| **`fontFeatureSettings`** | `.text-{tabular, no-tabular, }`                                                                                                         | [USWDS](https://designsystem.digital.gov/utilities/text-styles/#font-feature-settings) |
| **`textIndent`**          | `.text-indent-{-9, -8, -7, -6, -5, -4, -3, -205, -2, -105, -1, -05, -2px, -1px, 0, 1px, 2px, 05, 1, 105, 2, 205, 3, 4, 5, 6, 7, 8, 9 }` | [USWDS](https://designsystem.digital.gov/utilities/paragraph-styles/#text-indent)      |
