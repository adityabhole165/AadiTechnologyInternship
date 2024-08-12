import { createSlice } from '@reduxjs/toolkit';
import WeeklyTimeTableApi from 'src/api/WeeklyTimeTable/ApiWeeklyTimeTable';
import { IGetClassTimeTableBody, IGetDataForAdditionalClassesBody, IGetDeleteAdditionalLectureBody, IGetDeleteAdditionalLecturesBody, IGetDivisionForStdDropdownBody, IGetManageClassTimeTableBody, IGetResetTimetableBody, IGetSaveClassTimeTableBody, IGetSaveTeacherTimeTableBody, IGetTeacherAndStandardForTimeTableBody, IGetTeacherSubjectMaxLecDetailsBody, IGetTimeTableForTeacherBody, IGetValidateTeacherDataBody } from 'src/interfaces/WeeklyTimeTable/IWeeklyTimetable';
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
        ISGetSaveClassTimetableMsg: '',
        ISWeekdayId: [],
        ISClassWeekdayId: [],
        ISGetManageClassTimeTableMsg: '',
        ISGetDeleteAdditionalLectureMsg: '',
        ISGetDeleteAdditionalLecturesMsg: '',
        ISAssemblyInfo: [],
        ISMPTinfo: [],
        ISTimetableDetails: [],
        ISAssemblyInfoClass: [],
        ISMPTinfoClass: [],
        ISValidateTeacherData: [],
        Loading: true
    },
    reducers: {
        getLoading(state, action) {
            state.Loading = true;
        },
        RClassWeekdayIds(state, action) {
            state.ISClassWeekdayId = action.payload;
            state.Loading = false;
        },
        RValidateTeacherData(state, action) {
            state.ISValidateTeacherData = action.payload;
            state.Loading = false;
        },
        RClearValidateTeacherData(state) {
            state.ISValidateTeacherData = [];
            state.Loading = false;
        },
        RTimetableDetails(state, action) {
            state.ISTimetableDetails = action.payload;
            state.Loading = false;
        },
        RGetWeekdayId(state, action) {
            state.ISWeekdayId = action.payload;
            state.Loading = false;
        },
        RMPTinfo(state, action) {
            state.ISMPTinfo = action.payload;
            state.Loading = false;
        },
        RAssemblyInfo(state, action) {
            state.ISAssemblyInfo = action.payload;
            state.Loading = false;
        },
        RMPTinfoClass(state, action) {
            state.ISMPTinfoClass = action.payload;
            state.Loading = false;
        },
        RAssemblyInfoClass(state, action) {
            state.ISAssemblyInfoClass = action.payload;
            state.Loading = false;
        },
        RGetSaveTeacherTimetableMsg(state, action) {
            state.ISGetSaveTeacherTimetableMsg = action.payload;
            state.Loading = false;
        },
        RGetSaveClassTimeTableMsg(state, action) {
            state.ISGetSaveClassTimetableMsg = action.payload;
            state.Loading = false;
        },
        ResetSaveClassTimeTableMsg(state,) {
            state.ISGetSaveClassTimetableMsg = '';
            state.Loading = false;
        },
        ResetSaveTeacherTimetableMsg(state) {
            state.ISGetSaveTeacherTimetableMsg = '';
            state.Loading = false;
        },
        RGetDeleteAdditionalLectureMsg(state, action) {
            state.ISGetDeleteAdditionalLectureMsg = action.payload;
            state.Loading = false;
        },
        ResetDeleteAdditionalLectureMsg(state) {
            state.ISGetDeleteAdditionalLectureMsg = '';
            state.Loading = false;
        },
        RGetDeleteAdditionalLecturesMsg(state, action) {
            state.ISGetDeleteAdditionalLecturesMsg = action.payload;
            state.Loading = false;
        },
        ResetDeleteAdditionalLecturesMsg(state) {
            state.ISGetDeleteAdditionalLecturesMsg = '';
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
        },
        RGetManageClassTimeTableMsg(state, action) {
            state.ISGetManageClassTimeTableMsg = action.payload;
            state.Loading = false;
        },
        RClearManageClassTimeTableMsg(state) {
            state.ISGetManageClassTimeTableMsg = '';
            state.Loading = false;
        },
        RClearWeeklyTeacherTimetableValues(state) {
            state.ISGetLectureNoWeekday = [];
            state.Loading = false;
        }
    }
});

