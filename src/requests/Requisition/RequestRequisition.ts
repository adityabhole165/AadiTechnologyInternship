import { createSlice } from '@reduxjs/toolkit';
import ApiRequisition from 'src/api/Requisition/APIRequisition';
import { getDateMonthYearFormatted } from 'src/components/Common/Util';
import {
  IGetCancelRequisitionBody,
  IGetDeleteRequisitionBody,
  IGetPagedRequisitionBody,
  IGetRequisitionStatusBody
} from 'src/interfaces/Requisition/IRequisition';
import { AppThunk } from 'src/store';

const SliceRequisition = createSlice({
  name: 'Requisition',
  initialState: {
    Requisition: [],
    RequisitionList: [],
    RequisitionListCount: [],
    ISDeleteRequisition: "",
    ISCancelRequisition: ""


  },
  reducers: {
    Requisition(state, action) {
      state.Requisition = action.payload;
    },
    RequisitionList(state, action) {
      state.RequisitionList = action.payload;
    },

    CountRequisitionList(state, action) {
      state.RequisitionListCount = action.payload;
    },

    RDeleteRequisition(state, action) {
      state.ISDeleteRequisition = action.payload;
    },
    RCancelRequisition(state, action) {
      state.ISCancelRequisition = action.payload;
    },

    RresetMessageDeleteRequisitionn(state) {
      state.ISDeleteRequisition = "";
    },

    RresetMessageCancelRequisition(state) {
      state.ISCancelRequisition = "";
    },


  }
});

export const RequisitionStatus =
  (data: IGetRequisitionStatusBody): AppThunk =>
    async (dispatch) => {
      const response = await ApiRequisition.RequisitionApi(data);
      let abc = response.data.map((item, i) => {
        return {
          Id: item.Insert_Date,
          Name: item.StatusName,
          Value: item.StatusID,
        };
      });
      dispatch(SliceRequisition.actions.Requisition(abc));
    };
export const RequisitionListt =
  (data: IGetPagedRequisitionBody): AppThunk =>
    async (dispatch) => {
      const response = await ApiRequisition.RequisitionListApi(data);

      let abc = response.data.GetPagedRequisitionList.map((item, i) => {
        return {
          Id: item.RequisitionID,
          RequisitionCode: item.RequisitionCode,
          RequisitionName: item.RequisitionName,
          StatusName: item.StatusName,
          CreaterName: item.CreaterName,
          Created_Date: item.Created_Date,
          ExpiryDate: item.ExpiryDate ? getDateMonthYearFormatted(item.ExpiryDate) : "-",
          Editble: item.Editble,
          IsDelete: item.IsDelete,
          IsFinalApproval: item.IsFinalApproval,
          Value: item.CreatedId,
          StatusID: item.StatusID,
          CreatedId: item.CreatedId,
        };
      });

      dispatch(SliceRequisition.actions.RequisitionList(abc));

      dispatch(SliceRequisition.actions.CountRequisitionList(response.data.TotalCountRequisitionDetails));
    };


export const CDADeleteRequisitionn =
  (data: IGetDeleteRequisitionBody): AppThunk =>
    async (dispatch) => {
      const response = await ApiRequisition.DeleteRequisition(data);
      dispatch(SliceRequisition.actions.RDeleteRequisition(response.data));
    };

export const CDACancelRequisition =
  (data: IGetCancelRequisitionBody): AppThunk =>
    async (dispatch) => {
      const response = await ApiRequisition.CancelRequisition(data);
      dispatch(SliceRequisition.actions.RCancelRequisition(response.data));
    };


export const resetMessageDeleteRequisitionn = (): AppThunk => async (dispatch) => {
  dispatch(SliceRequisition.actions.RresetMessageDeleteRequisitionn());
};
export const resetMessageCancelRequisition = (): AppThunk => async (dispatch) => {
  dispatch(SliceRequisition.actions.RresetMessageCancelRequisition());
};





export default SliceRequisition.reducer;
