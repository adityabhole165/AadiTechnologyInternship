import { createSlice } from '@reduxjs/toolkit';
import WeeklyTimeTableApi from 'src/api/WeeklyTimeTable/ApiWeeklyTimeTable';
import { IGetClassTimeTableBody, IGetDataForAdditionalClassesBody, IGetDivisionForStdDropdownBody, IGetResetTimetableBody, IGetSaveTeacherTimeTableBody, IGetTeacherAndStandardForTimeTableBody, IGetTeacherSubjectMaxLecDetailsBody, IGetTimeTableForTeacherBody } from 'src/interfaces/WeeklyTimeTable/IWeeklyTimetable';
import { AppThunk } from 'src/store';

// CONVENTIONS / SHORTFORM PRE-FIX > IS (INITIAL STATE) | R (REDUCER) | CDA (CONTROL DISPATCH ACTION) XD

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
        ISGetLectureNoWeekday: [],
        ISGetApplicables: [],
        ISGetClassLecNoWeekday: [],
        ISGetSaveTeacherTimetableMsg: '',
        ISWeekdayId: [],
        Loading: true
    },
    reducers: {
        getLoading(state, action) {
            state.Loading = true;
        },
        RGetWeekdayId(state, action) {
            state.ISWeekdayId = action.payload;
            state.Loading = false;
        },
        RGetSaveTeacherTimetableMsg(state, action) {
            state.ISGetSaveTeacherTimetableMsg = action.payload;
            state.Loading = false;
        },
        ResetSaveTeacherTimetableMsg(state) {
            state.ISGetSaveTeacherTimetableMsg = '';
            state.Loading = false;
        },
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
        },
        RGetLectureNoWeekday(state, action) {
            state.ISGetLectureNoWeekday = action.payload;
            state.Loading = false;
        },
        RGetApplicables(state, action) {
            state.ISGetApplicables = action.payload;
            state.Loading = false;
        },
        RGetClassLecNoWeekday(state, action) {
            state.ISGetClassLecNoWeekday = action.payload;
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

export const CDASaveTeacherTimetable =
    (data: IGetSaveTeacherTimeTableBody): AppThunk =>
        async (dispatch) => {
            dispatch(WeeklyTimeTableSlice.actions.getLoading(true));
            const response = await WeeklyTimeTableApi.GetSaveTeacherTimeTableApi(data);
            dispatch(WeeklyTimeTableSlice.actions.RGetSaveTeacherTimetableMsg(response.data));
        }

export const ResetSaveTeacherTimetableMsg =
    (): AppThunk =>
        async (dispatch) => {
            dispatch(WeeklyTimeTableSlice.actions.getLoading(true));
            dispatch(WeeklyTimeTableSlice.actions.ResetSaveTeacherTimetableMsg());
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
            console.log('MONDAY DATA 0 >>>>>>>>>', response);
            // Data Separator f() on Teacher / Class Selection
            function dataSeparator(x) {
                let str = x;
                if (data.asStandardDivId === 0) {
                    str = str.split(':')[0]
                }
                if (data.asStandardDivId !== 0) {
                    str = str.split(':')[1]
                }
                return str
            }
            const MondayColData = response.data.TeacherSubjectMaxLecDetails.map((item, i) => {
                return (
                    {
                        Id: item.Teacher_Subject_Id,
                        Name: dataSeparator(`${item.classSubjectName}:${item.Teacher_Subject}`),
                        Value: item.Teacher_Subject_Id
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
            // Data Separator f() on Teacher / Class Selection
            function dataSeparator(x) {
                let str = x;
                if (data.asStandardDivId === 0) {
                    str = str.split(':')[0]
                }
                if (data.asStandardDivId !== 0) {
                    str = str.split(':')[1]
                }
                return str
            }
            const TuesdayColData = response.data.TeacherSubjectMaxLecDetails.map((item, i) => {
                return (
                    {
                        Id: item.Teacher_Subject_Id,
                        Name: dataSeparator(`${item.classSubjectName}:${item.Teacher_Subject}`),
                        Value: item.Teacher_Subject_Id
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
            // Data Separator f() on Teacher / Class Selection
            function dataSeparator(x) {
                let str = x;
                if (data.asStandardDivId === 0) {
                    str = str.split(':')[0]
                }
                if (data.asStandardDivId !== 0) {
                    str = str.split(':')[1]
                }
                return str
            }
            const WednesdayColData = response.data.TeacherSubjectMaxLecDetails.map((item, i) => {
                return (
                    {
                        Id: item.Teacher_Subject_Id,
                        Name: dataSeparator(`${item.classSubjectName}:${item.Teacher_Subject}`),
                        Value: item.Teacher_Subject_Id
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
            // Data Separator f() on Teacher / Class Selection
            function dataSeparator(x) {
                let str = x;
                if (data.asStandardDivId === 0) {
                    str = str.split(':')[0]
                }
                if (data.asStandardDivId !== 0) {
                    str = str.split(':')[1]
                }
                return str
            }
            const ThursdayColData = response.data.TeacherSubjectMaxLecDetails.map((item, i) => {
                return (
                    {
                        Id: item.Teacher_Subject_Id,
                        Name: dataSeparator(`${item.classSubjectName}:${item.Teacher_Subject}`),
                        Value: item.Teacher_Subject_Id
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
            console.log('this was the data for the list of table dropdown,', data)
            // Data Separator f() on Teacher / Class Selection
            function dataSeparator(x) {
                let str = x;
                if (data.asStandardDivId === 0) {
                    str = str.split(':')[0]
                }
                if (data.asStandardDivId !== 0) {
                    str = str.split(':')[1]
                }
                return str
            }
            const FridayColData = response.data.TeacherSubjectMaxLecDetails.map((item, i) => {
                return (
                    {
                        Id: item.Teacher_Subject_Id,
                        Name: dataSeparator(`${item.classSubjectName}:${item.Teacher_Subject}`),
                        Value: item.Teacher_Subject_Id
                    }
                )
            })
            FridayColData.unshift({ Id: '0', Name: 'Select', Value: '0' });
            dispatch(WeeklyTimeTableSlice.actions.RGetTeacherSubjectMaxLecForFri(FridayColData))
        }

// The Following Dispatch is for the Weekday Lecture Retrieval | ON `Teacher` Selection ✅
export const CDAGetLectureNoWeekday =
    (data: IGetTimeTableForTeacherBody): AppThunk =>
        async (dispatch) => {
            dispatch(WeeklyTimeTableSlice.actions.getLoading(true));
            const response = await WeeklyTimeTableApi.GetTimeTableForTeacherApi(data);
            console.log('this was the data for the Weekday internal data,', response)
            const responseData = response.data.Lecture_No_WeekDay.map((item, i) => {
                return (
                    {
                        Text1: item.Lecture_No,
                        Text2: item.Monday,
                        Text3: item.Tuesday,
                        Text4: item.Wednesday,
                        Text5: item.Thursday,
                        Text6: item.Friday
                    }
                )
            })

            const WeekDayId = response.data.WeekDayIds.map((item, i) => {
                return (
                    {
                        WeekdayId: item.Weekday_id
                    }
                )
            })
            const ApplicablesData = response.data.Applicable.map((item, i) => {
                return (
                    {
                        MPT: item.MPT_Applicable,
                        Assembly: item.Assembly_Applicable,
                        Stayback: item.Stayback_Applicable,
                        Weeklytest: item.WeeklyTestApplicable
                    }
                )
            })
            console.log('this was the data for the Weekday internal data -- ,', responseData)
            dispatch(WeeklyTimeTableSlice.actions.RGetLectureNoWeekday(responseData))
            dispatch(WeeklyTimeTableSlice.actions.RGetApplicables(ApplicablesData))
            dispatch(WeeklyTimeTableSlice.actions.RGetWeekdayId(WeekDayId))
        }

// The Following Dispatch is for the Weekday Lecture Retrieval | ON `Class` Selection ✅
export const CDAClassLecNoWeekday =
    (data: IGetClassTimeTableBody): AppThunk =>
        async (dispatch) => {
            dispatch(WeeklyTimeTableSlice.actions.getLoading(true));
            const response = await WeeklyTimeTableApi.GetTimeTableForClassApi(data);
            console.log('this was the data for the Weekday internal data', response)
            const responseData = response.data.Lecture_No_WeekDayForClass.map((item, i) => {
                return (
                    {
                        Text1: item.Lecture_No,
                        Text2: item.Monday,
                        Text3: item.Tuesday,
                        Text4: item.Wednesday,
                        Text5: item.Thursday,
                        Text6: item.Friday
                    }
                )
            })
            console.log('this was the data for the Weekday internal data for CLASSSSS.... -- ,', responseData)
            dispatch(WeeklyTimeTableSlice.actions.RGetClassLecNoWeekday(responseData))
        }

export default WeeklyTimeTableSlice.reducer;