import QuestionMark from '@mui/icons-material/QuestionMark';
import { Box, IconButton, Tooltip, Typography } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import { toast } from 'react-toastify';
import { AlertContext } from 'src/contexts/AlertContext';
import {
  IGetClassTeachersBody,
  IGetSubmitUnsubmitExamMarksStatusBody,
  IGetTeacherXseedSubjectsBody,
  IGetTestwiseTermBody
} from 'src/interfaces/AssignPrePrimaryGrade/IAssignPrePrimaryGrades';
import DotLegends from 'src/libraries/ResuableComponents/DotLegends3';
import EditIconList from 'src/libraries/ResuableComponents/EditIconList';
import SearchableDropdown from 'src/libraries/ResuableComponents/SearchableDropdown';
import {
  CDAGetSubmitUnsubmitExamMarksStatus,
  CDAGetTeacherDropdown,
  CDAGetTeacherXseedSubjects,
  CDAGetTestwiseTerm,
  resetSubmitUnSubmitGradeMsg
} from 'src/requests/AssignPrePrimaryGrades/ReqAssignPrePrimaryGrades';
import { RootState } from 'src/store';
import { GetIsPrePrimaryTeacher, GetScreenPermission } from '../Common/Util';
import CommonPageHeader from '../CommonPageHeader';

