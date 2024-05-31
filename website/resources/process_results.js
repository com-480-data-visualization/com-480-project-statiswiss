const extensionFromParty = {"bdp": "gif", "cvp": "svg", "eco": "jpg", "edu": "svg", "evp": "png", "fdp": "svg", "fps": "png",
                            "glp": "png", "gps": "png", "kvp": "png", "lega": "gif", "lps": "png", "mcg": "png", "mitte": "png", 
                            "pda": "png", "sd": "png", "sps": "svg", "svp": "svg", "ucsp": "svg", "poch": "jpg"
                           };
const nameFromAcronym = {
    "fr": {
        "bdp": "Parti bourgeois-démocratique",
        "cvp": "Parti démocrate-chrétien",
        "eco": "Economiesuisse",
        "edu": "Union Démocratique Fédérale",
        "evp": "Parti évangélique suisse",
        "fdp": "Parti Libéral-Radical",
        "fps": "Parti des automobilistes",
        "glp": "Verts'libéraux",
        "gps": "Les Verts",
        "kvp": "Parti chrétien-conservateur",
        "lega": "Lega dei Ticinesi",
        "lps": "Parti libéral suisse",
        "mcg": "Mouvement Citoyens Genevois",
        "mitte": "Le Centre",
        "pda": "Parti suisse du travail",
        "sd": "Démocrates suisses",
        "sps": "Parti socialiste suisse",
        "svp": "Union Démocratique du Centre",
        "ucsp": "Parti chrétien social",
        "poch": "Organisations progressistes de Suisse",
        "übrige": "Autres"
    },
    "de": {
        "bdp": "Bürgerlich-Demokratische Partei",
        "cvp": "Christlichdemokratische Volkspartei",
        "eco": "Economiesuisse",
        "edu": "Eidgenössisch-Demokratische Union",
        "evp": "Evangelische Volkspartei",
        "fdp": "Freisinnig-demokratische Partei",
        "fps": "Autopartei",
        "glp": "Grünliberale Partei",
        "gps": "Grüne Partei der Schweiz",
        "kvp": "Katholische Volkspartei",
        "lega": "Lega dei Ticinesi",
        "lps": "Liberale Partei der Schweiz",
        "mcg": "Mouvement Citoyens Genevois",
        "mitte": "Die Mitte",
        "pda": "Partei der Arbeit",
        "sd": "Schweizer Demokraten",
        "sps": "Sozialdemokratische Partei",
        "svp": "Schweizerische Volkspartei",
        "ucsp": "Christlichsoziale Partei der Schweiz",
        "poch": "Progressive Organisationen der Schweiz",
        "übrige": "Übrige"
    },
    "en": {
        "bdp": "Conservative Democratic Party",
        "cvp": "Christian Democratic People's Party of Switzerland",
        "eco": "Economiesuisse",
        "edu": "Federal Democratic Union",
        "evp": "Evangelical People's Party of Switzerland",
        "fdp": "Free Democratic Party",
        "fps": "Freedom Party",
        "glp": "Green Liberal Party",
        "gps": "Green Party",
        "kvp": "Catholic People's Party of Switzerland",
        "lega": "Lega dei Ticinesi",
        "lps": "Liberal Party of Switzerland",
        "mcg": "Geneva Citizens' Movement",
        "mitte": "The Centre",
        "pda": "Swiss Party of Labour",
        "sd": "Swiss Democrats",
        "sps": "Social Democratic Party of Switzerland",
        "svp": "Swiss People's Party",
        "ucsp": "Christian Social Party of Switzerland",
        "poch": "Progressive Organizations of Switzerland",
        "übrige": "Others"
    },
};
const colorFromAcronym = {
    "bdp": "#FEFE00",
    "cvp": "#FE9A2E",
    "eco": "#84B414",
    "edu": "#556627",
    "evp": "#FFD500",
    "fdp": "#007AD2",
    "fps": "#000000",
    "glp": "#B4DC00",
    "gps": "#84B414",
    "kvp": "#FE9A2E",
    "lega": "#0066FF",
    "lps": "#007AD2",
    "mcg": "#FEE801",
    "mitte": "#FE9A2E",
    "pda": "#E93C1A",
    "sd": "#000000",
    "sps": "#FA1360",
    "svp": "#008B3C",
    "ucsp": "#00A8B0",
    "poch": "#f43e6b",
    "übrige": "#C0C0C0"
};

