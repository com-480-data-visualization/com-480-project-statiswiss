# Project of Data Visualization (COM-480)

| Student's name | SCIPER |
| -------------- | ------ |
| Fabrice Nemo   | 359622 |
| Mina Tang      | 325767 |
| Nicolas Ettlin | 312905 |

[Milestone 1](#milestone-1) • [Milestone 2](#milestone-2) • [Milestone 3](#milestone-3)

## Milestone 1 (29th March, 5pm)

**10% of the final grade**

This is a preliminary milestone to let you set up goals for your final project and assess the feasibility of your ideas.
Please, fill the following sections about your project.

*(max. 2000 characters per section)*


### Dataset

For our data sets, we used the ones provided by opendata.swiss. In particular, we have the results of each vote, the recommendation of every party for each vote, and the results of the federal elections per canton. 

The data is directly provided by the Swiss government, so it is already of high quality and does not require too much preprocessing. However, the conventions used are not always consistent from year to year (for example, switching from "yes/no/blank/free" to "1/2/3/4" for the dataset on the voting recommendations of each party). Also, not all datasets date back to the same year, so this has to be unformised as well. 

Datasets: 


Vote results by canton: https://opendata.swiss/fr/dataset/volksabstimmungen-ergebnisse-ebene-kanton-seit-186610

Vote results by commune: https://opendata.swiss/fr/dataset/volksabstimmungen-ergebnisse-ebene-gemeinde-seit-19607

Voting recommendations by party: https://opendata.swiss/fr/dataset/empfehlungen-der-parteien-bei-den-eidgenossischen-abstimmungsvorlagen13

Federal election results: https://opendata.swiss/fr/dataset/eidg-wahlen-2023/resource/89ddc561-9544-4021-8b7d-13271c5f939d

Commune geometry: https://opendata.swiss/fr/dataset/geodaten-zu-den-eidgenoessischen-abstimmungsvorlagen


### Problematic

Democracy is at the heart of Swiss culture, and the country especially prides itself on a direct democratic system that allows its citizens to directly shape policy through referenda and initiatives. Since Switzerland votes so often on so many different subjects, it can be helpful to have all of the data on every federal vote compiled and organised in one place.

Through a series of visualisations, the aim of this project is to show the results of federal votes dating back to 1981.  For each vote, the following questions, amongst others, can be easily answered by looking at our website: How did the Swiss population vote on a particular issue, divided by canton? What were the recommendations of the different political parties? How closely do the Swiss people in each Canton adhere to the recommendations of the major parties? What kinds of referenda are the Swiss people most favorable to? 

This project is aimed at anyone who has any interest in Swiss political life. It is interesing to be able to compare referenda to each other, and see by what percentage a certain vote may have passed, or if there is a stark "Röstigraben" that can be observed. Even for the people who aren't particularly interested in politics, it is important to know what issues are being voted on and what referenda are being passed in our country, and seeing historical trends may motivate some to go out and vote the next time they receive the famous envelope from the Confederation in their mailbox! 


### Exploratory Data Analysis


"Party voting recommendations":
The dataset is an Excel file in which there is one sheet per year, from 1971 to 2024. There is a grid with the ids of referenda, the date, and each party's voting recommendation. Our pre-processing consists of manually removing empty rows to get continuous tables and cleaning some records. All the necessary information about each referendum (id, date, the recommendation by each party) can be gathered from the clean dataset. Each recommendation is then saved as a row in a CSV file.
Basic statistical analysis from this dataset can be found in the Jupyter Notebook data-preprocessing/recommendations/basic-stats-recommendations.ipynb. 

"Federal election results": 
The dataset is already well formatted (.csv), we don't need to do any preprocessing. However, the data only goes back to 1991, so the for referenda that happened before this, we will not be able to give information about the population's adherence to party guidelines. 

"Commune geometry": 
The dataset is a TopoJSON file. We use https://mapshaper.org/ to display the map. We check that there are indeed no self intersecting lines. We made a python script (data-preprocessing/commune-geometry/extract.py) to export all the Commune names and ids to a .csv file, with the first column being the id and the second the commune name. We did the same with every Canton. The script allowed us to count the number of Communes and Cantons: there are 26 Cantons and 2355 Communes. 

"Commune/Canton votes":
The dataset is a PX file. The data was converted to CSV using [px-to-csv](https://github.com/lukasmartinelli/px-to-csv) and then analyzed using [DuckDB](https://duckdb.org). Some interesting statistics are in the [commune-votes folder](https://github.com/com-480-data-visualization/com-480-project-statiswiss/tree/master/data-preprocessing/commune-votes).


### Related work

After each voting Sunday, the RTS usually publishes vote results as well as a map showing how different parts of the country voted, as well as the yes/no percentages. Even though this is quite helpful on the days following the results coming out, it can be tedious to go back to search for the distribution of votes for those that happened 5, 20, or 40 years ago. Our aim is to have all the information easily accessible in one place. By visiting our website, you know that you will get all your answers on every Swiss federal vote in just a few clicks, all wrapped up in beautiful visualisations! 

The official VoteInfo app is similar to what we want to do. It has a search engine to search through all the old federal votes dating back to 1981, with the division of votes by canton. However, the advantage of our project is, first of all, that it is a website, and as such is less of a hassle to access. Furthermore, we want to make it interactive, with more clickable items and animations to make browsing our website enjoyable rather than tedious. For example, we would like to implement an "I'm feeling lucky" feature that would show users a random federal vote and all the relevant data and graphs.  


## Milestone 2 (26th April, 5pm)

**10% of the final grade**


## Milestone 3 (31st May, 5pm)

**80% of the final grade**


## Late policy

- < 24h: 80% of the grade for the milestone
- < 48h: 70% of the grade for the milestone

