import { createSlice } from '@reduxjs/toolkit';
import GetStudentRecordDataAPI from 'src/api/StudentRecords/ApiAddStudentRecords';
import { IGetStudentRecordCommentBody, IGetStudentRecordDataBody, IMarkRecordAsReadBody, ISubmitStudentRecordBody, ISubmitStudentRecordCommentBody } from 'src/interfaces/StudentRecords/IAddStudentRecords';
import { AppThunk } from 'src/store';

const AddStudentRecordsSlice = createSlice({
    name: 'AddStudentRecords',
    initialState: {
        listGeneralDetails: [],
        listSiblingsDetails: [],
        listFamilyDetails: [],
        listBehaviorDetails: [],
        listParameterDetails: [],
        listCommentDetails: [],
        submitStudentRecordmsg: '',
        markrecordAsreadmsg: '',
        submitStudentRecordCommentmsg: '',
        getstudentrecordcomment: [],
        Loading: true
    },
    reducers: {
        GeneralDetails(state, action) {
            state.Loading = false;
            state.listGeneralDetails = action.payload;
        },
        SiblingsDetails(state, action) {
            state.Loading = false;
            state.listSiblingsDetails = action.payload;
        },
        FamilyDetails(state, action) {
            state.Loading = false;
            state.listFamilyDetails = action.payload;
        },
        BehaviorDetails(state, action) {
            state.Loading = false;
            state.listBehaviorDetails = action.payload;
        },
        ParameterDetails(state, action) {
            state.Loading = false;
            state.listParameterDetails = action.payload;
        },
        CommentDetails(state, action) {
            state.Loading = false;
            state.listCommentDetails = action.payload;
        },
        getSubmitStudentRecord(state, action) {
            state.Loading = false;
            state.submitStudentRecordmsg = action.payload;
        },
        resetSubmitStudentRecord(state) {
            state.Loading = false;
            state.submitStudentRecordmsg = "";
        },
        getMarkRecordAsRead(state, action) {
            state.Loading = false;
            state.markrecordAsreadmsg = action.payload;
        },
        resetMarkRecordAsRead(state) {
            state.Loading = false;
            state.markrecordAsreadmsg = "";
        },
        getSubmitStudentRecordComment(state, action) {
            state.Loading = false;
            state.submitStudentRecordCommentmsg = action.payload;
        },
        getGetStudentRecordComment(state, action) {
            state.Loading = false;
            state.getstudentrecordcomment = action.payload;
        },
        getLoading(state, action) {
            state.Loading = true;

        }

    }
});
export const GetStudentRecordData =
    (data: IGetStudentRecordDataBody): AppThunk =>
        async (dispatch) => {
            const response = await GetStudentRecordDataAPI.GetStudentRecordDataApi(data);
            let abc = []
            response.data.listGeneralDetails.map((item, i) => {
                abc.push({

                    Text1: item.StudentName,
                    Text2: item.DOB,
                    Text3: item.MotherName,
                    Text4: item.FatherName,
                    Text5: item.FatherOccupation,
                    Text6: item.MotherOccupation
                });
            });
            dispatch(AddStudentRecordsSlice.actions.GeneralDetails(abc));
            console.log(abc)

            let siblingsdetails = [];
            response.data.listSiblingsDetails.map((item, i) => {
                siblingsdetails.push({

                    Text1: item.SiblingName,
                    Text2: item.Sex,
                    Text3: item.Age,
                    Text4: item.Standard
                });
            });
            dispatch(AddStudentRecordsSlice.actions.SiblingsDetails(siblingsdetails));
            // console.log(siblingsdetails)

            let familydetails = [];
            response.data.listFamilyDetails.map((item, i) => {
                familydetails.push({

                    Id: item.Id,
                    Name: item.Name,
                    DisplayOnScreen: item.DisplayOnScreen,
                    SortOrder: item.SortOrder
                });
            });
            dispatch(AddStudentRecordsSlice.actions.FamilyDetails(familydetails));
            // console.log(familydetails)

            let behaviordetails = [];
            response.data.listBehaviorDetails.map((item, i) => {
                behaviordetails.push({

                    Id: item.Id,
                    BDName: item.Name,
                    SectionId: item.SectionId,
                    BDSortOrder: item.SortOrder,
                    ControlId: item.ControlId
                });
            });
            dispatch(AddStudentRecordsSlice.actions.BehaviorDetails(behaviordetails));
            // console.log(behaviordetails)

            let parameterdetails = [];
            response.data.listParameterDetails.map((item, i) => {
                parameterdetails.push({

                    Id: item.Id,
                    ParameterId: item.ParameterId,
                    Answer: item.Answer
                });
            });
            dispatch(AddStudentRecordsSlice.actions.ParameterDetails(parameterdetails));
            console.log(parameterdetails)

            let commentdetails = [];
            response.data.listCommentDetails.map((item, i) => {
                commentdetails.push({
                    Id: item.Id,
                    Date: item.Date,
                    Comment: item.Comment,
                    LectureName: item.LectureName,
                    IsDefaultComment: item.IsDefaultComment,
                    IsSubmitted: item.IsSubmitted,
                    IsCommentReadByConsellor: item.IsCommentReadByConsellor,
                    IsCommentReadByPrincipal: item.IsCommentReadByPrincipal,
                    IsCommentReadByClassTeacher: item.IsCommentReadByClassTeacher,
                    LoginUserDesignation: item.LoginUserDesignation,
                    InsertedById: item.InsertedById,
                    UserName: item.UserName
                });
            });
            dispatch(AddStudentRecordsSlice.actions.CommentDetails(commentdetails));
            console.log(commentdetails)
        }

