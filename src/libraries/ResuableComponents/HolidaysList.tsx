import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditTwoTone from '@mui/icons-material/EditTwoTone';
import { Box, IconButton, TablePagination, Tooltip, Typography } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useState } from 'react';
import { isFutureDateTime, isPastDateTime } from 'src/components/Common/Util';



function HolidaysList({
  ItemList,
  clickEdit,
  HeaderArray,
  clickDelete,
}) {

  console.log(ItemList, "ItemList----------");

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const paginatedItems = ItemList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);


  // function findRecentUpcomingDate() {
  //   const upcomingDates = ItemList.filter(item => isFutureDate(new Date(item.Text1)));
  //   upcomingDates.sort((a, b) => new Date(a.Text1).getTime() - new Date(b.Text1).getTime());
  //   if (upcomingDates.length === 0) {
  //     return null;
  //   }
  //   return upcomingDates[upcomingDates.length - 1].Text1;
  // }

  // let recentUpcomingDate = findRecentUpcomingDate();


  return (
    <div>

      <Typography variant="subtitle1"
        sx={{ margin: '16px 0', textAlign: 'center' }}>
        <Box component="span" fontWeight="fontWeightBold">{page * rowsPerPage + 1}</Box> to <Box component="span" fontWeight="fontWeightBold">{Math.min(page * rowsPerPage + rowsPerPage, ItemList.length)}</Box> Out of <Box component="span" fontWeight="fontWeightBold">{ItemList.length}</Box> records
      </Typography>

      <TableContainer component={Box}>
        <Table aria-label="simple table" sx={{ border: (theme) => `1px solid ${theme.palette.divider}` }}>
          <TableHead>
            <TableRow
              sx={{ background: (theme) => theme.palette.secondary.main, }}
            >
              {HeaderArray.map((item, i) => (
                <TableCell
                  key={i}
                  sx={{
                    textTransform: 'capitalize', color: (theme) => theme.palette.common.white,
                    textAlign: i === 2 || i === 3 ? 'left' : 'center'

                  }}
                  align="center"
                >
                  <b>{item.Header}</b>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>

            {paginatedItems.map((item, index) => {

              const backgroundColor = (isFutureDateTime(item.Text1) && index == 0) ? '#EFDCC9 ! important' :
                isPastDateTime(item.Text1) ? "white" : 'white';

              const rowStyle = isPastDateTime(new Date(item.Text1)) ? {
                backgroundColor: 'lightgrey',
                opacity: 0.5,
                pointerEvents: 'none'
              } : { backgroundColor };


              return (
                <><TableRow key={item.Id} sx={rowStyle}>
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
                      backgroundColor,
                      textAlign: 'left'
                    }}
                    align="left"
                  >
                    {item.Text3}
                  </TableCell>
                  <TableCell
                    sx={{
                      textTransform: 'capitalize',
                      backgroundColor,
                      textAlign: 'left'
                    }}
                    align="left"
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
                    <Tooltip title="Edit">
                      <EditTwoTone
                        sx={{ color: 'black', cursor: 'pointer' }}
                        onClick={() => clickEdit(item.Id)} />
                    </Tooltip>
                  </TableCell>
                  <TableCell
                    sx={{
                      textTransform: 'capitalize',
                      backgroundColor
                    }}
                    align="center"
                  >
                    {item.Text7}

                    <IconButton
                      sx={{ color: 'red', cursor: 'pointer' }}
                      onClick={() => clickDelete(item.Id)}
                    >
                      <Tooltip title="Delete">
                        <DeleteForeverIcon />
                      </Tooltip>
                    </IconButton>
                  </TableCell>
                </TableRow>
                </>
              );
            })}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 20, 30]}
          component="div"
          count={ItemList.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
    </div>
  );
}

export default HolidaysList;
