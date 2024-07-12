import AddTwoTone from '@mui/icons-material/AddTwoTone';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import QuestionMark from '@mui/icons-material/QuestionMark';
import {
  Box,
  IconButton,
  Tooltip,
  Typography
} from '@mui/material';
import { blue, green, grey } from '@mui/material/colors';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import {
  IClassDropDownBody,
  IClassTeacherDropdownBody,
  IGetTeacherSubjectDetailsBody,
  ITeacherDropdownBody
} from 'src/interfaces/AssignHomework/IAssignHomework';
import Assignhomeworklist from 'src/libraries/ResuableComponents/Assignhomeworklist';
import SearchableDropdown from 'src/libraries/ResuableComponents/SearchableDropdown';
import {
  ClassName,
  FullTeacherName,
  SubjectDetails,
  TeacherNameList,
  resetClassName,
  resetSubjectDetails
} from 'src/requests/AssignHomework/RequestAssignHomework';
import { RootState } from 'src/store';
import CommonPageHeader from '../CommonPageHeader';
import AddTaskIcon from '@mui/icons-material/AddTask';

const AssignHomework = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { Id } = useParams();
  const TeacherId = Number(sessionStorage.getItem('TeacherId'));
  const [SelectClass, setSelectClass] = useState(null);
  const [subjectDetailList, setSubjectDetailList] = useState([]);
  const [MySubject, setMySubject] = useState();
  const asSchoolId = Number(localStorage.getItem('localSchoolId'));
  const asAcademicYearId = Number(sessionStorage.getItem('AcademicYearId'));
  const asShowHomeworkToClassTeacher = Number(
    sessionStorage.getItem('ShowHomeworkToClassTeacher')
  );
  const asStandardDivisionId = Number(
    sessionStorage.getItem('StandardDivisionId')
  );
  const ScreensAccessPermission = JSON.parse(
    sessionStorage.getItem('ScreensAccessPermission')
  );

  console.log(SelectClass);
  
  const GetScreenPermission = () => {
    let perm = 'N';
    ScreensAccessPermission?.map((item) => {
      if (item.ScreenName === 'Assign Homework') perm = item.IsFullAccess;
    });
    return perm;
  };
  const [SelectTeacher, setSelectTeacher] = useState(
    GetScreenPermission() !== 'Y' ? TeacherId : null);

  const TeacherList: any = useSelector(
    (state: RootState) => state.TeacherNameList.TeacherList
  );
  const ClassList = useSelector(
    (State: RootState) => State.TeacherNameList.ClassList
  );

  const SubjectDetailLists: any = useSelector(
    (State: RootState) => State.TeacherNameList.SubjectList
  );
  const SubjectDetailLists1: any = useSelector(
    (State: RootState) => State.TeacherNameList.SubjectList1
  );
  console.log(SubjectDetailLists, "SubjectDetailLists");


  const FullAccessTeacher: any = useSelector(
    (State: RootState) => State.TeacherNameList.ClassTeacherList
  );

  useEffect(() => {
    setSubjectDetailList(
      SubjectDetailLists.map((item) => {
        return { ...item, Icon: <AssignmentTurnedInIcon /> };
      })
    );
  }, [SubjectDetailLists]);

  useEffect(() => {
    const GetTeacher: ITeacherDropdownBody = {
      asSchoolId: asSchoolId,
      asAcademicYearId: asAcademicYearId,
      asShowHomeworkToClassTeacher: asShowHomeworkToClassTeacher,
      aTeacherId: GetScreenPermission() === 'Y' ? 0 : SelectTeacher
    };

    dispatch(TeacherNameList(GetTeacher));
  }, []);

  useEffect(() => {
    if (GetScreenPermission() !== 'Y' && TeacherList.length > 0) {
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

    if (GetScreenPermission() !== 'Y' && ClassList.length > 0) {
      setSelectClass(ClassList[0].Id);
    }
  }, [ClassList]);

  useEffect(() => {
    const fullClassTeacherBody: IClassTeacherDropdownBody = {
      asSchoolId: asSchoolId,
      asAcademicYearID: asAcademicYearId
    };
    dispatch(FullTeacherName(fullClassTeacherBody));
  }, []);

  const HeaderOfTable = [
    { Id: 1, Header: 'Class', width: 200 },
    { Id: 2, Header: 'Subject', },
    { Id: 3, Header: 'Assign', width: 400, align: 'center' }
  ];

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

  // const clickItem1 = (value) => {
  //   navigate(
  //     '/extended-sidebar/Teacher/AddHomework/' +
  //     value.StandardDivisionId +
  //     '/' +
  //     value.StandardDivision +
  //     '/' +
  //     SelectTeacher +
  //     '/' +
  //     getClassTeacherName() +
  //     '/' +
  //     value.SubjectId +
  //     '/' +
  //     value.SubjectName
  //   );
  // };

  const clickItem1 = (value, MySubject) => {
    navigate(
      '/extended-sidebar/Teacher/AddHomeworkNew/' +
      SelectTeacher +
      '/' +
      getClassTeacherName() +
      '/' +
      value.StandardDivision +
      '/' +
      value.SubjectName +
      '/' +
      value.SubjectId +
      '/' +
      MySubject+
      '/' +
      SelectClass

    );
  };

  const clickItem = (value) => {
    navigate('/extended-sidebar/Teacher/TExamschedule');
    value.map((item) => {
      if (item.IsActive) {
        alert(item.Id)
      }
    })
  };

  const onClick = () => {
    navigate(
      '/extended-sidebar/Teacher/AddDailyLog/' +
      SelectClass +
      '/' +
      getClassName()
    );
  };

  return (
    <Box sx={{ px: 2 }}>
      <CommonPageHeader
        navLinks={[
          { title: 'Assign Homework', path: '/extended-sidebar/Teacher/AssignHomework' }
        ]}
        rightActions={<>
          <SearchableDropdown
            sx={{ minWidth: '25vw',  bgcolor: GetScreenPermission() === 'N' ? '#f0e68c' : 'inherit' }}
            ItemList={TeacherList}
            onChange={clickTeacherDropdown}
            label={'Select Teacher'}
            defaultValue={SelectTeacher?.toString()}
            mandatory
            size={"small"}
            DisableClearable={GetScreenPermission() === 'N'}
            disabled={GetScreenPermission() === 'N'}
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
                color: 'white',
                backgroundColor: grey[500],
                '&:hover': {
                  backgroundColor: grey[500]
                }
              }}
            >
              <QuestionMark />
            </IconButton>
          </Tooltip>
          {SelectClass &&
            ((asStandardDivisionId === SelectClass && GetScreenPermission() === 'Y') ||
              SubjectDetailLists.some((item) => item.Text5 === "Y")) && (
              <div>
                <Tooltip title={'Manage Daily Log'}>
                  <IconButton
                    onClick={onClick}
                    sx={{
                      color: 'white',
                      backgroundColor: blue[500],
                      '&:hover': {
                        backgroundColor: blue[600]
                      }
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
          <Typography variant={'h4'} mb={1}>
            My Subjects
          </Typography>
          {SubjectDetailLists.length > 0 ? (
            <Assignhomeworklist
              ItemList={SubjectDetailLists}
              clickAssign={clickItem1}
              HeaderArray={HeaderOfTable}
              MySubject={true}
            />
          ) : (
            <Typography variant="body1" sx={{ textAlign: 'center', marginTop: 1, backgroundColor: '#324b84', padding: 1, borderRadius: 2, color: 'white' }}>
              <b>No record found.</b>
            </Typography>
          )}
        </Box>


        <Box mt={2}>
          <Typography variant={'h4'} mb={1}>
            My Class Subjects
          </Typography>
          {SubjectDetailLists1.length > 0 ? (
            <Assignhomeworklist
              ItemList={SubjectDetailLists1}
              clickAssign={clickItem1}
              HeaderArray={HeaderOfTable}
              MySubject={false}

            />
          ) : (
            <Typography variant="body1" sx={{ textAlign: 'center', marginTop: 1, backgroundColor: '#324b84', padding: 1, borderRadius: 2, color: 'white' }}>
              <b>No record found.</b>
            </Typography>
          )}
        </Box>
      </Box>

    </Box>
  );
};

export default AssignHomework;
