import { createSlice } from '@reduxjs/toolkit';
import IGetAllStandards, {
  IGetExamScheduleBody,
  IGetExamsList
} from 'src/interfaces/Teacher/TExamSchedule';
import { AppThunk } from 'src/store';

import GetTExamResultListApi from 'src/api/Texamschedule/Texamschedule';

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
          .filter(item => item.standard_id === StandardId && item.SchoolWise_Test_Id === TestId)

      }
      const GetConfigExam = (StandardId, TestId) => {
        return response.data.listSchoolWiseConfigExam
          .filter(item => item.Standard_Id === StandardId && item.SchoolWise_Test_Id === TestId)

      }
      let Array = []
      let Id = 0
      response?.data?.listSchoolWiseStandards.map((Standards, indexStandards) => {
        response.data?.listSchoolWiseTestNamE.map((Tests, indexTests) => {

          Id = Id + 1
          const StandardTest = GetStandardTest(Standards.standard_id, Tests.SchoolWise_TestId)
          if (StandardTest.length == 0) {

            Array.push({
              Id: Id,
              Name: "N/A",
              Backgoround: "Yellow",
              IsLink: false,
              fontWeight: '',
              IsConfigured: false,
              TestId: Tests.SchoolWise_TestId,
              StandardId: Standards.standard_id
            })
          } else {
            const ConfigExam = GetConfigExam(Standards.standard_id, Tests.SchoolWise_TestId)
            if (ConfigExam.length == 0) {

              Array.push({
                Id: Id,
                Name: "Not Configured",
                Backgoround: "DarkGreen",
                IsLink: true,
                fontWeight: 'bold',
                IsConfigured: false,
                TestId: Tests.SchoolWise_TestId,
                StandardId: Standards.standard_id
              })
            }
            else {
              Array.push({
                Id: Id,
                Name: ConfigExam[0].Exam_Start_Date + ' - ' + ConfigExam[0].Exam_End_Date,
                Backgoround: "LightGreen",
                IsLink: true,
                fontWeight: 'bold',
                IsConfigured: true,
                TestId: Tests.SchoolWise_TestId,
                StandardId: Standards.standard_id
              })
            }
          }
        })

      })
      console.log(Array, "Array");
      const DataList = response?.data?.listSchoolWiseStandards.map((item) => {
        return {
          Text1: item.original_standard_id,
          Text2: item.standard_id,
          Name: item.standard_name,
          school_id: item.school_id,
        };
      });

      const itemlist = response?.data?.listSchoolWiseTestNamE.map((item) => {
        return {
          text1: item.SchoolWise_TestId,
          Name: item.SchoolWise_TestName
        };
      });
      dispatch(SelectStandardExamslice.actions.RStandardRes(DataList));
      dispatch(SelectStandardExamslice.actions.RStandardwTestRes(itemlist));
      dispatch(SelectStandardExamslice.actions.ExamSchedule(Array));
    };

export default SelectStandardExamslice.reducer;


