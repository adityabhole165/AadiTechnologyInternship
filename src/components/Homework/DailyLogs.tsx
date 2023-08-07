import { Card, Container, Typography,  Box,} from '@mui/material'
import React from 'react'
import BackButton from 'src/libraries/button/BackButton'
import PageHeader from 'src/libraries/heading/PageHeader'
import { RootState } from 'src/store';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getHomeworkDailyLogs } from 'src/requests/Homework/RequestHomeworkNew';
import { useParams } from 'react-router-dom';
import ErrorMessages from 'src/libraries/ErrorMessages/ErrorMessages';
import MonthSelector from 'src/libraries/buttons/MonthSelector';
import SuspenseLoader from 'src/layouts/components/SuspenseLoader';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';


function DailyLogs() {
  const dispatch = useDispatch();
  const { DateFrommon, DateFromyear } = useParams();

  const asSchoolId = localStorage.getItem('localSchoolId');
  const asAcademicYearId = sessionStorage.getItem('AcademicYearId');
  const asStandardDivision = (sessionStorage.getItem('StandardDivisionId'));
  const GetHomeworkDailyLogs = useSelector((state: RootState) => state.HomeworkNew.HomeworkDailyLogs);
  const loading = useSelector((state: RootState) => state.HomeworkNew.Loading);


  const [date, setDate] = useState<any>({ selectedDate: null });
  const [assignedYear, setAssignedYear] = useState<any>();
  const [assignedMonth_num, SetassignedMonth_num] = useState<any>();

  function setCurrentDate(newDate?: Date) {
    const date = newDate || new Date();
    const Month = new Date(date).toLocaleString('default', { month: 'short' });
    const Month_num = new Date(date).getMonth();
    const Year = new Date(date).getFullYear()
    const NewDateFormat = `${Month} ${Year}`;
    setDate({
      selectedDate: NewDateFormat
    });

    setAssignedYear(DateFromyear)
    setAssignedYear(Year);
    SetassignedMonth_num(Month_num + 1);
  }

  useEffect(() => {
    localStorage.setItem("url", window.location.pathname)
    setCurrentDate();

  }, []);

  useEffect(() => {
    if (DateFrommon || DateFromyear != undefined) {
      SetassignedMonth_num(DateFrommon);
      setAssignedYear(DateFromyear)
    }
  }, [DateFrommon, DateFromyear]);




  useEffect(() => {

    const HomeworkDailyBody =
    {
      aiSchoolId: asSchoolId,
      aiAcademicYearId: asAcademicYearId,
      aiStandardDivisionId: asStandardDivision,
      aiMonthId: assignedMonth_num,
      asYear: assignedYear
    }

    dispatch(getHomeworkDailyLogs(HomeworkDailyBody))
  }, [assignedMonth_num])


  const getPreviousDate = () => {
    const { selectedDate } = date;
    const dateValues = selectedDate.includes('-') ? selectedDate.split("-") : selectedDate.split(" ");
    const updatedDate = Date.parse(dateValues[0] + "01," + dateValues[1])
    const currentDayInMilli = new Date(updatedDate);
    currentDayInMilli.setMonth(currentDayInMilli.getMonth() - 1);
    setCurrentDate(currentDayInMilli);
  };

  const getNextDate = () => {
    const { selectedDate } = date;
    const dateValues = selectedDate.includes('-') ? selectedDate.split("-") : selectedDate.split(" ");
    const updatedDate = Date.parse(dateValues[0] + "01," + dateValues[1])
    const currentDayInMilli = new Date(updatedDate);
    currentDayInMilli.setMonth(currentDayInMilli.getMonth() + 1);
    setCurrentDate(currentDayInMilli);
  };





  return (
    <div>
      <Container>
        <BackButton FromRoute='/Student/Homework'></BackButton>
        <PageHeader heading={'Daily Logs'} subheading={''} />
        <MonthSelector
          date={date.selectedDate}
          PrevDate={getPreviousDate}
          NextDate={getNextDate}
          Close={undefined}
        />
          {loading ? <SuspenseLoader/> : 
       <>

       {GetHomeworkDailyLogs.length === 0 ?
          <>
            <ErrorMessages Error={'No records found'} />
          </> :
          <>
            {GetHomeworkDailyLogs.map((item, i) => (
              <div key={i}>
                <Card sx={{ display: "flex", justifyContent: "space-between" }} component={Box} mt={i === 0 ? -0.5 : 1} p={1}>
                  <Typography>{item.Header}</Typography>
                  <a href={localStorage.getItem('SiteURL') + item.Text1} rel="noreferrer" target="_blank" style={{ textDecoration: 'none' }}>
             
                    <FileDownloadOutlinedIcon/>
                  </a>
                </Card>
              </div>
            ))}

          </>}


</>}


    
     </Container>
    </div>
  )
}

export default DailyLogs