import { AddComment } from '@mui/icons-material';
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
  Typography,
  debounce
} from '@mui/material';
import { blue, green, grey, red } from '@mui/material/colors';
import { useCallback, useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Styles } from 'src/assets/style/student-style';
import { AlertContext } from 'src/contexts/AlertContext';
import { ISchoolIdBody } from 'src/interfaces/AbsentStudentPopCp/IAbsentStudent';
import ITAttendance, {
  IStudentsDetails,
} from 'src/interfaces/Teacher/TAttendance';
import {
  IDeleteAttendanceBody,
  IGetAcademicDatesForStandardDivisionBody,
  IGetAttendanceStatus,
  IGetClassTeachersBodynew,
  IGetSummaryCountforAttendanceBody,
  ISaveAttendance,
  ISaveStudentAttendenceBody
} from 'src/interfaces/Teacher/TAttendanceList';
import CardCalender1 from 'src/libraries/ResuableComponents/CardCalender1';
import SearchableDropdown from 'src/libraries/ResuableComponents/SearchableDropdown';
import { GetSchoolSettings } from 'src/requests/AbsentStudentPopCp/ReqAbsentStudent';
import {
  CDADeleteAttendance,
  CDAGetTeacherNameList,
  CDASummaryCountforAttendanceBody,
  CDAresetDeleteAttendance,
  GetAcademicDatesForStandardDivision,
  GetSaveAttendanceStatus,
  GetSaveStudentAttendence,
  GetStudentList,
  getStandard,
  setSaveResponse
} from 'src/requests/TAttendance/TAttendance';
import { RootState } from 'src/store';
import List26 from '../../libraries/list/List26';
import AbsentStudentP from '../Attendance/AbsentStudentP';
import { getDateFormatted, getDateFormattedDash } from '../Common/Util';
import CommonPageHeader from '../CommonPageHeader';

