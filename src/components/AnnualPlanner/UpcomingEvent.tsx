import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getEventList, getEvents } from 'src/requests/AnnualPlanner/AnnualPlanner';
import IGetEventsInMonth, { IEventList } from 'src/interfaces/Common/AnnualPlanner';
import { RootState } from 'src/store';
import PageHeader from 'src/libraries/heading/PageHeader';
import MonthSelector from 'src/libraries/buttons/MonthSelector';
import ErrorMessages from 'src/libraries/ErrorMessages/ErrorMessages';
import moment from 'moment';
import List1 from 'src/libraries/mainCard/List1';
import { Container, ToggleButtonGroup, ToggleButton, Checkbox, FormGroup, FormControlLabel } from '@mui/material';
import { useParams } from 'react-router-dom';
import SuspenseLoader from 'src/layouts/components/SuspenseLoader';
import { ButtonPrimary } from 'src/libraries/styled/ButtonStyle';
import { useNavigate } from 'react-router-dom';
import Table1 from 'src/libraries/TableFormat/Table1';
import UpcomingEvents from '../Student/Dashboard/UpcomingEvents';
import CheckboxImg from 'src/libraries/card/CheckboxImg';
function UpcomingEvent() {
  const navigate = useNavigate();
  const { DateFrommon, DateFromyear } = useParams();

  const BackMonth = new Date(Number(DateFromyear), Number(DateFrommon)).getMonth();

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

  const asAcademicYearId = sessionStorage.getItem('AcademicYearId');
  const asSchoolId = localStorage.getItem('localSchoolId');
  const UserId = sessionStorage.getItem('Id');

  const [date, setDate] = useState<any>({ selectedDate: null });
  const [assignedYear, setAssignedYear] = useState<any>();
  const [assignedMonth_num, SetassignedMonth_num] = useState<any>();
  const[holiday,setHoliday] = useState(false)
  const[event,setEvent] = useState(true)
  const[exam,setExam] = useState(false)

  const GetEventsInMonthBody: IGetEventsInMonth = {
    asSchoolId:asSchoolId,
    asAcademicYearId: asAcademicYearId,
    asMonth: assignedMonth_num,
    asYear: assignedYear,
    asUserId: UserId,
    abIncludeEvents: event.toString(),
    abIncludeHolidays: holiday.toString(),
    abIncludeExams: exam.toString()
  }
   
  function setCurrentDate(newDate?: Date) {
    const date = newDate || new Date();
    const Month = new Date(date).toLocaleString('default', { month: 'short' });
    const Month_num = new Date(date).getMonth();
    const Year = new Date(date).getFullYear()
    const NewDateFormat = `${Month} ${Year}`;
    setDate({
      selectedDate: NewDateFormat
    });
    SetassignedMonth_num(BackMonth)
    setAssignedYear(DateFromyear)
    setAssignedYear(Year);
    SetassignedMonth_num(Month_num + 1);
  }

  useEffect(() => {
    localStorage.setItem("url", window.location.pathname)
    setCurrentDate();
    if (DateFrommon != undefined) {
      setDate({
        selectedDate: `${new Date(BackMonth + '/01/' + DateFromyear).toLocaleString('default', { month: 'short' })} ${DateFromyear}`
      });
    }
  }, []);

  useEffect(() => {
    if (DateFrommon || DateFromyear != undefined) {
      SetassignedMonth_num(DateFrommon);
      setAssignedYear(DateFromyear)
    }
  }, [DateFrommon, DateFromyear]);

  useEffect(() => {
   if (assignedMonth_num !== undefined) {
      dispatch(getEvents(GetEventsInMonthBody));
    }
  }, [assignedMonth_num , event]);
  
  useEffect(() => {
    if (assignedMonth_num !== undefined) {
      dispatch(getEvents(GetEventsInMonthBody));
    }
  }, [assignedMonth_num , holiday]);

  useEffect(() => {
    if (assignedMonth_num !== undefined) {
      dispatch(getEvents(GetEventsInMonthBody));
    }
  }, [assignedMonth_num , exam]);

  const getPreviousDate = () => {
    const { selectedDate } = date;
    const dateValues = selectedDate.includes('-') ? selectedDate.split("-") : selectedDate.split(" ");
    const updatedDate = Date.parse(dateValues[0] + "01," + dateValues[1])
    const currentDayInMilli = new Date(updatedDate);
    currentDayInMilli.setMonth(currentDayInMilli.getMonth() - 1);
    setCurrentDate(currentDayInMilli);
  };

  const getNextDate = () => {
    const { selectedDate } = date;
    const dateValues = selectedDate.includes('-') ? selectedDate.split("-") : selectedDate.split(" ");
    const updatedDate = Date.parse(dateValues[0] + "01," + dateValues[1])
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
  const selectedDateList = ((typeof date.selectedDate === 'string') ? date.selectedDate.split(" ") : date.selectedDate)
  const formatSelectedDate = ((Array.isArray(selectedDateList)) ? Date.parse(selectedDateList[0] + "01," + selectedDateList[1]) : date.selectedDate)
  const date1 = new Date(moment(formatSelectedDate).format('YYYY-MM'));
 
  return (
    <>
    <PageHeader heading={'Annual Planner'} subheading={''} />
     <FormGroup sx={{display:"inline"}}>
    <FormControlLabel control={<Checkbox  checked={holiday}   onChange={(e)=> setHoliday(e.target.checked)}/>} label="Holiday" />
     <FormControlLabel control={<Checkbox  checked={event}   onChange={(e)=> setEvent(e.target.checked)}/>} label="Event" />
     <FormControlLabel control={<Checkbox  checked={exam}   onChange={(e)=> setExam(e.target.checked)}/>} label="Exam" />
    </FormGroup>
      <br></br>  
      <MonthSelector
        date={date.selectedDate}
        PrevDate={getPreviousDate}
        NextDate={getNextDate}
        Close={undefined}
      />
      {loading ?
        <SuspenseLoader />
        :
        (<>
          {StartDate.getTime() <= date1.getTime() && EndDate.getTime() >= date1.getTime() ?
            (<>

              <List1 items={eventListInMoth}></List1>

            </>) :
            <ErrorMessages Error={'Selected date is outside academic year'} />
          }
        </>)
      }

    </>
  );
}

export default UpcomingEvent;
