import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { Box, Card, Grid, IconButton, Typography } from '@mui/material';
import { getDateFormattedDash } from 'src/components/Common/Util';
import CardCal from './CardCal'; // Make sure to provide the correct path to CardCal

function CardCalender({
  ItemList,
  ClickItem,
  formattedDate,
  DefaultValue,
  ArrayList = []
}) {
  const clickCard = (Value) => {
    const checkStatus = (obj) => {
      return (obj.Status === undefined ? obj.Text3 : obj.Status) === 'Y';
    };

    let returnVal = ItemList.map((obj) =>
      obj.Value === Value
        ? {
            ...obj,
            Status: checkStatus(obj) ? 'N' : 'Y',
            BackgroundColor: checkStatus(obj) ? 'tomato' : 'mediumturquoise',
            Text1: checkStatus(obj) ? 'Absent' : 'Present'
          }
        : obj
    );

    ClickItem(returnVal);
  };

  const clickPrevNextMonth = (value) => {
    let newDate;
    if (formattedDate.split(' ').length === 2) {
      newDate = new Date('1 ' + formattedDate);
    } else {
      newDate = new Date(formattedDate);
    }
    newDate.setMonth(newDate.getMonth() + value);
    ClickItem(getDateFormattedDash(newDate));
  };

  return (
    <>
      <Box sx={{}}>
        <Card
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: '#BEDAE3'
          }}
        >
          <IconButton
            onClick={() => clickPrevNextMonth(-1)}
            sx={{ float: 'left' }}
          >
            <ArrowLeftIcon />
          </IconButton>
          <Typography sx={{ fontWeight: 'bold' }}>{formattedDate}</Typography>
          <IconButton
            onClick={() => clickPrevNextMonth(1)}
            sx={{ float: 'right' }}
          >
            <ArrowRightIcon />
          </IconButton>
        </Card>
      </Box>

      <Card component={Box} p={2} mt={1.5}>
        <Grid container columnSpacing={10} rowSpacing={1}>
          {ArrayList.map((item, i) => (
            <Grid item xs={1.71} sx={{ textAlign: 'center' }} key={i}>
              <b>{item.Header}</b>
            </Grid>
          ))}
        </Grid>
        <br></br>
        <Grid container columnSpacing={7} rowSpacing={1}>
          {ItemList.map((item, i) => (
            <Grid item lg={1.71} sx={{ textAlign: 'center' }} key={i}>
              <CardCal
                item={item}
                clickItem={() => ClickItem(item.Value)}
                DefaultValue={DefaultValue}
              />
            </Grid>
          ))}
        </Grid>
      </Card>
    </>
  );
}

export default CardCalender;
