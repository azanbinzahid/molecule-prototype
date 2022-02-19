const data = require("../../../backend/data/sample.json");


function transform(region, time = 'T100') {
    const dataSources = region['sources']
    const nodes = Object.entries(dataSources).map(([key, obj]) => {
        return {
            id: key,
            level: obj['data'][time]['value'],
            coefficient: obj['coefficient'],
        }
    })
    const links = Object.entries(dataSources).map(([key, obj]) => {
        return {
            source: 'aq_index',
            target: key,
            value: obj['data'][time]['value'],
        }
    })
    console.log(nodes, links)
}


function mapData(regions) {
    regions.forEach(region => {
        transform(region)
    });
}


// test
mapData(data['regions'])