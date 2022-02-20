import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';

function valuetext(value) {
  return `${value}°C`;
}

export default function TimeSlider({handleChange}) {
  return (
    <Box sx={{ width: 300 }}>
      <Slider
        aria-label="Temperature"
        defaultValue={0}
        getAriaValueText={valuetext}
        valueLabelDisplay="auto"
        step={1}
        marks
        min={-5}
        max={6}
        valueLabelFormat={v=>{
          if(v < 0){
            return `T ${v} days.`
          }
          if(v === 0){
            return `Today`
          }
          return `T+${v} days.`
        }}
        onChange={handleChange}
      />
    </Box>
  );
}