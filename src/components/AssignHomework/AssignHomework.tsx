import AddTaskIcon from '@mui/icons-material/AddTask';
import QuestionMark from '@mui/icons-material/QuestionMark';
import { Box, IconButton, Tooltip, Typography } from '@mui/material';
import { blue, grey } from '@mui/material/colors';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import {
  IClassDropDownBody, IClassTeacherDropdownBody, IGetTeacherSubjectDetailsBody,
  ISchoolsettingBody, ITeacherDropdownBody
} from 'src/interfaces/AssignHomework/IAssignHomework';
import Assignhomeworklist from 'src/libraries/ResuableComponents/Assignhomeworklist';
import SearchableDropdown from 'src/libraries/ResuableComponents/SearchableDropdown';
import {
  ClassName, FullTeacherName, GetschoolSettings, ReqschoolSettings,
  SubjectDetails, TeacherNameList, resetClassName, resetSubjectDetails
} from 'src/requests/AssignHomework/RequestAssignHomework';
import { RootState } from 'src/store';
import { GetScreenPermission } from '../Common/Util';
import CommonPageHeader from '../CommonPageHeader';
import { encodeURL } from '../Common/Util';
const AssignHomework = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const HeaderOfTable = [
    { Id: 1, Header: 'Class', width: 200 },
    { Id: 2, Header: 'Subject', },
    { Id: 3, Header: 'Assign', width: 400, align: 'center' }
  ];
  const asSchoolId = Number(localStorage.getItem('localSchoolId'));
  const TeacherId = Number(sessionStorage.getItem('TeacherId'));
  const asAcademicYearId = Number(sessionStorage.getItem('AcademicYearId'));
  const asShowHomeworkToClassTeacher = Number(sessionStorage.getItem('ShowHomeworkToClassTeacher'));
  const asStandardDivisionId = Number(sessionStorage.getItem('StandardDivisionId'));
  const AssignHomeworkPermission = GetScreenPermission('Assign Homework')

  const [SelectClass, setSelectClass] = useState(null);
  const [SelectTeacher, setSelectTeacher] = useState(AssignHomeworkPermission !== 'Y' ? TeacherId : null);

  const TeacherList = useSelector((state: RootState) => state.TeacherNameList.TeacherList);
  const ClassList = useSelector((State: RootState) => State.TeacherNameList.ClassList);
  const SubjectDetailLists = useSelector((State: RootState) => State.TeacherNameList.SubjectList);
  const SubjectDetailLists1 = useSelector((State: RootState) => State.TeacherNameList.SubjectList1);
  const UsschoolSettings = useSelector((state: RootState) => state.TeacherNameList.IsGetSchoolSettings);
  const schoolSettingsForSubjectlist = useSelector((state: RootState) => state.TeacherNameList.ISGetSchoolSettingsSubjectL);

  useEffect(() => {
    const SchoolsettingBody: ISchoolsettingBody = {
      asSchoolId: Number(asSchoolId),
    };
    const GetTeacher: ITeacherDropdownBody = {
      asSchoolId: asSchoolId,
      asAcademicYearId: asAcademicYearId,
      asShowHomeworkToClassTeacher: asShowHomeworkToClassTeacher,
      aTeacherId: AssignHomeworkPermission === 'Y' ? 0 : SelectTeacher
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

  useEffect(() => {
    if (AssignHomeworkPermission == 'Y' && TeacherList.length > 0) {
      setSelectTeacher(TeacherList[0].Value);
    }
  }, [TeacherList]);

  useEffect(() => {
    if (SelectTeacher == null) {
      dispatch(resetClassName());
      setSelectClass(null)
    } else {
      const GetClassD: IClassDropDownBody = {
        asSchoolId: asSchoolId,
        asAcademicYearId: asAcademicYearId,
        aTeacherId: SelectTeacher
      };

      dispatch(ClassName(GetClassD));
    }
  }, [SelectTeacher]);

  useEffect(() => {
    if (ClassList.length > 0) {
      setSelectClass(ClassList[0].Id);
    }
  }, [ClassList]);

  //subjectList
  useEffect(() => {
    if ((SelectClass == null) || SelectTeacher == null) {
      dispatch(resetSubjectDetails());
    } else {
      const TeacherSubject: IGetTeacherSubjectDetailsBody = {
        asSchoolId: asSchoolId,
        aTeacherId: SelectTeacher,
        asAcademicYearId: asAcademicYearId,
        asStandardDivisionId: SelectClass
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
      encodeURL(SelectTeacher) + '/' +
      encodeURL(getClassTeacherName()) + '/' +
      encodeURL(value.StandardDivision) + '/' +
      encodeURL(value.SubjectName) + '/' +
      encodeURL(value.SubjectId )+ '/' +
      encodeURL(MySubject) + '/' +
      encodeURL(SelectClass)
    );
  };
  const onClick = () => {
    navigate('/RITeSchool/Teacher/AddDailyLog/' +
      encodeURL(SelectClass) + '/' +
      encodeURL(getClassName())
    );
  };

  return (
    <Box sx={{ px: 2 }}>
      <CommonPageHeader
        navLinks={[
          { title: 'Assign Homework', path: '/RITeSchool/Teacher/AssignHomework' }
        ]}
        rightActions={<>
          <SearchableDropdown
            sx={{ minWidth: '25vw', bgcolor: AssignHomeworkPermission === 'N' ? '#F0F0F0' : 'inherit' }}
            ItemList={TeacherList}
            onChange={clickTeacherDropdown}
            label={'Select Teacher'}
            defaultValue={SelectTeacher?.toString()}
            mandatory
            size={"small"}
            DisableClearable={AssignHomeworkPermission === 'N'}
            disabled={AssignHomeworkPermission === 'N'}
          />
          <SearchableDropdown
            sx={{ minWidth: '25vw' }}
            ItemList={ClassList}
            onChange={clickClass}
            label={'Select Class:'}
            defaultValue={SelectClass}
            mandatory
            size={"small"}
          />
          <Tooltip title={'List the class subjects for homework assignment.'}>
            <IconButton
              sx={{
                color: 'white', backgroundColor: grey[500], '&:hover': { backgroundColor: grey[500] }
              }}
            >
              <QuestionMark />
            </IconButton>
          </Tooltip>
          {SelectClass &&
            ((asStandardDivisionId === SelectClass && AssignHomeworkPermission === 'Y') ||
              SubjectDetailLists.some((item) => item.Text5 === "Y") && UsschoolSettings === "true")
            && (
              <div>
                <Tooltip title={'Manage Daily Log'}>
                  <IconButton
                    onClick={onClick}
                    sx={{
                      color: 'white', backgroundColor: blue[500], '&:hover': { backgroundColor: blue[600] }
                    }}
                  >
                    <AddTaskIcon />
                  </IconButton>
                </Tooltip>
              </div>
            )}
        </>}
      />
      <Box sx={{ p: 2, background: 'white', display: 'flex', flexDirection: 'column' }}>
        <Box>
          <Typography variant={'h4'} mb={1}> My Subjects </Typography>
          {SubjectDetailLists.length > 0 ? (
            <Assignhomeworklist
              ItemList={SubjectDetailLists}
              clickAssign={clickItem1}
              HeaderArray={HeaderOfTable}
              MySubject={true}
            />
          ) : (
            <Typography variant="body1"
              sx={{
                textAlign: 'center', marginTop: 1, backgroundColor: '#324b84', padding: 1,
                borderRadius: 2, color: 'white'
              }}>
              <b>No record found.</b>
            </Typography>
          )}
        </Box>

        {schoolSettingsForSubjectlist == "True" && (
          <Box mt={2}>
            <Typography variant={'h4'} mb={1}> My Class Subjects </Typography>
            {SubjectDetailLists1.length > 0 ? (
              <Assignhomeworklist
                ItemList={SubjectDetailLists1}
                clickAssign={clickItem1}
                HeaderArray={HeaderOfTable}
                MySubject={false}
              />
            ) : (
              <Typography variant="body1"
                sx={{
                  textAlign: 'center', marginTop: 1, backgroundColor: '#324b84', padding: 1,
                  borderRadius: 2, color: 'white'
                }}>
                <b>No record found.</b>
              </Typography>
            )}
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default AssignHomework;