const TAttendance = () => {
  const { StandardDivisionId1 } = useParams();
  const [isDirty, setIsDirty] = useState(false);
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
  // const { AssignedDate, StandardId } = useParams();
  // console.log("AssignedDate", AssignedDate)
  // console.log("StandardId", StandardId)
  const { SelectClasstecahernew, AssignedDate } = useParams();
  console.log("SelectClasstecahernew", SelectClasstecahernew)
  console.log("AssignedDate", AssignedDate)
  const StandardDivisionIdse = (
    sessionStorage.getItem('StandardDivisionId')
  );
  const asSchoolId = localStorage.getItem('localSchoolId');
  const asAcademicYearId = sessionStorage.getItem('AcademicYearId');
  let [asTeacherId, setasTeacherId] = useState('0');
  let IsClassTeacher = sessionStorage.getItem('IsClassTeacher');
  const asStandardDivisionId = sessionStorage.getItem('StandardDivisionId');
  const TeacherId = sessionStorage.getItem('TeacherId');
  const [search, setSearch] = useState(true);
  const [showSaveAttendanceAlert, setShowSaveAttendanceAlert] = useState(false);
  const [sendmeassagestudent, setsendmeassagestudent] = useState(false);
  const [StandardDivisionId, setStandardDivisionId] = useState(StandardDivisionIdse)
  const [Standardid, setStandardid] = useState<string>();
  const [MarksError, setMarksError] = useState('')
  const [assignedDate, setAssignedDate] = useState<string>(AssignedDate);
  const [Open, setOpen] = useState(false);
  const [onlySelectedClass, setOnlySelectedClass] = useState('none');
  const [singleStdName, setSingleStdName] = useState('');

  const [AttendanceDate, setAttendanceDate] = useState(
    new Date().toISOString()
  );
  const [asUserId, SetUserId] = useState();

  const [selectClasstecahernew, setselectClasstecahernew] = useState(SelectClasstecahernew);
  // const [selectClasstecahernew, setselectClasstecahernew] = useState(
  //   paramsselectClasstecaher !== undefined
  //     ? paramsselectClasstecaher.toString()
  //     : ("TeacherId")
  // );
  // Date selector Start
  const [asAbsentRollNos, setAbsentRollNos] = useState('');
  const [asAllPresentOrAllAbsent, setAllPresentOrAllAbsent] = useState('');
  const [ItemList, setItemList] = useState([]);
  const ScreensAccessPermission = JSON.parse(
    sessionStorage.getItem('ScreensAccessPermission')
  );
  const UsschoolSettings = useSelector(
    (state: RootState) => state.AbsentStudent.IsGetSchoolSettings
  );
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
  const AcademicDates = useSelector(
    (state: RootState) => state.AttendanceList.GetAcademicDates
  );

  const getAssignedDateStatus = () => {
    let a = listAttendanceCalender.filter((item) => item.Value == assignedDate);
    return a.length > 0 ? a[0].Text3 : '';
  };

  const GetScreenPermission = () => {
    let perm = 'N';
    ScreensAccessPermission && ScreensAccessPermission.map((item) => {
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
  const getAcademicDates: IGetAcademicDatesForStandardDivisionBody = {
    asSchoolId: Number(asSchoolId),
    asAcademicYearId: Number(asAcademicYearId),
    asStandardDivId: Number(selectClasstecahernew)

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
    //asStdDivId: Number(asStandardDivisionId),
    asStdDivId: Number(selectClasstecahernew),
    asUserId: Number(TeacherId)
  };
  const getTeacherId = () => {
    let TeacherId = '';
    ClassTeacherDropdownnew.map((item) => {
      if (item.Value == selectClasstecahernew) TeacherId = item.Id;
    });
    return TeacherId;
  };

  const setStandardDivName = () => {
    let StandardDivision = '';
    ClassTeacherDropdownnew.map((item) => {
      if (item.Value == selectClasstecahernew) StandardDivision = item.StandardDivision;
    });
    return StandardDivision;
  };
  // useEffect(() => {
  //   const ClassTeachernewBody: IGetClassTeachersBodynew = {
  //     asSchoolId: Number(asSchoolId),
  //     asAcadmicYearId: Number(asAcademicYearId),
  //     asTeacher_id: GetScreenPermission() === 'Y'
  //       ? 0
  //       : (getTeacherId() ? Number(getTeacherId()) : (paramsselectClasstecaher != null ? Number(paramsselectClasstecaher) : Number(selectClasstecahernew)))

  //   }
  //   dispatch(CDAGetTeacherNameList(ClassTeachernewBody));
  // }, []);


  const debouncedFetch = useCallback(debounce((body) => {
    dispatch(CDAGetTeacherNameList(body));
  }, 500), [dispatch]);

  useEffect(() => {
    const ClassTeachernewBody: IGetClassTeachersBodynew = {
      asSchoolId: Number(asSchoolId),
      asAcadmicYearId: Number(asAcademicYearId),
      asTeacher_id: GetScreenPermission() === 'Y'
        ? 0
        : (getTeacherId() ? Number(getTeacherId()) : (SelectClasstecahernew != null ? Number(SelectClasstecahernew) : Number(selectClasstecahernew)))

    }
    // dispatch(SubjectListforTeacherDropdown(GetTeacherSubjectAndClassSubjectBody));
    debouncedFetch(ClassTeachernewBody);
  }, []);

  useEffect(() => {
    if (ClassTeacherDropdownnew.length > 0) {
      setselectClasstecahernew(ClassTeacherDropdownnew[0].Value);
    }
  }, [ClassTeacherDropdownnew]);


  useEffect(() => {
    if (ClassTeacherDropdownnew && ClassTeacherDropdownnew.length > 0) {
      if (SelectClasstecahernew == undefined && AssignedDate == undefined) {
        if (GetScreenPermission() === 'Y') {
          setselectClasstecahernew(ClassTeacherDropdownnew[0].Value);
          console.log(GetScreenPermission(), "ClassTeachers 2", ClassTeacherDropdownnew[0].Value)
        } else {
          const teacherIdFromSession = sessionStorage.getItem('StandardDivisionId');
          if (teacherIdFromSession !== null) {
            setselectClasstecahernew(teacherIdFromSession);

          }
        }
      }
    }
  }, [ClassTeacherDropdownnew]);
  const debouncedFetch1 = useCallback(debounce((body) => {
    dispatch(GetAcademicDatesForStandardDivision(body));
  }, 500), [dispatch]);
  useEffect(() => {
    debouncedFetch1(getAcademicDates);
    //dispatch(GetAcademicDatesForStandardDivision(getAcademicDates));
  }, [selectClasstecahernew, assignedDate]);


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
    // getCurrentDate(new Date());
    // if (AssignedDate != undefined || StandardId != undefined) {
    //   setStandardid(StandardId);
    //   setAssignedDate(AssignedDate);
    //   setOnlySelectedClass('');
    // }

    getCurrentDates(new Date());
    if (AssignedDate != undefined || SelectClasstecahernew != undefined) {
      setselectClasstecahernew(selectClasstecahernew);
      setAssignedDate(AssignedDate);
      setOnlySelectedClass('');
    }
  }, []);

  useEffect(() => {
    if (assignedDate != undefined && assignedDate != "") {
      dispatch(GetStudentList(GetStudentDetails));
      dispatch(CDASummaryCountforAttendanceBody(SummaryCountforAttendanceBody));
    }
  }, [Standardid, assignedDate, selectClasstecahernew, AcademicDates]);

  const ClickDeleteAttendance = () => {
    setIsDirty(true);

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
  const getCurrentDates = (newDate?: Date) => {
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

  const AbsentStudentsBody: ISchoolIdBody = {
    asSchoolId: Number(asSchoolId),
  };
  useEffect(() => {
    dispatch(GetSchoolSettings(AbsentStudentsBody));
  }, []);

  useEffect(() => {
    if (saveResponseMessage != '') {
      dispatch(GetStudentList(GetStudentDetails));
      toast.success(saveResponseMessage, { toastId: 'success1' });
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
  useEffect(() => {
    if (!AcademicDates || !AcademicDates.StartDate || !AcademicDates.EndDate) {
      setMarksError('Term Start & End dates have not been configured for this Standard. Please configure it.');
    } else {
      setMarksError(''); // Clear any existing error message
    }
  }, [AcademicDates]);



  const SaveMsg = () => {
    // if (!SaveIsActive) return;
    if (!SaveIsActive || !isDirty) return;
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
                setIsDirty(false);
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
                setIsDirty(false);
              }
            });
          } else {
            SaveAttendance(); // Execute the API call after the second alert
            setIsDirty(false);
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
            setIsDirty(false);
          }
        });
      } else {
        setAbsentRollNos('');
        SaveAttendance();
        closeAlert();
        setIsDirty(false);
      }
    }
    return;
  };

  const ClickOpenDialogbox = () => {
    setOpen(true);
  };
  const ClickCloseDialogbox = () => {
    setOpen(false);
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
    setIsDirty(true);
    setAssignedDate(value);
  };

  const clickClassTechernew = (value) => {
    setIsDirty(true);
    setselectClasstecahernew(value);
  };
  const handleCheckboxChange = (value) => {
    setIsDirty(true);
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
                  <Typography color={MarksError ? grey[500] : blue[500]} fontWeight={"bold"}
                    sx={{ cursor: 'pointer' }} onClick={() => {
                      if (!MarksError) {
                        clickNavigateSchoolAttendanceOverview()
                      }
                    }
                    }>
                    Overview
                  </Typography>
                </Tooltip>
                <Typography color={MarksError ? grey[500] : blue[500]} fontWeight={"bold"}>
                  -
                </Typography>
                <Typography
                  color={MarksError ? grey[500] : blue[500]}
                  sx={{
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                  }}
                  fontWeight={'bold'}
                  onClick={() => {
                    if (!MarksError) {
                      clickNavigateSchoolAttendanceOverview()
                    }
                  }}
                >

                  <Tooltip title={'Present Students / Total Student'}>
                    <Box>{SummaryCountforAttendance?.TotalStudents}</Box>
                  </Tooltip>
                </Typography>
              </Stack>
              <Box sx={{ height: '25px', border: '1px solid grey' }}></Box>
              <Stack direction={'row'} alignItems={'center'} gap={1}>
                <Typography
                  color={MarksError ? grey[500] : blue[500]}
                  sx={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 1 }}
                  fontWeight={'bold'}
                  onClick={() => {
                    if (!MarksError) {
                      clickNavigateSchoolAttendanceOverview()
                    }
                  }}
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
                sx={{ pl: 0, minWidth: '20vw' }}
                ItemList={ClassTeacherDropdownnew}
                onChange={clickClassTechernew}
                defaultValue={selectClasstecahernew}
                size={"small"}
                DisableClearable={GetScreenPermission() == 'N'}
                disabled={GetScreenPermission() === 'N'}
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
              <Tooltip
                title={`Mark attendance of each student from your class for the select date. Click on "Delete" button to delete attendance of selected date. Delete facility will be available only if user have "Edit" facility.`}
              ><span>
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
                </span>
              </Tooltip>
            </Box>
            <Box>
              <Tooltip title={'Individual Attendance'}>
                <span>
                  <IconButton
                    onClick={() => {
                      navigate('/extended-sidebar/Teacher/IndidualAttendance/' + selectClasstecahernew + '/' + getDateFormattedDash(assignedDate));
                    }}
                    sx={{
                      color: 'white',
                      backgroundColor: blue[500],
                      '&:hover': {
                        backgroundColor: blue[600]
                      }
                    }}
                    disabled={MarksError ? true : false}
                  >
                    <PersonIcon />
                  </IconButton>
                </span>
              </Tooltip>
            </Box>
            <Box>
              <Tooltip title={'Month Wise Attendance'}>
                <span>
                  <IconButton
                    onClick={() => {
                      navigate('/extended-sidebar/Teacher/MonthwiseAttendance/' + selectClasstecahernew + '/' + getDateFormattedDash(assignedDate));
                    }}
                    sx={{
                      color: 'white',
                      backgroundColor: blue[500],
                      '&:hover': {
                        backgroundColor: blue[600]
                      }
                    }}
                    disabled={MarksError ? true : false}
                  >
                    <CalendarMonthIcon />
                  </IconButton>
                </span>
              </Tooltip>
            </Box>

            {Number(UsschoolSettings) > 0 &&
              <Box>
                <Tooltip title={'Absent Student Details'}>
                  <IconButton
                    sx={{
                      backgroundColor: blue[500],
                      color: 'white',
                      '&:hover': {
                        backgroundColor: blue[600]
                      }
                    }}
                    onClick={ClickOpenDialogbox}
                  >
                    <AddComment />
                  </IconButton>
                </Tooltip>
              </Box>
            }
            <Box>
              {SaveIsActive ? (
                <Tooltip title={'Save Attendance'}>
                  <span>
                    <IconButton
                      onClick={SaveMsg}
                      sx={{
                        color: 'white',
                        backgroundColor: green[500],
                        '&:hover': {
                          backgroundColor: green[600]
                        }
                      }}
                      disabled={MarksError ? true : false}
                    >
                      <SaveIcon />
                    </IconButton>
                  </span>
                </Tooltip>
              ) : (
                <Tooltip title={'Save Attendance'}>
                  <span>
                    <IconButton
                      onClick={SaveMsg}
                      sx={{
                        color: 'white',
                        backgroundColor: green[500],
                        '&:hover': {
                          backgroundColor: green[600]
                        }
                      }}
                    >
                      <SaveIcon />
                    </IconButton>
                  </span>
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
          >   {!MarksError && (
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
            </Typography>)}
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
                    {!MarksError && (
                      <Typography variant={'body1'} textAlign={'center'}>
                        {SummaryCountforAttendance?.GetSummaryCountList[0]?.Text2}
                      </Typography>)}
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
                  > {!MarksError && (
                    <Typography variant={'body1'} textAlign={'center'}>
                      {SummaryCountforAttendance?.GetSummaryCountList[0]?.Text3}
                    </Typography>)}
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
                  >  {!MarksError && (
                    <Typography variant={'body1'} textAlign={'center'}>
                      {SummaryCountforAttendance?.GetSummaryCountList[0]?.Text4}
                    </Typography>)}
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
          >  {!MarksError && (
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
            </Typography>)}
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
                    {!MarksError && (
                      <Typography variant={'body1'} textAlign={'center'}>
                        {SummaryCountforAttendance?.GetSummaryCountList[1]?.Text2}
                      </Typography>)}
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
                  >  {!MarksError && (
                    <Typography variant={'body1'} textAlign={'center'}>
                      {SummaryCountforAttendance?.GetSummaryCountList[1]?.Text3}
                    </Typography>)}
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
                  >  {!MarksError && (
                    <Typography variant={'body1'} textAlign={'center'}>
                      {SummaryCountforAttendance?.GetSummaryCountList[1]?.Text4}
                    </Typography>)}
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
          >  {!MarksError && (
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
            </Typography>)}
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
                  >  {!MarksError && (
                    <Typography variant={'body1'} textAlign={'center'}>
                      {SummaryCountforAttendance?.GetSummaryCountList[2]?.Text2}
                    </Typography>)}
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
                  >  {!MarksError && (
                    <Typography variant={'body1'} textAlign={'center'}>
                      {SummaryCountforAttendance?.GetSummaryCountList[2]?.Text3}
                    </Typography>)}
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
                  > {!MarksError && (
                    <Typography variant={'body1'} textAlign={'center'}>
                      {SummaryCountforAttendance?.GetSummaryCountList[2]?.Text4}
                    </Typography>)}
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
          > {!MarksError && (
            <Typography
              variant={'h4'}
              sx={{
                marginBottom: 1,
                fontSize: '18px !important',
                textTransform: 'capitalize'
              }}
            >
              {new Date(assignedDate).toLocaleString('default', { month: 'long' })} Summary
            </Typography>)}
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
                  >  {!MarksError && (
                    <Typography variant={'body1'} textAlign={'center'}>
                      {SummaryCountforAttendance?.GetSummaryCountList[3]?.Text2}
                    </Typography>)}
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
                  >  {!MarksError && (
                    <Typography variant={'body1'} textAlign={'center'}>
                      {SummaryCountforAttendance?.GetSummaryCountList[3]?.Text3}
                    </Typography>)}
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
                  >  {!MarksError && (
                    <Typography variant={'body1'} textAlign={'center'}>
                      {SummaryCountforAttendance?.GetSummaryCountList[3]?.Text4}
                    </Typography>)}
                  </Box>
                </Grid>
              </Grid>
            </Stack>
          </Box>
        </Grid>
      </Grid>
      <Grid container spacing={2} mt={1}>
        <Grid item xs={12} md={6}>
          <Box sx={{ backgroundColor: 'white', pt: 2 }}>
            <Grid justifyContent="center">
              <Box sx={{ backgroundColor: 'white' }} >
                {/* <Typography sx={{ color: 'red' }}>{MarksError}</Typography> */}
                {/* <div style={{ marginTop: '70px' }}> */}
                {MarksError ? (
                  <div style={{
                    fontWeight: 'bold',
                    fontSize: '16px',
                    color: red[500],
                    background: '#FFCCCC',
                    marginTop: '12px',
                    marginLeft: '10px',
                    marginBottom: '0px',
                    padding: '5px',
                    border: MarksError ? '1px solid black' : 'none'
                  }}>
                    {MarksError}

                  </div>
                ) : null}
                {!MarksError && AttendanceStatus && (
                  <div
                    style={{
                      fontWeight: 'bold',
                      fontSize: '16px',
                      marginTop: '12px',
                      marginLeft: '10px',
                      marginRight: '10px',
                      color:
                        AttendanceStatus.includes('Attendance not yet marked.') ||
                          AttendanceStatus.includes('Attendance date should be within current academic year') ||
                          AttendanceStatus.includes('Term Start & End dates have not been configured')
                          ? 'red'
                          : AttendanceStatus.includes('Attendance is already marked')
                            ? 'green'
                            : 'red', // Set the text color based on the content of AttendanceStatus
                      backgroundColor:
                        AttendanceStatus.includes('Attendance not yet marked.') ||
                          AttendanceStatus.includes('Attendance date should be within current academic year') ||
                          AttendanceStatus.includes('Term Start & End dates have not been configured')
                          ? '#FFCCCC' // Light red background color
                          : AttendanceStatus.includes('Attendance is already marked')
                            ? '#CCFFCC' // Light green background color
                            : '#FFCCCC', // No background color for other messages
                      border:
                        AttendanceStatus.includes('Attendance not yet marked.') ||
                          AttendanceStatus.includes('Attendance date should be within current academic year') ||
                          AttendanceStatus.includes('Term Start & End dates have not been configured') ||
                          AttendanceStatus.includes('Attendance is already marked')
                          ? '1px solid black' // Add border for highlighted messages
                          : '1px solid black', // No border for other messages
                      padding: '5px', // Add padding for better spacing
                    }}
                  >
                    {AttendanceStatus}
                  </div>)}
                {/* </div> */}

                {/* <div style={{ marginTop: '5px' }}> */}
                <CardCalender1
                  ItemList={listAttendanceCalender}
                  ClickItem={ClickItem}
                  formattedDate={getDateFormatted(assignedDate)}
                  DefaultValue
                  assignedDate={getDateFormatted(assignedDate)}
                  ArrayList={HeaderPublish}
                  ClickDeleteAttendance={ClickDeleteAttendance}
                  Standardid={Standardid}
                  // AttendanceStatus={AttendanceStatus}

                  clickNav={clickNav}
                  getAssignedDateStatus={getAssignedDateStatus}
                />

              </Box>
            </Grid>
          </Box>
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
              {ClassTeacherDropdownnew ? (
                <Box sx={{ display: AYStatus }}>
                  {/* <Hidden mdUp>
                  <TextField
                    variant="standard"
                    fullWidth
                    label="Absent Roll Numbers"
                    value={StudentAbsent}
                  ></TextField>
                </Hidden> */}

                  {AcademicDates && AcademicDates.StartDate && AcademicDates.EndDate && (
                    <Box>

                      <List26
                        sendmeassagestudent={sendmeassagestudent}
                        handleCheckboxChange={handleCheckboxChange}
                        Dataa={RollNoList}
                        getAbsetNumber={getAbsetNumber}
                        assignedDate={assignedDate}
                        setIsDirty={setIsDirty}
                      ></List26>
                    </Box>
                  )}
                </Box>

              ) : null}
            </Box>
          </Grid>

        ) : (
          <Grid item xs={12} md={6}></Grid>
        )}

      </Grid>
      <Box sx={{ display: 'flex', justifyContent: 'flex-start', gap: '8px' }}>
        {Open && (
          <AbsentStudentP
            open={Open}
            setOpen={setOpen}
            ClickCloseDialogbox={ClickCloseDialogbox}
            Classname={setStandardDivName()}
            Date={assignedDate}
            ClassId={selectClasstecahernew} />
        )}
      </Box>
    </Box >
  );
};
//
export default TAttendance;
