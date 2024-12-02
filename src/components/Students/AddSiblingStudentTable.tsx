import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
} from "@mui/material";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { red } from "@mui/material/colors";
// Dummy Data
const dummyData = [
  { RegNo: "PP2782", StudentName: "Miss Saanvi Sunil Dhakne", Class: "Senior KG - D" },
  { RegNo: "PP3062", StudentName: "Miss Manushi Santosh Tupe", Class: "Senior KG - D" },
  { RegNo: "3930", StudentName: "Master Vallabh Abhijeet Aundhe", Class: "2 - E" },
  { RegNo: "3946", StudentName: "Master Vivaan Chopra", Class: "2 - E" },
  { RegNo: "3920", StudentName: "Master Rajveer Karmajeet Dhamal", Class: "4 - B" },
  { RegNo: "3479", StudentName: "Miss Rama Prashant Borkar", Class: "4 - C" },
  { RegNo: "3458", StudentName: "Miss Anvika Nikhil Apte", Class: "4 - A" },
  { RegNo: "3275", StudentName: "Miss Dhritee Amrut Bhonsle", Class: "5 - C" },
  { RegNo: "2507", StudentName: "Master Yuvaan Sameer Bhore", Class: "8 - A" },
  { RegNo: "2557", StudentName: "Master Vikramaditya Rahul Kate", Class: "8 - B" },
  { RegNo: "2030", StudentName: "Miss Tanishka Abhijeet Aundhe", Class: "10 - A" },
  { RegNo: "2044", StudentName: "Master Advay Amol Chaudhari", Class: "10 - A" },
];

const AddSiblingStudentTable: React.FC = () => {
  // Delete Handler
  const handleDelete = (regNo: string) => {
    alert(`Delete action for Reg No: ${regNo}`);
  };

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
            <TableCell  sx={{ color: "white" , py:1.5}}><b>Reg. No.</b></TableCell>
            <TableCell  sx={{ color: "white" , py:1.5}}><b>Student Name</b></TableCell>
            <TableCell  sx={{ color: "white" , py:1.5}}><b>Class</b></TableCell>
            <TableCell  sx={{ color: "white" , py:1.5, textAlign:'center'}}><b>Delete</b></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {dummyData.map((row) => (
            <TableRow key={row.RegNo}>
              <TableCell sx={{py:0.5}}>{row.RegNo}</TableCell>
              <TableCell sx={{py:0.5}}>{row.StudentName}</TableCell>
              <TableCell sx={{py:0.5}}>{row.Class}</TableCell>
              <TableCell sx={{py:0.5, textAlign: "center"}}>
                <IconButton
                  sx={{
                    color:'#38548A	',
                     //  backgroundColor: grey[500],
                      '&:hover': {
                    color:'red',
                     backgroundColor: red[100]
                      }}}
                  onClick={() => handleDelete(row.RegNo)}
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
};

export default AddSiblingStudentTable;
