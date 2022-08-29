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
  background: 'rgb(36 66 175 / 0.4)',
  borderRadius: '4px'
}));

function Buttons({ date, PrevDate, NextDate, Close }) {
  const location = useLocation();
  const pathname = location.pathname;
  const pageName = pathname.replace('/extended-sidebar/Student/', '');

  const classes = Styles();
  const [dateClickDependent, setdateClickDependent] = useState('none');

  const dateClickHnadler = (e) => {
    if (dateClickDependent == 'none' && pageName == 'Homework') {
      setdateClickDependent('flex');
    }
    if (dateClickDependent == 'flex' && pageName == 'Homework') {
        setdateClickDependent('none');
      }
  };

  const ChangeCapture = (e) => {
      setTimeout(() => {
        setdateClickDependent('none');
      }, 100);
  }

  return (
    <>
      <Container>
        <div>
          <Grid container spacing={0.5}>
            <Grid item xs={2}>
              <Item onClick={() => PrevDate()}>
                <ArrowLeft sx={{ mt: 0.5, fontSize: 25 }} />
              </Item>
            </Grid>
            <Grid item xs={8}>
              <Item
                sx={{ p: 1.3, background: 'rgb(36 66 175 / 0.4)' }}
                className={classes.date}
                onClick={dateClickHnadler}
              >
                {' '}
                <Typography sx={{ fontWeight: 'bold' }}>{date}</Typography>
              </Item>
              <Item
              onClick={ChangeCapture}
                sx={{
                  width: '300px',
                  position: 'absolute',
                  display: dateClickDependent,
                  left:'70px',
                  zIndex: '2',
                  mt: '5px',
                }}
              >
                <Calendar onChange={(e) => Close(e.toLocaleString())} />
                {/* <Avatar
                  sx={{
                    position: 'absolute',
                    top: '-15px',
                    // right:'5px',
                    zIndex: '4',
                    right: '-10px',
                    p: '2px',
                    width: 29,
                    height: 29,
                    backgroundColor: 'white',
                    boxShadow:
                      '5px 5px 10px rgba(163, 177, 198, 0.4), -5px -5px 10px rgba(255, 255, 255, 0.3) !important'
                  }}
                  onClick={closeIcon} // Close function
                >
                  <CloseIcon fontSize="small" color="error" />
                </Avatar> */}
              </Item>
            </Grid>

            <Grid item xs={2}>
              <Item onClick={() => NextDate()}>
                <ArrowRight sx={{ mt: 0.5, fontSize: 25 }} />
              </Item>
            </Grid>
          </Grid>
        </div>
      </Container>
      <br />
    </>
  );
}

export default Buttons;
