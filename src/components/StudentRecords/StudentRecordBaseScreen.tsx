import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'src/store';
//import DynamicList from 'src/libraries/list/DynamicList'
import QuestionMark from '@mui/icons-material/QuestionMark';
import SearchTwoTone from '@mui/icons-material/SearchTwoTone';
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
import { grey } from '@mui/material/colors';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import {
  IGetAllStudentStatusBody,
  IGetTeacherListBody
} from 'src/interfaces/StudentRecords/IStudentRecords';
import ButtonGroupComponent from 'src/libraries/ResuableComponents/ButtonGroupComponent';
import SearchableDropdown from 'src/libraries/ResuableComponents/SearchableDropdown';
import StudentRecordList from 'src/libraries/ResuableComponents/StudentRecordList';
import {
  GetAllStudentStatuss,
  GetTeachersList
} from 'src/requests/StudentRecords/RequestStudentRecords';
import CommonPageHeader from '../CommonPageHeader';
import StudentRecordsNotes from './StudentRecordsNotes';


const StudentRecords = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [SelectTeacher, setSelectTeacher] = useState('0');
  const [StudentStatusList, setStudentStatusList] = useState([]);
  const [showRiseAndShine, setShowRiseAndShine] = useState(false);
  const [regNoOrName, setRegNoOrName] = useState('');
  const [StudentList, setStudentList] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(20);
  const rowsPerPageOptions = [20, 50, 100, 200];
  const [page, setPage] = useState(1);
  const filteredList = StudentList.filter((item) => item.TotalRows !== undefined);
  const TotalCount = filteredList.map((item) => item.TotalRows);
  const uniqueTotalCount = [...new Set(TotalCount)];
  const singleTotalCount = uniqueTotalCount[0];

  const startRecord = (page - 1) * rowsPerPage + 1;
  const endRecord = Math.min(page * rowsPerPage, singleTotalCount);
  const pagecount = Math.ceil(singleTotalCount / rowsPerPage);

  const asSchoolId = Number(localStorage.getItem('localSchoolId'));
  const asAcademicYearId = Number(sessionStorage.getItem('AcademicYearId'));
  const StandardDivisionId = Number(
    sessionStorage.getItem('StandardDivisionId')
  );
  const TeacherId = Number(sessionStorage.getItem('TeacherId'));
  const asUpdatedById = localStorage.getItem('Id');
  const UserId = Number(sessionStorage.getItem('Id'));

  const GetTeachers = useSelector(
    (state: RootState) => state.StudentRecords.ClassTeachers
  );
  console.log(GetTeachers, 'GetTeachers');
  const GetStatusStudents: any = useSelector(
    (state: RootState) => state.StudentRecords.StudentStatus
  );
  // console.log(GetStatusStudents,"GetStatusStudents");
  const [headerArray, setHeaderArray] = useState([
    { Id: 1, Header: 'Registration Number', SortOrder: null, sortKey: 'RegistrationNumber' },
    { Id: 2, Header: 'Roll No.', SortOrder: null, sortKey: 'RollNo.' },
    { Id: 3, Header: 'Class', SortOrder: null, sortKey: 'ClassName' },
    { Id: 4, Header: 'Name', SortOrder: null, sortKey: 'StudentName' },
    { Id: 5, Header: 'Action For Me' },
    { Id: 6, Header: 'Action' },
  ]);
  const handleHeaderClick = (updatedHeaderArray) => {
    setHeaderArray(updatedHeaderArray);
    const sortField = updatedHeaderArray.find(header => header.SortOrder !== null);
    // const newSortExpression = sortField ? `${sortField.sortKey} ${sortField.SortOrder}` : 'Created_Date desc';
    // setSortExpression(newSortExpression);
  };
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
  }, [SelectTeacher, page, rowsPerPage]);

  useEffect(() => {
    if (GetTeachers.length > 0) setSelectTeacher(GetTeachers[0].Value);
  }, [GetTeachers]);

  useEffect(() => {
    setStudentList(GetStatusStudents);
  }, [GetStatusStudents]);

  const TeachersBody: IGetTeacherListBody = {
    asSchoolId: asSchoolId,
    asAcademicYearId: asAcademicYearId,
    asUserId: UserId,
    HasFullAccess: 'false'
  };
  const GetStudentStatusBody: IGetAllStudentStatusBody = {
    asSchoolId: Number(asSchoolId),
    asAcademicYearId: Number(asAcademicYearId),
    asStdDivId: Number(SelectTeacher),
    asFilter: regNoOrName.toString(),
    sortExpression: '',
    sortDirection: 'ASC',
    StartIndex: 0,
    EndIndex: 20,
    ShowSaved: true,
    IncludeRiseAndShine: showRiseAndShine,
    HasEditAccess: 'Y',
    UserId: UserId
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
  const clickEdit = () => {
    navigate('/extended-sidebar/Teacher/AddRequisition');
  };
  const clickView = () => {
    navigate('/extended-sidebar/Teacher/AddStudentRecord');
  };
  const PageChange = (pageNumber) => {
    setPage(pageNumber);
  };
  const ChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(1); // Reset to the first page when changing rows per page
  };

  return (
    <Box sx={{ px: 2 }}>
      <CommonPageHeader
        navLinks={[
          { title: 'Student Record List', path: '/extended-sidebar/Teacher/StudentRecordBaseScreen' }
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
                onClick={clickSearch}
                sx={{
                  background: (theme) => theme.palette.primary.main,
                  color: 'white',
                  '&:hover': {
                    backgroundColor: (theme) => theme.palette.primary.dark
                  }
                }}
              >
                <SearchTwoTone />
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
      <Box sx={{ background: 'white', p: 2 }}>
        {singleTotalCount > rowsPerPage ? <div style={{ flex: 1, textAlign: 'center' }}>
          <Typography variant="subtitle1" sx={{ margin: '16px 0', textAlign: 'center' }}>
            <Box component="span" fontWeight="fontWeightBold">
              {startRecord} to {endRecord}
            </Box>
            {' '}out of{' '}
            <Box component="span" fontWeight="fontWeightBold">
              {singleTotalCount}
            </Box>{' '}
            {singleTotalCount === 1 ? 'record' : 'records'}
          </Typography>
        </div> : <span> </span>}

        <StudentRecordList
          ItemList={StudentList}
          HeaderArray={headerArray}
          ClickHeader={handleHeaderClick}
          clickEdit={clickEdit}
          clickView={clickView}
        />
        {singleTotalCount > rowsPerPage ? <ButtonGroupComponent
          PageChange={PageChange}
          numberOfButtons={pagecount}
          rowsPerPage={rowsPerPage}
          ChangeRowsPerPage={ChangeRowsPerPage}
          rowsPerPageOptions={rowsPerPageOptions}
        /> : <span> </span>}
      </Box>

    </Box>
  );
};

export default StudentRecords;
