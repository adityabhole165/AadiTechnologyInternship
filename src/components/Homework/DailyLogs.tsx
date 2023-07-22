import { Card, Container, Typography ,Link, Box} from '@mui/material'
import React from 'react'
import BackButton from 'src/libraries/button/BackButton'
import PageHeader from 'src/libraries/heading/PageHeader'
import { RootState } from 'src/store';
import { useEffect, useState } from 'react';
import { getDateMonthYearFormatted, getHomeworkDateFormatted, getNextDate } from '../Common/Util';
import { useDispatch, useSelector } from 'react-redux';
import { getHomeworkDailyLogs } from 'src/requests/Homework/RequestHomeworkNew';
import ListH from 'src/libraries/mainCard/ListH';
import { useParams } from 'react-router-dom';

function DailyLogs() {
  const dispatch = useDispatch();
  const { Month, Year } = useParams();
  const [startdate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const asSchoolId = localStorage.getItem('localSchoolId');
  const asAcademicYearId = sessionStorage.getItem('AcademicYearId');
  const asStandardDivision = (sessionStorage.getItem('StandardDivisionId'));
  const GetHomeworkDailyLogs = useSelector((state: RootState) => state.HomeworkNew.HomeworkDailyLogs);
  const loading = useSelector((state: RootState) => state.HomeworkNew.Loading);
  const [month, setMonth] = useState(0);
  const [year, setYear] = useState(0);
  useEffect(() => {
    if (Month !== undefined) {
      setMonth(Number(Month))
      setYear(Number(Year))
    } else {
      setMonth(new Date().getMonth())
      setYear(new Date().getFullYear())
    }
    const HomeworkDailyBody =
    { aiSchoolId:asSchoolId,
      aiAcademicYearId:asAcademicYearId,
      aiStandardDivisionId:asStandardDivision,
      aiMonthId:"7",
      asYear:"2023"
    }
    dispatch(getHomeworkDailyLogs(HomeworkDailyBody))
  }, [])


  console.log(GetHomeworkDailyLogs,"item.Header")
  return (
    <div>
      <Container>
        <BackButton FromRoute='/Student/Homework'></BackButton>
        <PageHeader heading={'Daily Logs'} subheading={''} />
         {GetHomeworkDailyLogs.map((item, i) => (
          <div key={i}>
            <Card sx={{display:"flex" , justifyContent:"space-between"}} component={Box} mt={1} p={1}>
              <Typography>{item.Header}</Typography>
          <a href={localStorage.getItem('SiteURL') + item.Text1} rel="noreferrer" target="_blank" style={{ textDecoration: 'none' }}>
             <Typography >Click here</Typography>
          </a>
          </Card>
          </div>
        ))}

      </Container>
    </div>
  )
}

export default DailyLogs