import ChevronRightTwoTone from '@mui/icons-material/ChevronRightTwoTone';
import CloseTwoToneIcon from '@mui/icons-material/CloseTwoTone';
import HomeTwoTone from '@mui/icons-material/HomeTwoTone';
import Help from '@mui/icons-material/QuestionMark';
import SaveAlt from '@mui/icons-material/Save';
import SearchIcon from '@mui/icons-material/Search';
import {
  Box,
  Breadcrumbs,
  Button,
  Card,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  Paper,
  Popover,
  Tooltip,
  Typography
} from '@mui/material';
import Stack from '@mui/material/Stack';
import { green } from '@mui/material/colors';
import { useTheme } from '@mui/styles';
import { useContext, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AlertContext } from 'src/contexts/AlertContext';
import {
  IGetCalendarForStudentBody,
  IGetStudentNameBody,
  ISaveStudentAttendanceBody
} from 'src/interfaces/IndividualAttendance/IIndividualAttendance';
import CardCalenderList from 'src/libraries/ResuableComponents/CardCalenderList';
import SearchableDropdown from 'src/libraries/ResuableComponents/SearchableDropdown';
import {
  SaveStudentAttendance,
  getcalendar,
  getstudentname,
  resetMessage
} from 'src/requests/Attendance/requestIndividualAttendance';
import { RootState } from 'src/store';
import { getAttendanceLegend } from '../Common/Util';

