import { Grid, Typography, styled, Paper } from '@mui/material';
import ArrowLeft from '@mui/icons-material/ArrowLeft';
import ArrowRight from '@mui/icons-material/ArrowRight';
import PropTypes from 'prop-types';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useState } from 'react';
import 'src/assets/style/Homework_Calci.css';
import { isTodaysDate, getNextDate } from '../../components/Common/Util'

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
  borderRadius: '4px',
  boxShadow: "0px 8px 15px rgba(0, 0, 0, 0.1)",
}));

function DateSelector({ date, setCurrentDate, Close }) {
  const [dateClickDependent, setdateClickDependent] = useState('none');

  const SetNewDate = (prevNext) => {
    if (isTodaysDate(date) && prevNext === 1) return

    const nextDate = getNextDate(date, prevNext)
    setCurrentDate(nextDate);
  }

  const clickClose=(selectDate)=>{
    const updatedDateFormat = selectDate.split(',')[0].split('/')[1] + '/' +
      selectDate.split(',')[0].split('/')[0] + '/' +
      selectDate.split(',')[0].split('/')[2] + ',' +
      selectDate.split(',')[1]
    Close(updatedDateFormat)
  }

  const dateClickHnadler = (e) => {
    setdateClickDependent(dateClickDependent === 'none' ? 'flex' : 'none')
  };

  const ChangeCapture = (e) => {
    if(e.target.type != 'button'){
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

          <Grid item xs={8} >
            <Item sx={{ p: 1 }} onClick={dateClickHnadler}>
              <Typography sx={{ fontWeight: 'bold' }}> {date} </Typography>
            </Item>
            <div onClick={ChangeCapture}
              style={{
                position: 'fixed',
                display: dateClickDependent,
                zIndex: '2',
               marginTop:"10px"
               
              }}
            >
              <Calendar onChange={(e) => clickClose(e.toLocaleString())} maxDate={new Date()}/>
            </div>
          </Grid>

          <Grid item xs={2}>
            <Item color={isTodaysDate(date) ? 'warning' : 'primary'} onClick={() => SetNewDate(1)}>
              <ArrowRight/>
            </Item>
          </Grid>

        </Grid>
      <br />
    </>
  );
}

export default DateSelector;
