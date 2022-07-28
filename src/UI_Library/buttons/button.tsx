import {
  Container,
  Grid,
  Typography,
  styled,
  Paper,
} from '@mui/material';
import ArrowLeft from '@mui/icons-material/ArrowLeft';
import ArrowRight from '@mui/icons-material/ArrowRight';
import { Styles } from 'src/assets/style/student-style';
import PropTypes from 'prop-types';
import Calendar from 'react-calendar';
import { useState } from 'react';
import 'src/assets/style/student-cal.css';
import EventRoundedIcon from '@mui/icons-material/EventRounded';

Buttons.propTypes = {
  Date: PropTypes.any,
  PrevDate: PropTypes.any,
  NextDate: PropTypes.any
};

const Item = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(0.5),
  textAlign: 'center',
  color: 'black',
  background: 'rgb(36 66 175 / 0.4)',
  borderRadius: '4px'
}));

function Buttons({ date, PrevDate, NextDate, Close }) {
  const classes = Styles();
  const [dateClickDependent, setdateClickDependent] = useState('none');

  const dateClickHnadler = (e) => {
    if (dateClickDependent == 'none') {
      setdateClickDependent('block');
    }
    if (dateClickDependent == 'block') {
      setdateClickDependent('none');
    }
  };

  const closeCalander = () => {
    setdateClickDependent('none');
  }

  return (
    <>
      <Container >
        <div >
        <Grid container spacing={0.5} >
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
              <Typography sx={{ fontWeight: 'bold' }}>{date}<EventRoundedIcon sx={{mt:'-20px',zIndex:'2',position:'relative',top:'5px',ml:'5px'}}/></Typography>
            </Item>
            <Item
              sx={{
                width: '250px',
                position: 'absolute',
                left: '41%',
                display: dateClickDependent,
                zIndex: '2'
              }}
            >
              <Calendar
                onChange={(e) => Close(e.toLocaleString())}
              />
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
