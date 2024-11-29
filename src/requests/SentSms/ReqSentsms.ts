import { createSlice } from '@reduxjs/toolkit';
import ApiSentsms from 'src/api/SentSms/Sentsms';
import { ICheckIfPersonalAddressExistsBody, ICheckIfPersonalAddressGroupAlreadyExistsBody, IDeletePersonalAddressBookBody, IDeletePersonalAddressBookGroupBody, IDeleteSMSBody, IExportSentItemsBody, IGetAddressBookGroupDetailsBody, IGetAddressBookGroupListBody, IGetAddressBookListBody, IGetDetailsOfGroupsBody, IGetSentItemsBody, IInsertPersonalAddressBookBody, IInsertPersonalAddressBookGroupBody, IUpdatePersonalAddressBookBody, IUpdatePersonalAddressBookGroupBody } from 'src/interfaces/SentSms/Sentsms';
import { AppThunk } from 'src/store';

const SliceSentsms = createSlice({
  name: 'Requisition',
  initialState: {
    ISGetSentItems: [],
    ISPersonalAddressBookList: [],
    ISCheckIfPersonalAddressExists: 'NoResponse',
    ISAddPersonalAddBookMsg: '',
    ISInsertPersonalAddressBookGroupMsg: '',
    ISDeletePersonalAddressBookMsg: '',
    ISGetAddressBookGroupList: [],
    ISGetAddressBookGroupDetails: [],
    ISCheckIfPersonalAddressGroupAlreadyExists: 'NoResponse',
    ISUpdatePersonalAddressBookGroupMsg: '',
    ISDeletePersonalAddressBookGroupMsg: '',
    ISDeleteSMS: '',
    ISGetDetailsOfGroups: [],
    Loading: false,
    ISExportSentItems: [],
  },


  reducers: {
    getLoading(state, action) {
      state.Loading = true;
    },
    RGetSentItems(state, action) {
      state.ISGetSentItems = action.payload;
    },
    RGetDetailsOfGroups(state, action) {
      state.ISGetDetailsOfGroups = action.payload;
      state.Loading = false;
    },
    RClearGetDetailsOfGroups(state) {
      state.ISGetDetailsOfGroups = [];
    },
    RPersonalAddressBookList(state, action) {
      state.ISPersonalAddressBookList = action.payload;
    },
    RCheckIfPersonalAddressExistsapi(state, action) {
      state.ISCheckIfPersonalAddressExists = action.payload;
    },
    RCheckIfPersonalAddressGroupAlreadyExists(state, action) {
      state.ISCheckIfPersonalAddressGroupAlreadyExists = action.payload;
    },
    RClearIsPersonalAddressExists(state) {
      state.ISCheckIfPersonalAddressExists = 'NoResponse';
    },
    RClearIfPersonalAddressGroupAlreadyExists(state) {
      state.ISCheckIfPersonalAddressGroupAlreadyExists = 'NoResponse';
    },
    RAddPersonalAddBookMsg(state, action) {
      state.ISAddPersonalAddBookMsg = action.payload;
    },
    // ISInsertPersonalAddressBookGroupMsg
    RInsertPersonalAddressBookGroupMsg(state, action) {
      state.ISInsertPersonalAddressBookGroupMsg = action.payload;
    },
    RClearInsertPersonalAddressBookGroupMsg(state) {
      state.ISInsertPersonalAddressBookGroupMsg = '';
    },
    // UpdatePersonalAddressBookGroupapi
    RUpdatePersonalAddressBookGroupMsg(state, action) {
      state.ISUpdatePersonalAddressBookGroupMsg = action.payload;
    },
    RClearUpdatePersonalAddressBookGroupMsg(state) {
      state.ISUpdatePersonalAddressBookGroupMsg = '';
    },
    RClearAddPersonalAddBookMsg(state) {
      state.ISAddPersonalAddBookMsg = '';
    },
    RDeletePersonalAddressBookMsg(state, action) {
      state.ISDeletePersonalAddressBookMsg = action.payload;
    },
    RClearDeletePersonalAddressBookMsg(state) {
      state.ISDeletePersonalAddressBookMsg = '';
    },
    RGetAddressBookGroupList(state, action) {
      state.ISGetAddressBookGroupList = action.payload;
    },
    RGetAddressBookGroupDetails(state, action) {
      state.ISGetAddressBookGroupDetails = action.payload;
    },
    // ISDeletePersonalAddressBookGroupMsg
    RDeletePersonalAddressBookGroupMsg(state, action) {
      state.ISDeletePersonalAddressBookGroupMsg = action.payload;
    },
    RClearDeletePersonalAddressBookGroupMsg(state) {
      state.ISDeletePersonalAddressBookGroupMsg = '';
    },
    RDeleteSMSApi(state, action) {
      state.ISDeleteSMS = action.payload;
    },
    ResetDelete(state,) {
      state.ISDeleteSMS = '';
    },


    RExportSentItems(state, action) {
      state.ISExportSentItems = action.payload;
    },




  }
});

