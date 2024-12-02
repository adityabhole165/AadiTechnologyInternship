import { createSlice } from '@reduxjs/toolkit';
import APIStudentDetails from 'src/api/StudentDetails/APIStudentDetails';
import {
    IDeleteStudentAchievementDetailsBody,
    IDeleteStudentSiblingDetailsBody,
    IGenerateTransportFeeEntriesBody,
    IGetAcademicDatesForStandardBody,
    IGetFormNumberBody,
    IGetStandardwiseMinMaxDOBBody,
    IGetStudentAchievementDetailsBody,
    IGetStudentDetailsForSiblingBody,
    IGetStudentMandatoryFieldsBody,
    IGetStudentNameForAchievementControlBody,
    IGetStudentsAllAchievementDetailsBody,
    IGetStudentsListBody,
    IGetStudentsSiblingDetailBody,
    IGetStudentUIPreConditionMsgBody,
    ISaveStudentAchievementDetailsBody,
    ISaveStudentSiblingDetailsBody,
    IsClassTeacherBody,
    IUpdateStudentTrackingDetailsBody,
} from 'src/interfaces/StudentDetails/IStudentDetails';
import { AppThunk } from 'src/store';

const GetStandardwiseMinMaxDOBslice = createSlice({
    name: 'GetStandardwiseMinMaxDOB',
    initialState: {
        StandardwiseMinMaxDOB: [],
        StudentUIPreConditionMsg: [],
        IsClassTeacher: [],
        IGenerateTransportFeeEntries: '',
        IGetFormNumber: [],
        IGetStudentsSiblingDetail: [],
        ISGetAcademicDatesForStandard: [],
        ISGetStudentMandatoryFields: [],
        IUpdateStudentTrackingDetails: '',
        //Add Note Popup
        ISGetStudentNameForAchievementControl: [],
        ISGetStudentsAllAchievementList: [],
        ISGetStudentAchievementDetailsEdit: [],
        ISSaveStudentAchievementDetailsMsg: '',
        ISDeleteStudentAchievementDetailsMsg: '',
        //Add Sibling Popup
        ISGetStudentDetailsForSibling: [],
        ISGetStudentSiblingList: [],
        ISGetStudentsList: [],
        ISSaveStudentSiblingDetailsMsg: '',
        ISDeleteStudentSiblingDetailsMsg: '',
        Loading: true

    },
    reducers: {
        GetStandardwiseMinMaxDOB(state, action) {
            state.StandardwiseMinMaxDOB = action.payload;
        },
        GetStudentUIPreConditionMsg(state, action) {
            state.StudentUIPreConditionMsg = action.payload;
        },
        GetIsClassTeacher(state, action) {
            state.IsClassTeacher = action.payload;
        },

        GetGenerateTransportFeeEntries(state, action) {
            state.IGenerateTransportFeeEntries = action.payload;
        },
        GetFormNumber(state, action) {
            state.IGetFormNumber = action.payload;
        },
        GetStudentsSiblingDetail(state, action) {
            state.IGetStudentsSiblingDetail = action.payload;
        },

        GetAcademicDatesForStandard(state, action) {
            state.ISGetAcademicDatesForStandard = action.payload;
        },

        GetStudentMandatoryFields(state, action) {
            state.ISGetStudentMandatoryFields = action.payload;
        },

        GetUpdateStudentTrackingDetails(state, action) {
            state.IUpdateStudentTrackingDetails = action.payload;
        },
        ///Add Note Popup
        RGetStudentNameForAchievementControl(state, action) {
            state.ISGetStudentNameForAchievementControl = action.payload;
            state.Loading = false;
        },
        RGetStudentsAllAchievementList(state, action) {
            state.ISGetStudentsAllAchievementList = action.payload;
            state.Loading = false;
        },
        RGetStudentAchievementDetailsEdit(state, action) {
            state.ISGetStudentAchievementDetailsEdit = action.payload;
            state.Loading = false;
        },
        RSaveStudentAchievementDetailsMsg(state, action) {
            state.ISSaveStudentAchievementDetailsMsg = action.payload;
            state.Loading = false;
        },
        ResetSaveStudentAchievementDetailsMsg(state) {
            state.Loading = false;
            state.ISSaveStudentAchievementDetailsMsg = '';
        },
        RDeleteStudentAchievementDetailsMsg(state, action) {
            state.ISDeleteStudentAchievementDetailsMsg = action.payload;
            state.Loading = false;
        },
        ResetDeleteStudentAchievementDetailsMsg(state) {
            state.ISDeleteStudentAchievementDetailsMsg = '';
            state.Loading = false;
        },
        RGetStudentDetailsForSibling(state, action) {
            state.ISGetStudentDetailsForSibling = action.payload;
            state.Loading = false;
        },
        RGetStudentSiblingList(state, action) {
            state.ISGetStudentSiblingList = action.payload;
            state.Loading = false;
        },
        RGetStudentsList(state, action) {
            state.ISGetStudentsList = action.payload;
            state.Loading = false;
        },
        RSaveStudentSiblingDetailsMsg(state, action) {
            state.ISSaveStudentSiblingDetailsMsg = action.payload;
            state.Loading = false;
        },
        ResetSaveStudentSiblingDetailsMsg(state) {
            state.ISSaveStudentSiblingDetailsMsg = '';
            state.Loading = false;
        },
        RDeleteStudentSiblingDetailsMsg(state, action) {
            state.ISDeleteStudentSiblingDetailsMsg = action.payload;
            state.Loading = false;
        },
        ResetDeleteStudentSiblingDetailsMsg(state) {
            state.ISSaveStudentSiblingDetailsMsg = '';
            state.Loading = false;
        },
        getLoading(state, action) {
            state.Loading = true;
        }
    }
});

