import json
import pandas as pd
import numpy as np

with open("election_federale.csv", "r", encoding="utf-8-sig") as f:
    df = pd.read_csv(f, delimiter=";", index_col=False)
df = df.replace(".", float("nan"))
for col in df.columns:
    try:
        if col != "wahl_jahr":
            df[col] = df[col].astype(float)
    except:
        pass

with open("data_election.json", "w", encoding="utf-8") as f:
    df.to_json(f, indent=4, orient='index', force_ascii=False)

with open('data_election.json', encoding="utf-8") as file:
    data = json.load(file)

new_dict = {}
replacements = {
    "Schweiz": "ch",
    "Zürich": "zh",
    "Bern / Berne": "be",
    "Luzern": "lu",
    "Uri": "ur",
    "Schwyz": "sz",
    "Zug": "zg",
    "Fribourg / Freiburg": "fr",
    "Solothurn": "so",
    "Basel-Stadt": "bs",
    "Basel-Landschaft": "bl",
    "Schaffhausen": "sh",
    "Appenzell Ausserrhoden": "ar",
    "Appenzell Innerrhoden": "ai",
    "St. Gallen": "sg",
    "Graubünden / Grigioni / Grischun": "gr",
    "Aargau": "ag",
    "Thurgau": "tg",
    "Ticino": "ti",
    "Vaud": "vd",
    "Valais / Wallis": "vs",
    "Neuchâtel": "ne",
    "Genève": "ge",
    "Jura": "ju",
    "Obwalden": "ow",
    "Nidwalden": "nw",
    "Glarus": "gl",
    "partei_bezeichnung_de": "party_acronym",
    "partei_staerke": "percent_cantons"
}

names = {
    "sp": "sps",
    "grüne": "gps",
    "pda/sol.": "pda"
}

for key, val in data.items():
    if "wahl_jahr" in val:
        pb = val.get("partei_bezeichnung_de", "").lower()
        pb = names.get(pb, pb)

        canton = val.get("geoLevelName", "")
        nom = val.get("partei_staerke", None)

        jahr = int(val["wahl_jahr"])
        if jahr not in new_dict:
            new_dict[jahr] = []
        canton = replacements.get(canton, canton)

        p = next((item for item in new_dict[jahr] if item["partei_bezeichnung_de"] == pb), None)
        if not p:
            p = {
                "partei_bezeichnung_de": pb,
                "partei_staerke": {}
            }
            new_dict[jahr].append(p)
        if nom is not None:
            p["partei_staerke"][canton] = nom


with open("good_data_election.json", "w", encoding="utf-8") as f:
    json.dump(new_dict, f, indent=4, ensure_ascii=False)