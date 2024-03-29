import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, TextField, Typography, } from '@mui/material';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import { IUnPublishTestBody } from 'src/interfaces/ExamResultUnpublish/IExamResultUnpublish';
import { UnPublishButton } from 'src/requests/ExamResultUnpublish/RequestExamResultUnpublish';
import { RootState } from 'src/store';

const ExamResultUnpublish = ({ open, setOpen, ClickCloseDialogbox, clickPublishUnpublish }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { ExamId, TeacherId, ExamName, TeacherName } = useParams();

  const [Reason, setReason] = useState('');
  const [ReasonError, setReasonError] = useState('');

  const asSchoolId = Number(localStorage.getItem('localSchoolId'));
  const asAcademicYearId = Number(sessionStorage.getItem('AcademicYearId'));

  const UnPublishTest: any = useSelector(
    (state: RootState) => state.unpublishtest.UnPublish
  );
  console.log('UnPublishTest', UnPublishTest);

  const UnPublishTestBody: IUnPublishTestBody = {
    asSchoolId: asSchoolId,
    asStandardDivId: Number(TeacherId),
    asAcademicYearId: asAcademicYearId,
    asSchoolWise_Test_Id: Number(ExamId),
    asUnPublishReason: Reason
  };

  const onClickUnpublish = () => {
    let isError = false;
    if (Reason == '') {
      setReasonError('Field should not be blank');
      isError = true;
    }
    if (!isError) {
      dispatch(UnPublishButton(UnPublishTestBody));
    }
    if (!isError) {
      ResetForm();
    }
    if (Reason != '') {
      navigate('/extended-sidebar/Teacher/ExamResultBase');
    }
  };

  const ResetForm = () => {
    setReason('');
  };

  const onClickCancel = () => {
    navigate('/extended-sidebar/Teacher/ExamResultBase');
  };
  const ClickOk = () => {
    if (Reason != '') clickPublishUnpublish(0);
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

        <Grid container spacing={1} justifyContent="center" alignItems="center">
          <Grid item xs={1}>
            <Typography>
              <b>Exam :</b>
            </Typography>
          </Grid>
          <Grid item xs={2}>
            <TextField value={ExamName} />
          </Grid>
        </Grid>
        <br></br>

        <Grid container spacing={1} justifyContent="center" alignItems="center">
          <Grid item xs={1}>
            <Typography>
              <b>Class Teacher Name :</b>
            </Typography>        </Grid>

          <Grid item xs={2}>
            <TextField value={TeacherName} />
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
        <Button onClick={() => {
          setOpen(false)
        }} color={'error'}>
          Cancel
        </Button>
        <Button onClick={() => { ClickOk() }} variant={'contained'}>
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};

//     <div>
//       <PageHeader heading="Enter Reason For Unpublish" />

//       <div style={{ textAlign: 'right', color: 'red', paddingRight: '20px' }}>
//         Mandatory Fields *
//       </div>

//       <Grid container spacing={1} justifyContent="center" alignItems="center">
//         <Grid item xs={1}>
//           <Typography>
//             <b>Exam :</b>
//           </Typography>
//         </Grid>

//         <Grid item xs={2}>
//           <TextField value={ExamName} />
//         </Grid>
//       </Grid>
//       <br></br>

//       <Grid container spacing={1} justifyContent="center" alignItems="center">
//         <Grid item xs={1}>
//           <Typography>
//             <b>Class Teacher Name :</b>
//           </Typography>
//         </Grid>

//         <Grid item xs={2}>
//           <TextField value={TeacherName} />
//         </Grid>
//       </Grid>
//       <br></br>

//       <Grid container spacing={1} justifyContent="center" alignItems="center">
//         <Grid item xs={1}>
//           <Typography>
//             <b>Reason for Unpublish :</b>
//           </Typography>
//         </Grid>

//         <Grid item xs={2}>
//           <TextField
//             value={Reason}
//             onChange={(e) => setReason(e.target.value)}
//             error={ReasonError !== ''}
//             helperText={ReasonError}
//             multiline
//             style={{ resize: 'both', overflow: 'auto' }}
//           />

//           <div style={{ color: 'red' }}>*</div>
//         </Grid>
//       </Grid>

//       <br></br>
//       <br></br>

//       <div>
//         <Grid
//           container
//           spacing={2}
//           style={{
//             flexDirection: 'row',
//             justifyContent: 'center',
//             alignItems: 'center'
//           }}
//         >
//           <Grid item xs={1}>
//             <ButtonPrimary onClick={onClickUnpublish} variant="contained">
//               <b>UNPUBLISH</b>
//             </ButtonPrimary>
//           </Grid>

//           <Grid item xs={1}>
//             <ButtonPrimary
//               onClick={onClickCancel}
//               variant="contained"
//               style={{ backgroundColor: 'red', color: 'white' }}
//             >
//               CLOSE
//             </ButtonPrimary>
//           </Grid>
//         </Grid>
//       </div>
//     </div>
//   );
// };

export default ExamResultUnpublish;
