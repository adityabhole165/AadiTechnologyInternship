import { createSlice } from '@reduxjs/toolkit';
import { AppThunk } from 'src/store';
import ApiIncomeTaxReport from 'src/api/IncomeTaxReport/ApiIncomeTaxReport';
import { IGetITRFileNameBody } from 'src/interfaces/Student/IIncomeTaxReport';

const SliceIncomeTaxReport = createSlice({
    name: 'IncomeTaxReport',
    initialState: {
        GetIncomeTaxReport: {},
        Loading: true,
    },
    reducers: {
        getIncomeTaxReport(state, action) {
            state.GetIncomeTaxReport = action.payload;
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
    const response = await ApiIncomeTaxReport.GetIncomeTaxReportApi(data)
    
    dispatch(SliceIncomeTaxReport.actions.getIncomeTaxReport(response.data));
  };
  





export default SliceIncomeTaxReport.reducer;