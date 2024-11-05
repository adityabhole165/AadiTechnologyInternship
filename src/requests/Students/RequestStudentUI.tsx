import { createSlice } from '@reduxjs/toolkit';
import GetStudentUIAPI from 'src/api/Students/ApiStudentUI';
import { IGetAllUserRolesBody, IGetSingleStudentDetailsBody, IMasterDatastudentBody, IStaffNameBody, IStandrdwiseStudentsDocumentBody } from 'src/interfaces/Students/IStudentUI';
import { AppThunk } from 'src/store';
const StudentUISlice = createSlice({
    name: 'StudentUI',

    initialState: {
        ISOcupationDropdown: [],
        ISCategoryDropdown: [],
        ISFeeRuleConcession: [],
        ISLanguageDropdown: [],
        ISSecondlang: [],
        ISThirdLang: [],
        ISResidenceTypesDropdown: [],
        //
        ISUserRoles: [],
        ISStaffName: [],
        //
        ISGetStudentDocuments: [],
        //
        ISGetSingleStudentDetails: [],
        ISGetStudentAdditionalDetails: [],
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
        RSecondLang(state, action) {
            state.ISSecondlang = action.payload;
        },
        RThirdLang(state, action) {
            state.ISThirdLang = action.payload;
        },
        //
        RUserRoles(state, action) {
            state.ISUserRoles = action.payload;
            state.Loading = false;
        },
        RStaffName(state, action) {
            state.ISStaffName = action.payload;
            state.Loading = false;
        },
        //
        RGetStudentDocuments(state, action) {
            state.ISGetStudentDocuments = action.payload;
            state.Loading = false;
        },
        //
        RGetSingleStudentDetails(state, action) {
            state.ISGetSingleStudentDetails = action.payload;
            state.Loading = false;
        },
        RGetStudentAdditionalDetails(state, action) {
            state.ISGetStudentAdditionalDetails = action.payload;
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

            const LanguageDropdown = response.data.LanguageDropdown.map((item) => ({
                Id: item.Subject_Id,
                Name: item.Subject_Name,
                Value: item.Subject_Id,
                LanguageGroupId: item.LanguageGroupId,
            }));

            const SecondLangData = LanguageDropdown.filter(item => item.LanguageGroupId === "1");
            const ThirdLangData = LanguageDropdown.filter(item => item.LanguageGroupId === "2");

            dispatch(StudentUISlice.actions.RLanguageDropdown(LanguageDropdown));
            dispatch(StudentUISlice.actions.RSecondLang(SecondLangData));
            dispatch(StudentUISlice.actions.RThirdLang(ThirdLangData));

            //console.log(LanguageDropdown, "LanguageDropdown");
            //console.log(SecondLangData, "SecondLangData");
            // console.log(ThirdLangData, "ThirdLangData");

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

//2
export const CDAStaffName =
    (data: IStaffNameBody): AppThunk => async (dispatch) => {
        const response = await GetStudentUIAPI.StaffNameApi(data);

        const StaffName = response.data.map((item, i) => {
            return ({
                Id: item.UserId,
                Name: item.UserName,
                Value: item.UserId,
            })
        })

        dispatch(StudentUISlice.actions.RStaffName(StaffName));
    };
//3
export const CDAUserRoles =
    (data: IGetAllUserRolesBody): AppThunk => async (dispatch) => {
        const response = await GetStudentUIAPI.GetAllUserRolesApi(data);

        const UserRoles = response.data.filter((item) => item.User_Role_Id === "2" || item.User_Role_Id === "6").
            map((item, i) => {
                return ({
                    Id: item.User_Role_Id,
                    Name: item.User_Role_Name,
                    Value: item.User_Role_Id,
                    Is_Admin: item.Is_Admin
                })
            })

        //const Users = UserRoles.filter(item => item.Id === "2" || item.Id === "6");

        dispatch(StudentUISlice.actions.RUserRoles(UserRoles));
    };
export const CDAGetStudentDocuments =
    (data: IStandrdwiseStudentsDocumentBody): AppThunk =>
        async (dispatch) => {
            dispatch(StudentUISlice.actions.getLoading(true));
            const response = await GetStudentUIAPI.StandrdwiseStudentsDocumentApi(data);
            const responseData = response.data.map((item, i) => {
                return ({
                    Id: item.StudentDocumentId,
                    Name: item.DocumentName,
                    Value: item.StudentDocumentId,
                    StandardwiseDocumentId: item.StandardwiseDocumentId,
                    SchoolwiseStudentId: item.SchoolwiseStudentId,
                    IsSubmitted: item.IsSubmitted,
                    IsApplicable: item.IsApplicable,
                    DocumentCount: item.DocumentCount,
                    IsSubmissionMandatory: item.IsSubmissionMandatory
                })
            })
            dispatch(StudentUISlice.actions.RGetStudentDocuments(responseData));
            //console.log(responseData, "responseData");
        };

export const CDAGetSingleStudentDetails =
    (data: IGetSingleStudentDetailsBody): AppThunk =>
        async (dispatch) => {
            //dispatch(StudentUISlice.actions.getLoading(true));
            const response = await GetStudentUIAPI.GetSingleStudentDetailsApi(data);
            dispatch(StudentUISlice.actions.RGetSingleStudentDetails(response.data));
        };

export const CDAGetStudentAdditionalDetails =
    (data: IGetSingleStudentDetailsBody): AppThunk =>
        async (dispatch) => {
            //dispatch(StudentUISlice.actions.getLoading(true));
            const response = await GetStudentUIAPI.GetStudentAdditionalDetailsapi(data);
            dispatch(StudentUISlice.actions.RGetStudentAdditionalDetails(response.data));
        };
export default StudentUISlice.reducer;