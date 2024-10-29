import { createSlice } from '@reduxjs/toolkit';
import GetStudentUIAPI from 'src/api/Students/ApiStudentUI';
import { IMasterDatastudentBody } from 'src/interfaces/Students/IStudentUI';
import { AppThunk } from 'src/store';
const StudentUISlice = createSlice({
    name: 'StudentUI',

    initialState: {
        ISOcupationDropdown: [],
        ISCategoryDropdown: [],
        ISFeeRuleConcession: [],
        ISLanguageDropdown: [],
        ISResidenceTypesDropdown: [],
        Loading: true
    },
    reducers: {
        ROcupationDropdown(state, action) {
            state.ISOcupationDropdown = action.payload;
            state.Loading = false;
        },
        RCategoryDropdown(state, action) {
            state.ISCategoryDropdown = action.payload;
            state.Loading = false;
        },
        RFeeRuleConcession(state, action) {
            state.ISFeeRuleConcession = action.payload;
            state.Loading = false;
        },
        RResidenceTypesDropdown(state, action) {
            state.ISResidenceTypesDropdown = action.payload;
            state.Loading = false;
        },
        RLanguageDropdown(state, action) {
            state.ISLanguageDropdown = action.payload;
            state.Loading = false;
        },
        getLoading(state, action) {
            state.Loading = true;
        },
    }
});

export const CDAGetStudentRecordData =
    (data: IMasterDatastudentBody): AppThunk =>
        async (dispatch) => {
            const response = await GetStudentUIAPI.GetMasterDatastudentApi(data);
            let OcupationDropdown = []
            response.data.OcupationDropdown.map((item, i) => {
                OcupationDropdown.push({

                    Id: item.Ocupation_Id,
                    Name: item.Ocupation_Name,
                    Value: item.Ocupation_Id

                });
            });
            dispatch(StudentUISlice.actions.ROcupationDropdown(OcupationDropdown));

            let CategoryDropdown = []
            response.data.CategoryDropdown.map((item, i) => {
                CategoryDropdown.push({
                    Id: item.Category_Id,
                    Name: item.Category_Name,
                    Value: item.Category_Id
                });
            });
            dispatch(StudentUISlice.actions.RCategoryDropdown(CategoryDropdown));

            let FeeRuleConcession = []
            response.data.FeeRuleConcession.map((item, i) => {
                FeeRuleConcession.push({
                    Id: item.Rule_Id,
                    Name: item.RuleName,
                    Value: item.Rule_Id
                });
            });
            dispatch(StudentUISlice.actions.RFeeRuleConcession(FeeRuleConcession));

            let LanguageDropdown = []
            response.data.LanguageDropdown.map((item, i) => {
                LanguageDropdown.push({
                    Id: item.Subject_Id,
                    Name: item.Subject_Name,
                    Value: item.Subject_Id,
                    LanguageGroupId: item.LanguageGroupId
                });
            });
            dispatch(StudentUISlice.actions.RLanguageDropdown(LanguageDropdown));
            console.log(LanguageDropdown, "ak");

            let ResidenceTypesDropdown = []
            response.data.ResidenceTypesDropdown.map((item, i) => {
                ResidenceTypesDropdown.push({
                    Id: item.ResidenceTypeId,
                    Name: item.Name,
                    Value: item.ResidenceTypeId
                });
            });
            dispatch(StudentUISlice.actions.RResidenceTypesDropdown(ResidenceTypesDropdown));

        };


export default StudentUISlice.reducer;