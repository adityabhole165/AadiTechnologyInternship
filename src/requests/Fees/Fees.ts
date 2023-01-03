import { createSlice, nanoid, createAsyncThunk } from '@reduxjs/toolkit'
import FeesApi from "../../api/Fees/Fees";
import type { PayloadAction } from '@reduxjs/toolkit';
import { AppThunk } from 'src/store';
import IFees, { IGetReceiptFileName, IPayOnline } from 'src/interfaces/Student/Fees';
import IReceipt from 'src/interfaces/Student/Fees';

const Feesslice = createSlice({
  name: 'Fees',
  initialState:{
    FeesData:[],
    FeesData2:[],
    paymentUrl:[],
    ReceiptFileName:""
  },
    
    

  reducers: {
    getFees(state,action){
      state.FeesData=action.payload.GetFeeDetailsResult.FeeDetails;
      state.FeesData2=action.payload.GetFeeDetailsResult;
    },
    
    payOnline (state,action) {
      state.paymentUrl =action.payload.GetSingleSignOnPageEncryptedURLResult
    }, 

    getReceiptFileName (state,action) {
      state.ReceiptFileName =action.payload
    }  , 

    resetReciept (state,action) {
      state.ReceiptFileName =""
    }  
  }   
});


export const getFees =
  (data:IFees): AppThunk =>
  async (dispatch) => {
    const response = await FeesApi.GetFeesList (data);
    dispatch(Feesslice.actions.getFees(response.data));
  };

  export const payOnline =
  (data:IPayOnline): AppThunk =>
  async (dispatch) => {
    const response = await FeesApi.getPaymentUrl (data);
    dispatch(Feesslice.actions.payOnline(response.data));
  };

  export const getReceiptFileName =
  (data:IGetReceiptFileName): AppThunk =>
  async (dispatch) => {
    const response = await FeesApi.getReceiptFileName(data);
    dispatch(Feesslice.actions.getReceiptFileName(response.data));
  };
  export const resetReciept =
  (): AppThunk =>
  async (dispatch) => {
    dispatch(Feesslice.actions.resetReciept(""));
  };

export default Feesslice.reducer