const themes = {
    "en": {"1": "State Order", "1.1": "National Identity", "1.2": "Political System", "1.21": "Federal Constitution", "1.22": "Constitutional Process", "1.23": "Legislative Process", "1.24": "Electoral System", "1.3": "Institutions", "1.31": "Government, Administration", "1.32": "Parliament", "1.33": "Courts", "1.34": "National Bank", "1.4": "People's Rights", "1.41": "Initiative", "1.42": "Referendum", "1.43": "Voting Rights", "1.5": "Federalism", "1.51": "Territorial Issues", "1.52": "Relations between Confederation and Cantons", "1.53": "Division of Tasks", "1.6": "Legal Order", "1.61": "International Law", "1.62": "Fundamental Rights", "1.63": "Citizenship", "1.64": "Private Law", "1.65": "Criminal Law", "1.66": "Data Protection", "2": "Foreign Policy", "2.1": "Basic Attitude in Foreign Policy", "2.11": "Neutrality", "2.12": "Independence", "2.13": "Good Offices", "2.2": "European Policy", "2.21": "EFTA", "2.22": "EU", "2.23": "EEA", "2.24": "Other European Organizations", "2.3": "International Organizations", "2.31": "UN", "2.32": "Other International Organizations", "2.4": "Development Cooperation", "2.5": "State Treaties with Individual States", "2.6": "Foreign Economic Policy", "2.61": "Export Promotion", "2.62": "Customs", "2.7": "Diplomacy", "2.8": "Swiss Abroad", "3": "Security Policy", "3.1": "Public Security", "3.11": "Civil Protection", "3.12": "State Security", "3.13": "Police", "3.2": "Army", "3.21": "Army (General)", "3.22": "Military Organization", "3.23": "Armaments", "3.24": "Military Facilities", "3.25": "Conscientious Objection, Civilian Service", "3.26": "Abolition of the Army", "3.27": "Military Training", "3.28": "International Missions", "3.3": "National Supply", "4": "Economy", "4.1": "Economic Policy", "4.11": "Economic Cycle Policy", "4.12": "Competition Policy", "4.13": "Structural Policy", "4.14": "Pricing Policy", "4.15": "Consumer Protection", "4.16": "Corporate Law", "4.2": "Work and Employment", "4.21": "Working Conditions", "4.22": "Working Hours", "4.23": "Social Partnership", "4.24": "Employment Policy", "4.3": "Financial Sector", "4.31": "Monetary and Currency Policy", "4.32": "Banks, Stock Exchanges, Insurance", "4.4": "Leisure and Tourism", "4.41": "Tourism", "4.42": "Hospitality Industry", "4.43": "Gambling", "5": "Agriculture", "5.1": "Agricultural Policy", "5.2": "Animal Production", "5.3": "Plant Production", "5.4": "Forestry", "5.5": "Fisheries, Hunting, Pets", "6": "Public Finances", "6.1": "Taxation", "6.11": "Tax Policy", "6.12": "Tax System", "6.13": "Direct Taxes", "6.14": "Indirect Taxes", "6.2": "Financial Order", "6.3": "Public Expenditures", "6.4": "Savings and Restructuring Measures", "7": "Energy", "7.1": "Energy Policy", "7.2": "Nuclear Energy", "7.3": "Hydropower", "7.4": "Alternative Energies", "7.5": "Oil, Gas", "8": "Transport and Infrastructure", "8.1": "Transport Policy", "8.11": "Urban Traffic", "8.12": "Transit Traffic", "8.2": "Road Traffic", "8.21": "Road Construction", "8.22": "Heavy Traffic", "8.3": "Rail Transport", "8.31": "Freight Transport", "8.32": "Passenger Transport", "8.4": "Air Transport", "8.5": "Shipping", "8.6": "Postal Services", "8.7": "Telecommunications", "9": "Environment and Living Space", "9.1": "Land", "9.11": "Spatial Planning", "9.12": "Land Law", "9.2": "Housing", "9.21": "Tenancy", "9.22": "Housing Construction, Home Ownership", "9.3": "Environment", "9.31": "Environmental Policy", "9.32": "Noise Protection", "9.33": "Air Quality Control", "9.34": "Water Protection", "9.35": "Soil Protection", "9.36": "Waste", "9.37": "Nature and Heritage Protection", "9.38": "Animal Protection", "10": "Social Policy", "10.1": "Health", "10.11": "Health Policy", "10.12": "Medical Research and Technology", "10.13": "Pharmaceuticals", "10.14": "Addictive Substances", "10.15": "Reproductive Medicine", "10.2": "Social Insurance", "10.21": "Old Age and Survivors' Insurance", "10.22": "Disability Insurance", "10.23": "Occupational Pension Schemes", "10.24": "Health and Accident Insurance", "10.25": "Maternity Insurance", "10.26": "Unemployment Insurance", "10.27": "Income Compensation Scheme", "10.28": "Social Welfare", "10.3": "Social Groups", "10.31": "Foreigners", "10.32": "Refugees", "10.33": "Women's Status", "10.34": "Family Policy", "10.35": "Children and Youth", "10.36": "Seniors", "10.37": "Disabled People", "10.38": "Homosexuals", "11": "Education and Research", "11.1": "Education Policy", "11.2": "Schools", "11.3": "Higher Education", "11.4": "Research", "11.41": "Genetic Technology", "11.42": "Animal Testing", "11.5": "Vocational Education", "12": "Culture, Religion, Media", "12.1": "Cultural Policy", "12.2": "Language Policy", "12.3": "Religion, Churches", "12.4": "Sports", "12.5": "Media and Communication", "12.51": "Media Policy", "12.52": "Press", "12.53": "Radio, Television, Electronic Media", "12.54": "Freedom of the Media"},
    "de": {"1": "Staatsordnung", "1.1": "Nationale Identität", "1.2": "Politisches System", "1.21": "Bundesverfassung", "1.22": "Verfassungsgebungsverfahren", "1.23": "Gesetzgebungsverfahren", "1.24": "Wahlsystem", "1.3": "Institutionen", "1.31": "Regierung, Verwaltung", "1.32": "Parlament", "1.33": "Gerichte", "1.34": "Nationalbank", "1.4": "Volksrechte", "1.41": "Initiative", "1.42": "Referendum", "1.43": "Stimmrecht", "1.5": "Föderalismus", "1.51": "Territorialfragen", "1.52": "Beziehungen zwischen Bund und Kantonen", "1.53": "Aufgabenteilung", "1.6": "Rechtsordnung", "1.61": "Internationales Recht", "1.62": "Grundrechte", "1.63": "Bürgerrecht", "1.64": "Privatrecht", "1.65": "Strafrecht", "1.66": "Datenschutz", "2": "Aussenpolitik", "2.1": "Aussenpolitische Grundhaltung", "2.11": "Neutralität", "2.12": "Unabhängigkeit", "2.13": "Gute Dienste", "2.2": "Europapolitik", "2.21": "EFTA", "2.22": "EU", "2.23": "EWR", "2.24": "Andere europäische Organisationen", "2.3": "Internationale Organisationen", "2.31": "UNO", "2.32": "Andere internationale Organisationen", "2.4": "Entwicklungszusammenarbeit", "2.5": "Staatsverträge mit einzelnen Staaten", "2.6": "Aussenwirtschaftspolitik", "2.61": "Exportförderung", "2.62": "Zollwesen", "2.7": "Diplomatie", "2.8": "Auslandschweizer:innen", "3": "Sicherheitspolitik", "3.1": "Öffentliche Sicherheit", "3.11": "Bevölkerungsschutz", "3.12": "Staatsschutz", "3.13": "Polizei", "3.2": "Armee", "3.21": "Armee (allgemein)", "3.22": "Militärorganisation", "3.23": "Rüstung", "3.24": "Militäranlagen", "3.25": "Dienstverweigerung, Zivildienst", "3.26": "Armeeabschaffung", "3.27": "Militärische Ausbildung", "3.28": "Internationale Einsätze", "3.3": "Landesversorgung", "4": "Wirtschaft", "4.1": "Wirtschaftspolitik", "4.11": "Konjunkturpolitik", "4.12": "Wettbewerbspolitik", "4.13": "Strukturpolitik", "4.14": "Preispolitik", "4.15": "Konsumentenschutz", "4.16": "Gesellschaftsrecht", "4.2": "Arbeit und Beschäftigung", "4.21": "Arbeitsbedingungen", "4.22": "Arbeitszeit", "4.23": "Sozialpartnerschaft", "4.24": "Beschäftigungspolitik", "4.3": "Finanzwesen", "4.31": "Geld- und Währungspolitik", "4.32": "Banken, Börsen, Versicherungen", "4.4": "Freizeit und Tourismus", "4.41": "Fremdenverkehr", "4.42": "Hotellerie und Gastgewerbe", "4.43": "Geldspiele", "5": "Landwirtschaft", "5.1": "Agrarpolitik", "5.2": "Tierische Produktion", "5.3": "Pflanzliche Produktion", "5.4": "Forstwirtschaft", "5.5": "Fischerei, Jagd, Haustiere", "6": "Öffentliche Finanzen", "6.1": "Steuerwesen", "6.11": "Steuerpolitik", "6.12": "Steuersystem", "6.13": "Direkte Steuern", "6.14": "Indirekte Steuern", "6.2": "Finanzordnung", "6.3": "Öffentliche Ausgaben", "6.4": "Spar- und Sanierungsmassnahmen", "7": "Energie", "7.1": "Energiepolitik", "7.2": "Kernenergie", "7.3": "Wasserkraft", "7.4": "Alternativenergien", "7.5": "Erdöl, Gas", "8": "Verkehr und Infrastruktur", "8.1": "Verkehrspolitik", "8.11": "Agglomerationsverkehr", "8.12": "Transitverkehr", "8.2": "Strassenverkehr", "8.21": "Strassenbau", "8.22": "Schwerverkehr", "8.3": "Schienenverkehr", "8.31": "Güterverkehr", "8.32": "Personenverkehr", "8.4": "Luftverkehr", "8.5": "Schifffahrt", "8.6": "Post", "8.7": "Telekommunikation", "9": "Umwelt und Lebensraum", "9.1": "Boden", "9.11": "Raumplanung", "9.12": "Bodenrecht", "9.2": "Wohnen", "9.21": "Mietwesen", "9.22": "Wohnungsbau, Wohneigentum", "9.3": "Umwelt", "9.31": "Umweltpolitik", "9.32": "Lärmschutz", "9.33": "Luftreinhaltung", "9.34": "Gewässerschutz", "9.35": "Bodenschutz", "9.36": "Abfälle", "9.37": "Natur- und Heimatschutz", "9.38": "Tierschutz", "10": "Sozialpolitik", "10.1": "Gesundheit", "10.11": "Gesundheitspolitik", "10.12": "Medizinforschung und –technik", "10.13": "Medikamente", "10.14": "Suchtmittel", "10.15": "Fortpflanzungsmedizin", "10.2": "Sozialversicherungen", "10.21": "Alters- und Hinterbliebenenversicherung", "10.22": "Invalidenversicherung", "10.23": "Berufliche Vorsorge", "10.24": "Kranken- und Unfallversicherung", "10.25": "Mutterschaftsversicherung", "10.26": "Arbeitslosenversicherung", "10.27": "Erwerbsersatzordnung", "10.28": "Fürsorge", "10.3": "Soziale Gruppen", "10.31": "Ausländer:innen", "10.32": "Flüchtlinge", "10.33": "Stellung der Frau", "10.34": "Familienpolitik", "10.35": "Kinder und Jugendliche", "10.36": "Senior:innen", "10.37": "Behinderte", "10.38": "Homosexuelle", "11": "Bildung und Forschung", "11.1": "Bildungspolitik", "11.2": "Schulen", "11.3": "Hochschulen", "11.4": "Forschung", "11.41": "Gentechnologie", "11.42": "Tierversuche", "11.5": "Berufsbildung", "12": "Kultur, Religion, Medien", "12.1": "Kulturpolitik", "12.2": "Sprachpolitik", "12.3": "Religion, Kirchen", "12.4": "Sport", "12.5": "Medien und Kommunikation", "12.51": "Medienpolitik", "12.52": "Presse", "12.53": "Radio, Fernsehen, Elektronische Medien", "12.54": "Medienfreiheit"},
    "fr": {"1": "Ordre Étatique", "1.1": "Identité Nationale", "1.2": "Système Politique", "1.21": "Constitution Fédérale", "1.22": "Procédure Constitutionnelle", "1.23": "Procédure Législative", "1.24": "Système Électoral", "1.3": "Institutions", "1.31": "Gouvernement, Administration", "1.32": "Parlement", "1.33": "Tribunaux", "1.34": "Banque Nationale", "1.4": "Droits Populaires", "1.41": "Initiative", "1.42": "Référendum", "1.43": "Droit de Vote", "1.5": "Fédéralisme", "1.51": "Questions Territoriales", "1.52": "Relations entre la Confédération et les Cantons", "1.53": "Répartition des Tâches", "1.6": "Ordre Juridique", "1.61": "Droit International", "1.62": "Droits Fondamentaux", "1.63": "Citoyenneté", "1.64": "Droit Privé", "1.65": "Droit Pénal", "1.66": "Protection des Données", "2": "Politique Étrangère", "2.1": "Attitude de Base en Politique Étrangère", "2.11": "Neutralité", "2.12": "Indépendance", "2.13": "Bons Offices", "2.2": "Politique Européenne", "2.21": "AELE", "2.22": "UE", "2.23": "EEE", "2.24": "Autres Organisations Européennes", "2.3": "Organisations Internationales", "2.31": "ONU", "2.32": "Autres Organisations Internationales", "2.4": "Coopération au Développement", "2.5": "Traités d'État avec des États Individuels", "2.6": "Politique Économique Extérieure", "2.61": "Promotion des Exportations", "2.62": "Douanes", "2.7": "Diplomatie", "2.8": "Suisses de l'Étranger", "3": "Politique de Sécurité", "3.1": "Sécurité Publique", "3.11": "Protection Civile", "3.12": "Sécurité de l'État", "3.13": "Police", "3.2": "Armée", "3.21": "Armée (Général)", "3.22": "Organisation Militaire", "3.23": "Armements", "3.24": "Installations Militaires", "3.25": "Objection de Conscience, Service Civil", "3.26": "Abolition de l'Armée", "3.27": "Formation Militaire", "3.28": "Missions Internationales", "3.3": "Approvisionnement National", "4": "Économie", "4.1": "Politique Économique", "4.11": "Politique de Conjoncture", "4.12": "Politique de la Concurrence", "4.13": "Politique Structurelle", "4.14": "Politique des Prix", "4.15": "Protection des Consommateurs", "4.16": "Droit des Sociétés", "4.2": "Travail et Emploi", "4.21": "Conditions de Travail", "4.22": "Temps de Travail", "4.23": "Partenariat Social", "4.24": "Politique de l'Emploi", "4.3": "Secteur Financier", "4.31": "Politique Monétaire et de Change", "4.32": "Banques, Bourses, Assurances", "4.4": "Loisirs et Tourisme", "4.41": "Tourisme", "4.42": "Industrie Hôtelière", "4.43": "Jeux d'Argent", "5": "Agriculture", "5.1": "Politique Agricole", "5.2": "Production Animale", "5.3": "Production Végétale", "5.4": "Sylviculture", "5.5": "Pêche, Chasse, Animaux Domestiques", "6": "Finances Publiques", "6.1": "Fiscalité", "6.11": "Politique Fiscale", "6.12": "Système Fiscal", "6.13": "Impôts Directs", "6.14": "Impôts Indirects", "6.2": "Ordre Financier", "6.3": "Dépenses Publiques", "6.4": "Mesures d'Épargne et de Redressement", "7": "Énergie", "7.1": "Politique Énergétique", "7.2": "Énergie Nucléaire", "7.3": "Hydroélectricité", "7.4": "Énergies Alternatives", "7.5": "Pétrole, Gaz", "8": "Transport et Infrastructure", "8.1": "Politique des Transports", "8.11": "Trafic Urbain", "8.12": "Trafic de Transit", "8.2": "Trafic Routier", "8.21": "Construction de Routes", "8.22": "Trafic Lourds", "8.3": "Transport Ferroviaire", "8.31": "Transport de Marchandises", "8.32": "Transport de Passagers", "8.4": "Transport Aérien", "8.5": "Navigation", "8.6": "Services Postaux", "8.7": "Télécommunications", "9": "Environnement et Habitat", "9.1": "Sol", "9.11": "Aménagement du Territoire", "9.12": "Droit Foncier", "9.2": "Logement", "9.21": "Location", "9.22": "Construction de Logements, Propriété de Logement", "9.3": "Environnement", "9.31": "Politique Environnementale", "9.32": "Protection contre le Bruit", "9.33": "Contrôle de la Qualité de l'Air", "9.34": "Protection des Eaux", "9.35": "Protection des Sols", "9.36": "Déchets", "9.37": "Protection de la Nature et du Patrimoine", "9.38": "Protection des Animaux", "10": "Politique Sociale", "10.1": "Santé", "10.11": "Politique de Santé", "10.12": "Recherche et Technologie Médicale", "10.13": "Médicaments", "10.14": "Substances Addictives", "10.15": "Médecine de la Reproduction", "10.2": "Assurances Sociales", "10.21": "Assurance Vieillesse et Survivants", "10.22": "Assurance Invalidité", "10.23": "Prévoyance Professionnelle", "10.24": "Assurance Maladie et Accidents", "10.25": "Assurance Maternité", "10.26": "Assurance Chômage", "10.27": "Régime des Allocations pour Perte de Gain", "10.28": "Aide Sociale", "10.3": "Groupes Sociaux", "10.31": "Étrangers", "10.32": "Réfugiés", "10.33": "Statut des Femmes", "10.34": "Politique Familiale", "10.35": "Enfants et Jeunes", "10.36": "Seniors", "10.37": "Personnes Handicapées", "10.38": "Homosexuels", "11": "Éducation et Recherche", "11.1": "Politique Éducative", "11.2": "Écoles", "11.3": "Universités", "11.4": "Recherche", "11.41": "Technologie Génétiques", "11.42": "Expérimentation Animale", "11.5": "Formation Professionnelle", "12": "Culture, Religion, Médias", "12.1": "Politique Culturelle", "12.2": "Politique Linguistique", "12.3": "Religion, Églises", "12.4": "Sports", "12.5": "Médias et Communication", "12.51": "Politique des Médias", "12.52": "Presse", "12.53": "Radio, Télévision, Médias Électroniques", "12.54": "Liberté des Médias"},
};
const cantons = ["zh", "be", "lu", "ur", "sz", "gl", "zg", "fr", "so", "sh", "sg", "gr", "ag", "tg", "ti", "vd", "vs", "ne", "ge", "ju"];
const halfCantons = ["nw", "ow", "ai", "ar", "bs", "bl"];

