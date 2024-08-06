// import { Box, Grid, Tooltip, Typography } from '@mui/material';
// import { grey } from '@mui/material/colors';

// const CalendarDays = ({ ItemList, ClickItem, DefaultValue, legendColors }) => {
//   let dayCount = new Date(
//     new Date(DefaultValue).getFullYear(),
//     new Date(DefaultValue).getMonth(),
//     1
//   ).getDay();
//   function hexToRGBA(hex: string, opacity: number) {
//     let r = parseInt(hex.slice(1, 3), 16),
//       g = parseInt(hex.slice(3, 5), 16),
//       b = parseInt(hex.slice(5, 7), 16);

//     return `rgba(${r}, ${g}, ${b}, ${opacity})`;
//   }
//   const bg = [
//     hexToRGBA(legendColors[0], 0.2),
//     hexToRGBA(legendColors[1], 0.2),
//     hexToRGBA(legendColors[2], 0.2),
//     hexToRGBA(legendColors[3], 0.2),
//     hexToRGBA(legendColors[4], 0.2),
//     hexToRGBA(legendColors[5], 0.2),
//     hexToRGBA(legendColors[6], 0.2),
//     hexToRGBA(legendColors[7], 0.2)
//   ];
//   const data = {
//     p: 'Present',
//     a: 'Absent',
//     h: 'Holiday',
//     w: 'Weekend',
//     o: 'Outside Academic Year',
//     l: 'Late',
//     n: 'Not Available'
//   };
//   const cardStyle = {
//     heihgt: '15vh',

//     fontSize: '15px'
//   };

//   return (
//     <Grid container>
//       <Grid
//         item
//         xs={(12 / 7) * dayCount}
//         md={(12 / 7) * dayCount}
//         // border="0.5px solid #ebebeb"
//         sx={{ textAlign: 'center', pt: 0 }}
//       ></Grid>
//       {ItemList.map((Item, i) => {
//         return (
//           <Grid
//             item
//             xs={12 / 7}
//             md={12 / 7}
//             key={i}
//             sx={{ textAlign: 'center', pt: 0 }}
//             border="0.5px solid #ebebeb"
//           >
//             <Box
//               sx={{
//                 minHeight: '90px',
//                 height: '100%',
//                 display: 'flex',
//                 alignItems: 'center',
//                 justifyContent: 'center',
//                 flexDirection: 'column',
//                 cursor: 'pointer',
//                 backgroundColor: (theme) => bg[Item.Legend],
//                 overflow: 'hidden',
//                 ...cardStyle,
//                 fontWeight: '500',
//                 // height: '10vh',
//                 border: (theme) => `1px solid ${grey[300]}`
//               }}
//               onClick={() => ClickItem(Item.Value)}
//             >
//               <Typography>{Item.Name}</Typography>

//               <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', gap: 1 }}>
//                 {Item.Text1.map((obj, i) => {
//                   return (<b style={{ width: '100%', paddingLeft: 2, paddingRight: 2 }} key={i}>
//                     <Tooltip title={obj.Name}>
//                       <Box
//                         sx={{
//                           color: legendColors[obj.Legend], overflow: 'hidden',
//                           textOverflow: 'ellipsis',
//                           whiteSpace: 'nowrap'
//                         }}
//                       >{obj.Name}</Box>
//                     </Tooltip>
//                   </b>)
//                 })}
//               </Box>
//             </Box>
//           </Grid>
//         );
//       })}
//     </Grid >
//   );
// };

// export default CalendarDays;

// import { Box, Grid, Tooltip, Typography } from '@mui/material';
// import { grey } from '@mui/material/colors';

// const CalendarDays = ({ ItemList, ClickItem, DefaultValue, legendColors }) => {
//   const date = new Date(DefaultValue);
//   const year = date.getFullYear();
//   const month = date.getMonth();
//   const firstDayOfMonth = new Date(year, month, 1).getDay();
//   const daysInMonth = new Date(year, month + 1, 0).getDate();

//   function hexToRGBA(hex, opacity) {
//     let r = parseInt(hex.slice(1, 3), 16),
//       g = parseInt(hex.slice(3, 5), 16),
//       b = parseInt(hex.slice(5, 7), 16);

//     return `rgba(${r}, ${g}, ${b}, ${opacity})`;
//   }

//   const bg = legendColors.map(color => hexToRGBA(color, 0.2));
//   const weekendBackgroundColor = hexToRGBA('#FF0000', 0.2);  // Red color for weekends
//   const weekendLabelStyle = {
//     fontWeight: 'bold',
//     color: '#ff0000',  // Red color (e.g., LightCoral)
//     // Adjust opacity for a faint appearance
//   };

//   const cardStyle = {
//     height: '15vh',
//     fontSize: '15px'
//   };

