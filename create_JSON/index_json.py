import json
import pandas as pd
import numpy as np

with open("swiss_data_vote_8.csv", "r", encoding="utf-8-sig") as f:
    df = pd.read_csv(f, index_col='id', dtype={'id': str})
df = df.replace(".", float("nan"))
for col in df.columns:    
    try:
        df[col] = df[col].astype(float)
    except:
        pass


with open("data.json", "w", encoding="utf-8-sig") as f:
    df.to_json(f, indent=4, orient='index', force_ascii=False)


with open("data.json", 'r', encoding='utf-8-sig') as fileContent:
    json_object = json.load(fileContent)

for k in json_object:
    json_object[k]["id"] = k
    
f = open("good_data.json", 'w', encoding='utf-8-sig')
json.dump(json_object, f, indent=4, ensure_ascii=False)
f.close()