const cumulativeHTML = {};
function addInnerHTML(thing, content) {
    if (!(thing in cumulativeHTML))
        cumulativeHTML[thing] = "";
    
    cumulativeHTML[thing] += content + "\n";
}

function generateBlocPartyRecomm(voteInfo, lang) {
    //voteInfo must be a dictionary with keys "p-partyAcronym"
    const recom2color = {1: "bg-green-400", 2: "bg-red-500", 4: "bg-white", 5: "bg-slate-300", 8: "bg-red-500", 9: "bg-green-400", 66: "bg-white"};
    const recom2label = {
        "en": {1: "Yes", 2: "No", 3: "No recommendation", 4: "None of the above", 5: "'Vote as you wish'", 8: "For the Counterproject", 9: "For the Popular Initiative", 66: "Neutral"},
        "fr": {1: "Oui", 2: "Non", 3: "Sans recommendation", 4: "Vote blanc", 5: "Liberté de vote", 8: "Recommandation en faveur du contre-projet", 9: "Recommandation en faveur de l'initiative populaire", 66: "Neutralité"},
        "de": {1: "Ja", 2: "Nein", 3: "Keine Parole", 4: "leer Stimmzettel", 5: "Stimmfrei", 8: "Parole auf Bevorzugung des Gegenentwurfs", 9: "Parole auf Bevorzugung der Volksinitiative", 66: "Neutral"}
};
    // 1 = oui; 2 = non; 3 = sans recomendation; 4 = vote blanc; 5 = abstention
    // 8 = Recommandation en faveur du contre-projet ; 9 = Recommandation en faveur de l'initiative populaire; 66 = Neutralité : aucune recommandation ou avis, vote blanc ou abstention (utilisé uniquement pour les votes de 1848 à 1969); 999 = le parti n’existait pas à l’époque; . = inconnu

    const partyRecommBloc = "party-recommendations";

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
                addInnerHTML(partyRecommBloc, `<div class="py-1 border border-2 border-black ${recom2color[partyRecommendation]}" title="${nameFromAcronym[lang][partyAcronym]} (${recom2label[lang][partyRecommendation]})">
<img src="resources/party_logos/${partyAcronym}.${extensionFromParty[partyAcronym]}" class="m-auto h-12" />
</div>`);
            }
        }
    }

    document.getElementById(partyRecommBloc).innerHTML = cumulativeHTML[partyRecommBloc];
}

