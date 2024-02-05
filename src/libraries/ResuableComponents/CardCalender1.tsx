import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import {
  Box,
  Grid,
  IconButton,
  Tooltip,
  Typography,
  alpha
} from '@mui/material';

import ChevronLeftTwoToneIcon from '@mui/icons-material/ChevronLeftTwoTone';
import ChevronRightTwoToneIcon from '@mui/icons-material/ChevronRightTwoTone';
import { red } from '@mui/material/colors';
import { getDateFormatted } from 'src/components/Common/Util';
import DotLegendAttandaceCalender from '../summary/DotLegendAttandaceCalender';
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
  Standardid,
  AttendanceStatus
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
    if (newDate.getMonth() == (new Date()).getMonth() && newDate.getFullYear() == (new Date()).getFullYear())
      newDate = new Date()
    else
      newDate = new Date(newDate.getFullYear(), newDate.getMonth(), 1);
    ClickItem(getDateFormatted(newDate));
  };
  let dayCount = new Date(new Date(formattedDate).getFullYear(), new Date(formattedDate).getMonth(), 1).getDay()
  return (
    <Box p={2}>
      {/* <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          gap: 1
        }}
      >
        <>
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
      </Box> */}
      <Box
        sx={{
          mt: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        <Box>
          <Typography sx={{ fontWeight: 'normal !important' }} variant={'h3'}>
            {formattedDate} |{' '}
            <span
              style={{
                fontWeight: 'normal',
                fontSize: '14px',
                color: red[500]
              }}
            >
              {AttendanceStatus}
            </span>
          </Typography>
        </Box>

        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1
          }}
        >
          {getAssignedDateStatus() == 'Done' && (
            <Tooltip title="Delete">
              <IconButton
                sx={{
                  backgroundColor: (theme) =>
                    alpha(theme.palette.error.main, 0.2)
                }}
                color="error"
                onClick={() => ClickDeleteAttendance()}
              >
                <DeleteTwoToneIcon />
              </IconButton>
            </Tooltip>
          )}
          <IconButton
            onClick={() => clickPrevNextMonth(-1)}
            sx={{
              color: (theme) => theme.palette.primary.main,
              backgroundColor: (theme) => alpha(theme.palette.primary.main, 0.2)
            }}
          >
            <ChevronLeftTwoToneIcon />
          </IconButton>
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
      </Box>
      <Grid container sx={{ mt: 2 }}>
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
        <Grid
          item
          border="0.5px solid #ebebeb"
          md={1.7 * dayCount}
          sx={{ textAlign: 'center', pt: 0 }}
        >
        </Grid>
        {ItemList.map((item, i) => {
          return (
            <Grid item xs={1.71} sx={{ textAlign: 'center' }} key={i}>
              <CardCal1
                item={item}
                clickItem={() => ClickItem(item.Value)}
                DefaultValue={DefaultValue}
                assignedDate={formattedDate}
              />
            </Grid>
          );
        })}
      </Grid>
      <Grid
        mt={2}
        item
        xs={12}
        sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
      >
        <DotLegendAttandaceCalender color="primary" text="Done " />
        <DotLegendAttandaceCalender color="info" text="Not Done" />
        <DotLegendAttandaceCalender color="Holiday" text="Holiday" />
        <DotLegendAttandaceCalender color="Warning" text="Weekend" />
        <DotLegendAttandaceCalender
          color="Suceess"
          text="OutSideAcadamicYear"
        />
      </Grid>
    </Box>
  );
}
export default CardCalender1;
