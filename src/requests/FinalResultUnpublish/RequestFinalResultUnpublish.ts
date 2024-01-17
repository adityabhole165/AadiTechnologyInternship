import { createSlice } from '@reduxjs/toolkit';
import { AppThunk } from 'src/store';
import { IUnPublishFinalResultBody,IUnPublishFinalResultResult } from "src/interfaces/FinalResultUnpublish/IFinalResultUnpublish";
import UnPublishApi from 'src/api/FinalResultUnpublish/ApiFinalResultUnpublish';

const FinalUnPublishTestSlice = createSlice({
    name: 'UnPublish final result',
    initialState: { 
        UnPublishfinal:""
        
    },

    reducers: {
        UnPublishButton(state, action) {
            state.UnPublishfinal = action.payload;
        },
        
    }
});
export const UnPublishclick =
  (data: IUnPublishFinalResultBody): AppThunk =>
    async (dispatch) => {
      const response = await UnPublishApi.UnPublishFinalResult(data)
      dispatch(FinalUnPublishTestSlice.actions.UnPublishButton(response.data))
    }
    
    export default FinalUnPublishTestSlice.reducer;