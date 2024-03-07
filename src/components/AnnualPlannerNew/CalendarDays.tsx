import { Box, Grid, Typography, alpha } from '@mui/material';
import { grey } from '@mui/material/colors';

const CalendarDays = ({ ItemList, ClickItem, DefaultValue }) => {
  let dayCount = new Date(
    new Date(DefaultValue).getFullYear(),
    new Date(DefaultValue).getMonth(),
    1
  ).getDay();
  function hexToRGBA(hex: string, opacity: number) {
    let r = parseInt(hex.slice(1, 3), 16),
      g = parseInt(hex.slice(3, 5), 16),
      b = parseInt(hex.slice(5, 7), 16);

    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
  }
  const legendColors1 = {
    p: '#008000',
    a: '#9e9e9e',
    h: '#751b1b',
    w: '#ff0000',
    o: '#f06292',
    l: '#303f9f',
    n: '#FCCF31'
  };
  const legendColors = [
    '#ffffff',
    '#ff0000',
    '#751b1b',
    '#008000',
    '#FCCF31',
    '#9e9e9e',
    '#ffffff',
    '#ffffff',
    '#ffffff'
  ];
  const bg = [
    hexToRGBA(legendColors[0], 0.2),
    hexToRGBA(legendColors[1], 0.2),
    hexToRGBA(legendColors[2], 0.2),
    hexToRGBA(legendColors[3], 0.2),
    hexToRGBA(legendColors[4], 0.1),
    hexToRGBA(legendColors[5], 0.2),
    hexToRGBA(legendColors[6], 0.2),
    hexToRGBA(legendColors[7], 0.2)
  ];
  const data = {
    p: 'Present',
    a: 'Absent',
    h: 'Holiday',
    w: 'Weekwend',
    o: 'OutSide',
    l: 'Late',
    n: 'Not Available'
  };
  const cardStyle = {
    heihgt: '15vh',

    fontSize: '15px'
  };

  return (
    <Grid container>
      <Grid
        item
        xs={(12 / 7) * dayCount}
        md={(12 / 7) * dayCount}
        // border="0.5px solid #ebebeb"
        sx={{ textAlign: 'center', pt: 0 }}
      ></Grid>
      {ItemList.map((Item, i) => {
        return (
          <Grid
            item
            xs={12 / 7}
            md={12 / 7}
            key={i}
            sx={{ textAlign: 'center', pt: 0 }}
            border="0.5px solid #ebebeb"
          >
            <Box
              sx={{
                height: '90px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
                cursor: 'pointer',
                backgroundColor: (theme) => bg[Item.Legend],
                // Item.Value === DefaultValue
                //   ? (theme) => alpha(theme.palette.primary.main, 0.2)
                //   // : 'white',
                //   : bg[Item.Legend],
                color: legendColors[Item.Legend],
                ...cardStyle,
                fontWeight: '500',
                // height: '10vh',
                border: (theme) => `1px solid ${grey[300]}`
              }}
              onClick={() => ClickItem(Item.Value)}
            >
              <Typography>{Item.Name}</Typography>

              {Item.Text1.slice(0, 1).map((obj, i) => {
                return (<b style={{ background: alpha(bg[Item.Legend], 0.1), width: '100%' }} key={i}>{obj}</b>)
              })}
              {Item.Text1.length > 1 && (
                <Box>
                  +{Item.Text1.length - 1}
                </Box>
              )}
            </Box>
          </Grid>
        );
      })}
    </Grid>
  );
};

export default CalendarDays;
