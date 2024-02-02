import ArrowLeft from '@mui/icons-material/ArrowLeft';
import ArrowRight from '@mui/icons-material/ArrowRight';
import { Grid, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import 'src/assets/style/Homework_Calci.css';
import { getNextDate, isTodaysDate } from '../../components/Common/Util';
import { Item } from '../styled/ButtonStyle';

DateSelector.propTypes = {
  Date: PropTypes.any,
  setCurrentDate: PropTypes.any,
  Close: PropTypes?.any,
  displayCalander: PropTypes?.any,
  Array: PropTypes.array
};

function DateSelector({ date, setCurrentDate, Close }) {
  const [dateClickDependent, setdateClickDependent] = useState('none');

  const SetNewDate = (prevNext) => {
    if (isTodaysDate(date) && prevNext === 1) return;

    const nextDate = getNextDate(date, prevNext);
    setCurrentDate(nextDate);
  };

  const dateClickHnadler = (e) => {
    setdateClickDependent(dateClickDependent === 'none' ? 'flex' : 'none');
  };

  const ChangeCapture = (e) => {
    if (e.target.type != 'button') {
      setTimeout(() => {
        setdateClickDependent('none');
      }, 100);
    }
  };

  return (
    <>
      <Grid container spacing={0.5}>
        <Grid item xs={2}>
          <Item onClick={() => SetNewDate(-1)}>
            <ArrowLeft />
          </Item>
        </Grid>

        <Grid item xs={8}>
          <Item onClick={dateClickHnadler}>
            <Typography sx={{ fontWeight: 'bold' }}> {date} </Typography>
          </Item>
          <div
            onClick={ChangeCapture}
            style={{
              position: 'fixed',
              display: dateClickDependent,
              zIndex: '2',
              marginTop: '10px'
            }}
          >
            <Calendar onChange={(e) => Close(e)} maxDate={new Date()} />
          </div>
        </Grid>

        <Grid item xs={2}>
          <Item
            color={isTodaysDate(date) ? 'warning' : 'primary'}
            onClick={() => SetNewDate(1)}
          >
            <ArrowRight />
          </Item>
        </Grid>
      </Grid>
      <br />
    </>
  );
}

export default DateSelector;
