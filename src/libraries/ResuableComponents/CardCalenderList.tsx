import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Box, Grid, IconButton, Stack, Typography, alpha } from '@mui/material';
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
  const legendColors = {
    p: '#008000',
    a: '#b73839',
    h: '#792ba7',
    w: '#bdbdbd',
    o: '#aa3daa',
    l: '#303f9f',
    n: 'linear-gradient(135deg, #FCCF31 0%, #F55555 100%)'
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
  let dayCount = (new Date("01" + formattedDate).getDay())
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
          >
          </Grid>
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
                  legendColors={legendColors}
                />
              </Grid>
            );
          })}
        </Grid>
        <Grid container sx={{ mt: 2 }}>
          <Grid item sx={{}} gap={6} display="flex" xs={12} lg={12}>
            <DotLegendTeacher color={legendColors.p} text="Present" />
            <DotLegendTeacher color={legendColors.a} text="Absent" />
            <DotLegendTeacher color={legendColors.h} text="Holiday" />
            <DotLegendTeacher color={legendColors.w} text="Weekend" />

            <DotLegendTeacher
              color={legendColors.o}
              text="Outside Acadamic Year "
            />
            <DotLegendTeacher color={legendColors.l} text="Late Join " />
            <DotLegendTeacher color={legendColors.n} text="Not Available " />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
export default CardCalenderList;
