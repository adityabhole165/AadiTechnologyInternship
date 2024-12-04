import { createSlice } from '@reduxjs/toolkit';
import IGetAllStandards, {
  IConfigurationData,
  ICopyStandardTestBody,
  IExamScheduleConfigBody,
  IGetExamScheduleBody,
  IGetExamsList,
  IGetStandardsForExamCopyBody,
  IGetSubjectExamScheduleBody,
  IInsertExamScheduleBody,
  ISumbitExamScheduleBody,
  IUpdateExamScheduleInstructionsBody,
  IUpdateStandardWiseExamScheduleBody
} from 'src/interfaces/Teacher/TExamSchedule';
import { AppThunk } from 'src/store';

import GetTExamResultListApi from 'src/api/Texamschedule/Texamschedule';
import { extractTimeforExamSchedule, getDateMonthYear } from 'src/components/Common/Util';

const SelectStandardExamslice = createSlice({
  name: 'selectexam',
  initialState: {
    SelectStandard: [],
    getStandard: [],
    ExamData: [],
    VeiwAllData: [],
    NewExamData: [],
    RStandard: [],
    RStandardwTest: [],
    ExamSchedule: [],
    SubjectExamSchedule: [],
    Instructionss: [],
    IsSubmitedd: [],
    StandardsForExamCopy: [],
    UpdateExamScheduleInstructionsMsg: '',
    UpdateStandardWiseExamScheduleMsg: '',
    CopyStandardTestMsg: '',
    InsertExamSchedule: [],
    SumbitExamSchedule: '',
    GetIsSchoolConfigured: '',
    InsertConfigurationSchoolMaster: '',
    Loading: true
  },
  reducers: {
    getSelectStandardRes(state, action) {
      state.SelectStandard = action.payload;
    },
    ViewExamDataRes(state, action) {
      state.Loading = false;
      state.ExamData = action.payload;
    },
    NewExamDataRes(state, action) {
      state.Loading = false;
      state.NewExamData = action.payload;
    },
    AllExamData(state, action) {
      state.Loading = false;
      state.VeiwAllData = action.payload;
    },
    getStandardRes(state, action) {
      state.getStandard = action.payload;
    },
    RStandardRes(state, action) {
      state.RStandard = action.payload;
    },
    RStandardwTestRes(state, action) {
      state.RStandardwTest = action.payload;
    },
    ExamSchedule(state, action) {
      state.ExamSchedule = action.payload;
    },
    SubjectExamSchedule(state, action) {
      state.SubjectExamSchedule = action.payload;
    },
    StandardsForExamCopy(state, action) {
      state.StandardsForExamCopy = action.payload;
    },
    Instructionss(state, action) {
      state.Instructionss = action.payload;
    },
    IsSubmitedd(state, action) {
      state.IsSubmitedd = action.payload;
    },
    getUpdateExamScheduleInstructionsMsg(state, action) {
      state.Loading = false;
      state.UpdateExamScheduleInstructionsMsg = action.payload;
    },
    resetUpdateExamScheduleInstructionsMsg(state) {
      state.Loading = false;
      state.UpdateExamScheduleInstructionsMsg = '';
    },
    getUpdateStandardWiseExamScheduleMsg(state, action) {
      state.Loading = false;
      state.UpdateStandardWiseExamScheduleMsg = action.payload;
    },
    resetUpdateStandardWiseExamScheduleMsg(state) {
      state.Loading = false;
      state.UpdateStandardWiseExamScheduleMsg = '';
    },
    getCopyStandardTestMsg(state, action) {
      state.Loading = false;
      state.CopyStandardTestMsg = action.payload;
    },
    resetCopyStandardTestMsg(state) {
      state.Loading = false;
      state.CopyStandardTestMsg = '';
    },
    getInsertExamSchedule(state, action) {
      state.Loading = false;
      state.InsertExamSchedule = action.payload;
    },
    getSumbitExamSchedule(state, action) {
      state.Loading = false;
      state.SumbitExamSchedule = action.payload;
    },
    resetSumbitExamSchedule(state) {
      state.Loading = false;
      state.SumbitExamSchedule = '';
    },
    GetIsSchoolConfigured(state, action) {
      state.Loading = false;
      state.GetIsSchoolConfigured = action.payload;
    },
    InsertConfigurationSchoolMaster(state, action) {
      state.Loading = false;
      state.InsertConfigurationSchoolMaster = action.payload;
    },
    getLoading(state, action) {
      state.Loading = true;
      state.ExamData = [];
    }
  }
});
export const GetSelectStandardRes =
  (data: IGetAllStandards): AppThunk =>
    async (dispatch) => {
      const response = await GetTExamResultListApi.GetAllStandards(data);
      const itemlist = [{ id: '0', Name: 'All', Value: '0' }];
      if (response?.data.GetAllStandardsResult) {
        const standards = response.data.GetAllStandardsResult.map((item) => ({
          id: item.Id,
          Name: item.Name,
          Value: item.Id
        }));
        itemlist.push(...standards);
      }
      dispatch(SelectStandardExamslice.actions.getSelectStandardRes(itemlist));

    };

