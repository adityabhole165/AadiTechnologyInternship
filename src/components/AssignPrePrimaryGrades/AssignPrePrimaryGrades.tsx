import QuestionMark from '@mui/icons-material/QuestionMark';
import { Box, IconButton, Stack, Tooltip, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import {
  IGetClassTeachersBody,
  IGetTeacherXseedSubjectsBody,
  IGetTestwiseTermBody,
  ISubmitExamMarksStatusBody
} from 'src/interfaces/AssignPrePrimaryGrade/IAssignPrePrimaryGrades';
import EditIconList from 'src/libraries/ResuableComponents/EditIconList';
import LegendsIcon from 'src/libraries/ResuableComponents/LegendsIcon';
import SearchableDropdown from 'src/libraries/ResuableComponents/SearchableDropdown';
import {
  CDAGetClassTeachers,
  CDAGetTeacherXseedSubjects,
  CDAGetTestwiseTerm,
  CDASubmitExamMarksStatus,
  resetMessage
} from 'src/requests/AssignPrePrimaryGrades/ReqAssignPrePrimaryGrades';
import { RootState } from 'src/store';
import CommonPageHeader from '../CommonPageHeader';

const AssignPrePrimaryGrades = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [selectTeacher, SetselectTeacher] = useState();
  const [SelectTerm, SetSelectTerm] = useState();
  const [dateState, setDateState] = useState('');
  const [Subjectid, setSubjectid] = useState('');

  const asSchoolId = Number(localStorage.getItem('localSchoolId'));
  const asAcademicYearId = Number(sessionStorage.getItem('AcademicYearId'));
  const StandardDivisionId = Number(
    sessionStorage.getItem('StandardDivisionId')
  );

  const USGetTestwiseTerm: any = useSelector(
    (state: RootState) => state.AssignPrePrimaryGrades.ISGetTestwiseTerm
  );

  const USGetClassTeachers: any = useSelector(
    (state: RootState) => state.AssignPrePrimaryGrades.ISGetClassTeachers
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

  const GetClassTeachersBody: IGetClassTeachersBody = {
    asSchoolId: asSchoolId,
    asAcademicYearId: asAcademicYearId
  };

  const GetTeacherXseedSubjectsBody: IGetTeacherXseedSubjectsBody = {
    asSchoolId: Number(asSchoolId),
    asAcademicYear_ID: Number(asAcademicYearId),
    asTeacherId: Number(selectTeacher),
    asAssessmentId: Number(SelectTerm)
  };

  const ClickSubmit = (value, StandardDivisionID) => {
    const SubmitExamMarksStatusBody: ISubmitExamMarksStatusBody = {
      asStandard_Division_Id: StandardDivisionID,
      asAssessmentId: SelectTerm,
      asSubjectId: Number(value),
      asAcademicYearId: asAcademicYearId,
      asSchoolId: asSchoolId,
      asInserted_By_id: selectTeacher,
      asInsertDate: String(dateState)
    };

    dispatch(CDASubmitExamMarksStatus(SubmitExamMarksStatusBody));
  };

  useEffect(() => {
    if (USSubmitExamMarksStatus != '') {
      toast.success(USSubmitExamMarksStatus);
      dispatch(resetMessage());
      dispatch(CDAGetTeacherXseedSubjects(GetTeacherXseedSubjectsBody));
    }
  }, [USSubmitExamMarksStatus]);

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

  useEffect(() => {
    if (USGetTestwiseTerm.length > 0) {
      SetSelectTerm(USGetTestwiseTerm[0].Value);
    }
  }, [USGetTestwiseTerm]);

  useEffect(() => {
    if (USGetClassTeachers.length > 0) {
      SetselectTeacher(USGetClassTeachers[0].Value);
    }
  }, [USGetClassTeachers]);

  useEffect(() => {
    dispatch(CDAGetTestwiseTerm(GetTestwiseTermBody));
  }, []);

  useEffect(() => {
    dispatch(CDAGetClassTeachers(GetClassTeachersBody));
  }, []);

  useEffect(() => {
    dispatch(CDAGetTeacherXseedSubjects(GetTeacherXseedSubjectsBody));
  }, [selectTeacher, SelectTerm]);

  const clickSelectTerm = (value) => {
    SetSelectTerm(value);
  };

  const clickSelectClass = (value) => {
    SetselectTeacher(value);
    console.log("Selected Teacher..>>", selectTeacher, typeof (selectTeacher))
  };
  const clickEdit = (EditId, ClassName, SubjectName, SubjectId, StandardDivisionID) => {
    let EditStatusId = EditId
    let StandardDivisionId = StandardDivisionID
    let Assesment: string;
    USGetTestwiseTerm.forEach(AssesmentArray => {
      if (AssesmentArray.Id === SelectTerm) {
        Assesment = AssesmentArray.Name
      }
    })
    if (EditId === "1") {
      navigate('/extended-sidebar/Teacher/AssignProgressReportSubject' + '/' + EditStatusId + '/' + ClassName + '/' + Assesment + '/' + SelectTerm + '/' + SubjectName + '/' + SubjectId + '/' + StandardDivisionId + '/')
    } else if (EditId === "2") {
      navigate('/extended-sidebar/Teacher/AssignProgressReportSubject' + '/' + EditStatusId + '/' + ClassName + '/' + Assesment + '/' + SelectTerm + '/' + SubjectName + '/' + SubjectId + '/' + StandardDivisionId + '/')
    } else if (EditId === "3") {
      navigate('/extended-sidebar/Teacher/AssignProgressReportSubject' + '/' + EditStatusId + '/' + ClassName + '/' + Assesment + '/' + SelectTerm + '/' + SubjectName + '/' + SubjectId + '/' + StandardDivisionId + '/')
    }
  };

  return (
    <>
      <Box sx={{ px: 2 }}>
        <CommonPageHeader navLinks={[
          {
            title: 'Assign Pre-Primary Grades',
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
              <SearchableDropdown
                ItemList={USGetClassTeachers}
                onChange={clickSelectClass}
                defaultValue={selectTeacher}
                label={'Subject Teacher: '}
                sx={{ minWidth: '20vw' }}
                size={"small"}
                mandatory
              />
              <Box>
                <Tooltip title={`View all subjects assigned with the current status of grades given to students.Once grades for all 
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

        <Box sx={{ backgroundColor: 'white', p: 2 }}>

          < EditIconList
            ItemList={SelectTerm !== '' ? USGetTeacherXseedSubjects : []}
            clickEdit={clickEdit}
            HeaderArray={HeaderPublish}
            clicksubmit={ClickSubmit}
          />

          <Box sx={{ mt: 2 }}>
            <Typography variant='h4'>
              Legends
            </Typography>
            <Stack direction={'row'} alignItems={'center'} gap={2} sx={{ mt: 1 }}>
              <LegendsIcon
                color="secondary"
                text1={'Marks entry not started'}
                text2={'Marks entry partially done'}
                text3={'Submit exam marks to the class teacher'}
                text5={'Marks entry completed '}
              />
            </Stack>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default AssignPrePrimaryGrades;