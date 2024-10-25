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
        OcupationDropdown(state, action) {
            state.ISOcupationDropdown = action.payload;
            state.Loading = false;
        },
        getLoading(state, action) {
            state.Loading = true;
        },
    }
});

export const GetStudentRecordData =
    (data: IMasterDatastudentBody): AppThunk =>
        async (dispatch) => {
            const response = await GetStudentUIAPI.GetMasterDatastudentApi(data);
            let OcupationDropdown = []
            response.data.OcupationDropdown.map((item, i) => {
                OcupationDropdown.push({

                    Text1: item.Ocupation_Id,
                    Text2: item.Ocupation_Name,

                });
            });
            dispatch(StudentUISlice.actions.OcupationDropdown(OcupationDropdown));
        };


export default StudentUISlice.reducer;