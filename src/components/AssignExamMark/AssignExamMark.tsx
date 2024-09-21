import { Box, Divider, IconButton, Tooltip, Typography } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  IAssignClassBody,
  IClasswiseExamDropdownBody,
  ISchoolsettingBody,
  ISubjectsExamMarksStatusForClassBody,
  ISubjectTeachersForAssignExamMarksBody,
  ISubmitTestMarksToClassTeacherBody
} from 'src/interfaces/AssignExamMarks/IAssignExamMarks';

import {
  CDASubjectTeachersForAssignExamMarks,
  GetAssignExamMarkList,
  GetClassWiseExam,
  GetschoolSettings,
  GetSubjectList,
  ReqSubmitMarksTeacher,
  resetMessage
} from 'src/requests/AssignExamMarks/ReqAssignExamMarks';
import { RootState } from 'src/store';

import QuestionMark from '@mui/icons-material/QuestionMark';
import { grey } from '@mui/material/colors';
import { useNavigate, useParams } from 'react-router';
import { toast } from 'react-toastify';
import { AlertContext } from 'src/contexts/AlertContext';
import DotLegends from 'src/libraries/ResuableComponents/DotLegends';
import ListEditIcon1 from 'src/libraries/ResuableComponents/ListEditIcon1';
import ListEditIcon2 from 'src/libraries/ResuableComponents/ListEditIcon2';
import SearchableDropdown from 'src/libraries/ResuableComponents/SearchableDropdown';
import { getSchoolConfigurations } from '../Common/Util';
import CommonPageHeader from '../CommonPageHeader';

