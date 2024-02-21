import AddIcon from '@mui/icons-material/Add';
import ApiTwoToneIcon from '@mui/icons-material/ApiTwoTone';
import BackupIcon from '@mui/icons-material/Backup';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import {
  Box,
  Breadcrumbs,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  Tooltip,
  Typography,
  styled
} from '@mui/material';
import { grey } from '@mui/material/colors';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';

import ChevronRightTwoTone from '@mui/icons-material/ChevronRightTwoTone';
import {
  IEventList,
  IGetAcadamicYearDropDownBody,
  IGetAllEventsBody,
  IGetAllMonthsDropDownBody,
  IGetAllStandardsBody
} from 'src/interfaces/Common/AnnualPlanner';
import AnnualPlannerCalendar from 'src/libraries/ResuableComponents/AnnualPlannerCalendar';
import {
  AcadamicYear,
  AllStandards,
  GetMonthList,
  alleventyearlist,
  getEventList
} from 'src/requests/AnnualPlanner/AnnualPlanner';
import { RootState } from 'src/store';
import UpcomingEvent from './UpcomingEvent';

const VisuallyHiddenInput = styled('input')({
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  top: 0,
  right: 0,
  opacity: 0
});

function AnnualPlanner() {
  const navigate = useNavigate();
  const { DateFrommon, DateFromyear } = useParams();
  const [AllStandard, setAllStandard] = useState('0');
  const [AllMonth, setAllMonth] = useState('0');
  const [AllAcadamicYear, setAllAcadamicYear] = useState('0');

  const BackMonth = new Date(
    Number(DateFromyear),
    Number(DateFrommon)
  ).getMonth();

  const dispatch = useDispatch();
  const eventList = useSelector(
    (state: RootState) => state.AnnualPlanner.EventList
  );
  const USAllStandards = useSelector(
    (state: RootState) => state.AnnualPlanner.IAllStandards
  );
  const SelectMonthList: any = useSelector(
    (state: RootState) => state.AnnualPlanner.ISSelectMonthList
  );
  const SelectAcadamicYear: any = useSelector(
    (state: RootState) => state.AnnualPlanner.ISAcadamicYearList
  );
  const loading = useSelector(
    (state: RootState) => state.AnnualPlanner.Loading
  );

  const CalendarForStudent = useSelector(
    (state: RootState) => state.IndividualAttendance.GetCalendarForStudent
  );

  const AllYearEventlist: any = useSelector(
    (state: RootState) => state.AnnualPlanner.IsAllYearEventList
  );
  console.log(AllYearEventlist, 'Seeeeeee');

  const Note: string =
    'These events may change due to unavoidable reasons without prior notice.';

  const asAcademicYearId = sessionStorage.getItem('AcademicYearId');
  const asSchoolId = localStorage.getItem('localSchoolId');
  const UserId = sessionStorage.getItem('Id');
  const RoleId = sessionStorage.getItem('RoleId');

  const HeaderPublish = [
    { Id: 1, Header: 'Sun' },
    { Id: 2, Header: 'Mon' },
    { Id: 3, Header: 'Tue' },
    { Id: 4, Header: 'Wed' },
    { Id: 5, Header: 'Thu' },
    { Id: 6, Header: 'Fri' },
    { Id: 7, Header: 'Sat' }
  ];

  const [date, setDate] = useState<any>({ selectedDate: null });
  const [openAnnualPlannerDialog, setOpenAnnualPlannerDialog] = useState(false);
  const [assignedYear, setAssignedYear] = useState<any>();
  const [assignedMonth_num, SetassignedMonth_num] = useState<any>();
  const [annualPlannerFile, setAnnualPlannerFile] = useState<any>();
  const formattedDate = `${new Date().toLocaleString('default', {
    month: 'short'
  })} ${new Date().getFullYear()}`;

  function setCurrentDate(newDate?: Date) {
    const date = newDate || new Date();
    const Month = new Date(date).toLocaleString('en-US', { month: 'short' });

    const Month_num = new Date(date).getMonth();
    const Year = new Date(date).getFullYear();
    const NewDateFormat = `${Month} ${Year}`;
    setDate({
      selectedDate: NewDateFormat
    });
    SetassignedMonth_num(BackMonth);
    setAssignedYear(DateFromyear);
    setAssignedYear(Year);
    SetassignedMonth_num(Month_num + 1);
  }

  useEffect(() => {
    localStorage.setItem('url', window.location.pathname);
    setCurrentDate();
    if (DateFrommon != undefined) {
      setDate({
        selectedDate: `${new Date(
          BackMonth + '/01/' + DateFromyear
        ).toLocaleString('default', { month: 'short' })} ${DateFromyear}`
      });
    }
  }, []);

  useEffect(() => {
    if (DateFrommon || DateFromyear != undefined) {
      SetassignedMonth_num(DateFrommon);
      setAssignedYear(DateFromyear);
    }
  }, [DateFrommon, DateFromyear]);

  useEffect(() => {
    if (assignedMonth_num !== undefined) {
      dispatch(getEventList(body));
    }
  }, [assignedMonth_num]);

  const getPreviousDate = () => {
    const { selectedDate } = date;
    const dateValues = selectedDate.includes('-')
      ? selectedDate.split('-')
      : selectedDate.split(' ');
    const updatedDate = Date.parse(dateValues[0] + '01,' + dateValues[1]);
    const currentDayInMilli = new Date(updatedDate);
    currentDayInMilli.setMonth(currentDayInMilli.getMonth() - 1);
    setCurrentDate(currentDayInMilli);
  };

  const getNextDate = () => {
    const { selectedDate } = date;
    const dateValues = selectedDate.includes('-')
      ? selectedDate.split('-')
      : selectedDate.split(' ');
    const updatedDate = Date.parse(dateValues[0] + '01,' + dateValues[1]);
    const currentDayInMilli = new Date(updatedDate);
    currentDayInMilli.setMonth(currentDayInMilli.getMonth() + 1);
    setCurrentDate(currentDayInMilli);
  };
  useEffect(() => {
    dispatch(AllStandards(GetAllStandardsBody));
  }, []);
  useEffect(() => {
    dispatch(GetMonthList(GetAllMonth));
  }, []);
  useEffect(() => {
    dispatch(AcadamicYear(GetAcadamicYear));
  }, []);

  useEffect(() => {
    dispatch(alleventyearlist(IGetAllYearEvents));
  }, [AllMonth, AllStandard]);

  const IGetAllYearEvents: IGetAllEventsBody = {
    asSchoolId: Number(asSchoolId),
    asAcademicYearId: 54,
    asMonthId: AllMonth == '0' ? null : Number(AllMonth),
    asStandardId: AllStandard == '0' ? null : Number(AllStandard)
  };

  const GetAllStandardsBody: IGetAllStandardsBody = {
    asSchoolId: 18,
    asAcademicYearId: 54
  };
  const GetAllMonth: IGetAllMonthsDropDownBody = {
    asSchoolId: 18
  };
  const GetAcadamicYear: IGetAcadamicYearDropDownBody = {
    asSchoolId: 18,
    asUserId: 3584,
    asUserRoleId: 2
  };

  const body: IEventList = {
    asMonth: assignedMonth_num,
    asAcademicYearId: asAcademicYearId,
    asSchoolId: asSchoolId,
    asYear: assignedYear,
    asUserId: UserId
  };

  const StartDate = new Date(
    moment(sessionStorage.getItem('StartDate')).format('YYYY-MM')
  );
  const EndDate = new Date(
    moment(sessionStorage.getItem('EndDate')).format('YYYY-MM')
  );
  const selectedDateList =
    typeof date.selectedDate === 'string'
      ? date.selectedDate.split(' ')
      : date.selectedDate;
  const formatSelectedDate = Array.isArray(selectedDateList)
    ? Date.parse(selectedDateList[0] + '01,' + selectedDateList[1])
    : date.selectedDate;
  const date1 = new Date(moment(formatSelectedDate).format('YYYY-MM'));
  const onUpcomingEvent = () => {
    navigate('UpcomingEvent');
  };
  const clickAddAnnual = () => {
    navigate('/extended-sidebar/teacher/AddAnnualPlaner');
  };
  const clickStandardDropdown = (value) => {
    setAllStandard(value);
  };
  const clickMonthDropdown = (value) => {
    setAllMonth(value);
  };
  const clickAcadamicDropdown = (value) => {
    setAllAcadamicYear(value);
  };
  return (
    <>
      {RoleId === '3' ? (
        <UpcomingEvent />
      ) : (
        <>
          <Container sx={{ mt: 4 }} maxWidth={'xl'}>
            <Stack
              direction={'row'}
              alignItems={'center'}
              justifyContent={'space-between'}
            >
              <Box>
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
                      <ApiTwoToneIcon color="primary" />
                    </IconButton>
                  </Link>{' '}
                  <Typography
                    variant={'h3'}
                    fontSize={'23px'}
                    color="text.primary"
                  >
                    Annual Planner
                  </Typography>
                </Breadcrumbs>
              </Box>
              <Stack direction={'row'} alignItems={'center'} gap={1}>
                <Box>
                  <Tooltip title={Note}>
                    <IconButton
                      sx={{
                        color: 'white',
                        backgroundColor: grey[500],
                        '&:hover': {
                          backgroundColor: grey[700]
                        }
                      }}
                    >
                      <PriorityHighIcon />
                    </IconButton>
                  </Tooltip>
                </Box>
                <Box>
                  <Tooltip title={'Help'}>
                    <IconButton
                      sx={{
                        color: 'white',
                        backgroundColor: grey[500],
                        '&:hover': {
                          backgroundColor: grey[700]
                        }
                      }}
                    >
                      <QuestionMarkIcon />
                    </IconButton>
                  </Tooltip>
                </Box>
                <Box>
                  <Tooltip title={'Events Overview'}>
                    <IconButton
                      sx={{
                        color: 'white',
                        backgroundColor: grey[500],
                        '&:hover': {
                          backgroundColor: grey[700]
                        }
                      }}
                      onClick={() => {
                        navigate('/extended-sidebar/Common/EventOverview');
                      }}
                    >
                      <CalendarMonthIcon />
                    </IconButton>
                  </Tooltip>
                </Box>
                <Box>
                  <Tooltip title={'Add Annual Planner'}>
                    <IconButton
                      sx={{
                        color: 'white',
                        backgroundColor: grey[500],
                        '&:hover': {
                          backgroundColor: grey[700]
                        }
                      }}
                      onClick={() => {
                        setOpenAnnualPlannerDialog(true);
                      }}
                    >
                      <AddIcon />
                    </IconButton>
                  </Tooltip>
                </Box>
              </Stack>
            </Stack>
            {/* <button onClick={clickAddAnnual}>Add Annual Planner</button>
            <Box sx={{ float: 'right' }}>
              <Icon1 Note={Note} />
            </Box>

            <MonthSelector
              date={date.selectedDate}
              PrevDate={getPreviousDate}
              NextDate={getNextDate}
              Close={undefined}
            />
            {loading ? (
              <SuspenseLoader />
            ) : (
              <>
                {StartDate.getTime() <= date1.getTime() &&
                EndDate.getTime() >= date1.getTime() ? (
                  <>
                    <List1 items={eventList}></List1>
                  </>
                ) : (
                  <ErrorMessages
                    Error={'Selected date is outside academic year'}
                  />
                )}
              </>
            )} */}
            <Box mt={1.5} sx={{ backgroundColor: 'white' }}>
              <AnnualPlannerCalendar
                ItemList={CalendarForStudent}
                ClickItem={() => {}}
                handlePrevMonth={() => {}}
                handleNextMonth={() => {}}
                formattedDate={formattedDate}
                DefaultValue={''}
                ArrayList={HeaderPublish}
              />
            </Box>
          </Container>
        </>
      )}
      {openAnnualPlannerDialog && (
        <Dialog
          open={openAnnualPlannerDialog}
          onClose={() => setOpenAnnualPlannerDialog(false)}
          maxWidth={'sm'}
          fullWidth
        >
          <DialogTitle
            sx={{
              py: 1,
              backgroundColor: (theme) => theme.colors.primary.main
            }}
          ></DialogTitle>
          <DialogContent dividers>
            <Box>
              <Typography variant={'h3'}>Upload Annual Planner</Typography>
              <Box sx={{ mt: 2 }}>
                {/* while file is not selected */}
                {!annualPlannerFile && (
                  <Button
                    variant={'outlined'}
                    color={'primary'}
                    sx={{ width: '100%', py: 3, border: '2px dashed' }}
                    startIcon={<BackupIcon />}
                  >
                    Click to Upload
                    <VisuallyHiddenInput
                      type="file"
                      onChange={(event) => {
                        setAnnualPlannerFile(event.target.files[0]);
                      }}
                    />
                  </Button>
                )}
                {/* while file is selected */}
                {annualPlannerFile && (
                  <Box
                    sx={{
                      width: '100%',
                      border: (theme) =>
                        `2px dashed ${theme.colors.primary.main}`,
                      display: 'flex',
                      alignItems: 'center',
                      fontSize: '18px',
                      gap: 2,
                      p: 1
                    }}
                  >
                    <CheckCircleIcon />
                    {annualPlannerFile?.name}
                    <IconButton
                      color={'error'}
                      onClick={() => {
                        setAnnualPlannerFile(null);
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                )}
              </Box>
            </Box>
          </DialogContent>
          <DialogActions sx={{ py: 2, px: 3 }}>
            <Button
              onClick={() => {
                setOpenAnnualPlannerDialog(false);
              }}
              color={'error'}
            >
              Cancel
            </Button>
            <Button onClick={() => {}} color={'primary'} variant={'contained'}>
              Save
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </>
  );
}

export default AnnualPlanner;
