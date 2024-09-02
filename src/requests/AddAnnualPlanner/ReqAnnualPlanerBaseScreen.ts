import { createSlice } from '@reduxjs/toolkit';
import ApiAnnualPlanerBaseScreen from 'src/api/AddAnnualPlanner/ApiAnnualPlanerBaseScreen';
import {
  getDateMonthYearFormattedDash,
  getMonthYearSplitFormatted,
  stripHtml
} from 'src/components/Common/Util';
import {
  IGetAllAcademicYearsForSchoolEVBody,
  IGetAllDivisionsForStandardDropDownBody,
  IGetAllEventsBody,
  IGetAllMonthsDropDownBody,
  IGetAssociatedStandardsBodyP,
  IGetAssociatedStandardsEVBody,
  IGetAssociatedStdLstForTeacherDropDownBody,
  IGetEventsDataListBody,
  IGetYearsForAnnualPalannerDropDownBody,
  INewGetAllMonthsDropDownotBody,
  INewGetAssociatedStdLstForTeacherDropDownBody
} from 'src/interfaces/AddAnnualPlanner/IAnnualPlanerBaseScreen';
import { IGetTeacherDetailsForControlPanelBody } from 'src/interfaces/ExamResult/IExamResult';
import { AppThunk } from 'src/store';

const AnnualPlanerBaseScreenSlice = createSlice({
  name: 'AnnualPlanerBaseScreen',
  initialState: {
    AddAnnual: '',
    getfile: [],
    deletefile: '',
    ISSelectStandardList: [],
    ISSelectDivisionList: [],
    ISSelectMonthList: [],
    ISSelectYearList: [],
    ISEventsDataList: [],
    IGetAssociatedStandardsP: [],
    IGetAssociatedStandardsEv: [],
    ISGetAllAcademicYearsForSchool: [],
    IsGetAllMonthsDropDown: [],
    ISGetAllEvents: [],
    ISStdList: [],
    ISMonthList: [],
    ParentList: [],
    GetTeacherDetails: null,
    listTeacherDetail: []
  },
  reducers: {
    addanual(state, action) {
      state.AddAnnual = action.payload;
    },
    GetFile(state, action) {
      state.getfile = action.payload;
    },
    DeleteFile(state, action) {
      state.deletefile = action.payload;
    },
    RSelectStandardList(state, action) {
      state.ISSelectStandardList = action.payload;
    },
    RSelectDivisionList(state, action) {
      state.ISSelectDivisionList = action.payload;
    },
    RSelectMonthList(state, action) {
      state.ISSelectMonthList = action.payload;
    },
    RSelectYearList(state, action) {
      state.ISSelectYearList = action.payload;
    },

    REventsDataList(state, action) {
      state.ISEventsDataList = action.payload;
    },

    AssociatedStandardsP(state, action) {
      state.IGetAssociatedStandardsP = action.payload;
    },

    AssociatedStandardsEv(state, action) {
      state.IGetAssociatedStandardsEv = action.payload;
    },

    RAllAcademicYearsForSchool(state, action) {
      state.ISGetAllAcademicYearsForSchool = action.payload;
    },

    RGetAllMonthsDropDown(state, action) {
      state.IsGetAllMonthsDropDown = action.payload;
    },

    RGetAllEvents(state, action) {
      state.ISGetAllEvents = action.payload;
    },

    RParentList(state, action) {
      state.ParentList = action.payload;
    },

    RStdList(state, action) {
      state.ISStdList = action.payload;
    },

    RMonthList(state, action) {
      state.ISMonthList = action.payload;
    },
    GetTeacherDetailsForControlPanel(state, action) {
      state.GetTeacherDetails = action.payload;
      state.listTeacherDetail = action.payload.listTeacherDetailss
    }
  }
});

export const GetStandardList =
  (data: IGetAssociatedStdLstForTeacherDropDownBody): AppThunk =>
    async (dispatch) => {
      const response = await ApiAnnualPlanerBaseScreen.StandardDropDown(data);
      let a = response.data.map((item, i) => {
        return {
          Id: item.StandardId,
          Name: item.Standard_Name,
          Value: item.StandardId
        };
      });

      dispatch(AnnualPlanerBaseScreenSlice.actions.RSelectStandardList(a));
    };
export const GetTeacherDetailsForControlPanels =
  (data: IGetTeacherDetailsForControlPanelBody): AppThunk =>
    async (dispatch) => {
      const response = await ApiAnnualPlanerBaseScreen.GetTeacherDetailsForControlPanel(data);
      dispatch(AnnualPlanerBaseScreenSlice.actions.GetTeacherDetailsForControlPanel(response.data));
    };

export const GetDivisionList =
  (data: IGetAllDivisionsForStandardDropDownBody): AppThunk =>
    async (dispatch) => {
      const response = await ApiAnnualPlanerBaseScreen.DivisionDropDown(data);
      let a = response.data.map((item, i) => {
        return {
          Id: item.division_id,
          Name: item.division_name,
          Value: item.division_id
        };
      });

      dispatch(AnnualPlanerBaseScreenSlice.actions.RSelectDivisionList(a));
    };

