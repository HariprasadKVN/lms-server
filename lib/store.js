const fs = require("fs");

const createFileIfNeed = (filename) => {
  return new Promise((resolve, reject) => {
    fs.promises
      .access(filename, fs.constants.F_OK)
      .then(() => {
        // File exists
        resolve(`File already exists: ${filename}`);
      })
      .catch(() => {
        // File doesn't exist, create it
        fs.promises
          .writeFile(filename, JSON.stringify([]))
          .then(() => resolve(`File created successfully: ${filename}`))
          .catch((err) => reject(`Error creating file: ${err}`));
      });
  });
};

const read = (filename) => {
  return new Promise((resolve, reject) => {
    fs.promises
      .readFile(filename, "utf-8")
      .then((data) => {
        resolve(JSON.parse(data));
      })
      .catch((err) => {
        reject(`Error while reading ${err}`);
      });
  });
};

const write = (path, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(path, JSON.stringify(data), (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
};

module.exports = { createFileIfNeed, read, write };
