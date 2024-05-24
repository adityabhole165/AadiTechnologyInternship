import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import PersonIcon from '@mui/icons-material/Person';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import SaveIcon from '@mui/icons-material/Save';
import {
  Box,
  Grid,
  IconButton,
  Stack,
  Tooltip,
  Typography
} from '@mui/material';
import { useContext, useEffect, useState } from 'react';
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
  ISaveAttendance,
  ISaveStudentAttendenceBody
} from 'src/interfaces/Teacher/TAttendanceList';
import CardCalender1 from 'src/libraries/ResuableComponents/CardCalender1';
import {
  CDADeleteAttendance,
  CDAGetTeacherNameList,
  CDASummaryCountforAttendanceBody,
  CDAresetDeleteAttendance,
  GetSaveAttendanceStatus,
  GetSaveStudentAttendence,
  GetStudentList,
  getStandard,
  setSaveResponse
} from 'src/requests/TAttendance/TAttendance';
import { RootState } from 'src/store';
import List26 from '../../libraries/list/List26';
import { getDateFormatted, getDateFormattedDash } from '../Common/Util';

import { grey } from '@mui/material/colors';
import { Styles } from 'src/assets/style/student-style';
import { AlertContext } from 'src/contexts/AlertContext';
import SearchableDropdown from 'src/libraries/ResuableComponents/SearchableDropdown';
import CommonPageHeader from '../CommonPageHeader';

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
  const { showAlert, closeAlert } = useContext(AlertContext);
  const { AssignedDate, StandardId } = useParams();
  const asSchoolId = localStorage.getItem('localSchoolId');
  const asAcademicYearId = sessionStorage.getItem('AcademicYearId');
  let [asTeacherId, setasTeacherId] = useState('0');
  let IsClassTeacher = sessionStorage.getItem('IsClassTeacher');
  const asStandardDivisionId = sessionStorage.getItem('StandardDivisionId');
  const TeacherId = sessionStorage.getItem('TeacherId');
  const [search, setSearch] = useState(true);
  const [showSaveAttendanceAlert, setShowSaveAttendanceAlert] = useState(false);
  const [sendmeassagestudent, setsendmeassagestudent] = useState(false);

  const [Standardid, setStandardid] = useState<string>();

  const [assignedDate, setAssignedDate] = useState<string>('');

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
  const [ItemList, setItemList] = useState([]);

  const stdlist: any = useSelector(
    (state: RootState) => state.StandardAttendance.stdlist
  );

  const RollNoList = useSelector(
    (state: RootState) => state.AttendanceList.StudentList
  );

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

  const GetScreenPermission = () => {
    let perm = 'N';
    ScreensAccessPermission?.map((item) => {
      if (item.ScreenName === 'Attendance') perm = item.IsFullAccess;
    });
    return perm;
  };

  const [SaveIsActive, setSaveIsActive] = useState(true);
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

  const SummaryCountforAttendanceBody: IGetSummaryCountforAttendanceBody = {
    asSchoolId: Number(asSchoolId),
    asAcademicYearId: Number(asAcademicYearId),
    asStandardDivisionId: Number(selectClasstecahernew),
    asAttendanceDate: assignedDate,
    asUserId: asUserId
  };

  const DeleteAttendanceBody: IDeleteAttendanceBody = {
    asSchoolId: Number(asSchoolId),
    asAttendanceDate: assignedDate,
    asAcademicYearId: Number(asAcademicYearId),
    asStdDivId: Number(asStandardDivisionId),
    asUserId: Number(TeacherId)
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
    ScreensAccessPermission?.map((item) => {
      if (item.ScreenName === 'Attendance') IsFullAccess = item.IsFullAccess;
    });
    if (IsClassTeacher == 'Y' && className.length > 1 && IsFullAccess != 'Y')
      setasTeacherId(teacherId != null && teacherId != '' ? teacherId : '0');
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
    if (assignedDate != undefined && assignedDate != "") {
      dispatch(GetStudentList(GetStudentDetails));
      dispatch(CDASummaryCountforAttendanceBody(SummaryCountforAttendanceBody));
    }
  }, [Standardid, assignedDate, selectClasstecahernew]);

  const ClickDeleteAttendance = () => {
    showAlert({
      title: 'Please Confirm',
      message:
        'Are you sure you want to delete attendance of date  : ' + assignedDate,
      variant: 'warning',
      confirmButtonText: 'Confirm',
      cancelButtonText: 'Cancel',
      onCancel: () => {
        closeAlert();
      },
      onConfirm: () => {
        dispatch(CDADeleteAttendance(DeleteAttendanceBody));
        closeAlert();
      }
    });

    return;
  };

  useEffect(() => {
    if (assignedDate != undefined && assignedDate != "") {
      dispatch(GetStudentList(GetStudentDetails));
      dispatch(CDASummaryCountforAttendanceBody(SummaryCountforAttendanceBody));
    }
  }, [Standardid, assignedDate, selectClasstecahernew]);

  const getCurrentDate = (newDate?: Date) => {
    setAssignedDate(getDateFormatted(newDate));
  };

  const handleChange = (value) => {
    if (value != 'Select Class') {
      setStandardid(value);
      setOnlySelectedClass('');
    } else {
      setOnlySelectedClass('none');
    }
  };

  const getAbsetNumber = (value, Itemlist) => {
    let isCheckAll = !Itemlist.filter((obj) => {
      return !obj.IsExamSubmitted;
    }).some((obj) => obj.isActive === false)
      ? 1
      : !Itemlist.filter((obj) => {
        return !obj.IsExamSubmitted;
      }).some((obj) => obj.isActive === true)
        ? 0
        : 2;
    if (isCheckAll === 1) {
      setAllPresentOrAllAbsent('P');
    } else if (isCheckAll === 0) {
      setAllPresentOrAllAbsent('N');
    } else {
      setAllPresentOrAllAbsent('');
    }
    setAbsentRollNos(value);
    setItemList(Itemlist);
  };

  const SaveAttendance_old = () => {
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
  const getXML = () => {
    let returnXML = '';
    ItemList.map((Item) => {
      returnXML =
        returnXML +
        '<SchoolWiseAttendance school_id="' +
        asSchoolId +
        '" attendance_date="' +
        assignedDate +
        '" Student_Id="' +
        Item.StudentId +
        '" is_present="' +
        (Item.isActive ? 'Y' : 'N') +
        '" is_halfdaypresent="N" Standard_Division_Id="' +
        selectClasstecahernew +
        '" Academic_Year_Id="' +
        asAcademicYearId +
        '" />';
    });
    return '<Attendance>' + returnXML + '</Attendance>';
  };
  const SaveAttendance = () => {
    const GetSaveStudentAttendance: ISaveStudentAttendenceBody = {
      asSchoolId: Number(asSchoolId),
      asInsertedById: Number(asTeacherId),
      asStudentsAttendanceXML: getXML(),
      asAttendanceDate: assignedDate,
      asStandardDivisionId: Number(selectClasstecahernew),
      asSendMessage: sendmeassagestudent
    };
    dispatch(GetSaveStudentAttendence(GetSaveStudentAttendance));
  };

  useEffect(() => {
    if (saveResponseMessage != '') {
      dispatch(GetStudentList(GetStudentDetails));
      toast.success(saveResponseMessage);
      dispatch(setSaveResponse());
      dispatch(CDASummaryCountforAttendanceBody(SummaryCountforAttendanceBody));
    }
  }, [saveResponseMessage]);

  useEffect(() => {
    if (DeleteAttendance != '') {
      toast.success(DeleteAttendance);
      dispatch(CDAresetDeleteAttendance());
      dispatch(GetStudentList(GetStudentDetails));
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
    if (!SaveIsActive) return;

    const lowerCaseAttendanceStatus = AttendanceStatus.toLowerCase();
    let confirmationMessage = '';

    if (
      lowerCaseAttendanceStatus === 'selected date is holiday.' ||
      lowerCaseAttendanceStatus === 'selected date is weekend.'
    ) {
      if (lowerCaseAttendanceStatus === 'selected date is holiday.') {
        confirmationMessage =
          'Are you sure to mark attendance on selected holiday?';
      } else if (lowerCaseAttendanceStatus === 'selected date is weekend.') {
        confirmationMessage =
          'Are you sure to mark attendance on selected weekend?';
      }
      showAlert({
        title: 'Please Confirm',
        message: confirmationMessage,
        variant: 'warning',
        confirmButtonText: 'Confirm',
        cancelButtonText: 'Cancel',
        onCancel: () => {
          closeAlert();
        },
        onConfirm: () => {
          setAbsentRollNos('');
          closeAlert();

          // Display the second alert
          if (asAllPresentOrAllAbsent === 'P') {
            showAlert({
              title: 'Please Confirm',
              message:
                'All the students are marked as present. Are you sure you want to save the attendance?',
              variant: 'warning',
              confirmButtonText: 'Confirm',
              cancelButtonText: 'Cancel',
              onCancel: () => {
                closeAlert();
              },
              onConfirm: () => {
                SaveAttendance();
                closeAlert();
              }
            });
          } else if (asAllPresentOrAllAbsent === 'N') {
            showAlert({
              title: 'Please Confirm',
              message:
                'All the students are marked as absent. Are you sure you want to save the attendance?',
              variant: 'warning',
              confirmButtonText: 'Confirm',
              cancelButtonText: 'Cancel',
              onCancel: () => {
                closeAlert();
              },
              onConfirm: () => {
                SaveAttendance();
                closeAlert();
              }
            });
          } else {
            SaveAttendance(); // Execute the API call after the second alert
          }
        }
      });
    } else {
      if (asAllPresentOrAllAbsent === 'P' || asAllPresentOrAllAbsent === 'N') {
        showAlert({
          title: 'Please Confirm',
          message:
            'All the students are marked as ' +
            (asAllPresentOrAllAbsent === 'P' ? 'present' : 'absent') +
            '. Are you sure you want to save the attendance?',
          variant: 'warning',
          confirmButtonText: 'Confirm',
          cancelButtonText: 'Cancel',
          onCancel: () => {
            closeAlert();
          },
          onConfirm: () => {
            SaveAttendance();
            closeAlert();
          }
        });
      } else {
        setAbsentRollNos('');
        SaveAttendance();
        closeAlert();
      }
    }
    return;
  };

  const clickNav = (value) => {
    navigate(
      `/${location.pathname.split('/')[1]}/Teacher/TAttendance/` + value
    );
  };
  const clickNavigateSchoolAttendanceOverview = () => {
    navigate('/extended-sidebar/Teacher/SchoolAttendanceOverview/' + getDateFormattedDash(assignedDate));
  }
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
  const handleCheckboxChange = (value) => {
    setsendmeassagestudent(value);
  };
  useEffect(() => {

    if (listAttendanceCalender.length > 0 && assignedDate != '') {
      listAttendanceCalender.map((item, i) => {
        if (item.Value === assignedDate) {
          if (
            item.Text1.includes('Outside') ||
            new Date(assignedDate) > new Date()
          )
            setSaveIsActive(false);
          else setSaveIsActive(true);
        }
      });
    }
  }, [listAttendanceCalender, assignedDate]);

  return (
    <Box sx={{ px: 2 }}>
      <CommonPageHeader
        navLinks={[
          {
            title: 'Attendance',
            path: '/extended-sidebar/Teacher/TAttendance'
          }
        ]}
        rightActions={
          <>
            <Stack direction={'row'} gap={1} alignItems={'center'}>
              <Stack direction={'row'} alignItems={'center'} gap={1}>
                <Tooltip title={"School Attendance Overview"}>
                  <Typography color="primary" fontWeight={"bold"}
                    sx={{ cursor: 'pointer' }} onClick={() => { clickNavigateSchoolAttendanceOverview() }
                    }>
                    Overview
                  </Typography>
                </Tooltip>
                <Typography color="primary" fontWeight={"bold"}>
                  -
                </Typography>
                <Typography
                  color={'primary'}
                  sx={{
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                  }}
                  fontWeight={'bold'}
                  onClick={() => { clickNavigateSchoolAttendanceOverview() }}
                >

                  <Tooltip title={'Present Students / Total Student'}>
                    <Box>{SummaryCountforAttendance?.TotalStudents}</Box>
                  </Tooltip>
                </Typography>
              </Stack>
              <Box sx={{ height: '25px', border: '1px solid grey' }}></Box>
              <Stack direction={'row'} alignItems={'center'} gap={1}>
                <Typography
                  color={'primary'}
                  sx={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 1 }}
                  fontWeight={'bold'}
                  onClick={() => { clickNavigateSchoolAttendanceOverview() }}
                >

                  <Tooltip title={'Attendance marked Divisions / TotalDivisions'}>
                    <Box>
                      {SummaryCountforAttendance?.TotalDivisions}
                    </Box>
                  </Tooltip>
                </Typography>
              </Stack>
            </Stack>
            <Box sx={{ background: 'white' }}>
              <SearchableDropdown
                label={""}
                sx={{ pl: 0, minWidth: '350px' }}
                ItemList={ClassTeacherDropdownnew}
                onChange={clickClassTechernew}
                defaultValue={selectClasstecahernew}
                size={"small"}
                DisableClearable={GetScreenPermission() == 'N'}
              />
              {/* <Paper
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
                </>
              ) : (
                ''
              )}

              <IconButton
                onClick={() => setSearch(!search)}
                color="primary"
                sx={{
                  color: (theme) => theme.palette.primary.main,
                  backgroundColor: 'white',
                  '&:hover': {
                    backgroundColor: 'white'
                  }
                }}
              >
                <Tooltip title="search">
                  <SearchIcon />
                </Tooltip>
              </IconButton>
            </Paper> */}
            </Box>

            <Box>
              <Tooltip title={'Individual Attendance'}>
                <IconButton
                  onClick={() => {
                    navigate('/extended-sidebar/Teacher/IndidualAttendance');
                  }}
                  sx={{
                    color: 'white',
                    backgroundColor: grey[500],
                    '&:hover': {
                      backgroundColor: grey[600]
                    }
                  }}
                >
                  <PersonIcon />
                </IconButton>
              </Tooltip>
            </Box>
            <Box>
              <Tooltip title={'Month Wise Attendance'}>
                <IconButton
                  onClick={() => {
                    navigate('/extended-sidebar/Teacher/MonthwiseAttendance');
                  }}
                  sx={{
                    color: 'white',
                    backgroundColor: grey[500],
                    '&:hover': {
                      backgroundColor: grey[600]
                    }
                  }}
                >
                  <CalendarMonthIcon />
                </IconButton>
              </Tooltip>
            </Box>
            <Box>
              <Tooltip
                title={`Mark attendance of each student from your class for the select date. Click on "Delete" button to delete attendance of selected date. Delete facility will be available only if user have "Edit" facility.`}
              >
                <IconButton
                  sx={{
                    color: 'white',
                    backgroundColor: grey[500],
                    height: '36px !important',
                    ':hover': { backgroundColor: grey[600] }
                  }}
                >
                  <QuestionMarkIcon />
                </IconButton>
              </Tooltip>
            </Box>
            <Box>
              {SaveIsActive ? (
                <Tooltip title={'Save Attendance'}>
                  <IconButton
                    onClick={SaveMsg}
                    sx={{
                      color: 'white',
                      backgroundColor: 'green'
                    }}
                  >
                    <SaveIcon />
                  </IconButton>
                </Tooltip>
              ) : (
                <Tooltip title={'Save Attendance'}>
                  <IconButton
                    onClick={SaveMsg}
                    sx={{
                      color: 'white',
                      backgroundColor: grey[500]
                    }}
                  >
                    <SaveIcon />
                  </IconButton>
                </Tooltip>
              )}
            </Box>
          </>
        }
      />
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <Box
            sx={{
              background: (theme) => theme.palette.common.white,
              p: 2,
              textAlign: 'center'
            }}
          >
            <Typography
              variant={'h4'}
              sx={{
                marginBottom: 1,
                fontSize: '18px !important',
                textTransform: 'capitalize'
              }}
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
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <Typography variant={'body1'} textAlign={'center'}>
                      {SummaryCountforAttendance?.GetSummaryCountList[0]?.Text2}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={4}>
                  <Typography variant={'subtitle2'}>Girls</Typography>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <Typography variant={'body1'} textAlign={'center'}>
                      {SummaryCountforAttendance?.GetSummaryCountList[0]?.Text3}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={4}>
                  <Typography variant={'subtitle2'}>Total</Typography>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <Typography variant={'body1'} textAlign={'center'}>
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
              p: 2,
              textAlign: 'center'
            }}
          >
            <Typography
              variant={'h4'}
              sx={{
                marginBottom: 1,
                fontSize: '18px !important',
                textTransform: 'capitalize'
              }}
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
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <Typography variant={'body1'} textAlign={'center'}>
                      {SummaryCountforAttendance?.GetSummaryCountList[1]?.Text2}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={4}>
                  <Typography variant={'subtitle2'}>Girls</Typography>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <Typography variant={'body1'} textAlign={'center'}>
                      {SummaryCountforAttendance?.GetSummaryCountList[1]?.Text3}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={4}>
                  <Typography variant={'subtitle2'}>Total</Typography>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <Typography variant={'body1'} textAlign={'center'}>
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
              p: 2,
              textAlign: 'center'
            }}
          >
            <Typography
              variant={'h4'}
              sx={{
                marginBottom: 1,
                fontSize: '18px !important',
                textTransform: 'capitalize'
              }}
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
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <Typography variant={'body1'} textAlign={'center'}>
                      {SummaryCountforAttendance?.GetSummaryCountList[2]?.Text2}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={4}>
                  <Typography variant={'subtitle2'}>Girls</Typography>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <Typography variant={'body1'} textAlign={'center'}>
                      {SummaryCountforAttendance?.GetSummaryCountList[2]?.Text3}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={4}>
                  <Typography variant={'subtitle2'}>Total</Typography>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <Typography variant={'body1'} textAlign={'center'}>
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
              p: 2,
              textAlign: 'center'
            }}
          >
            <Typography
              variant={'h4'}
              sx={{
                marginBottom: 1,
                fontSize: '18px !important',
                textTransform: 'capitalize'
              }}
            >
              {new Date(assignedDate).toLocaleString('default', { month: 'long' })} Summary
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
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <Typography variant={'body1'} textAlign={'center'}>
                      {SummaryCountforAttendance?.GetSummaryCountList[3]?.Text2}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={4}>
                  <Typography variant={'subtitle2'}>Girls</Typography>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <Typography variant={'body1'} textAlign={'center'}>
                      {SummaryCountforAttendance?.GetSummaryCountList[3]?.Text3}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={4}>
                  <Typography variant={'subtitle2'}>Total</Typography>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <Typography variant={'body1'} textAlign={'center'}>
                      {SummaryCountforAttendance?.GetSummaryCountList[3]?.Text4}
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Stack>
          </Box>
        </Grid>
      </Grid>
      <Grid container spacing={2} mt={1}>
        <Grid item xs={12} md={6}>
          <Grid container>
            <Box sx={{ backgroundColor: 'white' }}>
              <CardCalender1
                ItemList={listAttendanceCalender}
                ClickItem={ClickItem}
                formattedDate={getDateFormatted(assignedDate)}
                DefaultValue
                assignedDate={getDateFormatted(assignedDate)}
                ArrayList={HeaderPublish}
                ClickDeleteAttendance={ClickDeleteAttendance}
                Standardid={Standardid}
                AttendanceStatus={AttendanceStatus}
                clickNav={clickNav}
                getAssignedDateStatus={getAssignedDateStatus}
              />
            </Box>
          </Grid>
        </Grid>
        {SaveIsActive ? (
          <Grid item xs={12} md={6}>
            {/* {stdlist.length > 1 ? (
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
            )} */}

            <Box>
              {/* <Hidden mdUp>
                <DateSelector
                  date={assignedDate}
                  setCurrentDate={getCurrentDate}
                  Close={getCurrentDate}
                ></DateSelector>
              </Hidden>
              <Hidden mdUp>
                <ErrorDetail>{AttendanceStatus}</ErrorDetail>
              </Hidden> */}
              <Box sx={{ display: AYStatus }}>
                {/* <Hidden mdUp>
                  <TextField
                    variant="standard"
                    fullWidth
                    label="Absent Roll Numbers"
                    value={StudentAbsent}
                  ></TextField>
                </Hidden> */}
                <Box>
                  <List26
                    sendmeassagestudent={sendmeassagestudent}
                    handleCheckboxChange={handleCheckboxChange}
                    Dataa={RollNoList}
                    getAbsetNumber={getAbsetNumber}
                    assignedDate={assignedDate}
                  ></List26>
                </Box>
              </Box>
            </Box>
          </Grid>
        ) : (
          <Grid item xs={12} md={6}></Grid>
        )}
      </Grid>
    </Box >
  );
};
//
export default TAttendance;
