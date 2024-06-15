import { createSlice } from '@reduxjs/toolkit';
import ToppersApi from 'src/api/ExamResult/ApiToppers';
import { IGetClassDivandStandardDropdownBody, IGetClassandStandardToppersListBody, IGetLatestExamIdandDropdownBody, IGetSubjectDropdownBody } from 'src/interfaces/ExamResult/IToppers';

import { AppThunk } from 'src/store';


const ToppersSlice = createSlice({
    name: 'Toppers',

    initialState: {
        ClassDropdownList: [],
        StandardDropdownList: [],
        ExamDropdownListCT: [],
        ExamDropdownListST: [],
        SubjectDropdownListCT: [],
        SubjectDropdownListST: [],
        ClassToppersList: [],
        ClassSubjectToppersList: [],
        StandardToppersList: [],
        StandardSubjectToppersList: []
    },
    reducers: {
        classList(state, action) {
            state.ClassDropdownList = action.payload;
        },
        standardList(state, action) {
            state.StandardDropdownList = action.payload;
        },
        ClassExamListCT(state, action) {
            state.ExamDropdownListCT = action.payload;
        },
        StandardExamListST(state, action) {
            state.ExamDropdownListST = action.payload;
        },
        ClassSubjectListCT(state, action) {
            state.SubjectDropdownListCT = action.payload;
        },
        StandardSubjectListST(state, action) {
            state.SubjectDropdownListST = action.payload;
        },
        ClassToppersListCT(state, action) {
            state.ClassToppersList = action.payload;
        },
        ClassSubjectToppersListCT(state, action) {
            state.ClassSubjectToppersList = action.payload
        },
        StandardToppersListST(state, action) {
            state.StandardToppersList = action.payload;
        },
        StandardSubjectToppersListST(state, action) {
            state.StandardSubjectToppersList = action.payload
        }
    }
});

export const ClassdropdownListCT =
    (data: IGetClassDivandStandardDropdownBody): AppThunk =>
        async (dispatch) => {
            const response = await ToppersApi.ClassandStandardDropdown(data);
            let abc = response.data.map((item, i) => {
                return {
                    Id: item.SchoolWise_Standard_Division_Id,
                    Name: item.StandardDivision,
                    Value: item.SchoolWise_Standard_Division_Id
                };
            });
            dispatch(ToppersSlice.actions.classList(abc));
            console.log(abc, 'abc');
        };

export const StandarddropdownListST =
    (data: IGetClassDivandStandardDropdownBody): AppThunk =>
        async (dispatch) => {
            const response = await ToppersApi.ClassandStandardDropdown(data);
            let Standard = response.data.map((item, i) => {
                return {
                    Id: item.Standard_Id,
                    Name: item.Standard_Name,
                    Value: item.Standard_Id
                };
            });
            dispatch(ToppersSlice.actions.standardList(Standard));
            console.log(Standard, 'Standard');
        };

export const ClassExamdropdownListCT =
    (data: IGetLatestExamIdandDropdownBody): AppThunk =>
        async (dispatch) => {
            const response = await ToppersApi.ClassandStandardExamDropdown(data);
            let classExam = response.data.map((item, i) => {
                return {
                    Id: item.SchoolWise_Test_Id,
                    Name: item.SchoolWise_Test_Name,
                    Value: item.SchoolWise_Test_Id
                };
            });
            dispatch(ToppersSlice.actions.ClassExamListCT(classExam));
            console.log(classExam, 'classExam');
        };

export const StandardExamdropdownListST =
    (data: IGetLatestExamIdandDropdownBody): AppThunk =>
        async (dispatch) => {
            const response = await ToppersApi.ClassandStandardExamDropdown(data);
            let StandardExam = response.data.map((item, i) => {
                return {
                    Id: item.SchoolWise_Test_Id,
                    Name: item.SchoolWise_Test_Name,
                    Value: item.SchoolWise_Test_Id
                };
            });
            dispatch(ToppersSlice.actions.StandardExamListST(StandardExam));
            console.log(StandardExam, 'StandardExam');
        };

export const ClassSubjectdropdownListCT =
    (data: IGetSubjectDropdownBody): AppThunk =>
        async (dispatch) => {
            const response = await ToppersApi.ClassandStandardSubjectDropdown(data);
            let ClassSubject = [{ Id: '0', Name: 'All', Value: '0' }];

            response.data.map((item, i) => {
                ClassSubject.push({
                    Id: item.Subject_Id,
                    Name: item.Subject_Name,
                    Value: item.Subject_Id
                });
            });
            dispatch(ToppersSlice.actions.ClassSubjectListCT(ClassSubject));
            console.log(ClassSubject, 'StandardSubject');
        };

export const StandardSubjectdropdownListST =
    (data: IGetSubjectDropdownBody): AppThunk =>
        async (dispatch) => {
            const response = await ToppersApi.ClassandStandardSubjectDropdown(data);
            let StandardSubject = [{ Id: '0', Name: 'All', Value: '0' }];
            response.data.map((item, i) => {
                StandardSubject.push({
                    Id: item.Subject_Id,
                    Name: item.Subject_Name,
                    Value: item.Subject_Id
                });
            });
            dispatch(ToppersSlice.actions.StandardSubjectListST(StandardSubject));
            console.log(StandardSubject, 'StandardSubject');
        };

export const ClassToppersList =
    (data: IGetClassandStandardToppersListBody): AppThunk =>
        async (dispatch) => {
            const response = await ToppersApi.ClassandStandardToppersList(data);
            let classToppers = response.data.GetTopperList.map((item, i) => {
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
            dispatch(ToppersSlice.actions.ClassToppersListCT(classToppers));

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
            console.log(responseData, 'Subjects');

            dispatch(
                ToppersSlice.actions.ClassSubjectToppersListCT(responseData)
            );
        };


export const StandardToppersList =
    (data: IGetClassandStandardToppersListBody): AppThunk =>
        async (dispatch) => {
            const response = await ToppersApi.ClassandStandardToppersList(data);
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
            dispatch(ToppersSlice.actions.StandardToppersListST(abc));

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
            console.log(responseData, 'Subjects');

            dispatch(
                ToppersSlice.actions.StandardSubjectToppersListST(responseData)
            );
        };

export default ToppersSlice.reducer;
