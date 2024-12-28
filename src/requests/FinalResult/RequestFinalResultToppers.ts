import { createSlice } from '@reduxjs/toolkit';
import FinalResultToppersApiCT from 'src/api/FinalResult/ApiFinalResultToppers';
import {
  IGetClassDropdownBodyCT,
  IGetClassSubjectDropdownBodyCT,
  IGetClassToppersListBOdyCT,
  IGetClassexamDropdownBodyCT,
} from 'src/interfaces/FinalResult/IFinalResultToppers';
import { AppThunk } from 'src/store';

const FinalResultToppersSlice = createSlice({
  name: 'FinalResultToppers',

  initialState: {
    ClassDropdownListCT: [],
    ExamDropdownListCT: [],
    SubjectDropdownListCT: [],
    ClassToppersCT: [],
    SubjectToppersCT: [],


  },
  reducers: {
    classListCT(state, action) {
      state.ClassDropdownListCT = action.payload;
    },
    ExamListCT(state, action) {
      state.ExamDropdownListCT = action.payload;
    },
    SubjectListCT(state, action) {
      state.SubjectDropdownListCT = action.payload;
    },
    ToppersListCT(state, action) {
      state.ClassToppersCT = action.payload;
    },
    SubjectToppersListCT(state, action) {
      state.SubjectToppersCT = action.payload;
    },

  }
});
export const ClassdropdownListCT =
  (data: IGetClassDropdownBodyCT): AppThunk =>
    async (dispatch) => {
      const response = await FinalResultToppersApiCT.ClassDropdownCT(data);
      let abc = response.data.map((item, i) => {
        return {
          Id: item.SchoolWise_Standard_Division_Id,
          Name: item.StandardDivision,
          Value: item.SchoolWise_Standard_Division_Id
        };
      });
      dispatch(FinalResultToppersSlice.actions.classListCT(abc));
      //console.log(abc, 'abc');
    };

export const ClassExamListCT =
  (data: IGetClassexamDropdownBodyCT): AppThunk =>
    async (dispatch) => {
      const response = await FinalResultToppersApiCT.ClassExamDropdownCT(data);
      let abc = response.data.map((item, i) => {
        return {
          Id: item.SchoolWise_Test_Id,
          Name: item.SchoolWise_Test_Name,
          Value: item.SchoolWise_Test_Id
        };
      });
      dispatch(FinalResultToppersSlice.actions.ExamListCT(abc));
    };

export const ClassSubjectListCT =
  (data: IGetClassSubjectDropdownBodyCT): AppThunk =>
    async (dispatch) => {
      const response = await FinalResultToppersApiCT.ClassSubjectDropdownCT(data);
      let abc = [{ Id: '0', Name: 'All', Value: '0' }];

      response.data.map((item, i) => {
        abc.push({
          Id: item.Subject_Id,
          Name: item.Subject_Name,
          Value: item.Subject_Id
        });
      });
      dispatch(FinalResultToppersSlice.actions.SubjectListCT(abc));
    };

export const ClassTopperListCT =
  (data: IGetClassToppersListBOdyCT): AppThunk =>
    async (dispatch) => {
      const response = await FinalResultToppersApiCT.ClassToppersListCT(data);
      let abc = response.data.GetTopperList.map((item, i) => {
        return {
          Id: item.Student_Id,
          Text77: item.TopperRank,
          // localStorage.getItem('SiteURL') + item.Rank_Image.replace('~', ''),
          Text2: item.Roll_No,
          Text3: item.Student_Name,
          Text4: item.Marks,
          IsHighlightStudent: false
        };
      });
      dispatch(FinalResultToppersSlice.actions.ToppersListCT(abc));

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
              Text2: item.Student_Name,
              IsHighlightStudent: false
            });
          }
        });
        responseData.push(child);
      });
      //console.log(responseData, 'Subjects');

      dispatch(
        FinalResultToppersSlice.actions.SubjectToppersListCT(responseData)
      );
      //console.log(responseData, 'ResponseClassToppers');

    };

export default FinalResultToppersSlice.reducer;