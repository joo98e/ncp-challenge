import * as path from "path";

/**
 * @typedef {("config"|"root"|"views"|"static"|"upload"|"assets"|"layouts"|"js")} PathType
 */

/**
 *
 * @param {PathType} type
 */
function getProjectPaths(type) {
  switch (type) {
    case "static":
      return path.join(process.env.PWD, "src", "client", "public");
    case "assets":
      return path.join(process.env.PWD, "src", "client", "assets");
    case "views":
      return path.join(process.env.PWD, "src", "client", "views");
    case "layouts":
      return path.join(process.env.PWD, "src", "client", "views", "layouts");
    case "upload":
      return path.join(process.env.PWD, "upload");
    case "js":
      return path.join(process.env.PWD, "src", "client", "js");
    case "root":
      return process.env.PWD;
    default:
      throw new Error(`Invalid PathType: ${type}`);
  }
}

export default getProjectPaths;
