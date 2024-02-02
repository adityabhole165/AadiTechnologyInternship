import { Grid, Grow, useTheme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import moment from 'moment';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Styles } from 'src/assets/style/student-style';
import { RootState } from 'src/store';
import { CardDetail2, ListStyle } from '../styled/CardStyle';

List17.propTypes = {
  Name: PropTypes.string,
  BirthDate: PropTypes.string,
  list: PropTypes.string,
  setAssignedMonth: PropTypes.string,
  SetassignedMonth_num: PropTypes.string,
  setCurrentDate: PropTypes.string
};

function List17({ Name, BirthDate, CalendarMonth = '' }) {
  const [checked, setChecked] = useState(true);
  const theme = useTheme();
  const classes = Styles();
  const { assignedDate } = useParams();
  const [birthDate, SetBirthDate] = useState([]);

  const staffBirthdayList = useSelector(
    (state: RootState) => state.staffBirthday.staffBirthdayData
  );

  staffBirthdayList.map((item: any, i) => {
    birthDate.push(item.BirthDate);
  });

  const presDate = moment(new Date()).format('DD MMM ');

  const PresentDate = new Date();

  const PresntDay = new Date(presDate);
  const presenttt = moment(new Date(PresntDay)).format('DD ');
  const MonthDay = new Date(PresentDate).toLocaleString('default', {
    month: 'short'
  });
  const presentDateMonth = presenttt + MonthDay;

  const PresentMonth = new Date(PresentDate).toLocaleString('default', {
    month: 'short'
  });
  const PresentDateFormat = `${PresntDay} ${PresentMonth}`;

  const presentDate = moment(new Date()).format('DD MMM');
  const presentYear = moment(new Date()).format('yyyy');
  const CalendarYear = CalendarMonth.substr(CalendarMonth.length - 4);
  const IsHighlight = presentYear == CalendarYear;
  const currentDayInMilli = new Date(presentDate).getTime();
  const oneDay = 1000 * 60 * 60 * 24;
  const nextDayInMilli = currentDayInMilli + oneDay;
  const nextDay = new Date(nextDayInMilli);
  const Day = moment(new Date(nextDay)).format('DD');
  const Month = new Date(nextDay).toLocaleString('default', { month: 'short' });
  const NewDateFormat = `${Day} ${Month}`;

  const datesToBeChecked: any = birthDate;
  const dateToCheckFor = presentDate;

  let nearestDate;

  datesToBeChecked.map((date) => {
    let diff = moment(date).diff(moment(dateToCheckFor), 'days');

    if (diff > 0) {
      if (nearestDate) {
        if (moment(date).diff(moment(nearestDate), 'days') < 2) {
          nearestDate = date;
        }
      } else {
        nearestDate = date;
      }
    }
  });

  const useStyles = makeStyles({
    root: {
      background: '#e9a69a'
    },
    roo1: {
      background: `${theme.colors.gradients.pink1}`
    }
  });
  const clas = useStyles();

  return (
    <>
      <Grow
        in={checked}
        style={{ transformOrigin: '0 0 1' }}
        {...(checked ? { timeout: 1500 } : {})}
      >
        <ListStyle
          sx={{
            background:
              (IsHighlight && BirthDate === presentDateMonth) ||
              (BirthDate === NewDateFormat && presentDateMonth < BirthDate)
                ? '#e9a69a'
                : IsHighlight && nearestDate === BirthDate
                ? '#e9a69a'
                : `${theme.colors.gradients.pink1}`
          }}
        >
          <Grid container>
            <Grid item xs={9}>
              <CardDetail2>{Name}</CardDetail2>
            </Grid>
            <Grid item xs={3}>
              <CardDetail2 sx={{ float: 'right' }}>{BirthDate}</CardDetail2>
            </Grid>
          </Grid>
        </ListStyle>
      </Grow>
    </>
  );
}

export default List17;
