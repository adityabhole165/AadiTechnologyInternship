import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import {
    Box,
    IconButton,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Tooltip,
    Typography
} from '@mui/material';
import { grey } from '@mui/material/colors';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SuspenseLoader from 'src/layouts/components/SuspenseLoader';
import Dropdown from 'src/libraries/dropdown/Dropdown';
import { GetSelectStandardRes, ViewExamDataRess } from 'src/requests/TExamschedule/TExamschedule';
import { RootState } from 'src/store';
import CommonPageHeader from '../CommonPageHeader';

export const TExamScheduleNew = () => {
    const dispatch = useDispatch();

    const getstandard = useSelector(
        (state: RootState) => state.StandardAndExamList.SelectStandard
    );
    const getExamlist = useSelector(
        (state: RootState) => state.StandardAndExamList.ExamData
    );

    const SubList = useSelector(
        (state: RootState) => state.StandardAndExamList.VeiwAllData
    );
    const loading = useSelector(
        (state: RootState) => state.StandardAndExamList.Loading
    );

    const asAcademicYearId = sessionStorage.getItem('AcademicYearId');
    const asSchoolId = localStorage.getItem('localSchoolId');
    const RoleId = sessionStorage.getItem('RoleId');
    const asStandardId = sessionStorage.getItem('StandardId');

    const [std, setStd] = useState('0');
    const [selectedTestId, setSelectedTestId] = useState(null); // State to track selected test ID
    const [isLoaded, setIsLoaded] = useState(false);

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
        setSelectedTestId(null); // Reset selected test ID when standard changes
    };

    useEffect(() => {
        if (std !== '') {
            dispatch(ViewExamDataRess(ExamList_body));
            setIsLoaded(false);
        }
    }, [std]);

    useEffect(() => {
        if (getstandard.length > 0) {
            setStd(getstandard[0].id);
        }
    }, [getstandard]);

    useEffect(() => {
        if (!loading) {
            setIsLoaded(true);
        }
    }, [loading]);

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

    const handleTestNameClick = (testId) => {
        setSelectedTestId(testId === selectedTestId ? null : testId); // Toggle selected test ID
    };

    const classList = ['Nursery', 'Junior KG', 'Senior KG', ...Array.from({ length: 10 }, (_, i) => `${i + 1}`)];

    return (
        <Box sx={{ px: 2 }}>
            <CommonPageHeader
                navLinks={[
                    {
                        title: 'Exam Schedule',
                        path: ''
                    }
                ]}
                rightActions={<>
                    <Box sx={{ width: '200px', mr: 2 }}>
                        {RoleId !== '3' && (
                            <Dropdown
                                Array={getstandard}
                                handleChange={stdChange}
                                label={'Select Standard'}
                                size={'small'}
                                variant="outlined"
                                defaultValue={std} />
                        )}
                    </Box>
                    <Box>
                        <Tooltip title=" Examination Schedule for your class.">
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
                </>} />

            {SubList.length > 0 && getExamlist && getExamlist.length > 0 && getExamlist.map((exam, index) => (
                <Box
                    key={index}
                    sx={{
                        mt: 2,
                        cursor: 'pointer',
                        backgroundColor: selectedTestId === exam.Text2 ? '#FFC0CB' : 'transparent', // Highlight selected test name
                        padding: '7px',
                        border: '1px solid brown',
                        borderRadius: '3px',
                    }}
                    onClick={() => handleTestNameClick(exam.Text2)} // Pass the corresponding test ID on click
                >
                    <Typography variant="h6" sx={{ color: '#654321' }}>
                        <b>{exam.Text1}</b>
                        <b>{exam.Text3}</b>
                        <b>{exam.Text4}</b>
                    </Typography>
                </Box>
            ))}

            {selectedTestId && getExamlist.length > 0 ? (
                <Box sx={{ background: 'white', p: 2, mt: 2 }}>
                    {loading ? (
                        <SuspenseLoader />
                    ) : (
                        <TableContainer component={Paper}>
                            <Table>
                                <TableHead sx={{ background: '#87CEEB', '& > *': { color: 'white', fontWeight: 'bold' } }}>
                                    <TableRow>
                                        <TableCell>Date</TableCell>
                                        <TableCell>Time</TableCell>
                                        <TableCell>Duration</TableCell>
                                        {std === '0' && classList.map((className) => (
                                            <TableCell key={className}>{className}</TableCell>
                                        ))}
                                        {std !== '0' && <TableCell>Subject</TableCell>}
                                        {std !== '0' && <TableCell>Description</TableCell>}
                                    </TableRow>
                                </TableHead>

                                <TableBody>
                                    {SubList.map((item, index) => {
                                        const isDuplicateDate = uniqueDates.has(item.text3);
                                        uniqueDates.add(item.text3);

                                        return (
                                            <TableRow key={index}>
                                                <TableCell>{isDuplicateDate ? '' : (item.text3 || '-')}</TableCell>
                                                <TableCell>{getTime(item.startTime, item.endTime)}</TableCell>
                                                <TableCell>{item.startTime} - {item.endTime}</TableCell>
                                                {std === '0' ? (
                                                    classList.map((className) => (
                                                        <TableCell key={`${className}-${index}`}>
                                                            {item.Standard_Name === className ? item.header || '-' : '-'}
                                                        </TableCell>
                                                    ))
                                                ) : (
                                                    <>
                                                        <TableCell>{item.header || '-'}</TableCell>
                                                        <TableCell>{item.Description || '-'}</TableCell>
                                                    </>
                                                )}
                                            </TableRow>
                                        );
                                    })}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    )}
                </Box>
            ) : (
                !loading && isLoaded && getExamlist.length === 0 && (
                    <Typography variant="body1" sx={{ textAlign: 'center', marginTop: 4, backgroundColor: '#324b84', padding: 1, borderRadius: 2, color: 'white' }}>
                        <b>No exam has been scheduled.</b>
                    </Typography>
                )
            )}
        </Box>
    );
};
