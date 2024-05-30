const fs = require('fs');
const json = JSON.parse(fs.readFileSync('json_swiss_data_2.json'));

let result = [];
for (const [number, value] of Object.entries(json)) {
  result.push({...value, number});
}

fs.writeFileSync('array.json', JSON.stringify(result, null, 2));
