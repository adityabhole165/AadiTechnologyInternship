import { createSlice } from '@reduxjs/toolkit';
import ApiAnnualPlanerBaseScreen from 'src/api/AddAnnualPlanner/ApiAnnualPlanerBaseScreen';
import { getDateMonthYearFormattedDash } from 'src/components/Common/Util';
import { IGetAllAcademicYearsForSchoolEVBody, IGetAllDivisionsForStandardDropDownBody, IGetAllEventsBody, IGetAllMonthsDropDownBody, IGetAssociatedStandardsBodyP, IGetAssociatedStandardsEVBody, IGetAssociatedStdLstForTeacherDropDownBody, IGetEventsDataListBody, IGetYearsForAnnualPalannerDropDownBody } from "src/interfaces/AddAnnualPlanner/IAnnualPlanerBaseScreen";
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
    ISGetAllAcademicYearsForSchool:[],
    IsGetAllMonthsDropDown:[],
    ISGetAllEvents:[]
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
    state. ISGetAllEvents = action.payload;
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



export const CDAGetEventsDataList =
  (data: IGetEventsDataListBody): AppThunk =>
    async (dispatch) => {
      const response = await ApiAnnualPlanerBaseScreen.EventsDataList(data)
      // let a = response.data.map((item, i) => {
      //   return {
      //     Id: i,
      //     Name: item.Event_Title,
      //     Value: getDateMonthYearFormattedDash(item.Event_Date),
      //     IsActive: false,
      //     Text1: item.Event_Desc,
      //     Text3: item.Event_Desc,
      //     BackgroundColor:item.Event_BackColor,
      //     ForeColur: item.Event_ForeColor,
          
      //   };
      // })

      dispatch(AnnualPlanerBaseScreenSlice.actions.REventsDataList(response.data))
    }



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



    export const CDAAssociatedStandardListEventOverview =
  (data: IGetAssociatedStandardsEVBody): AppThunk =>
    async (dispatch) => {
      const response = await ApiAnnualPlanerBaseScreen.AssociatedStandardEventoverview(data)
      let a = response.data.map((item, i) => {
        return {
          Id: item.original_standard_id,
          Name: item.standard_name,
          Value: item.original_standard_id
        }
      })

      dispatch(AnnualPlanerBaseScreenSlice.actions.AssociatedStandardsEv(a))
    }


    export const CDAAllAcademicYearsForSchool =
    (data: IGetAllAcademicYearsForSchoolEVBody): AppThunk =>
      async (dispatch) => {
        const response = await ApiAnnualPlanerBaseScreen.GetAllAcademicYearsForSchool(data)
        let a = response.data.map((item, i) => {
          return {
            Id: item.Academic_Year_ID,
            Name: item.YearValue,
            Value: item.Academic_Year_ID
          }
        })
  
        dispatch(AnnualPlanerBaseScreenSlice.actions.RAllAcademicYearsForSchool(a))
      }
  


      export const CDAGetAllMonthsDropDown =
      (data: IGetAllMonthsDropDownBody): AppThunk =>
        async (dispatch) => {
          const response = await ApiAnnualPlanerBaseScreen.GetAllMonthsDropDown(data)
          let a = response.data.map((item, i) => {
            return {
              Id: item.MonthID,
              Name: item.Month,
              Value: item.MonthID
            }
          })
    
          dispatch(AnnualPlanerBaseScreenSlice.actions.RGetAllMonthsDropDown(a))
        }


        export const CDAGetAllEvents =
        (data: IGetAllEventsBody): AppThunk =>
          async (dispatch) => {
            const response = await ApiAnnualPlanerBaseScreen.GetAllEvents(data)

            dispatch(AnnualPlanerBaseScreenSlice.actions.RGetAllEvents(response.data))
          }

    
  
      

    


export default AnnualPlanerBaseScreenSlice.reducer;





