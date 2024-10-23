import { createSlice } from '@reduxjs/toolkit';
import VeiwResultAll from 'src/api/VeiwResultAll/ApiVeiwResultAll';
import {
    IClassTeacherBody,
    IGetAllStudentTestprogressBody,
    IGetPagedStudentBody,
    IGetStudentNameListBody,
    IGetsingleStudentBody,
    IUnpublishedTestexamBody,
    IconfiguredExamBody
} from 'src/interfaces/VeiwResultAll/IViewResultAll';
import { AppThunk } from 'src/store';


const VeiwResultSlice = createSlice({
    name: 'VeiwResult',


    initialState: {
        ClassTeachers: [],
        StudentName: [],
        StudentResultList: [],
        StudentsingleResult: [],
        getSubjectDetailsView: [],
        getMarkDetailsView: [],
        getGradesDetailsView: [],
        getTotalPerGradeView: [],
        getPerDetails: [],
        iscofigred: {},
        unpublishexam: [],
        notResultList: [],
        HeaderList: [],
        Loading: true
    },
    reducers: {
        classTeacherList(state, action) {
            state.ClassTeachers = action.payload;
        },
        AllStudentResultList(state, action) {
            state.StudentResultList = action.payload;
        },
        studentsName(state, action) {
            state.StudentName = action.payload;
        },
        isconfiexam(state, action) {
            state.Loading = false;
            state.iscofigred = action.payload;
        },
        UnpublishexamName(state, action) {
            state.Loading = false;
            state.unpublishexam = action.payload;
        },
        singleStudentResultList(state, action) {
            state.Loading = false;
            state.StudentsingleResult = action.payload;
        },
        MarkDetailsView(state, action) {
            state.Loading = false;
            state.getMarkDetailsView = action.payload;
        },
        GradesDetailsView(state, action) {
            state.Loading = false;
            state.getGradesDetailsView = action.payload;
        },
        TotalPerGradeView(state, action) {
            state.Loading = false;
            state.getTotalPerGradeView = action.payload;
        },
        PercentDetails(state, action) {
            state.Loading = false;
            state.getPerDetails = action.payload;
        },
        SubjectDetailsView(state, action) {
            state.Loading = false;
            state.getSubjectDetailsView = action.payload;
        },
        getLoading(state, action) {
            state.Loading = true;
            //  state.StudentsingleResult = [];

        },
        PageStudentList(state, action) {
            state.notResultList = action.payload;
        },


    }
});

export const ClassTechersListt =
    (data: IClassTeacherBody): AppThunk =>
        async (dispatch) => {
            const response = await VeiwResultAll.ClassTeacherList(data);
            let ClassTeacherList = response.data.map((item, i) => {
                return {
                    Id: item.Teacher_Id,
                    Name: item.TeacherName,
                    Value: item.Teacher_Id
                };
            });
            dispatch(VeiwResultSlice.actions.classTeacherList(ClassTeacherList));
        };
export const GetStudentResultList =
    (data: IGetAllStudentTestprogressBody): AppThunk =>
        async (dispatch) => {
            const response = await VeiwResultAll.GetAllStudentResult(data);
            // let StudentList = response.data.map((item) => {
            //     return {
            //         // Id: item.Standard_Division_Id,
            //         // Text1: item.Roll_No,
            //         // Text2: item.Name,
            //         // Text3: item.Marks == '' ? 'N/A' : item.Marks,
            //         // Text4: item.Percentage == '' ? 'N/A' : item.Percentage,
            //         // Text5: item.Grade_Name == '' ? 'N/A' : item.Grade_Name,
            //         // Text6: item.Result == '' ? 'N/A' : item.Result
            //     };
            // });
            // dispatch(VeiwResultSlice.actions.AllStudentResultList(StudentList));
            //  console.log(StudentList, 'StudentList');
        };



export const StudentNameList =
    (data: IGetStudentNameListBody): AppThunk =>
        async (dispatch) => {
            const response = await VeiwResultAll.GetStudentNameResult(data);
            let studentResult = [{ Id: '0', Name: 'All', Value: '0' }]
            response.data.map((item, i) => {
                studentResult.push({
                    Id: item.Student_Id,
                    Name: item.StudentName,
                    Value: item.Student_Id,
                });
            });
            dispatch(VeiwResultSlice.actions.studentsName(studentResult));
            //  console.log(response, "nameeeee")
        };


