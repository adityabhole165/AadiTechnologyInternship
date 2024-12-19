
import { ArrowCircleDown } from '@mui/icons-material';
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
  Tooltip
} from '@mui/material';
import { red } from '@mui/material/colors';
import React from 'react';
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
  handleDelete,
  handleSortChange,
  SortBy,
  SortDirection

}

const BookTable: React.FC<BookTableProps> = ({ data, showAllUsers, handleDelete, handleSortChange, SortBy, SortDirection }) => {


  return (
    <Box>
      <TableContainer component={Paper}>
        <Table aria-label="simple table" sx={{ border: (theme) => `1px solid ${theme.palette.divider}` }}>
          <TableHead>
            <TableRow sx={{ background: (theme) => theme.palette.secondary.main }}>
              <TableCell sx={{ color: 'white', py: 1.5 }}>
                <b
                  onClick={() => handleSortChange('bookTitle')} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
                  Book Title {SortBy === 'bookTitle' && (SortDirection === 'asc' ? <ArrowCircleUpIcon /> : <ArrowCircleDown />)}
                </b>
              </TableCell>
              {showAllUsers && (
                <>
                  <TableCell sx={{ color: 'white', py: 1.5 }}>
                    <b onClick={() => handleSortChange('userName')} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
                      User Name {SortBy === 'userName' && (SortDirection === 'asc' ? <ArrowCircleUpIcon /> : <ArrowCircleDown />)}
                    </b>
                  </TableCell>

                  <TableCell sx={{ color: 'white', py: 1.5 }}>
                    <b onClick={() => handleSortChange('class')} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
                      Class {SortBy === 'class' && (SortDirection === 'asc' ? <ArrowCircleUpIcon /> : <ArrowCircleDown />)}

                    </b>
                  </TableCell>
                  <TableCell sx={{ color: 'white !important', py: 1.5 }}>
                    <b onClick={() => handleSortChange('designation')} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
                      Designation {SortBy === 'designation' && (SortDirection === 'asc' ? <ArrowCircleUpIcon /> : <ArrowCircleDown />)}
                    </b>
                  </TableCell>
                </>
              )}
              <TableCell sx={{ color: 'white', py: 1.5, pl: 4 }}>
                <b onClick={() => handleSortChange('date')} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
                  Date{SortBy === 'date' && (SortDirection === 'asc' ? <ArrowCircleUpIcon /> : <ArrowCircleDown />)}
                </b>
              </TableCell>
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

                <TableCell
                  sx={{
                    textTransform: 'capitalize',
                    textAlign: 'center',
                    opacity: 1,
                    py: 0.5,
                  }}
                  align="center"
                >
                  {
                    book.UserId == localStorage.getItem('UserId') &&

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
                  }
                </TableCell>

              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default BookTable;

