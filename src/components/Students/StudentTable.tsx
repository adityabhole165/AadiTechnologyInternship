import {
  Checkbox,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { useState } from 'react';

const StudentTable = ({ students }) => {
  const [selected, setSelected] = useState([]);

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      setSelected(students.map((student) => student.id));
    } else {
      setSelected([]);
    }
  };

  const handleCheckboxClick = (id) => {
    const currentIndex = selected.indexOf(id);
    const newSelected = [...selected];

    if (currentIndex === -1) {
      newSelected.push(id);
    } else {
      newSelected.splice(currentIndex, 1);
    }

    setSelected(newSelected);
  };

  const isSelected = (id) => selected.indexOf(id) !== -1;

  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table"
        sx={{
          border: (theme) => `1px solid ${theme.palette.grey[300]}`,
        }}>
        <TableHead>
          <TableRow sx={{
            background: (theme) => theme.palette.secondary.main,
            color: (theme) => theme.palette.common.white,
          }}>
            <TableCell sx={{ color: "white", py: 1 }}>
              <Checkbox
                size='small'
                indeterminate={
                  selected.length > 0 && selected.length < students.length
                }
                checked={students.length > 0 && selected.length === students.length}
                onChange={handleSelectAllClick}
              />
            </TableCell>
            <TableCell sx={{ color: "white", py: 1 }}>Reg. No.</TableCell>
            <TableCell sx={{ color: "white", py: 1 }}>Student Name</TableCell>
            <TableCell sx={{ color: "white", py: 1 }}>Class</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {students.map((student) => (
            <TableRow key={student.YearwiseStudentId} selected={isSelected(student.YearwiseStudentId)}>
              <TableCell sx={{ py: 0.5 }}>
                <Checkbox
                  size='small'
                  checked={isSelected(student.YearwiseStudentId)}
                  onChange={() => handleCheckboxClick(student.YearwiseStudentId)}
                />
              </TableCell>
              <TableCell sx={{ py: 0.5 }}>{student.RegNo}</TableCell>
              <TableCell sx={{ py: 0.5 }}>{student.StudentName}</TableCell>
              <TableCell sx={{ py: 0.5 }}>{student.ClassName}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default StudentTable;