export const GetSubmitStudentRecord =
    (data: ISubmitStudentRecordBody): AppThunk =>
        async (dispatch) => {
            dispatch(AddStudentRecordsSlice.actions.getLoading(true));
            const response = await GetStudentRecordDataAPI.SubmitStudentRecord(data);
            dispatch(AddStudentRecordsSlice.actions.getSubmitStudentRecord(response.data));
            console.log(response, "response");

        };
export const resetGetSubmitStudentRecord =
    (): AppThunk =>
        async (dispatch) => {
            dispatch(AddStudentRecordsSlice.actions.resetSubmitStudentRecord());
        };
export const GetMarkRecordAsRead =
    (data: IMarkRecordAsReadBody): AppThunk =>
        async (dispatch) => {
            dispatch(AddStudentRecordsSlice.actions.getLoading(true));
            const response = await GetStudentRecordDataAPI.MarkRecordAsRead(data);
            dispatch(AddStudentRecordsSlice.actions.getMarkRecordAsRead(response.data));
            console.log(response, "response");

        };
export const resetGetMarkRecordAsRead =
    (): AppThunk =>
        async (dispatch) => {
            dispatch(AddStudentRecordsSlice.actions.resetMarkRecordAsRead());
        };
export const GetSubmitStudentRecordComment =
    (data: ISubmitStudentRecordCommentBody): AppThunk =>
        async (dispatch) => {
            dispatch(AddStudentRecordsSlice.actions.getLoading(true));
            const response = await GetStudentRecordDataAPI.SubmitStudentRecordComment(data);
            dispatch(AddStudentRecordsSlice.actions.getSubmitStudentRecordComment(response.data));
            console.log(response, "response");

        };
export const GetStudentRecordCommentEdit =
    (data: IGetStudentRecordCommentBody): AppThunk =>
        async (dispatch) => {
            dispatch(AddStudentRecordsSlice.actions.getLoading(true));
            const response = await GetStudentRecordDataAPI.GetStudentRecordComment(data);
            dispatch(AddStudentRecordsSlice.actions.getGetStudentRecordComment(response.data));
            console.log(response, "response");

        };

export default AddStudentRecordsSlice.reducer;
