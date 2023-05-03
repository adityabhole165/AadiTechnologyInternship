import { createSlice } from '@reduxjs/toolkit'
import ChangePasswordapi from 'src/api/Authentication/ChangePassword';
import { AppThunk } from 'src/store';
import {IAcceptTermsBody} from "src/interfaces/Common/ChangePassword";

const SliceTermsAndConditions = createSlice({
    name: 'TermAndConditions',
    initialState: {
        AcceptTermResult:{}
    },


    reducers: {
      getTermsAndCondition(state, action) {
        state.AcceptTermResult = action.payload;
        
      }
    }
});

      
export const getTermsAndCondition =
(data: IAcceptTermsBody): AppThunk =>
  async (dispatch) => {
    // dispatch(SliceTermsAndConditions.actions.getLoading(true));
    const response = await ChangePasswordapi.Terms(data)
    dispatch(SliceTermsAndConditions.actions.getTermsAndCondition(response.data));
    console.log("data", response.data)
  };


  export default SliceTermsAndConditions.reducer;