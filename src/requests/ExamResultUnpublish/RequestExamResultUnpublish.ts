import { createSlice } from '@reduxjs/toolkit';
import UnPublishTestApi from 'src/api/ExamResultUnpublish/ApiExamResultUnpublish';
import { IUnPublishTestBody } from 'src/interfaces/ExamResultUnpublish/IExamResultUnpublish';
import { AppThunk } from 'src/store';

const UnPublishTestSlice = createSlice({
  name: 'UnPublishTest',
  initialState: {
    UnPublish: ''
  },

  reducers: {
    UnPublishButton(state, action) {
      state.UnPublish = action.payload;
    }
  }
});
export const UnPublishButton =
  (data: IUnPublishTestBody): AppThunk =>
  async (dispatch) => {
    const response = await UnPublishTestApi.UnPublishTest(data);
    dispatch(UnPublishTestSlice.actions.UnPublishButton(response.data));
  };

export default UnPublishTestSlice.reducer;
