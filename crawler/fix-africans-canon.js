//  node fix-africans-canon.js ./src

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
        jsonContent.chapters = jsonContent.chapters.map((chapter) => {
          if (chapter.verses instanceof Array && chapter.verses[0] instanceof Array) {
            return chapter.verses.map((verses, index) => {
              const v = verses.map(verse => {
                if (typeof verse.verse.start === 'string') {
                  verse.verse.start = Number(verse.verse.start);
                }

                if (typeof verse.verse.end === 'string') {
                  verse.verse.end = Number(verse.verse.end);
                }

                verse.text = verse.text.trim();

                return verse;
              });

              return {
                chapter: index + 1,
                verses: v
              }
            });
          } else {
            return chapter;
          }
        });

        if (jsonContent.chapters[0] instanceof Array) {
          jsonContent.chapters = jsonContent.chapters[0];
        }

        fs.writeFileSync(`${argFolder}/${subFolder}/${file}`, JSON.stringify(jsonContent));
      }
    });
  });
}

start();
console.info('consumed');