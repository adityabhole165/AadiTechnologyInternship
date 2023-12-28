import React, { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'src/store';
import {
  IGetTestwiseTermBody,
  IGetClassTeachersBody,
  IGetTeacherXseedSubjectsBody,ISubmitExamMarksStatusBody
} from 'src/interfaces/AssignPrePrimaryGrade/IAssignPrePrimaryGrades';
import {
  CDAGetTestwiseTerm,
  CDAGetClassTeachers,
  CDAGetTeacherXseedSubjects,CDASubmitExamMarksStatus,resetMessage
} from 'src/requests/AssignPrePrimaryGrades/ReqAssignPrePrimaryGrades';
import { Grid, Box, Container, Typography } from '@mui/material';
import LegendsIcon from 'src/libraries/ResuableComponents/LegendsIcon';
import Dropdown from 'src/libraries/dropdown/Dropdown';
import EditIconList from 'src/libraries/ResuableComponents/EditIconList';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import PageHeader from 'src/libraries/PageHeaderDocs';

const AssignPrePrimaryGrades = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [selectTeacher, SetselectTeacher] = useState();
  const [SelectTerm, SetSelectTerm] = useState();
  const [dateState, setDateState] = useState('');
  const [Subjectid, setSubjectid ]= useState('');



  const asSchoolId = Number(localStorage.getItem('localSchoolId'));
  const asAcademicYearId = Number(sessionStorage.getItem('AcademicYearId'));
  const StandardDivisionId = Number(sessionStorage.getItem('StandardDivisionId'));
  
  const USGetTestwiseTerm: any = useSelector(
    (state: RootState) => state.AssignPrePrimaryGrades.ISGetTestwiseTerm
  );
  console.log(USGetTestwiseTerm,"USGetTestwiseTerm--1");
  
  const USGetClassTeachers: any = useSelector(
    (state: RootState) => state.AssignPrePrimaryGrades.ISGetClassTeachers
  );
 console.log(USGetClassTeachers,"USGetClassTeachers-----2");
 
  const USGetTeacherXseedSubjects: any = useSelector(
    (state: RootState) =>
      state.AssignPrePrimaryGrades.ISGetTeacherXseedSubjectsBody
  );
  console.log(USGetTeacherXseedSubjects,"USGetTeacherXseedSubjects-----3");
  

  const USSubmitExamMarksStatus: any = useSelector(
    (state: RootState) =>
      state.AssignPrePrimaryGrades.ISSubmitExamMarksStatus
  );
console.log(USSubmitExamMarksStatus,"USSubmitExamMarksStatus-------4");

  const GetTestwiseTermBody: IGetTestwiseTermBody = {
    asSchoolId: asSchoolId,
    asAcademicYearId: asAcademicYearId

  };

  const GetClassTeachersBody: IGetClassTeachersBody = {
    asSchoolId: asSchoolId,
    asAcademicYearId: asAcademicYearId
  };

  const GetTeacherXseedSubjectsBody: IGetTeacherXseedSubjectsBody = {
    asSchoolId: asSchoolId,
    asAcademicYear_ID: asAcademicYearId,
    asTeacherId: selectTeacher,
    asAssessmentId: SelectTerm
  };



  const ClickSubmit = (value, StandardDivisionID) => {
    const SubmitExamMarksStatusBody: ISubmitExamMarksStatusBody = 
    {
      asStandard_Division_Id:StandardDivisionID,
      asAssessmentId:SelectTerm,
      asSubjectId: Number(value),
      asAcademicYearId:asAcademicYearId,
      asSchoolId:asSchoolId,
      asInserted_By_id:selectTeacher,
      asInsertDate: String (dateState)

  }

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
        hour12: true,
      });
      setDateState(formattedDate);
    };

    getCurrentDateTime();
  }, []);

  const HeaderPublish = [
    { Id: 1, Header: 'Class' },
    { Id: 2, Header: 'Subject' },
    { Id: 3, Header: 'Edit' },
    { Id: 4, Header: 'Sumbit' }
  ];

    useEffect(() => {
      if ( USGetTestwiseTerm.length > 0) {
          SetSelectTerm(USGetTestwiseTerm[0].Value);
      }
    }, [ USGetTestwiseTerm]);

    useEffect(() => {
      if (USGetClassTeachers.length > 0) {
          SetselectTeacher(USGetClassTeachers[0].Value);

      }
    }, [USGetClassTeachers ]);
    

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
  };
  const clickEdit = () => {
    navigate('/extended-sidebar/Teacher/examresult');
  };
  

  const clickEdit1 = () => {
    navigate('/extended-sidebar/Common/EventOverview');
  };

  return (
    <>
    
      <Container>
      {/* <PageHeader heading={'AssignPre-PrimaryGrades'} subheading={''} /> */}

          
          <Grid container>
            <Grid item xs={10}>
              <h4>Legends</h4>
              <Box sx={{ display: 'flex', gap: '20px' }}>
              <LegendsIcon
          color="secondary"
          text1={'Marks entry not started'}
          text2={'Marks entry partially done'}
          text3={'Submit exam marks to the class teacher'}
          text5={'Marks entry completed '}
        />
              </Box>
            </Grid>
          </Grid>

          <Grid container>
            <Grid item xs={12}></Grid>
          </Grid>
        
  <br></br>
  <Grid
    container
    spacing={2}
    justifyContent="center"
    alignItems="center"
  >
    <Grid item xs={2}>
      <Typography
        component={Box}
        sx={{ border: '1px solid black' }}
        p={0.3}
      >
        Assessment:
      </Typography>
    </Grid>
    <Grid item xs={2}>
      <Dropdown
        Array={USGetTestwiseTerm}
        handleChange={clickSelectTerm}
        defaultValue={SelectTerm}
        label={''}
      />
      <br></br>
    </Grid>
    <Grid item xs={2}>
      <Typography
        component={Box}
        sx={{ border: '1px solid black' }}
        p={0.5}
      >
        Subject Teacher :
      </Typography>
    </Grid>
    <Grid item xs={2}>
      <Dropdown
        Array={USGetClassTeachers}
        handleChange={clickSelectClass}
        defaultValue={selectTeacher}
        label={''}
      />
    
    </Grid>
  </Grid>
  <br></br>
  <EditIconList
    ItemList={USGetTeacherXseedSubjects}
    clickEdit={clickEdit}
    clickEdit1={clickEdit1}
    HeaderArray={HeaderPublish}
    clicksubmit={ClickSubmit}
  />
</Container>

    </>
  );
};

export default AssignPrePrimaryGrades;
