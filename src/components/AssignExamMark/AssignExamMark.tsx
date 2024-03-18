import { Box, Breadcrumbs, Container, Grid, IconButton, Stack, Tooltip, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  IAssignClassBody,
  IClasswiseExamDropdownBody,
  ISubjectsExamMarksStatusForClassBody,
  ISubmitTestMarksToClassTeacherBody
} from 'src/interfaces/AssignExamMarks/IAssignExamMarks';

import Dropdown from 'src/libraries/dropdown/Dropdown';
import {
  GetAssignExamMarkList,
  GetClassWiseExam,
  GetSubjectList,
  ReqSubmitMarksTeacher,
  resetMessage
} from 'src/requests/AssignExamMarks/ReqAssignExamMarks';
import { RootState } from 'src/store';

import ChevronRightTwoTone from '@mui/icons-material/ChevronRightTwoTone';
import HomeTwoTone from '@mui/icons-material/HomeTwoTone';
import QuestionMark from '@mui/icons-material/QuestionMark';
import { grey } from '@mui/material/colors';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import DotLegends from 'src/libraries/ResuableComponents/DotLegends';
import ListEditIcon1 from 'src/libraries/ResuableComponents/ListEditIcon1';

const AssignExamMark = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [selectClass, SetSelectClass] = useState();
  const [ClassWiseExam, SetClassWiseExam] = useState();

  const asSchoolId = Number(localStorage.getItem('localSchoolId'));
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

  const UsSubmitMarksTeacher = useSelector(
    (state: RootState) => state.AssignExamMarkSlice.ISSubmitMarksTeacher
  );
  console.log(UsSubmitMarksTeacher, 'UsSubmitMarksTeacher');

  //ClassDrpdown

  const GetSubjectListtClass: ISubjectsExamMarksStatusForClassBody = {
    asSchoolId: asSchoolId,
    asAcademicYearId: asAcademicYearId,
    aTeacherId: aTeacherId,
    asExamId: ClassWiseExam,
    asStandardDivisionId: selectClass
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
      asStandardDivisionId: String(selectClass),
      asSubjectId: value,
      asTestId: ClassWiseExam,
      asSchoolId: String(asSchoolId),
      asAcademicYearId: String(asAcademicYearId),
      asIsSubmitted: 'Y'
    };

    dispatch(ReqSubmitMarksTeacher(SubmitTestMarksTeacherBody));
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
    { Id: 3, Header: 'Edit' },
    { Id: 4, Header: 'Submit' }
  ];

  const clickEdit = () => {
    navigate('/extended-sidebar/Common/EventOverview');
  };
  return (
    <Container maxWidth={"xl"}>
      <Stack
        direction={'row'}
        justifyContent={'space-between'}
        alignItems={'center'}
        sx={{
          pt: 5
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
                  border: (theme) => `1px solid ${theme.palette.grey[400]}`
                }}
              >
                <HomeTwoTone color="primary" />
              </IconButton>
            </Link>
            <Typography variant={'h3'} fontSize={'23px'} color="text.primary">
              Assign Exam Marks
            </Typography>
          </Breadcrumbs>
        </Box>
        <Stack direction={'row'} alignItems={'center'} gap={1}>
          <Box>
            <Dropdown
              variant={"outlined"}
              Array={ClassDropdown}
              handleChange={onClickClass}
              defaultValue={selectClass}
              label={'Class'}
              width={"150px"}
            />
          </Box>
          <Box>
            <Dropdown
              variant={"outlined"}
              Array={ClassWiseExamDropdown}
              handleChange={clickClassWiseExam}
              defaultValue={ClassWiseExam}
              label={'Exam'}
              width={"200px"}
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
        </Stack>
      </Stack>

      <Box sx={{ mt: 2, background: 'white', p: 2 }}>
        <Typography variant={"h4"} mb={2}>My Subject(s):-</Typography>
        <ListEditIcon1
          ItemList={SubjectListmarkClass}
          clickEdit={clickEdit}
          HeaderArray={HeaderPublish}
          clicksubmit={ClickSubmit}
        />
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
    </Container>
  );
};

export default AssignExamMark;
