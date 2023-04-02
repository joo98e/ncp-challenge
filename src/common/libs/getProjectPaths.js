const path = require("path");

/**
 *
 * @param {PathType} type
 */
function getProjectPaths(type) {
  switch (type) {
    case "config":
      return path.join(process.env.PWD, "src", "config");
    case "static":
      return path.join(process.env.PWD, "src", "public");
    case "views":
      return path.join(process.env.PWD, "src", "views");
    case "root":
      return process.env.PWD;
    default:
      throw new Error(`Invalid PathType: ${type}`);
  }
}

module.exports = getProjectPaths;
