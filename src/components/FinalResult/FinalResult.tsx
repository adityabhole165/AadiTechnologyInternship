import AssignmentIcon from '@mui/icons-material/Assignment';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Container, Grid, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import {
  IClassTeacherListBody,
  IGetPagedStudentBody
} from 'src/interfaces/FinalResult/IFinalResult';
import Dropdown from 'src/libraries/dropdown/Dropdown';
import PageHeader from 'src/libraries/heading/PageHeader';
import DynamicList2 from 'src/libraries/list/DynamicList2';
import { ButtonPrimary } from 'src/libraries/styled/ButtonStyle';
import {
  ClassTechersList,
  GetStudentResultList
} from 'src/requests/FinalResult/RequestFinalResult';
import { RootState } from 'src/store';
const FinalResult = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [SelectTeacher, setSelectTeacher] = useState();

  const asSchoolId = Number(localStorage.getItem('localSchoolId'));
  const asAcademicYearId = Number(sessionStorage.getItem('AcademicYearId'));
  const asUpdatedById = localStorage.getItem('Id');
  const TeacherId = Number(sessionStorage.getItem('TeacherId'));
  const StandardDivisionId = Number(
    sessionStorage.getItem('StandardDivisionId')
  );

  const HeaderList = [
    'Roll No.',
    'Student Name',
    'Total',
    '%',
    'Grade',
    'Result',
    'Generate',
    'View',
    'Grace'
  ];
  const IconList = [
    {
      Id: 1,
      Icon: <AssignmentIcon />,
      Action: 'AssignmentIcon'
    },

    {
      Id: 2,
      Icon: <VisibilityIcon />,
      Action: 'VisibilityIcon'
    }
  ];
  // const asSchoolId = Number(localStorage.getItem('localSchoolId'));
  // const asAcademicYearId = Number(sessionStorage.getItem('AcademicYearId'));

  const GetClassTeachers = useSelector(
    (state: RootState) => state.FinalResult.ClassTeachers
  );
  const GetStudentLists = useSelector(
    (state: RootState) => state.FinalResult.StudentResultList
  );

  useEffect(() => {
    dispatch(ClassTechersList(ClassTeachersBody));
  }, []);

  useEffect(() => {
    if (SelectTeacher != '0') dispatch(GetStudentResultList(PagedStudentBody));
  }, [SelectTeacher]);

  const ClassTeachersBody: IClassTeacherListBody = {
    asSchoolId: asSchoolId,
    asAcademicYearId: asAcademicYearId
  };
  const PagedStudentBody: IGetPagedStudentBody = {
    asSchoolId: asSchoolId.toString(),
    asAcademicyearId: asAcademicYearId.toString(),
    asStandardDivisionId: SelectTeacher,
    SortExp: 'ORDER BY Roll_No',
    prm_StartIndex: 0,
    PageSize: 20
  };
  const clickTeacherDropdown = (value) => {
    setSelectTeacher(value);
  };
  const ClickItem = (value) => {};

  const getTeacherId = () => {
    let TeacherId = '';
    GetClassTeachers.map((item) => {
      if (item.Value == SelectTeacher) TeacherId = item.Id;
    });
    return TeacherId;
  };
  const Toppers = (value) => {
    navigate('/extended-sidebar/Teacher/FinalResultToppers/' + getTeacherId());
  };

  const getTeacherName = () => {
    let TeacherName = '';
    GetClassTeachers.map((item) => {
      if (item.Value == SelectTeacher) TeacherName = item.Name;
    });
    return TeacherName;
  };
  const onClickUnpublish = () => {
    navigate(
      '/extended-sidebar/Teacher/FinalResultUnpublish/' +
        SelectTeacher +
        '/' +
        getTeacherName()
    );
  };
  return (
    <Container>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <PageHeader heading="Final Result" />
      <Grid container spacing={1} alignItems="center">
        <Grid item xs={3}>
          <Typography margin={'1px'}>
            <b>Select Class Teacher:</b>
          </Typography>
        </Grid>
        <Grid item xs={3}>
          <Dropdown
            Array={GetClassTeachers}
            handleChange={clickTeacherDropdown}
            defaultValue={SelectTeacher}
            label={SelectTeacher}
          />
        </Grid>
        <Grid item xs={6}>
          <ButtonPrimary
            variant="contained"
            style={{ marginLeft: '60px', backgroundColor: 'Blue' }}
            onClick={Toppers}
          >
            {' '}
            TOPPERS{' '}
          </ButtonPrimary>
        </Grid>
        <br></br>
        <br></br>
        {GetStudentLists != undefined && (
          <DynamicList2
            HeaderList={HeaderList}
            ItemList={GetStudentLists}
            IconList={IconList}
            ClickItem={ClickItem}
          />
        )}
        <Grid item xs={12}>
          <ButtonPrimary
            variant="contained"
            style={{ marginLeft: '60px', backgroundColor: 'Blue' }}
          >
            GENERATE ALL
          </ButtonPrimary>
          <ButtonPrimary
            variant="contained"
            style={{ marginLeft: '60px', backgroundColor: 'Blue' }}
          >
            VIEW RESULT ALL
          </ButtonPrimary>
          <ButtonPrimary
            variant="contained"
            style={{ marginLeft: '60px', backgroundColor: 'Blue' }}
          >
            PUBLISH
          </ButtonPrimary>
          <ButtonPrimary
            onClick={onClickUnpublish}
            variant="contained"
            style={{ marginLeft: '60px', backgroundColor: 'Blue' }}
          >
            UNPUBLISH
          </ButtonPrimary>
        </Grid>
      </Grid>
    </Container>
  );
};

export default FinalResult;
