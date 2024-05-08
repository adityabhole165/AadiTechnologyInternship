import { createSlice } from '@reduxjs/toolkit';
import ApiViewProgressReport from 'src/api/ExamResult/ApiViewProgressReport';
import {
    IGetAllStudentsTestProgressSheetBody
} from 'src/interfaces/ExamResult/IViewProgressReport';
import { AppThunk } from 'src/store';

const ViewProgressReportslice = createSlice({
    name: 'SubjectMark',
    initialState: {
        listMarksDetiles: [],
    },
    reducers: {
        GetMarkDetails(state, action) {
            state.listMarksDetiles = action.payload;
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