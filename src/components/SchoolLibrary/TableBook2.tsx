import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Box
} from '@mui/material';

const BookTable = ({ data1 }) => {
  return (
    <TableContainer component={Box}>
      <Table  aria-label="book table" sx={{ border: (theme) => `1px solid ${theme.palette.grey[300]}`, overflow: 'hidden' }}>
        <TableHead>
          <TableRow sx={{ background: (theme) => theme.palette.secondary.main, color: (theme) => theme.palette.common.white }}>
            <TableCell sx={{ color: 'white', textAlign: 'left' }}><strong>Book Title</strong></TableCell>
            <TableCell sx={{ color: 'white', textAlign: 'left' }}><strong>Accession No</strong></TableCell>
            <TableCell sx={{ color: 'white', textAlign: 'left' }}><strong>Issue Date</strong></TableCell>
            <TableCell sx={{ color: 'white', textAlign: 'left' }}><strong>Return Date</strong></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data1.map((book, index) => (
            <TableRow key={index}>
              <TableCell>{book.Book_Title}</TableCell>
              <TableCell>{book.Accession_No}</TableCell>
              <TableCell>{book.Issue_Date}</TableCell>
              <TableCell>{book.Return_Date}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default BookTable;