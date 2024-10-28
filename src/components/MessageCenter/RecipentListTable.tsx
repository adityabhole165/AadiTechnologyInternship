// UserTable.tsx
import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Checkbox,
  Box
} from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

function RecipentListTable({ userData, onDelete, onSort, sortOrder }) {
  return (
    <TableContainer component={Box}>
      <Table
        aria-label="simple table"
        sx={{
          border: (theme) => `1px solid ${theme.palette.grey[300]}`,
          overflow: 'hidden'
        }}
      >
        <TableHead>
          <TableRow
            sx={{
              background: (theme) => theme.palette.secondary.main,
              color: (theme) => theme.palette.common.white,
            }}
          >
            <TableCell
              sx={{
                background: (theme) => theme.palette.secondary.main,
                color: 'white',
                fontWeight: 'bold',
                py: 1
              }}
            >
              <Box display="flex" alignItems="center">
                <Checkbox /> User Name
                <IconButton
                  onClick={onSort}
                  sx={{ color: 'white', ml: 1 }}
                  size="small"
                >
                  {sortOrder === 'asc' ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
                </IconButton>
              </Box>
            </TableCell>
            <TableCell
              align="center"
              sx={{
                background: (theme) => theme.palette.secondary.main,
                color: 'white',
                fontWeight: 'bold',
                py: 1
              }}
            >
              Delete
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {userData.map((user) => (
            <TableRow key={user.id}>
              <TableCell sx={{ py: 0.5 }}>
                <Checkbox /> {user.name}
              </TableCell>
              <TableCell align="center" sx={{ py: 0.5 }}>
                <IconButton
                  onClick={() => onDelete(user.id)}
                  sx={{
                    color: '#38548A',
                    '&:hover': {
                      color: 'red',
                      backgroundColor: '#FFEBEE'
                    }
                  }}
                >
                  <DeleteForeverIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default RecipentListTable;
