import * as React from 'react';

import { FormGroup, InputLabel, Select, MenuItem } from '@mui/material';

import { getModelsByBrand } from '../services/getModelsByBrand';

export default function ListBrand({func, func1, brand}) {
    const handleChange = (event) => {
        func(event.target.value);
        getModelsByBrand(event.target.value).then((x)=>func1(x));
        //console.log(phones);
        
      };


    return (
        <div>
        <InputLabel id="demo-simple-select-label">Brand</InputLabel><FormGroup><Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    value={brand}
    label="Age"
    onChange={handleChange}
    
  >
    <MenuItem value='Samsung'>Samsung</MenuItem>
    <MenuItem value="Apple">Apple</MenuItem>
    <MenuItem value="Acer">Acer</MenuItem>
  </Select>
  </FormGroup>
  </div>
    )
}