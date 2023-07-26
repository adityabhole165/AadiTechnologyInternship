import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Card } from '@mui/material';





export default function TableCard({GetBookList}) {
  return (
    <TableContainer component={Card}>
      <Table aria-label="simple table">
        <TableHead >
          <TableRow >
            <TableCell sx={{textTransform:"capitalize"}}> <b>Book Title</b></TableCell>
           
            <TableCell sx={{textTransform:"capitalize" }} align="center"> <b>Accession No.</b></TableCell>
            <TableCell sx={{textTransform:"capitalize" }} align="center"> <b>Author</b></TableCell>
            <TableCell sx={{textTransform:"capitalize" }} align="center"><b>Publisher</b></TableCell>
           
            <TableCell sx={{textTransform:"capitalize" }} align="center"><b>Language</b></TableCell>
            <TableCell sx={{textTransform:"capitalize"}} align="center"><b>Standards</b></TableCell>
            <TableCell sx={{textTransform:"capitalize"}} align="center"><b>Available</b></TableCell>
            <TableCell sx={{textTransform:"capitalize"}} align="center"><b>Claim</b></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {GetBookList.map((item,i) => (
            <TableRow
              key={i}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row" >
                {item.Book_Title}
              </TableCell>
              <TableCell align="center">{item.Book_No}</TableCell>
              <TableCell align="center">{item.Author_Name}</TableCell>
              <TableCell align="center">{item.Published_By}</TableCell>
              <TableCell align="center">{item.Language}</TableCell>
              <TableCell align="center">{item.Standards}</TableCell>
              <TableCell align="center">{item.Available_Books}</TableCell>
              {item.Available_Books === 0 &&
              <TableCell align="center"> Claim</TableCell>}
              
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
