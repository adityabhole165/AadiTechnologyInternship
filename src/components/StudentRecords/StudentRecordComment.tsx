import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Stack, TextField, Typography } from '@mui/material';
import { green, red } from '@mui/material/colors';
import { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import Datepicker1 from 'src/components/StudentRecords/DateField';
import TimeField from 'src/components/StudentRecords/TimeField';
import { AlertContext } from 'src/contexts/AlertContext';
import { IGetDeleteCommentBody, IGetSaveCommentBody } from 'src/interfaces/StudentRecords/IStudentRecordComment';
import ErrorMessage1 from 'src/libraries/ErrorMessages/ErrorMessage1';
import { DeleteCommentDetails, getSaveComment, resetDeleteHolidayDetails, resetSaveComment } from 'src/requests/StudentRecords/RequestStudentRecordComment';
import { RootState } from 'src/store';
import { getCalendarDateFormatDateNew } from '../Common/Util';

const StudentRecordComment = ({ open, setOpen, ClickCloseDialogbox }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const [Comment, setComment] = useState('');
    const [CommentError, setCommentError] = useState('');
    const [LectureNm, setLectureNm] = useState('');
    const [LectureNmError, setLectureNmError] = useState('');
    const [StartDate, setStartDate]: any = useState(getCalendarDateFormatDateNew(new Date()));
    const [EndDate, setEndDate]: any = useState(getCalendarDateFormatDateNew(new Date()));
    const [ErrorSrDateblank, setErrorSrDateblank] = useState('');
    const [Time, setTime] = useState(currentTime);
    const [TimeError, setTimeError] = useState('');
    const { showAlert, closeAlert } = useContext(AlertContext);
    const asSchoolId = Number(localStorage.getItem('localSchoolId'));
    const asAcademicYearId = Number(sessionStorage.getItem('AcademicYearId'));
    const asUserId = Number(localStorage.getItem('UserId'));

    const deleteCommentMsg = useSelector(
        (state: RootState) => state.StudentRecordCommentPopup.DeleteCommentMsg
    );

    const Savecomment = useSelector(
        (state: RootState) => state.StudentRecordCommentPopup.SaveComment
    );

    const ClickCancel = () => {

    }

    const SaveCommentBody: IGetSaveCommentBody = {
        asSchoolId: Number(asSchoolId),
        asAcademicYearId: Number(asAcademicYearId),
        asSchoolwiseStudentId: 6039,
        asCommentId: 0,
        asDate: StartDate,
        asComment: Comment,
        asLectureName: LectureNm,
        asUpdatedById: Number(asUserId),
        asIsDeleteAction: false,
        asAllowSubmit: false, /*true - save and submit comment */
        asStdDivId: 1344,
    };
    const deleteComment = () => {
        const DeleteCommentBody: IGetDeleteCommentBody = {
            asSchoolId: Number(asSchoolId),
            asAcademicYearId: Number(asAcademicYearId),
            asSchoolwiseStudentId: 6039,
            asCommentId: 3280,
            asUpdatedById: Number(asUserId),  /*4463*/
            asIsDeleteAction: false,
            asAllowSubmit: true
        };

        showAlert({
            title: 'Please Confirm',
            message:
                'Are you sure you want to delete this holiday?  ',
            variant: 'warning',
            confirmButtonText: 'Confirm',
            cancelButtonText: 'Cancel',
            onCancel: () => {
                closeAlert();
            },
            onConfirm: () => {
                dispatch(DeleteCommentDetails(DeleteCommentBody));
                closeAlert();
            }
        });


    };

    useEffect(() => {
        if (deleteCommentMsg != '') {
            toast.success(deleteCommentMsg)
            dispatch(resetDeleteHolidayDetails());
            // dispatch(getHolidaysF(body));
        }
    }, [deleteCommentMsg])
    useEffect(() => {
        if (Savecomment != '') {
            toast.success(Savecomment)
            dispatch(resetSaveComment());
        }
    }, [Savecomment])
    const onSelectSrDate = (value) => {
        setStartDate(value);
    };

    const clickTime = (value) => {
        setTime(value);
    };

    const ResetForm = () => {
        setComment('');
        setLectureNm('');
        setTime(currentTime);
    };
    const handleDialogClose = () => {
        ResetForm();
        ClickCloseDialogbox();
    }
    const ClickOk = () => {
        let isError = false;
        if (Comment === '') {
            setCommentError('Comment should not be blank.');
            isError = true;
        } else {
            setCommentError('');
        }

        if (LectureNm === '') {
            setLectureNmError('Lecture Name should not be blank.');
            isError = true;
        } else {
            setLectureNmError('');
        }

        // const timePattern = /^([01]\d|2[0-3]):([0-5]\d)$/;
        // if (!timePattern.test(Time)) {
        //     setTimeError('Time should be in HH:MM AM/PM format (e.g 10:00 AM).');
        //     isError = true;
        // } else {
        //     setTimeError('');
        // }
        if (!isError) {
            dispatch(getSaveComment(SaveCommentBody));
        }
        if (!isError) {
            setOpen(false);
        }

    };

    return (
        <Dialog
            open={open}
            onClose={() => setOpen(false)}
            fullWidth
            maxWidth={'sm'}
        >
            <DialogTitle
                sx={{
                    backgroundColor: '#324b84',
                    py: 1,
                }}
            >
                <Typography variant={"h4"} sx={{ mb: 1, color: 'white' }}>
                    Student Record Comment
                </Typography>
            </DialogTitle>
            <DialogContent dividers sx={{ px: 4 }}>
                <Grid container spacing={1} alignItems="center">
                    <Grid item xs={6} md={4}>
                        <Datepicker1
                            DateValue={StartDate}
                            onDateChange={onSelectSrDate}
                            label={'Date'}
                            size={"medium"}
                        />
                        <ErrorMessage1 Error={ErrorSrDateblank} />
                    </Grid>
                    <Grid item xs={6} md={4}>

                        <TimeField Item={Time} label={'Time'} ClickItem={clickTime} size={'medium'} tooltipMessage={'Time'} />
                        {TimeError && <Typography color="error">{TimeError}</Typography>}
                    </Grid>
                </Grid>
                <Box sx={{ pt: 2, background: 'white' }}>

                    <Grid item xs={12}>
                        <TextField
                            rows={3}
                            value={Comment}
                            label={<>
                                Commment <span style={{ color: 'red' }}>*</span>
                            </>}
                            onChange={(e) => setComment(e.target.value)}
                            sx={{ width: '100%' }}
                            error={CommentError !== ''}
                            helperText={CommentError}
                            inputProps={{ maxLength: 100 }}
                        />

                    </Grid>

                    <Grid item xs={12} sx={{ pt: 2, }} >
                        <TextField
                            rows={1}
                            value={LectureNm}
                            label={<>
                                Lecture Name <span style={{ color: 'red' }}>*</span>
                            </>}
                            onChange={(e) => setLectureNm(e.target.value)}
                            sx={{ width: '100%' }}
                            error={LectureNmError !== ''}
                            helperText={LectureNmError}
                            inputProps={{ maxLength: 50 }}
                        />
                    </Grid>

                </Box>
            </DialogContent>
            <DialogActions sx={{ py: 2, px: 3 }}>
                <Grid item xs={12} md={12}>
                    <Stack direction={"row"} gap={2} alignItems={"center"}>
                        <Button sx={{
                            color: 'green',
                            ':hover': { backgroundColor: green[100] }
                        }} onClick={ClickOk}>
                            Save
                        </Button>
                        <Button sx={{
                            color: 'green',
                            ':hover': { backgroundColor: green[100] }
                        }} onClick={ClickOk}>
                            Save and Submit
                        </Button>
                        <Button sx={{
                            color: 'red',
                            ':hover': { backgroundColor: red[100] }
                        }} onClick={deleteComment}>
                            Delete
                        </Button>
                        <Button sx={{
                            color: 'red',
                            ':hover': { backgroundColor: red[100] }
                        }} onClick={handleDialogClose}>
                            Cancel
                        </Button>
                    </Stack>
                </Grid>
            </DialogActions>

        </Dialog>
    );
};

export default StudentRecordComment;
