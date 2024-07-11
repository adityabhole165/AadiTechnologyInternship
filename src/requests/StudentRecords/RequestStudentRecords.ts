import { createSlice } from '@reduxjs/toolkit';
import StudentRecordsApi from 'src/api/StudentRecords/ApiStudentRecords';
import {
  IGetAllStudentStatusBody,
  IGetTeacherListBody
} from 'src/interfaces/StudentRecords/IStudentRecords';
import { AppThunk } from 'src/store';

const StudentRecordsSlice = createSlice({
  name: 'StudentRecords',
  initialState: {
    ClassTeachers: [],
    StudentStatus: [],
    GetAssociatedTeacher: []
  },
  reducers: {
    TeacherList(state, action) {
      state.ClassTeachers = action.payload;
    },
    GetAssociatedTeacherList(state, action) {
      state.GetAssociatedTeacher = action.payload;
    },
    GetStudentStatus(state, action) {
      state.StudentStatus = action.payload;
    }
  }
});
export const GetTeachersList =
  (data: IGetTeacherListBody): AppThunk =>
    async (dispatch) => {
      const response = await StudentRecordsApi.ClassTeacherList(data);
      let abc = [{ Id: '0', Name: 'All', Value: '0' }];
      // let abc = response.data.listGetClass_Teachers.map((item, i) => {
      response.data.listGetClass_Teachers.map((item, i) => {
        abc.push({
          Id: item.StdDivId,
          Name: item.TeacherName,
          Value: item.StdDivId
        });
      });
      dispatch(StudentRecordsSlice.actions.TeacherList(abc));
      dispatch(StudentRecordsSlice.actions.GetAssociatedTeacherList(response.data.listGetAssociatedTeacher))
    };
// export const GetAllStudentStatuss =
//   (data: IGetAllStudentStatusBody): AppThunk =>
//     async (dispatch) => {
//       const response = await StudentRecordsApi.AllStudentStatus(data);
//       const getActionForMe = (item) => {
//         let returnVal = "-";
//         if (item.ReadyToReadCount > 0 && item.ReadyToSubmitCount > 0)
//           returnVal = "Unread : " + item.ReadyToReadCount + " & Unsubmitted : " + item.ReadyToSubmitCount;
//         else if (item.ReadyToReadCount > 0 && item.ReadyToSubmitCount == 0)
//           returnVal = "Unread : " + item.ReadyToReadCount;
//         else if (item.ReadyToReadCount == 0 && item.ReadyToSubmitCount > 0)
//           returnVal = "Unsubmitted : " + item.ReadyToSubmitCount;
//         return returnVal;
//       }
//       // lblAction.Text = sMessage;
//       let StudentList = response.data.map((item) => {
//         return {
//           Id: item.SchoolWiseStudentId,
//           Text1: item.RegNo,
//           Text2: item.RollNo,
//           Text3: item.Class,
//           Text4: item.Name,
//           Text5: getActionForMe(item),
//           // item.ReadyToSubmitCount == 0
//           //   ? ''
//           //   : 'Unsubmitted :' + item.ReadyToSubmitCount.toString(),
//           ReadyToReadCount: item.ReadyToReadCount,
//           TotalRows: item.TotalRows,
//           IsRecordFound: item.IsRecordFound
//         };
//       });
//       dispatch(StudentRecordsSlice.actions.GetStudentStatus(StudentList));
//     };

export const GetAllStudentStatuss =
  (data: IGetAllStudentStatusBody): AppThunk =>
    async (dispatch) => {
      try {
        const response = await StudentRecordsApi.AllStudentStatus(data);

        if (!response.data) {
          console.error("Response data is null or undefined");
          dispatch(StudentRecordsSlice.actions.GetStudentStatus([]));
          return;
        }

        const getActionForMe = (item) => {
          let returnVal = "-";
          if (item.ReadyToReadCount > 0 && item.ReadyToSubmitCount > 0)
            returnVal = "Unread : " + item.ReadyToReadCount + " & Unsubmitted : " + item.ReadyToSubmitCount;
          else if (item.ReadyToReadCount > 0 && item.ReadyToSubmitCount == 0)
            returnVal = "Unread : " + item.ReadyToReadCount;
          else if (item.ReadyToReadCount == 0 && item.ReadyToSubmitCount > 0)
            returnVal = "Unsubmitted : " + item.ReadyToSubmitCount;
          return returnVal;
        }

        let StudentList = response.data.map((item) => {
          return {
            Id: item.SchoolWiseStudentId,
            Text1: item.RegNo,
            Text2: item.RollNo,
            Text3: item.Class,
            Text4: item.Name,
            Text5: getActionForMe(item),
            ReadyToReadCount: item.ReadyToReadCount,
            TotalRows: item.TotalRows,
            IsRecordFound: item.IsRecordFound
          };
        });

        dispatch(StudentRecordsSlice.actions.GetStudentStatus(StudentList));
      } catch (error) {
        console.error("Error fetching student statuses:", error);
        dispatch(StudentRecordsSlice.actions.GetStudentStatus([]));
      }
    };

export default StudentRecordsSlice.reducer;
