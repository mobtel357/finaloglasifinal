import * as React from 'react';

import { FormGroup, InputLabel, Select, MenuItem } from '@mui/material';

import { getAds } from '../services/getAds';

import CardMedia from '@mui/material/CardMedia';
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent';
import { Typography, Box } from '@mui/material';



export default function Home(props) {
    console.log("XXX" + props);
    const [ads, setAds] = React.useState([])
    const [shadow, setShadow]=React.useState(true);

    function onMouseOver() {
        console.log("X")
        setShadow(shadow)
    }

    function onMouseOut() {
        setShadow(!shadow)
    }

    React.useEffect(()=> {
        getAds().then((data)=>setAds(data))
      },[]
      )

      React.useEffect(()=> {
        getAds().then((data)=>setAds(data))
      },[props]
      )
      


    return(<div style={{ width: '100%' }}>
       
    
    <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2, width:'100%', flexWrap: 'wrap'}}>
        <Box sx={{width:1/6}}>
        <div>aaaa</div>
        </Box>
        <Box sx={{width:5/6, flexWrap:'wrap', display: 'flex', flexDirection: 'row', pt: 2}}>
    {ads.map((item)=>
         <Box sx={{  py:1, px:1 }}  key={item.id}>
        <Card
        
        >
        

        <CardMedia sx={{ maxwidth: 100, minwidth:100}} component="img" height="194" src={item.phone.PictureURLsmall} />
        <CardContent>
        <Typography variant="body2" color="text.secondary">
         {item.description}
        </Typography>
      </CardContent>
        </Card>
       </Box>
    ) }
    
    </Box>
    </Box>
    </div>
    )
}