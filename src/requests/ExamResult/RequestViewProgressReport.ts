import { createSlice } from '@reduxjs/toolkit';
import ApiViewProgressReport from 'src/api/ExamResult/ApiViewProgressReport';
import {
    IGetAllStudentsTestProgressSheetBody
} from 'src/interfaces/ExamResult/IViewProgressReport';
import { AppThunk } from 'src/store';

const ViewProgressReportslice = createSlice({
    name: 'SubjectMark',
    initialState: {
        ListMarksDetiles: [],
        ListStatusDetiles: [],
    },
    reducers: {
        GetMarkDetails(state, action) {
            state.ListMarksDetiles = action.payload.listMarksDetiles;
            state.ListStatusDetiles = action.payload.listStatusDetiles;
        },
    }
});
export const GetMarkDetailss =
    (data: IGetAllStudentsTestProgressSheetBody): AppThunk =>
        async (dispatch) => {
            const response = await ApiViewProgressReport.StudentProgressSheet(data);
            dispatch(ViewProgressReportslice.actions.GetMarkDetails(response.data));
        };

export default ViewProgressReportslice.reducer;