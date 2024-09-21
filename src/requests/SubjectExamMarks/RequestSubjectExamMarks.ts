import { createSlice } from '@reduxjs/toolkit';
import SubjectExamMarksApi from 'src/api/SubjectExamMarks/ApiSubjectExamMarks';
import { getDateMonthYearFormattedDash, getYearFirstDateDashFormatted, isGreaterThanDate } from 'src/components/Common/Util';
import {
    IGetAllGradesForSubjectMarkListBody,
    IGetAllStudentsForMarksAssignmentsBody,
    IGetClassExamSubjectNameDetailesBody,
    IGetExamScheduleBody,
    IGetSubjectExamMarkslistsBody,
    IManageStudentsTestMarkBody
} from 'src/interfaces/SubjectExamMarks/ISubjectExamMarks';
import { AppThunk } from 'src/store';
const SubjectExamMarksslice = createSlice({
    name: 'Subject Exam Marks',
    initialState: {
        StudentsForMarksAssignments: [],
        ClassExamSubjectNameDetailesBody: null,
        StandardName: null,
        SubjectName: "",
        SchoolWiseTestName: null,
        GradesForSubjectMarkList: [],
        SubjectExamMarkslists: null,
        ExamMarkHeader: null,
        ListStudentTestMarkDetails: [],
        ListDisplayNameDetail: [],
        ListFailCreatiaDetails: [],
        ListYearwiseStudentId: [],
        ManageStudentsTestMark: '',
        ExamSchedule: [],
        Loading: true
    },
    reducers: {
        GetAllStudentsForMarksAssignment(state, action) {
            state.Loading = false;
            state.StudentsForMarksAssignments = action.payload;
        },
        GetExamSchedule(state, action) {
            state.Loading = false;
            state.ExamSchedule = action.payload;
        },

        GetClassExamSubjectNameDetail(state, action) {
            state.Loading = false;
            state.ClassExamSubjectNameDetailesBody = action.payload;
            state.StandardName = action.payload.GetStandardName;
            state.SubjectName = action.payload.SubjectName;
            state.SchoolWiseTestName = action.payload.GetSchoolWiseTestName;
        },
        GetAllGradesForSubjectMarkList(state, action) {
            state.Loading = false;
            state.GradesForSubjectMarkList = action.payload;
        },

        GetSubjectExamMarkslist(state, action) {
            state.Loading = false;
            state.SubjectExamMarkslists = action.payload;

            state.ListStudentTestMarkDetails = action.payload.listStudentTestMarkDetails;

            state.ListFailCreatiaDetails = action.payload.listFailCreatiaDetails;
            state.ListYearwiseStudentId = action.payload.listYearwiseStudentId;

        },
        GetExamMarkHeader(state, action) {
            state.Loading = false;
            state.ExamMarkHeader = action.payload;
        },
        GetListDisplayNameDetail(state, action) {
            state.Loading = false;
            state.ListDisplayNameDetail = action.payload;
        },
        GetManageStudentsTestMark(state, action) {
            state.Loading = false;
            state.ManageStudentsTestMark = action.payload;
        },
        resetManageStudentsTestMark(state) {
            state.Loading = false;
            state.ManageStudentsTestMark = "";
        },
        getLoading(state, action) {
            state.Loading = true;

        },

    }
});



export const getClassExamSubjectNameDetailes =
    (data: IGetClassExamSubjectNameDetailesBody): AppThunk =>
        async (dispatch) => {
            dispatch(SubjectExamMarksslice.actions.getLoading(true));
            const response = await SubjectExamMarksApi.GetClassExamSubjectNameDetailes(data);
            dispatch(SubjectExamMarksslice.actions.GetClassExamSubjectNameDetail(response.data));

        };



export const resetManageStudentsTestMark =
    (): AppThunk =>
        async (dispatch) => {
            dispatch(SubjectExamMarksslice.actions.resetManageStudentsTestMark());// Dispatching action to reset the message
        };
export const getExamSchedule =
    (data: IGetExamScheduleBody): AppThunk =>
        async (dispatch) => {
            dispatch(SubjectExamMarksslice.actions.getLoading(true));
            const response = await SubjectExamMarksApi.GetExamScheduleApi(data);
            dispatch(SubjectExamMarksslice.actions.GetExamSchedule(response.data));

        };

export const getAllGradesForSubjectMarkList =
    (data: IGetAllGradesForSubjectMarkListBody): AppThunk =>
        async (dispatch) => {
            dispatch(SubjectExamMarksslice.actions.getLoading(true));
            const response = await SubjectExamMarksApi.GetAllGradesForSubjectMarkList(data);
            let responseData3 = [{ Id: '0', Name: 'Select', Value: '0' }];
            response.data.map((Item, i) => {
                responseData3.push({
                    ...Item,
                    Id: Item.Marks_Grades_Configuration_Detail_ID,
                    Name: Item.Grade_Name,
                    Value: Item.Marks_Grades_Configuration_Detail_ID
                });
            });
            dispatch(SubjectExamMarksslice.actions.GetAllGradesForSubjectMarkList(responseData3));

        };