export const GetMonthList =
  (data: IGetAllMonthsDropDownBody): AppThunk =>
    async (dispatch) => {
      const response = await ApiAnnualPlanerBaseScreen.MonthsDropDown(data);
      let a = response.data.map((item, i) => {
        return {
          Id: item.MonthID,
          Name: item.Month,
          Value: item.MonthID
        };
      });
      dispatch(AnnualPlanerBaseScreenSlice.actions.RSelectMonthList(a));
    };

export const GetYearList =
  (data: IGetYearsForAnnualPalannerDropDownBody): AppThunk =>
    async (dispatch) => {
      const response = await ApiAnnualPlanerBaseScreen.YearsDropDown(data);
      let a = response.data.map((item, i) => {
        return {
          Id: item.Year,
          Name: item.Year,
          Value: item.Year
        };
      });
      dispatch(AnnualPlanerBaseScreenSlice.actions.RSelectYearList(a));
    };

// export const CDAGetEventsDataList =
//   (data: IGetEventsDataListBody): AppThunk =>
//     async (dispatch) => {
//       let arrDays = [];
//       const response = await ApiAnnualPlanerBaseScreen.EventsDataList(data);
//       let a = [];

//       const getMultipleEvents = (value) => {
//         let arr = []
//         response.data
//           .filter((Item) => (
//             getDateMonthYearFormattedDash(Item.Event_Date) == value
//             && data.asEventType.includes(Item.Sort_Order)
//           ))
//           .map((Item) => {
//             arr.push({ Name: stripHtml(Item.Event_Desc), Legend: Item.Sort_Order })
//           })
//         return arr
//       }

//       const getLegend = (value) => {
//         let legend = 7
//         response.data
//           .filter((Item) => (
//             getDateMonthYearFormattedDash(Item.Event_Date) == value
//             && data.asEventType.includes(Item.Sort_Order)
//           ))
//           .map((Item) => {
//             if (Number(Item.Sort_Order) < legend)
//               legend = Number(Item.Sort_Order)
//           })
//         return legend
//       }
//       response.data.map((item, i) => {
//         if (!arrDays.includes(item.Day)) {
//           a.push({
//             Id: i,
//             Name: item.Day,
//             Value: getDateMonthYearFormattedDash(item.Event_Date),
//             IsActive: false,
//             Text1: getMultipleEvents(getDateMonthYearFormattedDash(item.Event_Date)),
//             Text3: item.Event_Desc,
//             Type: item.Sort_Order,
//             Legend: getLegend(getDateMonthYearFormattedDash(item.Event_Date))

//           })

//           arrDays.push(item.Day);
//         }
//       });

//       dispatch(
//         AnnualPlanerBaseScreenSlice.actions.REventsDataList(
//           a.sort((a, b) => Number(a.Name) - Number(b.Name))
//         )
//       );
//     };
export const CDAGetEventsDataList =
  (data: IGetEventsDataListBody): AppThunk =>
    async (dispatch) => {
      let arrDays = [];
      const response = await ApiAnnualPlanerBaseScreen.EventsDataList(data);
      let a = [];

      const getMultipleEvents = (value) => {
        let arr = [];
        response.data
          .filter((Item) => (
            getDateMonthYearFormattedDash(Item.Event_Date) === value
            && data.asEventType.includes(Item.Sort_Order)
          ))
          .forEach((Item) => {
            arr.push({ Name: stripHtml(Item.Event_Desc), Legend: Item.Sort_Order });
          });
        return arr;
      };

      const getLegend = (value) => {
        let legend = 7; // A default high value to ensure any valid Sort_Order is lower
        response.data
          .filter((Item) => (
            getDateMonthYearFormattedDash(Item.Event_Date) === value
            && data.asEventType.includes(Item.Sort_Order)
          ))
          .forEach((Item) => {
            if (Item.Event_Desc.includes("Outside Academic Year")) {
              legend = 0; // Assuming "Outside Academic Year" has the highest priority
            } else if (Number(Item.Sort_Order) < legend) {
              legend = Number(Item.Sort_Order);
            }
          });
        return legend;
      };

      response.data.forEach((item, i) => {
        if (!arrDays.includes(item.Day)) {
          const value = getDateMonthYearFormattedDash(item.Event_Date);
          const eventsForDay = response.data.filter(
            (Item) => getDateMonthYearFormattedDash(Item.Event_Date) === value &&
              data.asEventType.includes(Item.Sort_Order)
          );

          const hasOutsideAcademicYear = eventsForDay.some((Item) => Item.Event_Desc.includes("Outside Academic Year"));

          const filteredEvents = hasOutsideAcademicYear
            ? eventsForDay.filter((Item) => !Item.Event_Desc.includes("Weekend"))
            : eventsForDay;

          a.push({
            Id: i,
            Name: item.Day,
            Value: value,
            IsActive: false,
            Text1: filteredEvents.map((Item) => ({ Name: stripHtml(Item.Event_Desc), Legend: Item.Sort_Order })),
            Text3: hasOutsideAcademicYear
              ? "<div style=\"margin:2px; border: 1px solid #006600;font-size: 9pt; font-weight:bold; background-color: transparent; color: #cc00cc;\"><b>Outside Academic Year</b></div>"
              : item.Event_Desc,
            Type: item.Sort_Order,
            Legend: getLegend(value)
          });

          arrDays.push(item.Day);
        }
      });

      dispatch(
        AnnualPlanerBaseScreenSlice.actions.REventsDataList(
          a.sort((a, b) => Number(a.Name) - Number(b.Name))
        )
      );
    };

