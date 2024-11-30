import React from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Tooltip } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import RemoveRedEyeRoundedIcon from '@mui/icons-material/RemoveRedEyeRounded';

const StudentTable = ({ data, onSelectStudent }) => {
  return (
    <TableContainer component={Paper}>
      <Table  aria-label="simple table"
                    sx={{
                        border: (theme) => `1px solid ${theme.palette.grey[300]}`,
                    }}>
        <TableHead>
          <TableRow sx={{
                                background: (theme) => theme.palette.secondary.main,
                                color: (theme) => theme.palette.common.white,
                            }}>
            <TableCell sx={{ color: "white" , py:1.5}}><strong>Reg. No.</strong></TableCell>
            <TableCell sx={{ color: "white" , py:1.5}}><strong>Class</strong></TableCell>
            <TableCell sx={{ color: "white" , py:1.5, textAlign: "center"}}><strong>Roll No.</strong></TableCell>
            <TableCell sx={{ color: "white" , py:1.5}}><strong>Student Name</strong></TableCell>
            <TableCell sx={{ color: "white" , py:1.5, textAlign: "center"}}><strong>Select Student</strong></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, index) => (
            <TableRow key={index}>
              <TableCell sx={{py:0.5}}>{row.regNo}</TableCell>
              <TableCell sx={{py:0.5}}>{row.class}</TableCell>
              <TableCell sx={{py:0.5, textAlign: "center"}}>{row.rollNo}</TableCell>
              <TableCell sx={{py:0.5}}>{row.studentName}</TableCell>
              <TableCell sx={{py:0.5, textAlign: "center"}}>
                <Tooltip title="view">
                <IconButton onClick={() => onSelectStudent(row)}>
                  <RemoveRedEyeRoundedIcon />
                </IconButton>
                </Tooltip>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default StudentTable;
