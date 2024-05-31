'use strict';

const cantonAbbrs = [
    /* 'Zürich', */ 'zh',
    /* 'Bern / Berne', */ 'be',
    /* 'Luzern', */ 'lu',
    /* 'Uri', */ 'ur',
    /* 'Schwyz', */ 'sz',
    /* 'Obwalden', */ 'ow',
    /* 'Nidwalden', */ 'nw',
    /* 'Glarus', */ 'gl',
    /* 'Zug', */ 'zg',
    /* 'Fribourg / Freiburg', */ 'fr',
    /* 'Solothurn', */ 'so',
    /* 'Basel-Stadt', */ 'bs',
    /* 'Basel-Landschaft', */ 'bl',
    /* 'Schaffhausen', */ 'sh',
    /* 'Appenzell Ausserrhoden', */ 'ar',
    /* 'Appenzell Innerrhoden', */ 'ai',
    /* 'St. Gallen', */ 'sg',
    /* 'Graubünden / Grigioni / Grischun', */ 'gr',
    /* 'Aargau', */ 'ag',
    /* 'Thurgau', */ 'tg',
    /* 'Ticino', */ 'ti',
    /* 'Vaud', */ 'vd',
    /* 'Valais / Wallis', */ 'vs',
    /* 'Neuchâtel', */ 'ne',
    /* 'Genève', */ 'ge',
    /* 'Jura', */ 'ju',
]

const width = 1980;
const height = 1600;

const zoom = d3.zoom()
    .scaleExtent([1, 8])
    .on("zoom", zoomed);

const svg = d3.select(".map-wrapper > svg");
svg.attr('viewBox', `0 0 ${width} ${height}`)
const g = svg.append("g");
svg.call(zoom);

const tooltip = d3.select(".tooltip");

function zoomed(event) {
    const { transform } = event;
    g.attr("transform", transform);
    g.attr("stroke-width", 1 / transform.k);

    if (!event.sourceEvent) return;
    const mapPos = svg.node().getBoundingClientRect();
    tooltip
    .style("left", `${event.sourceEvent.clientX - mapPos.left + 15}px`)
    .style("top", `${event.sourceEvent.clientY - mapPos.top}px`)
}

function loadJson(file) {
    return fetch(file).then(response => response.json());
}

async function loadNames(file) {
    const data = await fetch(file).then(response => response.text());
    return new Map(data.split('\n').slice(1).map(x => {
    const [id, name] = x.split(',');
    return [parseInt(id, 10), name];
    }))
}

