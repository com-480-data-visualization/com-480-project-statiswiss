import json
import pandas as pd
import numpy as np

#change 662-666 as necessary
with open("666.json", "r", encoding="utf-8") as f:
    data = json.load(f)

with open("good_data.json", "r", encoding="utf-8") as f:
    missing = json.load(f)

for index, it in data.items():
    canton = f"{index}"
    missing["666"][f"{canton}-ja"] = it["yes"]
    missing["666"][f"{canton}-nein"] = it["no"]
    missing["666"][f"{canton}-japroz"] = it["per"]
    missing["666"]["gultig"] = it["val"]
    missing["666"][f"{canton}-berecht"] = it["cas"]
    if it["per"] >= 50.00:
        missing["666"][f"{canton}-annahme"] = 1.00
    else:
        missing["666"][f"{canton}-annahme"] = 0.00


with open("good_data.json", "w", encoding="utf-8") as f:
    json.dump(missing, f, indent=4, ensure_ascii=False)
