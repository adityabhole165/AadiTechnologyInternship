import { createSlice } from '@reduxjs/toolkit';
import ApiSentsms from 'src/api/SentSms/Sentsms';
import { IGetSentItemsBody} from 'src/interfaces/SentSms/Sentsms';
import { AppThunk } from 'src/store';

const SliceSentsms = createSlice({
  name: 'Requisition',
  initialState: {
    ISGetSentItems: [],

  },


  reducers: {
    RGetSentItems(state, action) {
      state.ISGetSentItems = action.payload;
    },
  }
});

export const CDAGetSentItems =
  (data: IGetSentItemsBody): AppThunk =>
  async (dispatch) => {
    const response = await ApiSentsms.GetSentItemsapi(data);
    // let abc = response.data.map((item, i) => {
    //   return {
    //     Id: item.Insert_Date,
    //     Name: item.StatusName,
    //     Value: item.StatusID,
    //   };
    // });
    dispatch(SliceSentsms.actions.RGetSentItems(response.data));
  };

 


export default SliceSentsms.reducer;
