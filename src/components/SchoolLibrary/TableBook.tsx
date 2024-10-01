import React, { useState } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableSortLabel, Paper,
  Link,
  Box
} from '@mui/material';

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

  const handleSortRequest = (property: keyof Book) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const sortedData = [...data].sort((a, b) => {
    if (a[orderBy] && b[orderBy]) {
      return (order === 'asc' ? 1 : -1) * (a[orderBy] > b[orderBy] ? 1 : -1);
    }
    return 0;
  });

  return (
    <TableContainer component={Box}>
      <Table aria-label="book table" sx={{ border: (theme) => `1px solid ${theme.palette.grey[300]}`, overflow: 'hidden' }}>
        <TableHead>
          <TableRow sx={{ background: (theme) => theme.palette.secondary.main, color: (theme) => theme.palette.common.white }}>
          <TableCell  sx={{ color: 'white', textAlign: 'left', py:0 }}>Accession No</TableCell>
            <TableCell sortDirection={orderBy === 'Book_Title' ? order : false}>
              <TableSortLabel
                active={orderBy === 'Book_Title'}
                direction={orderBy === 'Book_Title' ? order : 'asc'}
                onClick={() => handleSortRequest('Book_Title')}
                sx={{ color: 'white', textAlign: 'left', py:0 }}
              >
                Book Title
              </TableSortLabel>
            </TableCell>
            <TableCell sortDirection={orderBy === 'Author_Name' ? order : false}>
              <TableSortLabel
                active={orderBy === 'Author_Name'}
                direction={orderBy === 'Author_Name' ? order : 'asc'}
                onClick={() => handleSortRequest('Author_Name')}
                sx={{ color: 'white', textAlign: 'left', py:0}}>
                Author
              </TableSortLabel>
            </TableCell>
            <TableCell sortDirection={orderBy === 'Published_By' ? order : false}>
              <TableSortLabel
                active={orderBy === 'Published_By'}
                direction={orderBy === 'Published_By' ? order : 'asc'}
                onClick={() => handleSortRequest('Published_By')}
                sx={{ color: 'white', textAlign: 'left', py:0 }}>
                Publisher
              </TableSortLabel>
            </TableCell>
            <TableCell sx={{ color: 'white', textAlign: 'left', py:0 }}>Standards</TableCell>
            <TableCell sortDirection={orderBy === 'Language' ? order : false}>
              <TableSortLabel
                active={orderBy === 'Language'}
                direction={orderBy === 'Language' ? order : 'asc'}
                onClick={() => handleSortRequest('Language')}
                sx={{ color: 'white', textAlign: 'left', py:0 }}>
                Language
              </TableSortLabel>
            </TableCell>
            <TableCell sx={{ color: 'white', textAlign: 'left', py:0 }}>Available Books</TableCell>
            <TableCell sx={{ color: 'white', textAlign: 'left', py:0 }}>Total</TableCell>
            <TableCell sx={{ color: 'white', textAlign: 'left', py:0 }}>Claim</TableCell>
            
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
              <TableCell sx={{py:0}}><Link href="#">Claim</Link> </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default BookTable;