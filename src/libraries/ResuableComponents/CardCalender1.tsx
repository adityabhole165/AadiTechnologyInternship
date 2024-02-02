import {
  Box,
  Button,
  Grid,
  IconButton,
  Typography,
  alpha
} from '@mui/material';

import ChevronLeftTwoToneIcon from '@mui/icons-material/ChevronLeftTwoTone';
import ChevronRightTwoToneIcon from '@mui/icons-material/ChevronRightTwoTone';
import { getDateFormattedDash } from 'src/components/Common/Util';
import CardCal1 from './CardCal1';
function CardCalender1({
  ItemList,
  ClickItem,
  formattedDate,
  DefaultValue,
  assignedDate,
  ArrayList = [],
  getAssignedDateStatus,
  ClickDeleteAttendance,
  clickNav,
  Standardid
}) {
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

  const clickPrevNextMonth = (value) => {
    let newDate;
    if (formattedDate.split(' ').length == 2)
      newDate = new Date('1 ' + formattedDate);
    else;
    newDate = new Date(formattedDate);
    newDate.setMonth(newDate.getMonth() + value);
    ClickItem(getDateFormattedDash(newDate));
  };

  return (
    <Box p={2}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          gap: 1
        }}
      >
        {getAssignedDateStatus() == 'Done' && (
          <>
            <Box>
              <Button
                variant={'contained'}
                color="error"
                onClick={() => ClickDeleteAttendance()}
                fullWidth
              >
                Delete
              </Button>
            </Box>
            <Box>
              <Button
                variant={'contained'}
                color="secondary"
                onClick={() =>
                  clickNav('Tview/' + assignedDate + '/' + Standardid)
                }
              >
                Attendance
              </Button>
            </Box>
            <Box>
              <Button
                variant={'contained'}
                color="secondary"
                onClick={() =>
                  clickNav(
                    'MissingAttandence/' + assignedDate + '/' + Standardid
                  )
                }
              >
                Missing
              </Button>
            </Box>
          </>
        )}
      </Box>
      <Box
        sx={{
          mt: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        <IconButton
          onClick={() => clickPrevNextMonth(-1)}
          sx={{
            color: (theme) => theme.palette.primary.main,
            backgroundColor: (theme) => alpha(theme.palette.primary.main, 0.2)
          }}
        >
          <ChevronLeftTwoToneIcon />
        </IconButton>
        <Typography sx={{ fontWeight: 'bold' }} variant={'h4'}>
          {formattedDate}
        </Typography>

        <IconButton
          onClick={() => clickPrevNextMonth(1)}
          sx={{
            color: (theme) => theme.palette.primary.main,
            backgroundColor: (theme) => alpha(theme.palette.primary.main, 0.2)
          }}
        >
          <ChevronRightTwoToneIcon />
        </IconButton>
      </Box>
      <br></br>
      <Grid container>
        {ArrayList.map((item, i) => (
          <>
            <Grid
              item
              xs={1.71}
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Typography key={i} sx={{ textTransform: 'capitalize' }}>
                {' '}
                <b>{item.Header}</b>
              </Typography>
            </Grid>
          </>
        ))}
      </Grid>

      <br></br>
      <Grid container>
        {ItemList.map((item, i) => {
          return (
            <Grid item xs={2} sx={{ textAlign: 'center' }} key={i}>
              <CardCal1
                item={item}
                clickItem={() => ClickItem(item.Value)}
                DefaultValue={DefaultValue}
                assignedDate={assignedDate}
              />
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
}
export default CardCalender1;