export const GetStandardRes =
  (data: IGetAllStandards): AppThunk =>
    async (dispatch) => {
      const response = await GetTExamResultListApi.GetAllStandards(data);
      const itemlist = [{ id: '0', Name: 'Select', Value: '0' }];
      if (response?.data.GetAllStandardsResult) {
        const standards = response.data.GetAllStandardsResult.map((item) => ({
          id: item.Id,
          Name: item.Name,
          Value: item.Id
        }));
        itemlist.push(...standards);
      }
      dispatch(SelectStandardExamslice.actions.getStandardRes(itemlist));

    };


// export const EmptyExam = (): AppThunk => async (dispatch) => {
//   dispatch(SelectStandardExamslice.actions.getSelectExamRes([]));
// };

export const ViewExamDataRess =
  (data: IGetExamsList): AppThunk =>
    async (dispatch) => {
      dispatch(SelectStandardExamslice.actions.getLoading(true));
      const response = await GetTExamResultListApi.GetExamsList(data);

      const DataList = response?.data?.GetExamDropDownForExamScheduleDetailsList.map((item) => {
        return {
          Text1: item.SchoolWise_Test_Name,
          Text2: item.SchoolWise_Test_Id,
          Text3: item.Exam_Start_Date,
          Text4: item.Exam_End_Date,
          Text5: item.IsCollapsed,
          Text6: item.Instructions,
          StandardId: item.StandardId
        };
      });

      const itemlist = response?.data?.ExamScheduleList.map((item) => {
        return {
          text1: item.SchoolWise_Test_Id,
          header:
            item.SubjectName +
            ' ' +
            (item.TestType !== '' ? '- ' + item.TestType : ''),
          text2: item.StartTime + ' - ' + item.EndTime,
          text5: item.Description,
          text3: item.StartDayDate.replace('-', ' ').replace('-', ' '),
          Standard_Name: item.Standard_Name,
          Instructions: item.Instructions,
          startTime: item.StartTime,
          endTime: item.EndTime,
          Description: item.Description
        };
      });
      dispatch(SelectStandardExamslice.actions.ViewExamDataRes(DataList));
      dispatch(SelectStandardExamslice.actions.AllExamData(itemlist));
    };


export const NewExamSchedule =
  (data: IGetExamsList): AppThunk =>
    async (dispatch) => {
      dispatch(SelectStandardExamslice.actions.getLoading(true));
      const response = await GetTExamResultListApi.GetExamsList(data);

      const DataList = response?.data?.GetExamDropDownForExamScheduleDetailsList.map((item) => {
        return {
          Text1: item.SchoolWise_Test_Name,
          Text2: item.SchoolWise_Test_Id,
          Text3: item.Exam_Start_Date,
          Text4: item.Exam_End_Date,
          Text5: item.IsCollapsed,
          Text6: item.Instructions,
          StandardId: item.StandardId,
          Schoolwise_Standard_Exam_Schedule_Id: item.Schoolwise_Standard_Exam_Schedule_Id
        };
      });

      const DataListNew = response?.data?.GetSubjectsExamScheduleList
        .flatMap(item => Array.isArray(item) ? item : [item])
        .filter(item => item && item.ID)
        .map((subItem: any) => ({
          Text1: subItem.ID,
          Text2: subItem.Subject_Name,
          Text3: subItem.TestType,
          Text4: subItem.TestType_Name,
          Text5: subItem.Start_DateTime,
          Text6: subItem.End_DateTime,
          TotalTime: subItem.TotalTime,
          Description: subItem.Description,
          SchoolwiseStandardExamScheduleId: subItem.Schoolwise_Standard_Exam_Schedule_Id
        }));

      dispatch(SelectStandardExamslice.actions.ViewExamDataRes(DataList));
      dispatch(SelectStandardExamslice.actions.NewExamDataRes(DataListNew));
    };


