import { Box, Typography } from '@mui/material';
import { useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import { toast } from 'react-toastify';
import {
  IDeleteHomeworkDocumentBody,
  IGetAllHomeworkDocumentsBody
} from 'src/interfaces/AssignHomework/IHomeworkDocuments';
import Homeworkview from 'src/libraries/ResuableComponents/Homeworkview';
import {
  DeleteDocument,
  GetAllHomeworkDocuments,
  deleteresetMessage
} from 'src/requests/AssignHomework/requestHomeworkDocuments';
import { RootState } from 'src/store';
import CommonPageHeader from '../CommonPageHeader';
import { AlertContext } from 'src/contexts/AlertContext';

const HomeworkDocuments = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { Id, TeacherName, ClassName, SubjectName, SubjectId, MySubject, TeacherId, SelectClass } = useParams();
  // alert(Id)
  const asSchoolId = Number(localStorage.getItem('localSchoolId'));
  const asAcademicYearId = Number(sessionStorage.getItem('AcademicYearId'));
  const asTeacherId = sessionStorage.getItem('TeacherId');
  const { showAlert, closeAlert } = useContext(AlertContext);
  const HeaderList = [
    { Id: 1, Header: 'File Name' },
    { Id: 2, Header: 'Delete', align: "center" },

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

  // const ClickDelete = (Id) => {
  //   if (confirm('Are you sure you want to delete this record?')) {
  //     const DeleteHomeworkDocumentBody: IDeleteHomeworkDocumentBody = {
  //       asSchoolId: asSchoolId,
  //       asUpdatedById: Number(asTeacherId),
  //       asHomeworkId: Number(Id),
  //       asAcademicYearId: asAcademicYearId
  //     };

  //     dispatch(DeleteDocument(DeleteHomeworkDocumentBody))
  //   }
  // };
  const ClickDelete = (Id) => {
    const DeleteHomeworkDocumentBody: IDeleteHomeworkDocumentBody = {
      asSchoolId: asSchoolId,
      asUpdatedById: Number(asTeacherId),
      asHomeworkId: Number(Id),
      asAcademicYearId: asAcademicYearId
    };
    showAlert({
      title: 'Please Confirm',
      message:
        'Are you sure you want to delete this record? ',
      variant: 'warning',
      confirmButtonText: 'Confirm',
      cancelButtonText: 'Cancel',
      onCancel: () => {
        closeAlert();
      },
      onConfirm: () => {
        dispatch(DeleteDocument(DeleteHomeworkDocumentBody))
        closeAlert();
      }
    });
  };


  useEffect(() => {
    if (DeleteHomeworkDocument !== '') {
      toast.success("Document deleted successfully !!!");
      dispatch(deleteresetMessage());
      dispatch(GetAllHomeworkDocuments(IGetAllHomeworkDocuments));

    }
  }, [DeleteHomeworkDocument]);

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
      <Box sx={{ px: 2 }}>
        <CommonPageHeader
          navLinks={[
            { title: 'Assign Homework', path: '/extended-sidebar/Teacher/AssignHomework' },
            {
              title: 'Add Homework',
              path: '/extended-sidebar/Teacher/AddHomeworkNew/' +
                TeacherId +
                '/' +
                TeacherName +
                '/' +
                ClassName +
                '/' +
                SubjectName +
                '/' +
                SubjectId +
                '/' +
                MySubject +
                '/' +
                SelectClass
            },
            { title: 'Documents', path: '/extended-sidebar/Teacher/HomeworkDocuments' }
          ]}
          rightActions={
            <>

            </>
          }
        />
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
      </Box>
    </>
  );
};

export default HomeworkDocuments;
