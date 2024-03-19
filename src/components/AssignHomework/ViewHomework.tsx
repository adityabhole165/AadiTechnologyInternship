import ChevronRightTwoTone from '@mui/icons-material/ChevronRightTwoTone';
import HomeTwoTone from '@mui/icons-material/HomeTwoTone';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import {
  Box,
  Breadcrumbs,
  Container,
  Grid,
  IconButton,
  Stack,
  TextField,
  Tooltip,
  Typography
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
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
  const ClickAttachment = (AttachmentPath) => {
    if (AttachmentPath !== '') {
      window.open(
        localStorage.getItem('SiteURL') +
        '/RITeSchool/DOWNLOADS/Homework/' +
        AttachmentPath
      );
    }
  };
  // const ClickAttachment = () => {
  //   event.preventDefault();
  //   // Handle click event here
  //   console.log('Link clicked!');
  // };
  return (
    <>
      <Container sx={{ mt: 4 }} maxWidth={'xl'}>
        <Stack
          direction={'row'}
          justifyContent={'space-between'}
          alignItems={'center'}
        >
          <Breadcrumbs
            aria-label="breadcrumb"
            separator={<ChevronRightTwoTone />}
          >
            <Link
              to={'/extended-sidebar/landing/landing'}
              color="inherit"
              style={{ textDecoration: 'none' }}
            >
              <IconButton
                sx={{
                  background: (theme) => theme.palette.common.white,
                  boxShadow: '0px 0px 5px 0px rgba(0,0,0,0.15)'
                }}
              >
                <HomeTwoTone color="primary" />
              </IconButton>
            </Link>
            <Link
              to={'/extended-sidebar/Teacher/AddHomework'}
              style={{ textDecoration: 'none' }}
            >
              <Typography
                variant={'h3'}
                fontSize={'23px'}
                fontWeight={'normal'}
                color={'text.primary'}
                sx={{
                  '&:hover': {
                    fontWeight: 'bold'
                  }
                }}
              >
                Assign Homework
              </Typography>
            </Link>
            <Link
              to={'/extended-sidebar/Teacher/AddHomework'}
              style={{ textDecoration: 'none' }}
            >
              <Typography
                variant={'h3'}
                fontSize={'23px'}
                fontWeight={'normal'}
                color={'text.primary'}
                sx={{
                  '&:hover': {
                    fontWeight: 'bold'
                  }
                }}
              >
                Add Homework
              </Typography>
            </Link>
            <Typography variant={'h3'} fontSize={'23px'} color="text.primary">
              View Homework
            </Typography>
          </Breadcrumbs>
          <Stack direction={'row'} alignItems={'center'} gap={1}>
            <Box>
              <Tooltip title={`User can view homework details.`}>
                <IconButton
                  sx={{
                    color: 'white',
                    // backgroundColor: grey[500],
                    height: '36px !important',
                    // ':hover': { backgroundColor: grey[600] }
                  }}
                >
                  <QuestionMarkIcon />
                </IconButton>
              </Tooltip>
            </Box>
          </Stack>
        </Stack>
        <Box sx={{ background: 'white', mt: 2, p: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField fullWidth label={'Subject'} InputLabelProps={{ shrink: true }} value={HomeworkDetail.Subject} />
            </Grid>
            <Grid item xs={6}>
              <TextField fullWidth label={'Title'} InputLabelProps={{ shrink: true }} value={HomeworkDetail.Title} />
            </Grid>
            <Grid item xs={6}>
              <TextField fullWidth label={'Assigned Date '} InputLabelProps={{ shrink: true }} value={HomeworkDetail.AssignedDate} />


            </Grid>
            <Grid item xs={6}>
              <TextField fullWidth label={'Complete Date '} InputLabelProps={{ shrink: true }} value={HomeworkDetail.CompleteByDate} />

            </Grid>

            <Grid item xs={6}>
              <Typography>
                Attachment:
                <a href="#" onClick={() => ClickAttachment(HomeworkDetail.AttachmentPath)} style={{ color: 'blue', textDecoration: 'underline', cursor: 'pointer' }}>
                  {HomeworkDetail.AttachmentPath}
                </a>
              </Typography>

            </Grid>
            <Grid item xs={6}>
              <Typography> More Attachment(s):</Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField multiline fullWidth rows={3} label={'Details'} InputLabelProps={{ shrink: true }} value={HomeworkDetail.Details} />
            </Grid>
          </Grid>
        </Box>

      </Container>
    </>
  );
};

export default ViewHomework;
