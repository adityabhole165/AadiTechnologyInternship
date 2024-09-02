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
            dispatch(PerformanceGradeAssignmentslice.actions.RlistSchoolOrgNameDetails(listSchoolOrgNameDetails));

        };

export default PerformanceGradeAssignmentslice.reducer;