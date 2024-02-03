import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import Delete from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Card, Link } from '@mui/material';
import { ButtonPrimary } from '../styled/ButtonStyle';
// ... (your other imports)

function Adddailyloglist({
  ItemList,
  clickView,
  HeaderArray,
  clickEdit,
  clickDelete,
  clickpublish
}) {
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
              <TableRow key={item.Id}>
                <TableCell sx={{ textTransform: 'capitalize' }} align="center">
                  {item.Text1}
                </TableCell>

                <TableCell sx={{ textTransform: 'capitalize' }} align="center">
                  <Link href={''} onClick={() => clickView(item.Text2)}>
                    view log
                  </Link>
                </TableCell>

                <TableCell sx={{ textTransform: 'capitalize' }} align="center">
                  <ButtonPrimary onClick={() => clickpublish(item.Id)}>
                    {item.Text3 === 'True' ? 'UNPUBLISH' : 'PUBLISH'}
                  </ButtonPrimary>
                </TableCell>

                <TableCell sx={{ textTransform: 'capitalize' }} align="center">
                  {item.Text3 === 'True' ? (
                    <EditIcon onClick={() => clickEdit(item.Id)} />
                  ) : null}
                </TableCell>

                <TableCell sx={{ textTransform: 'capitalize' }} align="center">
                  {item.Text3 === 'True' ? (
                    <Delete onClick={() => clickDelete(item.Id)} />
                  ) : null}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default Adddailyloglist;
