import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'src/store';
//import DynamicList from 'src/libraries/list/DynamicList'
import VisibilityIcon from '@mui/icons-material/Visibility';
import {
  Box,
  Checkbox,
  FormControlLabel,
  Grid,
  TextField,
  Typography
} from '@mui/material';
import { toast } from 'react-toastify';
import {
  IGetAllStudentStatusBody,
  IGetTeacherListBody
} from 'src/interfaces/StudentRecords/IStudentRecords';
import Dropdown from 'src/libraries/dropdown/Dropdown';
import PageHeader from 'src/libraries/heading/PageHeader';
import Icon1 from 'src/libraries/icon/icon1';
import DynamicList2 from 'src/libraries/list/DynamicList2';
import { ButtonPrimary } from 'src/libraries/styled/ButtonStyle';
import {
  GetAllStudentStatuss,
  GetTeachersList
} from 'src/requests/StudentRecords/RequestStudentRecords';

const StudentRecords = () => {
  const dispatch = useDispatch();
  const [SelectTeacher, setSelectTeacher] = useState('0');
  const [StudentStatusList, setStudentStatusList] = useState([]);
  const [showRiseAndShine, setShowRiseAndShine] = useState(false);
  const [regNoOrName, setRegNoOrName] = useState('');
  const [StudentList, setStudentList] = useState([]);

  const asSchoolId = Number(localStorage.getItem('localSchoolId'));
  const asAcademicYearId = Number(sessionStorage.getItem('AcademicYearId'));
  const StandardDivisionId = Number(
    sessionStorage.getItem('StandardDivisionId')
  );
  const TeacherId = Number(sessionStorage.getItem('TeacherId'));
  const asUpdatedById = localStorage.getItem('Id');
  const Id = Number(sessionStorage.getItem('Id'));

  const GetTeachers = useSelector(
    (state: RootState) => state.StudentRecords.ClassTeachers
  );
  console.log(GetTeachers, 'GetTeachers');
  const GetStatusStudents: any = useSelector(
    (state: RootState) => state.StudentRecords.StudentStatus
  );
  // console.log(GetStatusStudents,"GetStatusStudents");
  const HeaderList = [
    'Registration Number',
    'Roll No.',
    'Class',
    'Name',
    'Action For Me',
    'Action'
  ];
  const IconList = [
    {
      Id: 1,
      Icon: <VisibilityIcon />,
      Action: 'View'
    }
  ];

  const Note: string =
    'Principal and Counsellor can see those students to whom details are submitted by class teacher(s).If Principal or Counsellor is a class teacher of any class then on selection of same class, he / she can see all students to whom details of selected class. 	Status column will show unread, unsubmitted student records and comments.';

  useEffect(() => {
    dispatch(GetTeachersList(TeachersBody));
  }, []);
  // useEffect(() => {
  //     if(SelectTeacher!="0")
  //     dispatch(GetAllStudentStatuss(GetStudentStatusBody))
  // }, [SelectTeacher])

  useEffect(() => {
    if (SelectTeacher != '0')
      dispatch(GetAllStudentStatuss(GetStudentStatusBody));
  }, [SelectTeacher]);

  useEffect(() => {
    if (GetTeachers.length > 0) setSelectTeacher(GetTeachers[0].Value);
  }, [GetTeachers]);

  useEffect(() => {
    setStudentList(GetStatusStudents);
  }, [GetStatusStudents]);

  const TeachersBody: IGetTeacherListBody = {
    asSchoolId: asSchoolId,
    asAcademicYearId: asAcademicYearId,
    asUserId: Id,
    HasFullAccess: 'false'
  };
  const GetStudentStatusBody: IGetAllStudentStatusBody = {
    asSchoolId: asSchoolId.toString(),
    asAcademicYearId: asAcademicYearId.toString(),
    asStdDivId: SelectTeacher,
    asFilter: regNoOrName.toString(),
    sortExpression: '',
    sortDirection: 'ASC',
    StartIndex: 0,
    EndIndex: 20,
    ShowSaved: true,
    IncludeRiseAndShine: showRiseAndShine,
    HasEditAccess: 'N',
    UserId: Id
  };
  const clickTeacherDropdown = (value) => {
    setSelectTeacher(value);
  };
  console.log(regNoOrName, 'regNoOrName----');
  const clickSearch = (value) => {
    setShowRiseAndShine(value);
    setSelectTeacher(value);
    setRegNoOrName(value);

    if (GetStatusStudents && GetStatusStudents.length === 0) {
      toast.success('No Records Found');
    }
    dispatch(GetAllStudentStatuss(GetStudentStatusBody));
  };

  const ClickItem = () => { };
  const handleRegNoOrNameChange = (value) => {
    setRegNoOrName(value);
  };
  const handleCheckboxChange = (value) => {
    setShowRiseAndShine(value);
  };

  return (
    <Box sx={{ px: 2 }}>
      <br></br>
      <br></br>
      <PageHeader heading={'Student Record List'} subheading={''} />
      <br></br>
      <br></br>
      <Box sx={{ float: 'right' }}>
        <Icon1 Note={Note} />
      </Box>
      <Grid container spacing={10} alignItems="center">
        <Grid item xs={2}>
          <Typography marginLeft={'1px'}>
            <b>Class Teacher:</b>
          </Typography>
        </Grid>
        <Grid item xs={2}>
          <Box
            sx={{
              marginRight: '500px',
              width: '180%',
              padding: '0.9px',
              boxShadow: '4px 4px 10px rgba(0, 0, 0, 0.2)',
              border: '1px solid black'
            }}
          >
            <Dropdown
              Array={GetTeachers}
              handleChange={clickTeacherDropdown}
              label={''}
              defaultValue={SelectTeacher}
            />
          </Box>
        </Grid>
        <Grid item xs={2}>
          <Typography margin={'1px'}>
            <b>Reg No/Name:</b>
          </Typography>
        </Grid>
        <Grid item xs={2}>
          <TextField
            label=""
            value={regNoOrName}
            onChange={(e) => {
              handleRegNoOrNameChange(e.target.value);
            }}
            fullWidth
          />
          <br></br>
        </Grid>
        <Grid item xs={2}>
          <ButtonPrimary
            onClick={clickSearch}
            variant="contained"
            style={{ marginRight: '150px', backgroundColor: 'green' }}
          >
            Search
          </ButtonPrimary>
        </Grid>

        <Grid item xs={4}>
          <Typography margin={'1px'}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={showRiseAndShine}
                  onChange={(e) => {
                    handleCheckboxChange(e.target.checked);
                  }}
                />
              }
              label="Show only Rise and Shine Students"
            />
          </Typography>
        </Grid>
        <Grid item xs={12}>
          {/* 
 
<DynamicList2 HeaderList={HeaderList} ItemList={GetStatusStudents}
ClickItem={ClickItem} IconList={IconList}/> */}

          <Grid item xs={12}>
            {StudentList && StudentList.length === 0 ? (
              <Typography>No Records Found</Typography>
            ) : (
              <DynamicList2
                HeaderList={HeaderList}
                ItemList={StudentList}
                ClickItem={ClickItem}
                IconList={IconList}
              />
            )}
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default StudentRecords;
