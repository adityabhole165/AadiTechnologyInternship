import { createSlice } from '@reduxjs/toolkit'
import { AppThunk } from 'src/store';
import ApiSupport from 'src/api/Support/ApiSupport'
import {ISaveStudentDetailsForSupportBody } from 'src/interfaces/Student/ISupport';

const SliceSupport = createSlice({
    name: 'Support',
    initialState: {
      SaveSupport:{},
      Loading: true,
    },
    reducers: {
        GetSaveSupport(state, action) {
          state.Loading = false;
          state.SaveSupport = action.payload;
        },
        getLoading (state,action) {
            state.Loading = true
            state.SaveSupport = {};
        }
        }
      });

    export const getSaveSupport =
  (data: ISaveStudentDetailsForSupportBody): AppThunk =>
    async (dispatch) => {
      dispatch(SliceSupport.actions.getLoading(true));
      const response = await ApiSupport.SaveSupportapi(data)
      dispatch(SliceSupport.actions.GetSaveSupport(response.data));
    };

export default SliceSupport.reducer
