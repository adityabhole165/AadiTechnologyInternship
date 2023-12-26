import React, { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'src/store';
import {
  IGetTestwiseTermBody,
  IGetClassTeachersBody,
  IGetTeacherXseedSubjectsBody
} from 'src/interfaces/AssignPrePrimaryGrade/IAssignPrePrimaryGrades';
import {
  CDAGetTestwiseTerm,
  CDAGetClassTeachers,
  CDAGetTeacherXseedSubjects
} from 'src/requests/AssignPrePrimaryGrades/ReqAssignPrePrimaryGrades';
import { Grid, Box, Container, Typography } from '@mui/material';
import LegendsIcon from 'src/libraries/ResuableComponents/LegendsIcon';
import Dropdown from 'src/libraries/dropdown/Dropdown';
import EditIconList from 'src/libraries/ResuableComponents/EditIconList';
import { useNavigate } from 'react-router';

const AssignPrePrimaryGrades = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [selectTeacher, SetselectTeacher] = useState();
  const [SelectTerm, SetSelectTerm] = useState();

  const asSchoolId = Number(localStorage.getItem('localSchoolId'));
  const asAcademicYearId = Number(sessionStorage.getItem('AcademicYearId'));
  
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

  const GetTestwiseTermBody: IGetTestwiseTermBody = {
    asSchoolId: asSchoolId
  };

  const GetClassTeachersBody: IGetClassTeachersBody = {
    asSchoolId: asSchoolId,
    asAcademicYearId: asAcademicYearId
  };

  const GetTeacherXseedSubjectsBody: IGetTeacherXseedSubjectsBody = {
    asSchoolId: asSchoolId,
    asAcademicYear_ID: asAcademicYearId,
    asTeacherId: 2396,
    asAssessmentId: 27
  };

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
  }, [selectTeacher]);

  const clickSelectTerm = (value) => {
    SetSelectTerm(value);
  };

  const clickSelectClass = (value) => {
    SetselectTeacher(value);
  };
  const clickEdit = () => {
    navigate('/extended-sidebar/Common/EventOverview');
  };
  const ClickSubmit = (value) => {};

  return (
    <>
      <Container>
          <div>
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
        </div>
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
    HeaderArray={HeaderPublish}
    clicksubmit={ClickSubmit}
  />
</Container>

    </>
  );
};

export default AssignPrePrimaryGrades;
