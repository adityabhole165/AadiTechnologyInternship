import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown';
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
import {
  Link,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel
} from '@mui/material';
import React, { useState } from 'react';
import ButtonGroupComponent from 'src/libraries/ResuableComponents/ButtonGroupComponent';

interface Book {
  Book_Id: string;
  Book_Title: string;
  Author_Name: string;
  Published_By: string;
  Category_Name: string;
  Available_Books: string;
  Language: string;
  Book_No: string;
  Standards: string;
}

interface BookTableProps {
  data: Book[];
}

const BookTable: React.FC<BookTableProps> = ({ data }) => {
  const [order, setOrder] = useState<'asc' | 'desc'>('asc');
  const [orderBy, setOrderBy] = useState<keyof Book>('Book_Title');

  // Pagination state
  const [rowsPerPage, setRowsPerPage] = useState<number>(5); // Default rows per page
  const [currentPage, setCurrentPage] = useState<number>(1);

  const handleSortRequest = (property: keyof Book) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<{ value: unknown }>) => {
    setRowsPerPage(Number(event.target.value));
    setCurrentPage(1); // Reset to the first page when changing rows per page
  };

  const handlePageChange = (value: number) => {
    setCurrentPage(value);
  };

  // Calculate the start and end index for the current page
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;

  // Get the paginated data
  const paginatedData = [...data].slice(startIndex, endIndex);

  // Calculate the total number of pages
  const pageCount = Math.ceil(data.length / rowsPerPage);

  // Sorting the data
  const sortedData = [...data].sort((a, b) => {
    if (a[orderBy] && b[orderBy]) {
      return (order === 'asc' ? 1 : -1) * (a[orderBy] > b[orderBy] ? 1 : -1);
    }
    return 0;
  });

  return (
    <>
      <TableContainer>
        <Table aria-label="book table" sx={{ border: (theme) => `1px solid ${theme.palette.grey[300]}` }}>
          <TableHead>
            <TableRow sx={{ background: (theme) => theme.palette.secondary.main }}>
              <TableCell sx={{ color: 'white', textAlign: 'left', py: 0 }}>Accession No</TableCell>
              {['Book_Title', 'Author_Name', 'Published_By', 'Language'].map((field) => (
                <TableCell key={field} sortDirection={orderBy === field ? order : false}>
                  <TableSortLabel
                    active={orderBy === field}
                    direction={orderBy === field ? order : 'asc'}
                    onClick={() => handleSortRequest(field as keyof Book)}
                    // sx={{ 
                    //   color: 'white', 
                    //   textAlign: 'left', 
                    //   py: 0, 
                    //   '& .MuiTableSortLabel-icon': { 
                    //     color: 'white' // Ensure the icon color is white
                    //   }
                    // }}
                    IconComponent={order === 'asc' ? ArrowCircleUpIcon : ArrowCircleDownIcon}
                    // Set the color to white when clicked (active)
                    sx={{
                      color: (orderBy === field ? 'white !important' : 'white'),
                      '& .MuiTableSortLabel-icon': {
                        color: (orderBy === field ? 'white !important' : 'white ')
                      }
                    }}
                  >
                    {field.replace('_', ' ')}
                  </TableSortLabel>
                </TableCell>
              ))}
              <TableCell sx={{ color: 'white', textAlign: 'left', py: 0 }}>Standards</TableCell>
              <TableCell sx={{ color: 'white', textAlign: 'left', py: 0 }}>Available Books</TableCell>
              <TableCell sx={{ color: 'white', textAlign: 'left', py: 0 }}>Total</TableCell>
              <TableCell sx={{ color: 'white', textAlign: 'left', py: 0 }}>Claim</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedData.map((row) => (
              <TableRow key={row.Book_Id}>
                <TableCell>{row.Book_No}</TableCell>
                <TableCell>{row.Book_Title}</TableCell>
                <TableCell>{row.Author_Name}</TableCell>
                <TableCell>{row.Published_By}</TableCell>
                <TableCell>{row.Category_Name}</TableCell>
                <TableCell>{row.Language}</TableCell>
                <TableCell>{row.Available_Books}</TableCell>
                <TableCell>1</TableCell>
                <TableCell sx={{ py: 0 }}><Link href="#">Claim</Link></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {/* Add the pagination component here */}
      <ButtonGroupComponent
        ChangeRowsPerPage={handleChangeRowsPerPage}
        rowsPerPageOptions={[5, 10, 25]} // Set your options
        rowsPerPage={rowsPerPage}
        PageChange={handlePageChange}
        pagecount={pageCount}
      />
    </>
  );
};

export default BookTable;
