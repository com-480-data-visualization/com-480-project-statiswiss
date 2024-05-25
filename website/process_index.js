//source for this function: https://stackoverflow.com/questions/54756136/convert-json-format-group-by
const groupBy = prop => data => {
    return data.reduce((dict, item) => {
      const { [prop]: _, ...rest } = item;
      dict[item[prop]] = [...(dict[item[prop]] || []), rest];
      return dict;
    }, {});
  };

function groupVotesByYear(votesInfo) {
    function addYear(entry) {
        const entryWithYear = {...entry};
        entryWithYear["year"] = entry["date"].substring(0, 4);
        return entryWithYear;
    }

    const votesInfoWithYear = votesInfo.map(addYear);
    return groupBy('year')(votesInfoWithYear);
}

const cumulativeHTML = {};
function addInnerHTML(thing, content) {
    if (!(thing in cumulativeHTML))
        cumulativeHTML[thing] = ""
    
    cumulativeHTML[thing] += content + "\n";
}

function generateBlocYear(votesInfo) {
    const groupByYear = groupVotesByYear(votesInfo);
    const years = [];
    for (const year in groupByYear) years.push(year);
    years.sort();
    years.reverse();
    console.log(years)
    console.log(groupByYear[2023][0])

    const listRefs = document.getElementById("list_refs");

    function showRef(listRefs, entry) {
        const color = entry["success"] ? "bg-green-400" : "bg-red-400";
        addInnerHTML(listRefs, `  <a href="results.html?refId=${entry["id"]}">`);
        addInnerHTML(listRefs, `    <div class="py-2 border border-2 border-black text-center ${color}">`);
        addInnerHTML(listRefs, `      <div class="text-2xl text-black">${entry["title_en"]}</div>`);
        addInnerHTML(listRefs, `      <p class="text-black text-xs">${entry["theme"]}</p>`);
        addInnerHTML(listRefs, "    </div>");
        addInnerHTML(listRefs, `  </a>`);
    }

    for (const year of years) {
        addInnerHTML(listRefs, '<div class="flex flex-row border-4 border-black">');
        addInnerHTML(listRefs, '  <div class="flex-none basis-2/12 place-content-center -rotate-90 py-auto text-center font-bold text-3xl">' + year + '</div>');
        addInnerHTML(listRefs, '  <div class="flex-initial basis-10/12 grid grid-rows-4 grid-cols-1 border-l-4 border-black">');
        for (const i in groupByYear[year]) showRef(listRefs, groupByYear[year][i]);
        addInnerHTML(listRefs, '  </div>');
        addInnerHTML(listRefs, '</div>');
    }

    listRefs.innerHTML = cumulativeHTML[listRefs];
}