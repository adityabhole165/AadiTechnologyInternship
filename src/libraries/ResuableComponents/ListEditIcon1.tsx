import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import AssignmentIcon from '@mui/icons-material/Assignment';
import CheckIcon from '@mui/icons-material/Check';
import EditIcon from '@mui/icons-material/Edit';
import { Box } from '@mui/material';
// ... (your other imports)

function ListEditIcon1({ ItemList, clickEdit, HeaderArray, clicksubmit }) {
  return (
    <div>
      <TableContainer component={Box}>
        <Table aria-label="simple table" sx={{ border: (theme) => `1px solid ${theme.palette.divider}` }}>
          <TableHead>
            <TableRow
              sx={{
                backgroundColor: (theme) => theme.colors.primary.main,
                color: (theme) => theme.palette.common.white
              }}
            >
              {HeaderArray.map((item, i) => (
                <TableCell
                  key={i}
                  sx={{ textTransform: 'capitalize', color: 'white' }}
                >
                  <b>{item.Header}</b>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {ItemList.map((item) => (
              <TableRow key={item.Id}>
                <TableCell sx={{ textTransform: 'capitalize' }} >
                  {item.Text1}
                </TableCell>

                <TableCell sx={{ textTransform: 'capitalize' }} >
                  {item.Text2}
                </TableCell>

                <TableCell sx={{ textTransform: 'capitalize' }} >
                  {item.Text3 === 'Y' ? (
                    <CheckIcon style={{ color: '#607d8b' }} />
                  ) : (
                    <EditIcon onClick={() => clickEdit(item.Id)} style={{ color: '#76ff03' }} />
                  )}
                </TableCell>

                <TableCell sx={{ textTransform: 'capitalize' }} >
                  {item.Text4 !== 'Complete' ? (
                    <AssignmentIcon onClick={() => clicksubmit(item.Id)} style={{ color: '#ff5722' }} />
                  ) : (
                    item.Text4
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default ListEditIcon1;
