import { QuestionMark } from '@mui/icons-material';
import { Box, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Dropdown from 'src/libraries/dropdown/Dropdown';
import { GetStandardRes } from 'src/requests/TExamschedule/TExamschedule';
import { RootState } from 'src/store';
import CommonPageHeader from '../CommonPageHeader';

const ViewExamSchedule = () => {
    const dispatch = useDispatch();

    const asAcademicYearId = sessionStorage.getItem('AcademicYearId');
    const asSchoolId = localStorage.getItem('localSchoolId');
    const RoleId = sessionStorage.getItem('RoleId');
    const asStandardId = sessionStorage.getItem('StandardId');

    const [expandedCardIndex, setExpandedCardIndex] = useState(null);
    const [std, setStd] = useState('0');

    const getstandard = useSelector((state: RootState) => state.StandardAndExamList.getStandard);

    const examData = [
        { date: '01 Jul 2024', subject: 'English', type: 'SEA I', start: '08:10 AM', end: '08:45 AM', total: '00:35', description: '' },
        { date: '03 Jul 2024', subject: 'Mathematics', type: 'SEA I', start: '08:10 AM', end: '08:45 AM', total: '00:35', description: '' },
        { date: '04 Jul 2024', subject: 'Computer Studies', type: 'SEA I', start: '08:10 AM', end: '08:45 AM', total: '00:35', description: '' },
        { date: '05 Jul 2024', subject: 'Science', type: 'SEA I', start: '08:10 AM', end: '08:45 AM', total: '00:35', description: '' },
        { date: '08 Jul 2024', subject: 'Social Science', type: 'SEA I', start: '08:10 AM', end: '08:45 AM', total: '00:35', description: '' },
        { date: '09 Jul 2024', subject: 'Hindi II, Marathi II', type: 'SEA I', start: '08:10 AM', end: '08:45 AM', total: '00:35', description: '' },
        { date: '10 Jul 2024', subject: 'Hindi III, Marathi III', type: 'SEA I', start: '08:10 AM', end: '08:45 AM', total: '00:35', description: '' },
    ];

    const getstandardList_body = {
        asAcademicYearId: asAcademicYearId,
        asSchoolId: asSchoolId
    };

    useEffect(() => {
        dispatch(GetStandardRes(getstandardList_body));
        if (RoleId === '3') {
            setStd(asStandardId);
        }
    }, []);

    const stdChange = (value) => {
        setStd(value);
        setExpandedCardIndex(0);
    };

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
                        <Box sx={{ width: '130px', mr: 2, marginRight: '5px' }}> {/* Adjusted margin-right */}
                            <Dropdown
                                Array={getstandard}
                                handleChange={stdChange}
                                label={'Select Standard'}
                                size={'small'}
                                variant="outlined"
                                defaultValue={std}
                            />
                        </Box>
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
                        <Typography variant="h6" sx={{ color: 'red', ml: 1 }}>
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
                                    py: 1
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
