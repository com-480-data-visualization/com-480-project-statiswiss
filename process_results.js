const extensionFromParty = {"bdp": "gif", "cvp": "svg", "eco": "png", "edu": "svg", "evp": "png", "fdp": "svg", "fps": "png",
                            "glp": "png", "gps": "png", "kvp": "png", "lega": "gif", "lps": "gif", "mcg": "png", "mitte": "png", 
                            "pda": "png", "sd": "png", "sps": "svg", "svp": "svg", "ucsp": "svg", "poch": "jpg"
                           };
const nameFromAcronym = {
    "bdp": "Parti bourgeois-démocratique",
    "cvp": "Parti démocrate-chrétien",
    "eco": "Les Verts",
    "edu": "Union Démocratique Fédérale",
    "evp": "Parti évangélique suisse",
    "fdp": "Parti Libéral-Radical",
    "fps": "Parti des automobilistes",
    "glp": "Verts'libéraux",
    "gps": "Les Verts",
    "kvp": "Parti démocrate-chrétien",
    "lega": "Lega dei Ticinesi",
    "lps": "Parti libéral suisse",
    "mcg": "Mouvement Citoyens Genevois",
    "mitte": "Le Centre",
    "pda": "Parti suisse du travail",
    "sd": "Démocrates suisses",
    "sps": "Parti socialiste suisse",
    "svp": "Union Démocratique du Centre",
    "ucsp": "Parti chrétien social",
    "poch": "Organisations progressistes de Suisse"
};

const cumulativeHTML = {};
function addInnerHTML(thing, content) {
    if (!(thing in cumulativeHTML))
        cumulativeHTML[thing] = "";
    
    cumulativeHTML[thing] += content + "\n";
}

function generateBlocPartyRecomm(voteInfo) {
    //voteInfo must be a dictionary with keys "p-partyAcronym"
    const recom2color = {1: "bg-green-400", 2: "bg-red-400", 4: "bg-white", 5: "bg-slate-300", 8: "bg-red-400", 9: "bg-green-400", 66: "bg-white"};
    // 1 = oui; 2 = non; 3 = sans recomendation; 4 = vote blanc; 5 = abstention
    // 8 = Recommandation en faveur du contre-projet ; 9 = Recommandation en faveur de l'initiative populaire; 66 = Neutralité : aucune recommandation ou avis, vote blanc ou abstention (utilisé uniquement pour les votes de 1848 à 1969); 999 = le parti n’existait pas à l’époque; . = inconnu

    const partyRecommBloc = document.getElementById("party-recommendations");

    const listParties = [];
    for (const key in voteInfo) {
        if (key.startsWith("p-"))
            listParties.push(key.substring(2));
    }
    listParties.sort((a, b) => (voteInfo["w-"+a] || 0) - (voteInfo["w-"+b] || 0));
    listParties.reverse();

    for (const partyAcronym of listParties) {
        if (partyAcronym in extensionFromParty) {
            const partyRecommendation = voteInfo["p-"+partyAcronym];
            if (partyRecommendation in recom2color) {
                addInnerHTML(partyRecommBloc, `<div class="py-1 border border-2 border-black ${recom2color[partyRecommendation]}" title="${nameFromAcronym[partyAcronym]}">
<img src="resources/party_logos/${partyAcronym}.${extensionFromParty[partyAcronym]}" class="m-auto h-20" />
</div>`);
            }
        }
    }

    partyRecommBloc.innerHTML = cumulativeHTML[partyRecommBloc];
}

function infoBoxLocal(voteInfo, cantonCode) {

}