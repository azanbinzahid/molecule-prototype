import React from "react";
import ForceGraph3D from "react-force-graph-3d";
import tempData from "../../data_mocks/sample.json";
import RegionData from '../../data_mocks/mock_api.json';
import {transform} from '../../utils/transformer';
const region = transform(RegionData.regions[0]);
console.log(region);


const strongEffect = "#F44336";
const minimialEffect = "#4CAF50"
const mediumEffect = "#FFF9C4";
const parentColor = "#C5CAE9";
const nodeSize = 5;

const transformValToColor = (node) => {
  if (node.isRoot) {
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
  // if(node.isRoot){
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
      graphData={region}
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
      onNodeDragEnd={(node) => {
        node.fx = node.x;
        node.fy = node.y;
        node.fz = node.z;
      }}
      nodeCanvasObjectMode={() => 'after'}
      nodeCanvasObject={(node, ctx, globalScale) => {
        const label = '1234567890';
        const fontSize = 18;
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