export const GetStandardwiseMinMaxDOB =
    (data: IGetStandardwiseMinMaxDOBBody): AppThunk =>
        async (dispatch) => {
            const response = await APIStudentDetails.GetStandardwiseMinMaxDOB(data);
            dispatch(GetStandardwiseMinMaxDOBslice.actions.GetStandardwiseMinMaxDOB(response.data));
        };

export const GetStudentUIPreConditionMsg =
    (data: IGetStudentUIPreConditionMsgBody): AppThunk =>
        async (dispatch) => {
            const response = await APIStudentDetails.GetStudentUIPreConditionMsg(data);
            dispatch(GetStandardwiseMinMaxDOBslice.actions.GetStudentUIPreConditionMsg(response.data));
        };

export const GetIsClassTeacher =
    (data: IsClassTeacherBody): AppThunk =>
        async (dispatch) => {
            const response = await APIStudentDetails.GetIsClassTeacher(data);
            const responseData = response.data.CteacherListResult.map((item, i) => {
                return {

                    Result: item.Result
                };
            });
            dispatch(GetStandardwiseMinMaxDOBslice.actions.GetIsClassTeacher(responseData));
        };

export const CDAGenerateTransportFeeEntries =
    (data: IGenerateTransportFeeEntriesBody): AppThunk =>
        async (dispatch) => {
            const response = await APIStudentDetails.GetGenerateTransportFeeEntriesBody(data);
            dispatch(GetStandardwiseMinMaxDOBslice.actions.GetGenerateTransportFeeEntries(response.data));
            if (response.status === 200) {
                // The API call was successful
                console.log('4️⃣CDAGenerateTransportFeeEntries');
                console.log('Response data:', response.data);
            }
        };

export const GetFormNumber =
    (data: IGetFormNumberBody): AppThunk =>
        async (dispatch) => {
            const response = await APIStudentDetails.GetFormNumber(data);
            const formNumberList = response.data?.FormNumberList || [];
            dispatch(GetStandardwiseMinMaxDOBslice.actions.GetFormNumber(formNumberList));
        };
export const CDAGetStudentsSiblingDetail =
    (data: IGetStudentsSiblingDetailBody): AppThunk =>
        async (dispatch) => {
            const response = await APIStudentDetails.GetStudentsSiblingDetail(data);
            dispatch(GetStandardwiseMinMaxDOBslice.actions.GetStudentsSiblingDetail(response.data));
        };

