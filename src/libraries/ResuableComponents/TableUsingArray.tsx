import React, { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Card, TextareaAutosize, MenuItem, FormControl, Select } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';



function TableUsingArray({ ItemList, HeaderArray }) {
    console.log("ItemList",ItemList)

    return (
        <Paper sx={{ width: '100%', overflow: 'hidden' }} > {/* Add this div for the sticky header */}
            <TableContainer component={Paper} sx={{ maxHeight: 440 }}>
                <Table stickyHeader aria-label="sticky table" >
                    <TableHead >
                        <TableRow>
                            {HeaderArray.map((item, i) => (
                                <>
                                
                               
                                    {i == 0 ? 
                                    <>
                                      <TableCell key={i} sx={{ textTransform: "capitalize", borderRight: "1px solid black", backgroundColor: "#c5e1a5",
                                background: "linear-gradient(60deg, #01579b, #80d8ff)"}}
                                    align="center"><b>{item}</b></TableCell>
                                    
                                    </>:
                                    <>
                                    
                                    <TableCell key={i} sx={{ textTransform: "capitalize", borderRight: "1px solid black", backgroundColor: "#80deea" 
                                }}
                                    align="center"><b>{item}</b></TableCell>
                                    </>
                                    
                                    }
                                </>
                          

                            ))}

                        </TableRow>
                    </TableHead>
                    <TableBody >
                        {ItemList.map((item, i) => (
                            <TableRow key={i}>
                                {item.map((obj, index) => (
                                   
                                    <TableCell key={index} align="center" sx={{fontWeight:"bold"}}>{obj === "X" ? <ClearIcon sx={{color:"red"}}/> : obj}</TableCell>
                                ))
                                }
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    );
}


export default TableUsingArray;

    








