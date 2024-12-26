
import { ArrowCircleDown } from '@mui/icons-material';
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
import CloseIcon from '@mui/icons-material/Close';
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
  const safeData = Array.isArray(data) ? data : [];

  return (
    <Box>
      <TableContainer component={Paper}>
        <Table aria-label="simple table" sx={{ border: (theme) => `1px solid ${theme.palette.divider}` }}>
          <TableHead>
            <TableRow sx={{ background: (theme) => theme.palette.secondary.main }}>
              <TableCell sx={{ color: 'white', py: 1.5 }}>
                <b
                  onClick={() => handleSortChange('Book_Title')} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
                  Book Title {SortBy === 'Book_Title' && (SortDirection === 'asc' ? <ArrowCircleUpIcon /> : <ArrowCircleDown />)}
                </b>
              </TableCell>
              {showAllUsers && (
                <>
                  <TableCell sx={{ color: 'white', py: 1.5 }}>
                    <b onClick={() => handleSortChange('Name')} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
                      User Name {SortBy === 'Name' && (SortDirection === 'asc' ? <ArrowCircleUpIcon /> : <ArrowCircleDown />)}
                    </b>
                  </TableCell>

                  <TableCell sx={{ color: 'white', py: 1.5 }}>
                    <b onClick={() => handleSortChange('Class')} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
                      Class {SortBy === 'Class' && (SortDirection === 'asc' ? <ArrowCircleUpIcon /> : <ArrowCircleDown />)}

                    </b>
                  </TableCell>
                  <TableCell sx={{ color: 'white !important', py: 1.5 }}>
                    <b onClick={() => handleSortChange('Designation')} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
                      Designation {SortBy === 'Designation' && (SortDirection === 'asc' ? <ArrowCircleUpIcon /> : <ArrowCircleDown />)}
                    </b>
                  </TableCell>
                </>
              )}
              <TableCell sx={{ color: 'white', py: 1.5, pl: 4 }}>
                <b onClick={() => handleSortChange('ReservationDate')} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
                  Date{SortBy === 'ReservationDate' && (SortDirection === 'asc' ? <ArrowCircleUpIcon /> : <ArrowCircleDown />)}
                </b>
              </TableCell>
              <TableCell sx={{ color: 'white', py: 1.5, textAlign: 'center' }}>
                <b>Cancel</b>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {safeData.map((book, index) => (
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

                      <Tooltip title="Cancel">
                        <CloseIcon />
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

