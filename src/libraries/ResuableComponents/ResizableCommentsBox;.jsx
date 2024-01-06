import React, { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Card, Typography, TextareaAutosize } from '@mui/material';

function ResizableCommentsBox({ ItemList, HeaderArray }) {
  const [textValues, setTextValues] = useState([]);

  useEffect(() => {
    setTextValues(ItemList.map((item) => item.Text3));
  }, [ItemList]);

  const TextChange = (index, newText) => {
    const newTextValues = [...textValues];
    const words = newText.split(/\s+/); // Split by any white spaces
    if (words.length <= 300) {
      newTextValues[index] = newText;
      setTextValues(newTextValues);
    }
  };

  const remainingWords = (text) => {
    const words = text.split(/\s+/); // Split by any white spaces
    return Math.max(300 - words.length, 0);
  };

  return (
    <div>
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
                  <TextareaAutosize
                    value={textValues[i]}
                    onChange={(e) => TextChange(i, e.target.value)}
                    style={{ width: '100%' }}
                    rowsMax={10}
                  />
                  <Typography variant="body2" color="textSecondary" align="right">
                    Remaining words: {remainingWords(textValues[i])}
                  </Typography>
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
