import { createSlice } from '@reduxjs/toolkit';
import InvestmentDeclarationApi from 'src/api/InvestmentDeclaration/InvestmentDeclarationApi';
import { IGetInvestmentDetailsBody } from 'src/interfaces/InvestmentDeclaration/InvestmentDeclaration';
import { AppThunk } from 'src/store';

const InvestmentDeclarationSlice = createSlice({
    name: 'InvestmentDeclaration',

    initialState: {
        // InvestmentDetails: [],
        IslistInvestmentDetails: [],
        IslistInvestmentEmpDetails: [],
        IslistInvestmentSectionDetails: [],
        IslistInvestmentAmountDetails: [],
        Loading: true
    },
    reducers: {

        RgetListInvestmentDetails(state, action) {
            state.IslistInvestmentDetails = action.payload
        },

        RgetListInvestmentEmpDetails(state, action) {
            state.IslistInvestmentEmpDetails = action.payload
        },

        RgetListInvestmentSectionDetails(state, action) {
            state.IslistInvestmentSectionDetails = action.payload
        },

        RgetListInvestmentAmountDetails(state, action) {
            state.IslistInvestmentAmountDetails = action.payload
        },


        getLoading(state, action) {
            state.Loading = true;
        }
    }

});

export const GetInvestmentDetails = (data: IGetInvestmentDetailsBody): AppThunk =>
    async (dispatch) => {
        const response = await InvestmentDeclarationApi.GetInvestmentDetails(data)
        // dispatch(InvestmentDeclarationSlice.actions.getInvestmentDetails(response.data));
        // console.log(response.data, "response");

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

        let listInvestmentSectionDetails = response.data.listInvestmentSectionDetail.map((item, i) => {
            return {
                Id: item.Id,
                Name: item.Name,
                SectionGroupId: item.SectionGroupId,
                GroupMaxAmount: item.GroupMaxAmount,
                CategoryId: item.CategoryId,
                SortOrder: item.SortOrder

            }
        })

        let listInvestmentAmountDetails = response.data.listInvestmentAmountDetails.map((item, i) => {
            return {
                Id: item.Id,
                Amount: item.Amount,
                InvestmentMethodId: item.InvestmentMethodId,
                SectionId: item.SectionId

            }
        });

        dispatch(InvestmentDeclarationSlice.actions.RgetListInvestmentDetails(listInvestmentDetails));
        dispatch(InvestmentDeclarationSlice.actions.RgetListInvestmentEmpDetails(listInvestmentEmpDetails));
        dispatch(InvestmentDeclarationSlice.actions.RgetListInvestmentSectionDetails(listInvestmentSectionDetails));
        dispatch(InvestmentDeclarationSlice.actions.RgetListInvestmentAmountDetails(listInvestmentAmountDetails));

    };

export default InvestmentDeclarationSlice.reducer;