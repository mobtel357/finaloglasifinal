import * as React from 'react';

import ListBrand from './ListBrand';
import PhoneAutocomplete from './PhoneAutocomplete';

import { Box, FormControl } from '@mui/material';

export default function Step1({ brand, phones, setBrand, setPhones, setModel, setModelId }) {

    return (
        <Box sx={{ width: 1 / 3, marginTop: 3 }}><FormControl fullWidth> <ListBrand func={setBrand} func1={setPhones} brand={brand} />
            {brand && <PhoneAutocomplete phones={phones} func={setModel} func1={setModelId} />}
        </FormControl></Box>
    )
}