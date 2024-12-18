import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import React, { useState } from 'react';
import ButtonGroupComponent from 'src/libraries/ResuableComponents/ButtonGroupComponent';

const BookTable2 = ({ data1 }) => {
  const [rowsPerPage, setRowsPerPage] = useState<number>(5); // Default rows per page
  const [currentPage, setCurrentPage] = useState<number>(1); // Current page
  const rowsPerPageOptions = [20, 50, 100, 200];
  const [page, setPage] = useState<number>(1);
  // Handle rows per page change
  const ChangeRowsPerPage = (event: React.ChangeEvent<{ value: unknown }>) => {
    setRowsPerPage(parseInt(event.target.value as string, 10));
    setCurrentPage(1); // Reset to the first page when changing rows per page
  };

  // Handle page change
  const PageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Calculate the start and end index for pagination
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const paginatedData = data1.slice(startIndex, endIndex);

  // Calculate total pages
  const pageCount = Math.ceil(data1.length / rowsPerPage);
  const startRecord = (page - 1) * rowsPerPage + 1;
  const endRecord = Math.min(page * rowsPerPage);


  return (
    <Box>
      <TableContainer component={Box}>
        <Table
          aria-label="book table"
          sx={{
            border: (theme) => `1px solid ${theme.palette.grey[300]}`,
            overflow: 'hidden',
          }}
        >
          <TableHead>
            <TableRow
              sx={{
                background: (theme) => theme.palette.secondary.main,
                color: (theme) => theme.palette.common.white,
              }}
            >
              <TableCell sx={{ color: 'white', textAlign: 'left', py: 1.5 }}>
                <strong>Book Title</strong>
              </TableCell>
              <TableCell sx={{ color: 'white', textAlign: 'left', py: 1.5 }}>
                <strong>Accession No</strong>
              </TableCell>
              <TableCell sx={{ color: 'white', textAlign: 'left', py: 1.5 }}>
                <strong>Issue Date</strong>
              </TableCell>
              <TableCell sx={{ color: 'white', textAlign: 'left', py: 1.5 }}>
                <strong>Return Date</strong>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedData.map((book, index) => (
              <TableRow key={index}>
                <TableCell sx={{ py: 1 }}>{book.Book_Title}</TableCell>
                <TableCell sx={{ py: 1 }}>{book.Accession_No}</TableCell>
                <TableCell sx={{ py: 1 }}>{book.Issue_Date}</TableCell>
                <TableCell sx={{ py: 1 }}>{book.Return_Date}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {endRecord > 19 ? (
        <ButtonGroupComponent
          ChangeRowsPerPage={ChangeRowsPerPage}
          rowsPerPageOptions={[rowsPerPageOptions]}
          rowsPerPage={rowsPerPage}
          PageChange={PageChange}
          pagecount={pageCount}
        />
      ) : (
        <span></span>
      )}
    </Box>
  );
};

export default BookTable2;
