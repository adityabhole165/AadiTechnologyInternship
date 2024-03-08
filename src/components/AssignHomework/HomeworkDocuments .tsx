import { Box, Grid, Typography } from '@mui/material';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import { toast } from 'react-toastify';
import {
  IDeleteHomeworkDocumentBody,
  IGetAllHomeworkDocumentsBody
} from 'src/interfaces/AssignHomework/IHomeworkDocuments';
import Homeworkview from 'src/libraries/ResuableComponents/Homeworkview';
import PageHeader from 'src/libraries/heading/PageHeader';
import { ButtonPrimary } from 'src/libraries/styled/ButtonStyle';
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
    <div>
      <br></br>
      <br></br>
      <br></br>

      <PageHeader heading={'Documents'} />

      <Grid item xs={12}>

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
      </Grid>
      <Box sx={{ textAlign: 'center' }} m={2}>
        <ButtonPrimary style={{ backgroundColor: '#ef5350' }} onClick={click}>
          CLOSE
        </ButtonPrimary>
      </Box>
    </div>
  );
};

export default HomeworkDocuments;
