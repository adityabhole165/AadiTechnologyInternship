import { createSlice } from '@reduxjs/toolkit';
import ApiIncomeTaxReport from 'src/api/IncomeTaxReport/ApiIncomeTaxReport';
import {
  GetAllAcademicYearsApiBody,
  GetFinancialYearDetailsBody,
  IGetITRFileNameBody
} from 'src/interfaces/Student/IIncomeTaxReport';
import { AppThunk } from 'src/store';

const SliceIncomeTaxReport = createSlice({
  name: 'IncomeTaxReport',
  initialState: {
    GetIncomeTaxReport: '',
    YearList: [],
    GetFinancialYear: [],
    Loading: true
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
    getAllFinancialYears(state, action) {
      state.GetFinancialYear = action.payload;
      state.Loading = false;
    },

    getLoading(state, action) {
      state.Loading = true;
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
    let YearsList = response.data.GetAllAcademicYears.map((item, index) => {
      return {
        Value: item.Academic_Year_Id,
        Name: item.AcademicYear
      };
    });
    YearsList = [{ Value: '0', Name: 'All' }, ...YearsList];

    dispatch(SliceIncomeTaxReport.actions.getAllAcademicYears(YearsList));
  };

export const getAllFinancialYears =
  (data: GetFinancialYearDetailsBody): AppThunk =>
  async (dispatch) => {
    dispatch(SliceIncomeTaxReport.actions.getLoading(true));
    const response = await ApiIncomeTaxReport.getAllFinancialYears(data);

    let FinancialYearsList = response.data.FinancialYears.map((item, index) => {
      return {
        Id: index.toString(),
        Value: item.Year.toString(),
        Name: item.FinancialYearName
      };
    });
    FinancialYearsList = [
      { Id: '0', Value: '0', Name: 'All' },
      ...FinancialYearsList
    ];
    dispatch(
      SliceIncomeTaxReport.actions.getAllFinancialYears(FinancialYearsList)
    );
  };
export const getAllFinancialYearsifAcademic =
  (data: GetFinancialYearDetailsBody): AppThunk =>
  async (dispatch) => {
    dispatch(SliceIncomeTaxReport.actions.getLoading(true));
    const response = await ApiIncomeTaxReport.getAllFinancialYears(data);

    let FinancialYearsList = response.data.FinancialYears.map((item, index) => {
      return {
        Id: index.toString(),
        Value: item.Year.toString(),
        Name: item.FinancialYearName
      };
    });
    dispatch(
      SliceIncomeTaxReport.actions.getAllFinancialYears(FinancialYearsList)
    );
  };

export const resetReciept = (): AppThunk => async (dispatch) => {
  dispatch(SliceIncomeTaxReport.actions.getIncomeTaxReport(''));
};
export default SliceIncomeTaxReport.reducer;
