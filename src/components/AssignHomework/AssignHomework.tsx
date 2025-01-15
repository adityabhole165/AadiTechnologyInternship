import AddTaskIcon from '@mui/icons-material/AddTask';
import QuestionMark from '@mui/icons-material/QuestionMark';
import {
  Box,
  Grid,
  IconButton,
  Stack,
  Tooltip,
  Typography
} from '@mui/material';
import { blue, grey } from '@mui/material/colors';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import {
  IClassDropDownBody,
  IClassTeacherDropdownBody,
  IGetTeacherSubjectDetailsBody,
  ISchoolsettingBody,
  ITeacherDropdownBody
} from 'src/interfaces/AssignHomework/IAssignHomework';
import SuspenseLoader from 'src/layouts/components/SuspenseLoader';
import Assignhomeworklist from 'src/libraries/ResuableComponents/Assignhomeworklist';
import SearchableDropdown from 'src/libraries/ResuableComponents/SearchableDropdown';
import {
  ClassName,
  FullTeacherName,
  GetschoolSettings,
  ReqschoolSettings,
  SubjectDetails,
  TeacherNameList
} from 'src/requests/AssignHomework/RequestAssignHomework';
import { RootState } from 'src/store';
import { GetScreenPermission, decodeURL, encodeURL } from '../Common/Util';
import CommonPageHeader from '../CommonPageHeader';
const AssignHomework = () => {

  // ClassTecherId
  let { ClassTecherId, ClassId } = useParams();
  ClassTecherId = decodeURL(ClassTecherId);
  ClassId = decodeURL(ClassId);
  useEffect(() => {
    console.log(ClassTecherId, "ClassTecherId");
    console.log(ClassId, "ClassId");
  }, [ClassTecherId, ClassId]);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const HeaderOfTable = [
    { Id: 1, Header: 'Class', width: 200 },
    { Id: 2, Header: 'Subject' },
    { Id: 3, Header: 'Assign', width: 400, align: 'center' }
  ];
  const asSchoolId = Number(localStorage.getItem('localSchoolId'));
  const TeacherId = Number(sessionStorage.getItem('TeacherId'));
  const asAcademicYearId = Number(sessionStorage.getItem('AcademicYearId'));
  const asShowHomeworkToClassTeacher = Number(
    sessionStorage.getItem('ShowHomeworkToClassTeacher')
  );
  const asStandardDivisionId = Number(
    sessionStorage.getItem('StandardDivisionId')
  );
  const AssignHomeworkPermission = GetScreenPermission('Assign Homework');

  const [SelectClass, setSelectClass] = useState("0");

  const [SelectTeacher, setSelectTeacher] = useState("0");

  const TeacherList = useSelector(
    (state: RootState) => state.TeacherNameList.TeacherList
  );
  const ClassList = useSelector(
    (State: RootState) => State.TeacherNameList.ClassList
  );
  const SubjectDetailLists = useSelector(
    (State: RootState) => State.TeacherNameList.SubjectList
  );
  const SubjectDetailLists1 = useSelector(
    (State: RootState) => State.TeacherNameList.SubjectList1
  );
  const UsschoolSettings = useSelector(
    (state: RootState) => state.TeacherNameList.IsGetSchoolSettings
  );
  console.log(UsschoolSettings, "UsschoolSettings");

  const schoolSettingsForSubjectlist = useSelector(
    (state: RootState) => state.TeacherNameList.ISGetSchoolSettingsSubjectL
  );

  useEffect(() => {
    const SchoolsettingBody: ISchoolsettingBody = {
      asSchoolId: Number(asSchoolId)
    };
    const GetTeacher: ITeacherDropdownBody = {
      asSchoolId: asSchoolId,
      asAcademicYearId: asAcademicYearId,
      asShowHomeworkToClassTeacher: asShowHomeworkToClassTeacher,
      aTeacherId: AssignHomeworkPermission === 'Y' ? 0 : Number(SelectTeacher)
    };
    const fullClassTeacherBody: IClassTeacherDropdownBody = {
      asSchoolId: asSchoolId,
      asAcademicYearID: asAcademicYearId
    };

    dispatch(GetschoolSettings(SchoolsettingBody));
    dispatch(ReqschoolSettings(SchoolsettingBody));
    dispatch(TeacherNameList(GetTeacher));
    dispatch(FullTeacherName(fullClassTeacherBody));
  }, []);

  // TeacherList
  // const [SelectTeacher, setSelectTeacher] = useState(
  // AssignHomeworkPermission !== 'Y' ? TeacherId : ClassTecherId ? ClassTecherId : "0");  
  useEffect(() => {
    console.log('TeacherList Length:', TeacherList.length);
    console.log('ClassTecherId:', ClassTecherId);
    console.log('AssignHomeworkPermission:', AssignHomeworkPermission);
    console.log('TeacherId:', TeacherId);

    if (TeacherList.length > 0) {
      if (ClassTecherId !== undefined) {
        console.log('Setting SelectTeacher to ClassTecherId:', ClassTecherId);
        setSelectTeacher(ClassTecherId);
      } else if (AssignHomeworkPermission !== 'Y') {
        console.log('Setting SelectTeacher to TeacherId:', TeacherId.toString());
        setSelectTeacher(TeacherId.toString());
      }
    }
  }, [TeacherList]);
  // ClassList
  // const [SelectClass, setSelectClass] = useState(
  // AssignHomeworkPermission !== 'Y' ? asStandardDivisionId.toString() : ClassId ? ClassId : "0");
  useEffect(() => {
    console.log('ClassList Length:', ClassList.length);
    console.log('ClassId:', ClassId);
    console.log('AssignHomeworkPermission:', AssignHomeworkPermission);
    console.log('asStandardDivisionId:', asStandardDivisionId);

    if (ClassList.length > 0) {
      console.log('ClassId:', ClassId);
      if (ClassId !== undefined) {
        console.log('Setting SelectClass to ClassId:', ClassId);
        setSelectClass(ClassId);
      } else if (AssignHomeworkPermission !== 'Y' && ClassList.length > 1) {
        let classId = ClassList[1]?.Id;
        console.log('Setting SelectClass to asStandardDivisionId:', asStandardDivisionId.toString());
        setSelectClass(classId.toString());
      }
    }
  }, [ClassList]);


  const GetClassD: IClassDropDownBody = {
    asSchoolId: asSchoolId,
    asAcademicYearId: asAcademicYearId,
    aTeacherId: Number(SelectTeacher)
  };
  useEffect(() => {
    if (SelectTeacher !== '0') {
      dispatch(ClassName(GetClassD));
    }
  }, [SelectTeacher]);






  //subjectList
  useEffect(() => {
    if (SelectClass !== '0' && SelectTeacher !== '0') {
      const TeacherSubject: IGetTeacherSubjectDetailsBody = {
        asSchoolId: asSchoolId,
        aTeacherId: Number(SelectTeacher),
        asAcademicYearId: asAcademicYearId,
        asStandardDivisionId: Number(SelectClass)
      };
      dispatch(SubjectDetails(TeacherSubject));
    }
  }, [SelectTeacher, SelectClass]);

  const clickTeacherDropdown = (value) => {
    setSelectTeacher(value == '' ? null : value);
  };

  const clickClass = (value) => {
    setSelectClass(value == '' ? null : value);
  };

  const getClassName = () => {
    let className = '';
    ClassList.map((item) => {
      if (item.Value == SelectClass) className = item.Name;
    });

    return className;
  };
  const getClassTeacherName = () => {
    let classTeacherName = '';
    TeacherList.map((item) => {
      if (item.Value == SelectTeacher) classTeacherName = item.Name;
    });

    return classTeacherName;
  };

  const clickItem1 = (value, MySubject) => {
    navigate(
      '/RITeSchool/Teacher/AddHomeworkNew/' +
      encodeURL(SelectTeacher) +
      '/' +
      encodeURL(getClassTeacherName()) +
      '/' +
      encodeURL(value.StandardDivision) +
      '/' +
      encodeURL(value.SubjectName) +
      '/' +
      encodeURL(value.SubjectId) +
      '/' +
      encodeURL(MySubject) +
      '/' +
      encodeURL(SelectClass), { state: { fromInternal: true } }
    );
  };
  const onClick = () => {
    navigate(
      '/RITeSchool/Teacher/AddDailyLog/' +
      encodeURL(SelectClass) +
      '/' +
      encodeURL(getClassName()) +
      '/' +
      encodeURL(SelectTeacher), { state: { fromInternal: true } }
    );
  };
  const Loading = useSelector(
    (state: RootState) => state.TeacherNameList.Loading
  );

  return (
    <Box sx={{ px: 2 }}>
      <CommonPageHeader
        navLinks={[
          {
            title: 'Assign Homework',
            path: '/RITeSchool/Teacher/AssignHomework'
          }
        ]}
        rightActions={
          <>
            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              justifyContent="space-between"
              alignItems="right"
              gap={1}
              sx={{
                mt: { xs: 0, sm: 0 },
                flexWrap: { xs: 'nowrap', sm: 'nowrap' }
              }}
            >
              <Grid
                item
                xs={12}
                display="flex"
                justifyContent={{ xs: 'flex-start', sm: 'flex-start' }}
              >
                <SearchableDropdown
                  ItemList={TeacherList}
                  onChange={clickTeacherDropdown}
                  defaultValue={SelectTeacher?.toString()}
                  label={'Select Teacher'}
                  sx={{
                    width: { xs: '40vw', sm: '20vw' },
                    bgcolor:
                      AssignHomeworkPermission === 'N' ? '#F0F0F0' : 'inherit'
                  }}
                  size={'small'}
                  mandatory
                  DisableClearable={AssignHomeworkPermission === 'N'}
                  disabled={AssignHomeworkPermission === 'N'}
                />
              </Grid>

              <Grid
                item
                xs={12}
                gap={1}
                display="flex"
                justifyContent={{ xs: 'flex-start', sm: 'flex-start' }}
              >
                <SearchableDropdown
                  ItemList={ClassList}
                  onChange={clickClass}
                  defaultValue={SelectClass}
                  label={'Select Class:'}
                  sx={{ width: { xs: '40vw', sm: '20vw' } }}
                  size={'small'}
                  mandatory
                />

              </Grid>

              <Grid
                item
                xs={12}
                sm={6}
                gap={1}
                display="flex"
                justifyContent={{ xs: 'flex-start', sm: 'flex-end' }}
              >
                <Tooltip
                  title={'List the class subjects for homework assignment.'}
                >
                  <IconButton
                    sx={{
                      color: 'white',
                      backgroundColor: grey[500],
                      '&:hover': { backgroundColor: grey[500] }
                    }}
                  >
                    <QuestionMark />
                  </IconButton>
                </Tooltip>
                {SelectClass &&
                  ((asStandardDivisionId === Number(SelectClass) &&
                    AssignHomeworkPermission === 'Y' &&
                    UsschoolSettings === 'true') ||
                    (SubjectDetailLists.some((item) => item.Text5 === 'Y') &&
                      UsschoolSettings === 'true')) && (
                    <Box>
                      <Tooltip title={'Manage Daily Log'}>
                        <IconButton
                          onClick={onClick}
                          sx={{
                            color: 'white',
                            backgroundColor: blue[500],
                            '&:hover': { backgroundColor: blue[600] }
                          }}
                        >
                          <AddTaskIcon />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  )}
              </Grid>

            </Stack>
          </>
        }
      />
      {Loading ? <SuspenseLoader /> :

        <Box
          sx={{
            p: 2,
            background: 'white',
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <Box>
            <Typography variant={'h4'} mb={1}>
              {' '}
              My Subjects{' '}
            </Typography>
            {SubjectDetailLists.length > 0 ? (
              <Assignhomeworklist
                ItemList={SubjectDetailLists}
                clickAssign={clickItem1}
                HeaderArray={HeaderOfTable}
                MySubject={true}
              />
            ) : (
              <Typography
                variant="body1"
                sx={{
                  textAlign: 'center',
                  marginTop: 1,
                  backgroundColor: '#324b84',
                  padding: 1,
                  borderRadius: 2,
                  color: 'white'
                }}
              >
                <b>No record found.</b>
              </Typography>
            )}
          </Box>

          {schoolSettingsForSubjectlist == 'True' && (
            <Box mt={2}>
              <Typography variant={'h4'} mb={1}>
                {' '}
                My Class Subjects{' '}
              </Typography>
              {SubjectDetailLists1.length > 0 ? (
                <Assignhomeworklist
                  ItemList={SubjectDetailLists1}
                  clickAssign={clickItem1}
                  HeaderArray={HeaderOfTable}
                  MySubject={false}
                />
              ) : (
                <Typography
                  variant="body1"
                  sx={{
                    textAlign: 'center',
                    marginTop: 1,
                    backgroundColor: '#324b84',
                    padding: 1,
                    borderRadius: 2,
                    color: 'white'
                  }}
                >
                  <b>No record found.</b>
                </Typography>
              )}
            </Box>
          )}
        </Box>
      }
    </Box>
  );
};

export default AssignHomework;
