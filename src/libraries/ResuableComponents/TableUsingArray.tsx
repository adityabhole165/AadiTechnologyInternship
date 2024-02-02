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
      <TableContainer
        component={Paper}
        square
        sx={{ border: '1px solid black' }}
      >
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {HeaderArray.map((item, i) => (
                <>
                  {i == 0 ? (
                    <>
                      <TableCell
                        key={i}
                        sx={{
                          textTransform: 'capitalize',
                          backgroundColor: '#c5e1a5',
                          background: '#90caf9',
                          borderRight: '1px solid black',
                          borderBottom: '1px solid black'
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
                          textTransform: 'capitalize',
                          backgroundColor: '#90caf9',
                          borderRight: '1px solid black',
                          borderBottom: '1px solid black'
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
                    sx={{ fontWeight: 'bold' }}
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