//For RollNo,StudentName
// export const getAllStudentsForMarksAssignments =
// (data: IGetAllStudentsForMarksAssignmentsBody): AppThunk =>
//     async (dispatch) => {
//         dispatch(SubjectExamMarksslice.actions.getLoading(true));
//         const response = await SubjectExamMarksApi.GetAllStudentsForMarksAssignments(data);
//         dispatch(SubjectExamMarksslice.actions.GetAllStudentsForMarksAssignment(response.data));
//         console.log(response, "abc")
//     };

//HeaderList,ItemList,Dropdown Status
// export const getSubjectExamMarkslists =
//     (data: IGetSubjectExamMarkslistsBody): AppThunk =>
//         async (dispatch) => {
//             dispatch(SubjectExamMarksslice.actions.getLoading(true));
//             const response = await SubjectExamMarksApi.GetSubjectExamMarkslists(data);
//             dispatch(SubjectExamMarksslice.actions.GetSubjectExamMarkslist(response.data));
//             console.log(response, "response")
//         };





export const getSubjectExamMarkslist =
    (data): AppThunk =>
        async (dispatch) => {
            dispatch(SubjectExamMarksslice.actions.getLoading(true));
            const body2: IGetSubjectExamMarkslistsBody = {
                asSchoolId: data.asSchoolId,
                asStandardDivision_Id: data.asStandardDivision_Id,
                asSubjectId: data.asSubjectId,
                asTestId: data.asTestId,
                asAcademicYrId: data.asAcademicYrId,
                asShowTotalAsPerOutOfMarks: data.asShowTotalAsPerOutOfMarks
            }
            const body3: IGetAllGradesForSubjectMarkListBody = {
                asSchoolId: data.asSchoolId,
                asAcademicYrId: data.asAcademicYrId,
                asStandardId: data.asStandardId,
                asSubjectId: data.asSubjectId,
                asTestId: data.asTestId
            }
            const response2 = await SubjectExamMarksApi.GetSubjectExamMarkslists(body2);

            let body1: IGetAllStudentsForMarksAssignmentsBody = {
                asAcademicYearID: data.asAcademicYrId,
                asSchoolId: data.asSchoolId,
                asSubject_Id: data.asSubjectId,
                asStandardDivision_Id: data.asStandardDivision_Id,
                asTestDate: data.asTestDate
            }
            // console.log(body1, "body1", response2.data);
            let TestDate = data.asTestDate
            if (response2.data.listStudentTestMarkDetails.length > 0) {
                TestDate: response2.data.listStudentTestMarkDetails[0].Test_Date
                body1 = {
                    ...body1,
                    asTestDate: response2.data.listStudentTestMarkDetails[0].Test_Date
                }
            }
            TestDate = TestDate == undefined ? getYearFirstDateDashFormatted(data.asTestDate) : getYearFirstDateDashFormatted(TestDate)


            const response1 = await SubjectExamMarksApi.GetAllStudentsForMarksAssignments(body1);
            let reponseData1 = [];
            const getMarksForStudentBlank = (StudentIdParam, JoiningDate) => {
                let arr = [];
                let IsLateJoinee = isGreaterThanDate(getDateMonthYearFormattedDash(JoiningDate), TestDate)
                let StudentId = "0"
                response2.data.listTestDetailss.map((Item, i) => {

                    arr.push({
                        Id: Item.TestType_Id,
                        Text1: "",
                        Text2: Item.TestType_Total_Marks,
                        ExamStatus: IsLateJoinee ? "J" : "N",
                        ExamGrade: "0",
                        IsActive: true,
                        IsActiveGrade: true,
                        ErrorMessage: "",
                        Student_Id: StudentIdParam,
                        JoiningDate: JoiningDate,
                        IsLateJoinee: IsLateJoinee,
                        AllowMarksEntryForLateJoin: response2.data.AllowMarksEntryForLateJoin,
                        IsAbsent: "N",
                        TestTypeTotalMarks: Number(Item.TestType_Total_Marks),
                        TestTypeOutOfMarks: Number(Item.TestTypeOutOfMarks),
                        TestOutOfMarks: Item.TestOutOfMarks,
                    });
                });
                if (arr.length == 0) {
                    arr.push({
                        Id: "0",
                        Text1: "",
                        Text2: "",
                        ExamStatus: IsLateJoinee ? "J" : "N",
                        ExamGrade: "0",
                        IsActive: true,
                        IsActiveGrade: true,
                        ErrorMessage: "",
                        Student_Id: StudentIdParam,
                        JoiningDate: JoiningDate,
                        IsLateJoinee: IsLateJoinee,
                        AllowMarksEntryForLateJoin: response2.data.AllowMarksEntryForLateJoin,
                        IsAbsent: "N",
                        TestTypeTotalMarks: "",
                        TestTypeOutOfMarks: "",
                        TestOutOfMarks: "",
                    });
                }
                return arr
            }
            const getMarksForStudent = (StudentId, JoiningDate) => {
                let arr = getMarksForStudentBlank(StudentId, JoiningDate);

                let tempArr = []
                arr = arr.map((Obj) => {
                    tempArr = response2.data.listStudentTestMarkDetails
                        .filter((item) => {
                            return item.Student_Id == StudentId &&
                                item.TestType_Id == Obj.Id
                        })
                    return tempArr.length > 0 ?
                        {
                            ...Obj,
                            Id: tempArr[0].TestType_Id,
                            Text1: tempArr[0].Is_Absent != "N" ? "" : tempArr[0].Marks_Scored.toString(),
                            Text2: tempArr[0].TestType_Total_Marks,
                            ExamStatus: (tempArr[0].Is_Absent == "N" &&
                                isGreaterThanDate(JoiningDate, tempArr[0].Test_Date)) ? "J" : tempArr[0].Is_Absent,
                            ExamGrade: tempArr[0].Assigned_Grade_Id,
                            Student_Id: tempArr[0].Student_Id,
                            JoiningDate: tempArr[0].Joining_Date,
                            IsLateJoinee: isGreaterThanDate(JoiningDate, TestDate),
                            AllowMarksEntryForLateJoin: response2.data.AllowMarksEntryForLateJoin,
                            IsAbsent: tempArr[0].Is_Absent
                        }
                        : Obj

                })
                return arr
            }


            const getTotalMarksForStudent = (StudentId) => {
                let TotalMarks = 0
                response2.data.listStudentTestMarkDetails.map((Item, i) => {
                    if (Item.Student_Id == StudentId) {
                        TotalMarks = parseInt(Item.Total_Marks_Scored)
                    }
                });

                return TotalMarks
            }
            response1.data.map((Item, i) => {
                reponseData1.push({
                    Id: Item.Student_Id,
                    Text1: Item.Roll_No,
                    Text2: Item.Name,
                    MarksForStudent: getMarksForStudent(Item.Student_Id, Item.Joining_Date),
                    TotalMarks: getTotalMarksForStudent(Item.Student_Id),
                    JoiningDate: Item.Joining_Date
                });
            });


            dispatch(SubjectExamMarksslice.actions.GetAllStudentsForMarksAssignment(reponseData1));

            let responseData2 = [];
            const ExamMarkHeader = {
                Text1: "Roll No.",
                Text2: "Student Name",
                Text4: response2.data.listTestDetailss.length > 0 ?
                    response2.data.listTestDetailss.map((Item, i) => {
                        return {
                            Id: Item.TestType_Id,
                            Text1: Item.TestType_Name + "/" + Item.TestType_Total_Marks,
                            Text2: "",
                            Text3: "0",
                            Text4: "Exam Status",

                            setErrorMessage: "",
                        };
                    }) :
                    [{
                        Id: "0",
                        Text1: "",
                        Text2: "",
                        Text3: "0",
                        Text4: "Exam Status",
                        setErrorMessage: "",
                    }],
                Text5: "Total/" + (response2.data.listTestDetailss.length > 0 ?
                    response2.data.listTestDetailss[0].TotalMarks : "")
            }
            dispatch(SubjectExamMarksslice.actions.GetExamMarkHeader(ExamMarkHeader));

            dispatch(SubjectExamMarksslice.actions.GetSubjectExamMarkslist(response2.data));


            const response4 = await SubjectExamMarksApi.GetSubjectExamMarkslists(body2);
            let responseData4 = [{ Id: '0', Name: 'Select', Value: 'N' }];

            response4.data.listDisplayNameDetail.map((Item, i) => {
                responseData4.push({
                    Id: Item.ExamStatusId,
                    Name: Item.DisplayName,
                    Value: Item.ShortName
                });
            });

            dispatch(SubjectExamMarksslice.actions.GetListDisplayNameDetail(responseData4));

            // let reponseData5 = [];
            // const response5 = await SubjectExamMarksApi.GetSubjectExamMarkslists(body2);
            // // let responseData5 = [{ Id: '0', Name: 'Select', Value: 'N' }];

            // response5.data.listFailCreatiaDetails.map((Item, i) => {
            //     return {
            //         IsCoCurricullar: Item.IsCoCurricullar,
            //         IsFailCriteriaNotApplicable: Item.IsFailCriteriaNotApplicable,
            //         TestOutOfMarks: Item.TestOutOfMarks,
            //         TestOutOfMarksAvailable: Item.TestOutOfMarksAvailable,
            //         TestTypeOutOfMarksAvailable: Item.TestTypeOutOfMarksAvailable

            //     };
            // });
            // // console.log(response5, "response5");
            // dispatch(SubjectExamMarksslice.actions.GetListDisplayNameDetail(response5.data.listFailCreatiaDetails))


        }







export const getManageStudentsTestMark =
    (data: IManageStudentsTestMarkBody): AppThunk =>
        async (dispatch) => {
            dispatch(SubjectExamMarksslice.actions.getLoading(true));
            const response = await SubjectExamMarksApi.ManageStudentsTestMark(data);
            dispatch(SubjectExamMarksslice.actions.GetManageStudentsTestMark(response.data));

        };


export default SubjectExamMarksslice.reducer;
