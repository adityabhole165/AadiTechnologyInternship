import BadgeTwoToneIcon from '@mui/icons-material/BadgeTwoTone';
import RecentActorsTwoToneIcon from '@mui/icons-material/RecentActorsTwoTone';
import SaveTwoToneIcon from '@mui/icons-material/SaveTwoTone';
import SearchTwoToneIcon from '@mui/icons-material/SearchTwoTone';
import {
  Box,
  Container,
  Grid,
  Hidden,
  IconButton,
  Paper,
  Stack,
  TextField,
  Tooltip,
  Typography
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import ITAttendance, {
  IStudentsDetails
} from 'src/interfaces/Teacher/TAttendance';
import {
  IDeleteAttendanceBody,
  IGetAttendanceStatus,
  IGetClassTeachersBodynew,
  IGetSummaryCountforAttendanceBody,
  ISaveAttendance
} from 'src/interfaces/Teacher/TAttendanceList';
import CardCalender1 from 'src/libraries/ResuableComponents/CardCalender1';
import DateSelector from 'src/libraries/buttons/DateSelector';
import Dropdown from 'src/libraries/dropdown/Dropdown';
import PageHeader from 'src/libraries/heading/PageHeader';
import { ErrorDetail } from 'src/libraries/styled/ErrormessageStyled';
import {
  CDADeleteAttendance,
  CDAGetTeacherNameList,
  CDASummaryCountforAttendanceBody,
  CDAresetDeleteAttendance,
  GetSaveAttendanceStatus,
  GetStudentList,
  getStandard
} from 'src/requests/TAttendance/TAttendance';
import { RootState } from 'src/store';
import List26 from '../../libraries/list/List26';
import { getDateFormatted } from '../Common/Util';

import { grey } from '@mui/material/colors';
import { Styles } from 'src/assets/style/student-style';
import SearchableDropdown from 'src/libraries/ResuableComponents/SearchableDropdown';

const TAttendance = () => {
  const HeaderArray = [
    { Id: 1, Header: '' },
    { Id: 2, Header: 'Boys' },
    { Id: 3, Header: 'Girls' },
    { Id: 4, Header: 'Total' }
  ];

  const HeaderPublish = [
    { Id: 1, Header: 'Sun' },
    { Id: 2, Header: 'Mon' },
    { Id: 3, Header: 'Tue' },
    { Id: 4, Header: 'Wed' },
    { Id: 5, Header: 'Thu' },
    { Id: 6, Header: 'Fri' },
    { Id: 7, Header: 'Sat' }
  ];

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const classes = Styles();
  const { AssignedDate, StandardId } = useParams();
  const asSchoolId = localStorage.getItem('localSchoolId');
  const asAcademicYearId = sessionStorage.getItem('AcademicYearId');
  let asTeacherId = '0';
  let IsClassTeacher = sessionStorage.getItem('IsClassTeacher');
  const asStandardDivisionId = sessionStorage.getItem('StandardDivisionId');
  const TeacherId = sessionStorage.getItem('TeacherId');
  const [search, setSearch] = useState(false);

  const [Standardid, setStandardid] = useState<string>();

  const [assignedDate, setAssignedDate] = useState<string>();

  const [onlySelectedClass, setOnlySelectedClass] = useState('none');
  const [singleStdName, setSingleStdName] = useState('');

  const [AttendanceDate, setAttendanceDate] = useState(
    new Date().toISOString()
  );
  const [asUserId, SetUserId] = useState();
  // const [selectClasstecaher, setselectClasstecaher] = useState( (sessionStorage.getItem('TeacherId')));
  const [selectClasstecahernew, setselectClasstecahernew] = useState(
    sessionStorage.getItem('TeacherId')
  );

  // Date selector Start
  const [asAbsentRollNos, setAbsentRollNos] = useState('');
  const [asAllPresentOrAllAbsent, setAllPresentOrAllAbsent] = useState('');

  const stdlist: any = useSelector(
    (state: RootState) => state.StandardAttendance.stdlist
  );

  const RollNoList = useSelector(
    (state: RootState) => state.AttendanceList.StudentList
  );

  console.log(RollNoList, 'stdlist--');

  const StudentAbsent = useSelector(
    (state: RootState) => state.AttendanceList.StudentAbsent
  );
  const AttendanceStatus = useSelector(
    (state: RootState) => state.AttendanceList.AttendanceStatus
  );

  const saveResponseMessage = useSelector(
    (state: RootState) => state.AttendanceList.SaveResponse
  );

  let AYStatus = useSelector(
    (state: RootState) => state.AttendanceList.AYStatus
  );

  const SummaryCountforAttendance = useSelector(
    (state: RootState) => state.AttendanceList.ISGetSummaryCountforAttendance
  );

  const listAttendanceCalender = useSelector(
    (state: RootState) => state.AttendanceList.listAttendanceCalender
  );

  const DeleteAttendance = useSelector(
    (state: RootState) => state.AttendanceList.DeleteAttendance
  );
  const ClassTeacherDropdownnew = useSelector(
    (state: RootState) => state.AttendanceList.ISClassTeacherList
  );

  const getAssignedDateStatus = () => {
    let a = listAttendanceCalender.filter((item) => item.Value == assignedDate);
    return a.length > 0 ? a[0].Text3 : '';
  };

  const ScreensAccessPermission = JSON.parse(
    sessionStorage.getItem('ScreensAccessPermission')
  );

  console.log('ScreensAccessPermission', ScreensAccessPermission);
  const GetScreenPermission = () => {
    let perm = 'N';
    ScreensAccessPermission.map((item) => {
      if (item.ScreenName === 'Attendance') perm = item.IsFullAccess;
    });
    return perm;
  };

  const GetStudentDetails: IStudentsDetails = {
    asStdDivId: selectClasstecahernew,
    asDate: assignedDate,
    asAcademicYearId: asAcademicYearId,
    asSchoolId: asSchoolId
  };

  const getAttendanceStatus: IGetAttendanceStatus = {
    asStanardDivisionId: Standardid,
    asAttendanceDate: assignedDate,
    asAcademicYearId: asAcademicYearId,
    asSchoolId: asSchoolId
  };

  const GetSaveStudentAttendance: ISaveAttendance = {
    asStandardDivisionId: Standardid,
    asDate: assignedDate,
    asAcademicYearId: asAcademicYearId,
    asSchoolId: asSchoolId,
    asAbsentRollNos: asAbsentRollNos,
    asAllPresentOrAllAbsent: asAllPresentOrAllAbsent,
    asUserId: asTeacherId
  };
  const SummaryCountforAttendanceBody: IGetSummaryCountforAttendanceBody = {
    asSchoolId: Number(asSchoolId),
    asAcademicYearId: Number(asAcademicYearId),
    asStandardDivisionId: Number(asStandardDivisionId),
    asAttendanceDate: assignedDate,
    asUserId: asUserId
  };

  const DeleteAttendanceBody: IDeleteAttendanceBody = {
    asSchoolId: Number(asSchoolId),
    asAttendanceDate: assignedDate,
    asAcademicYearId: Number(asAcademicYearId),
    asStdDivId: Number(asStandardDivisionId)
  };

  useEffect(() => {
    const ClassTeachernewBody: IGetClassTeachersBodynew = {
      asSchoolId: Number(asSchoolId),
      asAcadmicYearId: Number(asAcademicYearId),
      asTeacher_id: Number(
        GetScreenPermission() == 'Y' ? 0 : selectClasstecahernew
      )
    };
    dispatch(CDAGetTeacherNameList(ClassTeachernewBody));
  }, []);

  useEffect(() => {
    if (ClassTeacherDropdownnew.length > 0) {
      setselectClasstecahernew(ClassTeacherDropdownnew[0].Value);
    }
  }, [ClassTeacherDropdownnew]);

  useEffect(() => {
    const ScreensAccessPermission = JSON.parse(
      sessionStorage.getItem('ScreensAccessPermission')
    );
    let IsFullAccess = 'N';

    let teacherId = sessionStorage.getItem('TeacherId');
    let className = sessionStorage.getItem('ClassName');
    ScreensAccessPermission.map((item) => {
      if (item.ScreenName === 'Attendance') IsFullAccess = item.IsFullAccess;
    });
    if (IsClassTeacher == 'Y' && className.length > 1 && IsFullAccess != 'Y')
      asTeacherId = teacherId != null && teacherId != '' ? teacherId : '0';
    const body: ITAttendance = {
      asSchoolId: asSchoolId,
      asAcademicyearId: asAcademicYearId,
      asTeacherId: asTeacherId
    };
    dispatch(getStandard(body));
    getCurrentDate(new Date());
    if (AssignedDate != undefined || StandardId != undefined) {
      setStandardid(StandardId);
      setAssignedDate(AssignedDate);
      setOnlySelectedClass('');
    }
  }, []);

  useEffect(() => {
    popupateDate();
    if (assignedDate != undefined) {
      dispatch(GetStudentList(GetStudentDetails));
      dispatch(CDASummaryCountforAttendanceBody(SummaryCountforAttendanceBody));
    }
  }, [Standardid, assignedDate, selectClasstecahernew]);

  const ClickDeleteAttendance = () => {
    if (
      window.confirm(
        'Are you sure you want to delete attendance of date  : ' + assignedDate
      )
    ) {
      dispatch(CDADeleteAttendance(DeleteAttendanceBody));
    }
  };
  const getCurrentDate = (newDate?: Date) => {
    setAssignedDate(getDateFormatted(newDate));
  };

  const popupateDate = () => {
    if (Standardid !== undefined) {
      dispatch(GetStudentList(GetStudentDetails));
      let arr = [];
      RollNoList.map((obj) => {
        if (!obj.isActive) arr.push(obj.text1);
      });
    }
  };
  const handleChange = (value) => {
    if (value != 'Select Class') {
      setStandardid(value);
      setOnlySelectedClass('');
    } else {
      setOnlySelectedClass('none');
    }
  };

  const getAbsetNumber = (value) => {
    if (value === '') setAllPresentOrAllAbsent('P');
    if (value.split(',').length === RollNoList.length)
      setAllPresentOrAllAbsent('N');
    else setAllPresentOrAllAbsent('');
    setAbsentRollNos(value);
  };

  const SaveAttendance = () => {
    const GetSaveStudentAttendance: ISaveAttendance = {
      asStandardDivisionId: Standardid,
      asDate: assignedDate,
      asAcademicYearId: asAcademicYearId,
      asSchoolId: asSchoolId,
      asAbsentRollNos: asAbsentRollNos,
      asAllPresentOrAllAbsent: asAllPresentOrAllAbsent,
      asUserId: asTeacherId
    };
    dispatch(GetSaveAttendanceStatus(GetSaveStudentAttendance));
  };

  useEffect(() => {
    if (saveResponseMessage != '') {
      toast.success(saveResponseMessage);
      //dispatch(setSaveResponse());
      dispatch(CDASummaryCountforAttendanceBody(SummaryCountforAttendanceBody));
    }
  }, [saveResponseMessage]);

  useEffect(() => {
    if (DeleteAttendance != '') {
      toast.success('Attendance deleted successfully!');
      dispatch(CDAresetDeleteAttendance());
      dispatch(CDASummaryCountforAttendanceBody(SummaryCountforAttendanceBody));
    }
  }, [DeleteAttendance]);

  useEffect(() => {
    if (stdlist.length == 1) {
      setSingleStdName(stdlist[0].Name);
      setStandardid(stdlist[0].Value);
      setOnlySelectedClass('');
    }
  }, [stdlist]);
  const SaveMsg = () => {
    if (
      AttendanceStatus === 'Selected date is holiday.' ||
      AttendanceStatus === 'Selected date is weekend.'
    ) {
      if (
        !window.confirm(
          'Are you sure to mark Attendance on selected weekend/holiday?'
        )
      ) {
        setAbsentRollNos('');
        return null;
      }
    }
    if (
      window.confirm(
        'All the student are marked as absent. Are you sure you want to save the attendance'
      )
    ) {
      dispatch(GetSaveAttendanceStatus(GetSaveStudentAttendance));
    }

    SaveAttendance();
  };

  const clickNav = (value) => {
    navigate(
      `/${location.pathname.split('/')[1]}/Teacher/TAttendance/` + value
    );
  };
  const ClickItemList = (value) => {
    const GetStudentDetails: IStudentsDetails = {
      asStdDivId: asStandardDivisionId,
      asDate: value,
      asAcademicYearId: asAcademicYearId,
      asSchoolId: asSchoolId
    };
    dispatch(GetStudentList(GetStudentDetails));
    setAssignedDate(value);
  };

  const ClickItem = (value) => {
    setAssignedDate(value);
  };

  const clickClassTechernew = (value) => {
    setselectClasstecahernew(value);
  };

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
        <Box>
          <PageHeader
            heading="Attendance"
            subheading={
              <Tooltip title="Show Attendance Overview" sx={{ ml: 1 }}>
                <Typography
                  color={'primary'}
                  sx={{ cursor: 'pointer' }}
                  onClick={() => {
                    navigate(
                      '/extended-sidebar/Teacher/SchoolAttendanceOverview'
                    );
                  }}
                >
                  Count: {SummaryCountforAttendance?.TotalStudents}
                </Typography>
              </Tooltip>
            }
          ></PageHeader>
        </Box>
        <Stack direction={'row'} gap={1}>
          <Box>
            <Tooltip title={'Individual Attendance'}>
              <IconButton
                onClick={() => {
                  navigate('/extended-sidebar/Teacher/IndidualAttendance');
                }}
                sx={{
                  color: 'white',
                  backgroundColor: grey[600],
                  '&:hover': {
                    backgroundColor: grey[600]
                  }
                }}
              >
                <BadgeTwoToneIcon />
              </IconButton>
            </Tooltip>
          </Box>
          <Box>
            <Tooltip title={'Monthwise Attendance'}>
              <IconButton
                onClick={() => {
                  navigate('/extended-sidebar/Teacher/MonthwiseAttendance');
                }}
                sx={{
                  color: 'white',
                  backgroundColor: grey[600],
                  '&:hover': {
                    backgroundColor: grey[600]
                  }
                }}
              >
                <RecentActorsTwoToneIcon />
              </IconButton>
            </Tooltip>
          </Box>
          <Box>
            <Paper
              component="form"
              sx={{
                display: 'flex',
                justifyContent: 'flex-end',
                alignItems: 'center',
                my: 0,
                py: 0,
                flexWrap: 'nowrap'
              }}
            >
              {search ? (
                <>
                  <SearchableDropdown
                    ItemList={ClassTeacherDropdownnew}
                    onChange={clickClassTechernew}
                    defaultValue={selectClasstecahernew}
                  />
                </>
              ) : (
                ''
              )}

              <IconButton
                onClick={() => setSearch(!search)}
                color="primary"
                sx={{
                  color: 'white',
                  backgroundColor: grey[600],
                  '&:hover': {
                    backgroundColor: grey[600]
                  }
                }}
              >
                <Tooltip title="search">
                  <SearchTwoToneIcon />
                </Tooltip>
              </IconButton>
            </Paper>
          </Box>
          <Box>
            <Tooltip title={'Save Attendance'}>
              <IconButton
                onClick={SaveMsg}
                sx={{
                  color: 'white',
                  backgroundColor: grey[600],
                  '&:hover': {
                    backgroundColor: grey[600]
                  }
                }}
              >
                <SaveTwoToneIcon />
              </IconButton>
            </Tooltip>
          </Box>
        </Stack>
      </Stack>

      <Grid container spacing={2}>
        <Grid item xs={3}>
          <Box
            sx={{
              background: (theme) => theme.palette.common.white,
              p: 2
            }}
          >
            <Typography
              variant={'h4'}
              sx={{ marginBottom: 1, fontSize: '18px !important' }}
              color={'green'}
            >
              {SummaryCountforAttendance?.GetSummaryCountList[0]?.Text1}
            </Typography>
            <Stack
              direction={'row'}
              gap={2}
              alignItems={'center'}
              justifyContent={'space-between'}
            >
              <Grid container spacing={2}>
                <Grid item xs={4}>
                  <Typography variant={'subtitle2'}>Boys</Typography>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center'
                    }}
                  >
                    <Typography variant={'body1'}>
                      {SummaryCountforAttendance?.GetSummaryCountList[0]?.Text2}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={4}>
                  <Typography variant={'subtitle2'}>Girls</Typography>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center'
                    }}
                  >
                    <Typography variant={'body1'}>
                      {SummaryCountforAttendance?.GetSummaryCountList[0]?.Text3}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={4}>
                  <Typography variant={'subtitle2'}>Total</Typography>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center'
                    }}
                  >
                    <Typography variant={'body1'}>
                      {SummaryCountforAttendance?.GetSummaryCountList[0]?.Text4}
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Stack>
          </Box>
        </Grid>
        <Grid item xs={3}>
          <Box
            sx={{
              background: (theme) => theme.palette.common.white,
              p: 2
            }}
          >
            <Typography
              variant={'h4'}
              sx={{ marginBottom: 1, fontSize: '18px !important' }}
              color={'error'}
            >
              {SummaryCountforAttendance?.GetSummaryCountList[1]?.Text1}
            </Typography>
            <Stack
              direction={'row'}
              gap={2}
              alignItems={'center'}
              justifyContent={'space-between'}
            >
              <Grid container spacing={2}>
                <Grid item xs={4}>
                  <Typography variant={'subtitle2'}>Boys</Typography>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center'
                    }}
                  >
                    <Typography variant={'body1'}>
                      {SummaryCountforAttendance?.GetSummaryCountList[1]?.Text2}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={4}>
                  <Typography variant={'subtitle2'}>Girls</Typography>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center'
                    }}
                  >
                    <Typography variant={'body1'}>
                      {SummaryCountforAttendance?.GetSummaryCountList[1]?.Text3}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={4}>
                  <Typography variant={'subtitle2'}>Total</Typography>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center'
                    }}
                  >
                    <Typography variant={'body1'}>
                      {SummaryCountforAttendance?.GetSummaryCountList[1]?.Text4}
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Stack>
          </Box>
        </Grid>
        <Grid item xs={3}>
          <Box
            sx={{
              background: (theme) => theme.palette.common.white,
              p: 2
            }}
          >
            <Typography
              variant={'h4'}
              sx={{ marginBottom: 1, fontSize: '18px !important' }}
              color={'primary'}
            >
              {SummaryCountforAttendance?.GetSummaryCountList[2]?.Text1}
            </Typography>
            <Stack
              direction={'row'}
              gap={2}
              alignItems={'center'}
              justifyContent={'space-between'}
            >
              <Grid container spacing={2}>
                <Grid item xs={4}>
                  <Typography variant={'subtitle2'}>Boys</Typography>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center'
                    }}
                  >
                    <Typography variant={'body1'}>
                      {SummaryCountforAttendance?.GetSummaryCountList[2]?.Text2}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={4}>
                  <Typography variant={'subtitle2'}>Girls</Typography>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center'
                    }}
                  >
                    <Typography variant={'body1'}>
                      {SummaryCountforAttendance?.GetSummaryCountList[2]?.Text3}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={4}>
                  <Typography variant={'subtitle2'}>Total</Typography>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center'
                    }}
                  >
                    <Typography variant={'body1'}>
                      {SummaryCountforAttendance?.GetSummaryCountList[2]?.Text4}
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Stack>
          </Box>
        </Grid>
        <Grid item xs={3}>
          <Box
            sx={{
              background: (theme) => theme.palette.common.white,
              p: 2
            }}
          >
            <Typography
              variant={'h4'}
              sx={{ marginBottom: 1, fontSize: '18px !important' }}
            >
              {SummaryCountforAttendance?.GetSummaryCountList[3]?.Text1}
            </Typography>
            <Stack
              direction={'row'}
              gap={2}
              alignItems={'center'}
              justifyContent={'space-between'}
            >
              <Grid container spacing={2}>
                <Grid item xs={4}>
                  <Typography variant={'subtitle2'}>Boys</Typography>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center'
                    }}
                  >
                    <Typography variant={'body1'}>
                      {SummaryCountforAttendance?.GetSummaryCountList[3]?.Text2}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={4}>
                  <Typography variant={'subtitle2'}>Girls</Typography>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center'
                    }}
                  >
                    <Typography variant={'body1'}>
                      {SummaryCountforAttendance?.GetSummaryCountList[3]?.Text3}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={4}>
                  <Typography variant={'subtitle2'}>Total</Typography>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center'
                    }}
                  >
                    <Typography variant={'body1'}>
                      {SummaryCountforAttendance?.GetSummaryCountList[3]?.Text4}
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Stack>
          </Box>
        </Grid>
      </Grid>

      <Grid container spacing={2} mt={2}>
        <Grid item xs={12} md={6}>
          {stdlist.length > 1 ? (
            <Dropdown
              Array={stdlist}
              handleChange={handleChange}
              label="Select Class"
              defaultValue={Standardid}
            ></Dropdown>
          ) : (
            <Hidden mdUp>
              {' '}
              <span>
                <b>Class : </b>
                {singleStdName}
              </span>
            </Hidden>
          )}
          <br />
          <br />

          <Box sx={{ display: onlySelectedClass }}>
            <Hidden mdUp>
              <DateSelector
                date={assignedDate}
                setCurrentDate={getCurrentDate}
                Close={getCurrentDate}
              ></DateSelector>
            </Hidden>
            <Hidden mdUp>
              <ErrorDetail>{AttendanceStatus}</ErrorDetail>
            </Hidden>
            <Box sx={{ display: AYStatus }}>
              <Hidden mdUp>
                <TextField
                  variant="standard"
                  fullWidth
                  label="Absent Roll Numbers"
                  value={StudentAbsent}
                ></TextField>
              </Hidden>
              <Box>
                <List26
                  Dataa={RollNoList}
                  getAbsetNumber={getAbsetNumber}
                  assignedDate={assignedDate}
                ></List26>
              </Box>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Grid container>
            <Box sx={{ backgroundColor: 'white' }}>
              <CardCalender1
                ItemList={listAttendanceCalender}
                ClickItem={ClickItem}
                formattedDate={assignedDate}
                DefaultValue
                assignedDate={assignedDate}
                ArrayList={HeaderPublish}
                ClickDeleteAttendance={ClickDeleteAttendance}
                Standardid={Standardid}
                AttendanceStatus={AttendanceStatus}
                clickNav={clickNav}
                getAssignedDateStatus={getAssignedDateStatus}
              />
            </Box>
          </Grid>
          <br></br>
          {/* 
            {SummaryCountforAttendance != null && (
              <TableAttendace
                ItemList={SummaryCountforAttendance.GetSummaryCountList}
                HeaderArray={HeaderArray}
              />
            )} */}
        </Grid>
      </Grid>
    </Container>
  );
};

export default TAttendance;
