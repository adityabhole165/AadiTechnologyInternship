import { createSlice } from '@reduxjs/toolkit';
import PerformanceGradeAssignmentAPI from 'src/api/PerformanceGradeAssignmentBaseScreen/ApiPerformanceGradeAssignment';
import { IGetAllDocumentsListBody, IGetAllUsersReportingToGivenUserBody, IGetAllYearsBody, IGetPerformanceEvaluationDetailsBody, IGetUserInvestmentMethodDetailsBody, IPublishStaffPerformanceDetailsBody, ISaveStaffPerformanceEvalDetailsBody, ISubmitStaffPerformanceDetailsBody } from 'src/interfaces/PerformanceGradeAssignmentBaseScreen/IPerformanceGradeAssignment';
import { AppThunk } from 'src/store';
const PerformanceGradeAssignmentslice = createSlice({
    name: 'PerformanceGradeAssignment',

    initialState: {
        GetAllYearsIS: [],
        GetAllUsersReportingToGivenUserIS: [],
        ISlistSchoolOrgNameDetails: [],
        ISlistUserNameDetails: [],
        ISlistDescriptionDetails: [],
        ISlistOriginalSkillIdDetails: [],
        ISlistTeacherTitleDetails: [],
        ISlistParameterIdDetails: [],
        ISlistIsFinalApproverDetails: [],
        ISgradeDropDownList: [],
        ISlistEnableRejectButtonDetails: [],
        ISUserInvestmentMethodDetails: {},
        ISGetAllDocumentsList: [],
        ISSaveStaffPerformanceEvalDetailsMsg: '',
        ISSubmitStaffPerformanceDetailsMsg: '',
        ISPublishStaffPerformanceDetailsMsg: '',
        ISAttachmentDetails: [],
        Loading: true
    },
    reducers: {
        getGetAllYears(state, action) {
            state.Loading = false;
            state.GetAllYearsIS = action.payload;
        },
        ResetDetails(state) {
            state.Loading = false;
            state.ISlistSchoolOrgNameDetails = [];
            state.ISlistUserNameDetails = [];
            state.ISlistDescriptionDetails = [];
            state.ISlistOriginalSkillIdDetails = [];
            state.ISlistTeacherTitleDetails = [];
            state.ISlistParameterIdDetails = [];
            state.ISlistIsFinalApproverDetails = [];
            state.ISgradeDropDownList = [];
            state.ISlistEnableRejectButtonDetails = [];
            state.ISUserInvestmentMethodDetails = {};
        },
        getGetAllUsersReportingToGivenUser(state, action) {
            state.Loading = false;
            state.GetAllUsersReportingToGivenUserIS = action.payload;
        },
        RAttachmentDetails(state, action) {
            state.Loading = false;
            state.ISAttachmentDetails = action.payload;
        },
        RgradeDropDownList(state, action) {
            state.Loading = false;
            state.ISgradeDropDownList = action.payload;
        },
        RlistSchoolOrgNameDetails(state, action) {
            state.Loading = false;
            state.ISlistSchoolOrgNameDetails = action.payload;
        },
        RSaveStaffPerformanceEvalDetailsMsg(state, action) {
            state.Loading = false;
            state.ISSaveStaffPerformanceEvalDetailsMsg = action.payload;
        },
        ResetSaveStaffPerformanceEvalDetailsMsg(state) {
            state.Loading = false;
            state.ISSaveStaffPerformanceEvalDetailsMsg = '';
        },
        RSubmitStaffPerformanceDetailsMsg(state, action) {
            state.Loading = false;
            state.ISSubmitStaffPerformanceDetailsMsg = action.payload;
        },
        ResetSubmitStaffPerformanceDetailsMsg(state) {
            state.Loading = false;
            state.ISSubmitStaffPerformanceDetailsMsg = '';
        },
        RPublishStaffPerformanceDetailsMsg(state, action) {
            state.Loading = false;
            state.ISPublishStaffPerformanceDetailsMsg = action.payload;
        },
        ResetPublishStaffPerformanceDetailsMsg(state) {
            state.Loading = false;
            state.ISPublishStaffPerformanceDetailsMsg = '';
        },
        RlistUserNameDetails(state, action) {
            state.Loading = false;
            state.ISlistUserNameDetails = action.payload;
        },
        RUserInvestmentMethodDetails(state, action) {
            state.Loading = false;
            state.ISUserInvestmentMethodDetails = action.payload;
        },
        RlistIsFinalApproverDetails(state, action) {
            state.Loading = false;
            state.ISlistIsFinalApproverDetails = action.payload;
        },
        RGetAllDocumentsList(state, action) {
            state.Loading = false;
            state.ISGetAllDocumentsList = action.payload;
        },
        RlistDescriptionDetails(state, action) {
            state.Loading = false;
            state.ISlistDescriptionDetails = action.payload;
        },
        RlistOriginalSkillIdDetails(state, action) {
            state.Loading = false;
            state.ISlistOriginalSkillIdDetails = action.payload;
        },
        RlistTecherTitleDetails(state, action) {
            state.Loading = false;
            state.ISlistTeacherTitleDetails = action.payload;
        },
        RlistParameterIdDetails(state, action) {
            state.Loading = false;
            state.ISlistParameterIdDetails = action.payload;
        },
        RlistEnableRejectButtonDetails(state, action) {
            state.Loading = false;
            state.ISlistEnableRejectButtonDetails = action.payload;
        },
        getLoading(state, action) {
            state.Loading = true;
        }

    }
});
export const RGetAllYearsDropdown =
    (data: IGetAllYearsBody): AppThunk =>
        async (dispatch) => {
            const response = await PerformanceGradeAssignmentAPI.GetAllYearsApi(data);
            let abc = response.data.map((item, i) => {
                return {
                    Id: item.Academic_Year_Id,
                    Name: item.Year,
                    Value: item.Academic_Year_Id
                };
            });
            dispatch(PerformanceGradeAssignmentslice.actions.getGetAllYears(abc));
        };
