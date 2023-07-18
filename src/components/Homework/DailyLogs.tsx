import { Container } from '@mui/material'
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
    const asSchoolId = localStorage.getItem('localSchoolId');
    console.log(asSchoolId,"asSchoolId")
    const asAcademicYearId = sessionStorage.getItem('AcademicYearId');
    const asStandardDivision = (sessionStorage.getItem('StandardDivisionId'));
    const GetHomeworkDates = useSelector((state: RootState) => state.HomeworkNew.HomeworkDailyLogs);
    console.log(GetHomeworkDates ,"GetHomeworkDates")
    const loading = useSelector((state: RootState) => state.HomeworkNew.Loading);
    
    useEffect(() => {
        const HomeworkBody =
        {
          aiSchoolId: asSchoolId,
          aiAcademicYearId: asAcademicYearId,
          aiStandardDivisionId: asStandardDivision,
          asStartdate: '08-Apr-2023',
          asEnddate: '08-Apr-2023'
        }
        dispatch(getHomeworkDates(HomeworkBody))
      }, [])
  return (
    <div>
        <Container>
            <BackButton FromRoute='/Student/Homework'></BackButton>
            <PageHeader heading={'Daily Logs'} subheading={''}/>
            <ListH itemList={GetHomeworkDates}/>
        </Container>
    </div>
  )
}

export default DailyLogs