export const GetsingleStudentResultVA =
    (data: IGetsingleStudentBody): AppThunk =>
        async (dispatch) => {
            const response = await VeiwResultAll.GetsingleStudentResult(data);
            console.log(response.data, "respons");

            let StudentListAll = response.data.listStudentDetail.map((item, i) => {
                return {
                    Id: item.YearWise_Student_Id,
                    Text1: item.Student_Name,
                    Text2: item.Roll_No,
                    Text3: item.Standard_Name,
                    Text4: item.Division_Name,
                    Text5: item.Academic_Year,
                    Text6: item.School_Name,
                    Text7: item.School_Orgn_Name,
                    ShowOnlyGrades: item.ShowOnlyGrades

                };
                // console.log(StudentListAll,"showonlygradess");

            });
            let MarkList = response.data.listSubjectDetails.map((item, i) => {
                const marksScored = item.Marks_Scored.includes('.0') ? parseInt(item.Marks_Scored) : item.Marks_Scored;
                return {
                    Id: item.Subject_Id,
                    Name: `${marksScored} / ${item.Subject_Total_Marks}`,
                    Value: item.Subject_Id
                };
            });
            let subject = response.data.listSubjectDetails.map((item, i) => {
                return {
                    Id: item.Subject_Id,
                    Name: item.Subject_Name,
                    Value: item.Grade,
                    Total_Consideration: item.Total_Consideration

                };
            });
            let Grades = response.data.listSubjectDetails.map((item, i) => {
                return {
                    Id: item.ID_Num,
                    Name: item.Grade,
                    Value: item.Grade
                };
            });
            let Total = response.data.listMarksDetails.map((item, i) => {
                const totalmarksScored = item.Total_Marks_Scored.includes('.0') ? parseInt(item.Total_Marks_Scored) : item.Total_Marks_Scored;
                return {
                    TotalMarks: `${totalmarksScored} / ${item.Subjects_Total_Marks}`,
                    GradeName: item.Grade_Name,
                    Percentage: item.Percentage,
                    Grade_id: item.Grade_id
                };
            });
            let PerCentDetails = response.data.listParcentageDetails.map((item, i) => {
                return {
                    TotalMarks: item.Range,
                    Grade: item.Grade,
                    Remarks: item.Remarks,
                    GradeConfId: item.Marks_Grades_Configuration_Detail_ID
                };
            });
            dispatch(VeiwResultSlice.actions.PercentDetails(PerCentDetails));
            dispatch(VeiwResultSlice.actions.TotalPerGradeView(Total));
            dispatch(VeiwResultSlice.actions.GradesDetailsView(Grades));
            dispatch(VeiwResultSlice.actions.SubjectDetailsView(subject));
            dispatch(VeiwResultSlice.actions.MarkDetailsView(MarkList));
            dispatch(VeiwResultSlice.actions.singleStudentResultList(StudentListAll));
            // console.log(StudentListAll, 'StudentListnamealll');
        };

export const getiscofigred =
    (data: IconfiguredExamBody): AppThunk =>
        async (dispatch) => {
            dispatch(VeiwResultSlice.actions.getLoading(true));
            let res = await VeiwResultAll.Getisconfigred(data);
            dispatch(VeiwResultSlice.actions.isconfiexam(res.data));
            // console.log(res, "configgg");

        };
export const getunpublishedexam =
    (data: IUnpublishedTestexamBody): AppThunk =>
        async (dispatch) => {
            const response = await VeiwResultAll.Getunplishedexam(data);
            let StudentListAll = response.data.map((item, i) => {
                return {
                    Id: item.SchoolWise_Test_Name,
                    Name: item.SchoolWise_Test_Name,
                    Value: item.SchoolWise_Test_Name

                };
            })
            dispatch(VeiwResultSlice.actions.UnpublishexamName(response.data));
            //  console.log(resp, "unpublished");

        };



export const GetNotGenrateResultList =
    (data: IGetPagedStudentBody): AppThunk =>
        async (dispatch) => {
            const response = await VeiwResultAll.GetResultnotgenrate(data);
            let StudentList = response.data?.map((item) => {
                return {
                    Id: item.Student_Id,
                    Name: item.Name,
                    Value: item.Roll_No,

                };
            });
            dispatch(VeiwResultSlice.actions.PageStudentList(StudentList));
            //console.log(StudentList, 'StudentList');
        };

// export const SingleClassTecher =
//   (data: ISingleClassTeacherBody): AppThunk =>
//     async (dispatch) => {
//       const response = await VeiwResultAll.ClassSingleTeacherList(data);
//       let abc = response.data.map((item, i) => {
//         return {
//           Id: item.Teacher_Id,
//           Name: item.TeacherName,
//           Value: item.Designation_Id
//         };
//       });
//       dispatch(VeiwResultSlice.actions.SingleTeacher(abc));
//     };
export default VeiwResultSlice.reducer;
