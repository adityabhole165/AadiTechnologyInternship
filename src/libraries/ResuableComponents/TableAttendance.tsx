import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Card } from '@mui/material';
import ErrorMessages from '../ErrorMessages/ErrorMessages';

export default function TableAttendace({ItemList ,HeaderArray}) {
  return (
    <>
    {ItemList.length===0 ? <> <ErrorMessages Error={'No record found'} /></> :
     <>
     <TableContainer component={Card}>
      <Table aria-label="simple table">
      <TableHead >
        <TableRow >
        {HeaderArray.map((item,i)=>(
       <TableCell key={i} sx={{textTransform:"capitalize" , borderRight:"1px solid black" , backgroundColor:"lightGray"}} align="center" > <b>{item.Header}</b></TableCell>
        ))}
           </TableRow>
            </TableHead>
         <TableBody>
          {ItemList.map((item,i) => (
            <TableRow
              key={i}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
             
              <TableCell align="center"   dangerouslySetInnerHTML={{ __html: item.Text1}} ></TableCell>
              <TableCell align="center"   dangerouslySetInnerHTML={{ __html: item.Text2}} ></TableCell>
              <TableCell align="center"   dangerouslySetInnerHTML={{ __html: item.Text3}} ></TableCell>
              <TableCell align="center"   dangerouslySetInnerHTML={{ __html: item.Text4}} ></TableCell>
              <TableCell align="center"   dangerouslySetInnerHTML={{ __html: item.Text5}} ></TableCell>
              <TableCell align="center"   dangerouslySetInnerHTML={{ __html: item.Text6}} ></TableCell>
              <TableCell align="center"   dangerouslySetInnerHTML={{ __html: item.Text7}} ></TableCell>
              <TableCell align="center"   dangerouslySetInnerHTML={{ __html: item.Text8}} ></TableCell>
              <TableCell align="center"   dangerouslySetInnerHTML={{ __html: item.Text9}} ></TableCell>
              <TableCell align="center"   dangerouslySetInnerHTML={{ __html: item.Text10}} ></TableCell>
              <TableCell align="center"   dangerouslySetInnerHTML={{ __html: item.Text11}} ></TableCell>
              <TableCell align="center"   dangerouslySetInnerHTML={{ __html: item.Text12}} ></TableCell>
              <TableCell align="center"   dangerouslySetInnerHTML={{ __html: item.Text13}} ></TableCell>
              <TableCell align="center"   dangerouslySetInnerHTML={{ __html: item.Text14}} ></TableCell>
              <TableCell align="center"   dangerouslySetInnerHTML={{ __html: item.Text15}} ></TableCell>
              <TableCell align="center"   dangerouslySetInnerHTML={{ __html: item.Text16}} ></TableCell>
              <TableCell align="center"   dangerouslySetInnerHTML={{ __html: item.Text17}} ></TableCell>

              
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    
    </>}
    
    </>
   
  );
}
