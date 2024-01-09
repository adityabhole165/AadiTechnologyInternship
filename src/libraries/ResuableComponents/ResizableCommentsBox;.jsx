import React, { useState, useEffect,useRef } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Card, Typography } from '@mui/material';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';

function ResizableCommentsBox({ ItemList, HeaderArray, NoteClick }) {
  const [textValues, setTextValues] = useState([]);
  const [textValues1, setTextValues1] = useState([]);
  const [textValues2, setTextValues2] = useState([]);
  const [charCounts, setCharCounts] = useState([]);
  const [charCounts1, setCharCounts1] = useState([]);
  const [charCounts2, setCharCounts2] = useState([]);

  useEffect(() => {
    setTextValues(ItemList.map((item) => item.Text3));
    setCharCounts(ItemList.map((item) => 300 - item.Text3.length)); 
  }, [ItemList]);

  useEffect(() => {
    setTextValues1(ItemList.map((item) => item.Text4));
    setCharCounts1(ItemList.map((item) => 300 - item.Text4.length)); 
  }, [ItemList]);

  useEffect(() => {
    setTextValues2(ItemList.map((item) => item.Text5));
    setCharCounts2(ItemList.map((item) => 300 - item.Text5.length)); 
  }, [ItemList]);


  const TextChange = (index, newText) => {
    const newTextValues = [...textValues];
    newTextValues[index] = newText;
    setTextValues(newTextValues);

    const newCharCounts = [...charCounts];
    newCharCounts[index] = 300 - newText.length;
    setCharCounts(newCharCounts);
  };

  const TextChange1 = (index, newText) => {
    const newTextValues = [...textValues1];
    newTextValues[index] = newText;
    setTextValues1(newTextValues);

    const newCharCounts = [...charCounts];
    newCharCounts[index] = 300 - newText.length;
    setCharCounts1(newCharCounts);
  };


  const TextChange2 = (index, newText) => {
    const newTextValues = [...textValues2];
    newTextValues[index] = newText;
    setTextValues2(newTextValues);

    const newCharCounts = [...charCounts];
    newCharCounts[index] = 300 - newText.length;
    setCharCounts2(newCharCounts);
  };

  


  return (
    <div
    style={{
      maxHeight: '800px',
      overflowY: 'auto',
      scrollBehavior: 'smooth', 
    }}
  
  >
      <TableContainer component={Card}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              {HeaderArray.map((item, i) => (
                <TableCell
                  key={i}
                  sx={{
                    textTransform: 'capitalize',
                    borderRight: '1px solid black',
                    backgroundColor: '#81d4fa',
                  }}
                  align="center"
                >
                  <b>{item.Header}</b>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {ItemList.map((item, i) => (
              <TableRow key={i} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell align="center">{item.Text1}</TableCell>
                <TableCell align="center">{item.Text2}</TableCell>
                <TableCell align="center">  
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <TextareaAutosize 
                      value={textValues[i]}
                      onChange={(e) => TextChange(i, e.target.value)}
                     
                      rowsMax={3}
                      maxLength={100} 
                    />
                    <IconButton onClick={() => NoteClick(i)}>
                      <MoreVertIcon />
                    </IconButton>
                    <Typography variant="caption" color={charCounts[i] < 0 ? 'error' : 'initial'}>
                      ({Math.max(0, charCounts[i])})
                    </Typography>
                  </div>
                </TableCell>



                <TableCell align="center"> 
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <TextareaAutosize
                      value={textValues1[i]}
                      onChange={(e) => TextChange1(i, e.target.value)}
                     
                      rowsMax={3}
                      maxLength={100} 
                    />
                    <IconButton onClick={() => NoteClick(i)}>
                      <MoreVertIcon />
                    </IconButton>
                    <Typography variant="caption" color={charCounts[i] < 0 ? 'error' : 'initial'}>
                      ({Math.max(0, charCounts1[i])})
                    </Typography>
                  </div>
                </TableCell>

                <TableCell align="center">  
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <TextareaAutosize
                      value={textValues2[i]}
                      onChange={(e) => TextChange2(i, e.target.value)}
                  
                      rowsMax={3}
                      maxLength={100} 
                    />
                    <IconButton onClick={() => NoteClick(i)}>
                      <MoreVertIcon />
                    </IconButton>
                    <Typography variant="caption" color={charCounts[i] < 0 ? 'error' : 'initial'}>
                      ({Math.max(0, charCounts2[i])})
                    </Typography>
                  </div>
                </TableCell>


         



              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default ResizableCommentsBox;
