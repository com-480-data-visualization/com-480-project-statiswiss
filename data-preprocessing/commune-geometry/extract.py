import json

fileContent = open("data.json", "r").read()
fileJson = json.loads(fileContent)

print(type(fileJson))

print(fileJson["objects"].keys())


communeData =  open("communes.csv", "w")
communeData.write("")
communeData.close()

communeData = open("communes.csv", "a")
temp = 0
communeData.write("id")
communeData.write(",")
communeData.write("name")
communeData.write("\n")
counter = 0
for y in fileJson["objects"]:
    for x in fileJson["objects"][y]["geometries"]:
        # print(x["properties"].keys())
        if "id" in x["properties"] and x["properties"]["id"]!="1":
            if str(x["properties"]["id"]) == "10230":
                temp = 1
            if temp ==1: 
                counter = counter + 1
                communeData.write(str(x["properties"]["id"]))
                communeData.write(",")
                if "," in x["properties"]["name"]:
                    x = str(x["properties"]["name"]).replace(",","")
                    communeData.write(x)
                else:
                    communeData.write(str(x["properties"]["name"]))
                communeData.write("\n")

print(counter)
        

cantonData =  open("canton.csv", "w")
cantonData.write("")
cantonData.close()

cantonData = open("canton.csv", "a")
temp = 0
cantonData.write("id")
cantonData.write(",")
cantonData.write("name")
cantonData.write("\n")
counter2 = 0
for y in fileJson["objects"]:
    for x in fileJson["objects"][y]["geometries"]:
        # print(x["properties"].keys())
        if "kantId" in x["properties"]:
            counter2 = counter2 + 1
            cantonData.write(str(x["properties"]["kantId"]))
            cantonData.write(",")
            cantonData.write(str(x["properties"]["kantName"]))
            cantonData.write("\n")

print(counter2)
        