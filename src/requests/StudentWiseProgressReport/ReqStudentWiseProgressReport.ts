import { createSlice } from '@reduxjs/toolkit';
import GetStudentwiseReportApi from 'src/api/StudentWiseProgressReport/StudentWiseProgressReport';
import {
    GetClassTeacherXseedSubjectsBody,
    IDeleteAllStudentTestMarksBody,
    IGetAllPrimaryClassTeachersBody,
    IGetAssessmentDropdownBody,
    IGetPagedStudentsForMarkAssignmentBody,
    IGetPublishStatusBody,
    IPublishUnpublishXseedResultBody,
    IoneDeleteStudentTestMarksBody
} from 'src/interfaces/StudentWiseProgressReport/IStudentWiseProgressReport';
import { AppThunk } from 'src/store';
const Studentwiseprogressslice = createSlice({
    name: 'Studentwiseprogress ',

    initialState: {

        PrimaryClassTeacher: [],
        ISAssessmentDropdown: [],
        StudentsAssignment: [],
        ISClassTeacherXseedSubjects: [],
        StudentsAssignmentGrade: [],
        oneDeleteStudent: "",
        DeleteAllStudent: "",
        ISAllStudentRecordCount: "",
        ISGetAllRecordSubmitted: [],
        PublishStatus: [],
        PublishUnpublishXseed: "",
        Loading: true
    },

    reducers: {
        PrimaryTeacher(state, action) {
            state.PrimaryClassTeacher = action.payload;
        },
        AssessmentDrop(state, action) {
            state.ISAssessmentDropdown = action.payload;
        },
        StudentsAssign(state, action) {
            state.StudentsAssignment = action.payload;
        },
        StudentsAssigngrades(state, action) {
            state.StudentsAssignmentGrade = action.payload;
        },
        oneDelete(state, action) {
            state.oneDeleteStudent = action.payload;
        },
        DeleteAll(state, action) {
            state.DeleteAllStudent = action.payload;
        },
        rdeleteresetMessage(state) {
            state.oneDeleteStudent = '';
        },

        rdeleteresetMessageAll(state) {
            state.DeleteAllStudent = "";
        },
        PublishStat(state, action) {
            state.PublishStatus = action.payload;
        },
        RClassTeacherXseedSubjects(state, action) {
            state.ISClassTeacherXseedSubjects = action.payload;
        },
        PublishUnXseed(state, action) {
            state.PublishUnpublishXseed = action.payload;
        },
        setLoading(state, action) {
            state.Loading = action.payload;
        },
        RPublishresetMessageAll(state) {
            state.PublishUnpublishXseed = '';
        },


        AllStudentRecordCount(state, action) {
            state.ISAllStudentRecordCount = action.payload;
        },
        GetAllRecordSubmitted(state, action) {
            state.ISGetAllRecordSubmitted = action.payload;
        },

    }
});



export const GetPrimaryTeacher =
    (data: IGetAllPrimaryClassTeachersBody): AppThunk =>
        async (dispatch) => {
            const response = await GetStudentwiseReportApi.AllPrimaryClassTeacher(data);
            let TeacherList = response.data?.map((item) => {
                return {
                    Id: item.SchoolWise_Standard_Division_Id,
                    Name: item.TeacherName,
                    Value: item.SchoolWise_Standard_Division_Id,
                };
            });
            dispatch(Studentwiseprogressslice.actions.PrimaryTeacher(TeacherList));
            //console.log(TeacherList, 'TeacherList');
        };

export const CDAAssessmentDropdown =
    (data: IGetAssessmentDropdownBody): AppThunk =>
        async (dispatch) => {
            const response = await GetStudentwiseReportApi.AssessmentDropdown(data);
            let Assessment = response.data?.map((item) => {
                return {
                    Id: item.AssessmentId,
                    Name: item.Name,
                    Value: item.AssessmentId,
                };
            });
            dispatch(Studentwiseprogressslice.actions.AssessmentDrop(Assessment));
            //console.log(Assessment, 'Assessment');
        };


export const PageStudentsAssignment =
    (data: IGetPagedStudentsForMarkAssignmentBody): AppThunk =>
        async (dispatch) => {
            const response = await GetStudentwiseReportApi.StudentsForMarkAssignment(data);


            let StudentsAssignment = response.data.GetPagedStudentsForMarkAssignmentList.map((item, i) => {
                return {
                    RollNo: item.RollNo,
                    Id: item.YearwiseStudentId,
                    StudentName: item.StudentName,
                    EditStatus: item.EditStatus,
                    ShowDeleteButton: item.ShowDeleteButton,
                    ShowProgressReport: item.ShowProgressReport,
                    StandardId: item.Standard_Division_Id,

                };
            });
            //console.log(StudentsAssignment, "StudentsAssignment");



            dispatch(Studentwiseprogressslice.actions.StudentsAssign(StudentsAssignment));
            dispatch(Studentwiseprogressslice.actions.AllStudentRecordCount(response.data.GetAllStudentRecordCount));
            dispatch(Studentwiseprogressslice.actions.GetAllRecordSubmitted(response.data.GetAllRecordSubmitted));


        };


export const oneDeleteStudentTest =
    (data: IoneDeleteStudentTestMarksBody): AppThunk =>
        async (dispatch) => {
            const response = await GetStudentwiseReportApi.oneDeleteStudentTestMark(data);
            //console.log(response.data, "response.data  ");
            dispatch(Studentwiseprogressslice.actions.oneDelete(response.data));
        };



export const DeleteAllStudentTest =
    (data: IDeleteAllStudentTestMarksBody): AppThunk =>
        async (dispatch) => {
            const response = await GetStudentwiseReportApi.DeleteAllStudentTestMarks(data);
            dispatch(Studentwiseprogressslice.actions.DeleteAll(response.data));
        };


export const PublishStatus =
    (data: IGetPublishStatusBody): AppThunk =>
        async (dispatch) => {
            const response = await GetStudentwiseReportApi.PublishStatus(data);
            dispatch(Studentwiseprogressslice.actions.PublishStat(response.data));
        };


export const PublishUnpublishXseed =
    (data: IPublishUnpublishXseedResultBody): AppThunk =>
        async (dispatch) => {
            const response = await GetStudentwiseReportApi.PublishUnpublishXseedResult(data);
            dispatch(Studentwiseprogressslice.actions.PublishUnXseed(response.data));
        };


export const CDAClassTeacherXseedSubjects =
    (data: GetClassTeacherXseedSubjectsBody): AppThunk =>
        async (dispatch) => {
            const response = await GetStudentwiseReportApi.GetClassTeacherXseedSubjects(data);
            let listpublishstatusDetails = response.data.listpublishstatusDetails.map((item) => {
                return {
                    Id: item.StandardDivisionId,
                    PublishStatus: item.PublishStatus,
                    IsPublished: item.IsPublished,
                };
            });

            dispatch(Studentwiseprogressslice.actions.RClassTeacherXseedSubjects(listpublishstatusDetails));
        };





export const PublishresetMessageNewAll = (): AppThunk => async (dispatch) => {
    dispatch(Studentwiseprogressslice.actions.RPublishresetMessageAll());
};


export const deleteresetMessage = (): AppThunk => async (dispatch) => {
    dispatch(Studentwiseprogressslice.actions.rdeleteresetMessage());
};

export const deleteresetMessageAll = (): AppThunk => async (dispatch) => {
    dispatch(Studentwiseprogressslice.actions.rdeleteresetMessageAll());
};


export default Studentwiseprogressslice.reducer;
