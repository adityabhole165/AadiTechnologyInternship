import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Box, Grid, IconButton, Stack, Typography, alpha, useMediaQuery, useTheme } from '@mui/material';
import DotLegendAttandaceCalender from '../summary/DotLegendAttandaceCalender';
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
  const legendColors = {
    p: '#008000',
    a: '#9e9e9e',
    h: '#751b1b',
    w: '#ff0000',
    o: '#f06292',
    l: '#303f9f',
    n: '#FCCF31'
  };
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm')); 
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
    <Box sx={{ backgroundColor: 'white' }} pl={2.5} pr={1} py={2}>
      <Box
        sx={{
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          '& > .MuiIconButton-root': {
            margin: '0 2px' // Set margin to the IconButton components
          }
        }}
      >
        <Box
          display="flex"
          alignItems="center"
          
        >
          <IconButton
            color="primary"
            sx={{
              backgroundColor: (theme) =>
                alpha(theme.palette.primary.main, 0.2),
              marginRight: '8px'
            }}
            onClick={handlePrevMonth}
          >
            <ArrowBackIosNewIcon fontSize={isMobile ? 'small' : 'medium'} />
          </IconButton>

          <Typography
            m={0}
            variant="h3"
            sx={{
              fontSize: isMobile ? '1.2rem' : '2rem', // Smaller font size for mobile
              fontWeight: 'bold',
              textAlign: 'center'
            }}
          >
            {formattedDate}
          </Typography>

          <IconButton
            color="primary"
            sx={{
              backgroundColor: (theme) =>
                alpha(theme.palette.primary.main, 0.2),
              marginLeft: '8px'
            }}
            onClick={handleNextMonth}
          >
            <ArrowForwardIosIcon fontSize={isMobile ? 'small' : 'medium'} />
          </IconButton>

          <Stack
            direction="row"
            gap={1}
            sx={{
              display: isMobile ? 'none' : 'flex' // Hide Stack on mobile
            }}
          ></Stack>
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
            border="1px solid #ebebeb"
            md={1.7 * dayCount}
            sx={{ textAlign: 'center', pt: 0 }}
          ></Grid>
          {ItemList &&
            ItemList.length > 0 &&
            ItemList.map((item, i) => {
              return (
                <Grid
                  item
                  border="1px solid lightgrey"
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
          {/* Adjust gap and wrap content for mobile responsiveness */}
          <Grid
            item
            xs={12}
            sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }} // Wrap content and set spacing
          >
            <DotLegendAttandaceCalender color="primary" text="Present" />
            <DotLegendAttandaceCalender color="info" text="Absent" />
            <DotLegendAttandaceCalender color="Holiday" text="Holiday" />
            <DotLegendAttandaceCalender color="Warning" text="Weekend" />
            <DotLegendAttandaceCalender
              color="Suceess"
              text="Outside Academic Year"
            />
            <DotLegendAttandaceCalender color="LateJoin" text="Late Join" />
            <DotLegendAttandaceCalender
              color="NotAvailable"
              text="Attendance Unavailable"
            />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
export default CardCalenderList;
