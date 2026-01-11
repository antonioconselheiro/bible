const fs = require('fs');

const defaultCodexMetadata = {
  "GEN": { "name": "Gênesis" },
  "EXO": { "name": "Êxodo" },
  "LEV": { "name": "Levítico" },
  "NUM": { "name": "Números" },
  "DEU": { "name": "Deuteronômio" },
  "JOS": { "name": "Josué" },
  "JUI": { "name": "Juízes" },
  "RUT": { "name": "Rute" },
  "1SM": { "name": "1 Samuel" },
  "2SM": { "name": "2 Samuel" },
  "1RS": { "name": "1 Reis" },
  "2RS": { "name": "2 Reis" },
  "1CR": { "name": "1 Crônicas" },
  "2CR": { "name": "2 Crônicas" },
  "1ED": { "name": "Esdras" },
  "2ED": { "name": "Neemias" },
  "1ET": { "name": "Ester" },
  "JOB": { "name": "Jó" },
  "1SL": { "name": "Salmos" },
  "PRO": { "name": "Provérbios" },
  "ECL": { "name": "Eclesiastes" },
  "CAN": { "name": "Cânticos" },
  "ISA": { "name": "Isaías" },
  "1JE": { "name": "Jeremias" },
  "2JE": { "name": "Lamentações" },
  "EZE": { "name": "Ezequiel" },
  "1DA": { "name": "Daniel" },
  "OSE": { "name": "Oséias" },
  "JOE": { "name": "Joel" },
  "AMO": { "name": "Amós" },
  "OBA": { "name": "Obadias" },
  "JON": { "name": "Jonas" },
  "MIQ": { "name": "Miquéias" },
  "NAU": { "name": "Naum" },
  "HAB": { "name": "Habacuque" },
  "SOF": { "name": "Sofonias" },
  "AGE": { "name": "Ageu" },
  "ZAC": { "name": "Zacarias" },
  "MAL": { "name": "Malaquias" },
  "MAT": { "name": "Mateus" },
  "MAR": { "name": "Marcos" },
  "LUC": { "name": "Lucas" },
  "JOA": { "name": "João" },
  "ATO": { "name": "Atos" },
  "ROM": { "name": "Romanos" },
  "1CO": { "name": "1 Coríntios" },
  "2CO": { "name": "2 Coríntios" },
  "GAL": { "name": "Gálatas" },
  "EFE": { "name": "Efésios" },
  "FIL": { "name": "Filipenses" },
  "COL": { "name": "Colossenses" },
  "1TS": { "name": "1 Tessalonicenses" },
  "2TS": { "name": "2 Tessalonicenses" },
  "1TM": { "name": "1 Timóteo" },
  "2TM": { "name": "2 Timóteo" },
  "TIT": { "name": "Tito" },
  "FLM": { "name": "Filemom" },
  "HEB": { "name": "Hebreus" },
  "TIA": { "name": "Tiago" },
  "1PE": { "name": "1 Pedro" },
  "2PE": { "name": "2 Pedro" },
  "1JO": { "name": "1 João" },
  "2JO": { "name": "2 João" },
  "3JO": { "name": "3 João" },
  "JUD": { "name": "Judas" },
  "APO": { "name": "Apocalipse" }
};

const keysMap = {
  "gn": "GEN",
  "ex": "EXO",
  "lv": "LEV",
  "nm": "NUM",
  "dt": "DEU",
  "js": "JOS",
  "jz": "JUI",
  "rt": "RUT",
  "1sm": "1SM",
  "2sm": "2SM",
  "1rs": "1RS",
  "2rs": "2RS",
  "1cr": "1CR",
  "2cr": "2CR",
  "ed": "1ED",
  "ne": "2ED",
  "et": "1ET",
  "jó": "JOB",
  "sl": "1SL",
  "pv": "PRO",
  "ec": "ECL",
  "ct": "CAN",
  "is": "ISA",
  "jr": "1JE",
  "lm": "2JE",
  "ez": "EZE",
  "dn": "1DA",
  "os": "OSE",
  "jl": "JOE",
  "am": "AMO",
  "ob": "OBA",
  "jn": "JON",
  "mq": "MIQ",
  "na": "NAU",
  "hc": "HAB",
  "sf": "SOF",
  "ag": "AGE",
  "zc": "ZAC",
  "ml": "MAL",
  "mt": "MAT",
  "mc": "MAR",
  "lc": "LUC",
  "jo": "JOA",
  "atos": "ATO",
  "rm": "ROM",
  "1co": "1CO",
  "2co": "2CO",
  "gl": "GAL",
  "ef": "EFE",
  "fp": "FIL",
  "cl": "COL",
  "1ts": "1TS",
  "2ts": "2TS",
  "1tm": "1TM",
  "2tm": "2TM",
  "tt": "TIT",
  "fm": "FLM",
  "hb": "HEB",
  "tg": "TIA",
  "1pe": "1PE",
  "2pe": "2PE",
  "1jo": "1JO",
  "2jo": "2JO",
  "3jo": "3JO",
  "jd": "JUD",
  "ap": "APO"
};
async function start() {
  const itens = fs.readdirSync('./src');
  itens.forEach(async (item) => {
    const fileContent = fs.readFileSync(`./src/${item}`);
    const jsonContent = JSON.parse(fileContent);
    const newName = item.replace(/.json$/, '');
    const language = item.replace(/(^bible\-|\-[^ ]+.json$)/g, '');
    fs.mkdirSync(`./src/${newName}`);

    const data = {};
    jsonContent.content.forEach(async (book) => {
      if (book.content.length) {
        data[keysMap[book.key]] = defaultCodexMetadata[keysMap[book.key]];
        fs.writeFileSync(`./src/${newName}/${keysMap[book.key]}.json`, JSON.stringify(book.content));
      }
    });

    fs.writeFileSync(`./src/${newName}/_.codex`, JSON.stringify({
      "name": jsonContent.name,
      "language": language,
      "data": data
    }));
  });
}

start();
console.info('consumed');