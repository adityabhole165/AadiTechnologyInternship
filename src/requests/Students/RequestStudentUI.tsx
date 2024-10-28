import { createSlice } from '@reduxjs/toolkit';
import GetStudentUIAPI from 'src/api/Students/ApiStudentUI';
import { IMasterDatastudentBody } from 'src/interfaces/Students/IStudentUI';
import { AppThunk } from 'src/store';
const StudentUISlice = createSlice({
    name: 'StudentUI',

    initialState: {
        ISOcupationDropdown: [],
        ISCategoryDropdown: [],
        Loading: true
    },
    reducers: {
        ROcupationDropdown(state, action) {
            state.ISOcupationDropdown = action.payload;
            state.Loading = false;
        },
        RCategoryDropdown(state, action) {
            state.ISCategoryDropdown = action.payload;
            state.Loading = false;
        },
        getLoading(state, action) {
            state.Loading = true;
        },
    }
});

export const CDAGetStudentRecordData =
    (data: IMasterDatastudentBody): AppThunk =>
        async (dispatch) => {
            const response = await GetStudentUIAPI.GetMasterDatastudentApi(data);
            let OcupationDropdown = []
            response.data.OcupationDropdown.map((item, i) => {
                OcupationDropdown.push({

                    Id: item.Ocupation_Id,
                    Name: item.Ocupation_Name,
                    Value: item.Ocupation_Id

                });
            });
            dispatch(StudentUISlice.actions.ROcupationDropdown(OcupationDropdown));

            let CategoryDropdown = []
            response.data.CategoryDropdown.map((item, i) => {
                CategoryDropdown.push({
                    Id: item.Category_Id,
                    Name: item.Category_Name,
                    Value: item.Category_Id
                });
            });
            dispatch(StudentUISlice.actions.RCategoryDropdown(CategoryDropdown));
        };


export default StudentUISlice.reducer;