const fs = require('fs');
const path = require('path');

function processarPasta(pasta) {
  const itens = fs.readdirSync(pasta, { withFileTypes: true });

  itens.forEach(item => {
    const caminhoCompleto = path.join(pasta, item.name);

    if (item.isDirectory()) {
      // entra na subpasta
      processarPasta(caminhoCompleto);
    } else if (item.isFile() && path.extname(item.name) === '.json') {
      try {
        const conteudo = fs.readFileSync(caminhoCompleto, 'utf8');
        const jsonLido = JSON.parse(conteudo);

        // evita reprocessar arquivos já alterados
        if (jsonLido.chapters) {
          console.log(`⏭ Já possui chapters: ${caminhoCompleto}`);
          return;
        }

        const novoJson = {
          chapters: jsonLido
        };

        fs.writeFileSync(
          caminhoCompleto,
          JSON.stringify(novoJson),
          'utf8'
        );

        console.log(`✔ Atualizado: ${caminhoCompleto}`);
      } catch (err) {
        console.error(`✖ Erro em ${caminhoCompleto}:`, err.message);
      }
    }
  });
}

// pasta inicial
const pastaInicial = path.join(__dirname, './src');
processarPasta(pastaInicial);