export const AssociatedStandardListP =
  (data: IGetAssociatedStandardsBodyP): AppThunk =>
    async (dispatch) => {
      const response = await ApiAnnualPlanerBaseScreen.AssociatedStandardP(data);
      let a = response.data.map((item, i) => {
        return {
          Id: item.original_standard_id,
          Name: item.standard_name,
          Value: item.original_standard_id
        };
      });

      dispatch(AnnualPlanerBaseScreenSlice.actions.AssociatedStandardsP(a));
    };

export const CDAAssociatedStandardListEventOverview =
  (data: IGetAssociatedStandardsEVBody): AppThunk =>
    async (dispatch) => {
      const response =
        await ApiAnnualPlanerBaseScreen.AssociatedStandardEventoverview(data);
      let a = response.data.map((item, i) => {
        return {
          Id: item.original_standard_id,
          Name: item.standard_name,
          Value: item.original_standard_id
        };
      });

      dispatch(AnnualPlanerBaseScreenSlice.actions.AssociatedStandardsEv(a));
    };



export const CDAGetAllMonthsDropDown =
  (data: IGetAllMonthsDropDownBody): AppThunk =>
    async (dispatch) => {
      const response = await ApiAnnualPlanerBaseScreen.GetAllMonthsDropDown(data);
      let a = response.data.map((item, i) => {
        return {
          Id: item.MonthID,
          Name: item.Month,
          Value: item.MonthID
        };
      });

      dispatch(AnnualPlanerBaseScreenSlice.actions.RGetAllMonthsDropDown(a));
    };

export const CDAGetAllEvents =
  (data: IGetAllEventsBody): AppThunk =>
    async (dispatch) => {
      const response = await ApiAnnualPlanerBaseScreen.GetAllEvents(data);
      let parentList = []
      if (response.data.length > 0) {
        response.data.map((Item) => {
          if (!parentList.includes(getMonthYearSplitFormatted(Item.StartDateAndTime))) {
            parentList.push(getMonthYearSplitFormatted(Item.StartDateAndTime))
          }
        })
      }

      dispatch(AnnualPlanerBaseScreenSlice.actions.RGetAllEvents(response.data));
      dispatch(AnnualPlanerBaseScreenSlice.actions.RParentList(parentList));
    };

export const CDAStdList =
  (data: INewGetAssociatedStdLstForTeacherDropDownBody): AppThunk =>
    async (dispatch) => {
      const response = await ApiAnnualPlanerBaseScreen.Stdlist(data);
      let abc = [{ Id: "0", Name: 'All', Value: "0" }];

      response.data.map((item, i) => {
        abc.push({
          Id: item.StandardId,
          Name: item.Standard_Name,
          Value: item.StandardId
        });
      });
      dispatch(AnnualPlanerBaseScreenSlice.actions.RStdList(abc));
    };

export const CDAMonthList =
  (data: INewGetAllMonthsDropDownotBody): AppThunk =>
    async (dispatch) => {
      const response = await ApiAnnualPlanerBaseScreen.MonthList(data);
      let abc = [{ Id: "0", Name: 'All', Value: "0" }];

      response.data.map((item, i) => {
        abc.push({
          Id: item.MonthID,
          Name: item.Month,
          Value: item.MonthID
        });
      });
      dispatch(AnnualPlanerBaseScreenSlice.actions.RMonthList(abc));
    };


export const CDAAllAcademicYearsForSchool =
  (data: IGetAllAcademicYearsForSchoolEVBody): AppThunk =>
    async (dispatch) => {
      const response =
        await ApiAnnualPlanerBaseScreen.GetAllAcademicYearsForSchool(data);
      let a = response.data.map((item, i) => {
        return {
          Id: item.Academic_Year_ID,
          Name: item.YearValue,
          Value: item.YearValue.split('-')[0]
        };
      });

      dispatch(AnnualPlanerBaseScreenSlice.actions.RAllAcademicYearsForSchool(a));
    };

export default AnnualPlanerBaseScreenSlice.reducer;
