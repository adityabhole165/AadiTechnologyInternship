import { createSlice, nanoid, createAsyncThunk } from '@reduxjs/toolkit'
import FeesApi from "../../Api/Student/Fees";
import type { PayloadAction } from '@reduxjs/toolkit';
import { AppThunk } from 'src/store';
import IFees, { IPayOnline } from 'src/Interface/Student/Fees';
import IReceipt from 'src/Interface/Student/Fees';

const Feesslice = createSlice({
  name: 'Fees',
  initialState:{
    FeesData:[],
    FeesData2:[],
    paymentUrl:[]
  },
    
    

  reducers: {
    getFees(state,action){
      state.FeesData=action.payload.GetFeeDetailsResult.FeeDetails;
      state.FeesData2=action.payload.GetFeeDetailsResult;
      },
    
    payOnline (state,action) {
      state.paymentUrl =action.payload.GetSingleSignOnPageEncryptedURLResult
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


export default Feesslice.reducer
