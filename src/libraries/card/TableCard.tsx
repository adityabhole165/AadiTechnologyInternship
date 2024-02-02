import { Card } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

export default function TableCard({ ItemList, HeaderArray }) {
  return (
    <TableContainer component={Card}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            {HeaderArray.map((item, i) => (
              <TableCell
                key={i}
                sx={{ textTransform: 'capitalize' }}
                align="center"
              >
                {' '}
                <b>{item.Header}</b>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {ItemList.map((item, i) => (
            <TableRow
              key={i}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {item.Book_Title}
              </TableCell>
              <TableCell align="center">{item.Book_No}</TableCell>
              <TableCell align="center">{item.Author_Name}</TableCell>
              <TableCell align="center">{item.Published_By}</TableCell>
              <TableCell align="center">{item.Language}</TableCell>
              <TableCell align="center">{item.Standards}</TableCell>
              <TableCell align="center">{item.Available_Books}</TableCell>
              <TableCell align="center">{item.Total_Book_Quantity}</TableCell>
              {item.Available_Books !== 0 && (
                <TableCell align="center" sx={{ color: '#628def' }}>
                  {' '}
                  Claim
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
