import React from 'react';
import Box from '@mui/material/Box';
import {FormControl,Grid,TextField,Button, Paper, NativeSelect} from '@mui/material';
import PropTypes from 'prop-types';
import { IgetYears,IGetAllMonthlist} from 'src/Interface/MessageCenter/Search'

Form2.propTypes={
    YearsList: PropTypes.array,
    allMonthList: PropTypes.array,
}

function Form2({YearsList,allMonthList}) {

//     const Month = new Date().getMonth() + 1;
//   const Year = new Date().getFullYear();
    const [Year, setYear] = React.useState("");
    const [Month, setMonth] = React.useState("");
    const handleChange = (event) => {
        setYear(event.target.value);
    };
    const handleClick = (event) => {
        setMonth(event.target.value);
    };
  return (
    <div >
        <Grid container>
            <Grid xs={6}>
         <Box sx={{  m:2 }}>
      <FormControl fullWidth variant="standard">Select Year
        <NativeSelect id="demo-simple-select-label"/>
            {YearsList?.map((item:IgetYears,i)=>{
                  <option
                       key={i}
                   
                           id="demo-simple-select"
                                            label="Select year"
                                            onChange={handleChange}
                                    
                                        >

                                        {item.AcademicYearName}
                                        
                                        </option>
                                    })
                            }
        
    
    </FormControl>
    </Box>
    </Grid>
    <Grid xs={6}>
         <Box sx={{  m:2 }}>
      <FormControl fullWidth variant="standard">Select Month
     <NativeSelect id="demo-simple-select-label"/>
            {allMonthList?.map((item:IGetAllMonthlist,i)=>{
                  <option
                       key={i}
                   
                           id="demo-simple-select"
                                            label="Select Month"
                                            onClick={handleChange}
                                     
>

                                        {item.Name}
                                        
                                        </option>
                                    })
                            }
        
      </FormControl>
    </Box>
    </Grid>
    <Grid item xs={12} sx={{mt:-1 ,mx:2}}>
    <TextField id="standard-basic" label="Name / Subject / Message Body :"  variant="standard" fullWidth/>
    </Grid>
    <Grid item xs={12} sx={{m:2}} >
    <Button variant="contained" size="small" fullWidth>Apply</Button>
    </Grid>
    </Grid>
                           

    </div>
  )
}

export default Form2;