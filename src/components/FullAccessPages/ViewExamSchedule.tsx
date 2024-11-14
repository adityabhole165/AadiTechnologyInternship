import { QuestionMark } from '@mui/icons-material';
import { Box, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Dropdown from 'src/libraries/dropdown/Dropdown';
import { GetStandardRes, NewExamSchedule } from 'src/requests/TExamschedule/TExamschedule';
import { RootState } from 'src/store';
import CommonPageHeader from '../CommonPageHeader';

const ViewExamSchedule = () => {
    const dispatch = useDispatch();

    const formatDate = (dateStr) => {
        const parts = dateStr.split('-');
        const day = parts[0];
        const month = parts[1];
        const year = parts[2];

        const months = [
            'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'
        ];

        const monthText = months[parseInt(month, 10) - 1]; // Adjust for zero-indexed month array

        return `${day} ${monthText} ${year}`;
    };

    const asAcademicYearId = sessionStorage.getItem('AcademicYearId');
    const asSchoolId = localStorage.getItem('localSchoolId');
    const RoleId = sessionStorage.getItem('RoleId');
    const asStandardId = sessionStorage.getItem('StandardId');

    const [expandedCardIndex, setExpandedCardIndex] = useState(null);
    const [std, setStd] = useState('');

    const getstandard = useSelector((state: RootState) => state.StandardAndExamList.getStandard);
    const getExamlist = useSelector((state: RootState) => state.StandardAndExamList.ExamData);
    const SubList = useSelector((state: RootState) => state.StandardAndExamList.NewExamData);

    console.log(SubList,"SubList");
    
    const loading = useSelector((state: RootState) => state.StandardAndExamList.Loading);

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

    const ExamList_body = {
        asSchoolId: asSchoolId,
        asAcademicYearId: asAcademicYearId,
        asStandardId: std
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

    useEffect(() => {
        if (std !== '') {
            dispatch(NewExamSchedule(ExamList_body));
        }
    }, [std]);

    useEffect(() => {
        if (getstandard.length > 0) {
            setStd(getstandard[0].id);
            setExpandedCardIndex(0);
        }
    }, [getstandard]);

    const getTime = (startTime, endTime) => {
        const formatTime = (time) => {
            const [hours, minutes] = time.split(':');
            let period = 'AM';
            let adjustedHours = parseInt(hours, 10);

            if (adjustedHours >= 12) {
                period = 'PM';
                adjustedHours -= 12;
            }
            if (adjustedHours === 0) {
                adjustedHours = 12;
            }

            return `${adjustedHours}:${minutes} ${period}`;
        };

        const formattedStartTime = formatTime(startTime);
        const formattedEndTime = formatTime(endTime);

        return `${formattedStartTime} - ${formattedEndTime}`;
    };

    const getDuration = (startTime, endTime) => {
        const [startHours, startMinutes] = startTime.split(':').map(Number);
        const [endHours, endMinutes] = endTime.split(':').map(Number);

        const startDate = new Date(0, 0, 0, startHours, startMinutes, 0);
        const endDate = new Date(0, 0, 0, endHours, endMinutes, 0);

        let diff = endDate.getTime() - startDate.getTime();

        if (diff < 0) {
            diff += 24 * 60 * 60 * 1000; // Handle overnight difference
        }

        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

        if (hours > 0 && minutes > 0) {
            return `${hours}h ${minutes}m`;
        } else if (hours > 0) {
            return `${hours}h`;
        } else if (minutes > 0) {
            return `${minutes}m`;
        } else {
            return '-'; // In case of no difference
        }
    };

    const groupByDateTime = (list: any[]) => {
        return list.reduce((group, item) => {
            const key = `${item.Text5}-${item.SchoolwiseStandardExamScheduleId}`;
            if (!group[key]) group[key] = [];
            group[key].push(item);
            return group;
        }, {} as Record<string, any[]>);
    };

    const groupedSubList = groupByDateTime(SubList);
    console.log(groupedSubList, SubList, 'groupedSubList')

    const toggleAccordion = (index) => {
        setExpandedCardIndex(expandedCardIndex === index ? null : index);
    };
    const getClassName = () => {
        let returnVal = ""

        getstandard.map((item) => {
            if (item.Value == std)
                returnVal = item.Name
        })
        return returnVal;
    }
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

            {getExamlist.length === 0 ? (
                <Typography
                    variant="body1"
                    sx={{
                        textAlign: 'center',
                        marginTop: 4,
                        backgroundColor: '#324b84',
                        padding: 1,
                        borderRadius: 2,
                        color: 'white',
                    }}
                >
                    <b>Exam schedule is not available.</b>
                </Typography>
            ) : (
                // std !== '0' && 
                getExamlist && getExamlist.length > 0 && getExamlist.map((exam, index) => (
                    <Box key={index} sx={{ backgroundColor: 'white' }}>
                        <Box
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
                            onClick={() => toggleAccordion(index)}
                        >

                            <Box sx={{ width: '10px', height: '10px', p: 0.5, border: '1px solid black', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <Typography sx={{ color: 'black', fontSize: '16px', fontWeight: 'bold', p: 0.5, }}>
                                    {expandedCardIndex === index ? '-' : '+'}
                                </Typography>
                            </Box>
                            <Box sx={{ display: 'flex' }}>
                                <Typography variant="h6" sx={{ color: 'red', ml: 1 }}>
                                    <b>{exam.Text1}</b>
                                </Typography>
                                <Typography variant="h6" sx={{ ml: 1 }}>
                                    <b>{formatDate(exam.Text3)} To {formatDate(exam.Text4)}</b>
                                </Typography>
                            </Box>
                        </Box>

                        {expandedCardIndex === index ? (
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
                                        {Object.keys(groupedSubList).map((key, index) => {
                                            const items = groupedSubList[key].filter(item => item.SchoolwiseStandardExamScheduleId === exam.Schoolwise_Standard_Exam_Schedule_Id);
                                            const [date, startTime, endTime, examId] = key.split('-');
                                            const uniqueDates = new Set();

                                            return items.length > 0 ? (
                                                <TableRow key={index} sx={{ '& > *': { textAlign: 'center', pl: 0, pb: 0, py: 1 } }}>
                                                    <TableCell sx={{ textAlign: 'left', pl: 1, py: 1 }}>{items.Text5}</TableCell>
                                                    <TableCell sx={{ textAlign: 'center', py: 1 }}>{items.Text2 || '-'}</TableCell>
                                                    <TableCell sx={{ textAlign: 'center', py: 1 }}>{items.Text4 || '-'}</TableCell>

                                                    <TableCell sx={{ textAlign: 'center', py: 1 }}>
                                                        {items
                                                            .filter((item) => item.Standard_Name)
                                                            .map((item, idx, arr) => (
                                                                <p key={idx}>
                                                                    <div>{item.Text2 || '-'}</div>
                                                                    {idx !== arr.length - 1 && <div style={{ borderTop: '1px solid grey', margin: '4px 0' }} />}
                                                                </p>
                                                            ))}
                                                    </TableCell>
                                                    <TableCell sx={{ textAlign: 'center', py: 1 }}>
                                                        {items.length > 0 ? (
                                                            items.map((item, idx, arr) => (
                                                                <p key={idx}>
                                                                    <div>{item.Description || '-'}</div>
                                                                    {idx !== arr.length - 1 && <div style={{ borderTop: '1px solid grey', margin: '4px 0' }} />}
                                                                </p>
                                                            ))
                                                        ) : (
                                                            '-'
                                                        )}
                                                    </TableCell>


                                                </TableRow>
                                            ) : null;
                                        })}
                                        <TableRow>
                                            {std === '0' && (
                                                <TableCell colSpan={3} sx={{ py: 1 }}>
                                                    <b>Instructions : </b>
                                                </TableCell>
                                            )}

                                        </TableRow>
                                    </TableBody>

                                </Table>
                            </TableContainer>
                        ) : (
                            <samp></samp>
                        )
                        }
                    </Box >
                ))
            )}
        </Box >

    );
};

export default ViewExamSchedule;
