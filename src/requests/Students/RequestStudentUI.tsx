import { createSlice } from '@reduxjs/toolkit';
import GetStudentUIAPI from 'src/api/Students/ApiStudentUI';
import { ICheckIfAttendanceMarkedBody, IGetAllGroupsOfStreamBody, IGetAllStreamsBody, IGetAllUserRolesBody, IGetFeeAreaNamesBody, IGetSingleStudentDetailsBody, IGetStreamwiseSubjectDetailsBody, IIsAnyExamPublishedBody, IIsOnLeaveBody, IMasterDatastudentBody, IStaffNameBody, IStandrdwiseStudentsDocumentBody, IUpdateStudentBody } from 'src/interfaces/Students/IStudentUI';
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
        //streamwise Subject
        ISGetAllStreams: [],
        ISGetAllGroupsOfStream: [],
        ISGetStreamwiseSubjectDetails: [],
        //UpdateStudent
        ISUpdateStudent: {},
        //IsOnLeave
        ISOnLeave: {},
        ISAnyExamPublished: [],
        ISCheckIfAttendanceMarked: [],
        ISFeeAreaNames: [],
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
        //
        RGetAllStreams(state, action) {
            state.ISGetAllStreams = action.payload;
            state.Loading = false;
        },
        RGetAllGroupsOfStream(state, action) {
            state.ISGetAllGroupsOfStream = action.payload;
            state.Loading = false;
        },
        RGetStreamwiseSubjectDetails(state, action) {
            state.ISGetStreamwiseSubjectDetails = action.payload;
            state.Loading = false;
        },
        RUpdateStudent(state, action) {
            state.ISUpdateStudent = action.payload;
            state.Loading = false;
        },
        RISOnLeave(state, action) {
            state.ISOnLeave = action.payload;
            state.Loading = false;
        },
        RAnyExamPublished(state, action) {
            state.ISAnyExamPublished = action.payload;
            state.Loading = false;
        },
        RCheckIfAttendanceMarked(state, action) {
            state.ISCheckIfAttendanceMarked = action.payload;
            state.Loading = false;
        },
        RFeeAreaNames(state, action) {
            state.ISFeeAreaNames = action.payload;
            state.Loading = false;
        },
        getLoading(state, action) {
            state.Loading = true;
        },
    }
});

export const CDAGetAllStreams =
    (data: IGetAllStreamsBody): AppThunk => async (dispatch) => {
        const response = await GetStudentUIAPI.GetAllStreamsApi(data);

        const responseData = response.data.map((item, i) => {
            return ({
                Id: item.Id,
                Name: item.Name,
                Value: item.Id,
            })
        })

        dispatch(StudentUISlice.actions.RGetAllStreams(responseData));
    };

export const CDAGetAllGroupsOfStream =
    (data: IGetAllGroupsOfStreamBody): AppThunk => async (dispatch) => {
        const response = await GetStudentUIAPI.GetAllGroupsOfStreamApi(data);

        const responseData = response.data.map((item, i) => {
            return ({
                Id: item.Id,
                Name: item.GroupName,
                Value: item.Id,
            })
        })

        dispatch(StudentUISlice.actions.RGetAllGroupsOfStream(responseData));
    };

export const CDAStreamwiseSubjectDetails =
    (data: IGetStreamwiseSubjectDetailsBody): AppThunk => async (dispatch) => {
        const response = await GetStudentUIAPI.GetStreamwiseSubjectDetailsApi(data);

        dispatch(StudentUISlice.actions.RGetStreamwiseSubjectDetails(response.data));
    };
export const CDAGetMasterData =
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

export const CDAUpdateStudent =
    (data: IUpdateStudentBody): AppThunk =>
        async (dispatch) => {
            //dispatch(StudentUISlice.actions.getLoading(true));
            const response = await GetStudentUIAPI.UpdateStudentApi(data);
            dispatch(StudentUISlice.actions.RUpdateStudent(response.data));
            if (response.status === 200) {
                // The API call was successful
                // console.log('Student information updated successfully');
                // console.log('Response data:', response.data);
            }
        };

export const CDAIsOnLeave =
    (data: IIsOnLeaveBody): AppThunk =>
        async (dispatch) => {
            //dispatch(StudentUISlice.actions.getLoading(true));
            const response = await GetStudentUIAPI.IsOnLeaveApi(data);
            dispatch(StudentUISlice.actions.RISOnLeave(response.data));
            // console.log('Response data CDAIsOnLeave:', response.data);
        };

export const CDAAnyExamPublished =
    (data: IIsAnyExamPublishedBody): AppThunk =>
        async (dispatch) => {
            //dispatch(StudentUISlice.actions.getLoading(true));
            const response = await GetStudentUIAPI.IsAnyExamPublishedApi(data);

            let examListResult = []
            response.data.examListResult.map((item, i) => {
                examListResult.push({
                    IsExamPublishedStatus: item.IsExamPublishedStatus
                });
            });

            dispatch(StudentUISlice.actions.RAnyExamPublished(examListResult));
            //console.log('Response data CDAAnyExamPublished:', examListResult);
        };


export const CDACheckIfAttendanceMarked =
    (data: ICheckIfAttendanceMarkedBody): AppThunk =>
        async (dispatch) => {
            //dispatch(StudentUISlice.actions.getLoading(true));
            const response = await GetStudentUIAPI.CheckIfAttendanceMarkedApi(data);
            dispatch(StudentUISlice.actions.RCheckIfAttendanceMarked(response.data));
            //console.log('Response data CDACheckIfAttendanceMarked:', response.data);
        };

export const CDAFeeAreaNames =
    (data: IGetFeeAreaNamesBody): AppThunk =>
        async (dispatch) => {
            //dispatch(StudentUISlice.actions.getLoading(true));
            const response = await GetStudentUIAPI.GetFeeAreaNamesApi(data);

            const responseData = response.data.map((item, i) => {
                return ({
                    Id: item.FeeAreaNameId,
                    Name: item.FeeAreaName,
                    Value: item.FeeAreaNameId,
                })
            })

            dispatch(StudentUISlice.actions.RFeeAreaNames(responseData));
            console.log('CDAFeeAreaNames:', responseData);
        };
export default StudentUISlice.reducer;