const IndividualAttendance = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useTheme();
  const [search, setSearch] = useState(true);
  const asSchoolId = Number(localStorage.getItem('localSchoolId'));
  const asAcademicYearId = Number(sessionStorage.getItem('AcademicYearId'));
  const StandardDivisionId = Number(
    sessionStorage.getItem('StandardDivisionId')
  );
  const TeacherId = Number(sessionStorage.getItem('TeacherId'));
  const studentId = sessionStorage.getItem('StudentId');
  const [asStudentsAttendance, setasStudentsAttendance] = useState();
  const [month, setMonth] = useState((new Date().getMonth() + 1).toString());
  const [year, setYear] = useState(new Date().getFullYear());
  const [ItemList, setItemList] = useState([]);
  const [DefaultValue, setDefaultValue] = useState(null);
  const [StudentId, setStudentId] = useState('0');
  const itemlist2 = [
    { id: 'Y', Text: 'Present All' },
    { id: 'N', Text: 'Absent All' }
  ];
  const [SearchText, setSearchText] = useState('');
  const [IsPresentAbsent, setIsPresentAbsent] = useState(0);
  const [date, setDate] = useState(new Date());
  const formattedDate = ` ${date.toLocaleString('default', {
    month: 'short'
  })} ${date.getFullYear()}`;
  const Note: string = 'Mark the monthly attendance of individual students.';
  const [IsClicked, setIsClicked] = useState(false);

  const StudentList = useSelector(
    (state: RootState) => state.IndividualAttendance.GetStudentName
  );

  const CalendarForStudent = useSelector(
    (state: RootState) => state.IndividualAttendance.GetCalendarForStudent
  );

  const SaveAttendanceforStudent = useSelector(
    (state: RootState) => state.IndividualAttendance.SaveStudentAttendance
  );

  const IGetStudentNameBody: IGetStudentNameBody = {
    asSchoolId: asSchoolId,
    asAcademicYearId: asAcademicYearId,
    asStandardDivisionId: StandardDivisionId
  };
  const IGetCalendarForStudent: IGetCalendarForStudentBody = {
    asSchoolId: asSchoolId,
    aStudentId: Number(StudentId),
    aAcademicYearId: asAcademicYearId,
    aMonthId: Number(month),
    aYear: new Date(formattedDate).getFullYear()
  };

  const HeaderPublish = [
    { Id: 1, Header: 'Sun' },
    { Id: 2, Header: 'Mon' },
    { Id: 3, Header: 'Tue' },
    { Id: 4, Header: 'Wed' },
    { Id: 5, Header: 'Thu' },
    { Id: 6, Header: 'Fri' },
    { Id: 7, Header: 'Sat' }
  ];

  useEffect(() => {
    dispatch(getstudentname(IGetStudentNameBody));
  }, []);

  useEffect(() => {
    if (StudentId != '0') dispatch(getcalendar(IGetCalendarForStudent));
  }, [month, StudentId]);

  useEffect(() => {
    setItemList(CalendarForStudent);
  }, [CalendarForStudent]);

  useEffect(() => {
    if (StudentList.length > 0) {
      setStudentId(StudentList[0].Value);
    }
  }, [StudentList]);
  const clickStudent = (value) => {
    setIsPresentAbsent(0);
    setStudentId(value);
  };

  const clickTogle = (value) => {
    setItemList(
      ItemList.map((obj) =>
        obj.IsClickable
          ? {
            ...obj,
            Status: value,
            BackgroundColor: getAttendanceLegend(value),
            Text1: value == 'Y' ? 'Present' : 'Absent'
          }
          : obj
      )
    );
    const isClicked = ItemList.some(
      (obj) => obj.IsClickable && obj.Status !== value
    );
    setIsClicked(isClicked);
    setIsPresentAbsent(value);
  };
  useEffect(() => {
    if (ItemList.length >= 0) setAttendanceXML(getAttendanceString());
  }, [ItemList]);
  const click = () => {
    navigate('/extended-sidebar/Teacher/TAttendance');
  };
  const handlePrevMonth = () => {
    const newDate = new Date(date);
    newDate.setMonth(newDate.getMonth() - 1);

    if (newDate.getMonth() === 11) {
      newDate.setFullYear(newDate.getFullYear());
    }

    setDate(newDate);
    setMonth(`${newDate.getMonth() + 1}`);
    setYear(newDate.getFullYear());
  };

  const handleNextMonth = () => {
    const newDate = new Date(date);
    newDate.setMonth(newDate.getMonth() + 1);

    if (newDate.getMonth() === 0) {
      newDate.setFullYear(newDate.getFullYear());
    }

    setDate(newDate);
    setMonth(`${newDate.getMonth() + 1}`);
    setYear(newDate.getFullYear());
  };
  const [AttendanceXML, setAttendanceXML] = useState('');
  const ClickItem = (value) => {
    setItemList(value);
  };
  const ref = useRef<any>(null);
  const [isOpenSave, setOpenSave] = useState<boolean>(false);
  const [isOpenPresent, setOpenPresent] = useState<boolean>(false);
  const [isOpenAbsent, setOpenAbsent] = useState<boolean>(false);
  const { showAlert, closeAlert } = useContext(AlertContext);

  const handleSave = (): void => {
    showAlert({
      title: 'Save Changes',
      message: 'Are you sure, Do you want to update changes?',
      variant: 'warning',
      cancelButtonText: 'Cancel',
      confirmButtonText: 'Update',
      onConfirm: () => {
        SaveFile();
        closeAlert();
      },
      onCancel: closeAlert
    });
    return;
  };

  const handlePresent = (): void => {
    showAlert({
      title: 'Mark all as Present',
      message:
        'Are you sure you want the chosen student to be marked as present on each day?',
      variant: 'warning',
      cancelButtonText: 'Cancel',
      confirmButtonText: 'Confirm',
      onConfirm: () => {
        clickTogle('Y');
        closeAlert();
      },
      onCancel: closeAlert
    });
    return;
  };

  const handleAbsent = (): void => {
    showAlert({
      title: 'Mark all as Absent',
      message:
        'Are you sure you want the chosen student to be marked as absent on each day?',
      variant: 'warning',
      cancelButtonText: 'Cancel',
      confirmButtonText: 'Confirm',
      onConfirm: () => {
        clickTogle('N');
        closeAlert();
      },
      onCancel: closeAlert
    });
    return;
  };

  const getAttendanceString = () => {
    var XMLString = '';
    let isClicked = false;
    ItemList.map((item) => {
      if (item.Status != undefined && item.Status != item.Text3)
        isClicked = true;
      if (item.IsClickable)
        XMLString =
          XMLString +
          '<SchoolWiseAttendance Attendance_Date="' +
          item.Value +
          '" Is_Present="' +
          (item.Status != undefined ? item.Status : item.Text3) +
          '" />';
    });

    setIsClicked(isClicked);
    return '<Attendance>' + XMLString + '</Attendance>';
  };

  useEffect(() => {
    if (SaveAttendanceforStudent !== '')
      toast.success(SaveAttendanceforStudent, { toastId: 'success1' });
    dispatch(resetMessage());
  }, [SaveAttendanceforStudent]);

  const SaveFile = () => {
    const SaveAttendance: ISaveStudentAttendanceBody = {
      asSchoolId: asSchoolId,
      asInsertedById: TeacherId,
      asStudentsAttendance: AttendanceXML,
      aStudentId: Number(StudentId),
      aYear: year,
      aMonthId: Number(month)
    };
    dispatch(SaveStudentAttendance(SaveAttendance));
  };
  return (
    <Container sx={{ mt: 4 }} maxWidth={'xl'}>
      <Stack
        direction={'row'}
        justifyContent={'space-between'}
        alignItems={'center'}
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
              <HomeTwoTone color="primary" />
            </IconButton>
          </Link>
          <Link
            to={'/extended-sidebar/Teacher/TAttendance'}
            style={{ textDecoration: 'none' }}
          >
            <Typography
              variant={'h3'}
              fontSize={'23px'}
              fontWeight={'normal'}
              color={'text.primary'}
              sx={{
                '&:hover': {
                  fontWeight: 'bold'
                }
              }}
            >
              Attendance
            </Typography>
          </Link>
          <Typography variant={'h3'} fontSize={'23px'} color="text.primary">
            Individual Attendance
          </Typography>
        </Breadcrumbs>
        <Stack direction={'row'} gap={1}>
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
                  ItemList={StudentList}
                  onChange={clickStudent}
                  defaultValue={StudentId}
                />
              </>
            ) : (
              ''
            )}
            <Divider sx={{ height: 28 }} orientation="vertical" />

            <IconButton
              onClick={() => setSearch(!search)}
              color="primary"
              aria-label="directions"
            >
              <Tooltip title="search">
                <SearchIcon />
              </Tooltip>
            </IconButton>
          </Paper>
          <Tooltip title="Present All">
            <IconButton
              onClick={handlePresent}
              sx={{
                color: 'white',
                backgroundColor: 'gray',
                width: '36px',
                height: '36px !important',
                ':hover': { backgroundColor: 'green' }
              }}
            >
              <h5>P</h5>
            </IconButton>
          </Tooltip>
          <Popover
            disableScrollLock
            anchorEl={ref.current}
            onClose={() => setOpenAbsent(!isOpenAbsent)}
            open={isOpenAbsent}
            anchorOrigin={{
              vertical: 'center',
              horizontal: 'center'
            }}
            transformOrigin={{
              vertical: 'center',
              horizontal: 'center'
            }}
          >
            <Card sx={{ py: 5 }}>
              <Box width={400} gap={5} alignContent="center" mx={2}>
                <Typography color="" mb={3} textAlign={'center'}>
                  Are you sure you want the chosen student to be marked as
                  absent on each day?
                </Typography>
                <Stack
                  direction="row"
                  gap={7}
                  mx={5}
                  justifyContent="space-between"
                >
                  <Button
                    variant="outlined"
                    sx={{ px: 6 }}
                    color="error"
                    onClick={handleAbsent}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="contained"
                    sx={{
                      px: 6,
                      backgroundColor: (theme) => theme.palette.primary.main,
                      color: 'white'
                    }}
                    color="primary"
                  >
                    Confirm
                  </Button>
                </Stack>
              </Box>
            </Card>
          </Popover>
          <Dialog
            onClose={() => setOpenAbsent(!isOpenAbsent)}
            open={isOpenAbsent}
            fullWidth
            maxWidth={'xs'}
          >
            <DialogTitle
              variant={'h3'}
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
            >
              Mark all as Absent
              <IconButton
                onClick={() => {
                  setOpenAbsent(!isOpenAbsent);
                }}
              >
                <CloseTwoToneIcon />
              </IconButton>
            </DialogTitle>
            <DialogContent dividers>
              <Box py={2}>
                <Typography variant={'h4'} textAlign={'center'}>
                  Are you sure you want the chosen student to be marked as
                  absent on each day?
                </Typography>
              </Box>
            </DialogContent>
            <DialogActions sx={{ px: 3, py: 2 }}>
              <Button variant="outlined" color="error" onClick={handleAbsent}>
                Cancel
              </Button>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: (theme) => theme.palette.primary.main,
                  color: 'white'
                }}
                color="primary"
              >
                Confirm
              </Button>
            </DialogActions>
          </Dialog>

          <Tooltip title="Absent All">
            <IconButton
              onClick={handleAbsent}
              sx={{
                color: 'white',
                height: '36px !important',
                width: '36px',
                backgroundColor: 'gray',
                ':hover': { backgroundColor: 'rgb(245, 17, 17)' }
              }}
            >
              <h5>A</h5>
            </IconButton>
          </Tooltip>
          <Dialog
            onClose={() => setOpenSave(!isOpenSave)}
            open={isOpenSave}
            fullWidth
            maxWidth={'xs'}
          >
            <DialogTitle
              variant={'h3'}
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
            >
              Save Changes
              <IconButton
                onClick={() => {
                  setOpenSave(!isOpenSave);
                }}
              >
                <CloseTwoToneIcon />
              </IconButton>
            </DialogTitle>
            <DialogContent dividers>
              <Box py={2}>
                <Typography variant={'h4'} textAlign={'center'}>
                  Are you sure, Do you want to update changes?
                </Typography>
              </Box>
            </DialogContent>
            <DialogActions sx={{ py: 2, px: 3 }}>
              <Button variant="outlined" color="error" onClick={handleSave}>
                Cancel
              </Button>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: (theme) => theme.palette.primary.main,
                  color: 'white'
                }}
                color="primary"
              >
                Update
              </Button>
            </DialogActions>
          </Dialog>
          <Tooltip title="Save">
            <IconButton
              onClick={handleSave}
              sx={{
                color: 'white',
                backgroundColor: green[600],
                height: '36px !important',
                ':hover': { backgroundColor: green[600] }
              }}
            >
              <SaveAlt />
            </IconButton>
          </Tooltip>
          <Tooltip title="Mark monthly attendance of an individual student.">
            <IconButton
              sx={{
                color: 'white',
                backgroundColor: 'gray',
                height: '36px !important',
                ':hover': { backgroundColor: 'gray' }
              }}
            >
              <Help />
            </IconButton>
          </Tooltip>
        </Stack>
      </Stack>
      <Box mt={1.5}>
        <CardCalenderList
          ItemList={ItemList}
          ClickItem={ClickItem}
          handlePrevMonth={handlePrevMonth}
          handleNextMonth={handleNextMonth}
          formattedDate={formattedDate}
          DefaultValue={DefaultValue}
          ArrayList={HeaderPublish}
        />
      </Box>
      <br></br>
      <Dialog
        onClose={() => setOpenPresent(!isOpenPresent)}
        open={isOpenPresent}
        fullWidth
        maxWidth={'xs'}
      >
        <DialogTitle
          variant={'h3'}
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
          color={'success'}
        >
          Mark all as Present
          <IconButton
            onClick={() => {
              setOpenPresent(!isOpenPresent);
            }}
          >
            <CloseTwoToneIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          <Box py={2}>
            <Typography variant={'h4'} textAlign={'center'}>
              Are you sure you want the chosen student to be marked as present
              on each day?
            </Typography>
          </Box>
        </DialogContent>
        <DialogActions sx={{ px: 3, py: 2 }}>
          <Button variant="outlined" color="error" onClick={handlePresent}>
            Cancel
          </Button>
          <Button
            variant="contained"
            sx={{
              backgroundColor: (theme) => theme.palette.primary.main,
              color: 'white'
            }}
            color="primary"
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};
export default IndividualAttendance;
