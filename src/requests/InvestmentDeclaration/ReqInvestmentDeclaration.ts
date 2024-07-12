import { createSlice } from '@reduxjs/toolkit';
import InvestmentDeclarationApi from 'src/api/InvestmentDeclaration/InvestmentDeclarationApi';
import { IGetInvestmentDetailsBody, IGetRegimeDetailsDropdownBody } from 'src/interfaces/InvestmentDeclaration/InvestmentDeclaration';
import { AppThunk } from 'src/store';

const InvestmentDeclarationSlice = createSlice({
    name: 'InvestmentDeclaration',

    initialState: {
        ISlistInvestmentDetails: [],
        ISlistInvestmentEmpDetails: [],
        ISlistInvestmentAmountDetails: [],
        ISNewGetInvestmentDetails: [],
        ISGetRegimeDropdown: []

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
        NewGetInvestmentDetails(state, action) {
            state.ISNewGetInvestmentDetails = action.payload
        },
        RGetRegimeDropdown(state, action) {
            state.ISGetRegimeDropdown = action.payload
        }

    }

});



export const GetInvestmentDetails = (data: IGetInvestmentDetailsBody): AppThunk =>
    async (dispatch) => {
        const response = await InvestmentDeclarationApi.GetInvestmentDetails(data)
        let listInvestmentDetails = response.data.listInvestmentDetails
            .filter((obj) => { return obj.SectionId })
            .map((item, i) => {
                return {
                    Id: item.Id,
                    SectionId: item.SectionId,
                    Name: item.Name,
                    AssociatedEarnDeductId: item.AssociatedEarnDeductId,
                    MaxAmount: item.MaxAmount,
                    DocumentCount: item.DocumentCount,
                    Amount: ""
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

export const CDAGetInvestmentDetails = (data: IGetInvestmentDetailsBody): AppThunk =>
    async (dispatch) => {
        const response = await InvestmentDeclarationApi.GetInvestmentDetails(data)
        console.log(response, "response");
        dispatch(InvestmentDeclarationSlice.actions.NewGetInvestmentDetails(response.data));

    };

export const CDAGetRegimeDropdown = (data: IGetRegimeDetailsDropdownBody): AppThunk =>
    async (dispatch) => {
        const response = await InvestmentDeclarationApi.GetRegimeDropdown(data)
        let abc = [{ Id: '0', Name: 'Select', Value: '0' }];

        dispatch(InvestmentDeclarationSlice.actions.RGetRegimeDropdown(response.data));
        response.data.map((item, i) => {
            abc.push({
                Id: item.Id,
                Name: item.Name,
                Value: item.Name
            })
        })
    }




export default InvestmentDeclarationSlice.reducer;