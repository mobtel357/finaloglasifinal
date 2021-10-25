import * as React from 'react'

import { Autocomplete, Box, TextField} from '@mui/material';

import { getModelInfoByModel } from '../services/getModelInfobyModel';


export default function PhoneAutocomplete({phones, func, func1}) {
    console.log(phones);
    const handleChangeModel = (event) => {
        func(event.target.outerText);
        
        console.log(event.target.outerText);
        getModelInfoByModel(event.target.outerText).then((data)=>func1(data.id));
        // ovde pozvati api i setovati ID u addadvertise
      };
    
    return(
        <Autocomplete props={phones}
        disablePortal
        getOptionLabel={(phone)=>phone.Phone}
        id="combo-box-demo"
        
        options={phones}
        onChange={handleChangeModel}
        sx={{ width: 1, marginTop: 2 }}
        renderInput={(params) => <TextField {...params} label="Model" />}
        renderOption = {(props, option)=> (
          <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
            <img
              loading="lazy"
              width="20"
              src={option.PictureURLsmall}
              srcSet={option.PictureURLsmall}
              alt=""
            />
            {option.Phone}
          </Box>
          
      )}
      />
    )

}