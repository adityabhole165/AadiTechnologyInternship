import { createSlice } from '@reduxjs/toolkit';
import DraftMessageApi from 'src/api/MessageCenter/ApiDraftMessage';
import MessageCenterApi from 'src/api/MessageCenter/MessageCenter';
import SentMessageApi from 'src/api/Student/SentMessage';
import {
  encodeURL,
  getDateMonthYearFormatted,
  getWithoutHTML,
  isFutureDateTime
} from 'src/components/Common/Util';
import {
  IUpdateReadReceiptStatusBody,
  IgetList
} from 'src/interfaces/MessageCenter/GetList';
import { AppThunk } from 'src/store';
import InboxMessageApi from '../../api/MessageCenter/InboxMessage';

const InboxMessageSlice = createSlice({
  name: 'Message Center',
  initialState: {
    InboxList: [],
    NextPageList: [],
    UnReadMessage: null,
    trashUnReadMessage: null,
    FilterData: false,
    Loading: true,
    ReadReceiptMessage: '',
    TotalCountLabel: null
  },
  reducers: {
    getInboxList(state, action) {
      state.Loading = false;
      state.InboxList = action.payload.GetMessagesResult;
    },
    Messages(state, action) {
      state.Loading = false;
      state.InboxList = action.payload;
    },

    NextMessages(state, action) {
      state.NextPageList = action.payload;
    },
    MarkReadMessage(state, action) {
      state.UnReadMessage = action.payload;
    },
    TrashMarkReadMessage(state, action) {
      state.trashUnReadMessage = action.payload;
    },
    getTotalCountLabel(state, action) {
      state.TotalCountLabel = action.payload;
    },
    getFilterData(state, action) {
      state.FilterData = action.payload;
    },
    getReadReceiptMessage(state, action) {
      state.ReadReceiptMessage = action.payload;
      state.Loading = false;
    },
    getLoading(state, action) {
      state.Loading = true;
      state.InboxList = [];
      state.NextPageList = [];
    }
  }
});