export const CDAClearWeeklyTeacherTimetableValues = (): AppThunk => async (dispatch) => {
    dispatch(WeeklyTimeTableSlice.actions.getLoading(true));
    dispatch(WeeklyTimeTableSlice.actions.RClearWeeklyTeacherTimetableValues());
}

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

export const CDAValidateTeacherData =
    (data: IGetValidateTeacherDataBody): AppThunk =>
        async (dispatch) => {
            dispatch(WeeklyTimeTableSlice.actions.getLoading(true));
            const response = await WeeklyTimeTableApi.GetValidateTeacherDataApi(data);
            let responseData = response.data.map((item, i) => {
                return (
                    {
                        Text1: item.ErrMsgForWeeklyTeacherLectures,
                        Text2: item.OverlapErrorMessage,
                        Text3: item.ErrMsgForWeekDayTeacherLectures,
                        Text4: item.ErrMsgForSubjectLectures,
                        Text5: item.ErrMsgForAssociateSubjectLectures,
                        Text6: item.ErrMsgForExternalLectures
                    }
                )
            })
            dispatch(WeeklyTimeTableSlice.actions.RValidateTeacherData(responseData));
        }

export const CDAClearValidateTeacherData =
    (): AppThunk =>
        async (dispatch) => {
            dispatch(WeeklyTimeTableSlice.actions.getLoading(true));
            dispatch(WeeklyTimeTableSlice.actions.RClearValidateTeacherData());
        }

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
            WeekDayList.unshift({ Id: '0', Name: 'Select', Value: '0' })

            let LectureNumberList = response.data.listLectureNumber.map((item) => {
                return (
                    {
                        Id: item.Lecture_Number,
                        Name: item.Lecture_Number,
                        Value: item.Lecture_Number,
                        WeekdayId: item.Weekday_Id
                    }
                )
            })
            LectureNumberList.unshift({ Id: '0', Name: 'Select', Value: '0', WeekdayId: '0' })
            let FilterClassSubjectName = response.data.listClassName.map((item) => {
                return (
                    {
                        stdDivId: item.Standard_Division_Id
                    }
                )
            });

            let SubjectNameList = response.data.listclasssSubjectName.map((item) => {
                return !FilterClassSubjectName.some(filterItem => filterItem.stdDivId === item.Standard_Division_Id) ? {
                    Id: item.Subject_Id,
                    Name: item.classSubjectName,
                    Value: item.Subject_Id,
                    StdDivId: item.Standard_Division_Id
                } : null;
            }).filter(item => item !== null); // Remove null values
            SubjectNameList.unshift({ Id: '0', Name: 'Select', Value: '0', StdDivId: '0' })

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

export const CDADeleteAdditionalLecture =
    (data: IGetDeleteAdditionalLectureBody): AppThunk =>
        async (dispatch) => {
            dispatch(WeeklyTimeTableSlice.actions.getLoading(true));
            const response = await WeeklyTimeTableApi.GetDeleteAdditionalLectureApi(data);
            dispatch(WeeklyTimeTableSlice.actions.RGetDeleteAdditionalLectureMsg(response.data));
        }

export const CDADeleteAdditionalLectures =
    (data: IGetDeleteAdditionalLecturesBody): AppThunk =>
        async (dispatch) => {
            dispatch(WeeklyTimeTableSlice.actions.getLoading(true));
            const response = await WeeklyTimeTableApi.GetDeleteAdditionalLecturesApi(data);
            dispatch(WeeklyTimeTableSlice.actions.RGetDeleteAdditionalLecturesMsg(response.data));
        }

export const CDAResetDeleteAdditionalLecture =
    (): AppThunk =>
        async (dispatch) => {
            dispatch(WeeklyTimeTableSlice.actions.getLoading(true));
            dispatch(WeeklyTimeTableSlice.actions.ResetDeleteAdditionalLectureMsg());
        }