const AssignPrePrimaryGrades = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { TermId, TeacherId } = useParams();
  const { showAlert, closeAlert } = useContext(AlertContext);
  let Teacher_ID = sessionStorage.getItem("TeacherId")
  let AssignPrePrimaryGradesAccess = GetScreenPermission(" Assign Pre-Primary Grades");
  const [selectTeacher, SetselectTeacher] = useState(AssignPrePrimaryGradesAccess === "N" ? Teacher_ID : "0");
  const [SelectTerm, SetSelectTerm] = useState("0");
  const [dateState, setDateState] = useState('');
  const [Subjectid, setSubjectid] = useState('');

  const asSchoolId = Number(localStorage.getItem('localSchoolId'));
  const asAcademicYearId = Number(sessionStorage.getItem('AcademicYearId'));

  useEffect(() => {
    if (TermId !== '' && TeacherId !== '') {
      console.log(TermId, TeacherId)
    }
  }, [TeacherId, TermId])
  useEffect(() => {
    if (TeacherId && TermId) {
      if (TeacherId.length > 0 && TermId.length > 0) {
        SetSelectTerm(TermId)
        SetselectTeacher(TeacherId)
      }
    }
  }, [TeacherId, TermId])
  const StandardDivisionId = Number(
    sessionStorage.getItem('StandardDivisionId')
  );

  const USGetTestwiseTerm: any = useSelector(
    (state: RootState) => state.AssignPrePrimaryGrades.ISGetTestwiseTerm
  );

  const USGetTeacherDropdown: any = useSelector(
    (state: RootState) => state.AssignPrePrimaryGrades.ISGetTeacherDropdown
  );

  const SubmitUnsubmitToastMsg: any = useSelector(
    (state: RootState) => state.AssignPrePrimaryGrades.ISGetSubmitUnsubmitExamMarksStatusMsg
  );

  const USGetTeacherXseedSubjects: any = useSelector(
    (state: RootState) =>
      state.AssignPrePrimaryGrades.ISGetTeacherXseedSubjectsBody
  );

  const USSubmitExamMarksStatus: any = useSelector(
    (state: RootState) => state.AssignPrePrimaryGrades.ISSubmitExamMarksStatus
  );

  const GetTestwiseTermBody: IGetTestwiseTermBody = {
    asSchoolId: asSchoolId,
    asAcademicYearId: asAcademicYearId
  };

  const GetTeacherDropdownBody: IGetClassTeachersBody = {
    asSchoolId: asSchoolId,
    asAcademicYearId: asAcademicYearId
  };

  const GetTeacherXseedSubjectsBody: IGetTeacherXseedSubjectsBody = {
    asSchoolId: Number(asSchoolId),
    asAcademicYear_ID: Number(asAcademicYearId),
    asTeacherId: Number(selectTeacher),
    asAssessmentId: Number(SelectTerm)
  };

  const ClickSubmit = (value, StandardDivisionID, pending) => {
    console.log(pending)

    const SubmitExamMarksStatusBody: IGetSubmitUnsubmitExamMarksStatusBody = {
      asStandard_Division_Id: Number(StandardDivisionID),
      asAssessmentId: Number(SelectTerm),
      asSubjectId: Number(value),
      IsSubmitted: true,
      asAcademicYearId: Number(asAcademicYearId),
      asSchoolId: Number(asSchoolId),
      asInserted_By_id: Number(selectTeacher)
    };

    showAlert({
      title: 'Please Confirm',
      message: value.asIsSubmitted !== 'N' ?
        //'Once you submit the result to the Class-teacher, you can not modify the marks/grades. Are you sure you want to continue?' :
        `${pending !== '' ? `Roll no.(s) grades not entered for : ${pending} \nAre you sure you want to continue?` : 'Once you submit the result to the class-teacher, you cannot modify the marks / grades. \nAre you sure you want to continue?'}` :
        'Are you sure, Do you want to unsubmit marks / grades?',
      variant: 'warning',
      confirmButtonText: 'Confirm',
      cancelButtonText: 'Cancel',
      onConfirm: () => {
        closeAlert();
        pending == '' && dispatch(CDAGetSubmitUnsubmitExamMarksStatus(SubmitExamMarksStatusBody));
        pending !== '' && showAlert({
          title: 'Please Confirm',
          message: value.asIsSubmitted !== 'N' ?
            //'Once you submit the result to the Class-teacher, you can not modify the marks/grades. Are you sure you want to continue?' :
            'Once you submit the result to the class-teacher, you cannot modify the marks / grades. \nAre you sure you want to continue?' :
            'Are you sure, Do you want to unsubmit marks/grades?',
          variant: 'warning',
          confirmButtonText: 'Confirm',
          cancelButtonText: 'Cancel',
          onConfirm: () => {
            closeAlert();
            dispatch(CDAGetSubmitUnsubmitExamMarksStatus(SubmitExamMarksStatusBody));
          },
          onCancel: closeAlert
        });
      },
      onCancel: closeAlert
    });

    // if (confirm(`Roll no.(s) grades not entered for : ${pending !== '' ? pending : "N/A"} \nAre you sure you want to continue?`)) {
    //   if (confirm(' Once you submit the result to the class-teacher, you can not modify the marks/grades. \nAre you sure you want to continue?')) {
    //     dispatch(CDAGetSubmitUnsubmitExamMarksStatus(SubmitExamMarksStatusBody));
    //   }
    // }
  };

  const ClickUnSubmit = (value, StandardDivisionID, pending) => {
    const SubmitExamMarksStatusBody: IGetSubmitUnsubmitExamMarksStatusBody = {
      asStandard_Division_Id: Number(StandardDivisionID),
      asAssessmentId: Number(SelectTerm),
      asSubjectId: Number(value),
      IsSubmitted: false,
      asAcademicYearId: Number(asAcademicYearId),
      asSchoolId: Number(asSchoolId),
      asInserted_By_id: Number(selectTeacher)
    };
    console.log("Submit and unsubmit body-->>>>>>>>", SubmitExamMarksStatusBody)
    showAlert({
      title: 'Please Confirm',
      message: value.asIsSubmitted !== 'N' ?
        //'Once you submit the result to the Class-teacher, you can not modify the marks/grades. Are you sure you want to continue?' :
        'Are you sure you want to unsubmit grades?' :
        'Are you sure, Do you want to unsubmit marks/grades?',
      variant: 'warning',
      confirmButtonText: 'Confirm',
      cancelButtonText: 'Cancel',
      onConfirm: () => {
        closeAlert();
        dispatch(CDAGetSubmitUnsubmitExamMarksStatus(SubmitExamMarksStatusBody));
      },
      onCancel: closeAlert
    });
    // if (confirm(`Are you sure you want to unsubmit grades?`)) {
    //   dispatch(CDAGetSubmitUnsubmitExamMarksStatus(SubmitExamMarksStatusBody));
    // }
  }

  useEffect(() => {
    if (SubmitUnsubmitToastMsg != '') {
      SubmitUnsubmitToastMsg === 'Marks already submitted' ? toast.success("Marks submitted successfully") : toast.success("Marks unsubmitted successfully")

      dispatch(resetSubmitUnSubmitGradeMsg());
      dispatch(CDAGetTeacherXseedSubjects(GetTeacherXseedSubjectsBody));
    }
  }, [SubmitUnsubmitToastMsg]);

  useEffect(() => {
    const getCurrentDateTime = () => {
      const currentDate = new Date();
      const formattedDate = currentDate.toLocaleString('en-US', {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        hour12: true
      });
      setDateState(formattedDate);
    };

    getCurrentDateTime();
  }, []);

  const HeaderPublish = [
    { Id: 1, Header: 'Class' },
    { Id: 2, Header: 'Subject' },
    { Id: 3, Header: 'Edit' },
    { Id: 4, Header: 'Submit' }
  ];

  // useEffect(() => {
  //   if (USGetTestwiseTerm.length > 0) {
  //     SetSelectTerm(USGetTestwiseTerm[0].Value);
  //   }
  // }, [USGetTestwiseTerm]);



  useEffect(() => {
    dispatch(CDAGetTestwiseTerm(GetTestwiseTermBody));
  }, []);

  useEffect(() => {
    dispatch(CDAGetTeacherDropdown(GetTeacherDropdownBody));
  }, [selectTeacher]);

  useEffect(() => {
    dispatch(CDAGetTeacherXseedSubjects(GetTeacherXseedSubjectsBody));
  }, [selectTeacher, SelectTerm]);

  const clickSelectTerm = (value) => {
    SetSelectTerm(value);
  };

  const clickSelectClass = (value) => {

    SetselectTeacher(value);
    console.log("Selected Teacher.............>> check number", selectTeacher)
  };
  const clickEdit = (SubmitStatusId, ClassName, SubjectName, SubjectId, StandardDivisionID) => {
    let EditStatusId = SubmitStatusId
    let StandardDivisionId = StandardDivisionID
    let Assesment: string;
    USGetTestwiseTerm.forEach(AssesmentArray => {
      if (AssesmentArray.Id === SelectTerm) {
        Assesment = AssesmentArray.Name
      }
    })
    if (SubmitStatusId === "1") {
      navigate('/extended-sidebar/Teacher/AssignProgressReportSubject' + '/' + EditStatusId + '/' + ClassName + '/' + Assesment + '/' + SelectTerm + '/' + SubjectName + '/' + SubjectId + '/' + StandardDivisionId + '/' + selectTeacher)
    } else if (SubmitStatusId === "2") {
      navigate('/extended-sidebar/Teacher/AssignProgressReportSubject' + '/' + EditStatusId + '/' + ClassName + '/' + Assesment + '/' + SelectTerm + '/' + SubjectName + '/' + SubjectId + '/' + StandardDivisionId + '/' + selectTeacher)
    } else if (SubmitStatusId === "3") {
      navigate('/extended-sidebar/Teacher/AssignProgressReportSubject' + '/' + EditStatusId + '/' + ClassName + '/' + Assesment + '/' + SelectTerm + '/' + SubjectName + '/' + SubjectId + '/' + StandardDivisionId + '/' + selectTeacher)
    }
  };
  let a = GetIsPrePrimaryTeacher()
  console.log("IsPrePrimary >>>>", a)
  return (
    <>
      <Box sx={{ px: 2 }}>
        <CommonPageHeader navLinks={[
          {
            title: 'Assign Pre-Primary Progress Report Grades',
            path: ''
          }
        ]}
          rightActions={
            <>
              <SearchableDropdown
                ItemList={USGetTestwiseTerm}
                onChange={clickSelectTerm}
                defaultValue={SelectTerm}
                label={'Assessment: '}
                sx={{ minWidth: '10vw' }}
                size={"small"}
                mandatory
              />
              {AssignPrePrimaryGradesAccess === "Y" &&
                <SearchableDropdown
                  ItemList={USGetTeacherDropdown}
                  onChange={clickSelectClass}
                  defaultValue={selectTeacher}
                  label={'Subject Teacher: '}
                  sx={{ minWidth: '20vw' }}
                  size={"small"}
                  mandatory
                />
              }
              <Box>
                <Tooltip title={`View all subjects assigned with the current status of grades given to students. Once grades for all 
                  the students are allotted you have to submit these grades to the class-teacher by clicking on 'submit' button.`}>
                  <IconButton sx={{
                    bgcolor: 'grey.500',
                    color: 'white',
                    '&:hover': {
                      bgcolor: 'grey.600'
                    }
                  }}>
                    <QuestionMark />
                  </IconButton>
                </Tooltip>
              </Box>

            </>
          }
        />
        <Box sx={{ background: 'white', p: 1 }}>
          <Box sx={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
            <Typography variant="h4" sx={{ mb: 0, lineHeight: 'normal', alignSelf: 'center', paddingBottom: '2px' }}>Legend</Typography>
            <Box sx={{ display: 'flex', gap: '20px' }}>
              <DotLegends
                color="secondary"
                text={undefined}
                text1={'Marks entry not started'}
                text2={'Marks entry partially done'}
                text3={'Submit exam marks to the class teacher'}
                text4={'Marks entry completed'}
                text5={'Unsubmit exam marks '} />

            </Box>
          </Box>
        </Box>




        {USGetTeacherXseedSubjects.length > 0 ? (
          <Box sx={{ backgroundColor: 'white', p: 2, marginTop: 2 }}>
            <div>
              < EditIconList
                ItemList={SelectTerm !== '' ? USGetTeacherXseedSubjects : []}
                clickEdit={clickEdit}
                HeaderArray={HeaderPublish}
                clicksubmit={ClickSubmit}
                clickUnSubmit={ClickUnSubmit}
              />
            </div>
          </Box>
        ) : (
          <Typography variant="body1" sx={{ textAlign: 'center', marginTop: 1, backgroundColor: '#324b84', padding: 1, borderRadius: 2, color: 'white' }}>
            <b>No record found.</b>
          </Typography>
        )
        }




      </Box >
    </>
  );
};

export default AssignPrePrimaryGrades;