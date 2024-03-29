import openpyxl

wb = openpyxl.load_workbook("recommendations_votations.xlsx")

SUBST_PARTIES = {
    "PLR (PRD) 3)": "PLR",
    "PLR 3)": "PLR",
    "PLS 3)": "PLS"
}

def findDateOfRef(col_idx, dates, year):
    for date, col_idx_date in reversed(dates):
        if col_idx_date <= col_idx:
            return f"{date} {year}" if year >= 2012 else date

def recomms(parties, sheet, col_idx, year):
    def text_recom(i, col_idx):
        x = sheet[i+4][col_idx-1].value

        if year <= 2011:
            recoms_from_idx = {1: "oui", 2: "non", 4: "blanc", 5: "liberté de vote"}
            return recoms_from_idx.get(x, "none")
        else:
            if x is not None:
                x = x.lower().split()[0]
            else:
                return "none"
            
            if x in {"oui", "non", "liberté de vote", "blanc"}:
                return x
            else:
                return "none"

    return {party: text_recom(i, col_idx) for i, party in enumerate(parties)}

def register_csv(info_refs):
    with open("recommendations.csv", "w") as f:
        printF = lambda *args, end="\n": f.write(" ".join(str(x) for x in args) + end)

        printF("ref_id,date,party,recommendation")

        for id_ref, info in info_refs.items():
            id_ref = id_ref.split()[-1]
            date = info["date"]
            for party, recom in info["recommendations"].items():
                printF(f"{id_ref},{date},{party},{recom}")

if __name__ == "__main__":
    info_refs = dict()
    for year in range(1971, 2024+1):
        sheet = wb[str(year)]

        if 1971 <= year <= 2010:
            sheet.delete_rows(7, 2)
            sheet.delete_rows(5, 1)
            sheet.delete_rows(2, 2)
        if 2011 <= year <= 2019:
            sheet.delete_rows(8, 2)
            sheet.delete_rows(6, 1)
            sheet.delete_rows(2, 3)

        identifiers_refs = {x.value: x.col_idx for x in sheet[3] if x.value is not None}
        dates = [(x.value[:-3], x.col_idx) for x in sheet[2] if x.value is not None][1:] #[1:] for removing the "Parti" column
        
        #extract party names
        listParties = []
        for cell in sheet["A"][3:]:
            if cell.value:
                listParties.append(SUBST_PARTIES.get(cell.value, cell.value))
            else:
                break

        info_refs |= {id_ref: {"date": findDateOfRef(col_idx, dates, year), "recommendations": recomms(listParties, sheet, col_idx, year)} for id_ref, col_idx in identifiers_refs.items()}
    
    register_csv(info_refs)