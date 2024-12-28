import { createSlice } from '@reduxjs/toolkit';
import ExamResultToppersApi from 'src/api/ExamResult/ApiExamResultToppers';
import {
  IGetClassDropdownBodyCT,
  IGetClassSubjectDropdownBodyCT,
  IGetClassToppersListBOdyCT, IGetStandardDropdownBodyST,
  IGetStandardExamDropdownBodyST,
  IGetStandardToppersListBOdyST,
  IGetSubjectDropdownBodyST,
  IGetexamDropdownBodyCT
} from 'src/interfaces/ExamResult/IExamResultToppers';
import { AppThunk } from 'src/store';


const ExamResultToppersSlice = createSlice({
  name: 'ExamResultToppers',

  initialState: {
    ClassDropdownListCT: [],
    ExamDropdownListCT: [],
    SubjectDropdownListCT: [],
    ClassToppersCT: [],
    SubjectToppersCT: [],
    StandardDropdownST: [],
    ExamDropdownListST: [],
    SubjectDropdownListST: [],
    StandardTopperST: [],
    StandardSubjectToppersST: []

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
    StandardListST(state, action) {
      state.StandardDropdownST = action.payload;
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


export const ClassdropdownListCT =
  (data: IGetClassDropdownBodyCT): AppThunk =>
    async (dispatch) => {
      const response = await ExamResultToppersApi.ClassDropdownCT(data);
      let abc = response.data.map((item, i) => {
        return {
          Id: item.SchoolWise_Standard_Division_Id,
          Name: item.StandardDivision,
          Value: item.SchoolWise_Standard_Division_Id
        };
      });
      dispatch(ExamResultToppersSlice.actions.classListCT(abc));
      //console.log(abc, 'abc');
    };
export const ClassExamListCT =
  (data: IGetexamDropdownBodyCT): AppThunk =>
    async (dispatch) => {
      const response = await ExamResultToppersApi.ClassExamDropdownCT(data);
      let abc = response.data.map((item, i) => {
        return {
          Id: item.SchoolWise_Test_Id,
          Name: item.SchoolWise_Test_Name,
          Value: item.SchoolWise_Test_Id
        };
      });
      dispatch(ExamResultToppersSlice.actions.ExamListCT(abc));
    };
export const ClassSubjectListCT =
  (data: IGetClassSubjectDropdownBodyCT): AppThunk =>
    async (dispatch) => {
      const response = await ExamResultToppersApi.ClassSubjectDropdownCT(data);
      let abc = [{ Id: '0', Name: 'All', Value: '0' }];

      response.data.map((item, i) => {
        abc.push({
          Id: item.Subject_Id,
          Name: item.Subject_Name,
          Value: item.Subject_Id
        });
      });
      dispatch(ExamResultToppersSlice.actions.SubjectListCT(abc));
    };

export const ClassTopperListCT =
  (data: IGetClassToppersListBOdyCT): AppThunk =>
    async (dispatch) => {
      const response = await ExamResultToppersApi.ClassToppersListCT(data);
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
      dispatch(ExamResultToppersSlice.actions.ToppersListCT(abc));

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

      dispatch(
        ExamResultToppersSlice.actions.SubjectToppersListCT(responseData)
      );
    };






export const StandardDropdownListST =
  (data: IGetStandardDropdownBodyST): AppThunk =>
    async (dispatch) => {
      const response = await ExamResultToppersApi.StandardDropdownListST(data);

      let abc = response.data.map((item, i) => {
        return {
          Id: item.Standard_Id,
          Name: item.Standard_Name,
          Value: item.Standard_Id
        };
      });
      dispatch(ExamResultToppersSlice.actions.StandardListST(abc));
    };

export const StandardExamListST =
  (data: IGetStandardExamDropdownBodyST): AppThunk =>
    async (dispatch) => {
      const response = await ExamResultToppersApi.StandardExamDropdownST(data);
      let abc = response.data.map((item, i) => {
        return {
          Id: item.SchoolWise_Test_Id,
          Name: item.SchoolWise_Test_Name,
          Value: item.SchoolWise_Test_Id
        };
      });
      dispatch(ExamResultToppersSlice.actions.ExamListST(abc));
    };
export const StandardSubjectListST =
  (data: IGetSubjectDropdownBodyST): AppThunk =>
    async (dispatch) => {
      const response = await ExamResultToppersApi.ClassSubjectDropdownST(data);
      //console.log(response, "pppppppppssssssssss");
      let abc = [{ Id: '0', Name: 'All', Value: '0' }];
      response.data.map((item, i) => {
        abc.push({
          Id: item.Subject_Id,
          Name: item.Subject_Name,
          Value: item.Subject_Id
        });
      });
      dispatch(ExamResultToppersSlice.actions.SubjectListST(abc));
      //console.log(abc, "ssssssssss");

    };

export const StandardTopperListST =
  (data: IGetStandardToppersListBOdyST): AppThunk =>
    async (dispatch) => {
      const response = await ExamResultToppersApi.StandardToppersListST(data);
      let abc = response.data.GetTopperList.map((item, i) => {
        return {
          Id: item.Student_Id,
          Text77: item.TopperRank,
          // localStorage.getItem('SiteURL') + item.Rank_Image.replace('~', ''),
          Text1: item.Standard,
          Text2: item.Roll_No,
          Text3: item.Student_Name,
          Text4: item.Marks,
          IsHighlightStudent: false
        };
      });
      dispatch(ExamResultToppersSlice.actions.ToppersListST(abc));

      // let xyz = response.data.GetSelectedSubjectTopperList.map((item,i) => {
      //   return{
      //     Text1:item.Roll_No,
      //     Text2:item.Student_Name
      //   }
      // })
      //   dispatch(StandardToppersSlice.actions.SubjectToppersList(xyz))
      // console.log(xyz,"xyzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz");

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

      dispatch(ExamResultToppersSlice.actions.SubjectToppersListST(responseData));
    };


export default ExamResultToppersSlice.reducer;
