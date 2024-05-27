import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditTwoTone from '@mui/icons-material/EditTwoTone';
import { Box } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { isFutureDate, isFutureDateTime, isPastDateTime } from 'src/components/Common/Util';



function HolidaysList({
  ItemList,
  clickEdit,
  HeaderArray,
  clickDelete,
}) {

  function findRecentUpcomingDate() {
    const upcomingDates = ItemList.filter(item => isFutureDate(new Date(item.Text1)));
    upcomingDates.sort((a, b) => new Date(a.Text1).getTime() - new Date(b.Text1).getTime());
    if (upcomingDates.length === 0) {
      return null;
    }
    return upcomingDates[upcomingDates.length - 1].Text1;
  }

  let recentUpcomingDate = findRecentUpcomingDate();


  return (
    <div>
      <TableContainer component={Box}>
        <Table aria-label="simple table" sx={{ border: (theme) => `1px solid ${theme.palette.divider}` }}>
          <TableHead>
            <TableRow
              sx={{ background: (theme) => theme.palette.secondary.main, }}
            >
              {HeaderArray.map((item, i) => (
                <TableCell
                  key={i}
                  sx={{ textTransform: 'capitalize', color: (theme) => theme.palette.common.white }}
                  align="center"
                >
                  <b>{item.Header}</b>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {ItemList.map((item, index) => {
              const isFuture = isFutureDate(new Date(item.Text1));
              const isEqual = item.Text1 == item.Text2;
              const isNextUpcoming = recentUpcomingDate == item.Text1;
              // const backgroundColor = isFuture ? "#ffcdd2" : 'inherit' ||
              //   isEqual ? '#f3e5f5' : 'inherit' || 
              const backgroundColor = (isFutureDateTime(item.Text1) && index == 0) ? '#EFDCC9 ! important' :
                isPastDateTime(item.Text1) ? "white" : 'white';

              const rowStyle = isPastDateTime(new Date(item.Text1)) ? {
                backgroundColor: 'lightgrey',
                opacity: 0.5,
                pointerEvents: 'none'
              } : { backgroundColor };


              return (
                <TableRow key={item.Id} sx={rowStyle}>
                  <TableCell
                    sx={{
                      textTransform: 'capitalize',
                      backgroundColor
                    }}
                    align="center"
                  >
                    {item.Text1}
                  </TableCell>
                  <TableCell
                    sx={{
                      textTransform: 'capitalize',
                      backgroundColor
                    }}
                    align="center"
                  >
                    {item.Text2}
                  </TableCell>
                  <TableCell
                    sx={{
                      textTransform: 'capitalize',
                      backgroundColor
                    }}
                    align="center"
                  >
                    {item.Text3}
                  </TableCell>
                  <TableCell
                    sx={{
                      textTransform: 'capitalize',
                      backgroundColor
                    }}
                    align="center"
                  >
                    {item.Text4}
                  </TableCell>
                  <TableCell
                    sx={{
                      textTransform: 'capitalize',
                      backgroundColor
                    }}
                    align="center"
                  >
                    {item.Text5}
                  </TableCell>
                  <TableCell
                    sx={{
                      textTransform: 'capitalize',
                      backgroundColor
                    }}
                    align="center"
                  >
                    {item.Text6}
                    <EditTwoTone
                      sx={{ color: 'black', cursor: 'pointer' }}
                      onClick={() => clickEdit(item.Id)}
                    />
                  </TableCell>
                  <TableCell
                    sx={{
                      textTransform: 'capitalize',
                      backgroundColor
                    }}
                    align="center"
                  >
                    {item.Text7}
                    <DeleteForeverIcon
                      sx={{ color: 'red', cursor: 'pointer' }}
                      onClick={() => clickDelete(item.Id)}
                    />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default HolidaysList;
