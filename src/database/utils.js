import fs from "fs";

const readFromDataBase = (pathToFile) => {
  return fs.promises.readFile(pathToFile, "utf-8");
};

const saveToDatabase = (pathToFile, DB) => {
  fs.promises.writeFile(pathToFile, JSON.stringify(DB, null, 2), {
    encoding: "utf8",
  });
};

export default { saveToDatabase, readFromDataBase };
