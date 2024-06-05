import { createSlice } from '@reduxjs/toolkit';
import ApiRequisition from 'src/api/Requisition/APIRequisition';
import { getDateMonthYearFormatted } from 'src/components/Common/Util';
import {
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
    ISDeleteRequisition:"",


  },
  reducers: {
    Requisition(state, action) {
      state.Requisition = action.payload;
    },
    RequisitionList(state, action) {
      state.RequisitionList = action.payload;
    },
    RDeleteRequisition(state, action) {
      state.ISDeleteRequisition = action.payload;
    },
  
    RresetMessage(state) {
      state.ISDeleteRequisition = '';
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
        Value: item.StatusID
      };
    });
    dispatch(SliceRequisition.actions.Requisition(abc));
  };
export const RequisitionListt =
  (data: IGetPagedRequisitionBody): AppThunk =>
  async (dispatch) => {
    const response = await ApiRequisition.RequisitionListApi(data);
    let abc = response.data.map((item, i) => {
      return {
        Id: item.RequisitionID,
        RequisitionCode: item.RequisitionCode,
        RequisitionName: item.RequisitionName,
        StatusName: item.StatusName,
        CreaterName: item.CreaterName,
        Created_Date: getDateMonthYearFormatted(item.Created_Date),
        Editble: item.Editble,
        IsDelete: item.IsDelete,
        IsFinalApproval: item.IsFinalApproval,
      };
    });
    dispatch(SliceRequisition.actions.RequisitionList(abc));
  };

  export const CDADeleteRequisitionn =
  (data: IGetDeleteRequisitionBody): AppThunk =>
  async (dispatch) => {
    const response = await ApiRequisition.DeleteRequisition(data);
    dispatch(SliceRequisition.actions.RDeleteRequisition(response.data));
  };

  export const resetMessage= (): AppThunk => async (dispatch) => {
    dispatch(SliceRequisition.actions.RresetMessage());
  };


export default SliceRequisition.reducer;
