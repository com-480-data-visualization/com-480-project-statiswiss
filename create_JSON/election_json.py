import json
import pandas as pd
import numpy as np

with open("election_federale.csv", "r", encoding="utf-8-sig") as f:
    df = pd.read_csv(f, delimiter=";", index_col = False) #, index_col='wahl_jahr', dtype={'wahl_jahr': str})
df = df.replace(".", float("nan"))
for col in df.columns:    
    try:
        if col != "wahl_jahr":
            df[col] = df[col].astype(float)
    except:
        pass

#print(df)

with open("data_election.json", "w", encoding="utf-8-sig") as f:
    df.to_json(f, indent=4, orient='index', force_ascii=False)

with open("data_election.json", 'r', encoding='utf-8-sig') as fileContent:
   json_object = json.load(fileContent)
   pd.json_normalize(json_object)

with open("data_election.json", "w", encoding="utf-8-sig") as f:
    pd.to_json(f, indent=4, orient='index', force_ascii=False)
#for i in json_object:
    #json_object[i]



#for k in json_object:
#    json_object[k]["wahl_jahr"] = k
    
#f = open("good_data_election.json", 'w', encoding='utf-8-sig')
#json.dump(json_object, f, indent=4, ensure_ascii=False)
#f.close()