function localResultsCanton(infoFederalElection, cantonCode) {
    const ret = [];
    const relevanceThreshold = 4;

    for (const partyInfo of infoFederalElection) {
        const partyAcronym = partyInfo["partei_bezeichnung_de"];
        const percentage = partyInfo["partei_staerke"][cantonCode];

        if (partyAcronym in nameFromAcronym[lang] && percentage >= relevanceThreshold)
            ret.push({x: partyAcronym, y: percentage, fillColor: colorFromAcronym[partyAcronym]});
    }

    ret.sort((a, b) => b["y"]-a["y"]);

    return ret;
}

function getTheme(voteInfo, lang) {
    return [themes[lang][voteInfo["d1e1"]], themes[lang][voteInfo["d1e2"]], themes[lang][voteInfo["d1e3"]]];
}

function writeBlurb(voteInfo, lang) {
    const blurbContent = "blurb-content";
    const theme = {"en": "Theme:", "fr": "Thème :", "de": "Politikbereich:"}[lang];
    const brochure = {"en": "Brochure", "fr": "Brochure", "de": "Broschüre"}[lang];
    const videoTxt = {"en": "Explanatory video", "fr": "Vidéo explicative", "de": "Erklärvideo"}[lang];

    addInnerHTML(blurbContent, `<h2 class="font-semibold hyphens-auto" lang="${lang}">${voteInfo["titre_complet_"+lang]}</h2>`);
    addInnerHTML(blurbContent, voteInfo["date"]);
    addInnerHTML(blurbContent, '<br/><br/>');
    addInnerHTML(blurbContent, `<h3 class="font-semibold hyphens-auto" lang="${lang}">${theme}`);
    for (const themeName of getTheme(voteInfo, lang))
        if (themeName) addInnerHTML(blurbContent, `<br/>&gt; ${themeName}`);

    addInnerHTML(blurbContent, "</h3>\n<br/>");
    addInnerHTML(blurbContent, `<a href="${voteInfo["swissvoteslink"]}/brochure-${(['fr', 'de'].includes(lang)) ? lang : 'de'}.pdf" target="_blank"><div class="w-10/12 rounded-full text-center py-2 mx-auto text-white" style="background: #da291c;">${brochure}</div></a>`);
    if (voteInfo["easyvideo_fr"])
        addInnerHTML(blurbContent, `<br/>\n<a href="${voteInfo["easyvideo_fr"]}" target="_blank"><div class="w-10/12 rounded-full text-center py-2 mx-auto text-white" style="background: #da291c;">${videoTxt} (fr)</div></a>`);
    if (voteInfo["easyvideo_de"])
        addInnerHTML(blurbContent, `<br/>\n<a href="${voteInfo["easyvideo_de"]}" target="_blank"><div class="w-10/12 rounded-full text-center py-2 mx-auto text-white" style="background: #da291c;">${videoTxt} (de)</div></a>`);

    document.getElementById(blurbContent).innerHTML = cumulativeHTML[blurbContent];
}

