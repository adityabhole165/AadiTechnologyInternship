import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'src/store';
//import DynamicList from 'src/libraries/list/DynamicList'
import QuestionMark from '@mui/icons-material/QuestionMark';
import SearchIcon from '@mui/icons-material/Search';
import VisibilityIcon from '@mui/icons-material/Visibility';
import {
  Box,
  Checkbox,
  FormControlLabel,
  Grid,
  IconButton,
  Paper,
  TextField,
  Tooltip,
  Typography
} from '@mui/material';
import { blue, grey } from '@mui/material/colors';
import { toast } from 'react-toastify';
import {
  IGetAllStudentStatusBody,
  IGetTeacherListBody
} from 'src/interfaces/StudentRecords/IStudentRecords';
import SearchableDropdown from 'src/libraries/ResuableComponents/SearchableDropdown';
import DynamicList2 from 'src/libraries/list/DynamicList2';
import {
  GetAllStudentStatuss,
  GetTeachersList
} from 'src/requests/StudentRecords/RequestStudentRecords';
import CommonPageHeader from '../CommonPageHeader';
import StudentRecordsNotes from './StudentRecordsNotes';


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
  //console.log(GetTeachers, 'GetTeachers');
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
  //console.log(regNoOrName, 'regNoOrName----');
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
      <CommonPageHeader
        navLinks={[
          { title: 'Student Record List', path: '/RITeSchool/Teacher/StudentRecords' }
        ]}
        rightActions={
          <>
            <Box sx={{ background: 'white' }}>
              <Box sx={{ background: 'white' }}>
                <SearchableDropdown
                  sx={{ minWidth: '25vw' }}
                  ItemList={GetTeachers}
                  onChange={clickTeacherDropdown}
                  label={'Class(s) :'}
                  defaultValue={SelectTeacher}
                  size={"small"}
                />
              </Box>
            </Box>
            <TextField
              sx={{ width: '15vw' }}
              fullWidth
              label="Registration Number / Name :"
              value={regNoOrName}
              variant={'outlined'}
              size={"small"}
              onChange={(e) => {
                handleRegNoOrNameChange(e.target.value);
              }}
            />
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
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Tooltip title={"Display list of students as per selected class and filter and it's status."}>
                <IconButton
                  sx={{
                    color: 'white',
                    backgroundColor: grey[500],
                    height: '36px !important',
                    ':hover': { backgroundColor: grey[600] },
                    marginRight: '-4px',
                    // marginLeft: '8px', 
                  }}
                >
                  <QuestionMark />
                </IconButton>
              </Tooltip>
            </Box>
            <Tooltip title="Search">
              <IconButton
                sx={{
                  color: 'white',
                  backgroundColor: blue[500],
                  height: '36px !important',
                  ':hover': { backgroundColor: blue[600] },
                  // marginLeft: '8px',
                }}
                onClick={clickSearch}
              >
                <SearchIcon />
              </IconButton>
            </Tooltip>
          </>
        }
      />
      <Paper sx={{ mb: '10px' }}>
        <StudentRecordsNotes />
      </Paper>

      {/* 
 
<DynamicList2 HeaderList={HeaderList} ItemList={GetStatusStudents}
ClickItem={ClickItem} IconList={IconList}/> */}

      <Grid item xs={12}>
        {StudentList && StudentList.length === 0 ? (
          <Typography variant="body1" sx={{ textAlign: 'center', marginTop: 4, backgroundColor: '#324b84', padding: 1, borderRadius: 2, color: 'white' }}>
            <b>No Record Found.</b>
          </Typography>

        ) : (
          <DynamicList2
            HeaderList={HeaderList}
            ItemList={StudentList}
            ClickItem={ClickItem}
            IconList={IconList}
          />
        )}
      </Grid>
    </Box>
  );
};

export default StudentRecords;
