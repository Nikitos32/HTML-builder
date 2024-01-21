const fs = require('fs');
fs.mkdir('04-copy-directory/files-copy',
  { recursive: true },
  (err) => {
    if (err) {
      return console.error(err);
    }
 });

fs.readdir('04-copy-directory/files', (err, files) => {
  if (err) console.log(err);
  else {
    files.forEach((file) => {
      fs.copyFile(`04-copy-directory/files/${file}`, `04-copy-directory/files-copy/${file}`, (err) => {
        if (err) console.log(err);
      });
    })
  }
})