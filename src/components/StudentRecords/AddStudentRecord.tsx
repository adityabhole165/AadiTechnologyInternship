import { AddComment, Check, QuestionMark, Save, Send } from '@mui/icons-material';
import { Box, Grid, IconButton, Table, TableBody, TableCell, TableHead, TableRow, Tooltip, Typography } from '@mui/material';
import { blue, green, grey, red } from '@mui/material/colors';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { IGetStudentRecordDataBody, IMarkRecordAsReadBody, ISubmitStudentRecordBody } from 'src/interfaces/StudentRecords/IAddStudentRecords';
import Datepicker from 'src/libraries/DateSelector/Datepicker';
import ErrorMessage1 from 'src/libraries/ErrorMessages/ErrorMessage1';
import { GetMarkRecordAsRead, GetStudentRecordData, GetSubmitStudentRecord } from 'src/requests/StudentRecords/RequestAddStudentRecords';
import { RootState } from 'src/store';
import CommonPageHeader from '../CommonPageHeader';
import AddStudentRAccordionList from './AddStudentRAccordionList';
import StudentRecordComment from './StudentRecordComment';
const AddStudentRecord = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { Action, SchoolWiseStudentIdparam, SelectTeacher } = useParams()
    const [Open, setOpen] = useState(false);
    const [errorMessage, seterrorMessage] = useState('')
    const [exampleLessonDetails, setExampleLessonDetails] = useState([])
    const [ADate, setADate]: any = useState(new Date().toISOString().split('T')[0]);
    const [dateError, setDateError] = useState('');
    const asSchoolId = Number(localStorage.getItem('localSchoolId'));
    const asAcademicYearId = Number(sessionStorage.getItem('AcademicYearId'));
    const asUserId = Number(localStorage.getItem('UserId'));
    const listGeneralDetailsUS = useSelector(
        (state: RootState) => state.AddStudentRecords.listGeneralDetails
    );
    console.log(listGeneralDetailsUS, "listGeneralDetails");
    const listSiblingsDetailsUS = useSelector(
        (state: RootState) => state.AddStudentRecords.listSiblingsDetails
    )
    console.log(listSiblingsDetailsUS, "listSiblingsDetails");

    useEffect(() => {
        dispatch(GetStudentRecordData(GetStudentRecordDataResult));
    }, []);

    useEffect(() => {
        dispatch(GetSubmitStudentRecord(Getsubmitstudentrecord))
    }, []);
    useEffect(() => {
        dispatch(GetMarkRecordAsRead(GetMarkRecordAsReadResult))
    }, []);
    const GetMarkRecordAsReadResult: IMarkRecordAsReadBody = {
        asSchoolId: asSchoolId,
        asAcademicYearId: asAcademicYearId,
        asUserId: asUserId,
        asSchoolwiseStudentId: Number(SchoolWiseStudentIdparam)
    }

    const Getsubmitstudentrecord: ISubmitStudentRecordBody = {
        asSchoolId: 18,
        asUpdatedById: 3799,
        asSchoolwiseStudentId: 6130,
        asCommentId: 0,
        asSubmitAllComments: "false",
        asAcademicYearId: 54
    }
    const GetStudentRecordDataResult: IGetStudentRecordDataBody = {
        asSchoolId: asSchoolId,
        asSchoolwiseStudentId: Number(SchoolWiseStudentIdparam),
        asAcademicYearId: asAcademicYearId,
        asIsReadMode: "false",
        asUserId: asUserId

    }

    const ClickOpenDialogbox = () => {
        setOpen(true);
    };
    const ClickCloseDialogbox = () => {
        setOpen(false);
    };
    const onClickSave = () => {
    };
    const onClickSubmit = () => {
    };
    const onTextChange = (value) => {
        setExampleLessonDetails(value)

    }
    const IsEditingAllowed = () => {
    }

    const onClickSubmitComment = () => {
    };
    const handleDateChange = (selectedDate: string) => {
        let isError = false;
        // if (!selectedDate) {
        //     setADate(''); // Reset AssignedDate state if needed
        //     return;
        setADate(selectedDate);
        // Update dateState with selectedDate
        if (selectedDate && dateError !== '') {
            setDateError('');
        } else {
            const selectedDate = new Date(ADate);
            const currentDate = new Date();

            if (selectedDate > currentDate) {
                setDateError('Future date is not allowed.');
                isError = true;
            } else {
                setDateError('');
                console.log('Saving data...', ADate);
            }

        }

    };

    const cellStyle = {
        padding: '0.2em 1.5em', // Adjust these values to reduce the height
    };
    const rowStyle = {
        height: '0.5em 1.5em', // Ensure auto height to adjust based on content
    };

    return (
        <Box sx={{ px: 2 }} maxWidth="xl">
            <CommonPageHeader
                navLinks={[
                    {
                        title: 'Student Record List',
                        path: '/extended-sidebar/Teacher/StudentRecords'
                    },
                    {
                        title: 'Student Record',
                        path: ''
                    }
                ]}
                rightActions={
                    <>
                        <Datepicker
                            DateValue={ADate}
                            onDateChange={handleDateChange}
                            label={'Date'}
                            size={"small"}

                        />
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Tooltip title={"Add / Submit student details."}>
                                <IconButton
                                    sx={{
                                        color: 'white',
                                        backgroundColor: grey[500],
                                        height: '36px !important',
                                        ':hover': { backgroundColor: grey[600] },
                                        marginRight: '-4px',
                                        // marginLeft: '8px', 
                                    }}
                                >
                                    <QuestionMark />
                                </IconButton>
                            </Tooltip>
                        </Box>
                        < Box >
                            <Tooltip title={'SAVE'}>
                                <IconButton
                                    sx={{
                                        backgroundColor: green[500],
                                        color: 'white',
                                        '&:hover': {
                                            backgroundColor: green[600]
                                        }
                                    }}
                                    onClick={onClickSave}
                                >
                                    <Save />
                                </IconButton>
                            </Tooltip>
                        </Box>
                        <Box>
                            <Tooltip title={'SUBMIT'}>
                                <IconButton
                                    sx={{
                                        backgroundColor: green[500],
                                        color: 'white',
                                        '&:hover': {
                                            backgroundColor: green[600]
                                        }
                                    }}
                                    onClick={onClickSubmit}
                                >
                                    <Check />
                                </IconButton>
                            </Tooltip>
                        </Box>
                        <Box>
                            <Tooltip title={'ADD COMMENT'}>
                                <IconButton
                                    sx={{
                                        backgroundColor: blue[500],
                                        color: 'white',
                                        '&:hover': {
                                            backgroundColor: blue[600]
                                        }
                                    }}
                                    onClick={ClickOpenDialogbox}
                                >
                                    <AddComment />
                                </IconButton>
                            </Tooltip>
                        </Box>
                        <Box>
                            <Tooltip title={'SUBMIT COMMENT'}>
                                <IconButton
                                    sx={{
                                        backgroundColor: red[500],
                                        color: 'white',
                                        '&:hover': {
                                            backgroundColor: red[600]
                                        }
                                    }}
                                    onClick={onClickSubmitComment}
                                >
                                    <Send />
                                </IconButton>
                            </Tooltip>
                        </Box>
                    </>
                }
            />
            <Grid item xs={12}>
                <Typography variant={"h5"} sx={{ color: 'red' }}>
                    {dateError && (
                        <Box sx={{ mt: 1, position: 'absolute', bottom: '-25px' }}>
                            <ErrorMessage1 Error={dateError}></ErrorMessage1>
                        </Box>
                    )}
                </Typography>
            </Grid>
            <Box mb={1} sx={{ p: 1, color: 'red', background: 'white', fontWeight: 'bold' }}>
                The following information is for professional use and will be handled confidentially. This information will assist the counsellor for the child's evaluation.<br></br>
                Please complete the following questions as fully and accurately as possible. If you are unable to complete a question you may consult other subject teachers for the better understanding of the child.
            </Box>
            <Box mb={1} sx={{ p: 1, background: 'white' }}>
                <Typography variant="h4" align="center" color="blue" sx={{ textAlign: 'center', marginTop: 1, backgroundColor: '#324b84', padding: 1, borderRadius: 2, color: 'white' }} >
                    General Information
                </Typography>
            </Box>
            <Box mb={1} sx={{ p: 1, background: 'white' }}>
                <Table>
                    <TableBody>
                        {listGeneralDetailsUS.map((item, i) => (
                            <React.Fragment key={i}>
                                <TableRow sx={{ ...rowStyle, bgcolor: 'white' }}>
                                    <TableCell><b>Name of the student:</b> {item.Text1}</TableCell>
                                    <TableCell sx={cellStyle}><b>Date of Birth:</b> {item.Text2}</TableCell>
                                </TableRow>
                                <TableRow sx={rowStyle}>
                                    <TableCell sx={cellStyle} colSpan={2}><b>Family Details</b></TableCell>
                                </TableRow>
                                <TableRow sx={{ ...rowStyle, bgcolor: 'white' }}>
                                    <TableCell sx={cellStyle}><b>Mother Name:</b> {item.Text3}</TableCell>
                                    <TableCell sx={cellStyle}><b>Mother Occupation:</b> {item.Text6}</TableCell>
                                </TableRow>
                                <TableRow sx={{ ...rowStyle, bgcolor: 'white' }}>
                                    <TableCell sx={cellStyle}><b>Father Name:</b> {item.Text4}</TableCell>
                                    <TableCell sx={cellStyle}><b>Father Occupation:</b> {item.Text5}</TableCell>
                                </TableRow>
                                <TableRow sx={rowStyle}>
                                    <TableCell sx={cellStyle} colSpan={2}><b>Please list all siblings</b></TableCell>
                                </TableRow>
                            </React.Fragment>
                        ))}

                        <Table sx={{ minWidth: 500, width: '70%', height: 'auto' }} aria-label="simple table">
                            <TableHead>
                                <TableRow sx={{ ...rowStyle, backgroundColor: '#324b84' }}>
                                    <TableCell align="center" style={{ border: '1px solid black', color: 'white', ...cellStyle }}>Name</TableCell>
                                    <TableCell align="center" style={{ border: '1px solid black', color: 'white', ...cellStyle }}>Sex</TableCell>
                                    <TableCell align="center" style={{ border: '1px solid black', color: 'white', ...cellStyle }}>Age</TableCell>
                                    <TableCell align="center" style={{ border: '1px solid black', color: 'white', ...cellStyle }}>Grade</TableCell>

                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {listSiblingsDetailsUS.map((item, i) => (
                                    <TableRow>
                                        <TableCell align="center" style={{ border: '1px solid black', ...cellStyle }}>{item.Text1}</TableCell>
                                        <TableCell align="center" style={{ border: '1px solid black', ...cellStyle }}>{item.Text2}</TableCell>
                                        <TableCell align="center" style={{ border: '1px solid black', ...cellStyle }}>{item.Text3}</TableCell>
                                        <TableCell align="center" style={{ border: '1px solid black', ...cellStyle }}>{item.Text4}</TableCell>

                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableBody>
                </Table>
            </Box>
            <AddStudentRAccordionList exampleStudentRDetails={exampleLessonDetails}
                onTextChange={onTextChange} Action={Action}
                IsEditingAllowed={IsEditingAllowed()} />
            <Box sx={{ display: 'flex', justifyContent: 'flex-start', gap: '8px' }}>
                {Open && (
                    <StudentRecordComment
                        open={Open}
                        setOpen={setOpen}
                        ClickCloseDialogbox={ClickCloseDialogbox}
                    />
                )}
            </Box>
        </Box>
    )
};

export default AddStudentRecord;