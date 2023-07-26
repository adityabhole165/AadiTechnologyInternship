import { createSlice, nanoid, createAsyncThunk } from '@reduxjs/toolkit'
import FeesApi from "../../api/Fees/Fees";
import type { PayloadAction } from '@reduxjs/toolkit';
import { AppThunk } from 'src/store';
import IFees, { IGetReceiptFileName, IPayOnline, GetAllAcademicYearsApiBody, IGetFeeDetailsOfOldAcademicBody, IGetInternalFeeDetailsBody, IGetNextYearDetailsBody, IGetNextYearFeeDetailsBody, IGetOldStudentDetailsBody, IGetFeeStructureLinksBody, IGetAcademicYearsforFeeChallanBody, IGetDetailsForChallanImportBody, IGetAllFeeTypesForChallanImportBody, IGetAllPayableforChallanBody, IGetFileNameForSNSChallanBody } from 'src/interfaces/Student/Fees';
import IReceipt from 'src/interfaces/Student/Fees';
import { getDateFormat, getDateFormatted, getDateMonthYearFormatted } from 'src/components/Common/Util';

const Feesslice = createSlice({
  name: 'Fees',
  initialState: {
    FeesData: [],
    FeesData2: {},
    paymentUrl: "",
    YearList: [],
    ReceiptFileName: "",
    GetFeesDetailsOfOldAcademic: [],
    InternalFeeDetails: [],
    GetNextYearDetails: null,
    GetNextYearFeeDetails: [],
    GetOldStudentDetails: null,
    FeeStructureLinks:null,
    AcademicYearsforFeeChallan:[],
    DetailsForChallanImport:{},
    AllFeeTypesForChallanImport:[],
    AllPayableforChallan:[],
    FileNameForSNSChallan:null

  },



  reducers: {
    getFees(state, action) {
      state.FeesData = action.payload.GetFeeDetailsResult.FeeDetails;
      state.FeesData2 = action.payload.GetFeeDetailsResult;
    },

    payOnline(state, action) {
      state.paymentUrl = action.payload.GetSingleSignOnPageEncryptedURLResult
    },
    resetPaymentUrl(state) {
      state.paymentUrl = ""
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
      state.FeesData = action.payload.FeeDetails;
      state.FeesData2 = action.payload;

    },
    getNextYearDetails(state, action) {
      state.GetNextYearDetails = action.payload;

    },
    getNextYearFeeDetails(state, action) {
      // state.GetNextYearFeeDetails = action.payload;
      state.FeesData = action.payload.FeeDetails;
      state.FeesData2 = action.payload;
    },
    getOldStudentDetails(state, action) {
      state.GetOldStudentDetails = action.payload;
    },
    getFeeStructureLinks(state, action) {
      state.FeeStructureLinks = action.payload.FeeStructureLink;
    },

    getAcademicYearsforFeeChallan(state, action) {
      state.AcademicYearsforFeeChallan = action.payload;
    },

    getDetailsForChallanImport(state, action) {
      state.DetailsForChallanImport = action.payload;
    },

    getAllFeeTypesForChallanImport(state, action) {
      state.AllFeeTypesForChallanImport = action.payload;
    },

    getAllPayableforChallan(state, action) {
      state.AllPayableforChallan = action.payload;
    },

    getFileNameForSNSChallan(state, action) {
      state.FileNameForSNSChallan = action.payload;
    },
    
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

export const resetPaymentUrl =
  (): AppThunk =>
    async (dispatch) => {
      dispatch(Feesslice.actions.resetPaymentUrl());
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
          YearType: "'A','B','C'"
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
      const getPayableFees = () => {
        let amount = 0;
        response.data.InternalFeeDetails.map((item) => {
          if (item.FeeDetailsId === 0) {
            amount = amount + item.Amount;
          }
        })
        return amount;
      }
      const getPaidFees = () => {
        let amount = 0;
        response.data.InternalFeeDetails.map((item) => {
          if (item.FeeDetailsId !== 0) {
            amount = amount + item.Amount;
          }
        })
        return amount;
      }
      const itemlist = {
        FeeDetails: response.data.InternalFeeDetails.map((item) => {
          return {
            SchoolwiseStudentId: item.SchoolwiseStudentId,
            InternalFeeDetailsId: item.InternalFeeDetailsId,
            DebitCredit: item.DebitCredit,
            Amount: item.Amount,
            FeeType: item.FeeType,
            PayableFor: item.PayableFor,
            ReceiptNo: item.ReceiptNo,
            SerialNo: item.SerialNumber,
            IsDueDateApplicable: item.IsDueDateApplicable,
            PaidDate: item.PaidDate,
            Remarks: item.Remarks,
            AccountHeaderId: 0,
            AmountPayable: "0",
            DebitStudentFeeId: "0",
            DueDate: "",
            DueDateFormat: getDateFormatted(item.PaidDate),
            DueDateString: "",
            FeeId: "0",
            FeesPaid: "0",
            IsArrears: "",
            IsChequeBounce: "N",
            IsPartialPayment: "0",
            LateFeeAmount: "0",
            OriginalFeeType: "",
            PaymentGroup: 1,
            RefundDetailsID: "0",
            RowNumber: 1,
            StudentFeeId: "",
            FeeDetailsId: item.FeeDetailsId
          }
        }),
        FeesTobePaid: getPayableFees(),
        TotalFeesPaid: getPaidFees(),
        TotalFee: getPayableFees(),
        TotalLateFee: 0,
        PendingFeeAcademicYears: response.data.PendingFeeAcademicYears
      }

      dispatch(Feesslice.actions.getInternalFeeDetails(itemlist));

    };

//GetNextYearDetails

export const getNextYearDetails =
  (data: IGetNextYearDetailsBody): AppThunk =>
    async (dispatch) => {
      // dispatch(Feesslice.actions.getLoading(true));
      const response = await FeesApi.GetNextYearDetails(data);
      dispatch(Feesslice.actions.getNextYearDetails(response.data?.NextAcademicDetails));

    };
export const getOldstudentDetails =
  (data: IGetOldStudentDetailsBody): AppThunk =>
    async (dispatch) => {
      const response = await FeesApi.GetOldStudentDetails(data);
      dispatch(Feesslice.actions.getOldStudentDetails(response.data?.OldStudentDetails));
    };

//GetNextYearFeeDetails
export const getNextYearFeeDetails =
  (data: IGetNextYearFeeDetailsBody): AppThunk =>
    async (dispatch) => {
      // dispatch(Feesslice.actions.getLoading(true));
      const response = await FeesApi.GetNextYearFeeDetails(data);
      const getPayableFees = () => {
        let amount = 0;
        response.data.NextYearFeeDetails.map((item) => {
          if (item.FeesPaid === "0") {
            amount = amount + parseInt(item.Amount);
          }
        })
        return amount;
      }
      const getPaidFees = () => {
        let amount = 0;
        response.data.NextYearFeeDetails.map((item) => {
          if (item.FeesPaid !== "0") {
            amount = amount + parseInt(item.Amount);
          }
        })
        return amount;
      }
      const itemlist = {
        FeeDetails: response.data.NextYearFeeDetails.map((item) => {
          return {
            PayableFor: item.PayableFor,
            FeeType: item.FeeType,
            Amount: item.Amount,
            ReceiptNo: "0",
            SerialNo: item.SerialNo,
            AccountHeaderId: 0,
            AmountPayable: item.AmountPayable,
            DebitStudentFeeId: "0",
            DueDate: "",
            DueDateFormat: getDateFormat(item.DueDate),
            DueDateString: item.DueDateString,
            FeeId: "0",
            FeesPaid: item.FeesPaid,
            IsArrears: "",
            IsChequeBounce: "N",
            IsPartialPayment: "0",
            LateFeeAmount: item.LateFeeAmount,
            OriginalFeeType: "",
            PaymentGroup: item.PaymentGroup,
            RefundDetailsID: "0",
            RowNumber: item.RowNumber,
            StudentFeeId: "",
            ConcessionAmount: item.ConcessionAmount
          }
        }),
        FeesTobePaid: getPayableFees(),
        TotalFeesPaid: getPaidFees(),
        TotalFee: 0,
        TotalLateFee: 0
      }
      dispatch(Feesslice.actions.getNextYearFeeDetails(itemlist));

    };

export const resetReciept =
  (): AppThunk =>
    async (dispatch) => {
      dispatch(Feesslice.actions.resetReciept(""));
    };
    export const getFeeStructureLink =
  (data: IGetFeeStructureLinksBody): AppThunk =>
    async (dispatch) => {
      const response = await FeesApi.GetFeeStructureLinks(data);
      dispatch(Feesslice.actions.getFeeStructureLinks(response.data));
      

    };

  export const getAcademicYearsforFeeChallan =
  (data: IGetAcademicYearsforFeeChallanBody): AppThunk =>
    async (dispatch) => {
      const response = await FeesApi.GetAcademicYearsforFeeChallan(data);

      const itemlist = response?.data.AcademicYears.map((item) => {
        return {
          id: item.AcademicYearId,
          Name: item.AcademicYearName,
          Value: item.AcademicYearId,
          
        }
      })
      dispatch(Feesslice.actions.getAcademicYearsforFeeChallan(itemlist));
    };

    export const getDetailsForChallanImport =
    (data: IGetDetailsForChallanImportBody): AppThunk =>
      async (dispatch) => {
        const response = await FeesApi.GetDetailsForChallanImport(data);
        dispatch(Feesslice.actions.getDetailsForChallanImport(response.data));
      };


      export const getAllFeeTypesForChallanImport =
      (data: IGetAllFeeTypesForChallanImportBody): AppThunk =>
        async (dispatch) => {
          const response = await FeesApi.GetAllFeeTypesForChallanImport(data);
          const itemlist = response?.data.FeeTypes.map((item) => {
            return {
              id: item.Id,
              Name: item.Name,
              Value: item.Id,
              
            }
          })
          dispatch(Feesslice.actions.getAllFeeTypesForChallanImport(itemlist));
        };


        export const getAllPayableforChallan =
        (data: IGetAllPayableforChallanBody): AppThunk =>
          async (dispatch) => {
            const response = await FeesApi.GetAllPayableforChallan(data);
       console.log(response,"response")
            const itemlist = response?.data.Payables.map((item) => {
              return {
                id: item.Id,
                Name: item.Name,
                Value: item.Id,
                
              }
            })
            dispatch(Feesslice.actions.getAllPayableforChallan(itemlist));
          };


          export const getFileNameForSNSChallan =
          (data: IGetFileNameForSNSChallanBody): AppThunk =>
            async (dispatch) => {
              const response = await FeesApi.FileNameForSNSChallan(data);
          
              dispatch(Feesslice.actions.getFileNameForSNSChallan(response.data));
            };

export default Feesslice.reducer
