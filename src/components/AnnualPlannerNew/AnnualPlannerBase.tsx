import { Box } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
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
  GetTeacherDetailsForControlPanels,
  GetYearList
} from 'src/requests/AddAnnualPlanner/ReqAnnualPlanerBaseScreen';
import { resetEventList } from 'src/requests/EventManegment/RequestEventManegment';
import { RootState } from 'src/store';
import { decodeURL, encodeURL, getDateDDMMMDash } from '../Common/Util';
import AnnualPlannerHeader from './AnnualPlannerHeader';
import CalendarAnnualPlanner from './CalendarAnnualPlanner';
const AnnualPlannerBase = () => {
  let {
    selectedDate,
    standardId,
    divisionId
  } = useParams();

  // Decode in-place
  selectedDate = decodeURL(selectedDate);
  standardId = decodeURL(standardId);
  divisionId = decodeURL(divisionId);

  const [selectedStandardId, setSelectedStandardId] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const USStandardList: any = useSelector(
    (state: RootState) => state.AnnualPlanerBaseScreen.ISSelectStandardList
  );
  //console.log(USStandardList, "USStandardList")
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
  const GetTeacherDetail: any = useSelector(
    (state: RootState) => state.AnnualPlanerBaseScreen.listTeacherDetail
  );
  //console.log("GetTeacherDetail", GetTeacherDetail)
  const asAcademicYearId = sessionStorage.getItem('AcademicYearId');
  const asSchoolId = localStorage.getItem('localSchoolId');
  const UserId = sessionStorage.getItem('Id');
  const IsClassTeacher = sessionStorage.getItem('IsClassTeacher')
  const TeacherId = sessionStorage.getItem('TeacherId')
  const ScreensAccessPermission = JSON.parse(
    sessionStorage.getItem('ScreensAccessPermission')
  );
  const GetScreenPermission = () => {
    let perm = 'N';
    ScreensAccessPermission && ScreensAccessPermission.map((item) => {
      if (item.ScreenName === 'Annual Planner') perm = item.IsFullAccess;
    });
    return perm;
  };
  // let AnnualPlannerViewAccess = "N"
  // ScreensAccessPermission?.map((item) => {
  //   if (item.ScreenName === 'Annual Planner') AnnualPlannerViewAccess = item.IsFullAccess;
  // });
  const ItemList = {
    StandardList: USStandardList,
    StandardDivisionList: USStandardDivision,
    MonthList: USMonthList,
    YearList: USYearList
  };
  const Note: string =
    'These events may change due to unavoidable reasons without prior notice.';

  const [DaysList, setDaysList] = useState([]);
  const [SelectedDate, setSelectedDate] = useState(
    selectedDate == undefined ?
      getDateDDMMMDash(new Date()) :
      getDateDDMMMDash(new Date(selectedDate))
  );

  const [DefaultValue, setDefaultValue] = useState({
    Standard: standardId,
    StandardDivision: divisionId,
    Month: (new Date(SelectedDate).getMonth() + 1).toString(),
    Year: new Date(SelectedDate).getFullYear().toString()
  });
  // console.log(SelectedDate, "selectedDate");

  const [openAnnualPlannerDialog, setOpenAnnualPlannerDialog] = useState(false);
  const [fileName, setFileName] = useState('');
  const [base64URL, setbase64URL] = useState('');
  const [EventType, setEventType] = useState([
    { Id: 1, Name: "Weekend", Value: "1", IsActive: true },
    { Id: 2, Name: "Holiday", Value: "2", IsActive: true },
    { Id: 3, Name: "Exam", Value: "3", IsActive: true },
    { Id: 4, Name: "Event", Value: "4", IsActive: true },
    { Id: 5, Name: "Outside Academic Year", Value: "5", IsActive: true }
  ]);
  useEffect(() => {

    const GetAssociatedStdLstForTeacherBody: IGetAssociatedStdLstForTeacherDropDownBody = {
      asSchoolId: Number(asSchoolId),
      asAcademicYearId: Number(asAcademicYearId),
      asUserId: GetScreenPermission() === 'Y'
        ? 0
        : Number(UserId)
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

  useEffect(() => {
    if (IsClassTeacher === "Y") {
      const GetTeacherDetailsForControlPanel = {
        asSchoolId: Number(asSchoolId),
        asAcademicYearId: Number(asAcademicYearId),
        asTeacherID: Number(TeacherId)
      };

      dispatch(GetTeacherDetailsForControlPanels(GetTeacherDetailsForControlPanel));
    }
  }, [TeacherId]);

  const findMatchingId = (teacherId: string) => {
    const matchedId = teacherId ? USStandardList.find(item => item.Id === teacherId.toString()) : undefined;
    return matchedId ? matchedId.Value : undefined;
  };

  // useEffect(() => {
  //   if (USStandardList.length > 0 && GetTeacherDetail && GetTeacherDetail.length > 0) {
  //     const standardId = findMatchingId(GetTeacherDetail[0].Standard_Id);
  //     setValue(standardId === undefined ? USStandardList[0].Value : standardId, 'Standard');
  //     callGetDivisionList(standardId === undefined ? USStandardList[0].Value : standardId);
  //   }
  // }, [USStandardList, GetTeacherDetail]);
  useEffect(() => {
    if (USStandardList.length > 0) {
      if (standardId == undefined) {
        if (IsClassTeacher === "N") {
          //console.log("Setting standardId to 0 because IsClassTeacher is 'N'");
          setValue(USStandardList[0].Value, 'Standard'); // Set standardId to USStandardList[0].Value
          callGetDivisionList(USStandardList[0].Value);  // Call function with USStandardList[0].Value
        } else if (GetTeacherDetail && GetTeacherDetail.length > 0) {
          const standardId = findMatchingId(GetTeacherDetail[0].Standard_Id);
          //console.log("Setting standardId based on GetTeacherDetail:", standardId);
          setValue(standardId === undefined ? USStandardList[0].Value : standardId, 'Standard');
          callGetDivisionList(standardId === undefined ? USStandardList[0].Value : standardId);
        }
      }
    }
  }, [USStandardList, GetTeacherDetail, IsClassTeacher]);

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
      setValue(standardId == undefined ? USStandardList[0].Value : standardId, 'Standard');
      callGetDivisionList(USStandardList[0].Value);
    }
  }, [USStandardList]);

  useEffect(() => {
    if (USStandardDivision.length > 0) {
      setValue(divisionId == undefined ? USStandardDivision[0].Value : divisionId, 'StandardDivision');
    }
  }, [USStandardDivision]);
  // useEffect(() => {
  //   if (USStandardList.length > 0) {
  //     setValue(standardId == undefined ? USStandardList[0].Value : standardId, 'Standard');
  //   }
  // }, [USStandardList]);

  useEffect(() => {
    if (USEventsDataList.length > 0) {
      setDaysList(USEventsDataList);
    }
  }, [USEventsDataList]);
  const getEventType = () => {
    let eventType = ""
    EventType.map((Item) => {
      if (Item.IsActive)
        eventType = eventType + Item.Value + ","
    })
    return eventType;
  }
  useEffect(() => {
    const GetEventsDataListBody: IGetEventsDataListBody = {
      asSchoolId: Number(asSchoolId),
      asAcademicYearId: Number(asAcademicYearId),
      asStandardId: Number(DefaultValue.Standard),
      asDivisionId: Number(DefaultValue.StandardDivision),
      asMonthId: Number(DefaultValue.Month),
      asYear: Number(DefaultValue.Year),
      asEventType: getEventType()
    };
    if (
      DefaultValue.Standard != '0' &&
      DefaultValue.StandardDivision != '0' &&
      DefaultValue.Month != '0' &&
      DefaultValue.Year != '0'
    )
      dispatch(CDAGetEventsDataList(GetEventsDataListBody));
  }, [DefaultValue, EventType]);

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
  const ClickDate = (value) => {
    if (GetScreenPermission() == "Y") {
      setSelectedDate(value);
      setValue(value, 'MonthYear');
      dispatch(resetEventList())
      navigate('/RITeSchool/Common/EventManagementForm/' + encodeURL(value.replaceAll('/', '-')) + '/' + encodeURL(DefaultValue.Standard) + '/' + encodeURL(DefaultValue.StandardDivision), { state: { fromInternal: true } })
    }
  };
  const ClickFilterItem = (value) => {
    setDefaultValue(value);
    let date = new Date();
    date.setDate(1);
    date.setMonth(value.Month - 1);
    date.setFullYear(value.Year);
    setSelectedDate(getDateDDMMMDash(new Date(date)));
    // console.log(getDateDDMMMDash(new Date(date)), 'ClickFilterItem');
    //If standard is changed, call Division API
    if (value.Standard != DefaultValue.Standard)
      callGetDivisionList(value.Standard);
  };

  const ClickEventType = (value) => {
    setEventType(value)
  }
  return (
    <Box sx={{ px: 2 }}>
      <AnnualPlannerHeader />
      <Box sx={{ backgroundColor: 'white' }}>
        <CalendarAnnualPlanner
          DaysList={DaysList}
          ClickCalendarItem={ClickCalendarItem}
          ClickDate={ClickDate}
          SelectedDate={SelectedDate}
          FilterList={ItemList}
          ClickFilterItem={ClickFilterItem}
          SelectedFilter={DefaultValue}
          EventType={EventType}
          ClickEventType={ClickEventType}
          AnnualPlannerViewAccess={GetScreenPermission()}
        />
      </Box>
    </Box>
  );
};

export default AnnualPlannerBase;
