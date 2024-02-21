import { Box, Container, Grid, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { IGetHomeworkDetailBody } from 'src/interfaces/AssignHomework/IAddHomework';
import { GetHomeworkDetails } from 'src/requests/AssignHomework/requestViewHomework';
import { RootState } from 'src/store';

const ViewHomework = () => {
  const dispatch = useDispatch();
  const { Id } = useParams();
  const [AssignedDate, setAssignedDate] = useState('');
  const [Title, setTitle] = useState('');
  const [HomeworkId, setHomeworkId] = useState('');
  const [CompleteByDate, setCompleteDate] = useState('');
  const [AttachmentPath, setAttechment] = useState('');
  const [Details, setDetails] = useState('');

  const asSchoolId = Number(localStorage.getItem('localSchoolId'));
  const asAcademicYearId = Number(sessionStorage.getItem('AcademicYearId'));
  const HomeworkDetail: any = useSelector(
    (state: RootState) => state.ViewHomework.GetHomeworkDetail
  );

  const GetHomeworkDetailBody: IGetHomeworkDetailBody = {
    asSchoolId: asSchoolId,
    asAcademicyearId: asAcademicYearId,
    asHomeworkId: Number(Id)
  };
  useEffect(() => {
    dispatch(GetHomeworkDetails(GetHomeworkDetailBody));
  }, [Id]);

  useEffect(() => {
    console.log(' after View:', HomeworkDetail);
    if (HomeworkDetail && HomeworkDetail.length > 0) {
      setHomeworkId(HomeworkDetail.Id);
      setAttechment(HomeworkDetail[0].AttachmentPath);
      setAssignedDate(HomeworkDetail[0].AssignedDate);
      setCompleteDate(HomeworkDetail[0].CompleteByDate);
      setTitle(HomeworkDetail[0].Title);
      setDetails(HomeworkDetail[0].Details);
    }
  }, [HomeworkDetail]);
  return (
    <>
      <br></br>
      <br></br>
      <br></br>
      <Container>
        {' '}
        <h1>View Homework</h1>
        <Grid container spacing={2} mt={0.5}>
          <Grid item xs={6}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                padding: '8px',
                boxShadow: '4px 4px 10px rgba(0, 0, 0, 0.2)',
                border: '1px solid black'
              }}
            >
              <Typography fontSize={'10px'}>Subject :</Typography>
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                padding: '18px',
                boxShadow: '4px 4px 10px rgba(0, 0, 0, 0.2)',
                border: '1px solid black'
              }}
            />
          </Grid>
        </Grid>
        <Grid container spacing={2} mt={0.5}>
          <Grid item xs={6}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                padding: '8px',
                boxShadow: '4px 4px 10px rgba(0, 0, 0, 0.2)',
                border: '1px solid black'
              }}
            >
              <Typography fontSize={'10px'}>Title :</Typography>
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                padding: '18px',
                boxShadow: '4px 4px 10px rgba(0, 0, 0, 0.2)',
                border: '1px solid black'
              }}
            />
          </Grid>
        </Grid>
        <Grid container spacing={2} mt={0.5}>
          <Grid item xs={6}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                padding: '8px',
                boxShadow: '4px 4px 10px rgba(0, 0, 0, 0.2)',
                border: '1px solid black'
              }}
            >
              <Typography fontSize={'10px'}>AssignedDate :</Typography>
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                padding: '18px',
                boxShadow: '4px 4px 10px rgba(0, 0, 0, 0.2)',
                border: '1px solid black'
              }}
            >
              <Typography fontSize={'10px'}>{AssignedDate}</Typography>
            </Box>
          </Grid>
        </Grid>{' '}
        <Grid container spacing={2} mt={0.5}>
          <Grid item xs={6}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                padding: '8px',
                boxShadow: '4px 4px 10px rgba(0, 0, 0, 0.2)',
                border: '1px solid black'
              }}
            >
              <Typography fontSize={'10px'}>CompleteByDate :</Typography>
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                padding: '18px',
                boxShadow: '4px 4px 10px rgba(0, 0, 0, 0.2)',
                border: '1px solid black'
              }}
            />
          </Grid>
        </Grid>
        <Grid container spacing={2} mt={0.5}>
          <Grid item xs={6}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                padding: '8px',
                boxShadow: '4px 4px 10px rgba(0, 0, 0, 0.2)',
                border: '1px solid black'
              }}
            >
              <Typography fontSize={'10px'}>Attachment :</Typography>
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                padding: '18px',
                boxShadow: '4px 4px 10px rgba(0, 0, 0, 0.2)',
                border: '1px solid black'
              }}
            />
          </Grid>
        </Grid>{' '}
        <Grid container spacing={2} mt={0.5}>
          <Grid item xs={6}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                padding: '8px',
                boxShadow: '4px 4px 10px rgba(0, 0, 0, 0.2)',
                border: '1px solid black'
              }}
            >
              <Typography fontSize={'10px'}>MoreAttachment :</Typography>
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                padding: '18px',
                boxShadow: '4px 4px 10px rgba(0, 0, 0, 0.2)',
                border: '1px solid black'
              }}
            />
          </Grid>
        </Grid>
        <Grid container spacing={2} mt={0.5}>
          <Grid item xs={6}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                padding: '8px',
                boxShadow: '4px 4px 10px rgba(0, 0, 0, 0.2)',
                border: '1px solid black'
              }}
            >
              <Typography fontSize={'10px'}>Details :</Typography>
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                padding: '18px',
                boxShadow: '4px 4px 10px rgba(0, 0, 0, 0.2)',
                border: '1px solid black'
              }}
            />
          </Grid>
        </Grid>
        {/* {HomeworkDetail.length > 0 && <>Title: {HomeworkDetail[0].Title}</>}{' '}
        <br></br>
        {HomeworkDetail.length > 0 && <>Subject: {HomeworkDetail[0].Subject}</>}
        <br />
        {HomeworkDetail.length > 0 && (
          <> CompleteByDate : {HomeworkDetail[0].CompleteByDate}</>
        )}
        <br />
        {HomeworkDetail.length > 0 && (
          <> Attachment : {HomeworkDetail[0].Attachment}</>
        )}
        <br></br>
        {HomeworkDetail.length > 0 && (
          <> MoreAttachment: {HomeworkDetail[0].AttachmentPath}</>
        )}
        <br></br>
        {HomeworkDetail.length > 0 && (
          <> Details : {HomeworkDetail[0].Details}</>
        )}
        <br></br> */}
      </Container>
    </>
  );
};

export default ViewHomework;
