import React from "react";
import ForceGraph3D from "react-force-graph-3d";
import tempData from "../../data_mocks/sample.json";
const strongEffect = "#F44336";
const minimialEffect = "#4CAF50"
const mediumEffect = "#FFF9C4";
const parentColor = "#C5CAE9";
const nodeSize = 5;

const transformValToColor = (node) => {
  if (node.val === 100) {
    return parentColor;
  }
  if (node.val < 2){
    return minimialEffect
  }
  if (node.val > 5) {
    return strongEffect;
  }
  return mediumEffect;
};
const transformValToSize = (node) => {
  return nodeSize * node.val/1.5;
  // if(node.val === 100){
  // }
  // return nodeSize;
};
const generateLabelFromName = (node)=>{
  return node.id.split(" ").join("\n");
}


const RegionMolecule = (props) => {
  const [data, setData] = React.useState({});
  const fetchData = async () => {
    setData(tempData);
  };
  React.useEffect(() => {
    try {
      fetchData();
    } catch (err) {
      throw ("CUSTOM ERROR", err);
    }
  }, []);
  if (!Object.keys(data).length) return <h3>Loding...</h3>;
  return (
    <ForceGraph3D
      graphData={data}
      backgroundColor="white"
      nodeAutoColorBy="group"
      nodeResolution={100}
      nodeVal={transformValToSize}
      nodeColor={transformValToColor}
      linkColor="#A5ABB6"
      nodeLabel={generateLabelFromName}
      linkOpacity={0.8}
      linkWidth={1}
      linkResolution={100}
      linkCurvature={0.01}
      linkDirectionalParticles={2}
      nodeCanvasObjectMode={() => 'after'}
      onNodeDragEnd={(node) => {
        node.fx = node.x;
        node.fy = node.y;
        node.fz = node.z;
      }}
      nodeCanvasObject={(node, ctx, globalScale) => {
        const label = node.id;
        const fontSize = 100;
        ctx.font = `${fontSize}px Sans-Serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillStyle = 'black'; //node.color;
        ctx.fillText(label, node.x, node.y + 6);
      }}
    />
  );
};
export default RegionMolecule;