//   const data = {
//     p: 'Present',
//     a: 'Absent',
//     h: 'Holiday',
//     w: 'Weekend',
//     o: 'Outside Academic Year',
//     l: 'Late',
//     n: 'Not Available'
//   };

//   const renderGridItems = () => {
//     const gridItems = [];

//     // Render empty grid items for the initial offset
//     for (let i = 0; i < firstDayOfMonth; i++) {
//       gridItems.push(<Grid item xs={12 / 7} md={12 / 7} key={`empty-${i}`} />);
//     }

//     // Render the actual days of the month
//     for (let day = 1; day <= daysInMonth; day++) {
//       const currentDay = new Date(year, month, day);
//       const dayOfWeek = currentDay.getDay();
//       const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;

//       const Item = ItemList.find(item => {
//         const itemDate = new Date(item.Value); // Assuming item.Value is a date string
//         return itemDate.getFullYear() === year && itemDate.getMonth() === month && itemDate.getDate() === day;
//       });

//       const backgroundColor = isWeekend ? weekendBackgroundColor : (Item ? bg[Item.Legend] : 'transparent');
//       const label = isWeekend ? data.w : (Item ? data[Item.Legend] : '');

//       gridItems.push(
//         <Grid
//           item
//           xs={12 / 7}
//           md={12 / 7}
//           key={`${year}-${month}-${day}`} // Unique key based on the date
//           sx={{ textAlign: 'center', pt: 0 }}
//           border="0.5px solid #ebebeb"
//         >
//           <Box
//             sx={{
//               minHeight: '90px',
//               height: '100%',
//               display: 'flex',
//               alignItems: 'center',
//               justifyContent: 'center',
//               flexDirection: 'column',
//               cursor: 'pointer',
//               backgroundColor: backgroundColor,
//               overflow: 'hidden',
//               ...cardStyle,
//               fontWeight: '500',
//               border: `1px solid ${grey[300]}`
//             }}
//             onClick={() => Item && ClickItem(Item.Value)}
//           >
//             <Typography>{day}</Typography>
//             <Typography sx={isWeekend ? weekendLabelStyle : {}}>{label}</Typography>
//             {Item && Item.Text1 && !isWeekend && (
//               <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', gap: 1 }}>
//                 {Item.Text1.map((obj, idx) => (
//                   <Tooltip key={`${year}-${month}-${day}-${idx}`} title={obj.Name}>
//                     <b style={{ width: '100%', paddingLeft: 2, paddingRight: 2 }}>
//                       <Box
//                         sx={{
//                           color: legendColors[obj.Legend],
//                           overflow: 'hidden',
//                           textOverflow: 'ellipsis',
//                           whiteSpace: 'nowrap',
//                           visibility: obj.Name === data.w ? 'hidden' : 'visible' // Hide "Weekend" label
//                         }}
//                       >
//                         {obj.Name}
//                       </Box>
//                     </b>
//                   </Tooltip>
//                 ))}
//               </Box>
//             )}
//           </Box>
//         </Grid>
//       );
//     }

//     return gridItems;
//   };

//   return <Grid container>{renderGridItems()}</Grid>;
// };

// export default CalendarDays;


import { Box, Grid, Tooltip, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';

const CalendarDays = ({ ItemList, ClickItem, DefaultValue, legendColors,AnnualPlannerViewAccess }) => {
  const date = new Date(DefaultValue);
  const year = date.getFullYear();
  const month = date.getMonth();
  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  function hexToRGBA(hex, opacity) {
    let r = parseInt(hex.slice(1, 3), 16),
      g = parseInt(hex.slice(3, 5), 16),
      b = parseInt(hex.slice(5, 7), 16);

    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
  }

  const bg = legendColors.map(color => hexToRGBA(color, 0.2));

  const cardStyle = {
    height: '10px',
    fontSize: '15px'
  };

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

      const isOutsideAcademicYear = Item && Item.Text1.some(obj => obj.Name.includes('Outside Academic Year'));
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
              fontWeight: '500',
              border: `1px solid ${grey[300]}`
            }}
            onClick={() => Item && ClickItem(Item.Value)}
          >
            <Typography>{day}</Typography>
            {Item && Item.Text1 && (
              <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', gap: 1 }}>
                {Item.Text1.map((obj, idx) => (
                  <Tooltip key={`${year}-${month}-${day}-${idx}`} title={obj.Name}>
                    <b style={{ width: '100%', paddingLeft: 2, paddingRight: 2 }}>
                      <Box
                        sx={{
                          color: legendColors[obj.Legend],
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap'
                        }}
                      >
                        {obj.Name}
                      </Box>
                    </b>
                  </Tooltip>
                ))}
              </Box>
            )}
          </Box>
        </Grid>
      );
    }

    return gridItems;
  };

  return <Grid container>{renderGridItems()}</Grid>;
};

export default CalendarDays;
