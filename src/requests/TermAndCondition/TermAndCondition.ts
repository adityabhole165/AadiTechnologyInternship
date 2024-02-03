import { createSlice } from '@reduxjs/toolkit';
import ChangePasswordapi from 'src/api/Authentication/ChangePassword';
import { IAcceptTermsBody } from 'src/interfaces/Common/ChangePassword';
import { AppThunk } from 'src/store';

const SliceTermsAndConditions = createSlice({
  name: 'TermAndConditions',
  initialState: {
    GetAcceptTermResult: ' '
  },

  reducers: {
    getTermsAndCondition(state, action) {
      state.GetAcceptTermResult = action.payload;
    }
  }
});

export const getTermsAndCondition =
  (data: IAcceptTermsBody): AppThunk =>
  async (dispatch) => {
    // dispatch(SliceTermsAndConditions.actions.getLoading(true));
    const response = await ChangePasswordapi.Terms(data);

    dispatch(
      SliceTermsAndConditions.actions.getTermsAndCondition(response.data)
    );
  };

export default SliceTermsAndConditions.reducer;
