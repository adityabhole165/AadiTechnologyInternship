import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, TextField, Typography, } from '@mui/material';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
const ExamResultUnpublish = ({ open, setOpen, ExamName, TeacherName, ClickCloseDialogbox, clickPublishUnpublish }) => {
  const dispatch = useDispatch();
  const { Id } = useParams();
  const navigate = useNavigate();

  const [Reason, setReason] = useState('');
  const [ReasonError, setReasonError] = useState('');

  const asSchoolId = Number(localStorage.getItem('localSchoolId'));
  const asAcademicYearId = Number(sessionStorage.getItem('AcademicYearId'));




  const ResetForm = () => {
    setReason('');
  };


  // const ClickOk = () => {
  //   if (Reason !== '') clickPublishUnpublish(false, Reason);
  //   setOpen(false);
  // };
  const ClickOk = () => {
    if (Reason === '') {
      setReasonError('Please fix the following error(s): Reason for Unpublish should not be blank.');
    } else {
      setReasonError('');
      clickPublishUnpublish(false, Reason);
      setOpen(false);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={() => {
        setOpen(false);
      }}
      fullWidth
      maxWidth={'sm'}
    >
      <DialogTitle
        sx={{
          // backgroundColor: (theme) => theme.palette.error.main,
          backgroundColor: '#324b84',
          py: 1,
        }}
      >
        <Typography variant={"h4"} sx={{ mb: 1, color: 'white' }}>
          Enter Reason For Unpublish
        </Typography>
      </DialogTitle>
      <DialogContent dividers sx={{ px: 4 }}>
        <Grid container justifyContent="space-between" alignItems="center">

          <Typography variant={"h4"} sx={{ mb: 1 }}>
            Exam :
          </Typography>
          {/* <Typography variant="body2" color="error">
            * Mandatory Fields
          </Typography> */}
        </Grid>
        <Grid container spacing={1} alignItems="center">

          <Grid item xs={2}>
            <TextField
              sx={{ minWidth: '400px', bgcolor: '#f0e68c' }}
              // label={'Exam'}
              size={"small"}
              value={ExamName}
            />
          </Grid>
        </Grid>
        <br></br>
        <Typography variant={"h4"} sx={{ mb: 1 }}>
          Class Teacher Name :
        </Typography>
        <Grid container spacing={1} alignItems="center">
          <Grid item >
            <TextField
              sx={{ minWidth: '400px', bgcolor: '#f0e68c' }}
              // label={'Class Teacher Name'}
              size={"small"}
              value={TeacherName} />
          </Grid>
        </Grid>
        <br></br>
        <Typography variant={"h4"} sx={{ mb: 1 }}>
          Unpublish Reason :
          {/* <span style={{ color: 'red' }}>*</span> */}
        </Typography>
        <TextField
          multiline
          rows={3}
          value={Reason}
          onChange={(e) => {
            setReason(e.target.value);
          }}
          sx={{ width: '100%' }}
          error={ReasonError !== ''}
          helperText={ReasonError}
        />
      </DialogContent>
      <DialogActions sx={{ py: 2, px: 3 }}>
        <Button onClick={() => {
          setOpen(false)
        }} color={'error'}>
          Cancel
        </Button>
        <Button onClick={() => { ClickOk() }} color={'error'} variant={'contained'}>
          Unpublish
        </Button>

      </DialogActions>
    </Dialog>
  );
};
export default ExamResultUnpublish;