export const CDAGetSentItems =
  (data: IGetSentItemsBody): AppThunk =>
    async (dispatch) => {
      const response = await ApiSentsms.GetSentItemsapi(data);
      let SentItems = response.data.map((item, i) => {
        return {
          RowID: item.RowID,
          TotalRows: item.TotalRows,
          Read_Message_Flag: item.Read_Message_Flag,
          UserName: item.UserName,
          Subject: item.Subject,
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
//GetAddressBookListapi
export const CDAGetPersonalAddressBookList =
  (data: IGetAddressBookListBody): AppThunk =>
    async (dispatch) => {
      const response = await ApiSentsms.GetAddressBookListapi(data);
      let PersonalAddressBookList = response.data.map((item, i) => {
        return {
          PersonalAddressBookId: item.PersonalAddressBookId,
          User_Id: item.User_Id,
          Name: item.Name,
          Mobile_No: item.Mobile_No,
          Is_Deleted: item.Is_Deleted,
          Insert_Date: item.Insert_Date,
          Inserted_By_id: item.Inserted_By_id,
          Update_Date: item.Update_Date,
          Updated_By_Id: item.Updated_By_Id,
          IsActive: false,
        };
      });
      dispatch(SliceSentsms.actions.RPersonalAddressBookList(PersonalAddressBookList));
    }

export const CDAGetCheckIfPersonalAddressExists =
  (data: ICheckIfPersonalAddressExistsBody, data1: IInsertPersonalAddressBookBody, data2: IUpdatePersonalAddressBookBody, formType: string): AppThunk =>
    async (dispatch, getState) => {
      const response = await ApiSentsms.CheckIfPersonalAddressExistsapi(data);
      let CheckIfPersonalAddressExists = response.data;
      await dispatch(SliceSentsms.actions.RCheckIfPersonalAddressExistsapi(CheckIfPersonalAddressExists));
      const { ISCheckIfPersonalAddressExists } = getState().SentSms;
      if (ISCheckIfPersonalAddressExists === '') {
        if (formType === 'Add') {
          dispatch(CDAGetInsertPersonalAddressBook(data1))
        } else if (formType === 'Edit') {
          dispatch(CDAGetUpdatePersonalAddressBook(data2))
        }
      }

    }

// CheckIfPersonalAddressGroupAlreadyExistsapi
export const CDAGetCheckIfPersonalAddressGroupAlreadyExists =
  (data: ICheckIfPersonalAddressGroupAlreadyExistsBody, data1: IInsertPersonalAddressBookGroupBody, data2: IUpdatePersonalAddressBookGroupBody, formType: string): AppThunk =>
    async (dispatch, getState) => {
      const response = await ApiSentsms.CheckIfPersonalAddressGroupAlreadyExistsapi(data);
      let CheckIfPersonalAddressGroupAlreadyExists = response.data;
      await dispatch(SliceSentsms.actions.RCheckIfPersonalAddressGroupAlreadyExists(CheckIfPersonalAddressGroupAlreadyExists));
      const { ISCheckIfPersonalAddressGroupAlreadyExists } = getState().SentSms;
      if (ISCheckIfPersonalAddressGroupAlreadyExists === '') {
        if (formType === 'Add') {
          dispatch(CDAGetInsertPersonalAddressBookGroup(data1))
        } else if (formType === 'Edit') {
          dispatch(CDAGetUpdatePersonalAddressBookGroup(data2))
        }
      }
    }
export const CDAGetClearIsPersonalAddressExists =
  (): AppThunk =>
    async (dispatch) => {
      dispatch(SliceSentsms.actions.RClearIsPersonalAddressExists());
    }
// RClearIfPersonalAddressGroupAlreadyExists
export const CDAGetClearIsPersonalAddressGroupAlreadyExists =
  (): AppThunk =>
    async (dispatch) => {
      dispatch(SliceSentsms.actions.RClearIfPersonalAddressGroupAlreadyExists());
    }
// InsertPersonalAddressBookapi
export const CDAGetInsertPersonalAddressBook =
  (data: IInsertPersonalAddressBookBody): AppThunk =>
    async (dispatch) => {
      const response = await ApiSentsms.InsertPersonalAddressBookapi(data);
      let AddPersonalAddBookMsg = response.data;
      dispatch(SliceSentsms.actions.RAddPersonalAddBookMsg(AddPersonalAddBookMsg));
    }
export const CDAGetClearAddPersonalAddBookMsg =
  (): AppThunk =>
    async (dispatch) => {
      dispatch(SliceSentsms.actions.RClearAddPersonalAddBookMsg());
    }
// DeletePersonalAddressBookapi
export const CDAGetDeletePersonalAddressBook =
  (data: IDeletePersonalAddressBookBody): AppThunk =>
    async (dispatch) => {
      const response = await ApiSentsms.DeletePersonalAddressBookapi(data);
      let DeletePersonalAddressBookMsg = response.data;
      dispatch(SliceSentsms.actions.RDeletePersonalAddressBookMsg(DeletePersonalAddressBookMsg));
    }
export const CDAGetClearDeletePersonalAddressBookMsg =
  (): AppThunk =>
    async (dispatch) => {
      dispatch(SliceSentsms.actions.RClearDeletePersonalAddressBookMsg());
    }

// UpdatePersonalAddressBookapi | update api but push msg to insert initial stats and reducers
export const CDAGetUpdatePersonalAddressBook =
  (data: IUpdatePersonalAddressBookBody): AppThunk =>
    async (dispatch) => {
      const response = await ApiSentsms.UpdatePersonalAddressBookapi(data);
      let UpdatePersonalAddressBookMsg = response.data;
      dispatch(SliceSentsms.actions.RAddPersonalAddBookMsg(UpdatePersonalAddressBookMsg));
    }
// GetAddressBookGroupList
export const CDAGetAddressBookGroupList =
  (data: IGetAddressBookGroupListBody): AppThunk =>
    async (dispatch) => {
      const response = await ApiSentsms.GetAddressBookGroupListapi(data);
      let AddressBookGroupList = response.data.map((item, i) => {
        return {
          PersonalAddressBookGroupId: item.PersonalAddressBookGroupId,
          User_Id: item.User_Id,
          Name: item.Name,
          Is_Deleted: item.Is_Deleted,
          IsActive: item.Ischeck.toLowerCase() === 'false' ? false : true,
        };
      });
      dispatch(SliceSentsms.actions.RGetAddressBookGroupList(AddressBookGroupList));
    }
// GetAddressBookGroupDetails
export const CDAGetAddressBookGroupDetails =
  (data: IGetAddressBookGroupDetailsBody): AppThunk =>
    async (dispatch) => {
      const response = await ApiSentsms.GetAddressBookGroupDetailsapi(data);
      let AddressBookGroupDetails = response.data.map((item, i) => {
        return {
          PersonalAddressBookId: item.PersonalAddressBookId,
          User_Id: item.User_Id,
          Name: item.Name,
          Mobile_No: item.Mobile_No,
          Is_Deleted: item.Is_Deleted,
          IsActive: item.IsInGroup.toLowerCase() === 'false' ? false : true,
        };
      });
      dispatch(SliceSentsms.actions.RGetAddressBookGroupDetails(AddressBookGroupDetails));
    }
// InsertPersonalAddressBookGroupapi
// RInsertPersonalAddressBookGroupMsg
export const CDAGetInsertPersonalAddressBookGroup =
  (data: IInsertPersonalAddressBookGroupBody): AppThunk =>
    async (dispatch) => {
      const response = await ApiSentsms.InsertPersonalAddressBookGroupapi(data);
      let AddPersonalAddBookGroupMsg = response.data;
      dispatch(SliceSentsms.actions.RInsertPersonalAddressBookGroupMsg(AddPersonalAddBookGroupMsg));
    }
export const CDAGetClearInsertPersonalAddressBookGroupMsg =
  (): AppThunk =>
    async (dispatch) => {
      dispatch(SliceSentsms.actions.RClearInsertPersonalAddressBookGroupMsg());
    }
// RUpdatePersonalAddressBookGroupMsg 
export const CDAGetUpdatePersonalAddressBookGroup =
  (data: IUpdatePersonalAddressBookGroupBody): AppThunk =>
    async (dispatch) => {
      const response = await ApiSentsms.UpdatePersonalAddressBookGroupapi(data);
      let UpdatePersonalAddressBookGroupMsg = response.data;
      dispatch(SliceSentsms.actions.RInsertPersonalAddressBookGroupMsg(UpdatePersonalAddressBookGroupMsg));
    }

export const CDAGetClearUpdatePersonalAddressBookGroupMsg =
  (): AppThunk =>
    async (dispatch) => {
      dispatch(SliceSentsms.actions.RClearUpdatePersonalAddressBookGroupMsg());
    }
// RDeletePersonalAddressBookGroupMsg DeletePersonalAddressBookGroupapi IDeletePersonalAddressBookGroupBody
export const CDAGetDeletePersonalAddressBookGroup =
  (data: IDeletePersonalAddressBookGroupBody): AppThunk =>
    async (dispatch) => {
      const response = await ApiSentsms.DeletePersonalAddressBookGroupapi(data);
      let DeletePersonalAddressBookGroupMsg = response.data;
      dispatch(SliceSentsms.actions.RDeletePersonalAddressBookGroupMsg(DeletePersonalAddressBookGroupMsg));
    }
export const CDAGetClearDeletePersonalAddressBookGroupMsg =
  (): AppThunk =>
    async (dispatch) => {
      dispatch(SliceSentsms.actions.RClearDeletePersonalAddressBookGroupMsg());
    }

// RGetDetailsOfGroups GetDetailsOfGroupsapi IGetDetailsOfGroupsBody
export const CDAGetGetDetailsOfGroups =
  (data: IGetDetailsOfGroupsBody): AppThunk =>
    async (dispatch) => {
      dispatch(SliceSentsms.actions.RClearGetDetailsOfGroups());
      // getLoading
      dispatch(SliceSentsms.actions.getLoading(true));
      const response = await ApiSentsms.GetDetailsOfGroupsapi(data);
      let GetDetailsOfGroups = response.data;
      dispatch(SliceSentsms.actions.RGetDetailsOfGroups(GetDetailsOfGroups));
    }



export const CDADeleteSMSApi =
  (data: IDeleteSMSBody): AppThunk =>
    async (dispatch) => {
      const response = await ApiSentsms.DeleteSMSApi(data);
      dispatch(SliceSentsms.actions.RDeleteSMSApi(response.data));
    };


export const CDAResetDelete =
  (): AppThunk =>
    async (dispatch) => {
      dispatch(SliceSentsms.actions.ResetDelete());
    }

export const CDAExportSentItems =
  (data: IExportSentItemsBody): AppThunk =>
    async (dispatch) => {
      const response = await ApiSentsms.ExportSentItemsApi(data);
      dispatch(SliceSentsms.actions.RExportSentItems(response.data));
    };

export default SliceSentsms.reducer;
