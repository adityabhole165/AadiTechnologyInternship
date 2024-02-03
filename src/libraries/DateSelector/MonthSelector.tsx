import ArrowLeft from '@mui/icons-material/ArrowLeft';
import ArrowRight from '@mui/icons-material/ArrowRight';
import { Grid, Paper, Typography, styled } from '@mui/material';
import { Styles } from 'src/assets/style/student-style';
import {
  getDateFormatted,
  getMonthYearFormatted
} from 'src/components/Common/Util';

const Item = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(0.5),
  textAlign: 'center',
  color: 'black',
  background: '',
  borderRadius: '4px',
  boxShadow: '0px 8px 15px rgba(0, 0, 0, 0.1)'
}));

const MonthSelector = ({ DefaultDate, ClickDate }) => {
  const classes = Styles();
  const ClickLeftRight = (value) => {
    const newDate = new Date(DefaultDate);
    newDate.setMonth(newDate.getMonth() + value);
    ClickDate(getDateFormatted(newDate));
  };
  return (
    <>
      <div>
        <Grid container spacing={0.5}>
          <Grid item xs={2}>
            <Item onClick={() => ClickLeftRight(-1)}>
              <ArrowLeft sx={{ mt: 0.5, fontSize: 25 }} />
            </Item>
          </Grid>
          <Grid item xs={8}>
            <Item sx={{ p: 1.3, background: '' }} className={classes.date}>
              {' '}
              <Typography sx={{ fontWeight: 'bold' }}>
                {getMonthYearFormatted(DefaultDate)}
              </Typography>
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
            <Item onClick={() => ClickLeftRight(1)}>
              <ArrowRight sx={{ mt: 0.5, fontSize: 25 }} />
            </Item>
          </Grid>
        </Grid>
      </div>

      <br />
    </>
  );
};

export default MonthSelector;
