// const data = require("../../../backend/data/sample.json");


export function transform(region, time = 'T100') {
    const dataSources = region['sources']
    const nodes = Object.entries(dataSources).map(([key, obj]) => {
        return {
            id: key,
            isRoot: key === 'aq_index' ? true : false,
            val: obj['data'][time]['value'],
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
    return {
        nodes,
        links
    }
    // console.log(nodes, links)
}


function mapData(regions) {
    regions.forEach(region => {
        transform(region)
    });
}


// test
// mapData(data['regions'])