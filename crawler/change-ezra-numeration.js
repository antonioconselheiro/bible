// node change-ezra-numeration.js ./src

const fs = require('fs');
const path = require('path');

const argFolder = process.argv[2];

function start() {
  if (!argFolder) {
    console.error('Informe a pasta. Ex: node change-ezra-numeration.js ./src');
    process.exit(1);
  }

  const itens = fs.readdirSync(argFolder);

  itens.forEach((subFolder) => {
    const folderPath = path.join(argFolder, subFolder);
    const stat = fs.statSync(folderPath);

    if (!stat.isDirectory()) {
      return;
    }

    console.info(`:: reading folder "${folderPath}"`);
    const oldPath = path.join(folderPath, '1ED.json');
    const newPath = path.join(folderPath, '2ED.json');

    if (fs.existsSync(oldPath)) {
      const content = fs.readFileSync(oldPath, 'utf8');

      // Substitui todas as ocorrências dentro do arquivo
      const newContent = content.replace(/1ED/g, '2ED');

      // Grava o conteúdo já alterado
      fs.writeFileSync(newPath, newContent, 'utf8');

      // Remove o arquivo antigo
      fs.unlinkSync(oldPath);

      console.info(`:: renamed "${oldPath}" → "${newPath}"`);
    }
  });
}

start();

console.info('consumed');