# U.S. Tailwind Design System

[TailwindCSS](https://tailwindcss.com/) plugin for adding [U.S. Web Design System](https://designsystem.digital.gov/) design tokens to supported typography, spacing, color, and other discrete utility classes.

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

`tailwindcss-uswds` provides the necessary font files in order to generate all required USWDS `@font-face` rules. If you would prefer to copy the font files directly to you project you can customize the path to the font directory:

```js
// tailwind.config.js
module.exports = {
  // ...
  plugins: [
    require("@hursey013/tailwindcss-uswds")({
      fontPath: "../fonts"
    })
  ]
};
```

### `overrides` (optional)

By default, all supported utilities will use the `standard` set of design tokens provided by USWDS:

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
        screens: "standard",
        textIndent: "standard",
        width: "standard",
        zIndex: "standard"
      }
    })
  ]
};
```

To disable a particular plugin, pass a value of `false`:

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

To use an extended set of design tokens for a particular plugin, pass a value of `extended` :

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

Currently `color`, `borderRadius`, `fontSize`, `fontWeight`, `letterSpacing`, `lineHeight` support the use of `extended`.
