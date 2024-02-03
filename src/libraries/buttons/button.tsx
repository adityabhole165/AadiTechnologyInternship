import ArrowLeft from '@mui/icons-material/ArrowLeft';
import ArrowRight from '@mui/icons-material/ArrowRight';
import { Grid, Paper, Typography, styled } from '@mui/material';
import PropTypes from 'prop-types';
import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useLocation } from 'react-router-dom';
import 'src/assets/style/Homework_Calci.css';
import { Styles } from 'src/assets/style/student-style';

Buttons.propTypes = {
  Date: PropTypes.any,
  PrevDate: PropTypes.any,
  NextDate: PropTypes.any,
  Close: PropTypes?.any,
  displayCalander: PropTypes?.any
};

const Item = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(0.5),
  textAlign: 'center',
  color: 'black',
  background: '',
  borderRadius: '4px',
  boxShadow: '0px 8px 15px rgba(0, 0, 0, 0.1)'
}));

function Buttons({ date, PrevDate, NextDate, Close }) {
  const location = useLocation();
  const pathname = location.pathname;

  const classes = Styles();
  const [dateClickDependent, setdateClickDependent] = useState('none');

  const dateClickHnadler = (e) => {
    if (
      dateClickDependent == 'none' &&
      pathname.includes('StaffBirthday') &&
      pathname.includes('EventOverview')
    ) {
      setdateClickDependent('flex');
    }
    if (
      dateClickDependent == 'flex' &&
      pathname.includes('StaffBirthday') &&
      pathname.includes('EventOverview')
    ) {
      setdateClickDependent('none');
    }
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
      <div>
        <Grid container spacing={0.5}>
          <Grid item xs={2}>
            <Item onClick={() => PrevDate()}>
              <ArrowLeft sx={{ mt: 0.5, fontSize: 25 }} />
            </Item>
          </Grid>
          <Grid item xs={8}>
            <Item
              sx={{ p: 1.3, background: '' }}
              className={classes.date}
              onClick={dateClickHnadler}
            >
              {' '}
              <Typography sx={{ fontWeight: 'bold' }}>{date}</Typography>
            </Item>
            <div
              onClick={ChangeCapture}
              style={{
                position: 'fixed',
                display: dateClickDependent,
                width: '300px',
                marginTop: '5px',
                zIndex: '2'
              }}
            >
              <Calendar onChange={(e) => Close(e.toLocaleString())} />
            </div>
          </Grid>

          <Grid item xs={2}>
            <Item onClick={() => NextDate()}>
              <ArrowRight sx={{ mt: 0.5, fontSize: 25 }} />
            </Item>
          </Grid>
        </Grid>
      </div>

      <br />
    </>
  );
}

export default Buttons;
