

import React, { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TaskIcon from '@mui/icons-material/Task';

import CheckIcon from '@mui/icons-material/Check';
import AssignmentIcon from '@mui/icons-material/Assignment';
import { Card } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
// ... (your other imports)

function EditIconList({ ItemList, clickEdit, HeaderArray , clicksubmit }) {
  return (
    <div>
      <TableContainer component={Card}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow sx={{ backgroundColor: '#4dd0e1' }}>
              {HeaderArray.map((item, i) => (
                <TableCell
                  key={i}
                  sx={{ textTransform: 'capitalize' }}
                  align="center"
                >
                  <b>{item.Header}</b>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {ItemList.map((item) => (
              <TableRow key={item.Id}>
                <TableCell sx={{ textTransform: 'capitalize' }} align="center">
                  {item.Text1}
                </TableCell>

                <TableCell sx={{ textTransform: 'capitalize' }} align="center">
                  {item.Text2}
                </TableCell>

               



                <TableCell sx={{ textTransform: 'capitalize' }} align="center">
                  {item.Text3 === '1' ? (
                 <TaskIcon onClick={() => clickEdit(item.Id)} />

                  ) : (
                    <CheckIcon />
                  )}
                </TableCell> 

                <TableCell sx={{ textTransform: 'capitalize' }} align="center">
                  

                  {item.Text4 !== '1' ? (
                    <AssignmentIcon  onClick={() => clicksubmit(item.Id)}/>
                    
                  ) : (
                    item.Text4
                  )}
                </TableCell>

               

              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default EditIconList;
