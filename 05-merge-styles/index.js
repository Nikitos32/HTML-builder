const fs = require('fs');
const path = require('path');

fs.open('05-merge-styles/project-dist/bundle.css', 'w', (err) => {
  if (err) throw err;
});

fs.readdir('05-merge-styles/styles', { withFileTypes: true }, (err, files) => {
  if (err) console.log(err);
  else {
    const writeableStream = fs.createWriteStream('05-merge-styles/project-dist/bundle.css');
    files.forEach((file) => {
      if (file.isFile()) {
        if (path.parse(file.name)['ext'] === '.css') {
          let stream = fs.createReadStream(`05-merge-styles/styles/${file.name}`, {encoding: 'utf-8'});
          stream.on('readable', function () {
            let data = stream.read();
            if (data !== null) {
              writeableStream.write(data);
            }
          });
        }
      }
    })
  }
})