import { Box, Typography } from '@mui/material';
import { useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import { toast } from 'react-toastify';
import { AlertContext } from 'src/contexts/AlertContext';
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
import { decodeURL } from '../Common/Util';
import CommonPageHeader from '../CommonPageHeader';

const HomeworkDocuments = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let {
    Id,
    TeacherName,
    ClassName,
    SubjectName,
    SubjectId,
    MySubject,
    TeacherId,
    SelectClass
  } = useParams();

  // Decode in-place
  Id = decodeURL(Id);
  TeacherName = decodeURL(TeacherName);
  ClassName = decodeURL(ClassName);
  SubjectName = decodeURL(SubjectName);
  SubjectId = decodeURL(SubjectId);
  MySubject = decodeURL(MySubject);
  TeacherId = decodeURL(TeacherId);
  SelectClass = decodeURL(SelectClass);
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
  //console.log(DeleteHomeworkDocument, 'DeleteHomeworkDocument....');

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
      // toast.success("Document deleted successfully.");
      toast.success(DeleteHomeworkDocument);
      dispatch(deleteresetMessage());
      dispatch(GetAllHomeworkDocuments(IGetAllHomeworkDocuments));

    }
  }, [DeleteHomeworkDocument]);

  const click = () => {
    navigate('/RITeSchool/Teacher/AddHomework', { state: { fromInternal: true } });
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
            { title: 'Assign Homework', path: '/RITeSchool/Teacher/AssignHomework' },
            {
              title: 'Add Homework',
              path: '/RITeSchool/Teacher/AddHomeworkNew/' +
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
            { title: 'Documents', path: '/RITeSchool/Teacher/HomeworkDocuments' }
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
            <Typography variant="body1" sx={{ textAlign: 'center', marginTop: 2, backgroundColor: '#324b84', padding: 1, borderRadius: 2, color: 'white' }}>
              <b>No record found.</b>
            </Typography>
          )}
        </Box>
      </Box>
    </>
  );
};

export default HomeworkDocuments;
