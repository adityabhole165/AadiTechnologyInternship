import AddIcon from '@mui/icons-material/Add';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import VisibilityTwoToneIcon from '@mui/icons-material/VisibilityTwoTone';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormLabel,
  IconButton,
  Tooltip,
  Typography,
  styled
} from '@mui/material';
import { green, grey, red } from '@mui/material/colors';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import { toast } from 'react-toastify';
import {
  IAddAnnualPlannerBody,
  IDeleteFileDetailsBody,
  IGetFileDetailsBody
} from 'src/interfaces/AddAnnualPlanner/IAddAnnualPlanner';
import {
  IGetAllDivisionsForStandardDropDownBody,
  IGetEventsDataListBody,
  IGetYearsForAnnualPalannerDropDownBody
} from 'src/interfaces/AddAnnualPlanner/IAnnualPlanerBaseScreen';
import {
  IEventList,
  IGetAllMonthsDropDownBody
} from 'src/interfaces/Common/AnnualPlanner';
import SingleFile from 'src/libraries/File/SingleFile';
import AnnualPlannerCalendar from 'src/libraries/ResuableComponents/AnnualPlannerCalendar';
import {
  CDAGetEventsDataList,
  GetDivisionList,
  GetYearList
} from 'src/requests/AddAnnualPlanner/ReqAnnualPlanerBaseScreen';
import {
  DeleteFile,
  GetFile,
  addanual
} from 'src/requests/AddAnnualPlanner/RequestAddAnnualPlanner';
import {
  GetMonthList,
  getEventList
} from 'src/requests/AnnualPlanner/AnnualPlanner';
import { RootState } from 'src/store';
import CommonPageHeader from '../CommonPageHeader';
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

  const currentYear = new Date().getFullYear().toString();
  const currentMonth = (new Date().getMonth() + 1).toString();
  const asAcademicYearId = sessionStorage.getItem('AcademicYearId');
  const asUpdatedById = localStorage.getItem('Id');
  const asSchoolId = localStorage.getItem('localSchoolId');
  const UserId = sessionStorage.getItem('Id');
  const TeacherId = sessionStorage.getItem('TeacherId');
  const RoleId = sessionStorage.getItem('RoleId');
  const [selectStandard, setSelectStandard] = useState('');
  const [selectDivision, setSelectDivision] = useState('');
  const [selectMonth, setSelectMonth] = useState(currentMonth);
  const [selectYear, setSelectYear] = useState(currentYear);
  const ValidFileTypes = ['PDF', 'JPG', 'PNG', 'BMP', 'JPEG'];
  const MaxfileSize = 3000000;

  const [Open, setOpen] = useState(false);
  const [fileName, setFileName] = useState('');
  const [base64URL, setbase64URL] = useState('');
  const BackMonth = new Date(
    Number(DateFromyear),
    Number(DateFrommon)
  ).getMonth();

  const dispatch = useDispatch();
  const eventList = useSelector(
    (state: RootState) => state.AnnualPlanner.EventList
  );

  const loading = useSelector(
    (state: RootState) => state.AnnualPlanner.Loading
  );
  const SelectStandardList: any = useSelector(
    (state: RootState) => state.AnnualPlanerBaseScreen.ISSelectStandardList
  );
  const SelectDivisionList: any = useSelector(
    (state: RootState) => state.AnnualPlanerBaseScreen.ISSelectDivisionList
  );
  const SelectMonthList: any = useSelector(
    (state: RootState) => state.AnnualPlanerBaseScreen.ISSelectMonthList
  );
  const SelectYearList: any = useSelector(
    (state: RootState) => state.AnnualPlanerBaseScreen.ISSelectYearList
  );
  const AddAnnualPlanner: any = useSelector(
    (state: RootState) => state.AddPlanner.AddAnnual
  );
  console.log(AddAnnualPlanner, 'AddAnnualPlanner');

  const FileDetails: any = useSelector(
    (state: RootState) => state.AddPlanner.getfile
  );
  const GetAllMonthsDropBody: IGetAllMonthsDropDownBody = {
    asSchoolId: Number(asSchoolId)
  };

  const GetYearsForAnnualPalannerBody: IGetYearsForAnnualPalannerDropDownBody =
  {
    asSchoolId: Number(asSchoolId)
  };

  const AllDivisionsForStandardBody: IGetAllDivisionsForStandardDropDownBody = {
    asSchoolId: Number(asSchoolId),
    asAcademicYearId: Number(asAcademicYearId),
    asStandardId: 1062
  };

  const USGetEventsDataList: any = useSelector(
    (state: RootState) => state.AnnualPlanerBaseScreen.ISEventsDataList
  );

  const GetEventsDataListBody: IGetEventsDataListBody = {
    asSchoolId: Number(asSchoolId),
    asAcademicYearId: Number(asAcademicYearId),
    asMonthId: Number(selectMonth),
    asYear: Number(selectYear),
    asStandardId: Number(selectStandard),
    asDivisionId: Number(selectDivision),
    asEventType: ''
  };

  const AnnualplannerBody: IAddAnnualPlannerBody = {
    asSchoolId: Number(asSchoolId),
    asAcademicYearId: Number(asAcademicYearId),
    asSaveFeature: 'Event Planner',
    asFileName: fileName,
    asFolderName: 'PPSN Website',
    asBase64String: base64URL,
    asUpdatedById: Number(asUpdatedById)
  };

  const GetFileDetailsBody: IGetFileDetailsBody = {
    asSchoolId: Number(asSchoolId),
    asAcademicYearId: Number(asAcademicYearId)
  };

  useEffect(() => {
    dispatch(CDAGetEventsDataList(GetEventsDataListBody));
  }, []);

  useEffect(() => {
    dispatch(GetDivisionList(AllDivisionsForStandardBody));
  }, []);
  useEffect(() => {
    dispatch(GetMonthList(GetAllMonthsDropBody));
  }, []);
  useEffect(() => {
    dispatch(GetYearList(GetYearsForAnnualPalannerBody));
  }, []);

  useEffect(() => {
    dispatch(GetFile(GetFileDetailsBody));
  }, []);
  useEffect(() => { }, [FileDetails]);
  const DeleteFileDetailsBody: IDeleteFileDetailsBody = {
    asSchoolId: Number(asSchoolId),
    asAcademicYearId: Number(asAcademicYearId),
    asUserId: Number(TeacherId)
  };

  // useEffect(() => {
  //   if (
  //     selectStandard != '' &&
  //     selectDivision != '' &&
  //     selectMonth != '' &&
  //     selectYear != '' &&
  //     date != ''
  //   )
  //     dispatch(CDAGetEventsDataList(GetEventsDataListBody));
  // }, [selectStandard, selectDivision, selectMonth, selectYear, date]);

  useEffect(() => {
    if (SelectStandardList.length > 0 && SelectDivisionList.length > 0) {
      setSelectStandard(SelectStandardList[0].Value);
      setSelectDivision(SelectDivisionList[0].Value);
    }
  }, [SelectStandardList, SelectDivisionList]);

  const clickStandardDropdown = (value) => {
    setSelectStandard(value);
  };

  const clickdivisionDropdown = (value) => {
    setSelectDivision(value);
  };
  const clicMonthDropdown = (value) => {
    setSelectMonth(value);
  };
  const clicYearDropdown = (value) => {
    setSelectYear(value);
  };

  const ChangeFile = (value) => {
    setFileName(value.Name);
    setbase64URL(value.Value);
    console.log('filevalue', value);
  };
  const clickFileName = () => {
    if (FileDetails !== '') {
      window.open(
        localStorage.getItem('SiteURL') +
        '/RITeSchool/DOWNLOADS/Event%20Planner/' +
        FileDetails[0].LinkUrl
      );
      // localStorage.getItemItem("SiteURL", window.location.pathname)
    }
  };
  const clickSubmit = () => {
    if (fileName.length !== 0 && base64URL.length !== 0) {
      dispatch(addanual(AnnualplannerBody));
      toast.success('File Uploaded Successfully', { toastId: 'success1' });
    }
  };

  const clickDelete = (Id) => {
    if (confirm('Are You Sure you want to delete The File')) {
      dispatch(DeleteFile(DeleteFileDetailsBody));
      toast.success('File Deleted Successfully', { toastId: 'success1' });
    }
  };

  const Note: string =
    'These events may change due to unavoidable reasons without prior notice.';

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

  return (
    <>
      {RoleId === '3' ? (
        <UpcomingEvent />
      ) : (
        <>
          <Box sx={{ px: 2 }} maxWidth={'xl'}>
            <CommonPageHeader
              navLinks={[
                {
                  title: 'Annual Planner',
                  path: '/extended-sidebar/landing/landing',
                },
                {
                  title: 'Event Overview',
                  path: '/extended-sidebar/Common/EventOverview',
                }
              ]}
              rightActions={
                <>
                  <Box>
                    <Tooltip title={Note}>
                      <IconButton
                        sx={{
                          color: 'white',
                          backgroundColor: grey[500],
                          '&:hover': {
                            backgroundColor: grey[600]
                          }
                        }}
                      >
                        <PriorityHighIcon />
                      </IconButton>
                    </Tooltip>
                  </Box>
                  <Box>
                    <Tooltip
                      title={
                        'Annual planner with detailed event description of your school'
                      }
                    >
                      <IconButton
                        sx={{
                          color: 'white',
                          backgroundColor: grey[500],
                          '&:hover': {
                            backgroundColor: grey[600]
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
                            backgroundColor: grey[600]
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
                            backgroundColor: grey[600]
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
                </>
              }
            />
            <Box sx={{ backgroundColor: 'white' }}>
              <AnnualPlannerCalendar
                ItemList={''}
                ClickItem={() => { }}
                handlePrevMonth={() => { }}
                handleNextMonth={() => { }}
                formattedDate={formattedDate}
                DefaultValue={''}
                ArrayList={HeaderPublish}
              />
            </Box>
          </Box>
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
              backgroundColor: (theme) => theme.colors.primary.main,
              color: (theme) => theme.palette.common.white
            }}
          ></DialogTitle>
          <DialogContent dividers>
            <Box>
              <Typography variant={'h3'}>Upload Annual Planner</Typography>
              <Box sx={{ mt: 2 }}>
                {/* while file is not selected */}
                <SingleFile
                  ValidFileTypes={ValidFileTypes}
                  MaxfileSize={MaxfileSize}
                  ChangeFile={ChangeFile}
                  errorMessage={''}
                  FilePath={clickFileName.toString()}
                  FileName={fileName}
                ></SingleFile>
                {/* while file is selected */}
                {AddAnnualPlanner && (
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
                    {AddAnnualPlanner?.name}
                    <IconButton
                      color={'error'}
                      onClick={() => {
                        setFileName(null);
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                    <IconButton color={'primary'}>
                      <VisibilityTwoToneIcon />
                    </IconButton>
                  </Box>
                )}
                <FormLabel>
                  Supports only .PDF, .PNG and .JPG file type. File size should
                  not exceed 2 MB.
                </FormLabel>
              </Box>
            </Box>
          </DialogContent>
          <DialogActions sx={{ py: 2, px: 3 }}>
            <Button 
            sx={{
              // backgroundColor: green[100],
              color: 'red',
              ':hover': { backgroundColor: red[100] }
          }}
              onClick={() => {
                setOpenAnnualPlannerDialog(false);
              }}
              // color={'error'}
            >
              Cancel
            </Button>
            
            <Button
              onClick={clickSubmit}
              // color={'primary'}
              // variant={'contained'}
              sx={{
                color:'green',
                //  backgroundColor: grey[500],
                '&:hover': {
                color:'green',
                backgroundColor: green[100]}
                                                
            }} 
            >
              Save
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </>
  );
}

export default AnnualPlanner;
