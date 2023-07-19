import { Card, Container, Typography ,Link} from '@mui/material'
import React from 'react'
import BackButton from 'src/libraries/button/BackButton'
import PageHeader from 'src/libraries/heading/PageHeader'
import { RootState } from 'src/store';
import { useEffect, useState } from 'react';
import { getDateMonthYearFormatted, getHomeworkDateFormatted, getNextDate } from '../Common/Util';
import { useDispatch, useSelector } from 'react-redux';
import { getHomeworkDates } from 'src/requests/Homework/RequestHomeworkNew';
import ListH from 'src/libraries/mainCard/ListH';

function DailyLogs() {
  const dispatch = useDispatch();
  const [startdate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const asSchoolId = localStorage.getItem('localSchoolId');
  const asAcademicYearId = sessionStorage.getItem('AcademicYearId');
  const asStandardDivision = (sessionStorage.getItem('StandardDivisionId'));
  const GetHomeworkDates = useSelector((state: RootState) => state.HomeworkNew.HomeworkDailyLogs);
  const loading = useSelector((state: RootState) => state.HomeworkNew.Loading);

  useEffect(() => {
    const HomeworkBody =
    {
      aiSchoolId: asSchoolId,
      aiAcademicYearId: asAcademicYearId,
      aiStandardDivisionId: asStandardDivision,
      asStartdate: '',
      asEnddate: ''
    }
    dispatch(getHomeworkDates(HomeworkBody))
  }, [])


  
  return (
    <div>
      <Container>
        <BackButton FromRoute='/Student/Homework'></BackButton>
        <PageHeader heading={'Daily Logs'} subheading={''} />
        {/* <ListH itemList={GetHomeworkDates}/> */}
        {GetHomeworkDates.map((item, i) => (
          <div key={i}>
            <Card sx={{mt:"5px" ,padding:"5px" ,display:"flex" , justifyContent:"space-between"}}>
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