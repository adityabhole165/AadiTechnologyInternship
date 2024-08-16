import { QuestionMark } from '@mui/icons-material';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, IconButton, TextField, Tooltip, Typography } from '@mui/material';
import { green, grey } from '@mui/material/colors';
import { ClearIcon } from '@mui/x-date-pickers';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import { ResizableTextField } from '../AddSchoolNitice/ResizableDescriptionBox';
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
      setReasonError( "Reason for Unpublish should not be blank.");
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
        maxWidth={'md'}
        fullWidth
        onClose={() => {
          setOpen(false);
        }}
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
        <DialogContent >

          <h1>
            {'Enter reason for unpublish'}
          </h1>
          <Grid container spacing={1} alignItems="center">
            <Grid item >
              <TextField
              sx={{ minWidth: '30vw', bgcolor: '#F0F0F0' }}
                label={'Exam'}
                size={"small"}
                value={ExamName} />
            </Grid>
          </Grid>


          <br></br>

          <Grid container spacing={1} alignItems="center">
            <Grid item >
              <TextField
               sx={{ minWidth: '30vw', bgcolor: '#F0F0F0' }}
                label={'Class Teacher Name'}
                size={"small"}
                value={TeacherName} />
            </Grid>
          </Grid>
          <br></br>
          <Typography variant={"h4"} sx={{ mb: 1 }}>
            Unpublish Reason<span style={{ color: 'red' }}>*</span>
          </Typography>
          <ResizableTextField
            multiline
            // rows={5}
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
          <Button
            color={'error'}
            onClick={() => {
              setOpen(false)
            }}
          >
            Close
          </Button>
          <Button

            onClick={() => { ClickOk() }}
            sx={{
              color: 'green',
              //  backgroundColor: grey[500],
              '&:hover': {
                color: 'green',
                backgroundColor: green[100]
              }
            }}
          >
            Unpublish
          </Button>
        </DialogActions>
      </Dialog>


    </>
  );
};

export default FinalResultUnpublish;