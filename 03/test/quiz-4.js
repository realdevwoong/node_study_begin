const fs = require("fs");
const path = require("path");

fs.readdir("../", (err, files) => {
  if (err) {
    console.log(err);
    return;
  }

  const result = {};

  files.forEach((file) => {
    const ext = path.extname(file);

    if (ext) {
      if (result[ext]) {
        result[ext]++;
      } else {
        result[ext] = 1;
      }
    }
  });

  console.log(result);
});
