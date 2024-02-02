import BorderColorIcon from '@mui/icons-material/BorderColor';
import { Card } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
// ... (your other imports)

function Assignhomeworklist({ ItemList, clickAssign, HeaderArray }) {
  return (
    <div>
      <TableContainer component={Card}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow sx={{ backgroundColor: '#4dd0e1' }}>
              {HeaderArray.map((item, i) => (
                <TableCell
                  key={i}
                  sx={{ textTransform: 'capitalize' }}
                  align="center"
                >
                  <b>{item.Header}</b>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {ItemList.map((item) => (
              <TableRow
                key={item.Id}
                sx={{
                  backgroundColor: item.Text3 === 'True' ? '#bae1f5' : '#b1b2b3'
                }}
              >
                <TableCell sx={{ textTransform: 'capitalize' }} align="center">
                  {item.Text1}
                </TableCell>
                <TableCell sx={{ textTransform: 'capitalize' }} align="center">
                  {item.Text2}
                </TableCell>

                <TableCell sx={{ textTransform: 'capitalize' }} align="center">
                  <BorderColorIcon
                    onClick={() => clickAssign(item.Id)}
                    titleAccess="Add Homework"
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default Assignhomeworklist;