export const RExamSchedule =
  (data: IGetExamScheduleBody): AppThunk =>
    async (dispatch) => {
      dispatch(SelectStandardExamslice.actions.getLoading(true));

      const response = await GetTExamResultListApi.GetExamScheduleFullAcc(data);
      console.log(response, "response");

      const GetStandardTest = (StandardId, TestId) => {
        return response.data.listSchoolwiseStandardTest
          .filter(item => item.standard_id === StandardId && item.SchoolWise_Test_Id === TestId);
      };

      const GetConfigExam = (StandardId, TestId) => {
        return response.data.listSchoolWiseConfigExam
          .filter(item => item.Standard_Id === StandardId && item.SchoolWise_Test_Id === TestId);
      };

      let Array = [];
      let Id = 0;

      response?.data?.listSchoolWiseStandards.forEach((Standards) => {
        response.data?.listSchoolWiseTestNamE.forEach((Tests) => {
          Id += 1;

          const StandardTest = GetStandardTest(Standards.standard_id, Tests.SchoolWise_TestId);
          if (StandardTest.length === 0) {
            Array.push({
              Id,
              Name: "N/A",
              Background: "#F0F0F0",
              textColor: "#000000",
              IsLink: false,
              fontWeight: '',
              IsConfigured: false,
              Header: Standards.standard_name, // Maps to header
              SubHeader: Tests.SchoolWise_TestName, // Maps to subheader
              TestId: Tests.SchoolWise_TestId,
              StandardId: Standards.standard_id
            });
          } else {
            const ConfigExam = GetConfigExam(Standards.standard_id, Tests.SchoolWise_TestId);
            if (ConfigExam.length === 0) {
              Array.push({
                Id,
                Name: "Not Configured",
                Background: "#4CAF50",
                textColor: "#FFFFFF",
                IsLink: true,
                fontWeight: "bold",
                IsConfigured: false,
                Header: Standards.standard_name,
                SubHeader: Tests.SchoolWise_TestName,
                TestId: Tests.SchoolWise_TestId,
                StandardId: Standards.standard_id
              });
            } else {
              Array.push({
                Id,
                Name: `${getDateMonthYear(ConfigExam[0].Exam_Start_Date)} - ${getDateMonthYear(ConfigExam[0].Exam_End_Date)}`,
                Background: "#A5D6A7",
                textColor: "#000000",
                IsLink: true,
                fontWeight: 'bold',
                IsConfigured: true,
                Header: Standards.standard_name,
                SubHeader: Tests.SchoolWise_TestName,
                TestId: Tests.SchoolWise_TestId,
                StandardId: Standards.standard_id,
                SchoolwiseStandardExamScheduleId: ConfigExam[0].Schoolwise_Standard_Exam_Schedule_Id,
                StandardTestId: ConfigExam[0].Standard_Test_Id
              });
            }
          }
        });
      });

      console.log(Array, "Mapped Array");

      const DataList = response?.data?.listSchoolWiseStandards.map((item) => ({
        Text1: item.original_standard_id,
        Text2: item.standard_id,
        Name: item.standard_name,
        school_id: item.school_id,
      }));

      const ItemList = response?.data?.listSchoolWiseTestNamE.map((item) => ({
        text1: item.SchoolWise_TestId,
        Name: item.SchoolWise_TestName,
      }));

      dispatch(SelectStandardExamslice.actions.RStandardRes(DataList));
      dispatch(SelectStandardExamslice.actions.RStandardwTestRes(ItemList));
      dispatch(SelectStandardExamslice.actions.ExamSchedule(Array));
    };

// export const GetSubjectExamSchedule =
//   (data: IGetSubjectExamScheduleBody): AppThunk =>
//     async (dispatch) => {
//       dispatch(SelectStandardExamslice.actions.getLoading(true));
//       const response = await GetTExamResultListApi.GetSubjectExamScheduleList(data);

//       const DataList = response?.data?.listStandardwiseSubject.map((item) => {
//         return {
//           Text1: item.SubjectWize_Standard_Exam_Schedule_Id,
//           subject: item.Subject_Name,
//           id: item.Subject_Id,
//           Text4: item.Start_DateTime,
//           Text5: item.End_DateTime,
//           examType: item.TestType,
//           TotalTime: item.TotalTime,
//           description: item.Description,
//           Marks: item.Marks
//         };
//       });
//       dispatch(SelectStandardExamslice.actions.SubjectExamSchedule(DataList));
//     };

export const GetSubjectExamSchedule =
  (data: IGetSubjectExamScheduleBody): AppThunk =>
    async (dispatch) => {
      dispatch(SelectStandardExamslice.actions.getLoading(true));
      const response = await GetTExamResultListApi.GetSubjectExamScheduleList(data);

      const DataList = response?.data?.listStandardwiseSubject.map((item) => {
        const startTime = extractTimeforExamSchedule(item.Start_DateTime);
        const endTime = extractTimeforExamSchedule(item.End_DateTime);

        return {
          SubjectWizeStandardExamScheduleId: item.SubjectWize_Standard_Exam_Schedule_Id,
          subject: item.Subject_Name,
          id: item.Subject_Id,
          examType: item.TestType,
          examDate: getDateMonthYear(item.Start_DateTime),
          startTime: startTime,
          endTime: endTime,
          description: item.Description,
          IsNew: true,
          TotalTime: item.TotalTime,
          timed: !!(startTime && endTime),
        };
      });
      dispatch(SelectStandardExamslice.actions.SubjectExamSchedule(DataList));
      dispatch(SelectStandardExamslice.actions.IsSubmitedd(response.data.IsSubmitedd));
      dispatch(SelectStandardExamslice.actions.Instructionss(response.data.Instructionss));
    };

