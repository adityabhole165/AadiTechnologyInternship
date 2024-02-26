import { Container } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
import CalendarAnnualPlanner from './CalendarAnnualPlanner';

const AnnualPlannerBase = () => {
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
    Month: '0',
    Year: '0'
  });

  const [DaysList, setDaysList] = useState([]);
  const [SelectedDate, setSelectedDate] = useState(getDateDDMMMDash());

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
      Month: selectedItem == 'Month' ? value : DefaultValue.Month,
      Year: selectedItem == 'Year' ? value : DefaultValue.Year
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
    var todayMonth = (new Date().getMonth() + 1).toString();
    if (USMonthList.length > 0) {
      setValue(todayMonth, 'Month');
    }
  }, [USMonthList]);

  useEffect(() => {
    var todayYear = new Date().getFullYear().toString();
    if (USYearList.length > 0) {
      setValue(todayYear, 'Year');
    }
  }, [USYearList]);

  useEffect(() => {
    if (USEventsDataList.length > 0) {
      console.log(USEventsDataList, 'USEventsDataList');

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
    console.log(value, 'value');

    setSelectedDate(value);
  };
  const ClickItem = (value) => {
    setDefaultValue(value);
    if (value.Standard != DefaultValue.Standard)
      callGetDivisionList(value.Standard);
  };

  return (
    <Container>
      <CalendarAnnualPlanner
        DaysList={DaysList}
        ClickCalendarItem={ClickCalendarItem}
        SelectedDate={SelectedDate}
        FilterList={ItemList}
        ClickFilterItem={ClickItem}
        SelectedFilter={DefaultValue}
      ></CalendarAnnualPlanner>
    </Container>
  );
};

export default AnnualPlannerBase;
