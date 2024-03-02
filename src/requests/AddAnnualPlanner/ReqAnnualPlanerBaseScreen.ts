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
    ParentList: []
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

export const CDAGetEventsDataList =
  (data: IGetEventsDataListBody): AppThunk =>
    async (dispatch) => {
      let arrDays = [];
      const response = await ApiAnnualPlanerBaseScreen.EventsDataList(data);
      let a = [];
      const getMultipleEvents = (value) => {
        let arr = []
        response.data
          .filter((Item) => getDateMonthYearFormattedDash(Item.Event_Date) == value)
          .map((Item) => {
            arr.push(stripHtml(Item.Event_Desc))
          })
        if (arr.length > 1)
          console.log(value, "-- value -- ")
        return arr
      }
      response.data.map((item, i) => {
        if (!arrDays.includes(item.Day)) {
          a.push({
            Id: i,
            Name: item.Day,
            Value: getDateMonthYearFormattedDash(item.Event_Date),
            IsActive: false,
            Text1: getMultipleEvents(getDateMonthYearFormattedDash(item.Event_Date)),
            Text3: item.Event_Desc,
            Legend: item.Event_Desc.includes('#D8EB88') ? 0 :
              item.Event_Desc.includes('papayawhip') ? 2 :
                item.Event_Desc.includes('#AFEEEE') ? 6 :
                  item.Event_Desc.includes('Weekend') ? 3 : 8

          })

          arrDays.push(item.Day);
        }
      });
      console.log(a, "--a--");

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
          Value: item.Academic_Year_ID
        };
      });

      dispatch(AnnualPlanerBaseScreenSlice.actions.RAllAcademicYearsForSchool(a));
    };

export default AnnualPlanerBaseScreenSlice.reducer;
