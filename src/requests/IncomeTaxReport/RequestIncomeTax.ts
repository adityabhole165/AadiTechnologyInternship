import { createSlice } from '@reduxjs/toolkit';
import { AppThunk } from 'src/store';
import ApiIncomeTaxReport from 'src/api/IncomeTaxReport/ApiIncomeTaxReport';
import { IGetITRFileNameBody,GetAllAcademicYearsApiBody } from 'src/interfaces/Student/IIncomeTaxReport';




const SliceIncomeTaxReport = createSlice({
    name: 'IncomeTaxReport',
    initialState: {
        GetIncomeTaxReport: {},
        YearList:[],
        Loading: true,
    },
    reducers: {
        getIncomeTaxReport(state, action) {
            state.GetIncomeTaxReport = action.payload;
            state.Loading = false;
        },
        getAllAcademicYears(state, action) {
            state.YearList = action.payload;
            state.Loading = false;
          },

        getLoading(state, action) {
            state.Loading = true
        }
    }
});

export const getIncomeTaxReport =
(data: IGetITRFileNameBody): AppThunk =>
  async (dispatch) => {
    dispatch(SliceIncomeTaxReport.actions.getLoading(true));
    const response = await ApiIncomeTaxReport.GetIncomeTaxReportApi(data);
    
    dispatch(SliceIncomeTaxReport.actions.getIncomeTaxReport(response.data));
  };
  

  export const getAllAcademicYears =
  (data: GetAllAcademicYearsApiBody): AppThunk =>
    async (dispatch) => {
      dispatch(SliceIncomeTaxReport.actions.getLoading(true));
      const response = await ApiIncomeTaxReport.getAllAcademicYears(data);
      let YearsList =  response.data.GetAllAcademicYears.map((item, index) => {
    return {

     Value:item.Academic_Year_Id,
     Name:item.AcademicYear,
   }
  }) 
  YearsList =[{Value:"0",Name:"All" },...YearsList]
      console.log("YearsList",YearsList)
      dispatch(SliceIncomeTaxReport.actions.getAllAcademicYears(YearsList));
    };

    export const resetReciept =
    (): AppThunk =>
    async (dispatch) => {
      dispatch(SliceIncomeTaxReport.actions.getIncomeTaxReport(""));
    };

export default SliceIncomeTaxReport.reducer;