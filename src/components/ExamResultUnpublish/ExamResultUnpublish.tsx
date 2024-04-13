import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, TextField, Typography, } from '@mui/material';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import { RootState } from 'src/store';
const ExamResultUnpublish = ({ open, setOpen, ExamName, TeacherName, ClickCloseDialogbox, clickPublishUnpublish }) => {
  const dispatch = useDispatch();
  const { Id } = useParams();
  const navigate = useNavigate();

  const [Reason, setReason] = useState('');
  const [ReasonError, setReasonError] = useState('');

  const asSchoolId = Number(localStorage.getItem('localSchoolId'));
  const asAcademicYearId = Number(sessionStorage.getItem('AcademicYearId'));

  const PublishUnpublish: any = useSelector(
    (state: RootState) => state.ExamResult.PublishUnpublishExam
  );
  console.log("PublishUnpublish", PublishUnpublish)


  const ResetForm = () => {
    setReason('');
  };


  const ClickOk = () => {
    if (Reason !== '') clickPublishUnpublish(false,Reason);
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
          backgroundColor: (theme) => theme.palette.error.main,
          py: 1
        }}
      ></DialogTitle>
      <DialogContent dividers sx={{ px: 4 }}>
        <Typography variant={"h4"} sx={{ mb: 1 }}>
          Exam :
        </Typography>
        <Grid container spacing={1} alignItems="center">

          <Grid item xs={2}>
            <TextField
              sx={{ minWidth: '400px' }}
              label={'Exam'}
              size={"small"}
              value={ExamName} />
          </Grid>
        </Grid>
        <br></br>
        <Typography variant={"h4"} sx={{ mb: 1 }}>
          Class Teacher Name :
        </Typography>
        <Grid container spacing={1} alignItems="center">
          <Grid item >
            <TextField
              sx={{ minWidth: '400px' }}
              label={'Exam'}
              size={"small"}
              value={TeacherName} />
          </Grid>
        </Grid>
        <br></br>
        <Typography variant={"h4"} sx={{ mb: 1 }}>
          Unpublish Reason
        </Typography>
        <TextField
          multiline
          rows={3}
          value={Reason}
          onChange={(e) => {
            setReason(e.target.value);
          }}
          sx={{ width: '100%' }}
        />
      </DialogContent>
      <DialogActions sx={{ py: 2, px: 3 }}>
        <Button onClick={() => { ClickOk() }} variant={'contained'}>
          Unpublish
        </Button>
        <Button onClick={() => {
          setOpen(false)
        }} color={'error'}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};
export default ExamResultUnpublish;

