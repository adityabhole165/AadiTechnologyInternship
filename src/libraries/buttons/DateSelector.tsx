import { Container, Grid, Typography, styled, Paper, useTheme } from '@mui/material';
import ArrowLeft from '@mui/icons-material/ArrowLeft';
import ArrowRight from '@mui/icons-material/ArrowRight';
import { Styles } from 'src/assets/style/student-style';
import PropTypes from 'prop-types';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useState } from 'react';
import 'src/assets/style/Homework_Calci.css';
import { useLocation } from 'react-router-dom';
import { ErrorDetail, ErrorDetail1 } from '../styled/ErrormessageStyled';
import { isFutureDate, isTodaysDate, getNextDate } from '../../components/Common/Util'

DateSelector.propTypes = {
  Date: PropTypes.any,
  setCurrentDate: PropTypes.any,
  Close: PropTypes?.any,
  displayCalander: PropTypes?.any,
  Array: PropTypes.array
};

const Item = styled(Paper)(({ theme, color }) => ({
  padding: theme.spacing(0.5),
  textAlign: 'center',
  color: 'black',
  background: color === 'secondary' ?//'rgb(36 66 175 / 0.4)',
    theme.colors.gradients.HighlightedlistColor :
    color === 'warning' ?
      theme.colors.gradients.selectedlistColor :
      theme.colors.gradients.listColor,
  borderRadius: '4px'
}));

function DateSelector({ date, setCurrentDate, Close }) {
  const theme = useTheme()

  const classes = Styles();
  const [isTodayDate, setIsTodayDate] = useState(true);
  const [dateClickDependent, setdateClickDependent] = useState('none');

  const SetNewDate = (prevNext) => {
    if (isTodayDate && prevNext === 1) return

    const nextDate = getNextDate(date, prevNext)
    setIsTodayDate(isTodaysDate(nextDate))
    setCurrentDate(nextDate);
  }

  const dateClickHnadler = (e) => {
    setdateClickDependent(dateClickDependent === 'none' ? 'flex' : 'none')
  };

  const ChangeCapture = (e) => {
    setTimeout(() => {
      setdateClickDependent('none');
    }, 100);
  };

  return (
    <>
        <Grid container spacing={0.5}>

          <Grid item xs={2}>
            <Item onClick={() => SetNewDate(-1)}>
              <ArrowLeft />
            </Item>
          </Grid>

          <Grid item xs={8} >
            <Item sx={{ p: 1 }} onClick={dateClickHnadler}>
              <Typography sx={{ fontWeight: 'bold' }}> {date} </Typography>
            </Item>
            <div onClick={ChangeCapture}
              style={{
                position: 'fixed',
                display: dateClickDependent,
                zIndex: '2',
              }}
            >
              <Calendar onChange={(e) => Close(e.toLocaleString())} />
            </div>
          </Grid>

          <Grid item xs={2}>
            <Item color={isTodayDate ? 'warning' : 'primary'} onClick={() => SetNewDate(1)}>
              <ArrowRight/>
            </Item>
          </Grid>

        </Grid>
      <br />
    </>
  );
}

export default DateSelector;
