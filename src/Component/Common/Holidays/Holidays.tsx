import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getHolidays } from 'src/Client_Api/Common/Holiday';
import { Styles } from 'src/assets/style/student-style';
import { useSelector } from 'react-redux';
import { RootState } from 'src/store';
import { styled, useTheme } from '@mui/material';
import IHolidays from 'src/Interface/Common/Holidays';
import PageHeader from 'src/UI_Library/heading/PageHeader';
import List1 from 'src/UI_Library/mainCard/List1';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';


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
          text2: '',
          subtitle: 'Total Days: ' + item.ToatalDays,
          isSelected: 1
        }
      : {
          id: index,
          header: item.Name,
          text1: item.StartDate,
          text2: 'Total Days: ' + item.ToatalDays,
          isSelected: 0
        };
  });
  return (
    <>
      <PageHeader heading={'Holidays'} subheading={''} />
      <DotLegend
        className={classes.border}
        style={{
          background: '#e9a69a',
          marginLeft: '1.5rem',
          marginBottom: '-2px'
        }}
      />
      
      <small>
        <b> Upcoming Holidays </b> &nbsp;&nbsp;&nbsp;
      </small>
      <CheckRoundedIcon
                sx={{
                  position:'relative',
                  color: 'green',
                  fontSize: '25px',
                  top:'5px'
                }}
              />
              <small>
        <b> Ongoing Holidays </b> 
      </small>
      <br />
      <br />


      <List1 items={Data} />
    </>
  );
}
export default Holidays;
