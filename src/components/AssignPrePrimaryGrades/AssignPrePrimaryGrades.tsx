import CheckIcon from '@mui/icons-material/Check';
import DesignServicesIcon from '@mui/icons-material/DesignServices';
import EditOff from '@mui/icons-material/EditOff';
import QuestionMark from '@mui/icons-material/QuestionMark';
import { Box, Grid, IconButton, Stack, Tooltip, Typography } from '@mui/material';
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
import { decodeURL, GetIsPrePrimaryTeacher, GetScreenAccessPermissionByPageID } from '../Common/Util';
import CommonPageHeader from '../CommonPageHeader';

import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import EventBusyIcon from '@mui/icons-material/EventBusy';
import Legend from 'src/libraries/Legend/Legend';



const AssignPrePrimaryGrades = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let {
    TermId,
    TeacherId
  } = useParams();

  // Decode in-place
  TermId = decodeURL(TermId);
  TeacherId = decodeURL(TeacherId);

  const { showAlert, closeAlert } = useContext(AlertContext);
  let Teacher_ID = sessionStorage.getItem("TeacherId")
  let AssignPrePrimaryGradesAccess = GetScreenAccessPermissionByPageID(162);
  const [selectTeacher, SetselectTeacher] = useState(AssignPrePrimaryGradesAccess === "N" ? Teacher_ID : "0");
  const [SelectTerm, SetSelectTerm] = useState("0");
  const [dateState, setDateState] = useState('');
  const [Subjectid, setSubjectid] = useState('');

  const asSchoolId = Number(localStorage.getItem('localSchoolId'));
  const asAcademicYearId = Number(sessionStorage.getItem('AcademicYearId'));
  const GetTestwiseTermBody: IGetTestwiseTermBody = {
    asSchoolId: asSchoolId,
    asAcademicYearId: asAcademicYearId
  };

  const GetTeacherDropdownBody: IGetClassTeachersBody = {
    asSchoolId: asSchoolId,
    asAcademicYearId: asAcademicYearId
  };
  useEffect(() => {
    dispatch(CDAGetTestwiseTerm(GetTestwiseTermBody));
    dispatch(CDAGetTeacherDropdown(GetTeacherDropdownBody));
  }, []);
  useEffect(() => {
    if (TermId !== '' && TeacherId !== '') {
      //console.log(TermId, TeacherId)
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

  const Loading = useSelector((state: RootState) => state.AssignPrePrimaryGrades.Loading);



  const GetTeacherXseedSubjectsBody: IGetTeacherXseedSubjectsBody = {
    asSchoolId: Number(asSchoolId),
    asAcademicYear_ID: Number(asAcademicYearId),
    asTeacherId: Number(selectTeacher),
    asAssessmentId: Number(SelectTerm)
  };

  const ClickSubmit = (value, StandardDivisionID, pending) => {
    //console.log(pending)

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

  const ClickUnSubmit = (value, StandardDivisionID, pending, IsPublished) => {
    const SubmitExamMarksStatusBody: IGetSubmitUnsubmitExamMarksStatusBody = {
      asStandard_Division_Id: Number(StandardDivisionID),
      asAssessmentId: Number(SelectTerm),
      asSubjectId: Number(value),
      IsSubmitted: false,
      asAcademicYearId: Number(asAcademicYearId),
      asSchoolId: Number(asSchoolId),
      asInserted_By_id: Number(selectTeacher)
    };
    //console.log("Submit and unsubmit body-->>>>>>>>", SubmitExamMarksStatusBody)
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
      SubmitUnsubmitToastMsg === 'Marks already submitted' ? toast.success("Grades submitted successfully.") : toast.success("Grades unsubmitted successfully.")

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
    dispatch(CDAGetTeacherXseedSubjects(GetTeacherXseedSubjectsBody));
  }, [selectTeacher, SelectTerm]);

  const clickSelectTerm = (value) => {
    SetSelectTerm(value);
  };

  const clickSelectClass = (value) => {
    SetselectTeacher(value);
  };
  const clickEdit = (SubmitStatusId, ClassName, SubjectName, SubjectId, StandardDivisionID, IsXseed, IsPublished) => {
    let EditStatusId = IsPublished === 'Y' ? '3P' : SubmitStatusId;
    let StandardDivisionId = StandardDivisionID;
    let Assesment = '';
    let isXseed = IsXseed;

    // Find the assessment name from the term array
    USGetTestwiseTerm.forEach(AssesmentArray => {
      if (AssesmentArray.Id === SelectTerm) {
        Assesment = AssesmentArray.Name;
      }
    });

    // Create the common state object to pass via navigate
    const state = {
      EditStatusId,
      ClassName,
      Assesment,
      SelectTerm,
      SubjectName,
      SubjectId,
      StandardDivisionId,
      selectTeacher,
    };

    if (isXseed === 'N') {
      // Navigate for non-Xseed cases
      if (SubmitStatusId === "1" || SubmitStatusId === "2" || SubmitStatusId === "3") {
        navigate('/RITeSchool/Teacher/AssignProgressReportSubject', { state });
      }
    } else if (isXseed === 'Y') {
      // Navigate for Xseed cases
      if (SubmitStatusId === "1" || SubmitStatusId === "2" || SubmitStatusId === "3") {
        navigate('/RITeSchool/Teacher/AssignPrePrimarySubjectGrades', { state });
      }
    }
  };

  let a = GetIsPrePrimaryTeacher()
  //console.log("IsPrePrimary >>>>", a)

  const LegendArray = [

    {
      id: 1,
      Name: 'Marks entry not started',
      Value:
        <EditOff style={{ color: '#f44336', fontSize: 'large', position: 'relative', top: '-2px' }} />
    },
    {
      id: 2,
      Name: 'Marks entry partially done',
      Value:
        <DesignServicesIcon style={{ color: '#ff9800', fontSize: 'large', position: 'relative', top: '-2px' }} />

    },
    {
      id: 3,
      Name: 'Submit exam marks to the class teacher',
      Value:
        <EventAvailableIcon style={{ color: '#25e67b', fontSize: 'large', position: 'relative', top: '-2px' }} />
    },
    {
      id: 4,
      Name: 'Marks entry completed',
      Value:
        <CheckIcon style={{ color: '#07bc0c', fontSize: 'large', position: 'relative', top: '-2px' }} />
    },
    {
      id: 5,
      Name: 'Unsubmit exam marks',
      Value:
        <EventBusyIcon style={{ color: 'black', fontSize: 'large', position: 'relative', top: '-2px' }} />
    }
  ]
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
              <Stack
                direction={{ xs: 'column', sm: 'row' }}
                justifyContent="space-between"
                alignItems="left"
                gap={1}
                sx={{ flexWrap: { xs: 'nowrap', sm: 'nowrap' } }}
              >
                <Grid
                  item
                  xs={12}
                  display="flex"
                  justifyContent={{ xs: 'flex-start', sm: 'flex-end' }}
                >
                  <SearchableDropdown
                    ItemList={USGetTestwiseTerm}
                    onChange={clickSelectTerm}
                    defaultValue={SelectTerm}
                    label={'Assessment: '}
                    sx={{ width: { xs: '40vw', sm: '20vw' } }}
                    size={"small"}
                    DisableClearable={true}
                    mandatory
                  />
                </Grid>

                {AssignPrePrimaryGradesAccess === "Y" &&
                  <Grid
                    item
                    xs={12}
                    display="flex"
                    justifyContent={{ xs: 'flex-start', sm: 'flex-end' }}
                  >
                    <SearchableDropdown
                      ItemList={USGetTeacherDropdown}
                      onChange={clickSelectClass}
                      defaultValue={selectTeacher}
                      label={'Subject Teacher: '}
                      sx={{ width: { xs: '40vw', sm: '20vw' } }}
                      size={"small"}
                      mandatory
                    />
                  </Grid>
                }

                <Stack
                  direction={{ xs: 'column', sm: 'row' }}
                  justifyContent="space-between"
                  alignItems="left"
                  gap={1}
                  sx={{ flexWrap: { xs: 'nowrap', sm: 'nowrap' } }}
                >
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
                </Stack>
              </Stack>
            </>
          }
        />
        <Box sx={{ background: 'white', p: 1, mb: 2 }}>
          <Legend LegendArray={LegendArray} />
        </Box>

        {USGetTeacherXseedSubjects.length > 0 &&
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
        }

        {selectTeacher !== '0' && SelectTerm !== '0' && USGetTeacherXseedSubjects.length === 0 &&
          // setTimeout(() => {
          <Typography variant="body1" sx={{ textAlign: 'center', marginTop: 1, backgroundColor: '#324b84', padding: 1, borderRadius: 2, color: 'white' }}>
            <b>No record found.</b>
          </Typography>
          // }, 2000)
        }
      </Box >
    </>
  );
};

export default AssignPrePrimaryGrades;