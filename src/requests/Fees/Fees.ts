import { createSlice, nanoid, createAsyncThunk } from '@reduxjs/toolkit'
import FeesApi from "../../api/Fees/Fees";
import type { PayloadAction } from '@reduxjs/toolkit';
import { AppThunk } from 'src/store';
import IFees, { IGetReceiptFileName, IPayOnline, GetAllAcademicYearsApiBody, IGetFeeDetailsOfOldAcademicBody, IGetInternalFeeDetailsBody, IGetNextYearDetailsBody, IGetNextYearFeeDetailsBody } from 'src/interfaces/Student/Fees';
import IReceipt from 'src/interfaces/Student/Fees';

const Feesslice = createSlice({
  name: 'Fees',
  initialState: {
    FeesData: [],
    FeesData2: [],
    paymentUrl: [],
    YearList: [],
    ReceiptFileName: "",
    GetFeesDetailsOfOldAcademic: [],
    InternalFeeDetails: [],
    GetNextYearDetails: {},
    GetNextYearFeeDetails: [],

  },



  reducers: {
    getFees(state, action) {
      state.FeesData = action.payload.GetFeeDetailsResult.FeeDetails;
      state.FeesData2 = action.payload.GetFeeDetailsResult;
    },

    payOnline(state, action) {
      state.paymentUrl = action.payload.GetSingleSignOnPageEncryptedURLResult
    },

    getReceiptFileName(state, action) {
      state.ReceiptFileName = action.payload
    },

    resetReciept(state, action) {
      state.ReceiptFileName = ""
    },
    getAllAcademicYears(state, action) {
      state.YearList = action.payload;
    },

    getFeesDetailsOfOldAcademic(state, action) {
      state.GetFeesDetailsOfOldAcademic = action.payload;

    },
    getInternalFeeDetails(state, action) {
      state.FeesData = action.payload;

    },
    getNextYearDetails(state, action) {
      state.GetNextYearDetails = action.payload;

    },
    getNextYearFeeDetails(state, action) {
      // state.GetNextYearFeeDetails = action.payload;
      state.FeesData = action.payload;

    }
  }
});


export const getFees =
  (data: IFees): AppThunk =>
    async (dispatch) => {
      const response = await FeesApi.GetFeesList(data);
      dispatch(Feesslice.actions.getFees(response.data));
    };

export const payOnline =
  (data: IPayOnline): AppThunk =>
    async (dispatch) => {
      const response = await FeesApi.getPaymentUrl(data);
      dispatch(Feesslice.actions.payOnline(response.data));
    };

export const getReceiptFileName =
  (data: IGetReceiptFileName): AppThunk =>
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
          Value: item.Academic_Year_Id,
          YearType:"'A','B','C'"
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
//Internalfees
export const getInternalFeeDetails =
  (data: IGetInternalFeeDetailsBody): AppThunk =>
    async (dispatch) => {
      // dispatch(Feesslice.actions.getLoading(true));
      const response = await FeesApi.InternalFeeDetails(data);
      const itemlist = response.data.InternalFeeDetails.map((item)=>{
        return{
          SchoolwiseStudentId:item.SchoolwiseStudentId,
          InternalFeeDetailsId:item.InternalFeeDetailsId,
          DebitCredit:item.DebitCredit,
          Amount:item.Amount,
          FeeType:item.FeeType,
          PayableFor:item.PayableFor,
          ReceiptNo:item.ReceiptNo,
          SerialNo:item.SerialNumber,
          IsDueDateApplicable:item.IsDueDateApplicable,
          PaidDate:item.PaidDate,
          Remarks:item.Remarks,
          AccountHeaderId:0,
          AmountPayable:item.Amount,
          DebitStudentFeeId:"0",
          DueDate:item.PaidDate,
          DueDateFormat:"",
          DueDateString:"",
          FeeId:"0",
          FeesPaid:"0",
          IsArrears:"",
          IsChequeBounce:"N",
          IsPartialPayment:"0",
          LateFeeAmount:"0",
          OriginalFeeType:"",
          PaymentGroup:1,
          RefundDetailsID:"0",
          RowNumber:1,
          ShowOptionButtonForAllEntry:true,
          StudentFeeId:"",
          FeeDetailsId:item.FeeDetailsId
        }
      })
      console.log("itemlist",itemlist);
      
      dispatch(Feesslice.actions.getInternalFeeDetails(itemlist));
      // dispatch(Feesslice.actions.getFees(response.data));

    };

//GetNextYearDetails

export const getNextYearDetails =
  (data: IGetNextYearDetailsBody): AppThunk =>
    async (dispatch) => {
      // dispatch(Feesslice.actions.getLoading(true));
      const response = await FeesApi.GetNextYearDetails(data);
      dispatch(Feesslice.actions.getNextYearDetails(response.data));

    };

//GetNextYearFeeDetails
export const getNextYearFeeDetails =
  (data: IGetNextYearFeeDetailsBody): AppThunk =>
    async (dispatch) => {
      // dispatch(Feesslice.actions.getLoading(true));
      const response = await FeesApi.GetNextYearFeeDetails(data);
      const itemlist = response.data.NextYearFeeDetails.map((item)=>{
        return{
          PayableFor:item.PayableFor,
          FeeType:item.FeeType,
          Amount:item.Amount,
          ReceiptNo:"0",
          SerialNo:item.SerialNo,
          AccountHeaderId:0,
          AmountPayable:item.AmountPayable,
          DebitStudentFeeId:"0",
          DueDate:item.DueDate,
          DueDateFormat:"",
          DueDateString:item.DueDateString,
          FeeId:"0",
          FeesPaid:item.FeesPaid ,
          IsArrears:"",
          IsChequeBounce:"N",
          IsPartialPayment:"0",
          LateFeeAmount:item.LateFeeAmount,
          OriginalFeeType:"",
          PaymentGroup:item.PaymentGroup,
          RefundDetailsID:"0",
          RowNumber:item.RowNumber,
          ShowOptionButtonForAllEntry:true,
          StudentFeeId:""
        }
      })
      dispatch(Feesslice.actions.getNextYearFeeDetails(itemlist));

    };

export const resetReciept =
  (): AppThunk =>
    async (dispatch) => {
      dispatch(Feesslice.actions.resetReciept(""));
    };

export default Feesslice.reducer
