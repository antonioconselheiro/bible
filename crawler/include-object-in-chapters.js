//  node include-object-in-chapters.js ./src

const fs = require('fs');
const argFolder = process.argv[2];

function start() {
  const itens = fs.readdirSync(argFolder);
  itens.forEach(async (subFolder) => {
    const stat = fs.statSync(`${argFolder}/${subFolder}`);

    if (!stat.isDirectory()) {
      return;
    }

    console.info(`:: reading folder "${argFolder}/${subFolder}"`);
    const files = fs.readdirSync(`${argFolder}/${subFolder}`);
    files.forEach((file) => {

      if (fs.statSync(`${argFolder}/${subFolder}/${file}`).isDirectory()) {
        return;
      }

      if (/\.json$/.test(file)) {
        const fileContent = fs.readFileSync(`${argFolder}/${subFolder}/${file}`);
        const jsonContent = JSON.parse(fileContent);
        jsonContent.chapters = jsonContent.chapters.map((verses, index) => {
          return {
            chapter: index + 1,
            verses
          };
        });

        fs.writeFileSync(`${argFolder}/${subFolder}/${file}`, JSON.stringify(jsonContent));
      }
    });
  });
}

start();
console.info('consumed');