export const CDAGetAllDocumentsList =
    (data: IGetAllDocumentsListBody): AppThunk =>
        async (dispatch) => {
            const response = await PerformanceGradeAssignmentAPI.GetAllDocumentsListApi(data);
            let responseData = response.data.map((item, i) => {
                return (
                    {
                        Text1: item.Id,
                        Text2: item.FileName
                    }
                );
            });
            dispatch(PerformanceGradeAssignmentslice.actions.RGetAllDocumentsList(responseData));
        };
export const RGetAllUsersReportingToGivenUser =
    (data: IGetAllUsersReportingToGivenUserBody): AppThunk =>
        async (dispatch) => {
            dispatch(PerformanceGradeAssignmentslice.actions.getLoading(true));
            const response = await PerformanceGradeAssignmentAPI.GetAllUsersReportingToGivenUserApi(data);
            const responseData = response.data.map((Item, i) => {
                return {
                    Id: Item.UserId,
                    Text1: Item.UserName,
                    Text2: Item.IsSupervisor,
                    Text3: Item.RowID,
                    TotalRows: Item.TotalRows,
                };
            });
            dispatch(PerformanceGradeAssignmentslice.actions.getGetAllUsersReportingToGivenUser(responseData));
            // console.log(responseData, "---------------------");

        };

export const CDAGetUserInvestmentMethodDetails =
    (data: IGetUserInvestmentMethodDetailsBody): AppThunk =>
        async (dispatch) => {
            dispatch(PerformanceGradeAssignmentslice.actions.getLoading(true));
            const response = await PerformanceGradeAssignmentAPI.GetUserInvestmentMethodDetailsApi(data);
            dispatch(PerformanceGradeAssignmentslice.actions.RUserInvestmentMethodDetails(response.data));
        }

