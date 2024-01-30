import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Card, Modal } from '@mui/material';
import ErrorMessages from '../ErrorMessages/ErrorMessages';
import styled from '@emotion/styled';
import Model from './Model';
import { Theme } from '@mui/system';

const nameCellStyle ={
  width:"900px",
 fontSize:'5px', 
  py:0.5, 
  cursor:'pointer' ,
 ' &:hover' :{
  backgroundColor:'lightblue',
  color:'gray'

 }
}

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
    fontFamily:'inherit',
    ' &:hover' :{
      backgroundColor:'lightblue',
      
    
     }

  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: '1px',
  },
}));
const rowStyle={
 
  ' &:hover' :{
    backgroundColor:'lightblue',
    
  
   }
}
const cellstyle={
  py:0.5,
  px:1,
  ' &:hover' :{
    backgroundColor:'lwhitsmoke',
    color:'black'
  
   }
}
const dangercellstyle={
  py:0.5,
  px:1,
  color:'red',
  ' &:hover' :{
    backgroundColor:'lwhitsmoke',
    color:'black'
  
   }
}


export default function TableAttendace({ItemList ,HeaderArray}) {
  const [user, setuser] = React.useState({})
  const [open, setOpen] = React.useState(false)
  const handleOpen = (item) => {
    setuser(item)
    setOpen(true)
  };
  const handleClose = () => setOpen(false);
  return (
    <>
    {ItemList.length===0 ? <> <ErrorMessages Error={'No record found'} /></> :
     <>
     <TableContainer component={Card} square>
      <Table className='font-roboto' sx={{fontFamily:'inherit', padding:'300px'}} aria-label="simple table">
      <TableHead >
        <TableRow >
        {HeaderArray.map((item,i)=>(
       <TableCell key={i} scope={item.scope ? item.scope:'a'} sx={{textTransform:"capitalize" , backgroundColor:"rgb(40, 160, 235)", padding:0, marginLeft:0,minWidth:'42px' }} align="center" > <b>{item.Header}</b></TableCell>
        ))}
           </TableRow>
            </TableHead>
         <TableBody >
          {ItemList.map((item,i) => (
            <>
           
            <StyledTableRow
              key={i}
              
              sx= {rowStyle}

            >
              {(item.Text17 > 75) ?<>
              <TableCell  align="center" sx={cellstyle} className='text-3xl  font-bold'   dangerouslySetInnerHTML={{ __html: item.Text1}} ></TableCell>
               <TableCell align="left"   dangerouslySetInnerHTML={{ __html: item.Text2}} scope='row' sx={nameCellStyle } ></TableCell>
             <TableCell align="center" sx={{paddingX:'8px' , py:0.5}}  dangerouslySetInnerHTML={{ __html: item.Text3}}  ></TableCell>
              <TableCell align="center" sx={cellstyle}    dangerouslySetInnerHTML={{ __html: item.Text4}} ></TableCell>
            <TableCell align="center" sx={cellstyle}   dangerouslySetInnerHTML={{ __html: item.Text5}} ></TableCell>
              <TableCell align="center" sx={cellstyle}   dangerouslySetInnerHTML={{ __html: item.Text6}} ></TableCell>
              <TableCell align="center"  sx={cellstyle}   dangerouslySetInnerHTML={{ __html: item.Text7}} ></TableCell>
                <TableCell align="center"  sx={cellstyle}  dangerouslySetInnerHTML={{ __html: item.Text8}} ></TableCell>
              <TableCell align="center"  sx={cellstyle}  dangerouslySetInnerHTML={{ __html: item.Text9}} ></TableCell>
              <TableCell align="center"  sx={cellstyle}  dangerouslySetInnerHTML={{ __html: item.Text10}} ></TableCell>
              <TableCell align="center"  sx={cellstyle}   dangerouslySetInnerHTML={{ __html: item.Text11}} ></TableCell>
              <TableCell align="center"  sx={cellstyle}   dangerouslySetInnerHTML={{ __html: item.Text12}} ></TableCell>
              <TableCell  align="center"  sx={{...cellstyle,}}   dangerouslySetInnerHTML={{ __html: item.Text13}} ></TableCell>
              <TableCell align="center"   sx={cellstyle}  dangerouslySetInnerHTML={{ __html: item.Text14}} ></TableCell>
              <TableCell align="center" scope='row'  dangerouslySetInnerHTML={{ __html: item.Text15}} sx={{fontWeight:"bold", width:'200px', py:.5}}></TableCell>
              <TableCell align="center"  dangerouslySetInnerHTML={{ __html: item.Text16}} 
              sx={{fontWeight:"bold", width:'200px', py:.5}}
              ></TableCell>
              
             <TableCell align="center"   dangerouslySetInnerHTML={{ __html: item.Text17}} sx={{fontWeight:"bold", ...cellstyle}}></TableCell>
             </>
             :
             <><TableCell align="center" sx={cellstyle} className='text-3xl  font-bold' dangerouslySetInnerHTML={{ __html: item.Text1 }}></TableCell><TableCell align="left" dangerouslySetInnerHTML={{ __html: item.Text2 }} scope='row' sx={ {color:'red',...nameCellStyle}}></TableCell><TableCell align="center" sx={{  ...dangercellstyle }} dangerouslySetInnerHTML={{ __html: item.Text3 }}></TableCell><TableCell align="center" sx={dangercellstyle} dangerouslySetInnerHTML={{ __html: item.Text4 }}></TableCell><TableCell align="center" sx={dangercellstyle} dangerouslySetInnerHTML={{ __html: item.Text5 }}></TableCell><TableCell align="center" sx={dangercellstyle} dangerouslySetInnerHTML={{ __html: item.Text6 }}></TableCell><TableCell align="center" sx={dangercellstyle} dangerouslySetInnerHTML={{ __html: item.Text7 }}></TableCell><TableCell align="center" sx={dangercellstyle} dangerouslySetInnerHTML={{ __html: item.Text8 }}></TableCell><TableCell align="center" sx={dangercellstyle} dangerouslySetInnerHTML={{ __html: item.Text9 }}></TableCell><TableCell align="center" sx={dangercellstyle} dangerouslySetInnerHTML={{ __html: item.Text10 }}></TableCell><TableCell align="center" sx={dangercellstyle} dangerouslySetInnerHTML={{ __html: item.Text11 }}></TableCell><TableCell align="center" sx={dangercellstyle} dangerouslySetInnerHTML={{ __html: item.Text12 }}></TableCell><TableCell align="center" sx={{ ...dangercellstyle, }} dangerouslySetInnerHTML={{ __html: item.Text13 }}></TableCell><TableCell align="center" sx={dangercellstyle} dangerouslySetInnerHTML={{ __html: item.Text14 }}></TableCell><TableCell align="center" scope='row' dangerouslySetInnerHTML={{ __html: item.Text15 }} sx={{ fontWeight: "bold", width: '200px', ...dangercellstyle }}></TableCell><TableCell align="center" dangerouslySetInnerHTML={{ __html: item.Text16 }}
                    sx={{ fontWeight: "bold", width: '200px',...dangercellstyle }}
                  ></TableCell><TableCell align="center" dangerouslySetInnerHTML={{ __html: item.Text17 }} sx={{ fontWeight: "bold", ...dangercellstyle }}></TableCell></>
             }
              
            </StyledTableRow>
            </>
          ))}
        </TableBody>
        <Modal
       open={open}
       onClose={handleClose}
     aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      >
        
        <Model data={user}/>
      </Modal>
        
      </Table>
    </TableContainer>
    
    </>}
    
    </>
   
  );
}

const table= (item)=>{
  
}