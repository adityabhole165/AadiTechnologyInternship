import {
  Box,
  Button,
  Card,
  Grid,
  Typography
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { IGetFileDetailsBody } from 'src/interfaces/AddAnnualPlanner/IAddAnnualPlanner';
import {
  IGetAllDivisionsForStandardDropDownBody,
  IGetAllMonthsDropDownBody,
  IGetAssociatedStandardsBodyP,
  IGetAssociatedStdLstForTeacherDropDownBody,
  IGetEventsDataListBody,
  IGetYearsForAnnualPalannerDropDownBody
} from 'src/interfaces/AddAnnualPlanner/IAnnualPlanerBaseScreen';
import { IEventList } from 'src/interfaces/Common/AnnualPlanner';
import CardCalenderAP from 'src/libraries/ResuableComponents/CardCalenderAP';
import Dropdown from 'src/libraries/dropdown/Dropdown';
import PageHeader from 'src/libraries/heading/PageHeader';
import Icon1 from 'src/libraries/icon/icon1';
import AnnualPlanerLegend from 'src/libraries/summary/AnnualPlanerLegend';
import {
  AssociatedStandardListP,
  CDAGetEventsDataList,
  GetDivisionList,
  GetMonthList,
  GetStandardList,
  GetYearList
} from 'src/requests/AddAnnualPlanner/ReqAnnualPlanerBaseScreen';
import { GetFile } from 'src/requests/AddAnnualPlanner/RequestAddAnnualPlanner';
import { getEventList } from 'src/requests/AnnualPlanner/AnnualPlanner';
import { RootState } from 'src/store';
import { decodeURL, encodeURL } from '../Common/Util';
import AddAnnualPlaner from './AddAnnualPlaner';

const AnnualPlanerBaseScreen = () => {
  const navigate = useNavigate();
  let {
    DateFrommon,
    DateFromyear
  } = useParams();

  // Decode in-place
  DateFrommon = decodeURL(DateFrommon);
  DateFromyear = decodeURL(DateFromyear);

  const BackMonth = new Date(
    Number(DateFromyear),
    Number(DateFrommon)
  ).getMonth();

  const dispatch = useDispatch();
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
  const USGetEventsDataList: any = useSelector(
    (state: RootState) => state.AnnualPlanerBaseScreen.ISEventsDataList
  );
  const GetAssociatedStandardListP: any = useSelector(
    (state: RootState) => state.AnnualPlanerBaseScreen.IGetAssociatedStandardsP
  );
  // console.log(GetAssociatedStandardListP, 'AssociatedStandardListPppp');

  const FileDetails: any = useSelector(
    (state: RootState) => state.AddPlanner.getfile
  );
  // console.log(FileDetails, 'FileDetailss');

  const currentYear = new Date().getFullYear().toString();
  const currentMonth = (new Date().getMonth() + 1).toString();
  const asAcademicYearId = sessionStorage.getItem('AcademicYearId');
  const asSchoolId = localStorage.getItem('localSchoolId');
  const UserId = sessionStorage.getItem('Id');
  const TeacherId = sessionStorage.getItem('TeacherId');
  const RoleId = sessionStorage.getItem('RoleId');
  const [date, setDate] = useState<any>({ selectedDate: null });

  //const[selectedDate,SetselectedDate]= useState<any>();

  const [assignedYear, setAssignedYear] = useState<any>();
  const [assignedMonth_num, SetassignedMonth_num] = useState<any>();
  const [selectStandard, setSelectStandard] = useState('');
  const [selectDivision, setSelectDivision] = useState('');
  const [selectMonth, setSelectMonth] = useState(currentMonth);
  const [selectYear, setSelectYear] = useState(currentYear);
  const [AssociatedStandardP, setAssociatedStandardP] = useState('0');

  const Note: string =
    'These events may change due to unavoidable reasons without prior notice';

  const HeaderPublish = [
    { Id: 1, Header: 'Sun' },
    { Id: 2, Header: 'Mon' },
    { Id: 3, Header: 'Tue' },
    { Id: 4, Header: 'Wed' },
    { Id: 5, Header: 'Thu' },
    { Id: 6, Header: 'Fri' },
    { Id: 7, Header: 'Sat' }
  ];
  const ScreensAccessPermission = JSON.parse(
    sessionStorage.getItem('ScreensAccessPermission')
  );

  // console.log('ScreensAccessPermission', ScreensAccessPermission);
  const GetScreenPermission = () => {
    let perm = 'N';
    ScreensAccessPermission.map((item) => {
      if (item.ScreenName === 'Annual Planner') perm = item.IsFullAccess;
    });
    return perm;
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
  useEffect(() => {
    dispatch(GetFile(GetFileDetailsBody));
  }, []);
  const GetFileDetailsBody: IGetFileDetailsBody = {
    asSchoolId: Number(asSchoolId),
    asAcademicYearId: Number(asAcademicYearId)
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
  const GetEventsDataListBody: IGetEventsDataListBody = {
    asSchoolId: Number(asSchoolId),
    asAcademicYearId: Number(asAcademicYearId),
    asMonthId: Number(selectMonth),
    asYear: Number(selectYear),
    asStandardId: Number(selectStandard),
    asDivisionId: Number(selectDivision),
    asEventType: ''
  };
  const AssociatesStandardP: IGetAssociatedStandardsBodyP = {
    asSchoolId: 18,
    asAcademicYearId: 54
  };
  useEffect(() => {
    dispatch(AssociatedStandardListP(AssociatesStandardP));
  }, []);

  useEffect(() => {
    dispatch(GetStandardList(GetAssociatedStdLstForTeacherBody));
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
    if (
      selectStandard != '' &&
      selectDivision != '' &&
      selectMonth != '' &&
      selectYear != '' &&
      date != ''
    )
      dispatch(CDAGetEventsDataList(GetEventsDataListBody));
  }, [selectStandard, selectDivision, selectMonth, selectYear, date]);

  useEffect(() => {
    if (SelectStandardList.length > 0 && SelectDivisionList.length > 0) {
      setSelectStandard(SelectStandardList[0].Value);
      setSelectDivision(SelectDivisionList[0].Value);
    }
  }, [SelectStandardList, SelectDivisionList]);

  const clickStandardDropdown = (value) => {
    setSelectStandard(value);
  };
  const clickStandardDropdownP = (value) => {
    setAssociatedStandardP(value);
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

  const ClickPreNext = (value) => {
    const date = value || new Date();
    const Month = new Date(date).toLocaleString('default', { month: 'short' });
    const Month_num = new Date(date).getMonth();
    const Year = new Date(date).getFullYear();
    const NewDateFormat = `${Month} ${Year}`;

    setDate({
      selectedDate: NewDateFormat
    });
    setSelectMonth(Month_num.toString());
    setSelectYear(Year.toString());
  };
  const ClickItemList = (Id) => {
    alert(Id);
    navigate('/RITeSchool/Teacher/EventManegement/' + encodeURL(Id), { state: { fromInternal: true } });
    // navigate('/RITeSchool/Teacher/EventManegement');
  };

  // const ClickGetMonth = (value) => {

  //   setDate({
  //    selectedDate:getMonthFormatted(new Date())
  //   });
  // }
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

  const clickEventsoverview = (value) => {
    navigate('/RITeSchool/common/EventOverview', { state: { fromInternal: true } });
  };
  const shouldDisplayDropdown = GetScreenPermission() === 'N' ? 0 : null;

  return (
    <Box sx={{ px: 2 }}>
      <PageHeader heading={'Annual Planner'} subheading={''} />
      <Box sx={{ float: 'right' }}>
        <Icon1 Note={Note} />
      </Box>

      <Grid container spacing={12}>
        <Grid item xs={2}>
          <Box sx={{ display: 'flex', gap: '20px' }}>
            <AnnualPlanerLegend color="Holiday" text="Holidays" />
            <AnnualPlanerLegend color="Exam" text="Exams" />
            <AnnualPlanerLegend color="Events" text="Events" />
          </Box>
        </Grid>

        {!shouldDisplayDropdown ? (
          <Grid item xs={2}>
            <Button variant="outlined" onClick={clickFileName}>
              Annual Planner
            </Button>
          </Grid>
        ) : (
          <Grid item xs={2}>
            <AddAnnualPlaner />
          </Grid>
        )}

        <Grid item xs={2}>
          <Button variant="outlined" onClick={clickEventsoverview}>
            Events Overview
          </Button>
        </Grid>
      </Grid>

      <Grid container spacing={2}>
        <Grid item xs={1}>
          <Card sx={{ backgroundColor: '#BEDAE3' }}>
            <Typography component={Box} p={0.5}>
              Select Std :
            </Typography>
          </Card>
        </Grid>
        {shouldDisplayDropdown ? (
          <Grid item xs={2}>
            <Dropdown
              Array={GetAssociatedStandardListP}
              handleChange={clickStandardDropdownP}
              defaultValue={AssociatedStandardP}
            />
          </Grid>
        ) : (
          <Grid item xs={2}>
            <Dropdown
              Array={SelectStandardList}
              handleChange={clickStandardDropdown}
              defaultValue={selectStandard}
            />
          </Grid>
        )}

        {/* <Grid item xs={1}>
          <Card sx={{ backgroundColor: '#BEDAE3' }}>
            <Typography component={Box} p={0.5}>
              Select Std :
            </Typography>
          </Card>
        </Grid> */}

        <Grid item xs={1}>
          <Card sx={{ backgroundColor: '#BEDAE3' }}>
            <Typography component={Box} p={0.5}>
              Select Div :
            </Typography>
          </Card>
        </Grid>
        <Grid item xs={2}>
          <Dropdown
            Array={SelectDivisionList}
            handleChange={clickdivisionDropdown}
            defaultValue={selectDivision}
            label={'Select Division'}
          />
        </Grid>
        <Grid item xs={1.2}>
          <Card sx={{ backgroundColor: '#BEDAE3' }}>
            <Typography component={Box} p={0.5}>
              Select Month :{' '}
            </Typography>
          </Card>
        </Grid>
        <Grid item xs={1.8}>
          <Dropdown
            Array={SelectMonthList}
            handleChange={clicMonthDropdown}
            defaultValue={selectMonth}
            label={'Select Month'}
          />
        </Grid>
        <Grid item xs={1}>
          <Card sx={{ backgroundColor: '#BEDAE3' }}>
            <Typography component={Box} p={0.5}>
              Select Year :
            </Typography>
          </Card>
        </Grid>
        <Grid item xs={2}>
          <Dropdown
            Array={SelectYearList}
            handleChange={clicYearDropdown}
            defaultValue={selectYear}
            label={'Select Year'}
          />
        </Grid>
      </Grid>
      <br></br>

      <CardCalenderAP
        ItemList={USGetEventsDataList}
        ClickItem={ClickItemList}
        ClickPreNext={ClickPreNext}
        formattedDate={date.selectedDate}
        DefaultValue
        ArrayList={HeaderPublish}
      />
    </Box>
  );
};

export default AnnualPlanerBaseScreen;
