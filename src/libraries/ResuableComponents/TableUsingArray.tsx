import ClearIcon from '@mui/icons-material/Clear';
import { Box } from '@mui/material';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

function TableUsingArray({ ItemList, HeaderArray }) {
  console.log('ItemList', ItemList);

  return (
    <Box sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer component={Paper} square>
        <Table stickyHeader aria-label="sticky table">
          <TableHead
            sx={{
              backgroundColor: (theme) => theme.palette.primary.main
            }}
          >
            <TableRow>
              {HeaderArray.map((item, i) => (
                <>
                  {i == 0 ? (
                    <>
                      <TableCell
                        key={i}
                        sx={{
                          color: 'white',
                          py: 1
                        }}
                        align="center"
                      >
                        <b>{item}</b>
                      </TableCell>
                    </>
                  ) : (
                    <>
                      <TableCell
                        key={i}
                        sx={{
                          color: 'white',
                          py: 1
                        }}
                        align="center"
                      >
                        <b>{item}</b>
                      </TableCell>
                    </>
                  )}
                </>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {ItemList.map((item, i) => (
              <TableRow key={i}>
                {item.map((obj, index) => (
                  <TableCell
                    key={index}
                    align="center"
                    sx={{ fontWeight: 'bold', py: 1 }}
                  >
                    {obj === 'X' ? <ClearIcon sx={{ color: 'red' }} /> : obj}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default TableUsingArray;
