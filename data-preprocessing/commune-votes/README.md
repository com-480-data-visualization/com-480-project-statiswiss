The raw data for [local votation statistics](https://www.bfs.admin.ch/bfs/fr/home/statistiques/catalogues-banques-donnees.assetdetail.px-x-1703030000_101.html) is not published on GitHub as the file is too large (more than a GB of CSV). The data was converted to CSV using [px-to-csv](https://github.com/lukasmartinelli/px-to-csv) and then analyzed using [DuckDB](https://duckdb.org).

```bash
iconv -f WINDOWS-1252 -t UTF-8 source.px > source_utf8.px
px-to-csv -i source_utf8.px -o votes.csv
```

```sql
CREATE TABLE votes_raw AS
SELECT ROW_NUMBER() OVER () AS idx, * FROM read_csv('votes.csv',
	delim = ',',
	header = false,
	columns = {
		'num': 'VARCHAR', -- double, string or """..."""
		'location': 'VARCHAR',
		'subject': 'VARCHAR',
		'count_type': 'VARCHAR'
	}
);
```

Here are a few interesting statistics on the dataset:

## Most popular subjects nationwide
```sql
SELECT subject, CAST(num AS double) as percentage FROM votes_raw
WHERE location = 'Schweiz' AND count_type = 'Ja in %'
ORDER BY percentage DESC;
```

| Date | Subject | Yes % |
| -- | -- |-- |
| 1971-06-06 | Bundesbeschluss über die Ergänzung der Bundesverfassung durch einen Artikel 24septies betreffend den Schutz des Menschen und seiner natürlichen Umwelt gegen schädliche oder lästige Einwirkungen | 92.6961472 % |
| 1996-03-10 | Bundesbeschluss über den Uebertritt der bernischen Gemeinde Vellerat zum Kanton Jura                                                                                                              | 91.6396365 % |
| 2014-05-18 | Bundesbeschluss über die medizinische Grundversorgung (direkter Gegenentwurf zur zurückgezogenen Volksinitiative «Ja zur Hausarztmedizin»)                                                        | 88.0657393 % |
| 1999-02-07 | Bundesbeschluss betreffend die Verfassungsbestimmung über die Transplantationsmedizin                                                                                                             | 87.7708937 % |
| 1972-06-04 | Bundesbeschluss über den Schutz der Währung                                                                                                                                                       | 87.7280841 % |
| 2012-03-11 | Bundesbeschluss über die Regelung der Geldspiele zugunsten gemeinnütziger Zwecke                                                                                                                  | 87.0877021 % |
| 2000-03-12 | Bundesbeschluss über die Justizreform                                                                                                                                                             | 86.3577268 % |
| 1993-09-26 | Bundesbeschluss gegen den Waffenmissbrauch                                                                                                                                                        | 86.2715766 % |
| 1980-03-02 | Bundesbeschluss über die Neuordnung der Landesversorgung                                                                                                                                          | 86.0549485 % |
| 2006-05-21 | Bundesbeschluss über die Neuordnung der Verfassungsbestimmungen zur Bildung                                                                                                                       | 85.5794378 % |
| 1975-06-08 | Bundesbeschluss über den Schutz der Währung, Änderung vom 28. Juni 1974 (Verlängerung)                                                                                                            | 85.5252884 % |
| 1972-03-05 | Bundesbeschluss betreffend die Ergänzung der Bundesverfassung durch einen Artikel 34septies über die Allgemeinverbindlicherklärung von Mietverträgen und Massnahmen zum Schutze der Mieter        | 85.3987511 % |
| 2001-12-02 | Bundesbeschluss über eine Schuldenbremse                                                                                                                                                          | 84.7416955 % |

## Least popular subjects nationwide
```sql
SELECT subject, (100 - CAST(num AS double)) as percentage FROM votes_raw
WHERE location = 'Schweiz' AND count_type = 'Ja in %'
ORDER BY percentage DESC;
```

| Date | Subject | No % |
--|--|--
| 2015-03-08 | Volksinitiative «Energie- statt Mehrwertsteuer»                                                                                                                                                 |          91.974996 |
| 1984-12-02 | Volksinitiative «für einen wirksamen Schutz der Mutterschaft»                                                                                                                                   |         84.2237666 |
| 1981-04-05 | Volksinitiative «Mitenand-Initiative für eine neue Ausländerpolitik»                                                                                                                            |         83.7776325 |
| 1972-12-03 | Volksinitiative «zur Einführung einer Volkspension»                                                                                                                                             |         83.4189539 |
| 2000-11-26 | Volksinitiative «für tiefere Spitalkosten»                                                                                                                                                      |         82.1120438 |
| 2000-03-12 | Volksinitiative «für eine gerechte Vertretung der Frauen in den Bundesbehörden (Initiative 3. März)»                                                                                            |  82.02994749999999 |
| 1986-09-28 | Volksinitiative Eidgenössische «Kulturinitiative»                                                                                                                                               |          81.863771 |
| 2002-06-02 | Volksinitiative «für Mutter und Kind - für den Schutz des ungeborenen Kindes und für die Hilfe an seine Mutter in Not»                                                                          |         81.7515852 |
| 1986-09-28 | Volksinitiative «für eine gesicherte Berufsbildung und Umschulung»                                                                                                                              |          81.618009 |
| 1978-02-26 | Volksinitiative «zur Herabsetzung des AHV-Alters»                                                                                                                                               |         79.8764818 |
| 2001-03-04 | Volksinitiative «für mehr Verkehrssicherheit durch Tempo 30 innerorts mit Ausnahmen (Strassen für alle)»                                                                                        |         79.6977739 |
| 2022-02-13 | Volksinitiative «Ja zum Tier- und Menschenversuchsverbot - Ja zu Forschungswegen mit Impulsen für Sicherheit und Fortschritt»                                                                   |         79.1407223 |
| 1980-03-02 | Volksinitiative «betreffend die vollständige Trennung von Kirche und Staat»                                                                                                                     |  78.90058930000001 |
| 2000-03-12 | Volksinitiative «für die Halbierung des motorisierten Strassenverkehrs zur Erhaltung und Verbesserung von Lebensräumen (Verkehrshalbierungs-Initiative)»                                        |         78.6663881 |
| 2001-12-02 | Volksinitiative «für eine glaubwürdige Sicherheitspolitik und eine Schweiz ohne Armee»                                                                                                          |         78.0971078 |
| 1976-12-05 | Volksinitiative «für die Einführung der 40-Stunden-Woche»                                                                                                                                       |         78.0420467 |
| 1997-06-08 | Volksinitiative «für ein Verbot der Kriegsmaterialausfuhr»                                                                                                                                      |         77.4980328 |
| 2014-11-30 | Volksinitiative «Rettet unser Schweizer Gold (Gold-Initiative)»                                                                                                                                 |         77.2757681 |
| 2001-12-02 | Volksinitiative «für eine gesicherte AHV - Energie statt Arbeit besteuern!»                                                                                                                     |         77.1376659

## Highest participation rate at the latest vote
```sql
select location, subject, cast(num AS double) as percentage from votes_raw WHERE location LIKE '...%' AND count_type='Beteiligung in %' AND subject LIKE '2023-06-18 %' and num <> '"..."' order by percentage desc;
```

| Location | Subject | Percentage |
| --- | --- | --- | 
| Visp                | 2023-06-18 Änderung des Bundesgesetzes über die gesetzlichen Grundlagen für Verordnungen des Bundesrates zur Bewältigung der Covid-19-Epidemie (Covid-19-Gesetz)     |      100.0 |
| Visp                | 2023-06-18 Bundesgesetz über die Ziele im Klimaschutz, die Innovation und die Stärkung der Energiesicherheit (KlG)                                                   |      100.0 |
| Visp                | 2023-06-18 Bundesbeschluss über eine besondere Besteuerung grosser Unternehmensgruppen (Umsetzung des OECD/G20-Projekts zur Besteuerung grosser Unternehmensgruppen) |      100.0 |
| Veysonnaz           | 2023-06-18 Bundesgesetz über die Ziele im Klimaschutz, die Innovation und die Stärkung der Energiesicherheit (KlG)                                                   | 87.7604167 |
| Veysonnaz           | 2023-06-18 Änderung des Bundesgesetzes über die gesetzlichen Grundlagen für Verordnungen des Bundesrates zur Bewältigung der Covid-19-Epidemie (Covid-19-Gesetz)     |       87.5 |
| Veysonnaz           | 2023-06-18 Bundesbeschluss über eine besondere Besteuerung grosser Unternehmensgruppen (Umsetzung des OECD/G20-Projekts zur Besteuerung grosser Unternehmensgruppen) |       87.5 |
| Lohn (SH)           | 2023-06-18 Änderung des Bundesgesetzes über die gesetzlichen Grundlagen für Verordnungen des Bundesrates zur Bewältigung der Covid-19-Epidemie (Covid-19-Gesetz)     | 75.5474453 |
| Lohn (SH)           | 2023-06-18 Bundesgesetz über die Ziele im Klimaschutz, die Innovation und die Stärkung der Energiesicherheit (KlG)                                                   | 75.3649635 |
| Lohn (SH)           | 2023-06-18 Bundesbeschluss über eine besondere Besteuerung grosser Unternehmensgruppen (Umsetzung des OECD/G20-Projekts zur Besteuerung grosser Unternehmensgruppen) | 75.3649635 |
| Buchberg            | 2023-06-18 Änderung des Bundesgesetzes über die gesetzlichen Grundlagen für Verordnungen des Bundesrates zur Bewältigung der Covid-19-Epidemie (Covid-19-Gesetz)     | 74.6564885 |
| Buchberg            | 2023-06-18 Bundesbeschluss über eine besondere Besteuerung grosser Unternehmensgruppen (Umsetzung des OECD/G20-Projekts zur Besteuerung grosser Unternehmensgruppen) | 74.5038168 |
| Buchberg            | 2023-06-18 Bundesgesetz über die Ziele im Klimaschutz, die Innovation und die Stärkung der Energiesicherheit (KlG)                                                   | 74.1984733 |
| Rüdlingen           | 2023-06-18 Bundesgesetz über die Ziele im Klimaschutz, die Innovation und die Stärkung der Energiesicherheit (KlG)                                                   |       72.5 |
| Rüdlingen           | 2023-06-18 Bundesbeschluss über eine besondere Besteuerung grosser Unternehmensgruppen (Umsetzung des OECD/G20-Projekts zur Besteuerung grosser Unternehmensgruppen) | 72.3333333 |
| Rüdlingen           | 2023-06-18 Änderung des Bundesgesetzes über die gesetzlichen Grundlagen für Verordnungen des Bundesrates zur Bewältigung der Covid-19-Epidemie (Covid-19-Gesetz)     | 72.1666667 |
| Hemishofen          | 2023-06-18 Änderung des Bundesgesetzes über die gesetzlichen Grundlagen für Verordnungen des Bundesrates zur Bewältigung der Covid-19-Epidemie (Covid-19-Gesetz)     | 70.7692308 |
| Hemishofen          | 2023-06-18 Bundesgesetz über die Ziele im Klimaschutz, die Innovation und die Stärkung der Energiesicherheit (KlG)                                                   | 70.7692308 |
