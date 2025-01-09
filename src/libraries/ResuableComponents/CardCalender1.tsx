import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import {
  Box,
  Grid,
  IconButton,
  Tooltip,
  Typography,
  alpha,
  useMediaQuery
} from '@mui/material';

import CalendarMonth from '@mui/icons-material/CalendarMonth';
import ChevronLeftTwoToneIcon from '@mui/icons-material/ChevronLeftTwoTone';
import ChevronRightTwoToneIcon from '@mui/icons-material/ChevronRightTwoTone';
import { red, teal } from '@mui/material/colors';
import React, { useRef } from 'react';
import {
  getCalendarDateFormatDateNew,
  getDateFormatted,
  stripHtml
} from 'src/components/Common/Util';
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
  Standardid
  // AttendanceStatus,
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

  const updatedItemList = ItemList.map((item) => {
    const itemDate = new Date(item.Value);

    const formattedDateObj = new Date(formattedDate);
    const formattedMonth = formattedDateObj.getMonth();
    const formattedYear = formattedDateObj.getFullYear();

    const isCurrentMonth =
      itemDate.getMonth() === formattedMonth &&
      itemDate.getFullYear() === formattedYear;

    return {
      ...item,
      isCurrentMonth
    };
  });

  const clickPrevNextMonth = (value) => {
    let newDate;

    if (formattedDate.split(' ').length === 2) {
      newDate = new Date('1 ' + formattedDate);
    } else {
      newDate = new Date(formattedDate);
    }
    const newMonth = newDate.getMonth() + value;
    if (value < 0) {
      newDate = new Date(newDate.getFullYear(), newMonth, 1);
    } else {
      newDate.setDate(1);
      newDate.setMonth(newMonth);
    }
    const today = new Date();
    if (
      newDate.getMonth() === today.getMonth() &&
      newDate.getFullYear() === today.getFullYear()
    ) {
      newDate = today;
    }
    ClickItem(getDateFormatted(newDate));
  };

  let dayCount = new Date(
    new Date(formattedDate).getFullYear(),
    new Date(formattedDate).getMonth(),
    1
  ).getDay();
  const datePicker = useRef(null);

  const isMobile = useMediaQuery('sm'); // Detect mobile view
 

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
          <Typography
            sx={{
              fontWeight: 'normal !important',
              display: 'flex',
              alignItems: 'center',
              gap: 1
            }}
            variant={'h3'}
          >
            <div style={{ whiteSpace: 'nowrap' }}>
              <IconButton
                onClick={() => clickPrevNextMonth(-1)}
                sx={{
                  color: (theme) => theme.palette.primary.main,
                  backgroundColor: (theme) =>
                    alpha(theme.palette.primary.main, 0.2),
                  marginRight: '8px'
                }}
              >
                <ChevronLeftTwoToneIcon />
              </IconButton>
              {formattedDate}{' '}
              <IconButton
                onClick={() => clickPrevNextMonth(1)}
                sx={{
                  color: (theme) => theme.palette.primary.main,
                  backgroundColor: (theme) =>
                    alpha(theme.palette.primary.main, 0.2),
                  marginLeft: '8px'
                }}
              >
                <ChevronRightTwoToneIcon />
              </IconButton>
            </div>
            <div
              style={{
                fontWeight: 'bold',
                fontSize: '16px',
                color: teal[500]
              }}
            >
              {/* {AttendanceStatus} */}
            </div>
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
                // sx={{
                //   Color:'#223354',
                //   backgroundColor: (theme) =>
                //     alpha(theme.palette.error.main, 0.2)
                // }}
                sx={{
                  color: '#223354',
                  //  backgroundColor: grey[500],
                  '&:hover': {
                    color: 'red',
                    backgroundColor: red[100]
                  }
                }}
                // color="error"
                onClick={() => ClickDeleteAttendance()}
              >
                <DeleteForeverIcon />
              </IconButton>
            </Tooltip>
          )}
          {/* <IconButton
            onClick={() => clickPrevNextMonth(-1)}
            sx={{
              color: (theme) => theme.palette.primary.main,
              backgroundColor: (theme) => alpha(theme.palette.primary.main, 0.2)
            }}
          >
            <ChevronLeftTwoToneIcon />
          </IconButton> */}
          <IconButton
            color={'primary'}
            onClick={() => {
              datePicker.current.showPicker();
            }}
          >
            <CalendarMonth />
            <input
              ref={datePicker}
              style={{
                position: 'absolute',
                visibility: 'hidden'
              }}
              type="date"
              value={getCalendarDateFormatDateNew(formattedDate)}
              onChange={(e) => {
                ClickItem(getDateFormatted(e.target.value));
              }}
            />
          </IconButton>
          {/* <IconButton
            onClick={() => clickPrevNextMonth(1)}
            sx={{
              color: (theme) => theme.palette.primary.main,
              backgroundColor: (theme) => alpha(theme.palette.primary.main, 0.2)
            }}
          >
            <ChevronRightTwoToneIcon />
          </IconButton> */}
        </Box>
      </Box>
      <Grid container sx={{ mt: 2 }}>
        {ArrayList.map((item, i) => (
          <React.Fragment key={i}>
            <Grid
              item
              xs={12 / 7}
              md={12 / 7}
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                py: 1,
                border: (theme) => `1px solid ${theme.palette.divider}`
              }}
            >
              <Typography key={i} sx={{ textTransform: 'capitalize' }}>
                {' '}
                <b>{item.Header}</b>
              </Typography>
            </Grid>
          </React.Fragment>
        ))}
      </Grid>
      <Grid container>
        <Grid
          item
          // border="solid #ebebeb"
          md={(12 / 7) * dayCount}
          xs={(12 / 7) * dayCount}
          sx={{ textAlign: 'center', pt: 0 }}
        ></Grid>
        {/* {ItemList.map((item, i) => {
          return (
            <Grid item xs={12 / 7} md={12 / 7} sx={{ textAlign: 'center', border: (theme) => `1px solid ${theme.palette.divider}` }} key={i}>
              <CardCal1
                item={item}
                clickItem={() => ClickItem(item.Value)}
                DefaultValue={DefaultValue}
                assignedDate={formattedDate} color={undefined}              />
            </Grid>
          );
        })} */}

        {updatedItemList.map((item, i) => {
          if (item.isCurrentMonth) {
            let color;
            switch (stripHtml(item.Text1)) {
              case 'Done':
                color = '#00FF0020';
                break;
              case 'Not Done':
                color = '#9e9e9e20';
                break;
              case 'Weekend':
                color = '#FF000020';
                break;
              case 'Holiday':
                color = '#751b1b20';
                break;
              case 'Outside Academic Year':
                color = '#f0629220';
                break;
              default:
                color = '#f0629220';
            }

            return (
              <Grid
                item
                xs={12 / 7}
                md={12 / 7}
                key={i}
                sx={{
                  textAlign: 'center',
                  border: (theme) => `1px solid ${theme.palette.divider}`,
                  '&:hover': {
                    backgroundColor: 'rgba(128, 128, 128, 0.2)'
                  }
                }}
              >
                <CardCal1
                  item={item}
                  clickItem={() => ClickItem(item.Value)}
                  DefaultValue={DefaultValue}
                  assignedDate={formattedDate}
                  color={color} // Pass the color based on Text1 status
                />
              </Grid>
            );
          } else {
            return (
              <Grid item xs={12 / 7} md={12 / 7} sx={{ textAlign: 'center' }}>
                <CardCal1
                  item={{}}
                  clickItem={() => ClickItem()}
                  DefaultValue={''}
                  assignedDate={''}
                  color={undefined}
                />
              </Grid>
            );
          }
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
          text="Outside Academic Year"
        />
      </Grid>
    </Box>
  );
}
export default CardCalender1;
