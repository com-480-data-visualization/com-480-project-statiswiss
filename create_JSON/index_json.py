import json
import csv


with open("swiss_data_vote_3.csv", encoding = 'utf-8-sig') as csvFile:
    read = csv.DictReader(csvFile, delimiter=';')
    store = list(read)

with open("data.json", "w", encoding='utf-8') as f:
    json.dump(store, f, indent=4)

with open("data.json", 'r', encoding='utf-8') as fileContent:
    json_object = json.load(fileContent)
new_json_object = dict()
for elem in json_object:
  new_json_object[elem["id"]] = elem
f = open("good_data.json", 'w', encoding='utf-8')
json.dump(new_json_object, f, indent=4)
f.close()