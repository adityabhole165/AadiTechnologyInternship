import { Box, Container } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import {
  IGetAllDivisionsForStandardDropDownBody,
  IGetAllMonthsDropDownBody,
  IGetAssociatedStdLstForTeacherDropDownBody,
  IGetEventsDataListBody,
  IGetYearsForAnnualPalannerDropDownBody
} from 'src/interfaces/AddAnnualPlanner/IAnnualPlanerBaseScreen';
import {
  CDAGetEventsDataList,
  GetDivisionList,
  GetMonthList,
  GetStandardList,
  GetYearList
} from 'src/requests/AddAnnualPlanner/ReqAnnualPlanerBaseScreen';
import { RootState } from 'src/store';
import { getDateDDMMMDash } from '../Common/Util';
import AnnualPlannerHeader from './AnnualPlannerHeader';
import CalendarAnnualPlanner from './CalendarAnnualPlanner';

const AnnualPlannerBase = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const USStandardList: any = useSelector(
    (state: RootState) => state.AnnualPlanerBaseScreen.ISSelectStandardList
  );
  const USStandardDivision: any = useSelector(
    (state: RootState) => state.AnnualPlanerBaseScreen.ISSelectDivisionList
  );
  const USMonthList: any = useSelector(
    (state: RootState) => state.AnnualPlanerBaseScreen.ISSelectMonthList
  );
  const USYearList: any = useSelector(
    (state: RootState) => state.AnnualPlanerBaseScreen.ISSelectYearList
  );
  const USEventsDataList: any = useSelector(
    (state: RootState) => state.AnnualPlanerBaseScreen.ISEventsDataList
  );

  const asAcademicYearId = sessionStorage.getItem('AcademicYearId');
  const asSchoolId = localStorage.getItem('localSchoolId');
  const UserId = sessionStorage.getItem('Id');
  const ItemList = {
    StandardList: USStandardList,
    StandardDivisionList: USStandardDivision,
    MonthList: USMonthList,
    YearList: USYearList
  };
  const [DefaultValue, setDefaultValue] = useState({
    Standard: '0',
    StandardDivision: '0',
    Month: (new Date().getMonth() + 1).toString(),
    Year: new Date().getFullYear().toString()
  });
  const Note: string =
    'These events may change due to unavoidable reasons without prior notice.';

  const [DaysList, setDaysList] = useState([]);
  const [SelectedDate, setSelectedDate] = useState(
    getDateDDMMMDash(new Date())
  );
  const [openAnnualPlannerDialog, setOpenAnnualPlannerDialog] = useState(false);
  const [fileName, setFileName] = useState('');
  const [base64URL, setbase64URL] = useState('');

  useEffect(() => {
    const GetAssociatedStdLstForTeacherBody: IGetAssociatedStdLstForTeacherDropDownBody =
      {
        asSchoolId: Number(asSchoolId),
        asAcademicYearId: Number(asAcademicYearId),
        asUserId: Number(UserId)
      };
    dispatch(GetStandardList(GetAssociatedStdLstForTeacherBody));
    const GetAllMonthsDropBody: IGetAllMonthsDropDownBody = {
      asSchoolId: Number(asSchoolId)
    };
    dispatch(GetMonthList(GetAllMonthsDropBody));
    const GetYearsForAnnualPalannerBody: IGetYearsForAnnualPalannerDropDownBody =
      {
        asSchoolId: Number(asSchoolId)
      };
    dispatch(GetYearList(GetYearsForAnnualPalannerBody));
  }, []);

  const setValue = (value, selectedItem) => {
    setDefaultValue({
      Standard: selectedItem == 'Standard' ? value : DefaultValue.Standard,
      StandardDivision:
        selectedItem == 'StandardDivision'
          ? value
          : DefaultValue.StandardDivision,
      Month:
        selectedItem == 'MonthYear'
          ? (new Date(value).getMonth() + 1).toString()
          : DefaultValue.Month,
      Year:
        selectedItem == 'MonthYear'
          ? new Date(value).getFullYear().toString()
          : DefaultValue.Year
    });
  };
  useEffect(() => {
    if (USStandardList.length > 0) {
      setValue(USStandardList[0].Value, 'Standard');
      callGetDivisionList(USStandardList[0].Value);
    }
  }, [USStandardList]);

  useEffect(() => {
    if (USStandardDivision.length > 0) {
      setValue(USStandardDivision[0].Value, 'StandardDivision');
    }
  }, [USStandardDivision]);

  useEffect(() => {
    if (USEventsDataList.length > 0) {
      setDaysList(USEventsDataList);
    }
  }, [USEventsDataList]);
  useEffect(() => {
    const GetEventsDataListBody: IGetEventsDataListBody = {
      asSchoolId: Number(asSchoolId),
      asAcademicYearId: Number(asAcademicYearId),
      asStandardId: Number(DefaultValue.Standard),
      asDivisionId: Number(DefaultValue.StandardDivision),
      asMonthId: Number(DefaultValue.Month),
      asYear: Number(DefaultValue.Year)
    };
    if (
      DefaultValue.Standard != '0' &&
      DefaultValue.StandardDivision != '0' &&
      DefaultValue.Month != '0' &&
      DefaultValue.Year != '0'
    )
      dispatch(CDAGetEventsDataList(GetEventsDataListBody));
  }, [DefaultValue]);

  const callGetDivisionList = (value) => {
    const AllDivisionsForStandardBody: IGetAllDivisionsForStandardDropDownBody =
      {
        asSchoolId: Number(asSchoolId),
        asAcademicYearId: Number(asAcademicYearId),
        asStandardId: Number(value)
      };
    dispatch(GetDivisionList(AllDivisionsForStandardBody));
  };

  const ClickCalendarItem = (value) => {
    setSelectedDate(value);
    setValue(value, 'MonthYear');
  };
  const ClickFilterItem = (value) => {
    setDefaultValue(value);
    let date = new Date();
    date.setDate(1);
    date.setMonth(value.Month - 1);
    date.setFullYear(value.Year);
    setSelectedDate(getDateDDMMMDash(new Date(date)));
    console.log(getDateDDMMMDash(new Date(date)), 'ClickFilterItem');
    //If standard is changed, call Division API
    if (value.Standard != DefaultValue.Standard)
      callGetDivisionList(value.Standard);
  };

  return (
    <Container sx={{ mt: 4 }} maxWidth={'xl'}>
      <AnnualPlannerHeader />
      <Box mt={1.5} sx={{ backgroundColor: 'white' }}>
        <CalendarAnnualPlanner
          DaysList={DaysList}
          ClickCalendarItem={ClickCalendarItem}
          SelectedDate={SelectedDate}
          FilterList={ItemList}
          ClickFilterItem={ClickFilterItem}
          SelectedFilter={DefaultValue}
        />
      </Box>
    </Container>
  );
};

export default AnnualPlannerBase;
