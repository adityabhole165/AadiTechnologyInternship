import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import Datepicker from 'src/libraries/DateSelector/Datepicker';
import ErrorMessage1 from 'src/libraries/ErrorMessages/ErrorMessage1';
import TimeField from './TimeField';

const StudentRecordComment = ({ open, setOpen }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const [Comment, setComment] = useState('');
    const [CommentError, setCommentError] = useState('');
    const [LectureNm, setLectureNm] = useState('');
    const [LectureNmError, setLectureNmError] = useState('');
    const [SrDate, setSrDate] = useState(new Date().toISOString().split('T')[0]);
    const [ErrorSrDateblank, setErrorSrDateblank] = useState('');
    const [Time, setTime] = useState(currentTime);
    const [TimeError, setTimeError] = useState('');

    const asSchoolId = Number(localStorage.getItem('localSchoolId'));
    const asAcademicYearId = Number(sessionStorage.getItem('AcademicYearId'));

    const onSelectSrDate = (value) => {
        setSrDate(value);
    };

    const clickTime = (value) => {
        setTime(value);
    };

    const ClickDelete = () => {

    }
    const ResetForm = () => {
        setComment('');
        setLectureNm('');
        setTime(currentTime);
    };

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

        const timePattern = /^([01]\d|2[0-3]):([0-5]\d)$/;
        if (!timePattern.test(Time)) {
            setTimeError('Time should be in HH:MM format (e.g., 10:00).');
            isError = true;
        } else {
            setTimeError('');
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
                    <Grid item xs={12} md={6}>
                        <Datepicker
                            DateValue={SrDate}
                            onDateChange={onSelectSrDate}
                            label={'Date'}
                            size={"medium"}
                        />
                        <ErrorMessage1 Error={ErrorSrDateblank} />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TimeField Item={Time} label={'Time'} ClickItem={clickTime} />
                        {TimeError && <Typography color="error">{TimeError}</Typography>}
                    </Grid>
                </Grid>
                <Grid container justifyContent="space-between" alignItems="center">
                    <Typography variant={"h4"} sx={{ mb: 1 }}>
                        Comment :
                    </Typography>
                </Grid>
                <Grid container spacing={1} alignItems="center">
                    <Grid item xs={12}>
                        <TextField
                            multiline
                            rows={3}
                            value={Comment}
                            onChange={(e) => setComment(e.target.value)}
                            sx={{ width: '100%' }}
                            error={CommentError !== ''}
                            helperText={CommentError}
                        />
                    </Grid>
                </Grid>
                <Typography variant={"h4"} sx={{ mb: 1 }}>
                    Lecture Name :
                </Typography>
                <Grid container spacing={1} alignItems="center">
                    <Grid item xs={12}>
                        <TextField
                            multiline
                            rows={1}
                            value={LectureNm}
                            onChange={(e) => setLectureNm(e.target.value)}
                            sx={{ width: '100%' }}
                            error={LectureNmError !== ''}
                            helperText={LectureNmError}
                        />
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions sx={{ py: 2, px: 3 }}>
                <Button onClick={ClickOk} color={'error'} variant={'contained'}>
                    Save
                </Button>
                <Button onClick={ClickOk} color={'error'} variant={'contained'}>
                    Save and Submit
                </Button>
                <Button onClick={ClickDelete} color={'error'} variant={'contained'}>
                    Delete
                </Button>
                <Button onClick={() => setOpen(false)} color={'error'}>
                    Cancel
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default StudentRecordComment;
