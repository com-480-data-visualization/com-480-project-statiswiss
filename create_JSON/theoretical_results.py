import codecs
import json
import os

refsPath = "../website/resources/results"
federalElectionResultsPath = os.path.join(refsPath, "federal_elections.json")
votesInfosPath = "../website/resources/json_swiss_data_2.json"

votesInfos = json.load(codecs.open(votesInfosPath, "r", "utf-8-sig"))
federalElectionResults = json.load(open(federalElectionResultsPath))

#refractor federal election results for convenience
federalElectionResults = {year: {x["partei_bezeichnung_de"]: x["partei_staerke"] for x in data} for year, data in federalElectionResults.items()}

recommsYes = {1, 9}
recommsNo = {2, 8}

for i, (refId, voteInfo) in enumerate(votesInfos.items()):
    #extract party recommendations
    print(refId)
    partiesRecomms = {fieldName[len("p-"):]: int(voteInfo[fieldName]) for fieldName in filter(lambda fieldName: fieldName.startswith("p-") and voteInfo[fieldName] is not None, voteInfo.keys())}

    electionYear = voteInfo["annee_legislatur"].split("-")[0]
    
    federal = federalElectionResults.get(electionYear) #can be None if we do not have federal election data -> ignore
    if federal:
        yes = dict()
        no = dict()

        for party, recomm in partiesRecomms.items():
            if party in federal:
                for cantonCode, percentage in federal[party].items():
                    turnoutVote = voteInfo[cantonCode+"-berecht"] if cantonCode != "ch" else sum(voteInfo[x] for x in voteInfo if x.endswith("-berecht"))
                    weight = turnoutVote * 0.01 * percentage
                    
                    if cantonCode not in yes:
                        yes[cantonCode] = 0
                        no[cantonCode] = 0
                    
                    if recomm in recommsYes:
                        yes[cantonCode] += weight
                    elif recomm in recommsNo:
                        no[cantonCode] += weight
        
        res = {cantonCode: (100*a)/(a+b) for (cantonCode, a), b in zip(yes.items(), no.values()) if a+b != 0}
        for cantonCode, scoreYes in list(res.items()):
            res[f"{cantonCode}-annahme" if cantonCode != "ch" else "annahme"] = int(scoreYes >= 50) + 8*(voteInfo["forme"] == 5)

        res["forme"] = voteInfo["forme"]

        with open(os.path.join(os.path.dirname(refsPath), f"sims/{refId}.json"), "w") as f:
            json.dump(res, f)
            print(f"Saved {refId}, {i+1}/{len(votesInfos)}")