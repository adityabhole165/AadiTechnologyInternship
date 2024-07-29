import { createSlice } from '@reduxjs/toolkit';
import WeeklyTimeTableApi from 'src/api/WeeklyTimeTable/ApiWeeklyTimeTable';
import { IGetDataForAdditionalClassesBody, IGetDivisionForStdDropdownBody, IGetResetTimetableBody, IGetTeacherAndStandardForTimeTableBody, IGetTeacherSubjectMaxLecDetailsBody } from 'src/interfaces/WeeklyTimeTable/IWeeklyTimetable';
import { AppThunk } from 'src/store';

const WeeklyTimeTableSlice = createSlice({
    name: 'WeeklyTimeTable',
    initialState: {
        ISTeachersList: [],
        ISAddClassesWeekDay: [],
        ISAddClassesLectureNumber: [],
        ISAddClassesSubjectName: [],
        ISResetTimetableMsg: '',
        ISGetStandardName: [],
        ISGetDivisionName: [],
        ISGetTeacherSubjectMaxLecForMon: [],
        ISGetTeacherSubjectMaxLecForTue: [],
        ISGetTeacherSubjectMaxLecForWed: [],
        ISGetTeacherSubjectMaxLecForThu: [],
        ISGetTeacherSubjectMaxLecForFri: [],
        Loading: true
    },
    reducers: {
        RGetTeachersList(state, action) {
            state.ISTeachersList = action.payload;
            state.Loading = false;
        },
        RGetDivisionName(state, action) {
            state.ISGetDivisionName = action.payload;
        },
        RAddClassesWeekDay(state, action) {
            state.ISAddClassesWeekDay = action.payload;
            state.Loading = false;
        },
        RAddClassesLectureNumber(state, action) {
            state.ISAddClassesLectureNumber = action.payload;
            state.Loading = false;
        },
        RAddClassesSubjectName(state, action) {
            state.ISAddClassesSubjectName = action.payload;
            state.Loading = false;
        },
        RGetResetTimetableMsg(state, action) {
            state.ISResetTimetableMsg = action.payload;
            state.Loading = false;
        },
        RClearResetTimetableMsg(state) {
            state.ISResetTimetableMsg = '';
            state.Loading = false;
        },
        getLoading(state, action) {
            state.Loading = true;
        },
        RGetStandardName(state, action) {
            state.ISGetStandardName = action.payload;
            state.Loading = false;
        },
        RGetTeacherSubjectMaxLecForMon(state, action) {
            state.ISGetTeacherSubjectMaxLecForMon = action.payload;
            state.Loading = false;
        },
        RGetTeacherSubjectMaxLecForTue(state, action) {
            state.ISGetTeacherSubjectMaxLecForTue = action.payload;
            state.Loading = false;
        },
        RGetTeacherSubjectMaxLecForWed(state, action) {
            state.ISGetTeacherSubjectMaxLecForWed = action.payload;
            state.Loading = false;
        },
        RGetTeacherSubjectMaxLecForThu(state, action) {
            state.ISGetTeacherSubjectMaxLecForThu = action.payload;
            state.Loading = false;
        },
        RGetTeacherSubjectMaxLecForFri(state, action) {
            state.ISGetTeacherSubjectMaxLecForFri = action.payload;
            state.Loading = false;
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

export const CDAGetStandardNameList =
    (data: IGetTeacherAndStandardForTimeTableBody): AppThunk =>
        async (dispatch) => {
            dispatch(WeeklyTimeTableSlice.actions.getLoading(true));
            const response = await WeeklyTimeTableApi.GetTeacherAndStandardForTimeTableApi(data);
            const responseData = response.data.listStandardNameDetiles.map((item) => {
                return (
                    {
                        Id: item.Standard_Id,
                        Name: item.Standard_Name,
                        Value: item.Standard_Id
                    }
                )
            })
            responseData.unshift({ Id: '0', Name: 'Select', Value: '0' })
            dispatch(WeeklyTimeTableSlice.actions.RGetStandardName(responseData));
        };


export const CDAGetDataForAdditionalClasses =
    (data: IGetDataForAdditionalClassesBody): AppThunk =>
        async (dispatch) => {
            dispatch(WeeklyTimeTableSlice.actions.getLoading(true));
            const response = await WeeklyTimeTableApi.GetDataForAdditionalClassesApi(data);
            console.log(response.data)
            let WeekDayList = response.data.listWeekDayName.map((item) => {
                return (
                    {
                        Id: item.Weekday_Id,
                        Name: item.WeekDay_Name,
                        Value: item.Weekday_Id
                    }
                )
            })

            let LectureNumberList = response.data.listLectureNumber.map((item) => {
                return (
                    {
                        Id: item.Lecture_Number,
                        Name: item.Lecture_Number,
                        Value: item.Lecture_Number
                    }
                )
            })

            let SubjectNameList = response.data.listclasssSubjectName.map((item) => {
                return (
                    {
                        Id: item.Subject_Id,
                        Name: item.classSubjectName,
                        Value: item.Subject_Id
                    }
                )
            })

            dispatch(WeeklyTimeTableSlice.actions.RAddClassesLectureNumber(LectureNumberList));
            dispatch(WeeklyTimeTableSlice.actions.RAddClassesWeekDay(WeekDayList));
            dispatch(WeeklyTimeTableSlice.actions.RAddClassesSubjectName(SubjectNameList));
        }

export const CDAResetTimetable =
    (data: IGetResetTimetableBody): AppThunk =>
        async (dispatch) => {
            dispatch(WeeklyTimeTableSlice.actions.getLoading(true));
            const response = await WeeklyTimeTableApi.GetResetTimetableApi(data);
            dispatch(WeeklyTimeTableSlice.actions.RGetResetTimetableMsg(response.data));
        }
export const CDAGetResetTimetableMsgClear =
    (): AppThunk =>
        async (dispatch) => {
            dispatch(WeeklyTimeTableSlice.actions.getLoading(true));
            dispatch(WeeklyTimeTableSlice.actions.RClearResetTimetableMsg());
        }

export const CDAGetDivisionName =
    (data: IGetDivisionForStdDropdownBody): AppThunk =>
        async (dispatch) => {
            dispatch(WeeklyTimeTableSlice.actions.getLoading(true));
            const response = await WeeklyTimeTableApi.GetDivisionForStdDropdownApi(data);
            console.log(`this is division response`, response)
            const responseData = response.data.map((item) => {
                return (
                    {
                        Id: item.SchoolWise_Standard_Division_Id,
                        Name: item.division_name,
                        Value: item.SchoolWise_Standard_Division_Id
                    }
                )
            })
            console.log(`this is division response after formatting`, responseData)
            responseData.unshift({ Id: '0', Name: 'Select', Value: '0' })
            dispatch(WeeklyTimeTableSlice.actions.RGetDivisionName(responseData));

        }

// For Monday 
export const CDAGetTeacherSubjectMaxLecDetailsForMon =
    (data: IGetTeacherSubjectMaxLecDetailsBody): AppThunk =>
        async (dispatch) => {
            dispatch(WeeklyTimeTableSlice.actions.getLoading(true));
            const response = await WeeklyTimeTableApi.GetTeacherSubjectMaxLecDetailsApi(data);
            console.log('MONDAY DATA 0 >>>>>>>>>', response)
            const MondayColData = response.data.TeacherSubjectMaxLecDetails.map((item, i) => {
                return (
                    {
                        Id: item.Standard_Division_Id,
                        Name: item.classSubjectName,
                        Value: item.Standard_Division_Id
                    }
                )
            })
            console.log('MONDAY DATA 1 >>>>>>>>>', MondayColData)
            MondayColData.unshift({ Id: '0', Name: 'Select', Value: '0' });
            dispatch(WeeklyTimeTableSlice.actions.RGetTeacherSubjectMaxLecForMon(MondayColData))
        }

// For Tuesday
export const CDAGetTeacherSubjectMaxLecDetailsForTue =
    (data: IGetTeacherSubjectMaxLecDetailsBody): AppThunk =>
        async (dispatch) => {
            dispatch(WeeklyTimeTableSlice.actions.getLoading(true));
            const response = await WeeklyTimeTableApi.GetTeacherSubjectMaxLecDetailsApi(data);
            const TuesdayColData = response.data.TeacherSubjectMaxLecDetails.map((item, i) => {
                return (
                    {
                        Id: item.Standard_Division_Id,
                        Name: item.classSubjectName,
                        Value: item.Standard_Division_Id
                    }
                )
            })
            TuesdayColData.unshift({ Id: '0', Name: 'Select', Value: '0' });
            dispatch(WeeklyTimeTableSlice.actions.RGetTeacherSubjectMaxLecForTue(TuesdayColData))
        }
// For Wednesday
export const CDAGetTeacherSubjectMaxLecDetailsForWed =
    (data: IGetTeacherSubjectMaxLecDetailsBody): AppThunk =>
        async (dispatch) => {
            dispatch(WeeklyTimeTableSlice.actions.getLoading(true));
            const response = await WeeklyTimeTableApi.GetTeacherSubjectMaxLecDetailsApi(data);
            const WednesdayColData = response.data.TeacherSubjectMaxLecDetails.map((item, i) => {
                return (
                    {
                        Id: item.Standard_Division_Id,
                        Name: item.classSubjectName,
                        Value: item.Standard_Division_Id
                    }
                )
            })
            WednesdayColData.unshift({ Id: '0', Name: 'Select', Value: '0' });
            dispatch(WeeklyTimeTableSlice.actions.RGetTeacherSubjectMaxLecForWed(WednesdayColData))
        }

// For Thursday
export const CDAGetTeacherSubjectMaxLecDetailsForThu =
    (data: IGetTeacherSubjectMaxLecDetailsBody): AppThunk =>
        async (dispatch) => {
            dispatch(WeeklyTimeTableSlice.actions.getLoading(true));
            const response = await WeeklyTimeTableApi.GetTeacherSubjectMaxLecDetailsApi(data);
            const ThursdayColData = response.data.TeacherSubjectMaxLecDetails.map((item, i) => {
                return (
                    {
                        Id: item.Standard_Division_Id,
                        Name: item.classSubjectName,
                        Value: item.Standard_Division_Id
                    }
                )
            })
            ThursdayColData.unshift({ Id: '0', Name: 'Select', Value: '0' });
            dispatch(WeeklyTimeTableSlice.actions.RGetTeacherSubjectMaxLecForThu(ThursdayColData))
        }

// For Friday
export const CDAGetTeacherSubjectMaxLecDetailsForFri =
    (data: IGetTeacherSubjectMaxLecDetailsBody): AppThunk =>
        async (dispatch) => {
            dispatch(WeeklyTimeTableSlice.actions.getLoading(true));
            const response = await WeeklyTimeTableApi.GetTeacherSubjectMaxLecDetailsApi(data);
            const FridayColData = response.data.TeacherSubjectMaxLecDetails.map((item, i) => {
                return (
                    {
                        Id: item.Standard_Division_Id,
                        Name: item.classSubjectName,
                        Value: item.Standard_Division_Id
                    }
                )
            })
            FridayColData.unshift({ Id: '0', Name: 'Select', Value: '0' });
            dispatch(WeeklyTimeTableSlice.actions.RGetTeacherSubjectMaxLecForFri(FridayColData))
        }



export default WeeklyTimeTableSlice.reducer;