import { createSlice } from '@reduxjs/toolkit';
import ApiStudentRecordComment from 'src/api/StudentRecords/ApiStudentRecordComment';
import { IGetDeleteCommentBody, IGetSaveandSubmitCommentBody, IGetSaveCommentBody } from 'src/interfaces/StudentRecords/IStudentRecordComment';
import { AppThunk } from 'src/store';

const StudentRecordCommentslice = createSlice({
    name: 'StudentRecordCommentPopup',
    initialState: {
        DeleteCommentMsg: '',
        SaveComment: '',
        SaveandSubmitComment: '',
        Loading: true
    },
    reducers: {
        getDeleteCommentMsg(state, action) {
            state.Loading = false;
            state.DeleteCommentMsg = action.payload;
        },
        resetDeleteCommentDetails(state) {
            state.Loading = false;
            state.DeleteCommentMsg = '';
        },
        getSaveComment(state, action) {
            state.Loading = false;
            state.SaveComment = action.payload;
        },
        resetSaveComment(state) {
            state.SaveComment = '';
        },
        getSaveandSubmitComment(state, action) {
            state.Loading = false;
            state.SaveandSubmitComment = action.payload;
        },
        resetSaveandSubmitComment(state) {
            state.SaveandSubmitComment = '';
        },
        getLoading(state, action) {
            state.Loading = true;
        }
    }
});

export const DeleteCommentDetails = (data: IGetDeleteCommentBody): AppThunk => async (dispatch) => {
    dispatch(StudentRecordCommentslice.actions.getLoading(true));
    const response = await ApiStudentRecordComment.GetDeleteComment(data);
    dispatch(StudentRecordCommentslice.actions.getDeleteCommentMsg(response.data));
};

export const resetDeleteHolidayDetails = (): AppThunk => async (dispatch) => {
    dispatch(StudentRecordCommentslice.actions.resetDeleteCommentDetails());
};

export const getSaveComment =
    (data: IGetSaveCommentBody): AppThunk =>
        async (dispatch) => {
            dispatch(StudentRecordCommentslice.actions.getLoading(true));
            const response = await ApiStudentRecordComment.SaveComment(data);
            dispatch(StudentRecordCommentslice.actions.getSaveComment(response.data))
        }

export const resetSaveComment =
    (): AppThunk =>
        async (dispatch) => {
            dispatch(StudentRecordCommentslice.actions.resetSaveComment())
        }

export const getSaveandSubmitComment =
    (data: IGetSaveandSubmitCommentBody): AppThunk =>
        async (dispatch) => {
            dispatch(StudentRecordCommentslice.actions.getLoading(true));
            const response = await ApiStudentRecordComment.SaveandSubmitComment(data);
            dispatch(StudentRecordCommentslice.actions.getSaveandSubmitComment(response.data))
        }

export const resetSaveandSubmitComment =
    (): AppThunk =>
        async (dispatch) => {
            dispatch(StudentRecordCommentslice.actions.resetSaveandSubmitComment())
        }

export default StudentRecordCommentslice.reducer;
