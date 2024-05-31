'use strict'

const fs = require('fs')
const csv = require('csv-parser')

function longestCommonSubstring(str1, str2) {
  let n = str1.length;
  let m = str2.length;

  let lcs = [];
  for (let i = 0; i <= n; i++) {
      lcs[i] = [];
      for (let j = 0; j <= m; j++) {
          lcs[i][j] = 0;
      }
  }

  let result = "";
  let max = 0;
  for (let i = 0; i < n; i++) {
      for (let j = 0; j < m; j++) {
          if (str1[i] === str2[j]) {
              lcs[i + 1][j + 1] = lcs[i][j] + 1;
              if (lcs[i + 1][j + 1] > max) {
                  max = lcs[i + 1][j + 1];
                  result = str1.substring(i - max + 1, i + 1);
              }
          }
      }
  }

  return result;
}

function loadPlaceCsv(file) {
  const result = new Map();
  const contents = fs.readFileSync(file, 'utf8');
  const lines = contents.split('\n');
  for (const line of lines) {
    if (!line) continue;
    const [id, name] = line.split(',');
    result.set(name, id);
  }
  return result;
}
const cantonsMap = loadPlaceCsv('cantons.csv');
const communesMap = loadPlaceCsv('communes.csv');

function loadVotationsNumbers() {
  const json = fs.readFileSync('votes_data.json', 'utf8');
  const obj = JSON.parse(json);
  const result = new Map();
  for (const number of Object.keys(obj)) {
    const votation = obj[number];
    const { date, titre_complet_de: title } = votation;

    if (!date) {
      throw new Exception('No date for votation' + number);
    }
    const [day, month, year] = date.split('.');
    const dateIso = `${year}-${month}-${day}`;

    if (!result.has(dateIso)) {
      result.set(dateIso, new Map());
    }
    const dateMap = result.get(dateIso);
    dateMap.set(title, number)
  }
  return result;
}
const votationsMap = loadVotationsNumbers();

function placeToLocation(place) {
  if (place.startsWith('- ')) {
    place = place.substring(2);
    if (!cantonsMap.has(place)) {
      throw new Error('Unknown canton: ' + place);
    }

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

    return cantonAbbrs[+cantonsMap.get(place)];
  }

  if (place.startsWith('......')) {
    place = place.substring(6);
    if (!communesMap.has(place)) {
      return null;
    }
    return communesMap.get(place);
  }

  return null;
}

function votationToNumber(votationName) {
  const date = votationName.substring(0, 10);
  const nameJson = votationName.substring(11);

  if (!votationsMap.has(date)) {
    const year = date.substring(0, 4);
    if (year.localeCompare('1981') > 0) {
      throw new Exception('No votations at date' + date);
    }
    return null;
  }
  const dateMap = votationsMap.get(date);

  if (dateMap.has(nameJson)) {
    return dateMap.get(nameJson);
  }

  // Find the smallest Levenshtein distance
  const namesWithLevenstein = [...dateMap.keys()]
  .filter(name => !nameJson.includes('Stichfrage') || name.includes('Stichfrage'))
  .map(name => {
    const namePx = name.toLowerCase();
    const nameExcel = nameJson.toLowerCase();

    return [
      name,
      longestCommonSubstring(namePx, nameExcel).length,
    ]
  });
  namesWithLevenstein.sort((a, b) => b[1] - a[1]);

  return dateMap.get(namesWithLevenstein[0][0]);
}

let i = 0;
const result = new Map(); // votation => place => dataType => value

fs.createReadStream('votes_fr.csv')
  .pipe(csv())
  .on('data', function (row) {
    if (i % 1000 === 0) {
      console.log(`Processing line ${i}/8140329`);
    }
    i++;

    const { num } = row;
    const subject = votationToNumber(row['Datum und Vorlage']);
    if (!subject) return;

    const dataPoint = ({
      'Ja': 'yes',
      'Nein': 'no',
      'Ja in %': 'per', // percentage of yes
      'Gültige Stimmzettel': 'val', // valid
      'Beteiligung in %': 'par', // participation
      'Stimmberechtigte': 'eli', // eligible
      'Abgegebene Stimmen': 'cas', // cast
    })[row['Ergebnis']]
    if (!dataPoint) console.log('Unknown data point');

    const locationRaw = row['Kanton (-) / Bezirk (>>) / Gemeinde (......)'];
    if (locationRaw.startsWith('<<') || locationRaw === 'Schweiz') return;
    const location = placeToLocation(locationRaw);
    if (!location) return;

    if (!result.has(subject)) {
      result.set(subject, new Map());
    }
    const subjectMap = result.get(subject);

    if (!subjectMap.has(location)) {
      subjectMap.set(location, {});
    }
    const locationMap = subjectMap.get(location);

    locationMap[dataPoint] = Number.parseFloat(num);
  })
  .on('end', function () {
    // delete the results folder
    if (fs.existsSync('results')) {
      fs.rmSync('results', { recursive: true });
    }

    // create the results folder
    fs.mkdirSync('results');

    // write the results to the results folder
    for (const [subject, subjectMap] of result) {
      fs.writeFileSync(
        'results/' + subject + '.json',
        JSON.stringify(
          Object.fromEntries(
            [...subjectMap.entries()]
          )
        )
      )
    }
  })
