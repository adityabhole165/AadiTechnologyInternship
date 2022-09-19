import { Container, Grid, Typography, styled, Paper } from '@mui/material';
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
import { isFutureDate } from '../../components/Common/Util'
DateSelector.propTypes = {
  Date: PropTypes.any,
  setCurrentDate: PropTypes.any,
  Close: PropTypes?.any,
  displayCalander: PropTypes?.any
};

const Item = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(0.5),
  textAlign: 'center',
  color: 'black',
  background: 'rgb(36 66 175 / 0.4)',
  borderRadius: '4px'
}));

function DateSelector({ date, setCurrentDate, Close }) {


  const location = useLocation();
  const pathname = location.pathname;
  const pageName = pathname.replace('/extended-sidebar/Student/', '');

  const classes = Styles();
  const [isFuture, setIsFuture] = useState(false);

  const SetNewDate = (prevNext) => {
    const { selectedDate } = { selectedDate: date };

    const currentDayInMilli = new Date(selectedDate).getTime();
    const oneDay = prevNext * 1000 * 60 * 60 * 24;
    const nextDayInMilli = currentDayInMilli + oneDay;
    const next = new Date(nextDayInMilli);
    let cDay = (new Date(new Date().toLocaleDateString()))
    setIsFuture(isFutureDate(next))
    if (isFutureDate(next))
      setCurrentDate(next);
  }


  return (
    <>
      <Container>
        <div>
          <Grid container spacing={0.5}>
            <Grid item xs={2}>
              <Item onClick={() => SetNewDate(-1)}>
                <ArrowLeft sx={{ mt: 0.5, fontSize: 25 }} />
              </Item>
            </Grid>
            <Grid item xs={8} >
              <Item
                sx={{ p: 1.3, background: 'rgb(36 66 175 / 0.4)' }}
                className={classes.date}
              >
                {' '}
                <Typography sx={{ fontWeight: 'bold' }}>{date}</Typography>
              </Item>
              <Item
                sx={{
                  width: '300px',
                  position: 'absolute',
                  display: 'none',
                  alignSelf: 'center',
                  zIndex: '2',
                  mt: '5px',
                }}
              >
                <Calendar onChange={(e) => Close(e.toLocaleString())} />
              </Item>
            </Grid>

            <Grid item xs={2}>
              <Item onClick={() => SetNewDate(1)}>
                <ArrowRight sx={{ mt: 0.5, fontSize: 25 }} />
              </Item>
            </Grid>
            <Grid item xs={12}>
              {isFuture && <ErrorDetail>Future date attendance not allowed</ErrorDetail>}
            </Grid>
          </Grid>
        </div>
      </Container>
      <br />
    </>
  );
}

export default DateSelector;
