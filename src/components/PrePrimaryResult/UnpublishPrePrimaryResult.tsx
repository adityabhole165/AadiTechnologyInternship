// import { Grid, TextField, Typography } from '@mui/material';
// import { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate, useParams } from 'react-router';
// import { IGetUnPublishResltBody } from 'src/interfaces/PrePrimaryResult/IUnpublishPrePrimaryResult';
// import PageHeader from 'src/libraries/heading/PageHeader';
// import { ButtonPrimary } from 'src/libraries/styled/ButtonStyle';
// import { UnPublished } from 'src/requests/PrePrimaryResult/RequestUnpublishPrePrimaryResult';
// import { RootState } from 'src/store';

// const UnpublishPrePrimaryResult = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { ExamId, TeacherId, ExamName, TeacherName, AssessmentName } =
//     useParams();

//   const [Reason, setReason] = useState('');
//   const [ReasonError, setReasonError] = useState('');
//   const [currentDate, setCurrentDate] = useState(new Date());
//   const asSchoolId = Number(localStorage.getItem('localSchoolId'));
//   const asAcademicYearId = Number(sessionStorage.getItem('AcademicYearId'));
//   const asStandardDivisionId = sessionStorage.getItem('StandardDivisionId');
//   const asTeacherId = sessionStorage.getItem('TeacherId');

//   const UnPublishTest: any = useSelector(
//     (state: RootState) => state.unpublishtest.UnPublish
//   );
//   console.log('UnPublishTest', UnPublishTest);

//   const UnPublisheed = useSelector(
//     (state: RootState) => state.UnpublishSlice.Unpublish
//   );
//   console.log('UnPublisheedd', UnPublisheed);

//   const Unpublishee: IGetUnPublishResltBody = {
//     asXseedResultPublishStatusId: 140,
//     asSchoolId: asSchoolId,
//     asAcademic_Year_Id: asAcademicYearId,
//     asAssessmentId: 24,
//     asStandardDivisionId: Number(asStandardDivisionId),
//     asUnPublishReason: Reason,
//     asIsPublished: 'false',
//     asUpdatedById: Number(asTeacherId),
//     asUpdateDate: currentDate.toISOString()
//   };

//   useEffect(() => {
//     dispatch(UnPublished(Unpublishee));
//   }, []);

//   const onClickUnpublish = () => {
//     let isError = false;
//     if (Reason == '') {
//       setReasonError('Field should not be blank');
//       isError = true;
//     }
//     if (!isError) {
//       dispatch(UnPublished(Unpublishee));
//     }
//     if (!isError) {
//       ResetForm();
//     }
//     if (Reason != '') {
//       navigate('/RITeSchool/Teacher/PrePrimaryResult');
//     }
//   };

//   const ResetForm = () => {
//     setReason('');
//   };

//   const onClickCancel = () => {
//     navigate('/RITeSchool/Teacher/PrePrimaryResult');
//   };

//   return (
//     <div>
//       <PageHeader heading="Enter Reason For Unpublish" />

//       <div style={{ textAlign: 'right', color: 'red', paddingRight: '20px' }}>
//         Mandatory Fields *
//       </div>

//       <Grid container spacing={1} justifyContent="center" alignItems="center">
//         <Grid item xs={1}>
//           <Typography>
//             <b>Assessment :</b>
//           </Typography>
//         </Grid>

//         <Grid item xs={2}>
//           <TextField value={AssessmentName} />
//         </Grid>
//       </Grid>
//       <br></br>

//       <Grid container spacing={1} justifyContent="center" alignItems="center">
//         <Grid item xs={1}>
//           <Typography>
//             <b>Class Teacher:</b>
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

// export default UnpublishPrePrimaryResult;
