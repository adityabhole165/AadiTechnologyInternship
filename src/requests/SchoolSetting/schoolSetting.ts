import { createSlice } from '@reduxjs/toolkit';
import SchoolSettingApi from 'src/api/SchoolSetting';
import {
  IGetAllAcademicYearForSchoolBody,
  IGetAllowedPagesForUserBody,
  IGetScreensAccessPermissions,
  IGetSettingValueBody,
  IGetSettingValueByNameBody,
  IGetUserDetailsBody,
  IgetModulesPermission
} from 'src/interfaces/SchoolSetting/schoolSettings';
import { AppThunk } from 'src/store';

const SchoolSettingSlice = createSlice({
  name: 'SchoolSetting',
  initialState: {
    ModulesPermission: [],
    ModulesPermissionsResult: [],
    SchoolTrasnportIsEnabled: false,
    SubTeacher: false,
    isLibrarySchoolSetting: false,
    ExternalLibrarySite: '',
    EnableMessageCenterReadModeForStudent: false,
    AllowStudentPhotoUploadFromStudentLogin: false,
    EnableOnlinePaymentForInternalFee: false,
    OnlinePaymentForCautionMoney: false,
    EnableAdvanceFeePaymentForStudent: false,
    EnableAdvanceFeePayment: false,
    EnableTransportCommitteeForStudentLogin: false,
    ShowAadharCardForStudent: false,
    EnableOnlineExamModule: false,
    AllowParentPhotoUploadFromStudentLogin: false,
    RestrictNewPaymentIfOldPaymentIsPending: false,
    EnableOnlinePaymentForLastYearFee: false,
    EnabledOnlineFee: false,
    AllowNextYearInternalFeePaymentForStudent: false,
    EnableHomeworkModuleForStudentLogin: false,
    ShowFeeStructureOfNextYear: false,
    AllowHomewirkDailyLog: false,
    ShowITRReportOnStudentLogin: false,
    AllowProgressReportDownloadAtStudentLogin: false,
    ShowTotalAsPerOutOfMarks: false,
    ShowProgressReportGraphOnMobileApp: false,
    AllAcademicYears: [],
    getUserDetails: {},
    // GetAllowedPagesForUserApi
    ISAllowedPagesForUser: [],
    Loading: true
  },
  reducers: {
    getModulesPermission(state, action) {
      state.ModulesPermission = action.payload.GetModulesPermissionsResult;
    },
    getEnableOnlineExamModule(state, action) {
      state.EnableOnlineExamModule = action.payload;
    },
    getEnableHomeworkModuleForStudent(state, action) {
      state.EnableHomeworkModuleForStudentLogin = action.payload;
    },
    // GetAllowedPagesForUserApi
    RAllowedPagesForUser(state, action) {
      state.ISAllowedPagesForUser = action.payload;
    },
    RClearISAllowedPagesForUser(state) {
      state.ISAllowedPagesForUser = [];
    },
    getEnabledOnlineFee(state, action) {
      state.EnabledOnlineFee = action.payload;
    },
    getAllowNextYearInternalFeePaymentForStudent(state, action) {
      state.AllowNextYearInternalFeePaymentForStudent = action.payload;
    },
    getRestrictNewPaymentIfOldPaymentIsPending(state, action) {
      state.RestrictNewPaymentIfOldPaymentIsPending = action.payload;
    },
    getEnableOnlinePaymentForLastYearFee(state, action) {
      state.EnableOnlinePaymentForLastYearFee = action.payload;
    },
    getAllowParentPhotoUploadFromStudentLogin(state, action) {
      state.AllowParentPhotoUploadFromStudentLogin = action.payload;
    },
    getShowAadharCardForStudent(state, action) {
      state.ShowAadharCardForStudent = action.payload;
    },
    getModulesPermissionsResult(state, action) {
      sessionStorage.setItem(
        'ScreensAccessPermission',
        JSON.stringify(action.payload)
      );
      state.ModulesPermissionsResult = action.payload;
    },
    getSchoolTrasnportIsEnabled(state, action) {
      state.SchoolTrasnportIsEnabled = action.payload;
    },
    getTransportCommitteeStudent(state, action) {
      state.EnableTransportCommitteeForStudentLogin = action.payload;
    },
    getSubTeacherIsEnabled(state, action) {
      state.SubTeacher = action.payload;
    },
    getLibrarySchoolSetting(state, action) {
      state.isLibrarySchoolSetting = action.payload;
    },
    getExternalLibrarySite(state, action) {
      state.ExternalLibrarySite = action.payload;
    },
    getEnableMessageCenterReadModeForStudent(state, action) {
      state.EnableMessageCenterReadModeForStudent = action.payload;
    },
    getAllowStudentPhotoUploadFromStudentLogin(state, action) {
      state.AllowStudentPhotoUploadFromStudentLogin = action.payload;
    },
    getEnableOnlinePaymentForInternalFee(state, action) {
      state.EnableOnlinePaymentForInternalFee = action.payload;
    },
    getOnlinePaymentCaution(state, action) {
      state.OnlinePaymentForCautionMoney = action.payload;
    },
    getEnableAdvanceFeePaymentforStudent(state, action) {
      state.EnableAdvanceFeePaymentForStudent = action.payload;
    },
    getEnableAdvancefeepayment(state, action) {
      state.EnableAdvanceFeePayment = action.payload;
    },
    getShowFeeStructureOfNextYear(state, action) {
      state.ShowFeeStructureOfNextYear = action.payload;
    },
    getAllowHomewirkDailyLog(state, action) {
      state.AllowHomewirkDailyLog = action.payload;
    },
    getShowITRReportOnStudentLogin(state, action) {
      state.ShowITRReportOnStudentLogin = action.payload;
    },

    AllowProgressReportDownloadAtLogin(state, action) {
      state.AllowProgressReportDownloadAtStudentLogin = action.payload;
    },

    ShowTotalAsPerOutOfMarks(state, action) {
      state.ShowTotalAsPerOutOfMarks = action.payload;
    },

    ShowProgressReportGraphOnMobileApp(state, action) {
      state.ShowProgressReportGraphOnMobileApp = action.payload;
    },
    GetAllAcademicYear(state, action) {
      state.AllAcademicYears = action.payload;
      state.Loading = false;
    },
    GetUserDetails(state, action) {
      state.getUserDetails = action.payload.TeacherDetails;

    },
    getLoading(state, action) {
      state.Loading = true;
    }
  }
});
export const getAllAcademicYears =
  (data: IGetAllAcademicYearForSchoolBody): AppThunk =>
    async (dispatch) => {
      dispatch(SchoolSettingSlice.actions.getLoading(true));
      const response = await SchoolSettingApi.GetAllAcademicYearApi(data);
      const GetAllAcademicYears = response.data.map((item, index) => {
        return {
          Id: item.Academic_Year_ID,
          Name: item.YearValue,
          Value: item.Academic_Year_ID,
          Text1: item.School_Id,
          Text2: item.Start_date,
          Text3: item.End_Date,
          Text4: item.School_Name
        };
      });

      dispatch(SchoolSettingSlice.actions.GetAllAcademicYear(GetAllAcademicYears));
      //console.log("abc", response)
    };

