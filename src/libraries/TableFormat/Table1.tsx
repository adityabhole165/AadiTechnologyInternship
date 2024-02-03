import { Card } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

export default function Table1({ ItemList, Headeritems }) {
  return (
    <TableContainer
      component={Card}
      sx={{ height: '200px', overflow: 'scroll' }}
    >
      <Table aria-label="simple table" size="small" stickyHeader>
        <TableHead>
          <TableRow>
            {Headeritems.map((item, i) => {
              return (
                <TableCell
                  key={i}
                  variant="head"
                  sx={{ backgroundColor: '#deb887' }}
                >
                  {item.HeaderName}
                </TableCell>
              );
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {ItemList.map((item, i) => (
            <TableRow
              key={i}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {item.header}
              </TableCell>
              <TableCell>{item.text1}</TableCell>
              <TableCell>{item.text3}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
