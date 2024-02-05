import { createSlice } from '@reduxjs/toolkit';
import { AppThunk } from 'src/store';
import ApiAnnualPlanerBaseScreen from 'src/api/AddAnnualPlanner/ApiAnnualPlanerBaseScreen';
import { IGetAssociatedStdLstForTeacherDropDownBody, IGetAllDivisionsForStandardDropDownBody, IGetAllMonthsDropDownBody, IGetYearsForAnnualPalannerDropDownBody, IGetEventsDataListBody,IGetAssociatedStandardsBodyP } from "src/interfaces/AddAnnualPlanner/IAnnualPlanerBaseScreen"

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

  let EventsDataList = response.data.map((item, i) => {
    return {
      Id: "",
      IsActive: false,
      Name: parseInt(item.Day),
      Value: item.Event_Desc,
      Text1: item.Event_Title,
      Text2: item.Event_Desc,
      ForeColur: item.Event_ForeColor,
      BackgroundColor: item.Event_BackColor,
      IsClickable:  parseInt(item.Day)
    };
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





