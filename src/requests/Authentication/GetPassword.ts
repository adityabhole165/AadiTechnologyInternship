import { createSlice, nanoid, createAsyncThunk } from '@reduxjs/toolkit'
import GetPasswordApi from "../../api/Authentication/GetPassword";
import type { PayloadAction } from '@reduxjs/toolkit';
import { AppThunk } from 'src/store';
import { IGetPassword } from "src/interfaces/Authentication/GetPassword"

const GetPasswordslice = createSlice({
  name: 'GetPassword',
  initialState: {
    Password: [],

  },
  reducers: {
    getPassword(state, action) {
      state.Password = action.payload.GetPasswordResult;
    },

  }
});

export const getPassword =
  (data: IGetPassword): AppThunk =>
    async (dispatch) => {
      const response = await GetPasswordApi.GetPasswordResult(data);
      dispatch(GetPasswordslice.actions.getPassword(response.data));
    };


export default GetPasswordslice.reducer
