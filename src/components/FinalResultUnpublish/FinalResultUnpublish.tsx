import QuestionMark from '@mui/icons-material/QuestionMark';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, IconButton, TextField, Tooltip, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
const FinalResultUnpublish = ({ open, setOpen, ExamName, TeacherName, ClickCloseDialogBox, onClickUnpublish }) => {
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
      onClickUnpublish(false, Reason);
      setOpen(false);
    }
  };

  return (
    <>

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
            py: 1,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            position: 'relative'
          }}
        >

          <Typography variant="h6">
            Enter reason for unpublish

          </Typography>
          <Tooltip title="Enter the reason for exam unpublish." arrow>
            <IconButton
              sx={{
                position: 'absolute',
                top: '3px', // Adjust this value to fine-tune the positioning
                right: '0px', // Adjust this value to fine-tune the positioning
                color: 'white',
                backgroundColor: grey[500],
                '&:hover': {
                  backgroundColor: grey[600],
                },
              }}
            >
              <QuestionMark />
            </IconButton>
          </Tooltip>



        </DialogTitle>

        <DialogContent dividers sx={{ px: 4 }}>
          <Grid container justifyContent="space-between" alignItems="center">

            <Typography variant={"h4"} sx={{ mb: 1 }}>
              Exam :
            </Typography>
            <Typography variant="body2" color="error">
              * Mandatory Fields
            </Typography>
          </Grid>
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
                label={'Class Teacher Name'}
                size={"small"}
                value={TeacherName} />
            </Grid>
          </Grid>
          <br></br>
          <Typography variant={"h4"} sx={{ mb: 1 }}>
            Unpublish Reason<span style={{ color: 'red' }}>*</span>
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
    </>
  );
};

export default FinalResultUnpublish;