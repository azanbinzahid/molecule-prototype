import React, { useState } from 'react';
import GoogleMapReact from 'google-map-react';
import Marker from './Marker';

import RegionData from '../../data_mocks/mock_api.json';
import stylers from './stylers.json';

import {config} from '../../secrets'

console.log(RegionData)
const MyMap = ({selectRegion}) => {
    const [center, setCenter] = useState({ lat: 31.5698, lng: 74.3120 });
    const [zoom, setZoom] = useState(11);
    const getMapOptions = (maps) => {
        return {
          disableDefaultUI: true,
          mapTypeControl: true,
          streetViewControl: true,
          styles: stylers,
        };
      };
    return (
        <div style={{ height: '100vh', width: '100%' }}>
            <GoogleMapReact
                bootstrapURLKeys={{ key: config.GoogleMapsApiKey }}
                defaultCenter={center}
                defaultZoom={zoom}
                options={getMapOptions}
            >
                {RegionData['regions'].map((region, index) => {
                    return <Marker
                        key={index}
                        selectRegion={selectRegion}
                        lat={region.lat}
                        lng={region.lng}
                        text="My Marker"
                        region={region}
                    />

                })}
            </GoogleMapReact>
        </div>
    );
}

export default MyMap;