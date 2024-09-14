import { Box, Grid, IconButton, styled, Tooltip, tooltipClasses, TooltipProps, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { BorderAllRounded } from '@mui/icons-material';

const CalendarDays = ({ ItemList, ClickItem, DefaultValue, legendColors, AnnualPlannerViewAccess }) => {
  const date = new Date(DefaultValue);
  const year = date.getFullYear();
  const month = date.getMonth();
  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cardStyle = {
    height: '10px',
    fontSize: '15px'
  };
  function hexToRGBA(hex, opacity) {
    let r = parseInt(hex.slice(1, 3), 16),
      g = parseInt(hex.slice(3, 5), 16),
      b = parseInt(hex.slice(5, 7), 16);

    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
  }

  const LightTooltip = styled(({ className, ...props }: TooltipProps) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: '#f2f2f2',
      boxShadow: theme.shadows[1],
      fontSize: 11,
    },
  }));

  const bg = legendColors.map(color => hexToRGBA(color, 0.2));

  // const cardStyle = {
  //   height: '20px',
  //   fontSize: '15px'
  // };

  const renderGridItems = () => {
    const gridItems = [];

    // Render empty grid items for the initial offset
    for (let i = 0; i < firstDayOfMonth; i++) {
      gridItems.push(<Grid item xs={12 / 7} md={12 / 7} key={`empty-${i}`} />);
    }

    // Render the actual days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const currentDay = new Date(year, month, day);
      const Item = ItemList.find(item => {
        const itemDate = new Date(item.Value); // Assuming item.Value is a date string
        return itemDate.getFullYear() === year && itemDate.getMonth() === month && itemDate.getDate() === day;
      });

      const isOutsideAcademicYear = Item && Item?.Text1.some(obj => obj.Name.includes('Outside Academic Year'));
      const backgroundColor = isOutsideAcademicYear ? 'rgba(200, 0, 200, 0.1)' : (Item ? bg[Item.Legend] : 'transparent');
      //const cursorStyle = isOutsideAcademicYear ? 'default' : 'pointer';
      const cursorStyle = (AnnualPlannerViewAccess === 'N' || isOutsideAcademicYear) ? 'default' : 'pointer';
      gridItems.push(
        <Grid
          item
          xs={12 / 7}
          md={12 / 7}
          key={`${year}-${month}-${day}`} // Unique key based on the date
          sx={{ textAlign: 'center', pt: 0 }}
          border="0.5px solid #ebebeb"
        >
          {Item?.Text1.length > 0 ?
            <LightTooltip arrow sx={{borderRadius:'7px'}}  title={Item?.Text1.map((obj, idx) => {
              return (
                <>
                <Box >
                  <Typography variant='h5' color={'#38548A'}><b>{obj.Name}</b></Typography>
                  </Box>
                </>
              )
            })}>
              <Box
                sx={{
                  minHeight: '80px',
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexDirection: 'column',
                  cursor: cursorStyle,
                  backgroundColor: backgroundColor,
                  ...cardStyle,
                  overflow: 'hidden',
                  fontWeight: '500',
                  border: `1px solid ${grey[300]}`
                }}
                onClick={() => Item && ClickItem(Item.Value)}
              >
                <Typography>{day}</Typography>
                {Item && Item.Text1 && (
                  <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', gap: 1 }}>
                    {Item.Text1.map((obj, idx) => {
                      return (
                        <>
                          {idx <= 1 &&
                            <b style={{ width: '100%', paddingLeft: 2, paddingRight: 2 }}>
                              <Box
                                sx={{
                                  color: legendColors[obj.Legend],
                                  overflow: 'hidden',
                                  textOverflow: 'ellipsis',
                                  whiteSpace: 'nowrap'
                                }}
                              >
                                {idx <= 1 ? obj.Name : ''}
                              </Box>
                            </b>}
                        </>
                      )
                    })}
                  </Box>
                )}
              </Box></LightTooltip> :
            <Box
              sx={{
                minHeight: '80px',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
                cursor: cursorStyle,
                backgroundColor: backgroundColor,
                ...cardStyle,
                overflow: 'hidden',
                fontWeight: '500',
                border: `1px solid ${grey[300]}`
              }}
              onClick={() => Item && ClickItem(Item.Value)}
            >
              <Typography>{day}</Typography>
              {Item && Item.Text1 && (
                <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', gap: 1 }}>
                  {Item.Text1.map((obj, idx) => (

                    <b style={{ width: '100%', paddingLeft: 2, paddingRight: 2 }}>
                      <Box
                        sx={{
                          color: legendColors[obj.Legend],
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap'
                        }}>
                        {obj.Name}   
                      </Box>  
                    </b>
     
                  ))}
                </Box>
              )}
            </Box>
          }

        </Grid>
      );
    }

    return gridItems;
  };

  return <Grid container>{renderGridItems()}</Grid>;
};

export default CalendarDays;