export const CDAResetDeleteAdditionalLectures =
    (): AppThunk =>
        async (dispatch) => {
            dispatch(WeeklyTimeTableSlice.actions.getLoading(true));
            dispatch(WeeklyTimeTableSlice.actions.ResetDeleteAdditionalLecturesMsg());
        }

export const CDAManageClassTimeTable =
    (data: IGetManageClassTimeTableBody): AppThunk =>
        async (dispatch) => {
            dispatch(WeeklyTimeTableSlice.actions.getLoading(true));
            const response = await WeeklyTimeTableApi.GetManageClassTimeTableApi(data);
            dispatch(WeeklyTimeTableSlice.actions.RGetManageClassTimeTableMsg(response.data));
        }

export const CDAClearManageClassTimeTable =
    (): AppThunk =>
        async (dispatch) => {
            dispatch(WeeklyTimeTableSlice.actions.getLoading(true));
            dispatch(WeeklyTimeTableSlice.actions.RClearManageClassTimeTableMsg());
        }

export const CDAGetResetTimetableMsgClear =
    (): AppThunk =>
        async (dispatch) => {
            dispatch(WeeklyTimeTableSlice.actions.getLoading(true));
            dispatch(WeeklyTimeTableSlice.actions.RClearResetTimetableMsg());
        }

export const CDASaveTeacherTimetable =
    (data: IGetSaveTeacherTimeTableBody): AppThunk =>
        async (dispatch, getState) => {
            dispatch(WeeklyTimeTableSlice.actions.getLoading(true));
            // Clear validation messages first
            await dispatch(CDAClearValidateTeacherData());
            // Dispatch the validation action and wait for it to complete
            await dispatch(CDAValidateTeacherData(data));
            // Get the updated validation messages from the state
            const { ISValidateTeacherData } = getState().WeeklyTimetable;
            // Check if there are no validation error messages
            if (ISValidateTeacherData.length === 0) {
                const response = await WeeklyTimeTableApi.GetSaveTeacherTimeTableApi(data);
                dispatch(WeeklyTimeTableSlice.actions.RGetSaveTeacherTimetableMsg(response.data));
            }
        }

export const CDASaveClassTimetable =
    (data: IGetSaveClassTimeTableBody): AppThunk =>
        async (dispatch) => {
            dispatch(WeeklyTimeTableSlice.actions.getLoading(true));
            const response = await WeeklyTimeTableApi.GetSaveClassTimeTableApi(data);
            dispatch(WeeklyTimeTableSlice.actions.RGetSaveClassTimeTableMsg(response.data));
        }

