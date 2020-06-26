const extractArrayValues = value =>
  value.split(", ").map(s => (s.includes(" ") ? `'${s}'` : s));

const extractColorValue = ({ r, g, b, a, hex }) =>
  a !== 1 ? `rgba(${r}, ${g}, ${b}, ${a})` : hex;

const extractStringValue = ({ unit, value }) =>
  typeof value === "string" && value.includes(",")
    ? extractArrayValues(value)
    : `${value}${unit ? unit : ""}`;

const parseOptions = (options, props) =>
  Object.keys(options).reduce((acc, key) => {
    const { extended } = options[key];

    if (options[key]) {
      acc[key] = {
        ...(props[key].standard || props[key]),
        ...(extended ? props[key].extended : {})
      };
    }

    return acc;
  }, {});

const removePrefix = (string, source) => {
  const regex = new RegExp(source.join("|"), "gi");
  return string.replace(regex, "");
};

const renameProp = (key, source) => (source[key] ? source[key] : key);

const stringToCamelCase = string =>
  string.replace(/-([a-z])/g, g => g[1].toUpperCase());

module.exports = {
  extractArrayValues,
  extractColorValue,
  extractStringValue,
  parseOptions,
  removePrefix,
  renameProp,
  stringToCamelCase
};
