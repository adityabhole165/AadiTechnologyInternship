import { Box, Divider, Grid, IconButton, Tooltip, Typography } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  IAssignClassBody,
  IClasswiseExamDropdownBody,
  ISubjectsExamMarksStatusForClassBody,
  ISubmitTestMarksToClassTeacherBody
} from 'src/interfaces/AssignExamMarks/IAssignExamMarks';

import {
  GetAssignExamMarkList,
  GetClassWiseExam,
  GetSubjectList,
  ReqSubmitMarksTeacher,
  resetMessage
} from 'src/requests/AssignExamMarks/ReqAssignExamMarks';
import { RootState } from 'src/store';

import QuestionMark from '@mui/icons-material/QuestionMark';
import { grey } from '@mui/material/colors';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import { AlertContext } from 'src/contexts/AlertContext';
import DotLegends from 'src/libraries/ResuableComponents/DotLegends';
import ListEditIcon1 from 'src/libraries/ResuableComponents/ListEditIcon1';
import SearchableDropdown from 'src/libraries/ResuableComponents/SearchableDropdown';
import CommonPageHeader from '../CommonPageHeader';

const AssignExamMark = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [selectClass, SetSelectClass] = useState();
  const [ClassWiseExam, SetClassWiseExam] = useState();
  const [MyclassList, SetMyclassList] = useState(true);


  const { showAlert, closeAlert } = useContext(AlertContext);

  const asSchoolId = Number(localStorage.getItem('localSchoolId'));
  const asUserId = Number(localStorage.getItem('UserId'));
  const asAcademicYearId = Number(sessionStorage.getItem('AcademicYearId'));
  const aTeacherId = Number(sessionStorage.getItem('TeacherId'));
  const asStandardDivisionId = Number(
    sessionStorage.getItem('StandardDivisionId')
  );
  const asExamId = Number(sessionStorage.getItem('ExamID'));

  const ClassDropdown = useSelector(
    (state: RootState) => state.AssignExamMarkSlice.ISAssignExam
  );

  const ClassWiseExamDropdown = useSelector(
    (state: RootState) => state.AssignExamMarkSlice.ISAssignClassExam
  );

  const SubjectListmarkClass = useSelector(
    (state: RootState) => state.AssignExamMarkSlice.ISSubjectListClass
  );

  const SubjectListmarkClass1 = useSelector(
    (state: RootState) => state.AssignExamMarkSlice.ISSubjectListClass1
  );
  const ExamMarksStatusForClass = useSelector(
    (state: RootState) => state.AssignExamMarkSlice.ExamMarksStatusForClass
  );




  const UsSubmitMarksTeacher = useSelector(
    (state: RootState) => state.AssignExamMarkSlice.ISSubmitMarksTeacher
  );
  console.log(UsSubmitMarksTeacher, 'UsSubmitMarksTeacher');

  const ScreensAccessPermission = JSON.parse(
    sessionStorage.getItem('ScreensAccessPermission')
  );

  const GetScreenPermission = () => {
    let perm = 'N';
    ScreensAccessPermission.map((item) => {
      if (item.ScreenName === 'AssignExamMark') perm = item.IsFullAccess;
    });
    return perm;
  };


  //ClassDrpdown

  const GetSubjectListtClass: ISubjectsExamMarksStatusForClassBody = {
    asSchoolId: asSchoolId,
    asAcademicYearId: asAcademicYearId,
    aTeacherId: aTeacherId,
    asExamId: ClassWiseExam,
    asStandardDivisionId: selectClass,
    IsClassTeacher: true

  };
  const GetAssignExam: IAssignClassBody = {
    asSchoolId: asSchoolId,
    asAcademicYearId: asAcademicYearId,
    aTeacherId: aTeacherId
  };

  //ClassWiseDropdwon

  const GetAssignClassWiseExam: IClasswiseExamDropdownBody = {
    asSchoolId: asSchoolId,
    asAcademicYearId: asAcademicYearId,
    asStandardDivisionId: selectClass
  };

  useEffect(() => {
    dispatch(GetAssignExamMarkList(GetAssignExam));
  }, []);

  useEffect(() => {
    if (ClassDropdown.length > 0) {
      SetSelectClass(ClassDropdown[0].Value);
    }
  }, [ClassDropdown]);

  useEffect(() => {
    dispatch(GetClassWiseExam(GetAssignClassWiseExam));
  }, [selectClass]);

  useEffect(() => {
    if (ClassWiseExamDropdown.length > 0) {
      SetClassWiseExam(ClassWiseExamDropdown[0].Value);
    }
  }, [ClassWiseExamDropdown]);

  const ClickSubmit = (value) => {
    const SubmitTestMarksTeacherBody: ISubmitTestMarksToClassTeacherBody = {
      ...value,
      asTestId: ClassWiseExam,
      asSchoolId: String(asSchoolId),
      asAcademicYearId: String(asAcademicYearId),
      asReportingUserId: asUserId
    };
    showAlert({
      title: 'Submit',
      message: value.asIsSubmitted = 'Y' ?
        'Once you submit the result to the Class-teacher, you can not modify the marks/grades. Are you sure you want to continue?' :
        'you can unsubmit. Are you sure you want to continue?',
      variant: 'warning',
      confirmButtonText: 'OK',
      cancelButtonText: 'Cancel',
      onConfirm: () => {
        closeAlert();
        dispatch(ReqSubmitMarksTeacher(SubmitTestMarksTeacherBody));
      },
      onCancel: closeAlert
    });

  };

  useEffect(() => {
    if (UsSubmitMarksTeacher != '') {
      toast.success(UsSubmitMarksTeacher);
      dispatch(resetMessage());
      dispatch(GetSubjectList(GetSubjectListtClass));
    }
  }, [UsSubmitMarksTeacher]);

  useEffect(() => {
    console.log(selectClass, 'selectClass');

    dispatch(GetSubjectList(GetSubjectListtClass));
  }, [selectClass, ClassWiseExam]);

  const onClickClass = (value) => {
    SetSelectClass(value);
  };

  const clickClassWiseExam = (value) => {
    SetClassWiseExam(value);
  };

  const HeaderPublish = [
    { Id: 1, Header: 'Class' },
    { Id: 2, Header: 'Subject' },
    { Id: 3, Header: 'Edit', align: 'center' },
    { Id: 4, Header: 'Submit', align: 'center' }
  ];

  const clickEdit = (value) => {
    navigate('/extended-sidebar/Teacher/SubjectExamMarks/' +
      value.StandardDivisionId + '/' +
      value.SubjectId + '/' +
      selectClass + '/' +
      ClassWiseExam + '/' +
      aTeacherId.toString() + '/' +
      value.StandardId + '/' +
      value.IsMonthConfig + '/' +
      !(value.IsSubmitted == "N"));


  };

  return (
    <Box sx={{ px: 2 }}>
      <CommonPageHeader
        navLinks={[
          { title: 'Assign Exam Marks', path: '/extended-sidebar/Teacher/AssignExamMark' }
        ]}
        rightActions={<> <Box>


          <SearchableDropdown
            sx={{ minWidth: '300px' }}
            ItemList={ClassDropdown}
            onChange={onClickClass}
            label={'Select Class:'}
            defaultValue={selectClass}
            mandatory
            size={"small"}
          />
        </Box>
          <Box>

            <SearchableDropdown
              sx={{ minWidth: '300px' }}
              ItemList={ClassWiseExamDropdown}
              onChange={clickClassWiseExam}
              label={'Select Exam:'}
              defaultValue={ClassWiseExam}
              mandatory
              size={"small"}
            />

          </Box>
          <Box>
            <Tooltip title={`View all subjects assigned with the current status of marks given to students. 
Once marks for all the students are allotted you have to submit these marks to the class-teacher by clicking on &quot;Submit&quot; button.
Pre-primary teachers to add and submit progress report entries of his class.`}>
              <IconButton
                sx={{
                  color: 'white',
                  backgroundColor: grey[500],
                  height: '36px !important',
                  ':hover': { backgroundColor: grey[600] }
                }}
              >
                <QuestionMark />
              </IconButton>
            </Tooltip>
          </Box>
        </>}
      />
      {/* <AssignExamMarkNew ItemList={ExamMarksStatusForClass} /> */}

      <Box sx={{ background: 'white', p: 2 }}>
        <Typography variant={"h4"} mb={2}>My Subject(s):-</Typography>
        {SubjectListmarkClass.length > 0 ? (
          <ListEditIcon1
            ItemList={SubjectListmarkClass}
            clickEdit={clickEdit}
            HeaderArray={HeaderPublish}
            clickSubmit={ClickSubmit}
          />
        ) : (
          <Typography variant="body1" sx={{ textAlign: 'center', marginTop: 4, backgroundColor: '#324b84', padding: 1, borderRadius: 2, color: 'white' }}>
            <b>No Record Found.</b>
          </Typography>

        )}
        <Divider sx={{ my: 2 }} />
        {asStandardDivisionId == selectClass && (
          <Box mt={2}>
            {SubjectListmarkClass1.length > 0 ? (
              <div>
                <Typography variant={"h4"} mb={2}>My Class Subject(s):-</Typography>
                <ListEditIcon1
                  ItemList={SubjectListmarkClass1}
                  clickEdit={clickEdit}
                  HeaderArray={HeaderPublish}
                />
              </div>
            ) : (
              <Typography variant="body1" sx={{ textAlign: 'center', marginTop: 4, backgroundColor: '#324b84', padding: 1, borderRadius: 2, color: 'white' }}>
                <b>No Record Found.</b>
              </Typography>
            )}
          </Box>
        )}


        <Grid container sx={{ mt: 2 }}>
          <Grid item xs={12}>
            <Typography variant={"h4"} mb={1}>Legends</Typography>
            <Box sx={{ display: 'flex', gap: '20px' }}>
              <DotLegends
                color="secondary"
                text={
                  'No student in class / Subject not applicable to student'
                }
                text1={'Marks entry not started'}
                text2={'Marks entry partially done'}
                text3={'Submit exam marks to the class teacher'}
                text4={'Unsubmit Exam Marks'}
                text5={'Marks entry completed	'}
              />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default AssignExamMark;