function writeResultsFederal(voteInfo, lang) {
    const globalResult = "global-result";
    const yes = ((voteInfo["forme"] != 5) ? {"en": "Yes", "fr": "Oui", "de": "Ja"} : {"en": "Popular Initiative", "fr": "Initiative populaire", "de": "Volksinitiative"})[lang];
    const no = ((voteInfo["forme"] != 5) ? {"en": "No", "fr": "Non", "de": "Nein"} : {"en": "Counterproject", "fr": "Contre-projet", "de": "Gegenentwurf"})[lang];

    //passed or not
    addInnerHTML(globalResult, `<div class="text-3xl font-bold ${([1,9].includes(voteInfo["annahme"])) ? "text-green-400" : "text-red-500"} pr-2">${[1, 9].includes(voteInfo["annahme"]) ? yes : no}</div>`);
    
    //popular vote
    addInnerHTML(globalResult, '<div class="flex flex-row">');
    addInnerHTML(globalResult, `  <div class="flex-none basis-2/12 text-4xl font-bold text-green-400 pr-2">${voteInfo["volkja-proz"].toFixed(1)}%</div>`);
    addInnerHTML(globalResult, `  <div class="flex-initial basis-8/12 border-solid h-10 bg-red-500 rounded-full overflow-hidden border-4 border-black"><div class="bg-green-400 h-8" style="width: ${voteInfo['volkja-proz']}%;"></div></div>`);
    addInnerHTML(globalResult, `  <div class="flex-none basis-2/12 text-4xl font-bold text-red-500 pl-2">${(100-voteInfo["volkja-proz"]).toFixed(1)}%</div>`);
    addInnerHTML(globalResult, "</div>");

    //cantons
    if (voteInfo["forme"] != 5) { // does not apply to tie-breaker questions
        cantonsHalfYes = cantonsHalfCantons(voteInfo);
        const cantonsTxt = {"en": "Cantons:", "fr": "Cantons :", "de": "Kantone:"}[lang];

        addInnerHTML(globalResult, `<div class="text-2xl font-semibold text-black">${cantonsTxt}</div>`);
        addInnerHTML(globalResult, '<div class="flex flex-row">');
        addInnerHTML(globalResult, `  <div class="flex-none basis-2/12 text-4xl font-bold text-green-400 pr-2">${cantonsHalfYes[0]} ${cantonsHalfYes[1]}/2</div>`);
        addInnerHTML(globalResult, `  <div class="flex-initial basis-8/12 border-solid h-10 bg-red-500 rounded-full overflow-hidden border-4 border-black"><div class="bg-green-400 h-8" style="width: ${(100 * voteInfo["kt-ja"]) / 23}%;"></div></div>`);
        addInnerHTML(globalResult, `  <div class="flex-none basis-2/12 text-4xl font-bold text-red-500 pl-2">${20-cantonsHalfYes[0]} ${6-cantonsHalfYes[1]}/2</div>`);
        addInnerHTML(globalResult, '</div>');
    }

    document.getElementById(globalResult).innerHTML = cumulativeHTML[globalResult];
}

