import * as path from "path";

/**
 * @typedef {("config"|"root"|"views"|"static"|"upload"|"assets")} PathType
 * @param {PathType} type
 */
function getProjectPaths(type) {
  switch (type) {
    case "static":
      return path.join(process.env.PWD, "src", "public");
    case "views":
      return path.join(process.env.PWD, "src", "client", "views");
    case "upload":
      return path.join(process.env.PWD, "upload");
    case "root":
      return process.env.PWD;
    default:
      throw new Error(`Invalid PathType: ${type}`);
  }
}

export default getProjectPaths;
