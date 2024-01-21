const readline = require('node:readline');
const { stdin: input, stdout: output } = require('node:process');
const rl = readline.createInterface({ input, output });
const fs = require("fs");
rl.question('Hello Person! Enter your name please: ', (answer) => {
  fs.open('02-write-file/file.txt', 'a', (err) => {
    if (err) throw err;
  });
  const writeableStream = fs.createWriteStream('02-write-file/file.txt');
  writeableStream.write(answer + '\n');
  let lines = [];
  rl.on('line', (line) => {
    if (line === 'exit') {
      rl.close();
      return;
    }
    writeableStream.write(line + '\n');
    lines.push(line);
  }).on('close', () => {
    console.log('Bye Bye!');
  });
});