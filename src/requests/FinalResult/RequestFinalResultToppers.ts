import { createSlice } from "@reduxjs/toolkit";
import { AppThunk } from "src/store";
import { IGetClassDropdownBody, IGetexamDropdownBody, IGetClassSubjectDropdownBody, IGetClassToppersListBOdy } from "src/interfaces/FinalResult/IFinalResultToppers";
import FinalResultToppersApi from "src/api/FinalResult/ApiFinalResultToppers";

const FinalResultToppersSlice = createSlice({
  name: 'FinalResultToppers',

  initialState: {
    ClassDropdownList: [],
    ExamDropdownList: [],
    SubjectDropdownList: [],
    ClassToppers: [],
    SubjectToppers: []
  },
  reducers: {
    classList(state, action) {
      state.ClassDropdownList = action.payload;
    },
    ExamList(state, action) {
      state.ExamDropdownList = action.payload;
    },
    SubjectList(state, action) {
      state.SubjectDropdownList = action.payload;
    },
    ToppersList(state, action) {
      state.ClassToppers = action.payload;
    },
    SubjectToppersList(state, action) {
      state.SubjectToppers = action.payload;
    }
  }
})
export const ClassdropdownList =
  (data: IGetClassDropdownBody): AppThunk =>
    async (dispatch) => {
      const response = await FinalResultToppersApi.ClassDropdown(data)
      let abc = response.data.map((item, i) => {
        return {
          Id: item.SchoolWise_Standard_Division_Id,
          Name: item.StandardDivision,
          Value: item.SchoolWise_Standard_Division_Id,
        }
      })
      dispatch(FinalResultToppersSlice.actions.classList(abc))
      console.log(abc, "abc");

    };
export const ClassExamList =
  (data: IGetexamDropdownBody): AppThunk =>
    async (dispatch) => {
      const response = await FinalResultToppersApi.ClassExamDropdown(data)
      let abc = response.data.map((item, i) => {
        return {
          Id: item.SchoolWise_Test_Id,
          Name: item.SchoolWise_Test_Name,
          Value: item.SchoolWise_Test_Id,
        }
      })
      dispatch(FinalResultToppersSlice.actions.ExamList(abc))
    };
export const ClassSubjectList =
  (data: IGetClassSubjectDropdownBody): AppThunk =>
    async (dispatch) => {
      const response = await FinalResultToppersApi.ClassSubjectDropdown(data)
      let abc = [{Id:"0", Name:"All", Value:"0"}]
      
      response.data.map((item, i) => {
        abc.push({
          Id: item.Subject_Id,
          Name: item.Subject_Name,
          Value: item.Subject_Id,
        })
      })
      dispatch(FinalResultToppersSlice.actions.SubjectList(abc))
    };
export const ClassTopperList =
  (data: IGetClassToppersListBOdy): AppThunk =>
    async (dispatch) => {
      const response = await FinalResultToppersApi.ClassToppersList(data)
      let abc = response.data.GetTopperList.map((item, i) => {
        return {
          Text77: localStorage.getItem("SiteURL") + item.Rank_Image.replace("~", ""),
          Text2: item.Roll_No,
          Text3: item.Student_Name,
          Text4: item.Marks
        }
      })
      dispatch(FinalResultToppersSlice.actions.ToppersList(abc))



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


      dispatch(FinalResultToppersSlice.actions.SubjectToppersList(responseData))


    };


export default FinalResultToppersSlice.reducer