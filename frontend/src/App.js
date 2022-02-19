import './App.css';
import React from 'react';
import RegionMolecule from './components/RegionMolecule';
import MyMap from './components/Maps';
function App() {
  const [currentComponent, setCurrentComponent] = React.useState(0);
  const [region, setRegion] = React.useState(undefined);
  const handleRegionClick= (region)=>{
    setCurrentComponent(1)
    setRegion(region)
  }
  return (<div className="App">
    {
      currentComponent ? (
        <RegionMolecule region={region}/>
      ) : (
        <MyMap selectRegion={handleRegionClick}/>
      )
    }
  </div>
  )
}

export default App;
