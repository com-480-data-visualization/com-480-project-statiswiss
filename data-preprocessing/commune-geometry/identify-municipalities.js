const fs = require('fs');

const cantonAbbrs = [
  /* 'Zürich', */ 'zh',
  /* 'Bern / Berne', */ 'be',
  /* 'Luzern', */ 'lu',
  /* 'Uri', */ 'ur',
  /* 'Schwyz', */ 'sz',
  /* 'Obwalden', */ 'ow',
  /* 'Nidwalden', */ 'nw',
  /* 'Glarus', */ 'gl',
  /* 'Zug', */ 'zg',
  /* 'Fribourg / Freiburg', */ 'fr',
  /* 'Solothurn', */ 'so',
  /* 'Basel-Stadt', */ 'bs',
  /* 'Basel-Landschaft', */ 'bl',
  /* 'Schaffhausen', */ 'sh',
  /* 'Appenzell Ausserrhoden', */ 'ar',
  /* 'Appenzell Innerrhoden', */ 'ai',
  /* 'St. Gallen', */ 'sg',
  /* 'Graubünden / Grigioni / Grischun', */ 'gr',
  /* 'Aargau', */ 'ag',
  /* 'Thurgau', */ 'tg',
  /* 'Ticino', */ 'ti',
  /* 'Vaud', */ 'vd',
  /* 'Valais / Wallis', */ 'vs',
  /* 'Neuchâtel', */ 'ne',
  /* 'Genève', */ 'ge',
  /* 'Jura', */ 'ju',
]

// for each canton load sync the XX-municipalities.json file

const byCanton = {};

for (const cantonAbbr of cantonAbbrs) {
  const json = JSON.parse(fs.readFileSync(`${cantonAbbr}-municipalities.json`));
  for (const municipality of json.objects.municipalities.geometries) {
    if (!byCanton[cantonAbbr]) {
      byCanton[cantonAbbr] = [];
    }
    byCanton[cantonAbbr].push(municipality.id);
  }
}

console.log(JSON.stringify(byCanton));