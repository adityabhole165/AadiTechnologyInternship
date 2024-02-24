import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import EditIcon from '@mui/icons-material/Edit';
import ImageNotSupportedIcon from '@mui/icons-material/ImageNotSupported';
import { Card } from '@mui/material';
// ... (your other imports)

function EditiconList2({ ItemList, clickEdit, HeaderArray }) {
  return (
    <div>
      <TableContainer component={Card}>
        <Table aria-label="simple table">
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
              <TableRow key={item.Id}>
                <TableCell sx={{ textTransform: 'capitalize' }} align="center">
                  {item.Text1}
                </TableCell>
                <TableCell sx={{ textTransform: 'capitalize' }} align="center">
                  {item.Text2 === 'Y' ? (
                    <EditIcon onClick={() => clickEdit(item.Id)} />
                  ) : (
                    <ImageNotSupportedIcon />
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

export default EditiconList2;
