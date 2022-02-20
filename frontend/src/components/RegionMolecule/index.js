import React from "react";
import ForceGraph3D from "react-force-graph-3d";
import RegionData from "../../data_mocks/mock_api.json";
import LinearProgress from "@mui/material/LinearProgress";
import { transform } from "../../utils/transformer";
import PropTypes from "prop-types";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import TimeSlider from "./timeSeriesSlider";
import { Slider } from "@mui/material";

import {
  transformValToColor,
  transformValToSize,
  generateLabelFromName,
  colorMapping
} from "./utilities.js";
import "./index.css";
// console.log(RegionData)

// const region = transform(RegionData.regions[0]);

const RegionMolecule = ({location}) => {
  const region = transform(location)
  const regionName = location.name; //to change this to props
  const [data, setData] = React.useState({});
  const fetchData = async () => {
    setData(region);
  };
  const handleTimeSeriesChange = (e, v) => {
    const val = v.toString();
    const newData = transform(location, val);
    setData(newData);
  };

  const handleParameterChange = (coefficient, id, v)=>{
    const tempData = {...region};
    tempData.nodes = tempData.nodes.map((nodeValue, index)=>{
      if(nodeValue.isRoot){
        nodeValue.val = (coefficient*v).toFixed(2);
      } 
      if(nodeValue.id === id){
        nodeValue.val = v;
      }
      return nodeValue;
    })
    setData(tempData);
  };
  function LinearSliderWithLabel({nodeCoefficient, nodeId, nodeValue}) {
    const [value, setValue] = React.useState(nodeValue);
    return (
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Box sx={{ width: "100%", mr: 1 }}>
          <Slider
            style={{"color": colorMapping[nodeId]}}

            aria-label="Small steps"
            defaultValue={value}
            step={0.6}
            marks
            min={0}
            max={10}
            valueLabelDisplay="auto"
            onChange={(e, v) => {
              setValue(v);
              handleParameterChange(nodeCoefficient, nodeId , v)
            }}
          />
        </Box>
        <Box sx={{ minWidth: 35 }}>
          <Typography variant="body2" color="text.secondary">
            {value}
          </Typography>
        </Box>
      </Box>
    );
  }

  // LinearSliderWithLabel.propTypes = {
  //   /**
  //    * The value of the progress indicator for the determinate and buffer variants.
  //    * Value between 0 and 100.
  //    */
  //   value: PropTypes.number.isRequired,
  // };
  const fgRef = React.useRef();

  React.useEffect(() => {
    const fg = fgRef.current;
    if (fg) {
      fg.d3Force('link').distance(link => 70)
      // fg.d3Force('link').color(link => '#F50057')
    }
    try {
      if(!Object.keys(data).length){
        fetchData();
      }
    } catch (err) {
      throw ("CUSTOM ERROR", err);
    }
  }, [data]);
  if (!Object.keys(data).length) return <h3>Loding...</h3>;
  return (
    <div>
      <div className="title">
        <h2>{regionName}</h2>
      </div>
      <div className="container-main">
        <div className="container-item legend">
          <h3>Legend</h3>
          <div>
            {data.nodes.map((node, index) => {
              return (
                <div key={node.id} className={"legend-item"}>
                  <div>
                    <h5 className="legend-title">{node.id}</h5>
                    <Box sx={{ width: "100%" }}>
                      <LinearSliderWithLabel nodeCoefficient={node.coefficient} nodeId={node.id} nodeValue={node.val} />
                    </Box>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="graph">
          <ForceGraph3D
            ref={fgRef}
            zoom={10}
            graphData={data}
            backgroundColor="white"
            nodeAutoColorBy="group"
            nodeResolution={100}
            nodeVal={transformValToSize}
            nodeColor={transformValToColor}
            linkColor={() => '#03A9F4'}
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
            nodeCanvasObjectMode={() => "after"}
            nodeCanvasObject={(node, ctx, globalScale) => {
              const label = "1234567890";
              const fontSize = 18;
              ctx.font = `${fontSize}px Sans-Serif`;
              ctx.textAlign = "center";
              ctx.textBaseline = "middle";
              ctx.fillStyle = "black"; //node.color;
              ctx.fillText(label, node.x, node.y + 6);
            }}
            height={700}
            width={900}
          />
          <div className="slider">
            <h3>Time Series</h3>
            <br />
            <TimeSlider handleChange={handleTimeSeriesChange} />
          </div>
        </div>
        <div className="container-item values_form"></div>
      </div>
    </div>
  );
};
export default RegionMolecule;
