import { createSlice } from '@reduxjs/toolkit';
import WeeklyTimeTableApi from 'src/api/WeeklyTimeTable/ApiWeeklyTimeTable';
import { GetScreenPermission } from 'src/components/Common/Util';
import { IGetClassTimeTableBody, IGetDataForAdditionalClassesBody, IGetDeleteAdditionalLectureBody, IGetDeleteAdditionalLecturesBody, IGetDivisionForStdDropdownBody, IGetManageClassTimeTableBody, IGetResetTimetableBody, IGetSaveClassTimeTableBody, IGetSaveTeacherTimeTableBody, IGetTeacherAndStandardForTimeTableBody, IGetTeacherSubjectMaxLecDetailsBody, IGetTimeTableForTeacherBody, IGetValidateDataForClassBody, IGetValidateTeacherDataBody } from 'src/interfaces/WeeklyTimeTable/IWeeklyTimetable';
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
        ISAddLecForClass: [],
        ISAssemblyInfo: [],
        ISMPTinfo: [],
        ISStayBackInfo: [],
        ISWeeklytestInfo: [],
        ISTimetableDetails: [],
        ISAssemblyInfoClass: [],
        ISMPTinfoClass: [],
        ISStaybackClass: [],
        ISWeeklytestClass: [],
        ISValidateTeacherData: [],
        ISValidateClassData: [],
        ISExtLectCount: '',
        Loading: true
    },
    reducers: {
        getLoading(state, action) {
            state.Loading = true;
        },
        RAddLecForClass(state, action) {
            state.ISAddLecForClass = action.payload;
            state.Loading = false;
        },
        RExtLectCount(state, action) {
            state.ISExtLectCount = action.payload;
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
        RValidateClassData(state, action) {
            state.ISValidateClassData = action.payload;
            state.Loading = false;
        },
        RClearValidateClassData(state) {
            state.ISValidateClassData = [];
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
        RStayBackinfo(state, action) {
            state.ISStayBackInfo = action.payload;
            state.Loading = false;
        },
        RWeeklytestInfo(state, action) {
            state.ISWeeklytestInfo = action.payload;
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
        RStaybackinfoClass(state, action) {
            state.ISStaybackClass = action.payload;
            state.Loading = false;
        },
        RWeeklytestClass(state, action) {
            state.ISWeeklytestClass = action.payload;
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
            // state.Loading = false;
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
        RClearTeacherSubjectMaxLecForMon(state) {
            state.ISGetTeacherSubjectMaxLecForMon = [];
            state.Loading = false;
        },
        RGetTeacherSubjectMaxLecForTue(state, action) {
            state.ISGetTeacherSubjectMaxLecForTue = action.payload;
            state.Loading = false;
        },
        RClearTeacherSubjectMaxLecForTue(state) {
            state.ISGetTeacherSubjectMaxLecForTue = [];
            state.Loading = false;
        },
        RGetTeacherSubjectMaxLecForWed(state, action) {
            state.ISGetTeacherSubjectMaxLecForWed = action.payload;
            state.Loading = false;
        },
        RClearTeacherSubjectMaxLecForWed(state) {
            state.ISGetTeacherSubjectMaxLecForWed = [];
            state.Loading = false;
        },
        RGetTeacherSubjectMaxLecForThu(state, action) {
            state.ISGetTeacherSubjectMaxLecForThu = action.payload;
            state.Loading = false;
        },
        RClearTeacherSubjectMaxLecForThu(state) {
            state.ISGetTeacherSubjectMaxLecForThu = [];
            state.Loading = false;
        },
        RGetTeacherSubjectMaxLecForFri(state, action) {
            state.ISGetTeacherSubjectMaxLecForFri = action.payload;
            state.Loading = false;
        },
        RClearTeacherSubjectMaxLecForFri(state) {
            state.ISGetTeacherSubjectMaxLecForFri = [];
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
        },
        RClearWeeklyClassTimetableValues(state) {
            state.ISGetClassLecNoWeekday = [];
            state.Loading = false;
        }
    }
});

export const CDAClearWeeklyTeacherTimetableValues = (): AppThunk => async (dispatch) => {
    dispatch(WeeklyTimeTableSlice.actions.getLoading(true));
    dispatch(WeeklyTimeTableSlice.actions.RClearWeeklyTeacherTimetableValues());
}
export const CDAClearWeeklyClassTimetableValues = (): AppThunk => async (dispatch) => {
    dispatch(WeeklyTimeTableSlice.actions.getLoading(true));
    dispatch(WeeklyTimeTableSlice.actions.RClearWeeklyClassTimetableValues());
}

export const CDAGetTeachersList =
    (data: IGetTeacherAndStandardForTimeTableBody): AppThunk =>
        async (dispatch) => {
            dispatch(WeeklyTimeTableSlice.actions.getLoading(true));
            const response = await WeeklyTimeTableApi.GetTeacherAndStandardForTimeTableApi(data);
            let responseData = response.data.listTeacherNameDetiles.map((item) => {
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

export const CDAValidateClassData =
    (data: IGetValidateDataForClassBody): AppThunk =>
        async (dispatch) => {
            dispatch(WeeklyTimeTableSlice.actions.getLoading(true));
            const response = await WeeklyTimeTableApi.GetValidateClassDataApi(data);
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
            dispatch(WeeklyTimeTableSlice.actions.RValidateClassData(responseData));
        }

export const CDAClearValidateClassData =
    (): AppThunk =>
        async (dispatch) => {
            dispatch(WeeklyTimeTableSlice.actions.getLoading(true));
            dispatch(WeeklyTimeTableSlice.actions.RClearValidateClassData());
        }

export const CDAGetDataForAdditionalClasses =
    (data: IGetDataForAdditionalClassesBody): AppThunk =>
        async (dispatch) => {
            dispatch(WeeklyTimeTableSlice.actions.getLoading(true));
            const response = await WeeklyTimeTableApi.GetDataForAdditionalClassesApi(data);
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

export const CDAMutedDeleteAdditionalLectures =
    (data: IGetDeleteAdditionalLecturesBody): AppThunk =>
        async (dispatch) => {
            const response = await WeeklyTimeTableApi.GetDeleteAdditionalLecturesApi(data);
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
            // Check if there are no validation error messages and if so, proceed to save the data
            if (ISValidateTeacherData.length === 0) {
                const response = await WeeklyTimeTableApi.GetSaveTeacherTimeTableApi(data);
                dispatch(WeeklyTimeTableSlice.actions.RGetSaveTeacherTimetableMsg(response.data));
            }
        }

export const CDASaveTeacherTimetableWithIncr =
    (data: IGetSaveTeacherTimeTableBody): AppThunk =>
        async (dispatch) => {
            dispatch(WeeklyTimeTableSlice.actions.getLoading(true));
            const response = await WeeklyTimeTableApi.GetSaveTeacherTimeTableApi(data);
            // Clear validation messages first
            await dispatch(WeeklyTimeTableSlice.actions.RGetSaveTeacherTimetableMsg(response.data));
            await dispatch(CDAClearValidateTeacherData());
        }

export const CDASaveClassTimetableWithIncr =
    (data: IGetSaveClassTimeTableBody): AppThunk =>
        async (dispatch) => {
            dispatch(WeeklyTimeTableSlice.actions.getLoading(true));
            const response = await WeeklyTimeTableApi.GetSaveClassTimeTableApi(data);
            // Clear validation messages first
            await dispatch(WeeklyTimeTableSlice.actions.RGetSaveClassTimeTableMsg(response.data));
            await dispatch(CDAClearValidateClassData());
        }

export const CDASaveClassTimetable =
    (data: IGetSaveClassTimeTableBody): AppThunk =>
        async (dispatch, getState) => {
            dispatch(WeeklyTimeTableSlice.actions.getLoading(true));
            // Clear validation messages first
            await dispatch(CDAClearValidateClassData());
            // Dispatch the validation action and wait for it to complete
            await dispatch(CDAValidateClassData(data));
            // Get the updated validation messages from the state
            const { ISValidateClassData } = getState().WeeklyTimetable;
            // Check if there are no validation error messages and if so, proceed to save the data
            if (ISValidateClassData.length === 0) {
                const response = await WeeklyTimeTableApi.GetSaveClassTimeTableApi(data);
                dispatch(WeeklyTimeTableSlice.actions.RGetSaveClassTimeTableMsg(response.data));
            }
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
            // dispatch(WeeklyTimeTableSlice.actions.getLoading(true));
            const response = await WeeklyTimeTableApi.GetDivisionForStdDropdownApi(data);
            let responseData = response.data.map((item) => {
                return (
                    {
                        Id: item.SchoolWise_Standard_Division_Id,
                        Name: item.division_name,
                        Value: item.SchoolWise_Standard_Division_Id
                    }
                )
            });
            const UserRoleId = sessionStorage.getItem('RoleId');
            const IsWeeklyTimetableFullAccess = GetScreenPermission('Weekly Timetable');
            let StdDivId = sessionStorage.getItem('StandardDivisionId');
            // 🙋‍♂️ TO BE UNCOMMENTED BEFORE FINAL TESTING ⚡
            if (UserRoleId === '2' && IsWeeklyTimetableFullAccess === 'N') {
                responseData = responseData.filter(item => item.Id === StdDivId);
            }
            responseData.unshift({ Id: '0', Name: 'Select', Value: '0' })
            dispatch(WeeklyTimeTableSlice.actions.RGetDivisionName(responseData));

        }

// For Monday 
export const CDAGetTeacherSubjectMaxLecDetailsForMon =
    (data: IGetTeacherSubjectMaxLecDetailsBody): AppThunk =>
        async (dispatch) => {
            dispatch(WeeklyTimeTableSlice.actions.getLoading(true));
            await dispatch(WeeklyTimeTableSlice.actions.RClearTeacherSubjectMaxLecForMon());
            const response = await WeeklyTimeTableApi.GetTeacherSubjectMaxLecDetailsApi(data);
            const MondayColData = response.data.TeacherSubjectMaxLecDetails.map((item, i) => {
                return (
                    {
                        Id: item.Teacher_Subject_Id,
                        Name: data.asStandardDivId === 0 ? item.classSubjectName : item.Teacher_Subject,
                        Value: item.Teacher_Subject_Id,
                        StdDivId: item.Standard_Division_Id,
                        SubId: item.Subject_Id,
                        TeacherId: item.Teacher_Id,
                        MaxDayLec: item.maxDaylectures
                    }
                )
            })
            MondayColData.unshift({ Id: '0', Name: 'Select', Value: '0', StdDivId: '0', SubId: '0', TeacherId: '0', MaxDayLec: '0' });
            dispatch(WeeklyTimeTableSlice.actions.RGetTeacherSubjectMaxLecForMon(MondayColData))
        }

// For Tuesday
export const CDAGetTeacherSubjectMaxLecDetailsForTue =
    (data: IGetTeacherSubjectMaxLecDetailsBody): AppThunk =>
        async (dispatch) => {
            dispatch(WeeklyTimeTableSlice.actions.getLoading(true));
            await dispatch(WeeklyTimeTableSlice.actions.RClearTeacherSubjectMaxLecForTue());
            const response = await WeeklyTimeTableApi.GetTeacherSubjectMaxLecDetailsApi(data);
            const TuesdayColData = response.data.TeacherSubjectMaxLecDetails.map((item, i) => {
                return (
                    {
                        Id: item.Teacher_Subject_Id,
                        Name: data.asStandardDivId === 0 ? item.classSubjectName : item.Teacher_Subject,
                        Value: item.Teacher_Subject_Id,
                        StdDivId: item.Standard_Division_Id,
                        SubId: item.Subject_Id,
                        TeacherId: item.Teacher_Id,
                        MaxDayLec: item.maxDaylectures
                    }
                )
            })
            TuesdayColData.unshift({ Id: '0', Name: 'Select', Value: '0', StdDivId: '0', SubId: '0', TeacherId: '0', MaxDayLec: '0' });
            dispatch(WeeklyTimeTableSlice.actions.RGetTeacherSubjectMaxLecForTue(TuesdayColData))
        }
// For Wednesday
export const CDAGetTeacherSubjectMaxLecDetailsForWed =
    (data: IGetTeacherSubjectMaxLecDetailsBody): AppThunk =>
        async (dispatch) => {
            dispatch(WeeklyTimeTableSlice.actions.getLoading(true));
            await dispatch(WeeklyTimeTableSlice.actions.RClearTeacherSubjectMaxLecForWed());
            const response = await WeeklyTimeTableApi.GetTeacherSubjectMaxLecDetailsApi(data);
            const WednesdayColData = response.data.TeacherSubjectMaxLecDetails.map((item, i) => {
                return (
                    {
                        Id: item.Teacher_Subject_Id,
                        Name: data.asStandardDivId === 0 ? item.classSubjectName : item.Teacher_Subject,
                        Value: item.Teacher_Subject_Id,
                        StdDivId: item.Standard_Division_Id,
                        SubId: item.Subject_Id,
                        TeacherId: item.Teacher_Id,
                        MaxDayLec: item.maxDaylectures
                    }
                )
            })
            WednesdayColData.unshift({ Id: '0', Name: 'Select', Value: '0', StdDivId: '0', SubId: '0', TeacherId: '0', MaxDayLec: '0' });
            dispatch(WeeklyTimeTableSlice.actions.RGetTeacherSubjectMaxLecForWed(WednesdayColData))
        }

// For Thursday
export const CDAGetTeacherSubjectMaxLecDetailsForThu =
    (data: IGetTeacherSubjectMaxLecDetailsBody): AppThunk =>
        async (dispatch) => {
            dispatch(WeeklyTimeTableSlice.actions.getLoading(true));
            await dispatch(WeeklyTimeTableSlice.actions.RClearTeacherSubjectMaxLecForThu());
            const response = await WeeklyTimeTableApi.GetTeacherSubjectMaxLecDetailsApi(data);
            const ThursdayColData = response.data.TeacherSubjectMaxLecDetails.map((item, i) => {
                return (
                    {
                        Id: item.Teacher_Subject_Id,
                        Name: data.asStandardDivId === 0 ? item.classSubjectName : item.Teacher_Subject,
                        Value: item.Teacher_Subject_Id,
                        StdDivId: item.Standard_Division_Id,
                        SubId: item.Subject_Id,
                        TeacherId: item.Teacher_Id,
                        MaxDayLec: item.maxDaylectures
                    }
                )
            })
            ThursdayColData.unshift({ Id: '0', Name: 'Select', Value: '0', StdDivId: '0', SubId: '0', TeacherId: '0', MaxDayLec: '0' });
            dispatch(WeeklyTimeTableSlice.actions.RGetTeacherSubjectMaxLecForThu(ThursdayColData))
        }

// For Friday
export const CDAGetTeacherSubjectMaxLecDetailsForFri =
    (data: IGetTeacherSubjectMaxLecDetailsBody): AppThunk =>
        async (dispatch) => {
            dispatch(WeeklyTimeTableSlice.actions.getLoading(true));
            await dispatch(WeeklyTimeTableSlice.actions.RClearTeacherSubjectMaxLecForFri());
            const response = await WeeklyTimeTableApi.GetTeacherSubjectMaxLecDetailsApi(data);
            const FridayColData = response.data.TeacherSubjectMaxLecDetails.map((item, i) => {
                return (
                    {
                        Id: item.Teacher_Subject_Id,
                        Name: data.asStandardDivId === 0 ? item.classSubjectName : item.Teacher_Subject,
                        Value: item.Teacher_Subject_Id,
                        StdDivId: item.Standard_Division_Id,
                        SubId: item.Subject_Id,
                        TeacherId: item.Teacher_Id,
                        MaxDayLec: item.maxDaylectures
                    }
                )
            })
            FridayColData.unshift({ Id: '0', Name: 'Select', Value: '0', StdDivId: '0', SubId: '0', TeacherId: '0', MaxDayLec: '0' });
            dispatch(WeeklyTimeTableSlice.actions.RGetTeacherSubjectMaxLecForFri(FridayColData))
        }

// The Following Dispatch is for the Weekday Lecture Retrieval | ON `Teacher` Selection ✅
export const CDAGetLectureNoWeekday =
    (data: IGetTimeTableForTeacherBody): AppThunk =>
        async (dispatch) => {
            dispatch(WeeklyTimeTableSlice.actions.getLoading(true));
            const response = await WeeklyTimeTableApi.GetTimeTableForTeacherApi(data);
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
            const stayBackInfo = response.data.Lecture_No_WeekDayStayback.map((item, i) => {
                return (
                    {
                        Text1: item.WeekDay_Name,
                        Text2: item.Lecture_Number
                    }
                )
            });

            const weeklyTestInfo = response.data.Lecture_No_WeekDayWeeklyTest.map((item, i) => {
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
            const mptCount = response.data.TotalMPTs[0].TotalMPT;
            const staybackCount = response.data.TotalStayback[0].TotalStaybacks;
            const assemblyCount = response.data.TotalAssemblys[0].TotalAssembly;
            const weeklyTestCount = response.data.TotalWeeklyTests[0].TotalWeeklyTest;
            dispatch(WeeklyTimeTableSlice.actions.RExtLectCount(`${mptCount}-${staybackCount}-${assemblyCount}-${weeklyTestCount}`));
            dispatch(WeeklyTimeTableSlice.actions.RGetLectureNoWeekday(responseData));
            dispatch(WeeklyTimeTableSlice.actions.RGetApplicables(ApplicablesData));
            dispatch(WeeklyTimeTableSlice.actions.RGetWeekdayId(WeekDayId));
            dispatch(WeeklyTimeTableSlice.actions.RMPTinfo(mptInfo));
            dispatch(WeeklyTimeTableSlice.actions.RStayBackinfo(stayBackInfo));
            dispatch(WeeklyTimeTableSlice.actions.RWeeklytestInfo(weeklyTestInfo));
            dispatch(WeeklyTimeTableSlice.actions.RAssemblyInfo(assemblyInfo));
            dispatch(WeeklyTimeTableSlice.actions.RTimetableDetails(TimetableDetails));
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
            const AddtionalLecturesForClass = response.data.AddtionalLecturesForClass.map((item, i) => {
                return (
                    {
                        Text1: item.TeacherId,
                        Text2: item.LectureNumber,
                        Text3: item.WeekDayName,
                        Text4: item.SubjectName,
                        Text5: item.ClassName,
                        Text6: item.SchoolTimeTableDetailId,
                        Text7: item.SubjectId,
                        Text8: item.WeekdayId,
                        Text9: item.TeacherSubjectId,
                        Text10: item.TeacherName,
                        Text11: item.ID
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
            const WeekDayStaybackInfo = response.data.Lecture_No_WeekDayStaybackForClass.map((item, i) => {
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
            const WeeklyTestInfo = response.data.Lecture_No_WeekDayWeeklyTestForClass.map((item, i) => {
                return (
                    {
                        Text1: item.WeekDay_Name,
                        Text2: item.WeekDays_Id,
                        Text3: item.StandardDivision_Id,
                        Text4: item.Lecture_Number
                    }
                )
            })
            dispatch(WeeklyTimeTableSlice.actions.RGetClassLecNoWeekday(responseData));
            dispatch(WeeklyTimeTableSlice.actions.RAddLecForClass(AddtionalLecturesForClass));
            dispatch(WeeklyTimeTableSlice.actions.RAssemblyInfoClass(WeekDayAssemblyInfo));
            dispatch(WeeklyTimeTableSlice.actions.RMPTinfoClass(WeekDayMptInfo));
            dispatch(WeeklyTimeTableSlice.actions.RStaybackinfoClass(WeekDayStaybackInfo));
            dispatch(WeeklyTimeTableSlice.actions.RWeeklytestClass(WeeklyTestInfo));
            dispatch(WeeklyTimeTableSlice.actions.RClassWeekdayIds(WeekDayId));
        }

export default WeeklyTimeTableSlice.reducer;