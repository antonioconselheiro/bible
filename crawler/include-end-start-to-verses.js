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
          chapter.verses = chapter.verses.map(verse => {
            if (typeof verse.verse === 'string') {
              return {
                verse: {
                  start: Number(verse.verse),
                  end: Number(verse.verse)
                },
                text: verse.text
              };
            } else {
              return {
                verse: {
                  start: verse.verse.start,
                  end: verse.verse.end
                },
                text: verse.text
              };
            }
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