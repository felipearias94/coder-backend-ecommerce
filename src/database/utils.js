import fs from "fs";

const saveToDatabase = (pathToFile, DB) => {
  fs.promises.writeFile(pathToFile, JSON.stringify(DB, null, 2), {
    encoding: "utf8",
  });
};

export default saveToDatabase;
