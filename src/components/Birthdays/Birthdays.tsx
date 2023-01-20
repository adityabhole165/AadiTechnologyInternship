import React from 'react'
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'src/store';
import PageHeader from 'src/libraries/heading/PageHeader';
import {getUpcomingStaffBdayList} from 'src/requests/Birthdays/RequestBirthdays';


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


  return (
    <div>
      <PageHeader heading={'Birthdays'}  subheading={''} />
      
    </div>
  )
}

export default Birthdays
