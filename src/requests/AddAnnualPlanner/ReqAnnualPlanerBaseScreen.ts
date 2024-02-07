import { createSlice } from '@reduxjs/toolkit';
import ApiAnnualPlanerBaseScreen from 'src/api/AddAnnualPlanner/ApiAnnualPlanerBaseScreen';
import { IGetAllDivisionsForStandardDropDownBody, IGetAllMonthsDropDownBody, IGetAssociatedStandardsBodyP, IGetAssociatedStdLstForTeacherDropDownBody, IGetEventsDataListBody, IGetYearsForAnnualPalannerDropDownBody } from "src/interfaces/AddAnnualPlanner/IAnnualPlanerBaseScreen";
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
    IGetAssociatedStandardsP:[],
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

  }
});


export const GetStandardList =
  (data: IGetAssociatedStdLstForTeacherDropDownBody): AppThunk =>
    async (dispatch) => {
      const response = await ApiAnnualPlanerBaseScreen.StandardDropDown(data)
      let a = response.data.map((item, i) => {
        return {
          Id: item.StandardId,
          Name: item.Standard_Name,
          Value: item.StandardId
        }
      })

      dispatch(AnnualPlanerBaseScreenSlice.actions.RSelectStandardList(a))
    }





export const GetDivisionList =
  (data: IGetAllDivisionsForStandardDropDownBody): AppThunk =>
    async (dispatch) => {
      const response = await ApiAnnualPlanerBaseScreen.DivisionDropDown(data)
      let a = response.data.map((item, i) => {
        return {
          Id: item.division_id,
          Name: item.division_name,
          Value: item.division_id
        }
      })

      dispatch(AnnualPlanerBaseScreenSlice.actions.RSelectDivisionList(a))
    }

export const GetMonthList =
  (data: IGetAllMonthsDropDownBody): AppThunk =>
    async (dispatch) => {
      const response = await ApiAnnualPlanerBaseScreen.MonthsDropDown(data)
      let a = response.data.map((item, i) => {
        return {
          Id: item.MonthID,
          Name: item.Month,
          Value: item.MonthID
        }
      })
      dispatch(AnnualPlanerBaseScreenSlice.actions.RSelectMonthList(a))
    }

export const GetYearList =
  (data: IGetYearsForAnnualPalannerDropDownBody): AppThunk =>
    async (dispatch) => {
      const response = await ApiAnnualPlanerBaseScreen.YearsDropDown(data)
      let a = response.data.map((item, i) => {
        return {
          Id: item.Year,
          Name: item.Year,
          Value: item.Year
        }
      })
      dispatch(AnnualPlanerBaseScreenSlice.actions.RSelectYearList(a))
    }

    export const CDAGetEventsDataList = (data: IGetEventsDataListBody): AppThunk => async (dispatch) => {
      const response = await ApiAnnualPlanerBaseScreen.EventsDataList(data);
    
      let EventsDataList = [];
      let uniqueDays = {}; // To store unique days as keys and Event_Title as values
    
      response.data.forEach((item, i) => {
        if (item.Day) {
          if (!uniqueDays[item.Day]) {
            uniqueDays[item.Day] = []; // Initialize an array if Day doesn't exist
          }
          uniqueDays[item.Day].push(item.Event_Title); // Store Event_Title for each Day
        }
      });
    
      Object.keys(uniqueDays).forEach(day => {
        EventsDataList.push({
          Id: "",
          IsActive: false,
          Name: parseInt(day),
          Value: "", // You may modify this if there's a specific value you want to assign
          Text1: uniqueDays[day].join(', '), // Join multiple Event_Titles for the same day
          Text2: uniqueDays[day].join(', '), // Join multiple Event_Titles for the same day
          ForeColur: "", // You may modify this if there's a specific value you want to assign
          BackgroundColor: "", // You may modify this if there's a specific value you want to assign
          IsClickable: parseInt(day)
        });
      });
    
      EventsDataList.sort((a, b) => a.Name - b.Name);
    
      dispatch(AnnualPlanerBaseScreenSlice.actions.REventsDataList(EventsDataList));
    };
    
    

export const AssociatedStandardListP =
  (data: IGetAssociatedStandardsBodyP): AppThunk =>
    async (dispatch) => {
      const response = await ApiAnnualPlanerBaseScreen.AssociatedStandardP(data)
      let a = response.data.map((item, i) => {
        return {
          Id: item.original_standard_id,
          Name: item.standard_name,
          Value: item.original_standard_id
        }
      })

      dispatch(AnnualPlanerBaseScreenSlice.actions.AssociatedStandardsP(a))
    }

export default AnnualPlanerBaseScreenSlice.reducer;