// GetAllowedPagesForUserApi
export const getAllowedPagesForUser =
  (data: IGetAllowedPagesForUserBody): AppThunk =>
    async (dispatch) => {
      dispatch(SchoolSettingSlice.actions.RClearISAllowedPagesForUser());
      const response = await SchoolSettingApi.GetAllowedPagesForUserApi(data);
      dispatch(SchoolSettingSlice.actions.RAllowedPagesForUser(response.data));
    }
export const getModulesPermission =
  (data: IgetModulesPermission): AppThunk =>
    async (dispatch) => {
      const response = await SchoolSettingApi.GetModulesPermissions(data);
      dispatch(SchoolSettingSlice.actions.getModulesPermission(response.data));
    };
export const getUserDetailss =
  (data: IGetUserDetailsBody): AppThunk =>
    async (dispatch) => {
      const response = await SchoolSettingApi.GetUserDetailApi(data);
      dispatch(SchoolSettingSlice.actions.GetUserDetails(response.data));
    };

export const getModulesPermissionsResultt =
  (data: IGetScreensAccessPermissions): AppThunk =>
    async (dispatch) => {
      const response = await SchoolSettingApi.GetScreensAccessPermission(data);
      dispatch(
        SchoolSettingSlice.actions.getModulesPermissionsResult(response.data)
      );
    };

