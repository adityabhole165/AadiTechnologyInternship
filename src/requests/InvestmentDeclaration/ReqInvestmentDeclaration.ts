import { createSlice } from '@reduxjs/toolkit';
import InvestmentDeclarationApi from 'src/api/InvestmentDeclaration/InvestmentDeclarationApi';
import { IGetInvestmentDetailsBody } from 'src/interfaces/InvestmentDeclaration/InvestmentDeclaration';
import { AppThunk } from 'src/store';

const InvestmentDeclarationSlice = createSlice({
    name: 'InvestmentDeclaration',

    initialState: {
        ISlistInvestmentDetails: [],
        ISlistInvestmentEmpDetails:[],
        ISlistInvestmentAmountDetails:[],
      
    },
    reducers: {

        RlistInvestmentDetails(state, action) {
            state.ISlistInvestmentDetails = action.payload
        },
        RlistInvestmentEmpDetails(state, action) {
            state.ISlistInvestmentEmpDetails = action.payload
        },
    
        RlistInvestmentAmountDetails(state, action) {
            state.ISlistInvestmentAmountDetails = action.payload
        },
        
    
    }

});

export const GetInvestmentDetails = (data: IGetInvestmentDetailsBody): AppThunk =>
    async (dispatch) => {
        const response = await InvestmentDeclarationApi.GetInvestmentDetails(data)
        let listInvestmentDetails = response.data.listInvestmentDetails.map((item, i) => {
            return {
                Id: item.Id,
                SectionId: item.SectionId,
                Name: item.Name,
                AssociatedEarnDeductId: item.AssociatedEarnDeductId,
                MaxAmount: item.MaxAmount,
                DocumentCount: item.DocumentCount

            };
        });

        let listInvestmentEmpDetails = response.data.listInvestmentEmpDetails.map((item, i) => {
            return {
                UserId: item.UserId,
                UserName: item.UserName,
                PanNo: item.PanNo,
                Designation: item.Designation,
                EmployeeNo: item.EmployeeNo,
                SchoolName: item.SchoolName,
                SchoolAddress: item.SchoolAddress,
                FinancialYear: item.FinancialYear,
                Address: item.Address,
                Gender: item.Gender,
                IsSubmitted: item.IsSubmitted,
                IsSaved: item.IsSaved,
                FinancialYearEnd: item.FinancialYear,
                RegimeId: item.RegimeId
            };
        });
       

        let listInvestmentAmountDetails = response.data.listInvestmentAmountDetails.map((item, i) => {
            return {
                Id: item.Id,
                Amount: item.Amount,
                InvestmentMethodId: item.InvestmentMethodId,
                SectionId: item.SectionId

            }
        });

       


        dispatch(InvestmentDeclarationSlice.actions.RlistInvestmentDetails(listInvestmentDetails));
         dispatch(InvestmentDeclarationSlice.actions.RlistInvestmentEmpDetails(listInvestmentEmpDetails));

         dispatch(InvestmentDeclarationSlice.actions.RlistInvestmentAmountDetails(listInvestmentAmountDetails));

         


    };

export default InvestmentDeclarationSlice.reducer;