import React from 'react'
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'src/store';
import PageHeader from 'src/libraries/heading/PageHeader';
import {getUpcomingStaffBdayList} from 'src/requests/Birthdays/RequestBirthdays';
import Carousel from 'src/libraries/card/Carousel';
import ErrorMessages from 'src/libraries/ErrorMessages/ErrorMessages';
import RefreshIcon from '@mui/icons-material/Refresh';
import { Container,ToggleButton,ToggleButtonGroup,Card,CardHeader,Box,Badge } from '@mui/material';


function Birthdays() {
  const dispatch = useDispatch();

  const Birthdays: any = useSelector(
    (state: RootState) => state.Birthdays.BirthdaysList
  );

  console.log("Birthdays", Birthdays);

  const BirthdaysBody ={
    
    "aiSchoolId":"120",
    "aiAcademicYrId":"8",
    "aiUserRoleId":"3",
    "asView":"W"
    
  }
  
  useEffect(() => {
    dispatch(getUpcomingStaffBdayList(BirthdaysBody));
  }, []);
  const [view, setView] = React.useState('1');

  const handleChange = (event: React.MouseEvent<HTMLElement>, nextView: string) => {
    setView(nextView);
  };

  return (
    <Container>
      <PageHeader heading={'Birthdays'}  subheading={''} />
      <Card component={Box} my={2} p={1} pr={3}>
     <Box sx={{float:"right"}}>
     <ToggleButtonGroup
        value={view}
        exclusive
        onChange={handleChange}>
        <ToggleButton value="1">T</ToggleButton>
        <ToggleButton value="2">W</ToggleButton>
      </ToggleButtonGroup>
           <RefreshIcon  />
         <Badge sx={{ml:2}}
          badgeContent={Birthdays.length !== 0 ?  Birthdays.length :'0' }
           color="secondary"/>
        </Box>
      </Card>
    </Container>
  )
}

export default Birthdays
