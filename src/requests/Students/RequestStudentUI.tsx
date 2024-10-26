import { createSlice } from '@reduxjs/toolkit';
import GetStudentUIAPI from 'src/api/Students/ApiStudentUI';
import { IMasterDatastudentBody } from 'src/interfaces/Students/IStudentUI';
import { AppThunk } from 'src/store';
const StudentUISlice = createSlice({
    name: 'StudentUI',

    initialState: {
        ISOcupationDropdown: [],
        Loading: true
    },
    reducers: {
        ROcupationDropdown(state, action) {
            state.ISOcupationDropdown = action.payload;
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
                    value: item.Ocupation_Id

                });
            });
            dispatch(StudentUISlice.actions.ROcupationDropdown(OcupationDropdown));
        };


export default StudentUISlice.reducer;