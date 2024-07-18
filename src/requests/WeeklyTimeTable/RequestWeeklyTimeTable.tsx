import { createSlice } from '@reduxjs/toolkit';
import WeeklyTimeTableApi from 'src/api/WeeklyTimeTable/ApiWeeklyTimeTable';
import { IGetTeacherAndStandardForTimeTableBody } from 'src/interfaces/WeeklyTimeTable/IWeeklyTimetable';
import { AppThunk } from 'src/store';

const WeeklyTimeTableSlice = createSlice({
    name: 'WeeklyTimeTable',
    initialState: {
        ISTeachersList: [],
        Loading: true
    },
    reducers: {
        RGetTeachersList(state, action) {
            state.ISTeachersList = action.payload;
            state.Loading = false;
        },
        getLoading(state, action) {
            state.Loading = true;

        }

    }
});

export const CDAGetTeachersList =
    (data: IGetTeacherAndStandardForTimeTableBody): AppThunk =>
        async (dispatch) => {
            dispatch(WeeklyTimeTableSlice.actions.getLoading(true));
            const response = await WeeklyTimeTableApi.GetTeacherAndStandardForTimeTableApi(data);
            const responseData = response.data.listTeacherNameDetiles.map((item) => {
                return (
                    {
                        Id: item.Teacher_Id,
                        Name: item.TeacherName,
                        Value: item.Teacher_Id
                    }
                )
            })
            responseData.unshift({ Id: '0', Name: 'Select', Value: '0' })
            dispatch(WeeklyTimeTableSlice.actions.RGetTeachersList(responseData));
        };


export default WeeklyTimeTableSlice.reducer;