export const getGetSettingValue =
  (data: IGetSettingValueBody): AppThunk =>
    async (dispatch) => {
      let trasnportIsEnabled = false;
      data.asKey = 'EnableTransportModule';
      let response = await SchoolSettingApi.GetSettingValueapi(data);
      if (response.data.GetSettingValueResult) {
        data.asKey = 'EnableTransportLinkForStudentLogin';
        response = await SchoolSettingApi.GetSettingValueapi(data);
        if (response.data.GetSettingValueResult) {
          {
            trasnportIsEnabled = true;
          }
        }
      }
      dispatch(
        SchoolSettingSlice.actions.getSchoolTrasnportIsEnabled(trasnportIsEnabled)
      );
    };
export const getTransportCommitteeForStudent =
  (data: IGetSettingValueBody): AppThunk =>
    async (dispatch) => {
      let TransportCommitteeForStudent = false;
      data.asKey = 'EnableTransportCommitteeForStudentLogin';
      let response = await SchoolSettingApi.GetSettingValueapi(data);
      if (response.data.GetSettingValueResult) {
        {
          TransportCommitteeForStudent = true;
        }
      }
      dispatch(
        SchoolSettingSlice.actions.getTransportCommitteeStudent(
          TransportCommitteeForStudent
        )
      );
    };
export const getEnableHomeworkModule =
  (data: IGetSettingValueBody): AppThunk =>
    async (dispatch) => {
      let EnableHomeworkModule = false;
      data.asKey = 'EnableHomeworkModuleForStudentLogin';
      let response = await SchoolSettingApi.GetSettingValueapi(data);
      if (response.data.GetSettingValueResult) {
        {
          EnableHomeworkModule = true;
        }
      }
      dispatch(
        SchoolSettingSlice.actions.getEnableHomeworkModuleForStudent(
          EnableHomeworkModule
        )
      );
    };

export const getallowNextYearInternalFeePaymentForStudent =
  (data: IGetSettingValueBody): AppThunk =>
    async (dispatch) => {
      let allowNestYearInternal = false;
      data.asKey = 'AllowNextYearInternalFeePaymentForStudent';
      let response = await SchoolSettingApi.GetSettingValueapi(data);
      if (response.data.GetSettingValueResult) {
        {
          allowNestYearInternal = true;
        }
      }
      dispatch(
        SchoolSettingSlice.actions.getAllowNextYearInternalFeePaymentForStudent(
          allowNestYearInternal
        )
      );
    };
export const getParentPhotoUpload =
  (data: IGetSettingValueBody): AppThunk =>
    async (dispatch) => {
      let ParentPhotoUpload = false;
      data.asKey = 'AllowParentPhotoUploadFromStudentLogin';
      let response = await SchoolSettingApi.GetSettingValueapi(data);
      if (response.data.GetSettingValueResult) {
        {
          ParentPhotoUpload = true;
        }
      }
      dispatch(
        SchoolSettingSlice.actions.getAllowParentPhotoUploadFromStudentLogin(
          ParentPhotoUpload
        )
      );
    };
