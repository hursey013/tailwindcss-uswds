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

function flatten(array, vivid = false) {
  return array.reduce((acc, item) => {
    if (Array.isArray(item.value)) {
      if (item.name === "vivid") {
        return { ...acc, ...flatten(item.value, true) };
      } else {
        acc[item.name] = flatten(item.value);
      }
    } else {
      if (item.value) {
        acc[vivid ? `${item.name}v` : item.name] = item.value;
      }
    }
    return acc;
  }, {});
}

const colors = readFilesSync(
  path.join(
    path.dirname(require.resolve("uswds/package.json")),
    "/src/data/colors/"
  )
).reduce((acc, file) => {
  return { ...acc, ...flatten(file.props) };
}, {});

console.info("Building USTWDS color palette!");

mkdirp("build").then(made => {
  fs.writeFileSync("build/colors.json", JSON.stringify(colors));
  console.log(JSON.stringify(colors, null, 4));
  console.log("Finished building.");
});
