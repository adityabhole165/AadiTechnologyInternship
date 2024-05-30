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
import { GetScreenPermission, isFutureDateTime, isPastDateTime } from 'src/components/Common/Util';

function HolidaysList({
  ItemList,
  clickEdit,
  HeaderArray,
  clickDelete,
}) {
  console.log(ItemList, "ItemList----------");

  const HolidayFullAccess = GetScreenPermission('Holidays');

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

  function formatDate(date) {
    const day = date.getDate().toString().padStart(2, '0');
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  }

  const currentDate = new Date();
  const formattedDate = formatDate(currentDate);

  console.log(formattedDate);  // Output: 29-May-2024

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
                (item.Header !== 'Edit' && item.Header !== 'Delete') || (HolidayFullAccess !== 'N') ? (
                  <TableCell
                    key={i}
                    sx={{
                      textTransform: 'capitalize',
                      color: (theme) => theme.palette.common.white,
                      textAlign: i === 2 || i === 3 ? 'left' : 'center'
                    }}
                    align="center"
                  >
                    <b>{item.Header}</b>
                  </TableCell>
                ) : <TableCell key={i} style={{ width: 0, height: 0, padding: 0, border: 0 }} />
              ))}

            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedItems.map((item, index) => {
              console.log(item.Text1, "item.Text1", formattedDate);
              const formattedItemDate = formatDate(new Date(item.Text1));
              const isCurrentDate = formattedItemDate === formattedDate;
              const isFuture = isFutureDateTime(new Date(item.Text1));
              const isPast = isPastDateTime(new Date(item.Text1));

              const backgroundColor = (isFuture && index === 0) || isCurrentDate ? '#EFDCC9 ' : isPast ? "white" : 'white';

              const rowStyle = isPast && index !== 0 ? {
                backgroundColor: 'lightgrey',
                opacity: 0.5,
              } : { backgroundColor };

              return (
                <TableRow key={item.Id} >
                  <TableCell
                    sx={{
                      textTransform: 'capitalize',
                      backgroundColor: rowStyle.backgroundColor,
                      opacity: isPast && index !== 0 ? 0.5 : 1,
                    }}
                    align="center"
                  >
                    {item.Text1}
                  </TableCell>
                  <TableCell
                    sx={{
                      textTransform: 'capitalize',
                      backgroundColor: rowStyle.backgroundColor,
                      opacity: isPast && index !== 0 ? 0.5 : 1,
                    }}
                    align="center"
                  >
                    {item.Text2}
                  </TableCell>
                  <TableCell
                    sx={{
                      textTransform: 'capitalize',
                      backgroundColor: rowStyle.backgroundColor,
                      textAlign: 'left',
                      opacity: isPast && index !== 0 ? 0.5 : 1
                    }}
                    align="left"
                  >
                    {item.Text3}
                  </TableCell>
                  <TableCell
                    sx={{
                      textTransform: 'capitalize',
                      backgroundColor: rowStyle.backgroundColor,
                      textAlign: 'left',
                      opacity: isPast && index !== 0 ? 0.5 : 1,
                    }}
                    align="left"
                  >
                    {item.Text4}
                  </TableCell>
                  <TableCell
                    sx={{
                      textTransform: 'capitalize',
                      backgroundColor: rowStyle.backgroundColor,
                      opacity: isPast && index !== 0 ? 0.5 : 1,
                    }}
                    align="center"
                  >
                    {item.Text5}
                  </TableCell>
                  <TableCell
                    sx={{
                      textTransform: 'capitalize',
                      backgroundColor: rowStyle.backgroundColor,
                      opacity: isPast && index !== 0 ? 0.5 : 1,
                    }}
                    align="center"
                  >
                    {item.Text6}
                    {HolidayFullAccess == 'Y' ? (
                      <Tooltip title="Edit">
                        <EditTwoTone
                          sx={{ color: 'black', cursor: 'pointer', opacity: 1 }}
                          onClick={() => clickEdit(item.Id)} />
                      </Tooltip>
                    ) : null}
                  </TableCell>
                  <TableCell
                    sx={{
                      textTransform: 'capitalize',
                      backgroundColor: rowStyle.backgroundColor,
                      opacity: isPast && index !== 0 ? 0.5 : 1,
                    }}
                    align="center"
                  >
                    {item.Text7}
                    {HolidayFullAccess == 'Y' ? (
                      <IconButton
                        sx={{ color: 'red', cursor: 'pointer', opacity: 1 }}
                        onClick={() => clickDelete(item.Id)}
                      >
                        <Tooltip title="Delete">
                          <DeleteForeverIcon />
                        </Tooltip>
                      </IconButton>
                    ) : null}
                  </TableCell>
                </TableRow>
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
