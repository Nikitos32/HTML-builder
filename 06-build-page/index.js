const fs = require('fs');
const path = require('path');

fs.mkdir('06-build-page/project-dist', { recursive: true }, (err) => {
  if (err) {
    return console.error(err);
  }
});

let stream = fs.createReadStream('06-build-page/template.html', {encoding: 'utf-8'});
stream.on('readable', function () {
  let data = stream.read();
  if (data !== null) {
    let streamHeader = fs.createReadStream('06-build-page/components/header.html', {encoding: 'utf-8'});
    streamHeader.on('readable', function () {
      let headerData = streamHeader.read();
      if (headerData !== null) {
        data = data.replace('{{header}}', headerData);
        let streamFooter = fs.createReadStream('06-build-page/components/footer.html', {encoding: 'utf-8'});
        streamFooter.on('readable', function () {
          let footerData = streamFooter.read();
          if (footerData !== null) {
            data = data.replace('{{footer}}', footerData);
            let streamArt = fs.createReadStream('06-build-page/components/articles.html', {encoding: 'utf-8'});
            streamArt.on('readable', function () {
              let artData = streamArt.read();
              if (artData !== null) {
                data = data.replace('{{articles}}', artData);
                fs.open('06-build-page/project-dist/index.html', 'w', (err) => {
                  if (err) throw err;
                  const writeableStream = fs.createWriteStream('06-build-page/project-dist/index.html');
                  writeableStream.write(data);
                });
              }
            });
          }
        });
      }
    });
  }
});

fs.open('06-build-page/project-dist/style.css', 'w', (err) => {
  if (err) throw err;
});

fs.readdir('06-build-page/styles', { withFileTypes: true }, (err, files) => {
  if (err) console.log(err);
  else {
    const writeableStream = fs.createWriteStream('06-build-page/project-dist/style.css');
    files.forEach((file) => {
      if (file.isFile()) {
        if (path.parse(file.name)['ext'] === '.css') {
          let stream = fs.createReadStream(`06-build-page/styles/${file.name}`, {encoding: 'utf-8'});
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

fs.mkdir('06-build-page/project-dist/assets',
  { recursive: true },
  (err) => {
    if (err) {
      return console.error(err);
    }
  });

fs.readdir('06-build-page/assets', (err, files) => {
  if (err) console.log(err);
  else {
    files.forEach((file1) => {
      fs.mkdir(`06-build-page/project-dist/assets/${file1}`,
        {recursive: true},
        (err) => {
        if (err) {
          return console.log(err);
        }
      });
      fs.readdir(`06-build-page/assets/${file1}`, (err, files) => {
        if (err) console.log(err);
        else {
          files.forEach((file2) => {
            fs.copyFile(`06-build-page/assets/${file1}/${file2}`, `06-build-page/project-dist/assets/${file1}/${file2}`, (err) => {
                if (err) console.log(err);
            });
          })
        }
      })
    })
  }
})


