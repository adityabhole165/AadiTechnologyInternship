import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getHolidays } from 'src/requests/Holiday/Holiday';
import { Styles } from 'src/assets/style/student-style';
import { useSelector } from 'react-redux';
import { RootState } from 'src/store';
import { Container, styled, useTheme } from '@mui/material';
import IHolidays from 'src/interfaces/Common/Holidays';
import PageHeader from 'src/libraries/heading/PageHeader';
import List1 from 'src/libraries/mainCard/List1';
import { isTodaysDate } from '../Common/Util'
import DotLegend from 'src/libraries/summary/DotLegend';
import Grid from '@mui/material/Grid';
import SuspenseLoader from 'src/layouts/components/SuspenseLoader';
function Holidays() {
  const asAcademicYearId = sessionStorage.getItem('AcademicYearId');
  const asSchoolId = localStorage.getItem('localSchoolId');
  const asStandardId = sessionStorage.getItem('StandardId');
  const asDivisionId = sessionStorage.getItem('DivisionId');

  const dispatch = useDispatch();
  const holidaysList = useSelector(
    (state: RootState) => state.Holidays.HolidaysData
  );

  const loading = useSelector(
    (state: RootState) => state.Holidays.Loading
  );

  const body: IHolidays = {
    asAcademicYearId: asAcademicYearId,
    asSchoolId: asSchoolId,
    asStandardId:
      asStandardId == null
        ? '0'
        : asStandardId == 'undefined'
          ? '0'
          : asStandardId,
    asDivisionId:
      asDivisionId == null
        ? '0'
        : asDivisionId == 'undefined'
          ? '0'
          : asDivisionId
  };

  useEffect(() => {
    localStorage.setItem('url', window.location.pathname);
    dispatch(getHolidays(body));
  }, []);


  const theme = useTheme();
  const classes = Styles();

  const Data = holidaysList.map((item, index) => {
    return index === 0
      ? {
        id: index,
        header: item.Name,
        text1: item.ToatalDays == 1 ? item.StartDate : item.StartDate + ' To ' + item.EndDate,
        text2: 'Total Days: ' + item.ToatalDays,
        subtitle: 'Total Days: ' + item.ToatalDays,
        backgroundColor: 'secondary'
      }
      : {
        id: index,
        header: item.Name,
        text1: item.ToatalDays > 1 ? item.StartDate + ' To ' + item.EndDate : item.StartDate,
        text2: 'Total Days: ' + item.ToatalDays,
        backgroundColor: 'primary'
      };
  });

  return (
    <Container>
      <PageHeader heading={'Holidays'} subheading={''} />
      <Grid container>
        <Grid item xs={6}>
          <DotLegend color='secondary' text='Upcoming Holidays' />
        </Grid>
      </Grid>
      {loading ? (
        <SuspenseLoader />
      ) : (
        <List1 items={Data}></List1>
      )}
    </Container>
  );
}
export default Holidays;
