import { createSlice } from '@reduxjs/toolkit';
import PerformanceGradeAssignmentAPI from 'src/api/PerformanceGradeAssignmentBaseScreen/ApiPerformanceGradeAssignment';
import { IGetAllUsersReportingToGivenUserBody, IGetAllYearsBody, IGetPerformanceEvaluationDetailsBody } from 'src/interfaces/PerformanceGradeAssignmentBaseScreen/IPerformanceGradeAssignment';
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
        Loading: true
    },
    reducers: {
        getGetAllYears(state, action) {
            state.Loading = false;
            state.GetAllYearsIS = action.payload;
        },
        getGetAllUsersReportingToGivenUser(state, action) {
            state.Loading = false;
            state.GetAllUsersReportingToGivenUserIS = action.payload;
        },
        RlistSchoolOrgNameDetails(state, action) {
            state.Loading = false;
            state.ISlistSchoolOrgNameDetails = action.payload;
        },
        RlistUserNameDetails(state, action) {
            state.Loading = false;
            state.ISlistUserNameDetails = action.payload;
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

export const CDAGetPerformanceEvaluationDetails =
    (data: IGetPerformanceEvaluationDetailsBody): AppThunk =>
        async (dispatch) => {
            dispatch(PerformanceGradeAssignmentslice.actions.getLoading(true));
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
            dispatch(PerformanceGradeAssignmentslice.actions.RlistSchoolOrgNameDetails(listSchoolOrgNameDetails));
            dispatch(PerformanceGradeAssignmentslice.actions.RlistUserNameDetails(listUserNameDetails));
            dispatch(PerformanceGradeAssignmentslice.actions.RlistDescriptionDetails(listDescriptionDetails));
            dispatch(PerformanceGradeAssignmentslice.actions.RlistOriginalSkillIdDetails(listOriginalSkillIdDetails));
            dispatch(PerformanceGradeAssignmentslice.actions.RlistTecherTitleDetails(listTecherTitleDetails));
            dispatch(PerformanceGradeAssignmentslice.actions.RlistParameterIdDetails(listParameterIdDetails));

        };

export default PerformanceGradeAssignmentslice.reducer;