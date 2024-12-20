import { Box, Grid, Typography } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { ButtonPrimary } from 'src/libraries/styled/ButtonStyle';
import { ListStyle } from 'src/libraries/styled/CardStyle';
function AttandaceHalf({ ItemList, ClickItemList }) {
  const [date, setDate] = useState(new Date());
  const formattedDate = ` ${date.toLocaleString('default', {
    month: 'short'
  })} ${date.getFullYear()}`;

  const handlePrevMonth = () => {
    const newDate = new Date(date);
    newDate.setMonth(newDate.getMonth() - 1);
    setDate(newDate);
  };

  const handleNextMonth = () => {
    const newDate = new Date(date);
    newDate.setMonth(newDate.getMonth() + 1);
    setDate(newDate);
  };

  const navigate = useNavigate();
  const ClickNavigate = () => {
    navigate('/RITeSchool/Teacher/SchooAttendanceOverview');
  };

  return (
    <div>
      <Grid container spacing={1}>
        <Grid item lg={5.5}>
          <ListStyle
            sx={{ ml: '16px', mt: '26px', backgroundColor: '#e1bee7' }}
          >
            <Box sx={{ display: 'flex' }}>
              <Typography>Present Student/Total Student</Typography>
              <Typography pl={3} onClick={ClickNavigate}>
                32/45
              </Typography>
            </Box>
          </ListStyle>
        </Grid>

        <Grid item lg={6.5}>
          <ListStyle sx={{ mt: '26px', backgroundColor: '#e1bee7' }}>
            <Box sx={{ display: 'flex' }}>
              <Typography>Attendaced Marked Classes/Total Student</Typography>
              <Typography pl={2}>23/45</Typography>
            </Box>
          </ListStyle>
        </Grid>

        <Grid item lg={3} />
        <Grid item lg={3}>
          <ButtonPrimary fullWidth>Individual Attandace</ButtonPrimary>
        </Grid>
        <Grid item lg={3}>
          <ButtonPrimary fullWidth>MonthWise Attandace</ButtonPrimary>
        </Grid>
        <Grid item lg={3} />
        <Grid item xs={12} sx={{ ml: '16px' }}>
          {/* <Typography variant='h4' sx={{mt:"-10px" ,color:"#00695c"}}>Present Student</Typography> */}
          {/* <Divider sx={{backgroundColor:"black" , my:0.5}}></Divider> */}
          {/* <Box sx={{display:"flex" , justifyContent:"space-between"}}> */}
          {/* <Typography>
          Boys
                 </Typography>
                 <Typography>
          Girls
                 </Typography>
                 <Typography>
          Total
                 </Typography>
         
                        </Box>
                        <Box sx={{display:"flex" , justifyContent:"space-between"}}>
                   <Typography>
          12
                 </Typography>
                 <Typography>
          23
                 </Typography>
                 <Typography>
          35
                 </Typography>
         
                        </Box>
                        
                        </ListStyleA> 
                      
              
                        <ListStyleA>
                        <Typography variant='h4' sx={{mt:"-10px" ,color:"#00695c"}}>Absent Student</Typography>
                        <Divider sx={{backgroundColor:"black" , my:0.5}}></Divider>
                        <Box sx={{display:"flex" , justifyContent:"space-between"}}>
                   <Typography>
          Boys
                 </Typography>
                 <Typography>
          Girls
                 </Typography>
                 <Typography>
          Total
                 </Typography>
         
                        </Box>
                        <Box sx={{display:"flex" , justifyContent:"space-between"}}>
                   <Typography>
          1
                 </Typography>
                 <Typography>
          2
                 </Typography>
                 <Typography>
          3
                 </Typography>
         
                        </Box>
                        
                        </ListStyleA>

                        <ListStyleA>
                        <Typography variant='h4' sx={{mt:"-10px" ,color:"#00695c"}}>Present Student Avarge of Selected Month</Typography>
                        <Divider sx={{my:0.5 , backgroundColor:"black"}}></Divider>
                        <Box sx={{display:"flex" , justifyContent:"space-between"}}>
                   <Typography>
          Boys
                 </Typography>
                 <Typography>
          Girls
                 </Typography>
                 <Typography>
          Total
                 </Typography>
         
                        </Box>
                        <Box sx={{display:"flex" , justifyContent:"space-between"}}>
                   <Typography>
          12
                 </Typography>
                 <Typography>
          23
                 </Typography>
                 <Typography>
          35
                 </Typography>
          */}
          {/* </Box> */}

          {/* <TableAttendace  ItemList={SummaryCountforAttendanceBodyUS} HeaderArray={HeaderArray} /> */}
        </Grid>
      </Grid>
    </div>
  );
}

export default AttandaceHalf;
