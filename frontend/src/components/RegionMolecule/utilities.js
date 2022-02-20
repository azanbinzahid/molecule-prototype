export const strongEffect = "#F44336";
export const minimialEffect = "#4CAF50";
export const mediumEffect = "#FFF9C4";
export const parentColor = "#C5CAE9";
export const nodeSize = 5;

export const colorMapping = {
  aq_index: '#D50000',
  deforestation_index: '#009688',
  industry_density_index: '#673AB7',
  literacy_rate_index: '#FF9800',
  population_index: '#795548',
  traffic_congession_index: '#78909C'
}

export const transformValToColor = (node) => {
  return colorMapping[node.id]
};
export const transformValToSize = (node) => {
  if(node.isRoot){
    return (5 * nodeSize * node.val);
  }
  return (nodeSize * node.val);
  // return nodeSize;
};
export const generateLabelFromName = (node) => {
  return node.id.split(" ").join("\n");
};
