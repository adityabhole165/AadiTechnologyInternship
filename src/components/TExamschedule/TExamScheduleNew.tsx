import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import { Box, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SuspenseLoader from 'src/layouts/components/SuspenseLoader';
import Dropdown from 'src/libraries/dropdown/Dropdown';
import { GetSelectStandardRes, ViewExamDataRess } from 'src/requests/TExamschedule/TExamschedule';
import { RootState } from 'src/store';
import CommonPageHeader from '../CommonPageHeader';

const TExamScheduleNew = () => {
    const dispatch = useDispatch();

    const getstandard = useSelector((state: RootState) => state.StandardAndExamList.SelectStandard);
    const getExamlist = useSelector((state: RootState) => state.StandardAndExamList.ExamData);
    const SubList = useSelector((state: RootState) => state.StandardAndExamList.VeiwAllData);
    const loading = useSelector((state: RootState) => state.StandardAndExamList.Loading);
    const asAcademicYearId = sessionStorage.getItem('AcademicYearId');
    const asSchoolId = localStorage.getItem('localSchoolId');
    const RoleId = sessionStorage.getItem('RoleId');
    const asStandardId = sessionStorage.getItem('StandardId');

    const [std, setStd] = useState('0');
    const [expandedCardIndex, setExpandedCardIndex] = useState(null);

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
        dispatch(GetSelectStandardRes(getstandardList_body));
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
            dispatch(ViewExamDataRess(ExamList_body));
        }
    }, [std]);

    useEffect(() => {
        if (getstandard.length > 0) {
            setStd(getstandard[0].id);
            setExpandedCardIndex(0);
        }
    }, [getstandard]);

    const classInstructions = {};
    SubList.forEach((item) => {
        if (!classInstructions[item.Standard_Name]) {
            classInstructions[item.Standard_Name] = {};
        }
        classInstructions[item.Standard_Name][item.text1] = item.Instructions || '-';
    });

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

    // const getDuration = (startTime, endTime) => {
    //     const [startHours, startMinutes] = startTime.split(':').map(Number);
    //     const [endHours, endMinutes] = endTime.split(':').map(Number);

    //     const startDate = new Date(0, 0, 0, startHours, startMinutes, 0);
    //     const endDate = new Date(0, 0, 0, endHours, endMinutes, 0);

    //     let diff = endDate.getTime() - startDate.getTime();

    //     if (diff < 0) {
    //         diff += 24 * 60 * 60 * 1000;
    //     }

    //     const hours = Math.floor(diff / (1000 * 60 * 60));
    //     const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

    //     return `${hours}h ${minutes}m`;
    // };

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

    const classList = ['Nursery', 'Junior KG', 'Senior KG', ...Array.from({ length: 10 }, (_, i) => `${i + 1}`)];

    const getExamName = () => {
        if (getExamlist && getExamlist.length > 0) {
            return getExamlist[0].Text1;
        }
        return '';
    };

    const groupByDateTime = (list) => {
        const grouped = {};
        list.forEach((item) => {
            const key = `${item.text3}-${item.startTime}-${item.endTime}-${item.text1}`;
            if (!grouped[key]) {
                grouped[key] = [];
            }
            grouped[key].push(item);
        });
        return grouped;
    };

    const groupedSubList = groupByDateTime(SubList);

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
        <Box sx={{ px: 2 }}>
            <CommonPageHeader
                navLinks={[
                    {
                        title: 'Exam Schedule',
                        path: ''
                    }
                ]}
                rightActions={
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        {RoleId !== '3' && (
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
                        )}
                        <Tooltip title="Displays standardwise exam schedule.">
                            <IconButton sx={{
                                color: 'white',
                                backgroundColor: grey[500],
                                '&:hover': {
                                    backgroundColor: grey[600]
                                }
                            }}>
                                <QuestionMarkIcon />
                            </IconButton>
                        </Tooltip>

                    </Box>
                }
            />

            {getExamlist && getExamlist.length > 0 && getExamlist.map((exam, index) => (
                <Box key={index}>
                    <Box
                        sx={{
                            mt: 1, // Reduced margin-top
                            cursor: 'pointer',
                            backgroundColor: 'whitesmoke',
                            padding: '2px',
                            border: '1px solid White',
                            borderRadius: '2px',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            width: '100%',
                        }}
                        onClick={() => toggleAccordion(index)}
                    >
                        <Box sx={{ display: 'flex', alignItems: 'center', pl: 0.5 }}>
                            <Box sx={{ width: '10px', height: '10px', p: 0.5, border: '1px solid black', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <Typography sx={{ color: 'Black', fontSize: '16px', fontWeight: 'bold', p: 1 }}>
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
                    </Box>

                    {expandedCardIndex === index && (
                        <Box sx={{ background: 'white', p: 1 }}>
                            {loading ? (
                                <SuspenseLoader />
                            ) : (
                                <TableContainer component={Paper} sx={{ width: '100%', overflowX: 'auto' }}>
                                    <Table sx={{ minWidth: 640 }}>
                                        <TableHead sx={{
                                            background: '#19bed4', '& > *': {
                                                color: 'white', fontWeight: 'bold', textAlign: 'center', // Center align headers
                                            }
                                        }}>
                                            <TableRow
                                                sx={{
                                                    '& > *': {
                                                        borderBottom: '1px solid white',
                                                        textAlign: 'center', // Center align headers
                                                        color: 'white'
                                                    },
                                                    '& > :not(:first-of-type)': {
                                                        borderLeft: '1px solid white',
                                                        color: 'white',
                                                        textAlign: 'center'
                                                    }
                                                }}>
                                                <TableCell sx={{ width: '14%', textAlign: 'left', pl: 1, color: 'white' }}>Date</TableCell>
                                                <TableCell sx={{ width: '10%', textAlign: 'center', }}>Time</TableCell>
                                                <TableCell sx={{ width: '6%', textAlign: 'center',  }}>Duration</TableCell>
                                                {std === '0' && classList.map((className, index) => (
                                                    <TableCell key={index} sx={{ textAlign: 'center', p: 1 }}>{className}</TableCell>
                                                ))}
                                                {std !== '0' && <TableCell sx={{ width: '8%', textAlign: 'center', }}>Subject</TableCell>}
                                                {std !== '0' && <TableCell sx={{ width: '20%', textAlign: 'center', }}>Description</TableCell>}
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {Object.keys(groupedSubList).map((key, index) => {
                                                const items = groupedSubList[key].filter(item => item.text1 === exam.Text2);
                                                const [date, startTime, endTime, examId] = key.split('-');
                                                const uniqueDates = new Set();

                                                return items.length > 0 ? (
                                                    <TableRow key={index} sx={{ '& > *': { textAlign: 'center', pl: 0, pb: 0, py:1 } }}>
                                                        <TableCell sx={{ textAlign: 'left' , pl: 1, py:1}}>{uniqueDates.has(date) ? '' : date}</TableCell>
                                                        <TableCell sx={{ textAlign: 'center', py:1}}>{getTime(startTime, endTime) || '-'}</TableCell>
                                                        <TableCell sx={{ textAlign: 'center', py:1 }}>{getDuration(startTime, endTime) || '-'}</TableCell>
                                                        {std === '0' ? (
                                                            classList.map((className) => (

                                                                <TableCell key={`${className}-${index}`} sx={{
                                                                    textAlign: 'center',
                                                                    whiteSpace: 'pre-line',
                                                                    py:1
                                                                }}>
                                                                    {items
                                                                        .filter((item) => item.Standard_Name === className)
                                                                        .map((item, idx, arr) => (
                                                                            <p key={idx}>
                                                                                <div>{item.header || '-'}</div>
                                                                                {idx !== arr.length - 1 && <div style={{ borderTop: '1px solid grey', margin: '5px ' }} />}
                                                                            </p>
                                                                        ))}
                                                                    {/* Display '-' if no items match the className */}
                                                                    {items.filter((item) => item.Standard_Name === className).length === 0 && '-'}
                                                                </TableCell>

                                                            ))
                                                        ) : (
                                                            <>
                                                                <TableCell sx={{ textAlign: 'center', py:1 }}>
                                                                    {items
                                                                        .filter((item) => item.Standard_Name)
                                                                        .map((item, idx, arr) => (
                                                                            <p key={idx}>
                                                                                <div>{item.header || '-'}</div>
                                                                                {idx !== arr.length - 1 && <div style={{ borderTop: '1px solid grey', margin: '4px 0' }} />}
                                                                            </p>
                                                                        ))}
                                                                </TableCell>
                                                                <TableCell sx={{ textAlign: 'center', py:1 }}>
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


                                                            </>
                                                        )}
                                                    </TableRow>
                                                ) : null;
                                            })}
                                            <TableRow>
                                                {std === '0' && (
                                                    <TableCell colSpan={3} sx={{py:1}}>
                                                        <b>Instructions : </b>
                                                    </TableCell>
                                                )}
                                                {std !== '0' && (
                                                    <TableCell colSpan={3} sx={{py:1}}>
                                                        <Typography sx={{ color: 'darkblue' }}>
                                                            <b>Instructions : </b>
                                                            {classInstructions[getClassName()] == undefined ? "" :
                                                                classInstructions[getClassName()][exam.Text2]}
                                                        </Typography>
                                                    </TableCell>
                                                )}
                                                {std === '0' ? (
                                                    classList.map((className) => (
                                                        <TableCell key={className} sx={{ textAlign: 'center', py:1 }}>
                                                            <Typography sx={{ color: '#223354' }}>
                                                                {classInstructions[className] && classInstructions[className][exam.Text2] || '-'}
                                                            </Typography>
                                                        </TableCell>
                                                    ))
                                                ) : (
                                                    <TableCell colSpan={3} sx={{ textAlign: 'center', py:1 }}>
                                                        <Typography sx={{ color: '#223354' }}>
                                                            {classInstructions[std] && classInstructions[std][exam.Text2]}
                                                        </Typography>
                                                    </TableCell>
                                                )}
                                            </TableRow>
                                        </TableBody>


                                    </Table>
                                </TableContainer>
                            )}
                        </Box>
                    )}
                </Box>
            ))}

            {!loading && getExamlist.length === 0 && (
                <Typography variant="body1" sx={{ textAlign: 'center', marginTop: 4, backgroundColor: '#324b84', padding: 1, borderRadius: 2, color: 'white' }}>
                    <b>No exam has been scheduled.</b>
                </Typography>
            )}

        </Box>
    );
};

export default TExamScheduleNew;






