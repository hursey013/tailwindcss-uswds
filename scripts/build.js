const fs = require("fs");
const path = require("path");
const mkdirp = require("mkdirp");

function readFilesSync(dir) {
  const files = [];

  fs.readdirSync(dir).forEach(filename => {
    const filepath = path.resolve(dir, filename);
    const stat = fs.statSync(filepath);
    const isFile = stat.isFile();
    const contents = fs.readFileSync(dir + filename, "utf8");

    if (isFile) files.push(JSON.parse(contents));
  });

  return files;
}

function flatten(array) {
  return array.reduce((acc, item) => {
    if (Array.isArray(item.value)) {
      acc[item.name] = flatten(item.value);
    } else {
      if (item.value) {
        acc[item.name] = item.value;
      }
    }
    return acc;
  }, {});
}

const colors = readFilesSync("node_modules/uswds/src/data/colors/").reduce(
  (acc, file) => {
    return { ...acc, ...flatten(file.props) };
  },
  {}
);

console.info("Building USTWDS color palette!");

mkdirp("build").then(made => {
  fs.writeFileSync("build/colors.json", JSON.stringify(colors));
  console.log("Finished building.");
});
