import { QuestionMark } from '@mui/icons-material';
import { Box, IconButton, MenuItem, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';
import { useState } from 'react';
import CommonPageHeader from '../CommonPageHeader';

const ViewExamSchedule = () => {
    const [expandedCardIndex, setExpandedCardIndex] = useState(null);
    const [selectedGrade, setSelectedGrade] = useState('');

    const handleGradeChange = (event) => {
        setSelectedGrade(event.target.value);
        setExpandedCardIndex(event.target.value ? 0 : null); // Set expandedCardIndex only if a grade is selected
    };

    const examData = [
        { date: '01 Jul 2024', subject: 'English', type: 'SEA I', start: '08:10 AM', end: '08:45 AM', total: '00:35', description: '' },
        { date: '03 Jul 2024', subject: 'Mathematics', type: 'SEA I', start: '08:10 AM', end: '08:45 AM', total: '00:35', description: '' },
        { date: '04 Jul 2024', subject: 'Computer Studies', type: 'SEA I', start: '08:10 AM', end: '08:45 AM', total: '00:35', description: '' },
        { date: '05 Jul 2024', subject: 'Science', type: 'SEA I', start: '08:10 AM', end: '08:45 AM', total: '00:35', description: '' },
        { date: '08 Jul 2024', subject: 'Social Science', type: 'SEA I', start: '08:10 AM', end: '08:45 AM', total: '00:35', description: '' },
        { date: '09 Jul 2024', subject: 'Hindi II, Marathi II', type: 'SEA I', start: '08:10 AM', end: '08:45 AM', total: '00:35', description: '' },
        { date: '10 Jul 2024', subject: 'Hindi III, Marathi III', type: 'SEA I', start: '08:10 AM', end: '08:45 AM', total: '00:35', description: '' },
    ];

    const dummyData = [
        { Name: '-- Select --', value: '' },
        { Name: 'Nursery', value: 'nursery' },
        { Name: 'Junior KG', value: 'junior-kg' },
        { Name: 'Senior KG', value: 'senior-kg' },
        { Name: '1', value: '1' },
        { Name: '2', value: '2' },
        { Name: '3', value: '3' },
        { Name: '4', value: '4' },
        { Name: '5', value: '5' },
        { Name: '6', value: '6' },
        { Name: '7', value: '7' },
        { Name: '8', value: '8' },
        { Name: '9', value: '9' },
        { Name: '10', value: '10' }
    ];

    const toggleAccordion = () => {
        setExpandedCardIndex(expandedCardIndex === 0 ? null : 0); // Toggle the index between 0 and null
    };

    return (
        <Box px={2}>
            <CommonPageHeader
                navLinks={[
                    {
                        title: 'Exam Schedule',
                        path: '/extended-sidebar/Teacher/ExamScheduleBasescreen',
                    },
                    {
                        title: 'View Exam Schedule',
                        path: '',
                    },
                ]}
                rightActions={
                    <>
                        <Select
                            size={'small'}
                            value={selectedGrade}
                            onChange={handleGradeChange}
                            displayEmpty
                            sx={{ minWidth: '15vw' }}
                        >
                            {dummyData.map((grade, index) => (
                                <MenuItem key={index} value={grade.value}>
                                    {grade.Name}
                                </MenuItem>
                            ))}
                        </Select>
                        <Tooltip title={'Examination schedule for your class.'}>
                            <IconButton
                                sx={{
                                    color: 'white',
                                    backgroundColor: grey[500],
                                    '&:hover': {
                                        backgroundColor: grey[600]
                                    }
                                }}
                            >
                                <QuestionMark />
                            </IconButton>
                        </Tooltip>
                    </>
                }
            />

            <Box sx={{ backgroundColor: 'white' }}>

                <Box

                    onClick={toggleAccordion}
                    sx={{
                        
                        display: 'flex',
                        alignItems: 'center',
                        padding: 0.5,
                        backgroundColor: 'whitesmoke',
                        border: '1px solid #d3d3d3',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        mt: 1, // Reduced margin-top
                        
                    }}
                >
                  
                    <Box sx={{ width: '10px', height: '10px', p: 0.5, border: '1px solid black', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Typography sx={{ color: 'black', fontSize: '16px', fontWeight: 'bold', p: 0.5, }}>
                            {expandedCardIndex === 0 ? '-' : '+'}
                        </Typography>
                    </Box>
                    <Box sx={{ display: 'flex' }}>
                        <Typography variant="h6" sx={{color: 'red', ml: 1}}>
                            <b>Progressive Analysis - I</b>
                        </Typography>
                        <Typography variant="h6" sx={{ ml: 1 }}>
                            <b>01 July 2024 To 09 July 2024</b>
                        </Typography>
                    </Box>
                </Box>



                {expandedCardIndex === 0 ? (
                    <TableContainer component={Box} sx={{ width: '100%', overflowX: 'auto', }}>
                        <Table aria-label="simple table"
                            sx={{
                                border: (theme) => `1px solid ${theme.palette.grey[300]}`,
                                overflow: 'hidden'
                            }}>
                            <TableHead>
                                <TableRow sx={{
                                    background: (theme) => theme.palette.secondary.main,
                                    color: (theme) => theme.palette.common.white,
                                    py:1
                                }}>
                                    <TableCell sx={{ color: 'white' }}><strong>Exam Date</strong></TableCell>
                                    <TableCell sx={{ color: 'white' }}><strong>Subject</strong></TableCell>
                                    <TableCell sx={{ color: 'white' }}><strong>Exam Type</strong></TableCell>
                                    <TableCell sx={{ color: 'white' }}><strong>Start Time</strong></TableCell>
                                    <TableCell sx={{ color: 'white' }}><strong>End Time</strong></TableCell>
                                    <TableCell sx={{ color: 'white' }}><strong>Total Time</strong></TableCell>
                                    <TableCell sx={{ color: 'white' }}><strong>Description</strong></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {examData.map((exam, index) => (
                                    <TableRow key={index}>
                                        <TableCell sx={{ py: 1 }}>{exam.date}</TableCell>
                                        <TableCell sx={{ py: 1 }}>{exam.subject}</TableCell>
                                        <TableCell sx={{ py: 1 }}>{exam.type}</TableCell>
                                        <TableCell sx={{ py: 1 }}>{exam.start}</TableCell>
                                        <TableCell sx={{ py: 1 }}>{exam.end}</TableCell>
                                        <TableCell sx={{ py: 1 }}>{exam.total}</TableCell>
                                        <TableCell sx={{ py: 1 }}>{exam.description}</TableCell>
                                    </TableRow>
                                ))}
                                <TableRow>
                                    
                                    <TableCell colSpan={7} sx={{ py: 1, textAlign: 'left' }}>
                                        <strong>Instruction :</strong>
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                ) : (
                    <samp></samp>
                )
                }
            </Box >
        </Box >

    );
};

export default ViewExamSchedule;
