import { createSlice } from '@reduxjs/toolkit';
import ViewHomeworkApi from 'src/api/AssignHomework/ViewHomeworkApi';
import { IGetHomeworkDetailBody } from 'src/interfaces/AssignHomework/IViewHomework';
import { AppThunk } from 'src/store';

const ViewHomeworkSlice = createSlice({
  name: 'ViewHomework',
  initialState: {
    GetHomeworkDetail: []
  },
  reducers: {
    gethomeworkdetail(state, action) {
      state.GetHomeworkDetail = action.payload;
    }
  }
});
export const GetHomeworkDetails =
  (data: IGetHomeworkDetailBody): AppThunk =>
  async (dispatch) => {
    const response = await ViewHomeworkApi.HomeworkDetail(data);
    dispatch(ViewHomeworkSlice.actions.gethomeworkdetail(response.data));
  };
export default ViewHomeworkSlice.reducer;
