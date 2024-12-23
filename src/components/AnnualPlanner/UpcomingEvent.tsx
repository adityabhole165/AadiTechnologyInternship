import {
  Box,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Typography
} from '@mui/material';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import IGetEventsInMonth, {
  IEventList
} from 'src/interfaces/Common/AnnualPlanner';
import SuspenseLoader from 'src/layouts/components/SuspenseLoader';
import ErrorMessages from 'src/libraries/ErrorMessages/ErrorMessages';
import MonthSelector from 'src/libraries/buttons/MonthSelector';
import PageHeader from 'src/libraries/heading/PageHeader';
import Icon1 from 'src/libraries/icon/icon1';
import List1 from 'src/libraries/mainCard/List1';
import {
  getEvents,
  getFilePath
} from 'src/requests/AnnualPlanner/AnnualPlanner';
import { RootState } from 'src/store';
import { decodeURL } from '../Common/Util';
function UpcomingEvent() {
  const navigate = useNavigate();
  let {
    DateFrommon,
    DateFromyear,
    Pholiday,
    Pevent,
    Pexam
  } = useParams();

  // Decode in-place
  DateFrommon = decodeURL(DateFrommon);
  DateFromyear = decodeURL(DateFromyear);
  Pholiday = decodeURL(Pholiday);
  Pevent = decodeURL(Pevent);
  Pexam = decodeURL(Pexam);


  const BackMonth = new Date(
    Number(DateFromyear),
    Number(DateFrommon)
  ).getMonth();

  const dispatch = useDispatch();
  const eventList = useSelector(
    (state: RootState) => state.AnnualPlanner.EventList
  );

  const eventListInMoth = useSelector(
    (state: RootState) => state.AnnualPlanner.Event
  );

  const loading = useSelector(
    (state: RootState) => state.AnnualPlanner.Loading
  );
  const FileName: any = useSelector(
    (state: RootState) => state.AnnualPlanner.FilePath
  );
  console.log(FileName, 'FileName111');

  const Note: string =
    'These events may change due to unavoidable reasons without prior notice.';

  const asAcademicYearId = sessionStorage.getItem('AcademicYearId');
  const asSchoolId = localStorage.getItem('localSchoolId');
  const UserId = sessionStorage.getItem('Id');

  const [date, setDate] = useState<any>({ selectedDate: null });
  const [assignedYear, setAssignedYear] = useState<any>();
  const [assignedMonth_num, SetassignedMonth_num] = useState<any>();
  const [holiday, setHoliday] = useState(false);
  const [event, setEvent] = useState(true);
  const [exam, setExam] = useState(false);

  const GetEventsInMonthBody: IGetEventsInMonth = {
    asSchoolId: asSchoolId,
    asAcademicYearId: asAcademicYearId,
    asMonth: assignedMonth_num,
    asYear: assignedYear,
    asUserId: UserId,
    abIncludeEvents: event.toString(),
    abIncludeHolidays: holiday.toString(),
    abIncludeExams: exam.toString()
  };

  function setCurrentDate(newDate?: Date) {
    const date = newDate || new Date();
    const Month = new Date(date).toLocaleString('default', { month: 'short' });
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
    if (Pholiday !== undefined) {
      setHoliday(Pholiday === 'false' ? false : true);
      setEvent(Pevent === 'false' ? false : true);
      setExam(Pexam === 'false' ? false : true);
    }
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
      dispatch(getEvents(GetEventsInMonthBody));
    }
  }, [assignedMonth_num, event]);

  useEffect(() => {
    if (assignedMonth_num !== undefined) {
      dispatch(getEvents(GetEventsInMonthBody));
    }
  }, [assignedMonth_num, holiday]);

  useEffect(() => {
    if (assignedMonth_num !== undefined) {
      dispatch(getEvents(GetEventsInMonthBody));
    }
  }, [assignedMonth_num, exam]);

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

  const FilepathBody = {
    aiSchoolId: asSchoolId,
    aiAcademicYearId: asAcademicYearId
  };

  useEffect(() => {
    dispatch(getFilePath(FilepathBody));
  }, []);

  const clickFileName = () => {
    if (FileName !== '') {
      window.open(localStorage.getItem('SiteURL') + FileName);
    }
  };

  return (
    <Box sx={{ px: 2 }}>
      <PageHeader heading={'Annual Planner'} subheading={''} />

      {FileName !== '' && (
        <div>
          <Typography
            component="span"
            sx={{ color: 'brown', textDecoration: 'underline' }}
            onClick={clickFileName}
          >
            Annual Planner
          </Typography>
          <br />
        </div>
      )}

      <br />
      <FormGroup sx={{ display: 'inline' }}>
        <FormControlLabel
          control={
            <Checkbox
              checked={event}
              onChange={(e) => setEvent(e.target.checked)}
              sx={{
                color: '#757575',
                '&.Mui-checked': {
                  color: '#aeeded'
                },
                borderColor: 'black'
              }}
              size="small"
            />
          }
          label="Event"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={holiday}
              onChange={(e) => setHoliday(e.target.checked)}
              sx={{
                color: '#757575',
                '&.Mui-checked': {
                  color: '#ffcdd2'
                },
                borderColor: 'black'
              }}
              size="small"
            />
          }
          label="Holiday"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={exam}
              onChange={(e) => setExam(e.target.checked)}
              sx={{
                color: '#757575',
                '&.Mui-checked': {
                  color: '#d8eb88'
                },
                borderColor: 'black'
              }}
              size="small"
            />
          }
          label="Exam"
        />
        <Box sx={{ float: 'right', mt: '10px' }}>
          <Icon1 Note={Note} />
        </Box>
      </FormGroup>
      <br></br>
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
              <List1
                items={eventListInMoth}
                linkParams={
                  '/' +
                  assignedMonth_num +
                  '/' +
                  assignedYear +
                  '/' +
                  holiday +
                  '/' +
                  event +
                  '/' +
                  exam
                }
              ></List1>
            </>
          ) : (
            <ErrorMessages Error={'Selected date is outside academic year'} />
          )}
        </>
      )}
    </Box>
  );
}

export default UpcomingEvent;