export const getEnabledOnlineFeePayment =
  (data: IGetSettingValueBody): AppThunk =>
    async (dispatch) => {
      let EnabledOnlineFee = false;
      data.asKey = 'EnabledOnlineFee';
      let response = await SchoolSettingApi.GetSettingValueapi(data);
      if (response.data.GetSettingValueResult) {
        {
          EnabledOnlineFee = true;
        }
      }
      dispatch(SchoolSettingSlice.actions.getEnabledOnlineFee(EnabledOnlineFee));
    };

export const getEnableOnlinePaymentForLastYearfee =
  (data: IGetSettingValueBody): AppThunk =>
    async (dispatch) => {
      let EnableOnlinePaymentLastYear = false;
      data.asKey = 'EnableOnlinePaymentForLastYearFee';
      let response = await SchoolSettingApi.GetSettingValueapi(data);
      if (response.data.GetSettingValueResult) {
        {
          EnableOnlinePaymentLastYear = true;
        }
      }
      dispatch(
        SchoolSettingSlice.actions.getEnableOnlinePaymentForLastYearFee(
          EnableOnlinePaymentLastYear
        )
      );
    };
export const getRestrictNewPaymentIfOldPaymentIsPending =
  (data: IGetSettingValueBody): AppThunk =>
    async (dispatch) => {
      let RestrictNewPayment = false;
      data.asKey = 'RestrictNewPaymentIfOldPaymentIsPending';
      let response = await SchoolSettingApi.GetSettingValueapi(data);
      if (response.data.GetSettingValueResult) {
        {
          RestrictNewPayment = true;
        }
      }
      dispatch(
        SchoolSettingSlice.actions.getRestrictNewPaymentIfOldPaymentIsPending(
          RestrictNewPayment
        )
      );
    };
export const GetEnableMessageCenterReadModeForStudent =
  (data: IGetSettingValueBody): AppThunk =>
    async (dispatch) => {
      let EnableMessageCenterReadMode = false;
      data.asKey = 'EnableMessageCenterReadModeForStudent';
      let response = await SchoolSettingApi.GetSettingValueapi(data);
      if (response.data.GetSettingValueResult) {
        EnableMessageCenterReadMode = true;
      }
      dispatch(
        SchoolSettingSlice.actions.getEnableMessageCenterReadModeForStudent(
          EnableMessageCenterReadMode
        )
      );
    };
export const GetEnableOnlinePaymentForInternalFee =
  (data: IGetSettingValueBody): AppThunk =>
    async (dispatch) => {
      let OnlinePaymentForInternalFee = false;
      data.asKey = 'EnableOnlinePaymentForInternalFee';
      let response = await SchoolSettingApi.GetSettingValueapi(data);
      if (response.data.GetSettingValueResult) {
        OnlinePaymentForInternalFee = true;
      }
      dispatch(
        SchoolSettingSlice.actions.getEnableOnlinePaymentForInternalFee(
          OnlinePaymentForInternalFee
        )
      );
    };
export const GetAllowStudentPhotoUploadFromStudentLogin =
  (data: IGetSettingValueBody): AppThunk =>
    async (dispatch) => {
      let AllowStudentPhotoUpload = false;
      data.asKey = 'AllowStudentPhotoUploadFromStudentLogin';
      let response = await SchoolSettingApi.GetSettingValueapi(data);
      if (response.data.GetSettingValueResult) {
        AllowStudentPhotoUpload = true;
      }
      dispatch(
        SchoolSettingSlice.actions.getAllowStudentPhotoUploadFromStudentLogin(
          AllowStudentPhotoUpload
        )
      );
    };
export const getGetSettingSubTeacher =
  (data: IGetSettingValueBody): AppThunk =>
    async (dispatch) => {
      let subTeacherIsEnabled = false;
      data.asKey = 'IsEnableSubjecTeacherScreen';
      let response = await SchoolSettingApi.GetSettingValueapi(data);
      if (response.data.GetSettingValueResult) {
        {
          subTeacherIsEnabled = true;
        }
      }
      dispatch(
        SchoolSettingSlice.actions.getSubTeacherIsEnabled(subTeacherIsEnabled)
      );
    };
