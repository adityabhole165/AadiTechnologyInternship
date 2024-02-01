import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import {
  Box,
  Card,
  Grid,
  IconButton,
  Stack,
  Typography,
  alpha
} from '@mui/material';
import DotLegendTeacher from '../summary/DotLegendTeacher';
import CardCal from './CardCal';
function CardCalenderList({
  ItemList,
  ClickItem,
  handlePrevMonth,
  handleNextMonth,
  formattedDate,
  DefaultValue,
  ArrayList
}) {
  const yearStyle = {
    fontSize: '40px'
  };
  const clickCard = (Value) => {
    const checkStatus = (obj) => {
      return (obj.Status == undefined ? obj.Text3 : obj.Status) == 'Y';
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

  return (
    <Card component={Box} p={2}>
      <Box
        sx={{
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center'
        }}
      >
        <Box display="flex" justifyContent="space-between">
          <Typography m={0} variant={'h3'}>
            <b>{formattedDate}</b>
          </Typography>

          <Stack direction={'row'} gap={1}>
            <IconButton
              color={'primary'}
              sx={{
                backgroundColor: (theme) =>
                  alpha(theme.palette.primary.main, 0.2)
              }}
              onClick={() => handlePrevMonth()}
            >
              <ArrowBackIosNewIcon />
            </IconButton>
            <IconButton
              color={'primary'}
              sx={{
                backgroundColor: (theme) =>
                  alpha(theme.palette.primary.main, 0.2)
              }}
              onClick={() => handleNextMonth()}
            >
              <ArrowForwardIosIcon />
            </IconButton>
          </Stack>
        </Box>
        <Grid container sx={{ my: 2 }}>
          <Grid item sx={{}} gap={6} display="flex" xs={12} lg={12}>
            <DotLegendTeacher color="primary" text="Present" />
            <DotLegendTeacher color="error" text="Absent" />
            <DotLegendTeacher color="success" text="Holiday" />
            <DotLegendTeacher color="secondary" text="Weekend" />

            <DotLegendTeacher color="warning" text="Outside Acadamic Year " />
            <DotLegendTeacher color="info" text="Late Join " />
            <DotLegendTeacher color="" text="Not Available " />
          </Grid>
        </Grid>
        <Grid container spacing={0}>
          {ArrayList.map((item, i) => (
            <Grid
              item
              xs={1.7}
              md={1.7}
              sx={{ textAlign: 'center', pt: 0 }}
              key={i}
            >
              <Box sx={{}}>
                <Typography
                  sx={{
                    textTransform: 'capitalize',
                    textAlign: 'center',
                    fontWeight: 'bold'
                  }}
                >
                  {item.Header}
                </Typography>
              </Box>
            </Grid>
          ))}
          {ItemList.map((item, i) => {
            return (
              <Grid
                item
                border="0.5px solid #ebebeb"
                md={1.7}
                sx={{ textAlign: 'center', pt: 0 }}
                key={i}
              >
                <CardCal
                  item={item}
                  clickItem={clickCard}
                  DefaultValue={DefaultValue}
                />
              </Grid>
            );
          })}
        </Grid>
      </Box>
    </Card>
  );
}
export default CardCalenderList;
