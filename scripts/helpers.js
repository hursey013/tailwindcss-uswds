function parseOptions(options, props, parent, output = {}) {
  return Object.keys(options).reduce((acc, key) => {
    const { children, defaultValue, extended, standard } = options[key];
    const k = parent || key;

    if (options[key]) {
      output[k] = {
        ...(parent ? output[k] : {}),
        ...(props[key].standard || props[key]),
        ...(extended ? props[key].extended : {}),
        ...(defaultValue ? { default: defaultValue } : {})
      };

      if (children) {
        parseOptions(children, props, k, acc);
      }
    }

    return acc;
  }, output);
}

module.exports = {
  parseOptions
};
