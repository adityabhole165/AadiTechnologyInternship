import { createSlice } from '@reduxjs/toolkit';
import ApiSubjectMarkList from 'src/api/ExamResult/ApiSubjectMarkList';
import {
  GetFirstThreeToopersBody,
  GetStudentsForSubjectMarkMouseOverBody,
  IGetTestMarkBody
} from 'src/interfaces/ExamResult/ISubjectMarkList';
import { AppThunk } from 'src/store';

const SubjectMarkListSlice = createSlice({
  name: 'SubjectMark',
  initialState: {
    listTestMark: [],
    listTestMarkNew: [],
    listTestTypeName: [],
    legend: [],
    StudentNameMouseOver: [],
    HeaderList: [],
    HeaderListTestMark: [],
    ThreeToppersList: {}

  },
  reducers: {
    GetTestMark(state, action) {
      state.listTestMark = action.payload;
    },
    GetTestMarkNew(state, action) {
      state.listTestMarkNew = action.payload;
    },
    GetHeaderListTestMark(state, action) {
      state.HeaderListTestMark = action.payload;
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
    StudentTopperslist(state, action) {
      state.ThreeToppersList = action.payload;
    },
  }

});
export const gettestmarklist =
  (data): AppThunk =>
    async (dispatch) => {
      const body1: IGetTestMarkBody = {
        asSchoolId: data.asSchoolId,
        asStandardDivision_Id: data.asStandardDivision_Id,
        asSubject_Id: data.asSubject_Id,
        asTestId: data.asTestId,
        asAcademicYearID: data.asAcademicYearID,
        asShowTotalAsPerOutOfMarks: data.asShowTotalAsPerOutOfMarks
      }
      const body2: GetStudentsForSubjectMarkMouseOverBody = {
        asSchoolId: data.asSchoolId,
        asAcademicYearId: data.asAcademicYearID,
        asStandardDivId: data.asStandardDivision_Id,
        asNoOfRecord: 15,
        asTestId: data.asTestId,
        asSubjectId: data.asSubject_Id
      }
      const response3 = await ApiSubjectMarkList.StudentNameMouseoverApi(body2);


      const getMouseOver = (RollNo) => {
        let studentName = ""
        if (response3.data.length > 0) {
          response3.data.map((Item) => {
            if (Item.length > 0) {
              Item.map((Obj) => {
                if (Obj.Roll_No == RollNo) {
                  studentName = Obj.Name
                }
              })
            }
          })
        }

        return studentName;
      }
      const response1 = await ApiSubjectMarkList.TestMarkApi(body1);
      let PrevRollNo = "0", returnObj = null, iCounter = 2
      let responseData = []
      const getMarks = (Item) => {
        if (Item.Is_Absent === "Y") {
          return "Ab";
        } else if (Item.Is_Absent === "J") {
          return "--";
        } else if (Item.Is_Absent === "E") {
          return "Ex"
        } else {
          return Item.Marks_Scored;
        }
      };

      let iCounterIndex = 0
      response1.data.listSchoolWise_Student_Test_Marks_Detail.map((item, i) => {

        if (PrevRollNo !== item.Roll_No) {

          PrevRollNo = item.Roll_No
          if (returnObj != null)
            responseData.push(returnObj)
          iCounter = 2
          returnObj = {
            Index: iCounterIndex,
            Roll_No: item.Roll_No,
            Text1: item.Roll_No,
            MoueOverText1: getMouseOver(item.Roll_No),
            Text2: getMarks(item),
            Is_Absent: 1,
            // StudentName:GetStudentName(item.Roll_No)
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

      //---- Previous list done
      let body4 = {
        asAcademicYearID: data.asAcademicYearID,
        asSchoolId: data.asSchoolId,
        asStandardDivision_Id: data.asStandardDivision_Id,
        asSubject_Id: data.asSubject_Id,
        asTestId: data.asTestId

      }
      const response4 = await ApiSubjectMarkList.StudentToppersListApi(body4);

      // dispatch(SubjectMarkListSlice.actions.StudentTopperslist(response.data));
      const getRank = (StudentId) => {
        let returnVal = "0"
        response4.data.listGetFirstTooper.map((Item) => {
          if (Item.Student_id == StudentId) {
            returnVal = "1"
          }
        })

        response4.data.listGetSecondTooper.map((Item) => {
          if (Item.Student_id == StudentId) {
            returnVal = "2"
          }
        })

        response4.data.listGetThirdTooper.map((Item) => {
          if (Item.Student_id == StudentId) {
            returnVal = "3"
          }
        })
        return returnVal
      }
      const getTheoryType = (Item) => {
        if (Item.Is_Absent === "Y") {
          return "Ab";
        } else if (Item.Is_Absent === "J") {
          return "-";
        } else if (Item.Is_Absent === "E") {
          return "Ex"
        } else {
          return null;
        }
      };
      responseData = []
      returnObj = null
      iCounterIndex = 0
      let HeaderListTestMark = []
      const getColumnArra = (value) => {
        let returnVal = []
        response1.data.listSchoolWise_Student_Test_Marks_Detail.map((item, i) => {
          if (item.Roll_No == value.Roll_No) {
            returnVal.push({
              theoryType: getTheoryType(item),
              theory: getMarks(item),
            })
          }

        })
        return returnVal
      }
      response1.data.listSchoolWise_Student_Test_Marks_Detail.map((item, i) => {
        if (!HeaderListTestMark.includes(item.TestType_Name))
          HeaderListTestMark.push(item.TestType_Name)
      })

      response1.data.listSchoolWise_Student_Test_Marks_Detail.map((item, i) => {

        if (item.TestType_Name == HeaderListTestMark[0]) {

          PrevRollNo = item.Roll_No

          iCounter = 2
          returnObj = {
            Index: iCounterIndex,
            Roll_No: item.Roll_No,
            MoueOverText1: getMouseOver(item.Roll_No),
            rollNo: item.Roll_No,
            name: item.Roll_No,
            rank: getRank(item.Student_Id),
            StudentId: item.Student_Id,
            // Marks: [{
            //   theoryType: getTheoryType(item),
            //   theory: getMarks(item),
            // }],
            Marks: getColumnArra(item),
            // theoryType: getTheoryType(item),
            // theory: getMarks(item),
            total: item.Total_Marks_Scored,
            Is_Absent: 1,
            // StudentName:GetStudentName(item.Roll_No)
          }
          responseData.push(returnObj)

          iCounterIndex++
        }

      });


      dispatch(SubjectMarkListSlice.actions.GetHeaderListTestMark(HeaderListTestMark));
      dispatch(SubjectMarkListSlice.actions.GetTestMarkNew(responseData));
      dispatch(SubjectMarkListSlice.actions.TestName(response1.data.listSchoolWise_Student_Test_Marks_Detail));
      dispatch(SubjectMarkListSlice.actions.StudentListMouseOver(response3.data));
      let responseData2 = ["R.No."]

      response1.data.listTestTypeName.map((item, i) => {
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

// export const studentmouseoverlist =
//   (data: GetStudentsForSubjectMarkMouseOverBody): AppThunk =>
//     async (dispatch) => {
//       const response = await ApiSubjectMarkList.StudentNameMouseoverApi(data);
//       dispatch(SubjectMarkListSlice.actions.StudentListMouseOver(response.data));
//     };

export const firstthreetopperslist =
  (data: GetFirstThreeToopersBody): AppThunk =>
    async (dispatch) => {
      const response = await ApiSubjectMarkList.StudentToppersListApi(data);
      dispatch(SubjectMarkListSlice.actions.StudentTopperslist(response.data));
    };








export default SubjectMarkListSlice.reducer;
