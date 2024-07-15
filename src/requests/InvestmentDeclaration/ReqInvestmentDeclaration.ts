import { createSlice } from '@reduxjs/toolkit';
import InvestmentDeclarationApi from 'src/api/InvestmentDeclaration/InvestmentDeclarationApi';
import { IGetInvestmentDetailsBody, IGetRegimeDetailsDropdownBody, SaveInvestmentDetailsBody, SubmitInvestmentDetailsBody } from 'src/interfaces/InvestmentDeclaration/InvestmentDeclaration';
import { AppThunk } from 'src/store';

const InvestmentDeclarationSlice = createSlice({
    name: 'InvestmentDeclaration',

    initialState: {
        ISlistInvestmentDetails: [],
        ISlistInvestmentEmpDetails: [],
        ISlistInvestmentAmountDetails: [],
        ISNewGetInvestmentDetails: [],
        ISGetRegimeDropdown: [],
        ISSaveInvestment: '',
        ISSubmitInvestmentDeclaration: '',

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
        },
        RGetSaveInvestment(state, action) {
            state.ISSaveInvestment = action.payload
        },
        RGetSubmitInvestment(state, action) {
            state.ISSubmitInvestmentDeclaration = action.payload
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
        // dispatch(InvestmentDeclarationSlice.actions.RGetRegimeDropdown(response.data));

        response.data.map((item, i) => {
            abc.push({
                Id: item.Id,
                Name: item.Name,
                Value: item.Name
            });
        });
        dispatch(InvestmentDeclarationSlice.actions.RGetRegimeDropdown(abc));

        console.log(response, "dropdown");
    };
//     export const SaveLessonPlan =
//   (data: ISaveLessonPlanBody): AppThunk =>
//     async (dispatch) => {
//       dispatch(AddLessonPlanSlice.actions.getLoading(true));
//       const response = await AddLessonPlanApi.SaveLessonPlanapi(data);
//       dispatch(AddLessonPlanSlice.actions.saveLessonPlan(response.data));

//     }; 

export const CDAGetSaveInvestment =
    (data: SaveInvestmentDetailsBody): AppThunk =>
        async (dispatch) => {
            const response = await InvestmentDeclarationApi.GetSaveInvestmentDeclaration(data);
            dispatch(InvestmentDeclarationSlice.actions.RGetSaveInvestment(response.data));
        }

export const CDAGetSubmitInvestment =
    (data: SubmitInvestmentDetailsBody): AppThunk =>
        async (dispatch) => {
            const response = await InvestmentDeclarationApi.GetSubmitInvestmentDeclaration(data);
            dispatch(InvestmentDeclarationSlice.actions.RGetSubmitInvestment(response.data));
        }

export default InvestmentDeclarationSlice.reducer;