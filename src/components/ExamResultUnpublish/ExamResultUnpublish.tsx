import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, TextField } from '@mui/material';
import { ClearIcon } from '@mui/x-date-pickers/icons';
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
      PaperProps={{
        sx: {
          borderRadius: "15px",
        }
      }}
    >
      <DialogTitle
        sx={{
          bgcolor: '#223354',
          // backgroundColor: (theme) => theme.colors.primary.main,
          color: (theme) => theme.palette.common.white
        }}
      >
        <ClearIcon onClick={() => {
          setOpen(false)
        }}
          sx={{
            color: 'white',
            // background:'white',
            borderRadius: '7px',
            position: 'absolute',
            top: '5px',
            right: '7px',
            cursor: 'pointer',
            '&:hover': {
              color: 'red',
              //  backgroundColor: red[100]

            }
          }} />
      </DialogTitle>
      <DialogContent>

        <Box sx={{ maxHeight: '300px', overflowY: 'auto', position: 'relative', background: 'white' }}>
          <h1>
            Enter Reason For Unpublish
          </h1>
          <Grid container spacing={0} alignItems="center">
            <Grid item xs={6}>
              <TextField fullWidth label={'Exam'}
                sx={{ width: '95%', bgcolor: '#f0f0f0' }}
                value={ExamName}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField fullWidth label={'Class Teacher Name :'}
                sx={{ width: '100%', bgcolor: '#f0f0f0' }}
                value={TeacherName} />
            </Grid>
            <br></br>
            <Grid item xs={12} marginTop={2}>
              <TextField fullWidth label={'Unpublish Reason :'}
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
            </Grid>
          </Grid>
        </Box>
      </DialogContent>
      <DialogActions sx={{ py: 1, px: 3 }}>
        <Button onClick={() => {
          setOpen(false)
        }} color={'error'}>
          Cancel
        </Button>
        <Button onClick={() => { ClickOk() }} color={'error'}>
          Unpublish
        </Button>

      </DialogActions>
    </Dialog>
  );
};
export default ExamResultUnpublish;

