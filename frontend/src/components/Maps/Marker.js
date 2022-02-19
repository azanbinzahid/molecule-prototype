import React from 'react';
import './Marker.css';


const Marker = (props) => {
    const { color, name, region, selectRegion } = props;
    return (
      <div>
        <div
            onClick={()=>selectRegion(region)}
          className="pin bounce"
          style={{ backgroundColor: color, cursor: 'pointer' }}
          title={name}
        />
        <div className="pulse" />
        <h1>{region.name}-{region['sources']['aq_index']['data']['T100']['value']}</h1>
      </div>
    );
  };

  export default Marker;