export const getListOfMessages =
  (body, ActiveTab: string, Pagination: boolean): AppThunk =>
    async (dispatch) => {
      if (!Pagination) {
        dispatch(InboxMessageSlice.actions.getLoading(true));
      }

      if (ActiveTab === 'Inbox') {
        const response = await InboxMessageApi.GetInboxList(body);
        const data = response.data.GetMessagesResult.map((item) => {
          return {
            Id: item.DetailsId,
            text1: item.Subject,
            text2: item.UserName,
            text3: item.FullDate,
            NavPath: encodeURL(item.DetailsId) + '/' + encodeURL('Inbox'),
            isActive: false,
            DetailsId: item.DetailsId,
            ReceiverDetailsId: item.ReceiverDetailsId,
            IsRead: item.IsRead,
            IsAttachmentExist: item.IsAttachmentExist,
            RequestReadReceipt: item.RequestReadReceipt
          };
        });
        let UnreadMessage = response.data.UnreadMessageTotalCount;
        dispatch(InboxMessageSlice.actions.MarkReadMessage(UnreadMessage));
        dispatch(InboxMessageSlice.actions.getTotalCountLabel(response.data?.TotalCountLabel));
        if (Pagination == true) {
          dispatch(InboxMessageSlice.actions.NextMessages(data));
        }
        if (Pagination == false) {
          dispatch(InboxMessageSlice.actions.Messages(data));
        }
      }
      if (ActiveTab === 'Sent') {
        const response = await SentMessageApi.GetSentMessageList(body);
        let data = [];
        data = response.data.GetScheduledSMSResult?.map((item) => {
          let msgDate = item.Date + ' ' + item.Time;
          if (msgDate !== undefined) {
            let msgDateArr = msgDate.split(' ');
            if (msgDateArr.length === 4)
              msgDate =
                msgDateArr[0] +
                ' ' +
                msgDateArr[1] +
                ' 2023 ' +
                msgDateArr[2] +
                ' ' +
                msgDateArr[3];
            else if (msgDateArr.length === 4 || msgDateArr.length === 3)
              msgDate =
                msgDateArr[0] + ' ' + msgDateArr[1] + ' 2023 ' + msgDateArr[2];
          }
          return {
            Id: item.DetailsId,
            text1: item.Subject,
            text2: item.UserName,
            text3: item.FullDate,
            text4: item.CcUserName,
            NavPath: encodeURL(item.DetailsId) + '/' + encodeURL('/Sent'),
            isActive: false,
            DetailsId: item.DetailsId,
            ReceiverDetailsId: item.ReceiverDetailsId,
            IsSchedule: isFutureDateTime(msgDate),
            HasReadReceipt: item.HasReadReceipt,
            RequestReadReceipt: item.RequestReadReceipt,
            TotalCountLabel: item.TotalCountLabel
          };
        });
        data = data === undefined ? [] : data;
        dispatch(InboxMessageSlice.actions.getTotalCountLabel(response.data?.TotalCountLabel));
        if (Pagination == true) {
          dispatch(InboxMessageSlice.actions.NextMessages(data));
        }
        if (Pagination == false) {
          dispatch(InboxMessageSlice.actions.Messages(data));
        }
      }
      if (ActiveTab === 'Trash') {
        const response = await MessageCenterApi.GetTrashList(body);
        let data = []
        if (response.data.GetTrashMessagesResult !== null) {
          data = response.data.GetTrashMessagesResult?.map((item) => {
            return {
              Id: item.DetailsId,
              text1: item.Subject,
              text2: item.UserName,
              text3: item.FullDate,
              text4: item.CcUserName,
              NavPath: encodeURL(item.DetailsId) + '/' + encodeURL('/Trash'),
              isActive: false,
              IsRead: item.IsRead,
              DetailsId: item.DetailsId,
              ReceiverDetailsId:
                item.ReceiverDetailsId === '0'
                  ? item.DetailsId
                  : item.ReceiverDetailsId,
              TotalCountLabel: item.TotalCountLabel
            };
          });
        }
        //console.log(response.data?.UnreadMessagesCount.UnreadMessageTotalCount, 'data-----');
        let UnreadMessage = response.data.UnreadMessagesCount;
        dispatch(InboxMessageSlice.actions.TrashMarkReadMessage(UnreadMessage));
        dispatch(InboxMessageSlice.actions.getTotalCountLabel(response.data.TotalCountLabel));

        if (Pagination == true) {
          dispatch(InboxMessageSlice.actions.NextMessages(data));
        }
        if (Pagination == false) {
          dispatch(InboxMessageSlice.actions.Messages(data));
        }
      }
      if (ActiveTab.trim() === 'Draft') {
        const response = await DraftMessageApi.GetAllDraftMessage(body);
        const data = response.data.GetAllDraftMessageDetails.map((item) => {
          return {
            Id: item.Id,
            text1: item.Subject,
            text2: getWithoutHTML(item.MessageBody),
            text3: getDateMonthYearFormatted(item.DraftDate),
            NavPath: encodeURL(item.Id) + '/' + encodeURL('/Draft'),
            isActive: false,
            DetailsId: item.Id,
            ReceiverDetailsId: item.Id
          };
        });
        dispatch(InboxMessageSlice.actions.getTotalCountLabel(response.data.TotalCountLabel));
        if (Pagination == true) {
          dispatch(InboxMessageSlice.actions.NextMessages(data));
        }
        if (Pagination == false) {
          dispatch(InboxMessageSlice.actions.Messages(data));
        }
      }
    };

export const getInboxList =
  (data: IgetList): AppThunk =>
    async (dispatch) => {
      dispatch(InboxMessageSlice.actions.getLoading(true));
      dispatch(InboxMessageSlice.actions.getFilterData(false));
      const response = await InboxMessageApi.GetInboxList(data);
      dispatch(InboxMessageSlice.actions.getInboxList(response.data));
    };

export const getNextPageInboxList =
  (data: IgetList): AppThunk =>
    async (dispatch) => {
      dispatch(InboxMessageSlice.actions.getLoading(true));
      dispatch(InboxMessageSlice.actions.getFilterData(true));
      const response = await InboxMessageApi.GetInboxList(data);
      dispatch(InboxMessageSlice.actions.getInboxList(response.data));
    };

export const getUpdateReadReceiptStatus =
  (data: IUpdateReadReceiptStatusBody): AppThunk =>
    async (dispatch) => {
      dispatch(InboxMessageSlice.actions.getLoading(true));
      const response = await InboxMessageApi.UpdateReadReceiptStatus(data);
      dispatch(InboxMessageSlice.actions.getReadReceiptMessage(response.data));
    };

export default InboxMessageSlice.reducer;
