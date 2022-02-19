export const strongEffect = "#F44336";
export const minimialEffect = "#4CAF50";
export const mediumEffect = "#FFF9C4";
export const parentColor = "#C5CAE9";
export const nodeSize = 5;

export const transformValToColor = (node) => {
  if (node.isRoot) {
    return parentColor;
  }
  if (node.val < 2) {
    return minimialEffect;
  }
  if (node.val > 5) {
    return strongEffect;
  }
  return mediumEffect;
};
export const transformValToSize = (node) => {
  return (nodeSize * node.val) / 1.5;
  // if(node.isRoot){
  // }
  // return nodeSize;
};
export const generateLabelFromName = (node) => {
  return node.id.split(" ").join("\n");
};
