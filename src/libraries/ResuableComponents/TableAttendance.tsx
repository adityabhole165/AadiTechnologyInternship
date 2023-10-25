import React,{useState} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Card, TextareaAutosize ,MenuItem ,FormControl ,Select} from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
function TableAttendace({ItemList,HeaderArray}) {
   
  return (
    <div>
        <TableContainer sx={{height:"400px" , overflow:"scroll"}}  component={Card}>
      <Table aria-label="simple table">
      <TableHead >
        <TableRow >
         
          {HeaderArray.map((item,i)=>(
       <TableCell key={i} sx={{textTransform:"capitalize" , borderRight:"1px solid black" , backgroundColor:"blue"}} align="center" > <b>{item.Header}</b></TableCell>
        ))}
 
        
           </TableRow>
            </TableHead>
         <TableBody>
          {ItemList.map((item,i) => (
            <TableRow
              key={i}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
            
              <TableCell align="center">{item.Text2}</TableCell>
        
              <TableCell align="center">{item.Text5  ? <ClearIcon sx={{color:"red"}}/> : ''}</TableCell>
       
       
             
             
              
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
 
    </div>
  )
}

export default TableAttendace 