function writeSimulatedResults(simResultedResults, lang) {
    const globalResult = "global-result";
    const yes = ((simResultedResults["forme"] != 5) ? {"en": "Yes", "fr": "Oui", "de": "Ja"} : {"en": "Popular Initiative", "fr": "Initiative populaire", "de": "Volksinitiative"})[lang];
    const no = ((simResultedResults["forme"] != 5) ? {"en": "No", "fr": "Non", "de": "Nein"} : {"en": "Counterproject", "fr": "Contre-projet", "de": "Gegenentwurf"})[lang];

    //passed or not
    addInnerHTML(globalResult, `<div class="text-3xl font-bold ${[1, 9].includes(simResultedResults["annahme"]) ? "text-green-400" : "text-red-500"} pr-2">${[1, 9].includes(simResultedResults["annahme"]) ? yes : no}</div>`);
    
    //popular vote
    addInnerHTML(globalResult, '<div class="flex flex-row">');
    addInnerHTML(globalResult, `  <div class="flex-none basis-2/12 text-4xl font-bold text-green-400 pr-2">${simResultedResults["ch"]["per"].toFixed(1)}%</div>`);
    addInnerHTML(globalResult, `  <div class="flex-initial basis-8/12 border-solid h-10 bg-red-500 rounded-full overflow-hidden border-4 border-black"><div class="bg-green-400 h-8" style="width: ${simResultedResults['ch']["per"]}%;"></div></div>`);
    addInnerHTML(globalResult, `  <div class="flex-none basis-2/12 text-4xl font-bold text-red-500 pl-2">${(100-simResultedResults["ch"]["per"]).toFixed(1)}%</div>`);
    addInnerHTML(globalResult, "</div>");

    //cantons
    if (simResultedResults["forme"] != 5) { // does not apply to tie-breaker questions
        cantonsHalfYes = cantonsHalfCantons(simResultedResults);
        const cantonsTxt = {"en": "Cantons:", "fr": "Cantons :", "de": "Kantone:"}[lang];
        const votesCantons = (cantonsHalfYes[0]+cantonsHalfYes[1]/2);

        addInnerHTML(globalResult, `<div class="text-2xl font-semibold text-black">${cantonsTxt}</div>`);
        addInnerHTML(globalResult, '<div class="flex flex-row">');
        addInnerHTML(globalResult, `  <div class="flex-none basis-2/12 text-4xl font-bold text-green-400 pr-2">${cantonsHalfYes[0]} ${cantonsHalfYes[1]}/2</div>`);
        addInnerHTML(globalResult, `  <div class="flex-initial basis-8/12 border-solid h-10 bg-red-500 rounded-full overflow-hidden border-4 border-black"><div class="bg-green-400 h-8" style="width: ${(100 * votesCantons) / 23}%;"></div></div>`);
        addInnerHTML(globalResult, `  <div class="flex-none basis-2/12 text-4xl font-bold text-red-500 pl-2">${20-cantonsHalfYes[0]} ${6-cantonsHalfYes[1]}/2</div>`);
        addInnerHTML(globalResult, '</div>');
    }

    document.getElementById(globalResult).innerHTML = cumulativeHTML[globalResult];
}