export const ResetSaveClassTimetableMsg =
    (): AppThunk =>
        async (dispatch) => {
            dispatch(WeeklyTimeTableSlice.actions.getLoading(true));
            dispatch(WeeklyTimeTableSlice.actions.ResetSaveClassTimeTableMsg());
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
                        Value: item.Teacher_Subject_Id,
                        StdDivId: item.Standard_Division_Id,
                        SubId: item.Subject_Id,
                        TeacherId: item.Teacher_Id
                    }
                )
            })
            console.log('MONDAY DATA 1 >>>>>>>>>', MondayColData)
            MondayColData.unshift({ Id: '0', Name: 'Select', Value: '0', StdDivId: '0', SubId: '0', TeacherId: '0' });
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
                        Value: item.Teacher_Subject_Id,
                        StdDivId: item.Standard_Division_Id,
                        SubId: item.Subject_Id,
                        TeacherId: item.Teacher_Id
                    }
                )
            })
            TuesdayColData.unshift({ Id: '0', Name: 'Select', Value: '0', StdDivId: '0', SubId: '0', TeacherId: '0' });
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
                        Value: item.Teacher_Subject_Id,
                        StdDivId: item.Standard_Division_Id,
                        SubId: item.Subject_Id,
                        TeacherId: item.Teacher_Id
                    }
                )
            })
            WednesdayColData.unshift({ Id: '0', Name: 'Select', Value: '0', StdDivId: '0', SubId: '0', TeacherId: '0' });
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
                        Value: item.Teacher_Subject_Id,
                        StdDivId: item.Standard_Division_Id,
                        SubId: item.Subject_Id,
                        TeacherId: item.Teacher_Id
                    }
                )
            })
            ThursdayColData.unshift({ Id: '0', Name: 'Select', Value: '0', StdDivId: '0', SubId: '0', TeacherId: '0' });
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
                        Value: item.Teacher_Subject_Id,
                        StdDivId: item.Standard_Division_Id,
                        SubId: item.Subject_Id,
                        TeacherId: item.Teacher_Id
                    }
                )
            })
            FridayColData.unshift({ Id: '0', Name: 'Select', Value: '0', StdDivId: '0', SubId: '0', TeacherId: '0' });
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

            const mptInfo = response.data.Lecture_No_WeekDayMPT.map((item, i) => {
                return (
                    {
                        Text1: item.WeekDay_Name,
                        Text2: item.Lecture_Number
                    }
                )
            });
            const assemblyInfo = response.data.Lecture_No_WeekDayAssembly.map((item, i) => {
                return (
                    {
                        Text1: item.WeekDay_Name,
                        Text2: item.Lecture_Number
                    }
                )
            });

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
            const TimetableDetails = response.data.TimeTableDetails.map((item, i) => {
                return (
                    {
                        Id: item.TeacherId,
                        Text1: item.LectureNumber,
                        Text2: item.WeekDayName,
                        Text3: item.SubjectName,
                        Text4: item.ClassName,
                        Text5: item.SchoolTimeTableDetailId,
                        Text6: item.SubjectId,
                        Text7: item.WeekdayId,
                        Text8: item.TeacherSubjectId,
                        Text9: item.TeacherName,
                        Text10: item.ID
                    }
                )
            })
            console.log('this was the data for the Weekday internal data -- ,', responseData)
            dispatch(WeeklyTimeTableSlice.actions.RGetLectureNoWeekday(responseData))
            dispatch(WeeklyTimeTableSlice.actions.RGetApplicables(ApplicablesData))
            dispatch(WeeklyTimeTableSlice.actions.RGetWeekdayId(WeekDayId))
            dispatch(WeeklyTimeTableSlice.actions.RMPTinfo(mptInfo))
            dispatch(WeeklyTimeTableSlice.actions.RAssemblyInfo(assemblyInfo))
            dispatch(WeeklyTimeTableSlice.actions.RTimetableDetails(TimetableDetails))
        }

// The Following Dispatch is for the Weekday Lecture Retrieval | ON `Class` Selection ✅
export const CDAClassLecNoWeekday =
    (data: IGetClassTimeTableBody): AppThunk =>
        async (dispatch) => {
            dispatch(WeeklyTimeTableSlice.actions.getLoading(true));
            const response = await WeeklyTimeTableApi.GetTimeTableForClassApi(data);
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

            const WeekDayId = response.data.WeekDayIdsForClass.map((item, i) => {
                return (
                    {
                        WeekdayId: item.Weekday_id
                    }
                )
            })
            const WeekDayAssemblyInfo = response.data.Lecture_No_WeekDayAssemblyForClass.map((item, i) => {
                return (
                    {
                        Text1: item.WeekDay_Name,
                        Text2: item.WeekDays_Id,
                        Text3: item.StandardDivision_Id,
                        Text4: item.Lecture_Number
                    }
                )
            })
            const WeekDayMptInfo = response.data.Lecture_No_WeekDayMPTForClass.map((item, i) => {
                return (
                    {
                        Text1: item.WeekDay_Name,
                        Text2: item.WeekDays_Id,
                        Text3: item.StandardDivision_Id,
                        Text4: item.Lecture_Number
                    }
                )
            })
            dispatch(WeeklyTimeTableSlice.actions.RGetClassLecNoWeekday(responseData))
            dispatch(WeeklyTimeTableSlice.actions.RAssemblyInfoClass(WeekDayAssemblyInfo))
            dispatch(WeeklyTimeTableSlice.actions.RMPTinfoClass(WeekDayMptInfo))
            dispatch(WeeklyTimeTableSlice.actions.RClassWeekdayIds(WeekDayId))
        }

export default WeeklyTimeTableSlice.reducer;