import React from "react";
import ForceGraph3D from "react-force-graph-3d";
import tempData from "../../data_mocks/sample.json";
console.log(tempData);
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
  if (!Object.keys(data).length) return <h3>Loding...</h3>
  return (
    <ForceGraph3D
      graphData={data}
      nodeLabel="id"
      nodeAutoColorBy="group"
      nodeVal= {node => Math.pow(node.level, 3)}
      onNodeDragEnd={(node) => {
        node.fx = node.x;
        node.fy = node.y;
        node.fz = node.z;
      }}
    />
  );
};
export default RegionMolecule;
