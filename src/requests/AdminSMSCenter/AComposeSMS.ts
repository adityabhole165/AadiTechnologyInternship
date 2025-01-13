import { createSlice } from '@reduxjs/toolkit';
import GetMessageTemplateAdminSMSListApi from 'src/api/AdminSMSCenter/AComposeSMS';
import ACompose_SendSMS, {
  MessageTemplateSMSCenter
} from 'src/interfaces/AdminSMSCenter/ACompose_SendSMS';
import { AppThunk } from 'src/store';

const AComposeSMSSlice = createSlice({
  name: 'AComposeSMSTemplate',
  initialState: {
    AComposeSMSTemplateList: [],
    AComposeSMSTemplateList1: [],
    ASendSMS: [],
    Loading: true
  },
  reducers: {
    getAComposeSMSTemplateList(state, action) {
      state.AComposeSMSTemplateList = action.payload;
    },
    getAComposeSMSTemplateList1(state, action) {
      state.Loading = false;
      state.AComposeSMSTemplateList1 = action.payload;
    },
    sendSMS(state, action) {
      state.ASendSMS = action.payload;
    }
  }
});



export const getAComposeSMSTemplateList =
  (data: MessageTemplateSMSCenter): AppThunk =>
    async (dispatch) => {
      // dispatch(AComposeSMSSlice.actions.getLoading(true));
      const response = await GetMessageTemplateAdminSMSListApi.GetMessageTemplateAdminSMSList(data);
      const responseData = response.data.map((Item, i) => {
        return {
          Id: Item.RegNo,
          Name: Item.Name,
          Value: Item.Template,
          // IsActive: data.asShowSystemDefined.length > 0 ? (data.asShowSystemDefined.includes(Item.TemplateId) ?
          //   true : false) : true
        }
      })

      // let arr = []
      // let arrStd = []
      // response.data.map((Item, i) => {
      //   if (!arrStd.includes(Item.TemplateId)) {

      //     arrStd.push(Item.TemplateId)
      //     arr.push({
      //       Id: Item.RegNo,
      //       Name: Item.Name,
      //       Value: Item.Template,
      //       IsActive: true
      //     })
        // }
      // })
      dispatch(AComposeSMSSlice.actions.getAComposeSMSTemplateList(responseData))
      // dispatch(AComposeSMSSlice.actions.getAComposeSMSTemplateList1(arr))

    };


export const sendSMS =
  (data: ACompose_SendSMS): AppThunk =>
    async (dispatch) => {
      const response = await GetMessageTemplateAdminSMSListApi.SendSMS(data);
      dispatch(AComposeSMSSlice.actions.sendSMS(response.data));
    };

export default AComposeSMSSlice.reducer;
