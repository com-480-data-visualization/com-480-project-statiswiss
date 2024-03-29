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

The data is directly provided by the Swiss government, so it is already of high quality and does not require to much preprocessing. However, the conventions used are not always consistent from year to year (for example, switching from "yes/no/blank/free" to "1/2/3/4" for the dataset on the voting recommendations of each party). Also, not all data sets date back to the same year, so this has to be unformised as well. 

Datasets: 
Detailed results of the federal elections: https://opendata.swiss/fr/dataset/eidgenossische-volksabstimmungen-detaillierte-ergebnisse12
Vote results by canton: https://opendata.swiss/fr/dataset/volksabstimmungen-ergebnisse-ebene-kanton-seit-186610
Vote results by commune: https://opendata.swiss/fr/dataset/volksabstimmungen-ergebnisse-ebene-gemeinde-seit-19607
Voting recommendations by party: https://opendata.swiss/fr/dataset/empfehlungen-der-parteien-bei-den-eidgenossischen-abstimmungsvorlagen13
Commune geometry: https://opendata.swiss/fr/dataset/geodaten-zu-den-eidgenoessischen-abstimmungsvorlagen


### Problematic

Democracy is at the heart of Swiss culture, and the country especially prides itself on a direct democratic system that allows its citizens to directly shape policy through referendums and initiatives. Since Switzerland votes so often on so many different subjects, it can be helpful to have all of the data on every federal vote compiled and organised in one place.

Through a series of visualisations, the aim of this project is to show the results of federal votes dating back to 1981.  For each vote, the following questions, amongst others, can be easily answered by looking at our website: How did the Swiss population vote on a particular issue, divided by canton? What were the recommendations of the different political parties? How closely did the population's votes align with the major parties in each canton? What kinds of referendums are the Swiss people most favorable to? 

This project is aimed at anyone who has any interest in Swiss political life. It is interesing to be able to compare referendums to each other, and see by what percentage a certain vote may have past, or if there is a stark "Röstigraben" that can be observed. Even for the people who aren't particularly interested in politics, it is important to know what issues are being voted on and what referendums are being passed in our country, and seeing historical trends may motivate some to go out and vote the next time they receive the famous envelope from the Confederation in their mailbox! 


### Exploratory Data Analysis

Commune geometry: We use https://mapshaper.org/ to display the map as the data is in the TopoJSON format. We check that there are indeed no self intersecting lines. We made a python script to export all the Commune names and ids to a .csv file. We did the same with every Canton. There are 26 Cantons and 2355 Communes. 


> Pre-processing of the data set you chose
> - Show some basic statistics and get insights about the data


### Related work

After each voting Sunday, the RTS usually publishes the vote results as well as a map showing how different parts of the country voted, as well as the yes/no percentages. Even though this is quite helpful on the days following the results coming out, it can be tedious to go back to search for the distribution of votes for those that happened 5, 20, or 40 years ago. Our aim is to have all the information easily accessible in one place. By visiting our website, you know that you will get all your answers on every Swiss federal vote in just a few clicks, all wrapped up in beautiful visualisations! 

The official VoteInfo application is similar to what we want to do. It has a search engine to search through all the old federal votes dating back to 1981, with the division of votes by canton. However, the advantage of our project is, first of all, that it is a website, and as such is less of a hassle to access. Furthermore, we want to make it interactive, with more clickable items and animations to make browsing our website enjoyable rather than tedious. For example, we would like to implement an "I'm feeling lucky" feature that would show users a random federal vote and all the relevant data and graphs.  


## Milestone 2 (26th April, 5pm)

**10% of the final grade**


## Milestone 3 (31st May, 5pm)

**80% of the final grade**


## Late policy

- < 24h: 80% of the grade for the milestone
- < 48h: 70% of the grade for the milestone

