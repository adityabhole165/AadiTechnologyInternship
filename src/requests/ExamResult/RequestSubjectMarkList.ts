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
      response.data.listSchoolWise_Student_Test_Marks_Detail.map((item, i) => {
        if (PrevRollNo !== item.Roll_No) {
          PrevRollNo = item.Roll_No
          if (returnObj != null)
            responseData.push(returnObj)
          iCounter = 2
          returnObj = {
            Index: i,
            Roll_No: item.Roll_No,
            Text1: item.Roll_No,
            Text2: item.Marks_Scored
          }
        }
        else {
          iCounter++
          if (iCounter == 3)
            returnObj = {
              ...returnObj, Text3: item.Marks_Scored,
              Text4: item.Total_Marks_Scored
            }
          else if (iCounter == 4)
            returnObj = {
              ...returnObj, Text4: item.Marks_Scored,
              Text5: item.Total_Marks_Scored
            }
          else if (iCounter == 5)
            returnObj = {
              ...returnObj, Text5: item.Marks_Scored,
              Text6: item.Total_Marks_Scored
            }
          else if (iCounter == 6)
            returnObj = {
              ...returnObj, Text6: item.Marks_Scored,
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

export const studentmouseoverlist =
  (data: GetStudentsForSubjectMarkMouseOverBody): AppThunk =>
    async (dispatch) => {
      const response = await ApiSubjectMarkList.StudentNameMouseoverApi(data);
      dispatch(SubjectMarkListSlice.actions.StudentListMouseOver(response.data));
    };









export default SubjectMarkListSlice.reducer;
