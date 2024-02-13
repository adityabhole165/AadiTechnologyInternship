import { Box, Card, Container, Grid, Typography } from '@mui/material';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import {
  IEventList,
  IGetAcadamicYearDropDownBody,
  IGetAllEventsBody,
  IGetAllMonthsDropDownBody,
  IGetAllStandardsBody
} from 'src/interfaces/Common/AnnualPlanner';
import SuspenseLoader from 'src/layouts/components/SuspenseLoader';
import ErrorMessages from 'src/libraries/ErrorMessages/ErrorMessages';
import MonthSelector from 'src/libraries/buttons/MonthSelector';
import Dropdown from 'src/libraries/dropdown/Dropdown';
import PageHeader from 'src/libraries/heading/PageHeader';
import Icon1 from 'src/libraries/icon/icon1';
import List1 from 'src/libraries/mainCard/List1';
import {
  AcadamicYear,
  AllStandards,
  GetMonthList,
  alleventyearlist,
  getEventList
} from 'src/requests/AnnualPlanner/AnnualPlanner';
import { RootState } from 'src/store';
import UpcomingEvent from './UpcomingEvent';
function EventOverview() {
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

  const [date, setDate] = useState<any>({ selectedDate: null });
  const [assignedYear, setAssignedYear] = useState<any>();
  const [assignedMonth_num, SetassignedMonth_num] = useState<any>();

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
  }, []);

  
  const IGetAllYearEvents: IGetAllEventsBody = {
    asSchoolId: Number(asSchoolId),
    asAcademicYearId: 54,
    asMonthId:null,
    asStandardId: null
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
    alert(value)
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
          <Container>
            <PageHeader heading={'Annual Planner'} subheading={''} />
            {/* <button onClick={clickAddAnnual}>Add Annual Planner</button> */}
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
            )}
          </Container>
        </>
      )}
      <br></br>
      <Grid container spacing={2}>
        <Grid item xs={1}>
          <Card sx={{ backgroundColor: '#BEDAE3' }}>
            <Typography component={Box} p={0.5}>
              Standard :
            </Typography>
          </Card>
        </Grid>

        <Grid item xs={2}>
          <Dropdown
            Array={USAllStandards}
            handleChange={clickStandardDropdown}
            defaultValue={AllStandard}
          />
        </Grid>

        <Grid item xs={1}>
          <Card sx={{ backgroundColor: '#BEDAE3' }}>
            <Typography component={Box} p={0.5}>
              Month(s) :
            </Typography>
          </Card>
        </Grid>

        <Grid item xs={2}>
          <Dropdown
            Array={SelectMonthList}
            handleChange={clickMonthDropdown}
            defaultValue={AllMonth}
          />
        </Grid>

        <Grid item xs={1}>
          <Card sx={{ backgroundColor: '#BEDAE3' }}>
            <Typography component={Box} p={0.5}>
              AcadmicYear :
            </Typography>
          </Card>
        </Grid>
        <Grid item xs={2}>
          <Dropdown
            Array={SelectAcadamicYear}
            handleChange={clickAcadamicDropdown}
            defaultValue={AllAcadamicYear}
          />
        </Grid>
      </Grid>
      {/* <h1>dddddddd</h1> */}
      <List1 items={AllYearEventlist}></List1>
    </>
  );
}

export default EventOverview;