const AssignExamMark = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { ClassTecherid, ClassId, TestId } =
    useParams();
  let CanEdit = getSchoolConfigurations(74)


  const [selectClass, SetSelectClass] = useState(ClassId == undefined ? "" : ClassId);
  const [ClassWiseExam, SetClassWiseExam] = useState(TestId == undefined ? "" : TestId);
  const TeacherId = sessionStorage.getItem('TeacherId');
  const [ClassTecher, SetClassTecher] = useState(ClassTecherid == undefined ? TeacherId : ClassTecherid);



  const { showAlert, closeAlert } = useContext(AlertContext);

  const asSchoolId = Number(localStorage.getItem('localSchoolId'));
  const asUserId = Number(localStorage.getItem('UserId'));
  const asAcademicYearId = Number(sessionStorage.getItem('AcademicYearId'));
  const aTeacherId = Number(sessionStorage.getItem('TeacherId'));
  // const asStandardDivisionId = sessionStorage.getItem('StandardDivisionId');
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

  const USSubjectTeachersForAssignExamMarks = useSelector(
    (state: RootState) => state.AssignExamMarkSlice.ISSubjectTeachersForAssignExamMarks
  );

  const UsschoolSettings = useSelector((state: RootState) => state.AssignExamMarkSlice.Isschoolsetting);

  const UsSubmitMarksTeacher = useSelector(
    (state: RootState) => state.AssignExamMarkSlice.ISSubmitMarksTeacher
  );

  const ScreensAccessPermission = JSON.parse(
    sessionStorage.getItem('ScreensAccessPermission')
  );

  const GetScreenPermission = () => {
    let perm = 'N';
    ScreensAccessPermission.map((item) => {
      if (item.ScreenName === 'ExamMarks') perm = item.IsFullAccess;
    });
    return perm;
  };


  const GetClassTeacher = () => {
    let returnVal = false
    ClassDropdown.map((item) => {
      if (item.Value == selectClass) {
        returnVal = item.IsClassTeacher
      }
    })
    return returnVal
  };

  const getIsTestExists = (value) => {
    let IsTestExists = false
    ClassWiseExamDropdown.map((Item) => {
      if (Item.Value == value)
        IsTestExists = true
    })
    return IsTestExists
  }

  //ClassDrpdown

  const GetSubjectListtClass: ISubjectsExamMarksStatusForClassBody = {
    asSchoolId: asSchoolId,
    asAcademicYearId: asAcademicYearId,
    aTeacherId: Number(CanEdit == 'Y' ? ClassTecher : aTeacherId),
    asExamId: Number(ClassWiseExam),
    asStandardDivisionId: Number(selectClass),
    IsClassTeacher: GetClassTeacher()

  };
  const GetAssignExam: IAssignClassBody = {
    asSchoolId: asSchoolId,
    asAcademicYearId: asAcademicYearId,
    aTeacherId: Number(CanEdit == 'Y' ? ClassTecher : aTeacherId)

  };

  const SubjectTeachersForAssignExamMarksBody: ISubjectTeachersForAssignExamMarksBody = {
    asSchoolId: asSchoolId,
    asAcademicYrId: asAcademicYearId
  };

  //ClassWiseDropdwon

  const GetAssignClassWiseExam: IClasswiseExamDropdownBody = {
    asSchoolId: asSchoolId,
    asAcademicYearId: asAcademicYearId,
    asStandardDivisionId: Number(selectClass)
  };

  useEffect(() => {
    dispatch(GetAssignExamMarkList(GetAssignExam));

  }, [ClassTecher]);

  useEffect(() => {
    dispatch(CDASubjectTeachersForAssignExamMarks(SubjectTeachersForAssignExamMarksBody));
  }, []);

  useEffect(() => {
    if (ClassDropdown.length > 0 && selectClass == "") {
      SetSelectClass(ClassDropdown[0].Value);
    }
  }, [ClassDropdown]);





  // useEffect(() => {
  //   if (ClassWiseExamDropdown.length > 0 && ClassWiseExam == "") {
  //     SetClassWiseExam(ClassWiseExamDropdown[0].Value);
  //   }
  // }, [ClassWiseExamDropdown]);
  useEffect(() => {
    dispatch(GetClassWiseExam(GetAssignClassWiseExam));
  }, []);

  useEffect(() => {
    if (ClassWiseExamDropdown.length > 0 && (ClassWiseExam === "0" || !getIsTestExists(ClassWiseExam))) {
      SetClassWiseExam(ClassWiseExamDropdown[0].Value);
    }
  }, [ClassWiseExamDropdown, ClassWiseExam]);

  useEffect(() => {
    if (selectClass == '0')
      dispatch(GetClassWiseExam(GetAssignClassWiseExam));
  }, [selectClass]);

  useEffect(() => {
    if (selectClass !== '0')
      dispatch(GetClassWiseExam(GetAssignClassWiseExam));
  }, [selectClass]);

  useEffect(() => {
    const SchoolsettingBody: ISchoolsettingBody = {
      asSchoolId: Number(asSchoolId),
    };
    dispatch(GetschoolSettings(SchoolsettingBody));
  }, []);

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
      message: value.asIsSubmitted !== 'N' ?
        //'Once you submit the result to the Class-teacher, you can not modify the marks/grades. Are you sure you want to continue?' :
        'Once you submit the result to the class-teacher, you can not modify the marks/grades. Are you sure you want to continue?' :
        'Are you sure, Do you want to unsubmit marks/grades?',
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


  const onClickClass = (value) => {
    SetSelectClass(value);
  };

  const clickClassWiseExam = (value) => {
    SetClassWiseExam(value);
  };
  const clickClassTeacher = (value) => {
    SetClassTecher(value);
    SetSelectClass("")
  };
  useEffect(() => {
    dispatch(GetSubjectList(GetSubjectListtClass));
  }, [selectClass, ClassWiseExam, ClassTecher]);


  const HeaderPublish = [
    { Id: 1, Header: 'Class' },
    { Id: 2, Header: 'Subject' },
    { Id: 3, Header: 'Edit', align: 'center' },
    { Id: 4, Header: 'Submit', align: 'center' }
  ];


  const getStandardId = () => {
    let returnVal = 0
    ClassDropdown.map((item) => {
      if (item.Value == item.Value) {
        returnVal = item.StanderdId
      }
    })
    return returnVal
  };

  const clickEdit = (value) => {

    navigate('/extended-sidebar/Teacher/SubjectExamMarks/' +
      ClassTecher + '/' +
      value.StandardDivisionId + '/' +
      value.SubjectId + '/' +
      selectClass + '/' +
      ClassWiseExam + '/' +
      aTeacherId.toString() + '/' +
      value.StandardId + '/' +
      value.IsMonthConfig + '/' +
      !(value.IsSubmitted == "N") + '/' +
      false + '/' +
      'true' + '/' +
      getStandardId()
    )
      ;


  };

  return (
    <Box sx={{ px: 2 }}>
      <CommonPageHeader
        navLinks={[
          { title: 'Assign Exam Marks', path: '/extended-sidebar/Teacher/AssignExamMark' }
        ]}
        rightActions={<>
          {
            CanEdit == 'Y' ? <Box>
              <SearchableDropdown
                sx={{ minWidth: '300px' }}
                ItemList={USSubjectTeachersForAssignExamMarks}
                onChange={clickClassTeacher}
                label={'Select Subject Teacher'}
                defaultValue={ClassTecher?.toString()}
                mandatory
                size={"small"}
              />
            </Box> :
              <span> </span>
          }

          <Box>
            <SearchableDropdown
              sx={{ minWidth: '300px' }}
              ItemList={ClassDropdown}
              onChange={onClickClass}
              label={'Select Class'}
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
              label={'Select Exam'}
              defaultValue={ClassWiseExam}
              mandatory
              size={"small"}
            />

          </Box>

          <Box>
            <Tooltip title={`View all subjects assigned with the current status of marks given to students.
            Once marks for all the students are allotted you have to submit these marks to the class teacher by clicking on "submit" button.
            Pre-primary teachers to add and submit progress report entries of his/her class.`}>
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
      <Box sx={{ background: 'white', p: 1 }}>
        <Box sx={{ display: 'flex', gap: '20px', alignItems: 'center', background: 'white', }}>
          <Typography variant="h4" sx={{ mb: 0, lineHeight: 'normal', alignSelf: 'center', paddingBottom: '2px' }}>Legend</Typography>
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
        </Box>
      </Box>
      <br></br>
      <Box sx={{ background: 'white', p: 2 }}>
        <Typography variant={"h4"} mb={2}>My Subject(s):-</Typography>
        {SubjectListmarkClass.length > 0 ?
          (

            <ListEditIcon1
              ItemList={SubjectListmarkClass}
              clickEdit={clickEdit}
              HeaderArray={HeaderPublish}
              clickSubmit={ClickSubmit}
            />
          ) : (
            <Typography variant="body1" sx={{ textAlign: 'center', marginTop: 4, backgroundColor: '#324b84', padding: 1, borderRadius: 2, color: 'white' }}>
              <b>No record found.</b>
            </Typography>

          )}
        <Divider sx={{ my: 2 }} />
        {SubjectListmarkClass1.length > 0 && UsschoolSettings == "True" && (
          <Box mt={2}>
            <Typography variant={"h4"} mb={2}>My Class Subject(s):-</Typography>
            {SubjectListmarkClass1.length > 0 ? (
              <div>

                <ListEditIcon2
                  ItemList={SubjectListmarkClass1}
                  clickEdit={clickEdit}
                  HeaderArray={HeaderPublish}
                  clickSubmit={ClickSubmit}
                />
              </div>
            ) : (
              <Typography variant="body1" sx={{ textAlign: 'center', marginTop: 4, backgroundColor: '#324b84', padding: 1, borderRadius: 2, color: 'white' }}>
                <b>No record found.</b>
              </Typography>
            )}
          </Box>
        )}



      </Box>
    </Box>
  );
};

export default AssignExamMark;
