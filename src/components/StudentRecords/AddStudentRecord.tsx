import { AddComment, Check, QuestionMark, Save, Send } from '@mui/icons-material';
import { Box, IconButton, Tooltip, Typography } from '@mui/material';
import { blue, green, grey, red } from '@mui/material/colors';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IGetStudentRecordDataBody } from 'src/interfaces/StudentRecords/IAddStudentRecords';
import Datepicker from 'src/libraries/DateSelector/Datepicker';
import { GetStudentRecordData } from 'src/requests/StudentRecords/RequestAddStudentRecords';
import { RootState } from 'src/store';
import CommonPageHeader from '../CommonPageHeader';
const AddStudentRecord = () => {
    const dispatch = useDispatch();
    const [ADate, setADate]: any = useState(new Date().toISOString().split('T')[0]);
    const listGeneralDetailsUS = useSelector(
        (state: RootState) => state.AddStudentRecords.listGeneralDetails
    );
    console.log(listGeneralDetailsUS, "listGeneralDetails");

    useEffect(() => {
        dispatch(GetStudentRecordData(GetStudentRecordDataResult));
    }, []);
    const GetStudentRecordDataResult: IGetStudentRecordDataBody = {
        asSchoolId: 18,
        asSchoolwiseStudentId: 5392,
        asAcademicYearId: 54,
        asIsReadMode: "false",
        asUserId: 3799

    }

    const onClickSave = () => {
    };
    const onClickSubmit = () => {
    };
    const onClickAddComment = () => {
    };

    const onClickSubmitComment = () => {
    };
    const handleDateChange = (selectedDate: string) => {
        if (!selectedDate) {
            setADate(''); // Reset AssignedDate state if needed
            return;
        }
    }

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
                                    onClick={onClickAddComment}
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
            /><Box mb={1} sx={{ p: 1, color: 'red', background: 'white', fontWeight: 'bold' }}>
                The following information is for professional use and will be handled confidentially. This information will assist the counsellor for the child's evaluation.<br></br>
                Please complete the following questions as fully and accurately as possible. If you are unable to complete a question you may consult other subject teachers for the better understanding of the child.
            </Box>
            <Box mb={1} sx={{ p: 1, background: 'white' }}>
                <Typography variant="h4" align="center" color="blue" sx={{ textAlign: 'center', marginTop: 1, backgroundColor: '#324b84', padding: 1, borderRadius: 2, color: 'white' }} >
                    General Information
                </Typography>
            </Box>
        </Box>
    )
};

export default AddStudentRecord;