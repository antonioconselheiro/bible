//  node include-end-start-to-verses.js ./src

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
        jsonContent.chapters = jsonContent.chapters.map((chapter, index) => {
          let verseNumber = undefined;
          chapter.verses = chapter.verses.map(verse => {
            if (verseNumber === undefined) {
              verseNumber = Number(verse.verse.start);
            } else {
              verseNumber++;
            }

            verse.verse = verseNumber;
            return verse;
          });

          return chapter;
        });

        fs.writeFileSync(`${argFolder}/${subFolder}/${file}`, JSON.stringify(jsonContent));
      }
    });
  });
}

start();
console.info('consumed');