export const GetAcademicDatesForStandard =
    (data: IGetAcademicDatesForStandardBody): AppThunk =>
        async (dispatch) => {
            const response = await APIStudentDetails.GetAcademicDatesForStandard(data);
            dispatch(GetStandardwiseMinMaxDOBslice.actions.GetAcademicDatesForStandard(response.data));

        };

export const GetStudentMandatoryFields =
    (data: IGetStudentMandatoryFieldsBody): AppThunk =>
        async (dispatch) => {

            const response = await APIStudentDetails.GetStudentMandatoryFields(data);


            dispatch(GetStandardwiseMinMaxDOBslice.actions.GetStudentMandatoryFields(GetStudentMandatoryFields));

        };


export const CDAUpdateStudentTrackingDetails =
    (data: IUpdateStudentTrackingDetailsBody): AppThunk =>
        async (dispatch) => {
            const response = await APIStudentDetails.UpdateStudentTrackingDetails(data);
            dispatch(GetStandardwiseMinMaxDOBslice.actions.GetUpdateStudentTrackingDetails(response.data));
        };

///Add Note Popup
export const CDAGetStudentNameForAchievementControl =
    (data: IGetStudentNameForAchievementControlBody): AppThunk =>
        async (dispatch) => {
            const response = await APIStudentDetails.GetStudentNameForAchievementControlApi(data);
            dispatch(GetStandardwiseMinMaxDOBslice.actions.RGetStudentNameForAchievementControl(response.data));
        };

export const CDAGetStudentsAllAchievementList =
    (data: IGetStudentsAllAchievementDetailsBody): AppThunk =>
        async (dispatch) => {
            const response = await APIStudentDetails.GetStudentsAllAchievementDetailsApi(data);
            let responseData = response.data.map((item, i) => {
                return (
                    {
                        Id: item.AchievementId,
                        Text1: item.ClassName,
                        Text2: item.AchievementDate,
                        Text3: item.Description,
                        Text4: item.Attachment
                    }
                );
            });
            dispatch(GetStandardwiseMinMaxDOBslice.actions.RGetStudentsAllAchievementList(responseData));
        };

export const CDAEditGetStudentAchievementDetails =
    (data: IGetStudentAchievementDetailsBody): AppThunk =>
        async (dispatch) => {
            const response = await APIStudentDetails.GetStudentAchievementDetailsApi(data);
            let responseData = response.data.map((item, i) => {
                return (
                    {
                        Id: item.AchievementId,
                        AchievementDate: item.AchievementDate,
                        Description: item.Description,
                        Attachment: item.Attachment,
                    }
                );
            });
            dispatch(GetStandardwiseMinMaxDOBslice.actions.RGetStudentAchievementDetailsEdit(responseData));
        };

export const CDASaveStudentAchievementDetailsMsg =
    (data: ISaveStudentAchievementDetailsBody): AppThunk =>
        async (dispatch) => {
            dispatch(GetStandardwiseMinMaxDOBslice.actions.getLoading(true));
            const response = await APIStudentDetails.SaveStudentAchievementDetailsApi(data);
            dispatch(GetStandardwiseMinMaxDOBslice.actions.RSaveStudentAchievementDetailsMsg(response.data));

        };
export const CDAResetSaveStudentAchievementDetailsMsg =
    (): AppThunk =>
        async (dispatch) => {
            dispatch(GetStandardwiseMinMaxDOBslice.actions.getLoading(true));
            dispatch(GetStandardwiseMinMaxDOBslice.actions.ResetSaveStudentAchievementDetailsMsg());
        }

export const CDADeleteStudentAchievementDetailsMsg =
    (data: IDeleteStudentAchievementDetailsBody): AppThunk =>
        async (dispatch) => {
            dispatch(GetStandardwiseMinMaxDOBslice.actions.getLoading(true));
            const response = await APIStudentDetails.DeleteStudentAchievementDetailsApi(data);
            dispatch(GetStandardwiseMinMaxDOBslice.actions.RDeleteStudentAchievementDetailsMsg(response.data));

        };