function writeResultsCanton(infoVotesCanton, lang) {
    const cantonResult = "canton-result";
    const yes = ((voteInfo["forme"] != 5) ? {"en": "Yes", "fr": "Oui", "de": "Ja"} : {"en": "Popular Initiative", "fr": "Initiative populaire", "de": "Volksinitiative"})[lang];
    const no = ((voteInfo["forme"] != 5) ? {"en": "No", "fr": "Non", "de": "Nein"} : {"en": "Counterproject", "fr": "Contre-projet", "de": "Gegenentwurf"})[lang];

    //passed or not
    addInnerHTML(cantonResult, `<div class="text-3xl font-bold ${(infoVotesCanton["per"] >= 50) ? "text-green-400" : "text-red-500"} pr-2">${(infoVotesCanton["per"] >= 50) ? yes : no}</div>`);
    
    //popular vote
    addInnerHTML(cantonResult, '<div class="flex flex-row">');
    addInnerHTML(cantonResult, `  <div class="flex-none basis-2/12 text-4xl font-bold text-green-400 pr-2">${infoVotesCanton["per"].toFixed(1)}%</div>`);
    addInnerHTML(cantonResult, `  <div class="flex-initial basis-8/12 border-solid h-10 bg-red-500 rounded-full overflow-hidden border-4 border-black"><div class="bg-green-400 h-8" style="width: ${infoVotesCanton["per"]}%;"></div></div>`);
    addInnerHTML(cantonResult, `  <div class="flex-none basis-2/12 text-4xl font-bold text-red-500 pl-2">${(100-infoVotesCanton["per"]).toFixed(1)}%</div>`);
    addInnerHTML(cantonResult, "</div>");

    document.getElementById(cantonResult).innerHTML = cumulativeHTML[cantonResult];
}

