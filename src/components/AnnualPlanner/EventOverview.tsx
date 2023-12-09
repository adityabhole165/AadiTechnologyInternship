import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getEventList } from 'src/requests/AnnualPlanner/AnnualPlanner';
import { IEventList } from 'src/interfaces/Common/AnnualPlanner';
import { RootState } from 'src/store';
import PageHeader from 'src/libraries/heading/PageHeader';
import MonthSelector from 'src/libraries/buttons/MonthSelector';
import ErrorMessages from 'src/libraries/ErrorMessages/ErrorMessages';
import moment from 'moment';
import List1 from 'src/libraries/mainCard/List1';
import { Box, Button, Container, Grid, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import SuspenseLoader from 'src/layouts/components/SuspenseLoader';
import { useNavigate } from 'react-router-dom';
import UpcomingEvent from './UpcomingEvent';
import Icon1 from 'src/libraries/icon/icon1';
import { IGetAssociatedStdLstForTeacherDropDownBody, IGetAllDivisionsForStandardDropDownBody, IGetAllMonthsDropDownBody, IGetYearsForAnnualPalannerDropDownBody, IGetEventsDataListBody } from "src/interfaces/AddAnnualPlanner/IAnnualPlanerBaseScreen";
import { GetStandardList, GetDivisionList, GetMonthList, GetYearList, CDAGetEventsDataList } from 'src/requests/AddAnnualPlanner/ReqAnnualPlanerBaseScreen'
import Dropdown from 'src/libraries/dropdown/Dropdown';
import CardCalender from 'src/libraries/ResuableComponents/CardCalender';
import Note from 'src/libraries/Note/Note';
import AnnualPlanerLegend from 'src/libraries/summary/AnnualPlanerLegend';

function EventOverview() {
  const navigate = useNavigate();
  const { DateFrommon, DateFromyear } = useParams();
  const BackMonth = new Date(Number(DateFromyear), Number(DateFrommon)).getMonth();

  const dispatch = useDispatch();
  const eventList = useSelector(
    (state: RootState) => state.AnnualPlanner.EventList
  );

  const loading = useSelector(
    (state: RootState) => state.AnnualPlanner.Loading
  );


  const SelectStandardList: any = useSelector((state: RootState) => state.AnnualPlanerBaseScreen.ISSelectStandardList);
  const SelectDivisionList: any = useSelector((state: RootState) => state.AnnualPlanerBaseScreen.ISSelectDivisionList);
  const SelectMonthList: any = useSelector((state: RootState) => state.AnnualPlanerBaseScreen.ISSelectMonthList);
  const SelectYearList: any = useSelector((state: RootState) => state.AnnualPlanerBaseScreen.ISSelectYearList);
  const USGetEventsDataList: any = useSelector((state: RootState) => state.AnnualPlanerBaseScreen.ISEventsDataList);
  
  const currentYear = new Date().getFullYear().toString();
  const currentMonth = (new Date().getMonth() + 1).toString();
  const asAcademicYearId = sessionStorage.getItem('AcademicYearId');
  const asSchoolId = localStorage.getItem('localSchoolId');
  const UserId = sessionStorage.getItem('Id');
  const RoleId = sessionStorage.getItem('RoleId')
  const [date, setDate] = useState<any>({ selectedDate: null });

  //const[selectedDate,SetselectedDate]= useState<any>();

  const [assignedYear, setAssignedYear] = useState<any>();
  const [assignedMonth_num, SetassignedMonth_num] = useState<any>();
  const [selectStandard, setSelectStandard] = useState('')
  const [selectDivision, setSelectDivision] = useState('')
  const [selectMonth, setSelectMonth] = useState(currentMonth)
  const [selectYear, setSelectYear] = useState(currentYear)
 

  
  const PageNote = ['These events may change due to unavoidable reasons without prior notice'];
  const HeaderPublish = [
    { Id: 1, Header: "Sunday" }, { Id: 2, Header: "Monday" }, { Id: 3, Header: "Tuesday" }
    , { Id: 4, Header: "Wednesday" }
    , { Id: 5, Header: "Thursday" },
    { Id: 6, Header: "Friday" },
    { Id: 7, Header: "Saturday" },

  ]

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
      dispatch(getEventList(body));
    }
  }, [assignedMonth_num]);

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

  const GetAssociatedStdLstForTeacherBody: IGetAssociatedStdLstForTeacherDropDownBody =
  {

    asSchoolId: Number(asSchoolId),
    asAcademicYearId: Number(asAcademicYearId),
    asUserId: Number(UserId)
  };


  const GetAllMonthsDropBody: IGetAllMonthsDropDownBody =
  {
    asSchoolId: Number(asSchoolId),
  };

  const GetYearsForAnnualPalannerBody: IGetYearsForAnnualPalannerDropDownBody =
  {

    asSchoolId: Number(asSchoolId),
  };

  const AllDivisionsForStandardBody: IGetAllDivisionsForStandardDropDownBody =
  {
    asSchoolId: Number(asSchoolId),
    asAcademicYearId: Number(asAcademicYearId),
    "asStandardId": 1062,
  }
  const GetEventsDataListBody: IGetEventsDataListBody =
  {

    asSchoolId: Number(asSchoolId),
    asAcademicYearId: Number(asAcademicYearId),
    asMonthId: Number(selectMonth),
    asYear: Number(selectYear),
    asStandardId: Number(selectStandard),
    asDivisionId: Number(selectDivision)
  };


  useEffect(() => {
    dispatch(GetStandardList(GetAssociatedStdLstForTeacherBody));
    dispatch(GetDivisionList(AllDivisionsForStandardBody));
    dispatch(GetMonthList(GetAllMonthsDropBody));
    dispatch(GetYearList(GetYearsForAnnualPalannerBody));
    //dispatch(CDAAssociatedStandards(AssociatedStandardsBody));

    
  }, []);


 


  useEffect(() => {

    if (selectStandard != '' &&
      selectDivision != '' &&
      selectMonth != '' && selectYear != ''&& date!='')
      dispatch(CDAGetEventsDataList(GetEventsDataListBody))

  }, [selectStandard, selectDivision, selectMonth, selectYear  ,date]);


  useEffect(() => {
    if (SelectStandardList.length > 0 &&
      SelectDivisionList.length > 0) {
      setSelectStandard(SelectStandardList[0].Value)
      setSelectDivision(SelectDivisionList[0].Value)
    }
  }, [SelectStandardList, SelectDivisionList]);


  const clickStandardDropdown = (value) => {
    setSelectStandard(value)
  }
  const clickdivisionDropdown = (value) => {
    setSelectDivision(value)
  }
  const clicMonthDropdown = (value) => {
    setSelectMonth(value)
  }
  const clicYearDropdown = (value) => {
    setSelectYear(value)
  }

  const ClickOpenDialogbox = (value) => {
    
  }

  
  const ClickClickOpenDialogbox = (value) => {
    
  }

  
  

  const ClickItemList = (value) => {
 
    const date = value || new Date();
    const Month = new Date(date).toLocaleString('default', { month: 'short' });
    const Month_num = new Date(date).getMonth();
    const Year = new Date(date).getFullYear()
    const NewDateFormat = `${Month} ${Year}`;
    
    setDate({
     selectedDate:NewDateFormat
    });
  setSelectMonth(Month_num.toString())
  setSelectYear(Year.toString())

  }

  // const ClickGetMonth = (value) => {
   
  //   setDate({
  //    selectedDate:getMonthFormatted(new Date())
  //   });
  // }

  const StartDate = new Date(
    moment(sessionStorage.getItem('StartDate')).format('YYYY-MM')
  );
  const EndDate = new Date(
    moment(sessionStorage.getItem('EndDate')).format('YYYY-MM')
  );
  const selectedDateList = ((typeof date.selectedDate === 'string') ? date.selectedDate.split(" ") : date.selectedDate)
  const formatSelectedDate = ((Array.isArray(selectedDateList)) ? Date.parse(selectedDateList[0] + "01," + selectedDateList[1]) : date.selectedDate)
  const date1 = new Date(moment(formatSelectedDate).format('YYYY-MM'));
  const onUpcomingEvent = () => {
    navigate('UpcomingEvent')
  }


  return (
    <>
      {RoleId === "3" ? <UpcomingEvent /> : <>
        <Container>

          <PageHeader heading={'Annual Planner'} subheading={''} />
          <Box sx={{ float: "right" }}>

          </Box>
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

                  <List1 items={eventList}></List1>

                </>) :
                <ErrorMessages Error={'Selected date is outside academic year'} />
              }
            </>)
          }
        </Container>

        <Button variant="outlined" onClick={ClickOpenDialogbox} style={{ marginLeft: 'auto' }}>
  Add Annual Planner
