import ArrowLeft from '@mui/icons-material/ArrowLeft';
import ArrowRight from '@mui/icons-material/ArrowRight';
import { Grid, Paper, Typography, styled } from '@mui/material';
import PropTypes from 'prop-types';
import { Styles } from 'src/assets/style/student-style';

MonthSelector.propTypes = {
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

function MonthSelector({ date, PrevDate, NextDate, Close }) {
  const classes = Styles();

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
            <Item sx={{ p: 1.3, background: '' }} className={classes.date}>
              {' '}
              <Typography sx={{ fontWeight: 'bold' }}>{date}</Typography>
            </Item>
            <div
              style={{
                position: 'fixed',
                display: 'none',
                width: '300px',
                marginTop: '5px',
                zIndex: '2'
              }}
            ></div>
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

export default MonthSelector;