export const GetStandardsForExamCopy =
  (data: IGetStandardsForExamCopyBody): AppThunk =>
    async (dispatch) => {
      dispatch(SelectStandardExamslice.actions.getLoading(true));
      const response = await GetTExamResultListApi.GetStandardsForExamCopy(data);

      const StandardForCopy = response?.data?.GetCopyExamStandardList.map((item) => {
        return {
          Id: item.Standard_Id,
          Standard: item.Standard_Name
        };
      });
      dispatch(SelectStandardExamslice.actions.StandardsForExamCopy(StandardForCopy));
    };

export const GetUpdateExamScheduleInstructions = (data: IUpdateExamScheduleInstructionsBody): AppThunk => async (dispatch) => {
  dispatch(SelectStandardExamslice.actions.getLoading(true));
  const response = await GetTExamResultListApi.UpdateExamScheduleInstructions(data);
  dispatch(SelectStandardExamslice.actions.getUpdateExamScheduleInstructionsMsg(response.data));
};

export const resetUpdateExamScheduleInstructions = (): AppThunk => async (dispatch) => {
  dispatch(SelectStandardExamslice.actions.resetUpdateExamScheduleInstructionsMsg());
};

export const GetUpdateStandardWiseExamScheduleMsg = (data: IUpdateStandardWiseExamScheduleBody): AppThunk => async (dispatch) => {
  dispatch(SelectStandardExamslice.actions.getLoading(true));
  const response = await GetTExamResultListApi.UpdateStandardWiseExamSchedule(data);
  dispatch(SelectStandardExamslice.actions.getUpdateStandardWiseExamScheduleMsg(response.data));
};

export const resetUpdateStandardWiseExamScheduleMsg = (): AppThunk => async (dispatch) => {
  dispatch(SelectStandardExamslice.actions.resetUpdateStandardWiseExamScheduleMsg());
};

export const GetCopyStandardTestMsg = (data: ICopyStandardTestBody): AppThunk => async (dispatch) => {
  dispatch(SelectStandardExamslice.actions.getLoading(true));
  const response = await GetTExamResultListApi.CopyExamschedule(data);
  dispatch(SelectStandardExamslice.actions.getCopyStandardTestMsg(response.data));
};

export const resetCopyStandardTestMsg = (): AppThunk => async (dispatch) => {
  dispatch(SelectStandardExamslice.actions.resetCopyStandardTestMsg());
};

export const GetInsertExamSchedule = (data: IInsertExamScheduleBody): AppThunk => async (dispatch) => {
  dispatch(SelectStandardExamslice.actions.getLoading(true));
  const response = await GetTExamResultListApi.InsertExamSchedule(data);
  const ExamSchedule = response?.data?.Table.map((item) => {
    return {
      Message: item.Message,
      ExamScheduleId: item.ExamScheduleId
    };
  });
  dispatch(SelectStandardExamslice.actions.getInsertExamSchedule(ExamSchedule));
};

export const GetSumbitExamSchedule = (data: ISumbitExamScheduleBody): AppThunk => async (dispatch) => {
  dispatch(SelectStandardExamslice.actions.getLoading(true));
  const response = await GetTExamResultListApi.SumbitExamSchedule(data);
  dispatch(SelectStandardExamslice.actions.getSumbitExamSchedule(response.data));
};
export const GetIsSchoolConfigured = (data: IExamScheduleConfigBody): AppThunk => async (dispatch) => {
  dispatch(SelectStandardExamslice.actions.getLoading(true));
  const response = await GetTExamResultListApi.GetIsSchoolConfigured(data);
  dispatch(SelectStandardExamslice.actions.GetIsSchoolConfigured(response.data));
};

export const InsertConfigurationSchoolMaster = (data: IConfigurationData): AppThunk => async (dispatch) => {
  dispatch(SelectStandardExamslice.actions.getLoading(true));
  const response = await GetTExamResultListApi.InsertConfigurationSchoolMaster(data);
  dispatch(SelectStandardExamslice.actions.InsertConfigurationSchoolMaster(response.data));
};
export const resetSumbitExamSchedule = (): AppThunk => async (dispatch) => {
  dispatch(SelectStandardExamslice.actions.resetSumbitExamSchedule());
};
export default SelectStandardExamslice.reducer;


