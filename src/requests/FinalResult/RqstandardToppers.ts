
import { createSlice } from '@reduxjs/toolkit';
import StandardToppersApiST from 'src/api/FinalResult/ApiStandardToppers';
import {
  IGetStandardDropdownBodyST,
  IGetStandardExamDropdownBodyST,
  IGetStandardToppersListBOdyST,
  IGetSubjectDropdownBodyST
} from 'src/interfaces/FinalResult/IStandardToppers';
import { AppThunk } from 'src/store';

const StandardToppersSlice = createSlice({
  name: 'FinalResultToppers',

  initialState: {
    StandardDropdownListST: [],
    ExamDropdownListST: [],
    SubjectDropdownListST: [],
    StandardTopperST: [],
    StandardSubjectToppersST: [],
    StandardSubjectToppersST1: []
  },
  reducers: {
    StandardListST(state, action) {
      state.StandardDropdownListST = action.payload;
    },
    ExamListST(state, action) {
      state.ExamDropdownListST = action.payload;
    },
    SubjectListST(state, action) {
      state.SubjectDropdownListST = action.payload;
    },
    ToppersListST(state, action) {
      state.StandardTopperST = action.payload;
    },
    SubjectToppersListST(state, action) {
      state.StandardSubjectToppersST = action.payload;
    }
  }
});
export const StandardDropdownListST =
  (data: IGetStandardDropdownBodyST): AppThunk =>
    async (dispatch) => {
      const response = await StandardToppersApiST.StandardDropdownST(data);

      let getStandard = response.data.map((item, i) => {
        return {
          Id: item.Standard_Id,
          Name: item.Standard_Name,
          Value: item.Standard_Id
        };
      });
      dispatch(StandardToppersSlice.actions.StandardListST(getStandard));
      //console.log(getStandard, 'Standards');
    };

export const StandardExamListST =
  (data: IGetStandardExamDropdownBodyST): AppThunk =>
    async (dispatch) => {
      const response = await StandardToppersApiST.StandardExamDropdownST(data);
      let getStandardExam = response.data.map((item, i) => {
        return {
          Id: item.SchoolWise_Test_Id,
          Name: item.SchoolWise_Test_Name,
          Value: item.SchoolWise_Test_Id
        };
      });
      dispatch(StandardToppersSlice.actions.ExamListST(getStandardExam));
      //console.log(getStandardExam, 'Standards');
    };

export const StandardSubjectListST =
  (data: IGetSubjectDropdownBodyST): AppThunk =>
    async (dispatch) => {
      const response = await StandardToppersApiST.ClassSubjectDropdownST(data);
      let abc = [{ Id: '0', Name: 'All', Value: '0' }];
      response.data.map((item, i) => {
        abc.push({
          Id: item.Subject_Id,
          Name: item.Subject_Name,
          Value: item.Subject_Id
        });
      });
      dispatch(StandardToppersSlice.actions.SubjectListST(abc));
    };

export const StandardTopperListST =
  (data: IGetStandardToppersListBOdyST): AppThunk =>
    async (dispatch) => {
      const response = await StandardToppersApiST.StandardToppersListST(data);
      //console.log(response, 'responseeeeee');

      let abc = response.data.GetTopperList.map((item, i) => {
        return {
          Id: item.Student_Id,
          Text77: item.TopperRank,
          // localStorage.getItem('SiteURL') + item.Rank_Image.replace('~', ''),
          Text6: item.Standard,
          Text2: item.Roll_No,
          Text3: item.Student_Name,
          Text5: item.Marks,
          IsHighlightStudent: false
        };
      });
      dispatch(StandardToppersSlice.actions.ToppersListST(abc));


      let Subjects = [];
      response.data.GetSelectedSubjectTopperList.map((item, i) => {
        if (
          !Subjects.includes(
            item.Subject_Name + '#' + item.Rank_Image + '#' + item.Marks
          )
        ) {
          Subjects.push(
            item.Subject_Name + '#' + item.Rank_Image + '#' + item.Marks
          );
        }
      });
      let responseData = [];
      let child = null;
      Subjects.map((obj) => {
        child = {
          Rank_Image: obj.split('#')[1],
          Subject: obj.split('#')[0],
          Marks: obj.split('#')[2],
          Students: []
        };
        response.data.GetSelectedSubjectTopperList.map((item, i) => {
          if (
            obj ==
            item.Subject_Name + '#' + item.Rank_Image + '#' + item.Marks
          ) {
            child.Students.push({
              Id: item.Student_Id,
              Text1: item.Roll_No,
              Text3: item.Standard,
              Text2: item.Student_Name,
              IsHighlightStudent: false
            });
          }
        });
        responseData.push(child);
      });
      //console.log(responseData, 'Subjects');

      dispatch(StandardToppersSlice.actions.SubjectToppersListST(responseData));
      //console.log(responseData, 'responseData');
    };



export default StandardToppersSlice.reducer;