export const getLibrarySchoolSetting =
  (data: IGetSettingValueBody): AppThunk =>
    async (dispatch) => {
      let isLibrarySchoolSetting = false;
      data.asKey = 'EnableLibraryModule';
      let response = await SchoolSettingApi.GetSettingValueapi(data);
      if (response.data.GetSettingValueResult) {
        data.asKey = 'EnableLibraryLinkForStudentLogin';
        response = await SchoolSettingApi.GetSettingValueapi(data);
        if (sessionStorage.getItem('RoleId') === '3')
          isLibrarySchoolSetting =
            response.data.GetSettingValueResult.toString() === 'true';
        else isLibrarySchoolSetting = true;
      }
      dispatch(
        SchoolSettingSlice.actions.getLibrarySchoolSetting(isLibrarySchoolSetting)
      );
      let data2: IGetSettingValueByNameBody = {
        asSchoolId: data.asSchoolId,
        asAcademicYearId: data.aiAcademicYearId,
        asKey: 'ExternalLibrarySite'
      };
      let response2 = await SchoolSettingApi.GetSettingValueByNameApi(data2);
      dispatch(
        SchoolSettingSlice.actions.getExternalLibrarySite(response2.data.Value)
      );
    };
export const getOnlinePaymentForCautionMoney =
  (data: IGetSettingValueBody): AppThunk =>
    async (dispatch) => {
      let OnlinePayment = false;
      data.asKey = 'EnableOnlinePaymentForCautionMoney';
      let response = await SchoolSettingApi.GetSettingValueapi(data);
      if (response.data.GetSettingValueResult) {
        {
          OnlinePayment = true;
        }
      }
      dispatch(SchoolSettingSlice.actions.getOnlinePaymentCaution(OnlinePayment));
    };

export const getEnableadvanceFeepayment =
  (data: IGetSettingValueBody): AppThunk =>
    async (dispatch) => {
      let AllowOnlinePaymentforStudent = false;
      data.asKey = 'EnableAdvanceFeePaymentForStudent';
      let response = await SchoolSettingApi.GetSettingValueapi(data);
      if (response.data.GetSettingValueResult) {
        {
          AllowOnlinePaymentforStudent = true;
        }
      }
      dispatch(
        SchoolSettingSlice.actions.getEnableAdvanceFeePaymentforStudent(
          AllowOnlinePaymentforStudent
        )
      );
    };
export const EnableAdvancefeePayment =
  (data: IGetSettingValueBody): AppThunk =>
    async (dispatch) => {
      let AllowOnlinePayment = false;
      data.asKey = 'EnableAdvanceFeePayment';
      let response = await SchoolSettingApi.GetSettingValueapi(data);
      if (response.data.GetSettingValueResult) {
        {
          AllowOnlinePayment = true;
        }
      }
      dispatch(
        SchoolSettingSlice.actions.getEnableAdvancefeepayment(AllowOnlinePayment)
      );
    };
export const ShowAadharCardForStudent =
  (data: IGetSettingValueBody): AppThunk =>
    async (dispatch) => {
      let AadharCardForStudent = false;
      data.asKey = 'ShowAadharCardForStudent';
      let response = await SchoolSettingApi.GetSettingValueapi(data);
      if (response.data.GetSettingValueResult) {
        {
          AadharCardForStudent = true;
        }
      }
      dispatch(
        SchoolSettingSlice.actions.getShowAadharCardForStudent(
          AadharCardForStudent
        )
      );
    };
export const EnableOnlineExamM =
  (data: IGetSettingValueBody): AppThunk =>
    async (dispatch) => {
      let EnableOnlineExam = false;
      data.asKey = 'EnableOnlineExamModule';
      let response = await SchoolSettingApi.GetSettingValueapi(data);
      if (response.data.GetSettingValueResult) {
        {
          EnableOnlineExam = true;
        }
      }
      dispatch(
        SchoolSettingSlice.actions.getEnableOnlineExamModule(EnableOnlineExam)
      );
    };
