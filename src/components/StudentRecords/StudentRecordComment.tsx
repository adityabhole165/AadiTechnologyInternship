import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Stack, Typography } from '@mui/material';
import { green, red } from '@mui/material/colors';
import { ClearIcon } from '@mui/x-date-pickers';
import { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import Datepicker1 from 'src/components/StudentRecords/DateField';
import TimeField from 'src/components/StudentRecords/TimeField';
import { AlertContext } from 'src/contexts/AlertContext';
import { IGetStudentRecordCommentBody } from 'src/interfaces/StudentRecords/IAddStudentRecords';
import { IGetDeleteCommentBody, IGetSaveandSubmitCommentBody, IGetSaveCommentBody } from 'src/interfaces/StudentRecords/IStudentRecordComment';
import ErrorMessage1 from 'src/libraries/ErrorMessages/ErrorMessage1';
import { GetStudentRecordCommentEdit } from 'src/requests/StudentRecords/RequestAddStudentRecords';
import { DeleteCommentDetails, getSaveandSubmitComment, getSaveComment, resetDeleteHolidayDetails, resetSaveandSubmitComment, resetSaveComment } from 'src/requests/StudentRecords/RequestStudentRecordComment';
import { RootState } from 'src/store';
import { ResizableTextField } from '../AddSchoolNitice/ResizableDescriptionBox';
import { getCalendarDateFormatDateNew } from '../Common/Util';

const StudentRecordComment = ({ open, setOpen, ClickCloseDialogbox, CommentId, SchoolWiseStudentIdparam }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    // const { Id } = useParams();
    console.log(CommentId, "CommentId");

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
    const SaveandSubmitcommentUS = useSelector(
        (state: RootState) => state.StudentRecordCommentPopup.SaveandSubmitComment
    );
    const Editcomment = useSelector(
        (state: RootState) => state.AddStudentRecords.getstudentrecordcomment
    );
    console.log(Editcomment, "Editcomment");
    const listCommentDetailsUS = useSelector(
        (state: RootState) => state.AddStudentRecords.listCommentDetails
    );
    const ClickCancel = () => {

    }
    const GetStudentRecordCommentEditResult: IGetStudentRecordCommentBody = {
        asSchoolId: asSchoolId,
        asSchoolwiseStudentId: Number(SchoolWiseStudentIdparam),
        asCommentId: Number(CommentId)    /* 3279*/

    }
    useEffect(() => {
        if (Editcomment != null) {
            setStartDate(Editcomment.Date);
            setComment(Editcomment.Comment);
            setLectureNm(Editcomment.LectureName);
        }
    }, [Editcomment]);
    useEffect(() => {
        if (CommentId != '') {
            const GetStudentRecordCommentEditResult: IGetStudentRecordCommentBody = {
                asSchoolId: asSchoolId,
                asSchoolwiseStudentId: Number(SchoolWiseStudentIdparam),
                asCommentId: Number(CommentId)    /* 3279*/

            }
            dispatch(GetStudentRecordCommentEdit(GetStudentRecordCommentEditResult))
        }
    }, [CommentId]);
    const deleteComment = () => {
        const DeleteCommentBody: IGetDeleteCommentBody = {
            asSchoolId: Number(asSchoolId),
            asAcademicYearId: Number(asAcademicYearId),
            asSchoolwiseStudentId: Number(SchoolWiseStudentIdparam),
            asCommentId: Number(CommentId),        /*3280,*/
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
        ClickCloseDialogbox();

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
    useEffect(() => {
        if (SaveandSubmitcommentUS != '') {
            toast.success(SaveandSubmitcommentUS)
            dispatch(resetSaveandSubmitComment());
        }
    }, [SaveandSubmitcommentUS])
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
    const handleClose = () => {
        setOpen(false);
    };
    const IsClickOk = () => {
        let isError = true;
        if (Comment === '') {
            setCommentError('Comment should not be blank.');
            isError = false;
        } else {
            setCommentError('');
        }

        if (LectureNm === '') {
            setLectureNmError('Lecture Name should not be blank.');
            isError = false;
        } else {
            setLectureNmError('');
        }

        const timePattern = /^([01]\d|2[0-3]):([0-5]\d)$/;
        if (!timePattern.test(Time)) {
            setTimeError('Time should be in HH:MM AM/PM format (e.g 10:00 AM).');
            isError = false;
        } else {
            setTimeError('');
        }
        // if (!isError) {
        //     dispatch(getSaveComment(SaveCommentBody));
        // }
        // if (!isError) {
        //     setOpen(false);
        // }
        return isError;

    };
    const onClickSave = () => {
        if (IsClickOk()) {
            const SaveCommentBody: IGetSaveCommentBody = {
                asSchoolId: Number(asSchoolId),
                asAcademicYearId: Number(asAcademicYearId),
                asSchoolwiseStudentId: Number(SchoolWiseStudentIdparam),
                asCommentId: 0,
                asDate: StartDate,
                asComment: Comment,
                asLectureName: LectureNm,
                asUpdatedById: Number(asUserId),
                asIsDeleteAction: false,
                asAllowSubmit: false, /*true - save and submit comment */
                asStdDivId: 1344,
            };
            dispatch(getSaveComment(SaveCommentBody));
        };
    }
    const onSaveandSubmit = () => {
        if (IsClickOk()) {
            const SavesubmitCommentBody: IGetSaveandSubmitCommentBody = {
                asSchoolId: Number(asSchoolId),
                asAcademicYearId: Number(asAcademicYearId),
                asSchoolwiseStudentId: Number(SchoolWiseStudentIdparam),
                asCommentId: 0,
                asDate: StartDate,
                asComment: Comment,
                asLectureName: LectureNm,
                asUpdatedById: Number(asUserId),
                asIsDeleteAction: Number(false),
                asAllowSubmit: Number(true), /*true - save and submit comment */
                asStdDivId: 1344,
            };
            dispatch(getSaveandSubmitComment(SavesubmitCommentBody));
        };
    }
    return (
        <Dialog
            open={open}
            onClose={() => setOpen(false)}
            fullWidth
            maxWidth={'sm'}
            PaperProps={{
                sx: {
                    borderRadius: "15px",
                }
            }}
        >
            <DialogTitle
                sx={{
                    backgroundColor: '#324b84',
                    position: 'relative'

                }}
            >
                <ClearIcon onClick={handleClose}
                    sx={{
                        color: 'white',
                        borderRadius: '7px',
                        position: 'absolute',
                        top: '5px',
                        right: '8px',
                        cursor: 'pointer',
                        '&:hover': {
                            color: 'red',
                        }
                    }} />
            </DialogTitle>
            <Typography variant="h3" sx={{ pt: 1, pl: 2 }}>
                Student Record Comment
            </Typography>
            <DialogContent >
                <Grid container spacing={1} alignItems="center">
                    <Grid item xs={6} md={6} >
                        <Datepicker1
                            DateValue={StartDate}
                            onDateChange={onSelectSrDate}
                            label={'Date'}
                            size={"medium"}
                        />
                        <ErrorMessage1 Error={ErrorSrDateblank} />
                    </Grid>
                    <Grid item xs={6} md={6}>

                        <TimeField Item={Time} label={'Time'} ClickItem={clickTime} size={'medium'} />
                        {TimeError && <Typography color="error">{TimeError}</Typography>}
                    </Grid>
                </Grid>
                <Box sx={{ pt: 2, background: 'white' }}>

                    <Grid item xs={12}>
                        <ResizableTextField
                            rows={3}
                            value={Comment}
                            label={<>
                                Comment <span style={{ color: 'red' }}>*</span>
                            </>}
                            onChange={(e) => setComment(e.target.value)}
                            sx={{ width: '100%' }}
                            error={CommentError !== ''}
                            helperText={CommentError}
                            inputProps={{ maxLength: 100 }}
                        />

                    </Grid>
                    <Grid item xs={12} sx={{ pt: 2, }} >
                        <ResizableTextField
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
                       
                        {(listCommentDetailsUS.length > 0) &&
                            <Button sx={{
                                color: 'red',
                                ':hover': { backgroundColor: red[100] }
                            }} onClick={deleteComment}>
                                Delete
                            </Button>}
                        <Button sx={{
                            color: 'red',
                            ':hover': { backgroundColor: red[100] }
                        }} onClick={handleDialogClose}>
                            Cancel
                        </Button>
                       
                        <Button sx={{
                            color: 'green',
                            ':hover': { backgroundColor: green[100] }
                        }} onClick={onSaveandSubmit}>
                            Save and Submit
                        </Button>
                        <Button sx={{
                            color: 'green',
                            ':hover': { backgroundColor: green[100] }
                        }} onClick={onClickSave}>
                            Save
                        </Button>
                    </Stack>
                </Grid>
            </DialogActions>

        </Dialog>
    );
};

export default StudentRecordComment;