</Button>

<Button variant="outlined" onClick={ClickClickOpenDialogbox} style={{ marginLeft: 'auto' }}>
  EventOverview
</Button>
        <Grid container>
          <Grid item xs={12}>
            <h4>Legends</h4>
            <Box sx={{ display: 'flex', gap: '20px' }}>
              <AnnualPlanerLegend color='Holiday' text='Holidays' />
              <AnnualPlanerLegend color='Exam' text='Exams' />
              <AnnualPlanerLegend color='Events' text='Events' />
            </Box>
          </Grid>
        </Grid>

        <Grid container spacing={2}>
          <Grid item xs={1}>
            <Typography component={Box} sx={{ border: "1px solid black" }} p={0.5}>Select Std :</Typography>
          </Grid>
          <Grid item xs={2}>
            <Dropdown Array={SelectStandardList} handleChange={clickStandardDropdown} defaultValue={selectStandard} />
          </Grid>
          <Grid item xs={1}>
            <Typography component={Box} sx={{ border: "1px solid black" }} p={0.5}>Select Div :</Typography>
          </Grid>
          <Grid item xs={2}>
            <Dropdown Array={SelectDivisionList} handleChange={clickdivisionDropdown} defaultValue={selectDivision} label={"Select Division"} />
          </Grid>
          <Grid item xs={1}>
            <Typography component={Box} sx={{ border: "1px solid black" }} p={0.5}>Select Month :</Typography>

          </Grid>
          <Grid item xs={2}>
            <Dropdown Array={SelectMonthList} handleChange={clicMonthDropdown} defaultValue={selectMonth} label={"Select Month"} />
          </Grid>
          <Grid item xs={1}>

            <Typography component={Box} sx={{ border: "1px solid black" }} p={0.5}>Select Year :</Typography>

          </Grid>
          <Grid item xs={2}>
            <Dropdown Array={SelectYearList} handleChange={clicYearDropdown} defaultValue={selectYear} label={"Select Year"} />
          </Grid>
        </Grid>
        <br></br>

        <CardCalender ItemList={USGetEventsDataList} ClickItem={ClickItemList}
          formattedDate={date.selectedDate} DefaultValue ArrayList={HeaderPublish} />
        <Note NoteDetail={PageNote} />

  

      </>
      }
    </>
  );
}

export default EventOverview;
