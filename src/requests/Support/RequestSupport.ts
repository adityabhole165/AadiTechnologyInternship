import { createSlice } from '@reduxjs/toolkit'
import { AppThunk } from 'src/store';
import ApiSupport from 'src/api/Support/ApiSupport'
import { IGetSupportDetailsBody } from 'src/interfaces/Student/ISupport';

const SliceSupport = createSlice({
    name: 'Support',
    initialState: {
      SupportList: [],
      Loading: true,
    },
    reducers: {
        GetSupportDetails(state, action) {
          state.Loading = false;
          state.SupportList = action.payload;
        },
        getLoading (state,action) {
            state.Loading = true
            state.SupportList = [];
        }
        }
      });

      export const getSupportDetails =
  (data: IGetSupportDetailsBody): AppThunk =>
    async (dispatch) => {
      dispatch(SliceSupport.actions.getLoading(true));
      const response = await ApiSupport.Supportapi(data)
      dispatch(SliceSupport.actions.GetSupportDetails(response.data));
    };

export default SliceSupport.reducer
