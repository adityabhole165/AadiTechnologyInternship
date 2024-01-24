import { createSlice } from "@reduxjs/toolkit";
import { AppThunk } from "src/store";
import ApiPrePrimaryResult from 'src/api/PrePrimaryResult/APIUnpublishPrePrimaryResult';
import { IGetUnPublishResltBody } from "src/interfaces/PrePrimaryResult/IUnpublishPrePrimaryResult";

const UnpublishSlice = createSlice({
    name: 'PrePrimaryResult',
    initialState: {
        Unpublish:""

    },
    reducers : {
        Unpublish(state , action)
        {
            state.Unpublish=action.payload;
        },
    }
});
export const UnPublished =
  (data: IGetUnPublishResltBody): AppThunk =>
    async (dispatch) => {
      const response = await ApiPrePrimaryResult.UnPublishReslt(data)
      dispatch(UnpublishSlice.actions.Unpublish(response.data))
    }

    export default UnpublishSlice.reducer;