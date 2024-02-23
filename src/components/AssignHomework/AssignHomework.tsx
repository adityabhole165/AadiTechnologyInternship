import ApiTwoTone from '@mui/icons-material/ApiTwoTone';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import ChevronRightTwoTone from '@mui/icons-material/ChevronRightTwoTone';
import {
  Box,
  Breadcrumbs,
  Container,
  FormControl,
  FormControlLabel,
  Grid,
  IconButton,
  Radio,
  RadioGroup,
  Stack,
  Typography
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import { Link } from 'react-router-dom';
import {
  IClassDropDownBody,
  IClassTeacherDropdownBody,
  IGetTeacherSubjectDetailsBody,
  ITeacherDropdownBody
} from 'src/interfaces/AssignHomework/IAssignHomework';
import Assignhomeworklist from 'src/libraries/ResuableComponents/Assignhomeworklist';
import DropDown from 'src/libraries/list/DropDown';
import { ButtonPrimary } from 'src/libraries/styled/ButtonStyle';
import {
  ClassName,
  FullTeacherName,
  SubjectDetails,
  TeacherNameList
} from 'src/requests/AssignHomework/RequestAssignHomework';
import { RootState } from 'src/store';

const AssignHomework = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { Id } = useParams();

  const [SelectTeacher, setSelectTeacher] = useState(
    Number(sessionStorage.getItem('TeacherId'))
  );
  const [SelectClass, setSelectClass] = useState(0);
  const [subjectDetailList, setSubjectDetailList] = useState([]);
  const [MySubject, setMySubject] = useState();

  const asSchoolId = Number(localStorage.getItem('localSchoolId'));
  const asAcademicYearId = Number(sessionStorage.getItem('AcademicYearId'));
  const asShowHomeworkToClassTeacher = Number(
    sessionStorage.getItem('ShowHomeworkToClassTeacher')
  );
  const TeacherId = Number(sessionStorage.getItem('TeacherId'));
  const asStandardDivisionId = Number(
    sessionStorage.getItem('StandardDivisionId')
  );
  const ScreensAccessPermission = JSON.parse(
    sessionStorage.getItem('ScreensAccessPermission')
  );

  console.log('ScreensAccessPermission', ScreensAccessPermission);

  const GetScreenPermission = () => {
    let perm = 'N';
    ScreensAccessPermission.map((item) => {
      if (item.ScreenName === 'Assign Homework') perm = item.IsFullAccess;
    });
    return perm;
  };
  const TeacherList: any = useSelector(
    (state: RootState) => state.TeacherNameList.TeacherList
  );
  console.log('TeacherList', TeacherList);
  const ClassList = useSelector(
    (State: RootState) => State.TeacherNameList.ClassList
  );
  console.log('ClassList', ClassList);
  const SubjectDetailLists: any = useSelector(
    (State: RootState) => State.TeacherNameList.SubjectList
  );
  console.log('SubjectDetailList', subjectDetailList);

  const FullAccessTeacher: any = useSelector(
    (State: RootState) => State.TeacherNameList.ClassTeacherList
  );
  console.log('FullAccessTeacher', FullAccessTeacher);

  useEffect(() => {
    setSubjectDetailList(
      SubjectDetailLists.map((item) => {
        return { ...item, Icon: <AssignmentTurnedInIcon /> };
      })
    );
  }, [SubjectDetailLists]);

  //Select Teacher
  useEffect(() => {
    const GetTeacher: ITeacherDropdownBody = {
      asSchoolId: asSchoolId,
      asAcademicYearId: asAcademicYearId,
      asShowHomeworkToClassTeacher: asShowHomeworkToClassTeacher,
      aTeacherId: GetScreenPermission() == 'Y' ? 0 : SelectTeacher
    };
    dispatch(TeacherNameList(GetTeacher));
  }, []);
  // useEffect(()=>{
  //     if(TeacherList.length >= 0)
  //     setSelectTeacher(TeacherList[0].Value)
  //     },[TeacherList])

  //class
  useEffect(() => {
    const GetClassD: IClassDropDownBody = {
      asSchoolId: asSchoolId,
      asAcademicYearId: asAcademicYearId,
      aTeacherId: SelectTeacher
    };

    dispatch(ClassName(GetClassD));
  }, [SelectTeacher]);

  useEffect(() => {
    if (ClassList.length > 0) setSelectClass(ClassList[1].Id);
  }, [ClassList]);

  useEffect(() => {
    const fullClassTeacherBody: IClassTeacherDropdownBody = {
      asSchoolId: asSchoolId,
      asAcademicYearID: asAcademicYearId
    };
    dispatch(FullTeacherName(fullClassTeacherBody));
  }, []);

  const HeaderOfTable = [
    { Id: 1, Header: 'Class' },
    { Id: 2, Header: 'Subject' },
    { Id: 3, Header: 'Assign' }
  ];

  //subjectList
  useEffect(() => {
    const TeacherSubject: IGetTeacherSubjectDetailsBody = {
      asSchoolId: asSchoolId,
      aTeacherId: SelectTeacher,
      asAcademicYearId: asAcademicYearId,
      asStandardDivisionId: SelectClass
    };
    dispatch(SubjectDetails(TeacherSubject));
  }, [SelectTeacher, SelectClass]);

  const clickTeacherDropdown = (value) => {
    setSelectTeacher(value);
  };

  const clickClass = (value) => {
    setSelectClass(value);
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
  // const getSubjectName = () => {
  //     let getSubjectName = ""
  //     SubjectDetailLists.map((item)=>{
  //         if(item.Value == Id)
  //         getSubjectName = item.Text2
  //     })

  // return getSubjectName;
  // }

  const clickItem1 = (value) => {
    navigate(
      '/extended-sidebar/Teacher/AddHomework' +
        '/' +
        SelectClass +
        '/' +
        getClassName() +
        '/' +
        SelectTeacher +
        '/' +
        getClassTeacherName()
    );
  };

  const clickItem = (value) => {
    navigate('/extended-sidebar/Teacher/TExamschedule');
    // value.map((item) => {
    //     if (item.IsActive) {
    //         alert(item.Id)
    //     }
    // })
  };

  const onClick = () => {
    navigate(
      '/extended-sidebar/Teacher/AddDailyLog/' +
        SelectClass +
        '/' +
        getClassName()
    );
  };
  console.log(asStandardDivisionId, '--', SelectClass);

  return (
    <Container maxWidth={'xl'}>
      <Stack
        direction={'row'}
        justifyContent={'space-between'}
        alignItems={'center'}
        sx={{
          pt: 4,
          pb: 2
        }}
      >
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
                boxShadow: '0px 0px 5px 0px rgba(0,0,0,0.15)'
              }}
            >
              <ApiTwoTone color="primary" />
            </IconButton>
          </Link>
          <Typography variant={'h3'} fontSize={'23px'} color="text.primary">
            Assign Homework
          </Typography>
        </Breadcrumbs>

        <Stack direction={'row'} alignItems={'center'} gap={1}>
          <DropDown
            width={200}
            itemList={TeacherList}
            ClickItem={clickTeacherDropdown}
            DefaultValue={SelectTeacher}
            Label={'Select Teacher:'}
          />
          <DropDown
            width={200}
            itemList={ClassList}
            ClickItem={clickClass}
            DefaultValue={SelectClass}
            Label={'Select Class:'}
          />
        </Stack>
      </Stack>
      <Box sx={{ mt: 1, p: 2, background: 'white' }}>
        {/* Card Header */}
        <FormControl>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="mySubject"
            name="radio-buttons-group"
            row
          >
            <FormControlLabel
              value="mySubject"
              control={<Radio />}
              label="My Subject"
            />
            <FormControlLabel
              value="myClassSubject"
              control={<Radio />}
              label="My Class Subject"
            />
          </RadioGroup>
        </FormControl>
        {/*Card Content */}
        <Grid item xs={4} mt={2}>
          <Box>
            <Box
              style={{
                textAlign: 'left',
                width: '400px'
              }}
            >
              <Assignhomeworklist
                ItemList={subjectDetailList}
                clickAssign={clickItem1}
                HeaderArray={HeaderOfTable}
              />
            </Box>
          </Box>
        </Grid>

        {asStandardDivisionId == SelectClass && (
          <div>
            <ButtonPrimary onClick={onClick} variant="contained">
              ADD DAILY LOG
            </ButtonPrimary>
          </div>
        )}
      </Box>
    </Container>
  );
};

export default AssignHomework;