export const ShowFeeStructureOfNextYear =
  (data: IGetSettingValueBody): AppThunk =>
    async (dispatch) => {
      let FeeStructureOfNextYear = false;
      data.asKey = 'ShowFeeStructureOfNextYear';
      let response = await SchoolSettingApi.GetSettingValueapi(data);
      if (response.data.GetSettingValueResult) {
        {
          FeeStructureOfNextYear = true;
        }
      }
      dispatch(
        SchoolSettingSlice.actions.getShowFeeStructureOfNextYear(
          FeeStructureOfNextYear
        )
      );
    };

export const getAllowHomewirkDaily =
  (data: IGetSettingValueBody): AppThunk =>
    async (dispatch) => {
      let AllowHomewirkDailyLog = false;
      data.asKey = 'AllowHomewirkDailyLog';
      let response = await SchoolSettingApi.GetSettingValueapi(data);
      if (response.data.GetSettingValueResult) {
        {
          AllowHomewirkDailyLog = true;
        }
      }
      dispatch(
        SchoolSettingSlice.actions.getAllowHomewirkDailyLog(AllowHomewirkDailyLog)
      );
    };

export const getShowITRReportOnStudentLogin =
  (data: IGetSettingValueBody): AppThunk =>
    async (dispatch) => {
      let ShowITRReportOnStudentLogin = false;
      data.asKey = 'ShowITRReportOnStudentLogin';
      let response = await SchoolSettingApi.GetSettingValueapi(data);
      if (response.data.GetSettingValueResult) {
        {
          ShowITRReportOnStudentLogin = true;
        }
      }
      dispatch(
        SchoolSettingSlice.actions.getShowITRReportOnStudentLogin(
          ShowITRReportOnStudentLogin
        )
      );
    };

export const AllowProgressReportDownloadAtLogin =
  (data: IGetSettingValueBody): AppThunk =>
    async (dispatch) => {
      let AllowProgressReportDownloadAtStudentLogin = false;
      data.asKey = 'AllowProgressReportDownloadAtStudentLogin';
      let response = await SchoolSettingApi.GetSettingValueapi(data);
      if (response.data.GetSettingValueResult) {
        {
          AllowProgressReportDownloadAtStudentLogin = true;
        }
      }
      dispatch(
        SchoolSettingSlice.actions.AllowProgressReportDownloadAtLogin(
          AllowProgressReportDownloadAtStudentLogin
        )
      );
    };

export const ShowTotalAsPerOutOfMarks =
  (data: IGetSettingValueBody): AppThunk =>
    async (dispatch) => {
      let ShowTotalAsPerOutOfMarks = false;
      data.asKey = 'ShowTotalAsPerOutOfMarks';
      let response = await SchoolSettingApi.GetSettingValueapi(data);
      if (response.data.GetSettingValueResult) {
        {
          ShowTotalAsPerOutOfMarks = true;
        }
      }
      dispatch(
        SchoolSettingSlice.actions.ShowTotalAsPerOutOfMarks(
          ShowTotalAsPerOutOfMarks
        )
      );
    };

export const ShowProgressReportGraphOnMobileApp =
  (data: IGetSettingValueBody): AppThunk =>
    async (dispatch) => {
      let ShowProgressReportGraphOnMobileApp = false;
      data.asKey = 'ShowProgressReportGraphOnMobileApp';
      let response = await SchoolSettingApi.GetSettingValueapi(data);
      if (response.data.GetSettingValueResult) {
        {
          ShowProgressReportGraphOnMobileApp = true;
        }
      }
      dispatch(
        SchoolSettingSlice.actions.ShowProgressReportGraphOnMobileApp(
          ShowProgressReportGraphOnMobileApp
        )
      );
    };

export default SchoolSettingSlice.reducer;
