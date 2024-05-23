import { createSlice } from '@reduxjs/toolkit';
import VeiwResultAll from 'src/api/VeiwResultAll/ApiVeiwResultAll';
import {
    IClassTeacherBody,
    IGetAllStudentTestprogressBody,
    IGetStudentNameListBody,
    IGetsingleStudentBody,
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
        iscofigred:[],
        unpublishexam:[],
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
        singleStudentResultList(state, action) {
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
        SubjectDetailsView(state, action) {
            state.Loading = false;
            state.getSubjectDetailsView = action.payload;
        },
        isconfiexam(state, action) {
            state.iscofigred = action.payload;
        },
        UnpublishexamName(state, action) {
            state.unpublishexam = action.payload;
        },

        getLoading(state, action) {
            state.Loading = true;
            // state.StudentsingleResult = [];

        }


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
            let StudentList = response.data?.map((item) => {
                return {
                    // Id: item.Standard_Division_Id,
                    // Text1: item.Roll_No,
                    // Text2: item.Name,
                    // Text3: item.Marks == '' ? 'N/A' : item.Marks,
                    // Text4: item.Percentage == '' ? 'N/A' : item.Percentage,
                    // Text5: item.Grade_Name == '' ? 'N/A' : item.Grade_Name,
                    // Text6: item.Result == '' ? 'N/A' : item.Result
                };
            });
            dispatch(VeiwResultSlice.actions.AllStudentResultList(StudentList));
            console.log(StudentList, 'StudentList');
        };




export const StudentNameList =
    (data: IGetStudentNameListBody): AppThunk =>
        async (dispatch) => {
            const response = await VeiwResultAll.GetStudentNameResult(data);

          
            let studentResult =[{ Id: '0', Name: 'All', Value: '0' }]
             response.data.map((item, i) => {
                studentResult.push({
             
                    Id: item.Student_Id,
                    Name: item.StudentName,
                    Value: item.Student_Id,
                });
            });
            dispatch(VeiwResultSlice.actions.studentsName(studentResult));
            console.log(response, "response")
        };

export const GetsingleStudentResult =
    (data: IGetsingleStudentBody): AppThunk =>
        async (dispatch) => {
            const response = await VeiwResultAll.GetsingleStudentResult(data);
            let StudentListAll = response.data.listStudentDetail.map((item) => {
                return {
                    Id: item.YearWise_Student_Id,
                    Text1: item.Student_Name,
                    Text2: item.Roll_No,
                    Text3: item.Standard_Name,
                    Text4: item.Division_Name,
                    Text5: item.Academic_Year
                };
            });
            dispatch(VeiwResultSlice.actions.singleStudentResultList(StudentListAll));
            console.log(StudentListAll, 'StudentList');
        };


export const SubjectDetailsVA =
    (data: IGetsingleStudentBody): AppThunk =>
        async (dispatch) => {
            const response = await VeiwResultAll.GetsingleStudentResult(data);
            let abc = [];
            response.data.listSubjectDetails.map((item, i) => {
                abc.push({
                    Id: item.Subject_Id,
                    Name: item.Subject_Name,
                    Value: item.Subject_Id
                });
            });
            dispatch(VeiwResultSlice.actions.SubjectDetailsView(abc));
            console.log(abc)
        }


export const MarksDetailsVA =
    (data: IGetsingleStudentBody): AppThunk =>
        async (dispatch) => {
            const response = await VeiwResultAll.GetsingleStudentResult(data);
            let abc = [{ Id: '0', Name: 'Marks', Value: '0' }];
            response.data.listSubjectDetails.map((item, i) => {
                abc.push({
                    Id: item.Subject_Id,
                    Name: `${item.Marks_Scored} / ${item.Subject_Total_Marks}`,
                    Value: item.Subject_Id
                });
            });
            dispatch(VeiwResultSlice.actions.MarkDetailsView(abc));
            console.log(abc)
        }

export const GradesDetailsVA =
    (data: IGetsingleStudentBody): AppThunk =>
        async (dispatch) => {
            const response = await VeiwResultAll.GetsingleStudentResult(data);
            let abc = [{ Id: '0', Name: 'Subject Grade', Value: '0' }];
            response.data.listSubjectDetails.map((item, i) => {
                abc.push({
                    Id: item.Subject_Id,
                    Name: item.Grade,
                    Value: item.Subject_Id
                });
            });
            dispatch(VeiwResultSlice.actions.GradesDetailsView(abc));
            console.log(abc)
        }


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
