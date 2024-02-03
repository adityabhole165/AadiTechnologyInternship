import Delete from '@mui/icons-material/Delete';
import Edit from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Card, Link } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { ButtonPrimary } from '../styled/ButtonStyle';
const Assignedhomeworklist1 = ({
  ItemList,
  HeaderArray,
  clickDelete,
  clickEdit,
  clickAttachment,
  clickVisibilityIcon,
  clickpublish,
  clickView
}) => {
  return (
    <div>
      <TableContainer component={Card}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow sx={{ backgroundColor: 'skyblue' }}>
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
            {ItemList.map((item, i) => (
              <TableRow key={i}>
                <TableCell sx={{ textTransform: 'capitalize' }} align="center">
                  {item.Text1}
                </TableCell>

                <TableCell sx={{ textTransform: 'capitalize' }} align="center">
                  <Link href={''} onClick={() => clickView(item.Id)}>
                    {item.Text2}
                  </Link>
                </TableCell>

                <TableCell sx={{ textTransform: 'capitalize' }} align="center">
                  {item.Text3}
                </TableCell>

                <TableCell sx={{ textTransform: 'capitalize' }} align="center">
                  {item.Text4}
                </TableCell>

                <TableCell sx={{ textTransform: 'capitalize' }} align="center">
                  <Link href={''} onClick={() => clickAttachment(item.Text5)}>
                    {item.Text5}
                  </Link>
                </TableCell>
                <TableCell sx={{ textTransform: 'capitalize' }} align="center">
                  {item.Text6 == 0 ? null : (
                    <VisibilityIcon
                      style={{ color: 'black' }}
                      onClick={() => clickVisibilityIcon(item.Id)}
                    />
                  )}
                </TableCell>

                <TableCell sx={{ textTransform: 'capitalize' }} align="center">
                  <ButtonPrimary onClick={() => clickpublish(item.Id)}>
                    {item.Text7 === 'True' ? 'Publish' : 'Unpublish'}
                  </ButtonPrimary>
                </TableCell>

                <TableCell sx={{ textTransform: 'capitalize' }} align="center">
                  {item.Text7 === 'True' ? (
                    <Edit
                      style={{ color: 'black ' }}
                      onClick={() => clickEdit(item.Id)}
                    />
                  ) : null}
                </TableCell>

                <TableCell sx={{ textTransform: 'capitalize' }} align="center">
                  {item.Text7 === 'True' ? (
                    <Delete
                      style={{ color: 'black ' }}
                      onClick={() => clickDelete(item.Id)}
                    />
                  ) : null}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Assignedhomeworklist1;