export const CDAResetDeleteStudentAchievementDetailsMsg =
    (): AppThunk =>
        async (dispatch) => {
            dispatch(GetStandardwiseMinMaxDOBslice.actions.getLoading(true));
            dispatch(GetStandardwiseMinMaxDOBslice.actions.ResetDeleteStudentAchievementDetailsMsg());
        }
//Add Sibling Popup
export const CDAGetStudentDetailsForSiblingPop =
    (data: IGetStudentDetailsForSiblingBody): AppThunk =>
        async (dispatch) => {
            const response = await APIStudentDetails.GetStudentDetailsForSiblingApi(data);
            dispatch(GetStandardwiseMinMaxDOBslice.actions.RGetStudentDetailsForSibling(response.data));
        };
export const CDAGetStudentSiblingList =
    (data: IGetStudentDetailsForSiblingBody): AppThunk =>
        async (dispatch) => {
            const response = await APIStudentDetails.GetStudentSiblingListApi(data);
            let responseData = response.data.map((item, i) => {
                return (
                    {
                        Yearwise_Student_Id: item.Yearwise_Student_Id,
                        RegNo: item.RegNo,
                        StudentName: item.StudentName,
                        Standard_Name: item.Standard_Name,
                        Division_Name: item.Division_Name,
                        IsLeftStudent: item.IsLeftStudent,
                        StudentSiblingId: item.StudentSiblingId,
                    }
                );
            });
            dispatch(GetStandardwiseMinMaxDOBslice.actions.RGetStudentSiblingList(responseData));
        };
export const CDASearchStudentsList =
    (data: IGetStudentsListBody): AppThunk =>
        async (dispatch) => {
            const response = await APIStudentDetails.GetStudentsListApi(data);
            let responseData = response.data.map((item, i) => {
                return (
                    {
                        RowID: item.RowID,
                        TotalRows: item.TotalRows,
                        SchoolwiseStudentId: item.SchoolwiseStudentId,
                        YearwiseStudentId: item.YearwiseStudentId,
                        RegNo: item.RegNo,
                        StudentName: item.StudentName,
                        ClassName: item.ClassName,
                        DivisionName: item.DivisionName,
                    }
                );
            });
            dispatch(GetStandardwiseMinMaxDOBslice.actions.RGetStudentsList(responseData));
        };
export const CDASaveStudentSiblingDetailsMsg =
    (data: ISaveStudentSiblingDetailsBody): AppThunk =>
        async (dispatch) => {
            dispatch(GetStandardwiseMinMaxDOBslice.actions.getLoading(true));
            const response = await APIStudentDetails.SaveStudentSiblingDetailsApi(data);
            dispatch(GetStandardwiseMinMaxDOBslice.actions.RSaveStudentSiblingDetailsMsg(response.data));

        };
export const CDAResetSaveStudentSiblingDetailsMsg =
    (): AppThunk =>
        async (dispatch) => {
            dispatch(GetStandardwiseMinMaxDOBslice.actions.getLoading(true));
            dispatch(GetStandardwiseMinMaxDOBslice.actions.ResetSaveStudentSiblingDetailsMsg());
        }
export const CDADeleteStudentSiblingDetailsMsg =
    (data: IDeleteStudentSiblingDetailsBody): AppThunk =>
        async (dispatch) => {
            dispatch(GetStandardwiseMinMaxDOBslice.actions.getLoading(true));
            const response = await APIStudentDetails.DeleteStudentSiblingDetailsApi(data);
            dispatch(GetStandardwiseMinMaxDOBslice.actions.RDeleteStudentSiblingDetailsMsg(response.data));

        };
export const CDAResetDeleteStudentSiblingDetailsMsg =
    (): AppThunk =>
        async (dispatch) => {
            dispatch(GetStandardwiseMinMaxDOBslice.actions.getLoading(true));
            dispatch(GetStandardwiseMinMaxDOBslice.actions.ResetDeleteStudentSiblingDetailsMsg());
        }
export default GetStandardwiseMinMaxDOBslice.reducer;