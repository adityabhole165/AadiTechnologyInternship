import { ExpandMore, QuestionMark } from '@mui/icons-material'
import { Accordion, AccordionDetails, AccordionSummary, Box, IconButton, MenuItem, Paper, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip, Typography } from '@mui/material'
import { grey } from '@mui/material/colors'
import { useState } from 'react'
import SearchableDropdown from 'src/libraries/ResuableComponents/SearchableDropdown'
import CommonPageHeader from '../CommonPageHeader'

const ViewExamSchedule = () => {
    const [expanded, setExpanded] = useState(false);
    const [selectedGrade, setSelectedGrade] = useState('');

    const handleAccordionChange = () => {
        setExpanded(!expanded);
    };

    const handleGradeChange = (event) => {
        setSelectedGrade(event.target.value);
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
    return (
        <Box>
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
            <Box p={2} sx={{backgroundColor:'white'}}>
                {/* <Box mb={2} display="flex" alignItems="center" justifyContent="space-between">
                    <Select
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
                </Box> */}

                {selectedGrade && (
                    <Accordion expanded={expanded} onChange={handleAccordionChange} TransitionProps={{ timeout: 2000 }}>
                        <AccordionSummary expandIcon={<ExpandMore />} aria-controls="panel-content" id="panel-header">
                            <Typography variant="h6">Subject Enrichment Analysis - I: 01 Jul 2024 To 10 Jul 2024</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <TableContainer component={Paper}>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell><strong>Exam Date</strong></TableCell>
                                            <TableCell><strong>Subject</strong></TableCell>
                                            <TableCell><strong>Exam Type</strong></TableCell>
                                            <TableCell><strong>Start Time</strong></TableCell>
                                            <TableCell><strong>End Time</strong></TableCell>
                                            <TableCell><strong>Total Time</strong></TableCell>
                                            <TableCell><strong>Description</strong></TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {examData.map((exam, index) => (
                                            <TableRow key={index}>
                                                <TableCell>{exam.date}</TableCell>
                                                <TableCell>{exam.subject}</TableCell>
                                                <TableCell>{exam.type}</TableCell>
                                                <TableCell>{exam.start}</TableCell>
                                                <TableCell>{exam.end}</TableCell>
                                                <TableCell>{exam.total}</TableCell>
                                                <TableCell>{exam.description}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </AccordionDetails>
                    </Accordion>
                )}
            </Box>
        </Box>


    )
}

export default ViewExamSchedule


