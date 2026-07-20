//  node include-object-in-chapters.js ./src

const fs = require('fs');
const folder = process.argv[2];

function start() {
  const itens = fs.readdirSync(folder);
  itens.forEach(async (item) => {
    const stat = fs.statSync(`${folder}/${item}`)

    if (stat.isDirectory()) {
      return;
    }

    if (/\.json$/.test(item)) {
      console.info(`:: writting chapters object in "${folder}/${item}"`);
      const fileContent = fs.readFileSync(`${folder}/${item}`);
      const jsonContent = JSON.parse(fileContent);
      jsonContent.chapters = jsonContent.chapters.map((verses, index) => {
        return {
          chapter: index + 1,
          verses
        };
      });
      fs.writeFileSync(`${folder}/${item}`, JSON.stringify(jsonContent));
    }
  });
}

start();
console.info('consumed');