function cantonsHalfCantons(voteInfo) {
    const resJa = [0, 0];
    for (const cantonCode of cantons) resJa[0] += (voteInfo["forme"] != 5) ? voteInfo[cantonCode+"-annahme"] : (voteInfo[cantonCode+"-annahme"] == 9);
    for (const cantonCode of halfCantons) resJa[1] += (voteInfo["forme"] != 5) ? voteInfo[cantonCode+"-annahme"] : (voteInfo[cantonCode+"-annahme"] == 9);

    return resJa;
}

function chartFederalElections(infoFederalElection, electionYear, cantonCode, lang) {
    const options = {
chart: {
    type: "bar",
    fontFamily: "Helvetica, Arial, sans-serif",
    toolbar: {
    show: false,
    },
    height: "100%"
},
title: {
    text: {"en": electionYear+" Federal Election", "fr": `Élection fédérale ${electionYear}`, "de": `Bundestagswahl ${electionYear}`}[lang] + ` (${cantonCode.toUpperCase()})`,
    floating: 0,
    align: "center",
    style: {
        color: "#444"
    }
},
plotOptions: {
    bar: {
    horizontal: false,
    columnWidth: "95%",
    borderRadiusApplication: "end",
    borderRadius: 8,
    distributed: true,
    },
},
tooltip: {
    x: {
        formatter: function(val) {
            return nameFromAcronym[lang][val];
        }
    },
    y: {
        formatter: function(val) {
            return val.toFixed(1) + "%";
        }
    },
    shared: true,
    fillSeriesColor: false,
    intersect: false,
    marker: false,
    style: {
    fontFamily: "Helvetica, Arial, sans-serif",
    },
},
grid: {
    show: true,
    strokeDashArray: 4,
},
dataLabels: {
    enabled: true,
    formatter: function(val) {
        return val.toFixed(1) + "%";
    },
    background: {
        enabled: true,
        foreColor: '#fff',
        padding: 4,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#fff',
        opacity: 0.9,
        dropShadow: {
          enabled: false,
          top: 1,
          left: 1,
          blur: 1,
          color: '#000',
          opacity: 0.45
        }
    },
    textAnchor:"middle",
    style: {
        fontSize: "13px",
        colors: ["#304758"]
    }
},
legend: {
    show: false,
},
xaxis: {
    type: "category",
    floating: false,
    labels: {
        show: true,
        style: {
            fontFamily: "Inter, sans-serif",
            fontWeight: "bold",
            cssClass: 'text-xs font-bold text-gray-700 dark:text-gray-400'
        },
        formatter: function(val){
            return val.toUpperCase();
        }
    },
    axisBorder: {
    show: false,
    },
    axisTicks: {
    show: false,
    },
},
yaxis: {
    show: false,
},
fill: {
    opacity: 1,
},
series: [{
    name: electionYear,
    data: localResultsCanton(infoFederalElection, cantonCode)
}],
};

    document.getElementById("column-chart").innerHTML = "";
    const chart = new ApexCharts(document.getElementById("column-chart"), options);
    chart.render();

    document.getElementById("election-year").innerHTML = {"en": electionYear+" Election", "fr": "Élection "+electionYear, "de": electionYear+" Wahl"}[lang];
}