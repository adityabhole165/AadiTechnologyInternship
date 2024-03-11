import ChevronRightTwoTone from '@mui/icons-material/ChevronRightTwoTone';
import HomeTwoTone from '@mui/icons-material/HomeTwoTone';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import { Box, Breadcrumbs, Container, IconButton, Stack, Tooltip, Typography } from '@mui/material';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  IDeleteHomeworkDocumentBody,
  IGetAllHomeworkDocumentsBody
} from 'src/interfaces/AssignHomework/IHomeworkDocuments';
import Homeworkview from 'src/libraries/ResuableComponents/Homeworkview';
import {
  DeleteDocument,
  GetAllHomeworkDocuments
} from 'src/requests/AssignHomework/requestHomeworkDocuments';
import { RootState } from 'src/store';

const HomeworkDocuments = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { Id } = useParams();
  // alert(Id)
  const asSchoolId = Number(localStorage.getItem('localSchoolId'));
  const asAcademicYearId = Number(sessionStorage.getItem('AcademicYearId'));
  const asTeacherId = sessionStorage.getItem('TeacherId');

  const HeaderList = [
    { Id: 1, Header: 'FileName' },
    { Id: 2, Header: 'Delete' },

  ];
  const AllHomeworkDocuments = useSelector(
    (state: RootState) => state.Homeworkdocument.GetAllHomeworkDocuments
  );

  const DeleteHomeworkDocument = useSelector(
    (state: RootState) => state.Homeworkdocument.DeleteHomeworkDocument
  );
  console.log(DeleteHomeworkDocument, 'DeleteHomeworkDocument....');

  const IGetAllHomeworkDocuments: IGetAllHomeworkDocumentsBody = {
    asSchoolId: asSchoolId,
    asHomeworkId: Number(Id),
    asAcademicyearId: asAcademicYearId
  };

  useEffect(() => {
    dispatch(GetAllHomeworkDocuments(IGetAllHomeworkDocuments));
  }, []);

  const ClickDelete = (Id) => {
    if (confirm('Are You Sure you want to delete The List')) {
      const DeleteHomeworkDocumentBody: IDeleteHomeworkDocumentBody = {
        asSchoolId: asSchoolId,
        asUpdatedById: Number(asTeacherId),
        asHomeworkId: Number(Id),
        asAcademicYearId: asAcademicYearId
      };

      dispatch(DeleteDocument(DeleteHomeworkDocumentBody))
      toast.success('HomeworkDocument delete successfully....!', { toastId: 'success1' });
      dispatch(GetAllHomeworkDocuments(IGetAllHomeworkDocuments));

    }
  };

  const click = () => {
    navigate('/extended-sidebar/Teacher/AddHomework');
  };
  const clickFileName = (value) => {
    if (value !== '') {
      window.open(
        localStorage.getItem('SiteURL') +
        '/RITeSchool/DOWNLOADS/Homework/' +
        value
      );
    }
  };
  return (
    <>
      <Container maxWidth={'xl'}>
        <Stack
          direction={'row'}
          justifyContent={'space-between'}
          alignItems={'center'}
          sx={{
            pt: 4,
            pb: 2
          }}
        >
          <Box>
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
                to={'/extended-sidebar/Teacher/AssignHomework'}
                style={{
                  textDecoration: 'none'
                }}
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
                style={{
                  textDecoration: 'none'
                }}
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
                Documents
              </Typography>
            </Breadcrumbs>
          </Box>
          <Stack direction={'row'} alignItems={'center'} gap={1}>
            <Box>
              <Tooltip
                title={`Users can Add/Edit/Delete/Publish and Unpublish homework. And displays homework added by other teachers.`}
              >
                <IconButton
                  sx={{
                    color: 'white',
                    backgroundColor: 'gray',
                    height: '36px !important',
                    ':hover': { backgroundColor: 'gray' }
                  }}
                >
                  <QuestionMarkIcon />
                </IconButton>
              </Tooltip>
            </Box>
          </Stack>
        </Stack>
        <Box sx={{ backgroundColor: 'white', p: 2 }}>
          {AllHomeworkDocuments.length > 0 ? (
            <Homeworkview
              HeaderArray={HeaderList}
              ItemList={AllHomeworkDocuments}
              clickDelete={ClickDelete}
              clickopen={clickFileName}
            />
          ) : (
            <Typography variant="body1" sx={{ textAlign: 'center', marginTop: 4, backgroundColor: '#324b84', padding: 1, borderRadius: 2, color: 'white' }}>
              <b>No Record Found.</b>
            </Typography>
          )}
        </Box>
      </Container>
    </>
  );
};

export default HomeworkDocuments;
