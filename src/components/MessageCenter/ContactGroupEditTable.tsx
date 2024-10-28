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
  Paper,
  Box
} from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { red } from '@mui/material/colors';
// Sample data array
const userData = [
  { id: 1, name: 'Mr. Devendra Kumar (Principal)' },
  { id: 2, name: 'Dr. Anjali S. Gurjar (Ex Principal)' }
];

function ContactGroupEditTable() {
  const handleDelete = (id) => {
    console.log(`Delete user with id: ${id}`);
    // Add delete logic here, such as updating the state
  };

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
                py:1.5
              }}
            >
              User Name
            </TableCell>
            <TableCell
            align="center"
              sx={{
                background: (theme) => theme.palette.secondary.main,
                color: 'white',
                fontWeight: 'bold',
                py:1
              }}
            >
              Delete
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {userData.map((user) => (
            <TableRow key={user.id}>
              <TableCell sx={{  py:0.5}}>{user.name}</TableCell>
              <TableCell align="center" sx={{  py:1}}>
                <IconButton
                  onClick={() => handleDelete(user.id)}
                  sx={{
                    color: '#38548A	',
                    //  backgroundColor: grey[500],
                    '&:hover': {
                      color: 'red',
                      backgroundColor: red[100]
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

export default ContactGroupEditTable;
