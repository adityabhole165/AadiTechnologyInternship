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
    let SentItems = response.data.map((item, i) => {
      return {
        RowID:item.RowID,
        TotalRows:item.TotalRows ,
        Read_Message_Flag:item.Read_Message_Flag,
        UserName:item.UserName,
        Subject:item.Subject,
        Insert_Date: item.Insert_Date,
        Id: item.SMS_Id,
        SMS_Receiver_Details_Id: item.SMS_Receiver_Details_Id,
        StatusId: item.StatusId,
        SenderName: item.SenderName,
        SMSShootId: item.SMSShootId,
        IsActive: false,
      
      };
    });
    dispatch(SliceSentsms.actions.RGetSentItems(SentItems));
  };

 


export default SliceSentsms.reducer;
