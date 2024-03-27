import { createSlice } from '@reduxjs/toolkit';
import ExamResultToppersApi from 'src/api/ExamResult/ApiExamResultToppers';
import {
    IGetClassExamDropDownBodyCT,
    IGetClassNameDropDownBodyCT,
    IGetClassSubjectDropdownBodyCT
} from 'src/interfaces/ExamResult/IExamResultToppers';
import { AppThunk } from 'src/store';

const ExamResultToppersSlice = createSlice({
    name: 'ExamResultToppers',

    initialState: {
        ClassSubjectCT: [],
        ClassExamCT: [],
        ClassNamelistCT: []
    },
    reducers: {
        SubjectListCT(state, action) {
            state.ClassSubjectCT = action.payload;
        },
        ExamListCT(state, action) {
            state.ClassExamCT = action.payload;
        },
        ClassNameCT(state, action) {
            state.ClassNamelistCT = action.payload;
        },
        // SubjectListCT(state, action) {
        //   state.SubjectDropdownListCT = action.payload;
        // },
        // ToppersListCT(state, action) {
        //   state.ClassToppersCT = action.payload;
        // },
        // SubjectToppersListCT(state, action) {
        //   state.SubjectToppersCT = action.payload;
        // }
    }
});


export const ClassSubjectListDropdownCT =
    (data: IGetClassSubjectDropdownBodyCT): AppThunk =>
        async (dispatch) => {
            const response = await ExamResultToppersApi.ClassSubjectDropDownCT(data);
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
export const ClassExamListCT =
    (data: IGetClassExamDropDownBodyCT): AppThunk =>
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
export const ClassNameListCT =
    (data: IGetClassNameDropDownBodyCT): AppThunk =>
        async (dispatch) => {
            const response = await ExamResultToppersApi.ClassNameDropdownCT(data);
            let abc = response.data.map((item, i) => {
                return {
                    Id: item.SchoolWise_Standard_Division_Id,
                    Name: item.StandardDivision,
                    Value: item.SchoolWise_Standard_Division_Id
                };
            });
            dispatch(ExamResultToppersSlice.actions.ClassNameCT(abc));
        };
// export const ClassTopperListCT =
//   (data: IGetClassToppersListBOdyCT): AppThunk =>
//   async (dispatch) => {
//     const response = await FinalResultToppersApiCT.ClassToppersListCT(data);
//     let abc = response.data.GetTopperList.map((item, i) => {
//       return {
//         Text77:
//           localStorage.getItem('SiteURL') + item.Rank_Image.replace('~', ''),
//         Text2: item.Roll_No,
//         Text3: item.Student_Name,
//         Text4: item.Marks
//       };
//     });
//     dispatch(FinalResultToppersSlice.actions.ToppersListCT(abc));

//     let Subjects = [];
//     response.data.GetSelectedSubjectTopperList.map((item, i) => {
//       if (
//         !Subjects.includes(
//           item.Subject_Name + '#' + item.Rank_Image + '#' + item.Marks
//         )
//       ) {
//         Subjects.push(
//           item.Subject_Name + '#' + item.Rank_Image + '#' + item.Marks
//         );
//       }
//     });
//     let responseData = [];
//     let child = null;
//     Subjects.map((obj) => {
//       child = {
//         Rank_Image: obj.split('#')[1],
//         Subject: obj.split('#')[0],
//         Marks: obj.split('#')[2],
//         Students: []
//       };
//       response.data.GetSelectedSubjectTopperList.map((item, i) => {
//         if (
//           obj ==
//           item.Subject_Name + '#' + item.Rank_Image + '#' + item.Marks
//         ) {
//           child.Students.push({
//             Text1: item.Roll_No,
//             Text2: item.Student_Name
//           });
//         }
//       });
//       responseData.push(child);
//     });
//     console.log(responseData, 'Subjects');

//     dispatch(
//       FinalResultToppersSlice.actions.SubjectToppersListCT(responseData)
//     );
//   };

export default ExamResultToppersSlice.reducer;
