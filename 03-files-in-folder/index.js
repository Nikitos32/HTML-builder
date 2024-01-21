const fs = require('fs');
const path = require('path');
fs.readdir('03-files-in-folder/secret-folder', { withFileTypes: true }, (err, files) => {
  if (err) console.log(err);
  else {
    files.forEach((file) => {
      if (file.isFile()) {
        fs.stat(path.resolve(`03-files-in-folder/secret-folder/${file.name}`), (err, stats) => {
          console.log(`${path.parse(file.name)['name']} - ${path.parse(file.name)['ext']} - ${stats.size} байт`);
        });
      }
    })
  }
})