function createMap(refId, refForm, simResult = false, lang = "en", callBackCanton = (x => {})) {
    (async () => {
        const [
        topo,
        results,
        municipalitiesByCanton,
        cantonNames,
        municipalitiesNames,
        ] = await Promise.all([
        loadJson("topo/ch.json"),
        loadJson(`resources/${simResult ? "sims" : "results"}/${refId}.json`),
        loadJson("topo/municipalities-by-canton.json"),
        loadNames("resources/names/canton.csv"),
        loadNames("resources/names/communes.csv"),
        ]);
    
        const color = d3.scaleSequential([0, 100], d3.interpolateRgbBasis([
        "#67000d",
        "#a50e15",
        "#cb181d",
        "#ef3b2c",
        "#fa6a4a",
        "#fb9272",
        "#fcbaa1",
        "#fee0d2",
        "#fff5f0",
        "#f7fcf5",
        "#e5f4e0",
        "#c6e9bf",
        "#a2d99b",
        "#74c476",
        "#40ab5d",
        "#238b44",
        "#016d2c",
        "#00441b",
        ]));
    
        const path = d3.geoPath().projection(
        d3.geoIdentity()
            .fitSize([width, height], topojson.feature(topo, topo.objects.country))
        );
    
        let shownCanton = null;
    
        // Legend
        svg.append("g")
        .attr("transform", "translate(60,1500)")
        .append(() => Legend(color, {
            width: 1000,
            tickFormat: e => `${e}%`,
            tickSize: 15,
            height: 65,
            ticks: 10,
        }));
    
        // Cantons
        g
        .append("g")
        .selectAll("path")
        .data(topojson.feature(topo, topo.objects.cantons).features)
        .enter()
        .append("path")
        .attr("d", path)
        .attr("fill", ({ id }) => {
            const abbr = cantonAbbrs[id - 1];
    
            const res = results[abbr];
            if (!res) return 'red';
            return color(res.per);
        })
        .attr("stroke", "#989898")
        .attr("stroke-width", 1)
        .attr("class", (d) => {
            const { id } = d;
            const abbr = cantonAbbrs[id - 1];
            return `canton canton-${abbr}`;
        })
        .on("mouseover", function (_, d) {
            d3.selectAll(".canton")
            .transition()
            .duration(150)
            .style("opacity", .2)
            d3.selectAll(".lakes")
            .transition()
            .duration(150)
            .style("opacity", .2)
            d3.select(this)
            .transition()
            .duration(150)
            .style("opacity", 1)
            .style("filter", "none")
            .style("-webkit-filter", "none")
            tooltip.transition().duration(200).style('opacity', 1);
            const { id } = d;
    
            const abbr = cantonAbbrs[id - 1];
    
            const yes = ((refForm != 5) ? {"en": "Yes", "fr": "Oui", "de": "Ja"} : {"en": "Popular Initiative", "fr": "Initiative populaire", "de": "Volksinitiative"})[lang];
            const no = ((refForm != 5) ? {"en": "No", "fr": "Non", "de": "Nein"} : {"en": "Counterproject", "fr": "Contre-projet", "de": "Gegenentwurf"})[lang];
            const turnout = {"en": "Turnout", "fr": "Participation", "de": "Stimmbeteiligung"}[lang];

            const turnoutAffi = (!simResult) ? `<br/>${turnout}: ${results[cantonAbbrs[id-1]]["par"].toFixed(2)}% / ${results[cantonAbbrs[id-1]]["cas"]}` : "";

            const tooltipHtml = `
            <div class="border-2 border-black rounded-2xl p-2">
            <h2 class="text-2xl">${cantonNames.get(id)} (${abbr.toUpperCase()})</h2>
            ${yes}: ${results[cantonAbbrs[id-1]]["per"].toFixed(2)}%
            <br/>
            ${no}: ${(100-results[cantonAbbrs[id-1]]["per"]).toFixed(2)}%
            ${turnoutAffi}
            </div>`;
            tooltip.html(tooltipHtml);
        })
        .on("mouseleave", function () {
            d3.selectAll(".canton")
            .transition()
            .duration(150)
            .style("opacity", shownCanton === null ? 1 : 0.2)
            .style("filter", shownCanton === null ? "none" : "grayscale(1)")
            .style("-webkit-filter", shownCanton === null ? "none" : "grayscale(1)");

            if (simResult && shownCanton) {
                d3.selectAll(".canton-" + shownCanton)
                .transition()
                .duration(150)
                .style("opacity", 1)
                .style("filter", "none")
                .style("-webkit-filter", "none");
            }

            d3.selectAll(".lakes")
            .transition()
            .duration(150)
            .style("opacity", 1)
    
            tooltip.transition().duration(200).style('opacity', 0);
        })
        .on("mousemove", (event) => {
            const mapPos = svg.node().getBoundingClientRect();
            tooltip
            .style("left", `${event.clientX - mapPos.left + 15}px`)
            .style("top", `${event.clientY - mapPos.top}px`)
        })
        .style("cursor", "pointer")
        .on("click", async function (e, d) {
            const { id } = d;

            e.stopPropagation();
            const [[x0, y0], [x1, y1]] = path.bounds(d);
            svg.transition().duration(750).call(
            zoom.transform,
            d3.zoomIdentity
                .translate(width / 2, height / 2)
                .scale(Math.min(8, 0.8 / Math.max((x1 - x0) / width, (y1 - y0) / height)))
                .translate(-(x0 + x1) / 2, -(y0 + y1) / 2),
            );
    
            const abbr = cantonAbbrs[id - 1];
    
            if (!simResult) { //real results, we have data from municipalities
                d3.selectAll(".canton")
                .transition()
                .duration(150)
                .style("filter", "grayscale(1)")
                .style("-webkit-filter", "grayscale(1)")
                .style("opacity", 1)
                .style("pointer-events", 'all')
                d3.selectAll(".canton-" + abbr)
                .transition()
                .duration(150)
                .style("opacity", 0)
                .style("pointer-events", 'none');

                d3.selectAll(".municipalities")
                .transition()
                .duration(150)
                .style("opacity", 0)
                .style("pointer-events", 'none');
                d3.select(`.municipalities-${abbr}`)
                .transition()
                .duration(150)
                .style("opacity", 1)
                .style("pointer-events", 'all');
            } else {
                d3.selectAll(".canton")
                .transition()
                .duration(150)
                .style("filter", "grayscale(1)")
                .style("-webkit-filter", "grayscale(1)")
                .style("opacity", 1)
                .style("pointer-events", 'all')
                d3.selectAll(".canton-" + abbr)
                .transition()
                .duration(150)
                .style("filter", "none")
                .style("-webkit-filter", "none");
            }
    
            document.querySelector('.map-title span').innerText = cantonNames.get(id);
            document.querySelector('.map-title').classList.add('visible');
            shownCanton = abbr;

            callBackCanton(cantonAbbrs[id-1]);
        })
    
        // Municipalities
        for (const [cantonAbbr, municipalities] of Object.entries(municipalitiesByCanton)) {
        const municipalitiesSet = new Set(municipalities);
        g
            .append("g")
            .attr("class", "municipalities municipalities-" + cantonAbbr)
            .style("pointer-events", "none")
            .style("opacity", "0")
            .selectAll("path")
            .data(topojson.feature(topo, {
            type: "GeometryCollection",
            geometries: topo.objects.municipalities.geometries.filter(({ id }) => municipalitiesNames.has(id) && municipalitiesSet.has(id)),
            }).features)
            .enter()
            .append("path")
            .attr("d", path)
            .attr("fill", ({ id }) => {
            const res = results[id];
            if (!res) return '#e0f2fe';
            return color(res.per);
            })
            .attr("stroke", "#ababab")
            .attr("stroke-width", 0.5)
            .attr("class", "municipality")
            .on("mouseover", function (_, d) {
            d3.select(this)
                .transition()
                .duration(150)
                .style("opacity", 1)
            tooltip.transition().duration(200).style('opacity', 1);
            const { id } = d;
            
            const yes = ((refForm != 5) ? {"en": "Yes", "fr": "Oui", "de": "Ja"} : {"en": "Popular Initiative", "fr": "Initiative populaire", "de": "Volksinitiative"})[lang];
            const no = ((refForm != 5) ? {"en": "No", "fr": "Non", "de": "Nein"} : {"en": "Counterproject", "fr": "Contre-projet", "de": "Gegenentwurf"})[lang];
            const turnout = {"en": "Turnout", "fr": "Participation", "de": "Stimmbeteiligung"}[lang];

            const tooltipHtml = `
            <div class="border-2 border-black rounded-2xl p-2">
            <h2 class="text-2xl">${municipalitiesNames.get(id)}</h2>
            ${yes}: ${results[id]["per"].toFixed(2)}%
            <br/>
            ${no}: ${(100-results[id]["per"]).toFixed(2)}%
            <br/>
            ${turnout}: ${results[id]["par"].toFixed(2)}% / ${results[id]["cas"]}
            </div>`;
            tooltip.html(tooltipHtml);
            })
            .on("mouseleave", function () {
            d3.selectAll(".canton")
                .transition()
                .duration(150)
                .style("opacity", shownCanton === null ? 1 : 0.2)
            d3.selectAll(".lakes")
                .transition()
                .duration(150)
                .style("opacity", 1)
            d3.selectAll(".municipality")
                .transition()
                .duration(150)
                .style("opacity", 1)
    
            tooltip.transition().duration(200).style('opacity', 0);
            })
            .on("mousemove", (event) => {
            const mapPos = svg.node().getBoundingClientRect();
            tooltip
                .style("left", `${event.clientX - mapPos.left + 15}px`)
                .style("top", `${event.clientY - mapPos.top}px`)
            })
        }
    
        // Lakes
        g
        .append("g")
        .attr("class", "lakes")
        .style("pointer-events", "none")
        .selectAll("path")
        .data(topojson.feature(topo, topo.objects.lakes).features)
        .enter()
        .append("path")
        .attr("d", path)
        .attr("fill", "#8fd7f8")
        .attr("stroke", "#989898")
        .attr("stroke-width", 1);
    
        document.querySelector('.map-title button').addEventListener('click', () => {
        shownCanton = null;
        document.querySelector('.map-title').classList.remove('visible');
    
        d3.selectAll(`.municipalities`)
            .transition()
            .duration(150)
            .style("opacity", 0)
            .style("pointer-events", 'none');
        d3.selectAll(".canton")
            .transition()
            .duration(150)
            .style("opacity", 1)
            .style("filter", "none")
            .style("-webkit-filter", "none")
            .style("pointer-events", "all")
    
        const [[x0, y0], [x1, y1]] = path.bounds(topojson.feature(topo, topo.objects.country));
        svg.transition().duration(750).call(
            zoom.transform,
            d3.zoomIdentity
            .translate(width / 2, height / 2)
            .scale(Math.min(8, 1 / Math.max((x1 - x0) / width, (y1 - y0) / height)))
            .translate(-(x0 + x1) / 2, -(y0 + y1) / 2),
        );

        callBackCanton("ch");
        });
    })();
}