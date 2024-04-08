import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, TextField, Typography, } from '@mui/material';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import { RootState } from 'src/store';
const ExamResultUnpublish = ({ open, setOpen, ExamName, TeacherName, ClickCloseDialogbox, clickPublishUnpublish }) => {
  const dispatch = useDispatch();
  const { Id } = useParams();
  const navigate = useNavigate();
  //const { ExamId, TeacherId, ExamName, TeacherName } = useParams();

  const [Reason, setReason] = useState('');
  const [ReasonError, setReasonError] = useState('');
  // const [StandardDivisionId, setStandardDivisionId] = useState(
  //   sessionStorage.getItem('TeacherId')
  // );
  const asSchoolId = Number(localStorage.getItem('localSchoolId'));
  const asAcademicYearId = Number(sessionStorage.getItem('AcademicYearId'));
  // const [TestId, setTestId] = useState("0");

  const PublishUnpublish: any = useSelector(
    (state: RootState) => state.ExamResult.PublishUnpublishExam
  );
  console.log("PublishUnpublish", PublishUnpublish)


  // const onClickUnpublish = (IsPublish) => {
  //   let isError = false;
  //   if (Reason == '') {
  //     setReasonError('Field should not be blank');
  //     isError = true;
  //   }
  //   if (!isError) {
  //     const GetPublishUnpublish: IPublishUnpublishExamResultBody = {
  //       asSchoolId: Number(asSchoolId),
  //       asStdDivId: Number(StandardDivisionId),
  //       asAcadmicYearId: Number(asAcademicYearId),
  //       asTest_Id: Number(TestId),
  //       asUnpublishReason: Reason,
  //       asPublishById: IsPublish
  //     }
  //     dispatch(getPublishUnpublishExam(GetPublishUnpublish));
  //   }
  //   if (!isError) {
  //     ResetForm();
  //   }
  //   if (Reason != '') {
  //     navigate('/extended-sidebar/Teacher/ExamResultBase');
  //   }
  // };

  const ResetForm = () => {
    setReason('');
  };


  const ClickOk = () => {
    if (Reason != '') clickPublishUnpublish(false);
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
{/* //     <div>
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

 */}