export const CDAGetPerformanceEvaluationDetails =
    (data: IGetPerformanceEvaluationDetailsBody): AppThunk =>
        async (dispatch) => {
            dispatch(PerformanceGradeAssignmentslice.actions.getLoading(true));
            dispatch(PerformanceGradeAssignmentslice.actions.ResetDetails());
            const response = await PerformanceGradeAssignmentAPI.GetPerformanceEvaluationDetailsApi(data);
            const listSchoolOrgNameDetails = response.data.listSchoolOrgnNameDetiles.map((item, i) => {
                return (
                    {
                        schoolOrgName: item.School_Orgn_Name,
                        schoolName: item.School_Name,
                        address: item.Address
                    }
                );
            });
            const listUserNameDetails = response.data.listUserNameDetiles.map((item, i) => {
                return (
                    {
                        Text1: item.UserName,
                        Text2: item.Designation,
                        Text3: item.JobStatus,
                        Text4: item.EmployeeNo,
                        Text5: item.JoiningDate,
                        Text6: item.ServiceLength,
                        Text7: item.FormFor,
                        Text8: item.Standards,
                        Text9: item.Subjects,
                        Text10: item.UserRoleId,
                        Text11: item.AcademicYear,
                        Text12: item.LastIncrementDate,
                        Text13: item.EffectiveFromDate,
                        Text14: item.Address,
                        Text15: item.Year_Of_Passing
                    }
                );
            })
            const listDescriptionDetails = response.data.listDescriptionDetiles.map((item, i) => {
                return (
                    {
                        Text1: item.Id,
                        Text2: item.Name,
                        Text3: item.ShortName,
                        Text4: item.Description,
                        Text5: item.SortOrder,
                        Text6: item.OriginalGradeId,
                        Text7: item.SchoolId,
                        Text8: item.IsDeleted
                    }
                )
            })
            const gradeDropDownList = response.data.listDescriptionDetiles.map((item, i) => {
                return (
                    {
                        Id: item.Id,
                        Name: `${item.ShortName} (${item.Name})`,
                        Value: item.Id

                    }
                )
            })
            gradeDropDownList.unshift({ Id: '0', Name: "Select", Value: '0' })
            const listOriginalSkillIdDetails = response.data.listOriginalSkillIdDetiles.map((item, i) => {
                return (
                    {
                        Text1: item.Id,
                        Text2: item.Name,
                        Text3: item.SortOrder,
                        Text4: item.OriginalSkillId,
                        Text5: item.SchoolId,
                        Text6: item.IsDeleted,
                        Text7: item.InputTypeId,
                        Text8: item.IsEditableToAll
                    }
                )
            })
            const listTecherTitleDetails = response.data.listTecherTitleDetiles.map((item, i) => {
                return (
                    {
                        Text1: item.Id,
                        Text2: item.Title,
                        Text3: item.SortOrder,
                        Text4: item.SkillId,
                        Text5: item.IsSubmitted,
                        Text6: item.AppraisalFormTypeId,
                        Text7: item.FormType
                    }
                )
            })
            const listParameterIdDetails = response.data.listParameterIdDetiles.map((item, i) => {
                return (
                    {
                        Text1: item.Id,
                        Text2: item.ParameterId,
                        Text3: item.GradeId,
                        Text4: item.Observation,
                        Text5: item.ReportingUserId
                    }
                )
            })
            const listIsFinalApproverDetails = response.data.listIsFinalApproverDetiles.map((item, i) => {
                return (
                    {
                        Text1: item.UserName,
                        Text2: item.Designation,
                        Text3: item.ReportingUserId,
                        Text4: item.IsFinalApprover,
                        Text5: item.IsSupervisor,
                        Text6: item.IsSubmitted,
                        Text7: item.ApprovalSortOrder,
                        Text8: item.AttachmentCount
                    }
                )
            })
            const listEnableRejectButtonDetails = response.data.listEnableRejectButtonDetiles.map((item, i) => {
                return (
                    {
                        Text1: item.EnableRejectButton,
                        Text2: item.EnableSaveButton,
                        Text3: item.EnableSubmitButton,
                        Text4: item.EnablePublishButton,
                        Text5: item.IsPublished,
                        Text6: item.CanUserAddComments
                    }
                )
            })

            dispatch(PerformanceGradeAssignmentslice.actions.RlistSchoolOrgNameDetails(listSchoolOrgNameDetails));
            dispatch(PerformanceGradeAssignmentslice.actions.RlistUserNameDetails(listUserNameDetails));
            dispatch(PerformanceGradeAssignmentslice.actions.RlistDescriptionDetails(listDescriptionDetails));
            dispatch(PerformanceGradeAssignmentslice.actions.RlistOriginalSkillIdDetails(listOriginalSkillIdDetails));
            dispatch(PerformanceGradeAssignmentslice.actions.RlistTecherTitleDetails(listTecherTitleDetails));
            dispatch(PerformanceGradeAssignmentslice.actions.RlistParameterIdDetails(listParameterIdDetails));
            dispatch(PerformanceGradeAssignmentslice.actions.RlistIsFinalApproverDetails(listIsFinalApproverDetails));
            dispatch(PerformanceGradeAssignmentslice.actions.RgradeDropDownList(gradeDropDownList));
            dispatch(PerformanceGradeAssignmentslice.actions.RlistEnableRejectButtonDetails(listEnableRejectButtonDetails));

        };

