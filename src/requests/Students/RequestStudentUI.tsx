import { createSlice } from '@reduxjs/toolkit';
import GetStudentUIAPI from 'src/api/Students/ApiStudentUI';
import { IAddStudentAdditionalDetailsBody, ICheckDependenciesForFeesBody, ICheckIfAttendanceMarkedBody, IDeletePhotosBody, IGetAllGroupsOfStreamBody, IGetAllStreamsBody, IGetAllUserRolesBody, IGetFeeAreaNamesBody, IGetSingleStudentDetailsBody, IGetStreamwiseSubjectDetailsBody, IGetStudentAdditionalDetailsBody, IIsAnyExamPublishedBody, IIsOnLeaveBody, IMasterDatastudentBody, IRemoveStudentPhotoBody, IRetriveStudentStreamwiseSubjectBody, IStaffNameBody, IStandrdwiseStudentsDocumentBody, IUpdateStudentBody, IUpdateStudentStreamwiseSubjectDetailsBody } from 'src/interfaces/Students/IStudentUI';
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
        ISDisabilitiesDropdown: [],
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
        //StreamwiseSubjectDetails
        ISStudentCompulsarySubjects: [],
        ISFillOptionalSubjects: [],
        ISFillCompitativeExams: [],
        ISFillOptionalSubjectArts: [],
        //RetriveStudentStreamwiseSubject
        ISGetStudentStreamwiseSubjectDetails: [],
        ISStudentStreamDetails: [],
        //UpdateStudent
        ISUpdateStudent: {},
        ISAddStudentAdditionalDetails: '',
        ISUpdateStudentStreamwiseSubjectDetails: false,
        //IsOnLeave
        ISOnLeave: {},
        ISAnyExamPublished: [],
        ISCheckIfAttendanceMarked: [],
        ISFeeAreaNames: [],
        //DELETE API's
        ISDeleteStudentPhotoMsg: '',
        ISDeleteFamilyPhotoMsg: '',
        ISDeleteFatherPhotoMsg: '',
        ISDeleteMotherPhotoMsg: '',
        ISDeleteGuardianPhotoMsg: '',
        //
        ISReferenceListDetails: [],
        ISReferenceMessages: [],
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
        RDisabilitiesDropdown(state, action) {
            state.ISDisabilitiesDropdown = action.payload;
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
        //Start --StreamwiseSubject tab
        RGetAllStreams(state, action) {
            state.ISGetAllStreams = action.payload;
            state.Loading = false;
        },
        RGetAllGroupsOfStream(state, action) {
            state.ISGetAllGroupsOfStream = action.payload;
            state.Loading = false;
        },
        //StreamwiseSubjectDetails
        RStudentCompulsarySubjects(state, action) {
            state.ISStudentCompulsarySubjects = action.payload;
            state.Loading = false;
        },
        RFillOptionalSubjects(state, action) {
            state.ISFillOptionalSubjects = action.payload;
            state.Loading = false;
        },
        RFillCompitativeExams(state, action) {
            state.ISFillCompitativeExams = action.payload;
            state.Loading = false;
        },
        RFillOptionalSubjectArts(state, action) {
            state.ISFillOptionalSubjectArts = action.payload;
            state.Loading = false;
        },
        //RetriveStudentStreamwiseSubject
        RGetStudentStreamwiseSubjectDetails(state, action) {
            state.ISGetStudentStreamwiseSubjectDetails = action.payload;
            state.Loading = false;
        },
        RStudentStreamDetails(state, action) {
            state.ISStudentStreamDetails = action.payload;
            state.Loading = false;
        },
        // end
        RUpdateStudent(state, action) {
            state.ISUpdateStudent = action.payload;
            state.Loading = false;
        },
        ResetUpdateStudentMsg(state) {
            state.ISUpdateStudent = {};
            state.Loading = false;
        },
        RAddStudentAdditionalDetails(state, action) {
            state.ISAddStudentAdditionalDetails = action.payload;
            state.Loading = false;
        },
        ResetAddStudentAdditionalDetailsMsg(state) {
            state.ISAddStudentAdditionalDetails = '';
            state.Loading = false;
        },
        RUpdateStudentStreamwiseSubjectDetails(state, action) {
            state.ISUpdateStudentStreamwiseSubjectDetails = action.payload;
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
        RDeleteStudentPhoto(state, action) {
            state.ISDeleteStudentPhotoMsg = action.payload;
            state.Loading = false;
        },
        resetDeletePhotoMsg(state) {
            state.Loading = false;
            state.ISDeleteStudentPhotoMsg = '';
            state.ISDeleteFamilyPhotoMsg = '';
            state.ISDeleteFatherPhotoMsg = '';
            state.ISDeleteMotherPhotoMsg = '';
            state.ISDeleteGuardianPhotoMsg = '';
        },
        RDeleteFamilyPhoto(state, action) {
            state.ISDeleteFamilyPhotoMsg = action.payload;
            state.Loading = false;
        },
        RDeleteFatherPhoto(state, action) {
            state.ISDeleteFatherPhotoMsg = action.payload;
            state.Loading = false;
        },
        RDeleteMotherPhoto(state, action) {
            state.ISDeleteMotherPhotoMsg = action.payload;
            state.Loading = false;
        },
        RDeleteGuardianPhoto(state, action) {
            state.ISDeleteGuardianPhotoMsg = action.payload;
            state.Loading = false;
        },
        RReferenceListDetails(state, action) {
            state.ISReferenceListDetails = action.payload;
            state.Loading = false;
        },
        RReferenceMessages(state, action) {
            state.ISReferenceMessages = action.payload;
            state.Loading = false;
        },
        ResetFeeDependencyErrorMsg(state) {
            state.ISReferenceMessages = [];
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

        let StudentCompulsarySubjects = []
        response.data.StudentCompulsarySubjects.map((item, i) => {
            StudentCompulsarySubjects.push({
                SubjectDetails: item.SubjectDetails,
            });
        });
        dispatch(StudentUISlice.actions.RStudentCompulsarySubjects(StudentCompulsarySubjects));
        //console.log('StudentCompulsarySubjects:', StudentCompulsarySubjects);

        let FillOptionalSubjects = []
        response.data.FillOptionalSubjects.map((item, i) => {
            FillOptionalSubjects.push({

                Id: item.SubjectId,
                Name: item.SubjectName,
                Value: item.SubjectId

            });
        });
        dispatch(StudentUISlice.actions.RFillOptionalSubjects(FillOptionalSubjects));
        //console.log('FillOptionalSubjects:', FillOptionalSubjects);

        let FillCompitativeExams = []
        response.data.FillCompitativeExams.map((item, i) => {
            FillCompitativeExams.push({

                Id: item.Id,
                Name: item.ExamName,
                Value: item.Id,

            });
        });
        dispatch(StudentUISlice.actions.RFillCompitativeExams(FillCompitativeExams));
        // console.log('FillCompitativeExams:', FillCompitativeExams);

        let FillOptionalSubjectArts = []
        response.data.FillOptionalSubjectArts.map((item, i) => {
            FillOptionalSubjectArts.push({

                Id: item.SubjectId,
                Name: item.Subject_Name,
                Value: item.SubjectId

            });
        });
        dispatch(StudentUISlice.actions.RFillOptionalSubjectArts(FillOptionalSubjectArts));
        // console.log('FillOptionalSubjectArts:', FillOptionalSubjectArts);

    };

export const CDARetriveStudentStreamwiseSubject =
    (data: IRetriveStudentStreamwiseSubjectBody): AppThunk =>
        async (dispatch) => {
            //dispatch(StudentUISlice.actions.getLoading(true));
            const response = await GetStudentUIAPI.RetriveStudentStreamwiseSubjectApi(data);

            let GetStudentStreamwiseSubjectDetails = []
            response.data.GetStudentStreamwiseSubjectDetails.map((item, i) => {
                GetStudentStreamwiseSubjectDetails.push({
                    Id: item.Id,
                    StreamId: item.StreamId,
                    GroupId: item.GroupId,
                    CompulsorySubjects: item.CompulsorySubjects,
                    OptionalSubjects: item.OptionalSubjects,
                    CompitativeExam: item.CompitativeExam,
                });
            });

            dispatch(StudentUISlice.actions.RGetStudentStreamwiseSubjectDetails(GetStudentStreamwiseSubjectDetails));
            //console.log('GetStudentStreamwiseSubjectDetails:', GetStudentStreamwiseSubjectDetails);

            let StudentStreamDetails = []
            response.data.StudentStreamDetails.map((item, i) => {
                StudentStreamDetails.push({
                    IsSecondary: item.IsSecondary,
                    IsMidYear: item.IsMidYear,
                });
            });

            dispatch(StudentUISlice.actions.RStudentStreamDetails(StudentStreamDetails));
            //console.log('StudentStreamDetails:', StudentStreamDetails);
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

            let DisabilitiesDropdown = []
            response.data.DisabilitiesDropdown.map((item, i) => {
                DisabilitiesDropdown.push({
                    Id: item.Id,
                    Name: item.CategoryName,
                    Value: item.Id
                });
            });
            dispatch(StudentUISlice.actions.RDisabilitiesDropdown(DisabilitiesDropdown));

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
    (data: IGetStudentAdditionalDetailsBody): AppThunk =>
        async (dispatch) => {
            //dispatch(StudentUISlice.actions.getLoading(true));
            const response = await GetStudentUIAPI.GetStudentAdditionalDetailsApi(data);
            dispatch(StudentUISlice.actions.RGetStudentAdditionalDetails(response.data));
            // console.log(response.data, "CDAGetStudentAdditionalDetails ");
        };

export const CDAUpdateStudent =
    (data: IUpdateStudentBody): AppThunk =>
        async (dispatch) => {
            //dispatch(StudentUISlice.actions.getLoading(true));
            const response = await GetStudentUIAPI.UpdateStudentApi(data);
            dispatch(StudentUISlice.actions.RUpdateStudent(response.data));
            if (response.status === 200) {
                // The API call was successful
                console.log('1️⃣Student information updated successfully');
                console.log('Response data:', response.data);

                // Add success toast/notification
                //toast.success('Student information updated successfully');
            }
            else {
                // Handle non-200 status codes
                console.error('❌ API call failed with status:', response.status);
                console.error('Error response:', response.data);
            }
        };

export const ResetUpdateStudentMsg =
    (): AppThunk =>
        async (dispatch) => {
            dispatch(StudentUISlice.actions.getLoading(true));
            dispatch(StudentUISlice.actions.ResetUpdateStudentMsg());
        }

export const CDAAddStudentAdditionalDetails =
    (data: IAddStudentAdditionalDetailsBody): AppThunk =>
        async (dispatch) => {
            //dispatch(StudentUISlice.actions.getLoading(true));
            const response = await GetStudentUIAPI.AddStudentAdditionalDetailsApi(data);
            dispatch(StudentUISlice.actions.RAddStudentAdditionalDetails(response.data));
            if (response.status === 200) {
                // The API call was successful
                console.log('2️⃣Additional Student information updated successfully');
                console.log('Response data:', response.data);
            }
        };

export const ResetAddStudentAdditionalDetailsMsg =
    (): AppThunk =>
        async (dispatch) => {
            dispatch(StudentUISlice.actions.getLoading(true));
            dispatch(StudentUISlice.actions.ResetAddStudentAdditionalDetailsMsg());
        }

export const CDAUpdateStudentStreamwiseSubjectDetails =
    (data: IUpdateStudentStreamwiseSubjectDetailsBody): AppThunk =>
        async (dispatch) => {
            //dispatch(StudentUISlice.actions.getLoading(true));
            const response = await GetStudentUIAPI.UpdateStudentStreamwiseSubjectDetailsApi(data);
            dispatch(StudentUISlice.actions.RUpdateStudentStreamwiseSubjectDetails(response.data));
            if (response.status === 200) {
                // The API call was successful
                console.log('3️⃣Stream Tab Student subject updated successfully');
                console.log('Response data:', response.data);
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
            //console.log('CDAFeeAreaNames:', responseData);
        };

//DELETE API's
export const CDADeleteStudentPhoto =
    (data: IRemoveStudentPhotoBody): AppThunk =>
        async (dispatch) => {
            dispatch(StudentUISlice.actions.getLoading(true));
            const response = await GetStudentUIAPI.RemoveStudentPhotoApi(data);
            dispatch(StudentUISlice.actions.RDeleteStudentPhoto(response.data));
            //console.log('Response data CDACheckIfAttendanceMarked:', response.data);
        };
export const CDAresetDeletePhotoMsg = (): AppThunk => async (dispatch) => {
    dispatch(StudentUISlice.actions.resetDeletePhotoMsg());
};

export const CDADeleteFamilyPhoto =
    (data: IDeletePhotosBody): AppThunk =>
        async (dispatch) => {
            dispatch(StudentUISlice.actions.getLoading(true));
            const response = await GetStudentUIAPI.DeleteFamilyPhotoApi(data);
            dispatch(StudentUISlice.actions.RDeleteFamilyPhoto(response.data));
            //console.log('Response data CDACheckIfAttendanceMarked:', response.data);
        };

export const CDADeleteFatherPhoto =
    (data: IDeletePhotosBody): AppThunk =>
        async (dispatch) => {
            dispatch(StudentUISlice.actions.getLoading(true));
            const response = await GetStudentUIAPI.DeleteFatherPhotoApi(data);
            dispatch(StudentUISlice.actions.RDeleteFatherPhoto(response.data));
            //console.log('Response data CDACheckIfAttendanceMarked:', response.data);
        };

export const CDADeleteMotherPhoto =
    (data: IDeletePhotosBody): AppThunk =>
        async (dispatch) => {
            dispatch(StudentUISlice.actions.getLoading(true));
            const response = await GetStudentUIAPI.DeleteMotherPhotoApi(data);
            dispatch(StudentUISlice.actions.RDeleteMotherPhoto(response.data));
            //console.log('Response data CDACheckIfAttendanceMarked:', response.data);
        };

export const CDADeleteGuardianPhoto =
    (data: IDeletePhotosBody): AppThunk =>
        async (dispatch) => {
            dispatch(StudentUISlice.actions.getLoading(true));
            const response = await GetStudentUIAPI.DeleteGuardianPhotoApi(data);
            dispatch(StudentUISlice.actions.RDeleteGuardianPhoto(response.data));
            //console.log('Response data CDACheckIfAttendanceMarked:', response.data);
        };

export const CDACheckDependenciesForFees =
    (data: ICheckDependenciesForFeesBody): AppThunk =>
        async (dispatch) => {
            //dispatch(StudentUISlice.actions.getLoading(true));
            const response = await GetStudentUIAPI.CheckDependenciesForFeesApi(data);

            let ReferenceList = []
            response.data.ReferenceList.map((item, i) => {
                ReferenceList.push({
                    DebitorCredit: item.DebitorCredit,
                    Standard_Div_Id: item.Standard_Div_Id,
                    Std_FeeType_Id: item.Std_FeeType_Id,
                    Fee_Type: item.Fee_Type,
                    Student_Id: item.Student_Id,
                    Remarks: item.Remarks,
                    Standard_Id: item.Standard_Id,
                    Schoolwise_Standard_Fee_Configuration_Id: item.Schoolwise_Standard_Fee_Configuration_Id,
                    SchoolWise_Standard_FeeType_Id: item.SchoolWise_Standard_FeeType_Id,
                    Is_Deleted: item.Is_Deleted,
                    Academic_Year_Id: item.Academic_Year_Id,
                    SchoolWise_Student_Id: item.SchoolWise_Student_Id,

                });
            });

            dispatch(StudentUISlice.actions.RReferenceListDetails(ReferenceList));
            //console.log('GetStudentStreamwiseSubjectDetails:', GetStudentStreamwiseSubjectDetails);

            let ReferenceMessages = []
            response.data.ReferenceMessages.map((item, i) => {
                ReferenceMessages.push({
                    ReferenceMsg: item.Reference,
                });
            });

            dispatch(StudentUISlice.actions.RReferenceMessages(ReferenceMessages));
            //console.log('StudentStreamDetails:', StudentStreamDetails);
        };

export const ResetFeeDependencyErrorMsg =
    (): AppThunk =>
        async (dispatch) => {
            dispatch(StudentUISlice.actions.getLoading(true));
            dispatch(StudentUISlice.actions.ResetFeeDependencyErrorMsg());
        }
export default StudentUISlice.reducer;