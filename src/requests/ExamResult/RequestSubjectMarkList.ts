import { createSlice } from '@reduxjs/toolkit';
import ApiSubjectMarkList from 'src/api/ExamResult/ApiSubjectMarkList';
import {
  GetStudentsForSubjectMarkMouseOverBody,
  IGetTestMarkBody
} from 'src/interfaces/ExamResult/ISubjectMarkList';
import { AppThunk } from 'src/store';

const SubjectMarkListSlice = createSlice({
  name: 'SubjectMark',
  initialState: {
    listTestMark: [],
    listTestTypeName: [],
    legend: [],
    StudentNameMouseOver: [],
    HeaderList: []

  },
  reducers: {
    GetTestMark(state, action) {
      state.listTestMark = action.payload;
    },
    GetHeaderList(state, action) {
      state.HeaderList = action.payload;
    },
    TestName(state, action) {
      state.listTestTypeName = action.payload;
    },
    ListLegend(state, action) {
      state.legend = action.payload;
    },
    StudentListMouseOver(state, action) {
      state.StudentNameMouseOver = action.payload;
    },
  }
});
export const gettestmarklist =
  (data: IGetTestMarkBody): AppThunk =>
    async (dispatch) => {
      const response = await ApiSubjectMarkList.TestMarkApi(data);
      let PrevRollNo = "0", returnObj = null, iCounter = 2
      let responseData = []
      const getMarks = (Item) => {
        if (Item.Is_Absent == "Y") {
          return "Ab"
        }
        else {
          return Item.Marks_Scored
        }
      }
      let iCounterIndex = 0
      response.data.listSchoolWise_Student_Test_Marks_Detail.map((item, i) => {
        if (PrevRollNo !== item.Roll_No) {

          PrevRollNo = item.Roll_No
          if (returnObj != null)
            responseData.push(returnObj)
          iCounter = 2
          returnObj = {
            Index: iCounterIndex,
            Roll_No: item.Roll_No,
            Text1: item.Roll_No,
            Text2: getMarks(item),
            HighlightType: 1
          }
          iCounterIndex++
        }
        else {
          iCounter++
          if (iCounter == 3)
            returnObj = {
              ...returnObj, Text3: getMarks(item),
              Text4: item.Total_Marks_Scored
            }
          else if (iCounter == 4)
            returnObj = {
              ...returnObj, Text4: getMarks(item),
              Text5: item.Total_Marks_Scored
            }
          else if (iCounter == 5)
            returnObj = {
              ...returnObj, Text5: getMarks(item),
              Text6: item.Total_Marks_Scored
            }
          else if (iCounter == 6)
            returnObj = {
              ...returnObj, Text6: getMarks(item),
              Text7: item.Total_Marks_Scored
            }
        }

      });

      dispatch(SubjectMarkListSlice.actions.GetTestMark(responseData));
      let responseData2 = ["R.No."]

      response.data.listTestTypeName.map((item, i) => {
        responseData2.push(item.TestType_Name)
      })
      responseData2.push("Total")

      dispatch(SubjectMarkListSlice.actions.GetHeaderList(responseData2));

    };
export const legend =
  (data: IGetTestMarkBody): AppThunk =>
    async (dispatch) => {
      const response = await ApiSubjectMarkList.TestMarkApi(data);
      dispatch(SubjectMarkListSlice.actions.ListLegend(response.data));

    };






export const studentmouseoverlist =
  (data: GetStudentsForSubjectMarkMouseOverBody): AppThunk =>
    async (dispatch) => {
      const response = await ApiSubjectMarkList.StudentNameMouseoverApi(data);
      dispatch(SubjectMarkListSlice.actions.StudentListMouseOver(response.data));
    };









export default SubjectMarkListSlice.reducer;