export const CDAGetDetailsForAttachment =
    (data: IGetPerformanceEvaluationDetailsBody): AppThunk =>
        async (dispatch) => {
            dispatch(PerformanceGradeAssignmentslice.actions.getLoading(true));
            const response = await PerformanceGradeAssignmentAPI.GetPerformanceEvaluationDetailsApi(data);
            const listIsFinalApproverDetails = response.data.listIsFinalApproverDetiles.map((item, i) => {
                return (
                    {
                        Text1: item.UserName,
                        Text2: item.Designation,
                        Text3: item.ReportingUserId,
                        Text4: item.IsFinalApprover,
                        Text5: item.IsSupervisor,
                        Text6: item.IsSubmitted,
                        Text7: item.ApprovalSortOrder,
                        Text8: item.AttachmentCount
                    }
                )
            })
            dispatch(PerformanceGradeAssignmentslice.actions.RAttachmentDetails(listIsFinalApproverDetails));
        }

//     export const CDAGetUserInvestmentMethodDetails =
// (data: IGetUserInvestmentMethodDetailsBody): AppThunk =>
//     async (dispatch) => {
//         dispatch(PerformanceGradeAssignmentslice.actions.getLoading(true));
//         const response = await PerformanceGradeAssignmentAPI.GetUserInvestmentMethodDetailsApi(data);
//         dispatch(PerformanceGradeAssignmentslice.actions.RUserInvestmentMethodDetails(response.data));
//     }

export const CDASaveStaffPerformanceEvalDetailsMsg =
    (data: ISaveStaffPerformanceEvalDetailsBody, buttonType): AppThunk =>
        async (dispatch) => {
            dispatch(PerformanceGradeAssignmentslice.actions.getLoading(true));
            const response = await PerformanceGradeAssignmentAPI.SaveStaffPerformanceEvalDetailsApi(data);
            if (buttonType === 'save') {
                dispatch(PerformanceGradeAssignmentslice.actions.RSaveStaffPerformanceEvalDetailsMsg(response.data));
            }
        };

export const CDAResetSaveStaffPerformanceEvalDetailsMsg =
    (): AppThunk =>
        async (dispatch) => {
            dispatch(PerformanceGradeAssignmentslice.actions.getLoading(true));
            dispatch(PerformanceGradeAssignmentslice.actions.ResetSaveStaffPerformanceEvalDetailsMsg());
        }

export const CDASubmitStaffPerformanceDetailsMsg =
    (data: ISubmitStaffPerformanceDetailsBody): AppThunk =>
        async (dispatch) => {
            dispatch(PerformanceGradeAssignmentslice.actions.getLoading(true));
            const response = await PerformanceGradeAssignmentAPI.SubmitStaffPerformanceDetailsApi(data);
            dispatch(PerformanceGradeAssignmentslice.actions.RSubmitStaffPerformanceDetailsMsg(response.data));
        }

export const CDAResetSubmitStaffPerformanceDetailsMsg =
    (): AppThunk =>
        async (dispatch) => {
            dispatch(PerformanceGradeAssignmentslice.actions.getLoading(true));
            dispatch(PerformanceGradeAssignmentslice.actions.ResetSubmitStaffPerformanceDetailsMsg());
        }

export const CDAPublishStaffPerformanceDetailsMsg =
    (data: IPublishStaffPerformanceDetailsBody): AppThunk =>
        async (dispatch) => {
            dispatch(PerformanceGradeAssignmentslice.actions.getLoading(true));
            const response = await PerformanceGradeAssignmentAPI.PublishStaffPerformanceDetailsApi(data);
            dispatch(PerformanceGradeAssignmentslice.actions.RPublishStaffPerformanceDetailsMsg(response.data));
        }

export const CDAResetPublishStaffPerformanceDetailsMsg =
    (): AppThunk =>
        async (dispatch) => {
            dispatch(PerformanceGradeAssignmentslice.actions.getLoading(true));
            dispatch(PerformanceGradeAssignmentslice.actions.ResetPublishStaffPerformanceDetailsMsg());
        }

export default PerformanceGradeAssignmentslice.reducer;