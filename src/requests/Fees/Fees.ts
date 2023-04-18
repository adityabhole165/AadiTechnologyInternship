import { createSlice, nanoid, createAsyncThunk } from '@reduxjs/toolkit'
import FeesApi from "../../api/Fees/Fees";
import type { PayloadAction } from '@reduxjs/toolkit';
import { AppThunk } from 'src/store';
import IFees, { IGetReceiptFileName, IPayOnline,GetAllAcademicYearsApiBody,IGetFeeDetailsOfOldAcademicBody,IGetInternalFeeDetailsBody } from 'src/interfaces/Student/Fees';
import IReceipt from 'src/interfaces/Student/Fees';

const Feesslice = createSlice({
  name: 'Fees',
  initialState:{
    FeesData:[],
    FeesData2:[],
    paymentUrl:[],
    YearList: [],
    ReceiptFileName:"",
    GetFeesDetailsOfOldAcademic:[],
    GetInternalFeeDetails: []
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
    },
    getAllAcademicYears(state, action) {
      state.YearList = action.payload;
    },

    getFeesDetailsOfOldAcademic(state, action){
      state.GetFeesDetailsOfOldAcademic = action.payload;
      
    },
    getInternalFeeDetails(state, action){
      state.GetInternalFeeDetails = action.payload;
      
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

  export const getYearList =
  (data: GetAllAcademicYearsApiBody): AppThunk =>
    async (dispatch) => {
      const response = await FeesApi.getAllAcademicYears(data);
      const itemlist = response?.data.GetAllAcademicYears.map((item) => {
        return {
          id: item.Academic_Year_Id,
          Name: item.AcademicYear,
          Value: item.Academic_Year_Id
        }
      })
    dispatch(Feesslice.actions.getAllAcademicYears(itemlist));
    };


    export const getFeesDetailsOfOldAcademic =
  (data: IGetFeeDetailsOfOldAcademicBody): AppThunk =>
    async (dispatch) => {
      // dispatch(Feesslice.actions.getLoading(true));
      const response = await FeesApi.GetFeeDetailsOfOldAcademic(data);
      dispatch(Feesslice.actions.getFees(response.data));
   
    };

    export const getInternalFeeDetails =
    (data: IGetInternalFeeDetailsBody): AppThunk =>
      async (dispatch) => {
        // dispatch(Feesslice.actions.getLoading(true));
        const response = await FeesApi.GetInternalFeeDetails(data);
        dispatch(Feesslice.actions.getInternalFeeDetails(response.data));
     console.log("getInternalFeeDetails",response)
      };


  export const resetReciept =
  (): AppThunk =>
  async (dispatch) => {
    dispatch(Feesslice.actions.resetReciept(""));
  };

export default Feesslice.reducer
