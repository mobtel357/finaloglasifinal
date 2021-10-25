import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { FormControl, FormGroup } from '@mui/material';
import { InputLabel } from '@mui/material';
import { Autocomplete } from '@mui/material';
import { TextField, Card } from '@mui/material';
import { Radio, RadioGroup } from '@mui/material';
import { FormControlLabel } from '@mui/material';
import CardMedia from '@mui/material/CardMedia';

import { useHistory } from "react-router-dom";

import { useForm } from "react-hook-form";

import Step1 from './Step1';
import { getModelInfo } from '../services/getModelInfo'
import { postAd } from './../services/postAd';


const steps = ['Izbor telefona', 'Tekst oglasa', 'Pregled i potvrda'];

;

export default function HorizontalLinearStepper() {

  const history = useHistory();
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());

  const [brand, setBrand] = React.useState('');
  const [model, setModel] = React.useState('');
  const [phones,setPhones] = React.useState([{}]);

  const [modelId,setModelId] = React.useState([{}]);

  const [selPhone, setSelPhone] = React.useState({});

  const [news, setNews] = React.useState('1');

  const [desc, setDesc] = React.useState('');

  const [price, setPrice] = React.useState('');

  React.useEffect(()=> {
    getModelInfo(modelId).then((data)=>setSelPhone(data))
  },[modelId]
  )


  console.log("ZZZZZZZZZ"+modelId)
  const buttonDisabled = (activeStep === 0 && !model)

  const isStepOptional = (step) => {
    return false;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const onSubmitHandler = (data) => {


    let data1 = {
      
        "phoneid": modelId,
        "description": desc,
        "user": "Pera",
        "date_created": "20211019",
        "old": news,
        "price": price
      }

    
    postAd(data1).then((data)=>history.push("/",data.id));
    
    reset();
  };

  const { register, handleSubmit, formState: { errors }, reset } = useForm({})

  return (
    <form onSubmit={handleSubmit(onSubmitHandler)}>
    <Box sx={{ width: '60%', margin: 'auto', pt: 2 }}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
          if (isStepOptional(index)) {
            labelProps.optional = (
              <Typography variant="caption">Optional</Typography>
            );
          }
          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {activeStep === steps.length ? (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>
            All steps completed - you&apos;re finished
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Box sx={{ flex: '1 1 auto' }} />
            <Button onClick={handleReset}>Reset</Button>
          </Box>
        </React.Fragment>
      ) : (
        <React.Fragment>
            
        { activeStep == 0 ? <Step1 brand={brand} phones={phones} setBrand={setBrand} setPhones={setPhones} setModel={setModel} setModelId={setModelId} />:''}

        

  { activeStep == 1 && (<FormControl sx={{ display: 'flex',
          flexDirection: 'row',
          p: 1,
          m: 1,}} >
    <Box sx = {{width: 1/2, pt: 2,pr: 5 }}>
    <TextField fullWidth onChange={(e)=>setDesc(e.target.value)}
          id="outlined-multiline-static"
          label="Tekst oglasa"
          multiline
          value={desc}
          rows={4}
           />

<RadioGroup defaultValue="1" sx = {{pt: 5 }}column aria-label="gender" name="row-radio-buttons-group" onChange={(e)=>setNews(e.target.value)}>
    <FormControlLabel value="1" control={<Radio />} label="Novo" />
    <FormControlLabel value="2" control={<Radio />} label="Star do mesec dana" />
    <FormControlLabel value="3" control={<Radio />} label="Star do 6 meseci" />
    <FormControlLabel value="4" control={<Radio />} label="Starije od 6 meseci" />
   
  </RadioGroup>

          </Box>

<Card sx={{width: 1/4 }}>
    <CardMedia component="img" src={selPhone.PictureURLsmall} />
    </Card>
        <Box sx ={{pl: 2}}>

  <TextField onChange={(e)=>setPrice(e.target.value)}
          id="outlined-select-currency"
          
          label="Cena"
          value={price}
          
          helperText="Cena"
        ></TextField>
        </Box>   


  

      </FormControl>)}
  



          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Back
            </Button>
            <Box sx={{ flex: '1 1 auto' }} />
            {isStepOptional(activeStep) && (
              <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                Skip
              </Button>
            )}
            {activeStep === steps.length-1 && <Button type="submit" disabled={buttonDisabled}>Potvrdi</Button> }
            {activeStep !== steps.length-1 && <Button onClick={handleNext} disabled={buttonDisabled}>Dalje</Button> }

            
          </Box>
        </React.Fragment>
      )}
    </Box></form>
  );
}
