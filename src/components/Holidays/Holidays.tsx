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
import {isTodaysDate} from '../Common/Util'

function Holidays() {
  const asAcademicYearId = sessionStorage.getItem('AcademicYearId');
  const asSchoolId = localStorage.getItem('localSchoolId');
  const asStandardId = sessionStorage.getItem('StandardId');
  const asDivisionId = sessionStorage.getItem('DivisionId');

  const dispatch = useDispatch();
  const holidaysList = useSelector(
    (state: RootState) => state.Holidays.HolidaysData
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

  const DotLegend = styled('span')(
    ({ theme }) => `
        border-radius: 22px;
        width: ${theme.spacing(1.5)};
        height: ${theme.spacing(1.5)};
        display: inline-block;
        margin-right: ${theme.spacing(1)};
        margin-top: -${theme.spacing(0.1)};
    `
  );
  const theme = useTheme();
  const classes = Styles();

  const Data = holidaysList.map((item, index) => {
    return index === 0
      ? {
          id: index,
          header: item.Name,
          text1: item.StartDate,
          text2: 'Total Days: ' + item.ToatalDays,
          subtitle: 'Total Days: ' + item.ToatalDays,
          isSelected: 1,
          backgroundColor:(isTodaysDate(item.StartDate)) ? 'secondary' :'warning'
        }
      : {
          id: index,
          header: item.Name,
          text1: item.StartDate,
          text2: 'Total Days: ' + item.ToatalDays,
          isSelected: 0,
          backgroundColor:(isTodaysDate(item.StartDate)) ? 'secondary' : 'primary'
        };
  });

  return (
    <Container>
      <PageHeader heading={'Holidays'} subheading={''} />
      <DotLegend
        className={classes.border}
        style={{
          background: theme.colors.gradients.HighlightedlistColor,
          // marginLeft: '1.5rem',
          marginBottom: '-2px'
        }}
      />

      <small>
        <b> Todays Holiday </b> &nbsp;&nbsp;&nbsp;
      </small>
    

      <DotLegend
        className={classes.border}
        style={{
          background: theme.colors.gradients.selectedlistColor,
          marginLeft: '1.5rem',
          marginBottom: '-2px'
        }}
      />
      <small>
        <b> Upcoming Holidays </b>
      </small>
      <br />
      <br />

      <List1 items={Data} />
    </Container>
  );
}
export default Holidays;
