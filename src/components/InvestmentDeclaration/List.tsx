import { Container, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material';
import { useState } from 'react';

const StudentMarks = () => {
    const StudentsList = [
        { rollNo: '1', studentName: 'John Doe', examName: 'Math', marks: '' },
        { rollNo: '2', studentName: 'Jane Smith', examName: 'Science', marks: '' },
        { rollNo: '3', studentName: 'Sam Brown', examName: 'History', marks: '' }
    ];

    const [marks, setMarks] = useState('');

    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                Student Marks
            </Typography>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Roll No</TableCell>
                            <TableCell>Student Name</TableCell>
                            <TableCell>Exam Name</TableCell>
                            <TableCell>Marks</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {StudentsList.map((student) => (
                            <TableRow key={student.rollNo}>
                                <TableCell>{student.rollNo}</TableCell>
                                <TableCell>{student.studentName}</TableCell>
                                <TableCell>{student.examName}</TableCell>
                                <TableCell>
                                    <TextField
                                        label="Marks"
                                        variant="outlined"
                                        value={marks}
                                        onChange={(e) => setMarks(e.target.value)}
                                        sx={{ width: '100px' }}
                                    />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    );
};

export default StudentMarks;