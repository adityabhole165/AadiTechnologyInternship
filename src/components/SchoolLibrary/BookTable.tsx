import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown';
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import {
  Box,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  Tooltip
} from '@mui/material';
import { red } from '@mui/material/colors';
import React, { useState } from 'react';
type BookDataType = {
  bookTitle?: string;
  date?: string;
  username?: string;
  action?: string;
  userName?: string;
  class?: string;
  designation?: string;
  UserId?: string;
  BookId?: string
};

interface BookTableProps {
  data: BookDataType[];
  showAllUsers: boolean;
  handleDelete

}

const BookTable: React.FC<BookTableProps> = ({ data, showAllUsers, handleDelete }) => {

  

  const [orderDirection, setOrderDirection] = useState<"asc" | "desc">("asc");
  const [orderBy, setOrderBy] = useState<string>('bookTitle');
  const [sortedData, setSortedData] = useState(data);

  

  const handleSortRequest = (property: string) => {
    const isAsc = orderBy === property && orderDirection === 'asc';
    setOrderDirection(isAsc ? 'desc' : 'asc');
    setOrderBy(property);

    const sortedArray = [...sortedData].sort((a, b) => {
      if (a[property] < b[property]) return isAsc ? -1 : 1;
      if (a[property] > b[property]) return isAsc ? 1 : -1;
      return 0;
    });

    console.log(sortedArray,"sortedArray");
    
    setSortedData(sortedArray);
  };

  return (
    <Box>
      <TableContainer component={Paper}>
        <Table aria-label="simple table" sx={{ border: (theme) => `1px solid ${theme.palette.divider}` }}>
          <TableHead>
            <TableRow sx={{ background: (theme) => theme.palette.secondary.main }}>
              <TableCell sx={{ color: 'white', py: 1.5 }}>
                <TableSortLabel
                  active={orderBy === 'bookTitle'}
                  direction={orderDirection}
                  onClick={() => handleSortRequest('bookTitle')}
                  IconComponent={orderDirection === 'asc' ? ArrowCircleUpIcon : ArrowCircleDownIcon}
                  sx={{
                    color: 'white !important',
                    '& .MuiTableSortLabel-icon': { color: 'white !important' },
                  }}
                >
                  Book Title
                </TableSortLabel>
              </TableCell>
              {showAllUsers && (
                <>
                  <TableCell sx={{ color: 'white', py: 1.5 }}>
                    <TableSortLabel
                      active={orderBy === 'userName'}
                      direction={orderDirection}
                      onClick={() => handleSortRequest('userName')}
                      IconComponent={orderDirection === 'asc' ? ArrowCircleUpIcon : ArrowCircleDownIcon}
                      sx={{
                        color: 'white !important',
                        '& .MuiTableSortLabel-icon': { color: 'white !important' },
                      }}
                    >
                      User Name
                    </TableSortLabel>
                  </TableCell>

                  <TableCell sx={{ color: 'white', py: 1.5 }}>
                    <TableSortLabel
                      active={orderBy === 'class'}
                      direction={orderDirection}
                      onClick={() => handleSortRequest('class')}
                      IconComponent={orderDirection === 'asc' ? ArrowCircleUpIcon : ArrowCircleDownIcon}
                      sx={{
                        color: 'white !important',
                        '& .MuiTableSortLabel-icon': { color: 'white !important' },
                      }}
                    >
                      Class
                    </TableSortLabel>
                  </TableCell>

                  <TableCell sx={{ color: 'white !important', py: 1.5 }}>
                    <TableSortLabel
                      active={orderBy === 'designation'}
                      direction={orderDirection}
                      onClick={() => handleSortRequest('designation')}
                      IconComponent={orderDirection === 'asc' ? ArrowCircleUpIcon : ArrowCircleDownIcon}
                      sx={{
                        color: 'white !important',
                        '& .MuiTableSortLabel-icon': { color: 'white !important' },
                      }}
                    >
                      Designation
                    </TableSortLabel>
                  </TableCell>
                </>
              )}
              <TableCell sx={{ color: 'white', py: 1.5, pl: 4 }}>
                <TableSortLabel
                  active={orderBy === 'date'}
                  direction={orderDirection}
                  onClick={() => handleSortRequest('date')}
                  IconComponent={orderDirection === 'asc' ? ArrowCircleUpIcon : ArrowCircleDownIcon}
                  sx={{
                    color: 'white !important',
                    '& .MuiTableSortLabel-icon': { color: 'white !important' },
                  }}
                >
                  Date
                </TableSortLabel>
              </TableCell>

              {/* Cancel Column */}
              <TableCell sx={{ color: 'white', py: 1.5, textAlign: 'center' }}>Cancel</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {data.map((book, index) => (
              <TableRow key={index}>
                <TableCell sx={{ textTransform: 'capitalize', textAlign: 'left', py: 0.5 }}>
                  {book.bookTitle}
                </TableCell>
                {showAllUsers && (
                  <>
                    <TableCell sx={{ textTransform: 'capitalize', textAlign: 'left', py: 0.5 }}>
                      {book.userName}
                    </TableCell>
                    <TableCell sx={{ textTransform: 'capitalize', textAlign: 'left', py: 0.5 }}>
                      {book.class}
                    </TableCell>
                    <TableCell sx={{ textTransform: 'capitalize', textAlign: 'left', py: 0.5 }}>
                      {book.designation}
                    </TableCell>
                  </>
                )}
                <TableCell sx={{ textTransform: 'capitalize', textAlign: 'left', py: 0.5 }}>
                  {book.date}
                </TableCell>
                {/* {
                  book.UserId == localStorage.getItem('UserId') && */}

                <TableCell
                  sx={{
                    textTransform: 'capitalize',
                    textAlign: 'center',
                    opacity: 1,
                    py: 0.5,
                  }}
                  align="center"
                >
                  <IconButton
                    onClick={() => handleDelete(book.BookId)}
                    sx={{
                      color: '#223354',
                      '&:hover': {
                        color: 'red',
                        backgroundColor: red[100],
                      },
                    }}
                  >

                    <Tooltip title="Delete">
                      <DeleteForeverIcon />
                    </Tooltip>
                  </IconButton>
                </TableCell>
                {/* } */}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default BookTable;

