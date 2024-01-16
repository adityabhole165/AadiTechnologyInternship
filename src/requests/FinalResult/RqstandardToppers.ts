import { createSlice } from "@reduxjs/toolkit";
import { AppThunk } from "src/store";
import { IGetStandardExamDropdownBody, IGetSubjectDropdownBody, IGetStandardToppersListBOdy, IGetStandardDropdownBody } from "src/interfaces/FinalResult/IStandardToppers";
import StandardToppersApi from "src/api/FinalResult/ApiStandardToppers";

const StandardToppersSlice = createSlice({
  name: 'FinalResultToppers',

  initialState: {
    StandardDropdown: [],
    ExamDropdownList: [],
    SubjectDropdownList: [],
    StandardToppers: [],
    StandardSubjectToppers: []

  },
  reducers: {
    StandardList(state, action) {
      state.StandardDropdown = action.payload;
    },
    ExamList(state, action) {
      state.ExamDropdownList = action.payload;
    },
    SubjectList(state, action) {
      state.SubjectDropdownList = action.payload;
    },
    ToppersList(state, action) {
      state.StandardToppers = action.payload;
    },
    SubjectToppersList(state, action) {
      state.StandardSubjectToppers = action.payload;
    }
  }
})
export const StandardDropdownList =
  (data: IGetStandardDropdownBody): AppThunk =>
    async (dispatch) => {
      const response = await StandardToppersApi.StandardDropdownList(data)

      let abc = response.data.map((item, i) => {
        return {
          Id: item.Standard_Id,
          Name: item.Standard_Name,
          Value: item.Standard_Id,
        }
      })
      dispatch(StandardToppersSlice.actions.StandardList(abc))

    };


export const StandardExamList =
  (data: IGetStandardExamDropdownBody): AppThunk =>
    async (dispatch) => {
      const response = await StandardToppersApi.StandardExamDropdown(data)
      let abc = response.data.map((item, i) => {
        return {
          Id: item.SchoolWise_Test_Id,
          Name: item.SchoolWise_Test_Name,
          Value: item.SchoolWise_Test_Id,
        }
      })
      dispatch(StandardToppersSlice.actions.ExamList(abc))
    };
export const StandardSubjectList =
  (data: IGetSubjectDropdownBody): AppThunk =>
    async (dispatch) => {
      const response = await StandardToppersApi.ClassSubjectDropdown(data)
      let abc = [{ Id: "0", Name: "All", Value: "0" }]

      response.data.map((item, i) => {
        abc.push({
          Id: item.Subject_Id,
          Name: item.Subject_Name,
          Value: item.Subject_Id,
        })
      })


      dispatch(StandardToppersSlice.actions.SubjectList(abc))
    };

export const StandardTopperList =
  (data: IGetStandardToppersListBOdy): AppThunk =>
    async (dispatch) => {
      const response = await StandardToppersApi.StandardToppersList(data)
      let abc = response.data.GetTopperList.map((item, i) => {
        return {
          Text77: localStorage.getItem("SiteURL") + item.Rank_Image.replace("~", ""),
          Text2: item.Standard,
          Text3: item.Roll_No,
          Text4: item.Student_Name,
          Text5: item.Marks
        }
      })
      dispatch(StandardToppersSlice.actions.ToppersList(abc))

      let Subjects = []
      response.data.GetSelectedSubjectTopperList.map((item, i) => {
        if (!Subjects.includes(item.Subject_Name + "#" +
          item.Rank_Image + "#" + item.Marks)) {
          Subjects.push(item.Subject_Name + "#" +
            item.Rank_Image + "#" + item.Marks)
        }
      })
      let responseData = []
      let child = null
      Subjects.map((obj) => {
        child = {
          Rank_Image: obj.split("#")[1],
          Subject: obj.split("#")[0],
          Marks: obj.split("#")[2],
          Students: []
        }
        response.data.GetSelectedSubjectTopperList.map((item, i) => {
          if (obj == item.Subject_Name + "#" +
            item.Rank_Image + "#" + item.Marks) {
            child.Students.push({
              Text1:item.Roll_No,
              Text2: item.Student_Name
            })
          }
        })
        responseData.push(child)
      })
      console.log(responseData, "Subjects")


      dispatch(StandardToppersSlice.actions.SubjectToppersList(responseData))

    };



export default StandardToppersSlice.reducer;