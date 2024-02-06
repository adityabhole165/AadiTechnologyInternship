import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import {
  Box,
  Grid,
  IconButton,
  MenuItem,
  Stack,
  TextField,
  Typography,
  alpha
} from '@mui/material';
import DotLegendTeacher from '../summary/DotLegendTeacher';
import CardCal from './CardCal';
function AnnualPlannerCalendar({
  ItemList,
  ClickItem,
  handlePrevMonth,
  handleNextMonth,
  formattedDate,
  DefaultValue,
  ArrayList
}) {
  const legendColors = {
    holiday: '#b73839',
    exam: '#008000',
    events: '#303f9f'
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
  let dayCount = new Date('01' + formattedDate).getDay();
  return (
    <Box sx={{ backgroundColor: 'white' }} p={2}>
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
            <Box>
              <TextField
                select={true}
                sx={{ width: '150px' }}
                label="Select Standard"
                size={'small'}
                value={''}
              >
                <MenuItem value={''}>Select Standard</MenuItem>
              </TextField>
            </Box>
            <Box>
              <TextField
                select={true}
                sx={{ width: '150px' }}
                label="Select Division"
                size={'small'}
                value={''}
              >
                <MenuItem value={''}>Select Division</MenuItem>
              </TextField>
            </Box>
            <Box>
              <TextField
                select={true}
                sx={{ width: '150px' }}
                label="Select Month"
                size={'small'}
                value={''}
              >
                <MenuItem value={''}>Select Month</MenuItem>
              </TextField>
            </Box>
            <Box>
              <TextField
                select={true}
                sx={{ width: '150px' }}
                label="Select Year"
                size={'small'}
                value={''}
              >
                <MenuItem value={''}>Select Year</MenuItem>
              </TextField>
            </Box>
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

        <Grid container spacing={0} sx={{ mt: 2 }}>
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
          <Grid
            item
            border="0.5px solid #ebebeb"
            md={1.7 * dayCount}
            sx={{ textAlign: 'center', pt: 0 }}
          ></Grid>
          {ItemList &&
            ItemList.length > 0 &&
            ItemList.map((item, i) => {
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
                    legendColors={legendColors}
                  />
                </Grid>
              );
            })}
        </Grid>
        <Grid container sx={{ mt: 2 }}>
          <Grid item sx={{}} gap={6} display="flex" xs={12} lg={12}>
            <DotLegendTeacher color={legendColors.holiday} text="Holiday" />
            <DotLegendTeacher color={legendColors.exam} text="Exam" />
            <DotLegendTeacher color={legendColors.events} text="Events" />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
export default AnnualPlannerCalendar;
