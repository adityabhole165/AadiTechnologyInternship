import { createSlice } from '@reduxjs/toolkit';
import APIStudentDetails from 'src/api/StudentDetails/APIStudentDetails';
import { IGetStandardwiseMinMaxDOBBody } from 'src/interfaces/StudentDetails/IStudentDetails';
import { AppThunk } from 'src/store';

const GetStandardwiseMinMaxDOBslice = createSlice({
    name: 'GetStandardwiseMinMaxDOB',
    initialState: {
        StandardwiseMinMaxDOB: []
    },
    reducers: {
        GetStandardwiseMinMaxDOB(state, action) {
            state.StandardwiseMinMaxDOB = action.payload;
        }
    }
});

export const GetStandardwiseMinMaxDOB =
    (data: IGetStandardwiseMinMaxDOBBody): AppThunk =>
        async (dispatch) => {
            const response = await APIStudentDetails.GetStandardwiseMinMaxDOB(data);
            dispatch(GetStandardwiseMinMaxDOBslice.actions.GetStandardwiseMinMaxDOB(response.data));
        };

export default GetStandardwiseMinMaxDOBslice.reducer;
