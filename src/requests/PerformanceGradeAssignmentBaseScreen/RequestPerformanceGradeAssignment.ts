import { createSlice } from '@reduxjs/toolkit';
import PerformanceGradeAssignmentAPI from 'src/api/PerformanceGradeAssignmentBaseScreen/ApiPerformanceGradeAssignment';
import { IGetAllUsersReportingToGivenUserBody, IGetAllYearsBody } from 'src/interfaces/PerformanceGradeAssignmentBaseScreen/IPerformanceGradeAssignment';
import { AppThunk } from 'src/store';
const PerformanceGradeAssignmentslice = createSlice({
    name: 'PerformanceGradeAssignment',

    initialState: {
        GetAllYearsIS: [],
        GetAllUsersReportingToGivenUserIS: [],
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
                };
            });
            dispatch(PerformanceGradeAssignmentslice.actions.getGetAllUsersReportingToGivenUser(responseData));
            console.log(responseData, "---------------------");

        };

export default PerformanceGradeAssignmentslice.reducer;