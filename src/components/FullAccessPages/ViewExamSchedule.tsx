import { QuestionMark } from '@mui/icons-material';
import { Box, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Dropdown from 'src/libraries/dropdown/Dropdown';
import { GetStandardRes, NewExamSchedule } from 'src/requests/TExamschedule/TExamschedule';
import { RootState } from 'src/store';
import { extractTimenew, getDateMonthYear } from '../Common/Util';
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

    const loading = useSelector((state: RootState) => state.StandardAndExamList.Loading);

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


    const toggleAccordion = (index) => {
        setExpandedCardIndex(expandedCardIndex === index ? null : index);
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

            {std !== '0' && SubList.length === 0 ? (
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

                getExamlist && getExamlist.length > 0 && getExamlist.map((exam, index) => {

                    const filteredSubList = SubList.filter(item => item.SchoolwiseStandardExamScheduleId === exam.Schoolwise_Standard_Exam_Schedule_Id);
                    const instruction = filteredSubList.find(item => item.Description)?.Description || '';
                    return filteredSubList.length > 0 ? (
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
                                    <Typography sx={{ color: 'black', fontSize: '16px', fontWeight: 'bold', p: 0.5 }}>
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
                                <TableContainer component={Box} sx={{ width: '100%', overflowX: 'auto' }}>
                                    <Table aria-label="simple table" sx={{ border: (theme) => `1px solid ${theme.palette.grey[300]}`, overflow: 'hidden' }}>
                                        <TableHead>
                                            <TableRow sx={{ background: (theme) => theme.palette.secondary.main, color: (theme) => theme.palette.common.white, py: 1 }}>
                                                <TableCell sx={{ color: 'white' }}><strong>Exam Date</strong></TableCell>
                                                <TableCell sx={{ color: 'white' }}><strong>Subject</strong></TableCell>
                                                <TableCell sx={{ textAlign: 'center', color: 'white' }}><strong>Exam Type</strong></TableCell>
                                                <TableCell sx={{ textAlign: 'center', color: 'white' }}><strong>Start Time</strong></TableCell>
                                                <TableCell sx={{ textAlign: 'center', color: 'white' }}><strong>End Time</strong></TableCell>
                                                <TableCell sx={{ textAlign: 'center', color: 'white' }}><strong>Total Time</strong></TableCell>
                                                <TableCell sx={{ textAlign: 'left', color: 'white' }}><strong>Description</strong></TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>

                                            {filteredSubList.map((item, idx) => (
                                                <TableRow key={idx} sx={{ '& > *': { textAlign: 'center', pl: 0, pb: 0, py: 1 } }}>
                                                    <TableCell sx={{ textAlign: 'left', pl: 1, py: 1 }}>{getDateMonthYear(item.Text5) || '-'}</TableCell>
                                                    <TableCell sx={{ textAlign: 'left', py: 1 }}>{item.Text2 || '-'}</TableCell>
                                                    <TableCell sx={{ textAlign: item.Text4 ? 'left' : 'center', py: 1 }}>{item.Text4 || '-'}</TableCell>
                                                    <TableCell sx={{ textAlign: 'center', py: 1 }}>{extractTimenew(item.Text5) || '-'}</TableCell>
                                                    <TableCell sx={{ textAlign: 'center', py: 1 }}>{extractTimenew(item.Text6) || '-'}</TableCell>
                                                    <TableCell sx={{ textAlign: 'center', py: 1 }}>{item.TotalTime || '-'}</TableCell>
                                                    <TableCell sx={{ textAlign: 'left', py: 1, ...(item.Description ? '' : { pl: 6 }) }}>{item.Description || '-'}</TableCell>
                                                </TableRow>

                                            ))}

                                        </TableBody>
                                    </Table>
                                </TableContainer>

                            ) : null}
                        </Box>
                    ) : null;
                })
            )}

        </Box >

    );
};

export default ViewExamSchedule;
