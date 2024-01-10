import { createSlice } from "@reduxjs/toolkit";
import { AppThunk } from "src/store";
import AddHomeworkApi from "src/api/AssignHomework/apiAddHomework";
import { IGetHomeworkListForTeacherBody, IPublishUnPublishHomeworkBody, IGetHomeworkDetailBody, IDeleteHomeworkBody, ISaveHomeworkBody, IDeleteHomeworkDocumentBody, IGetTeacherSubjectAndClassSubjectBody, IGetSubjectListForTeacherBody, IAllPublishUnpublishAddHomeworkBody, IGetAllHomeworkDocumentsBody } from "src/interfaces/AssignHomework/IAddHomework";
import { getDateMonthYearFormatted } from "src/components/Common/Util";

const AddHomeworkSlice = createSlice({
    name: 'AddHomework',
    initialState: {
        HomeworkListForTeacher: [],
        PublishUnPublishHomework: "",
        GetHomeworkDetail: null,
        DeleteHomework: "",
        SaveHomework: "",
        DeleteHomeworkDocument: "",
        Subjectlist: [],
        ISSubmitMarksRest: "",
        FilePath: "",
        SubjectListTeacher: [],
        AllPublishUnpublishHomeworkT: "",
        GetAllHomeworkDocuments: [],
    },
    reducers: {
        Homeworklist(state, action) {
            state.HomeworkListForTeacher = action.payload;
        },
        getPublishunpublish(state, action) {
            state.PublishUnPublishHomework = action.payload;
        },
        gethomeworkdetail(state, action) {
            if(action.payload.length>0)
            state.GetHomeworkDetail = action.payload[0];
        },
        deletehomework(state, action) {
            state.DeleteHomework = action.payload;
        },
        savehomework(state, action) {
            state.SaveHomework = action.payload;
        },
        DeleteHomeworkDocument(state, action) {
            state.DeleteHomeworkDocument = action.payload;
        },
        RTeacherSubjectList(state, action) {
            state.Subjectlist = action.payload;
        },
        resetMessage(state) {
            state.ISSubmitMarksRest = ""
        },
        resetFilepath(state) {
            state.FilePath = "";
        },

        getSubjectList(state, action) {
            state.SubjectListTeacher = action.payload;
        },
        allpublishunpublishhomework(state, action) {
            state.AllPublishUnpublishHomeworkT = action.payload;
        },
        getallhomeworkdocument(state, action) {
            state.GetAllHomeworkDocuments = action.payload;
        },
    }

});
export const homeworklistforteacher =
    (data: IGetHomeworkListForTeacherBody): AppThunk =>
        async (dispatch) => {
            const response = await AddHomeworkApi.HomeworkList(data);
            let a = response.data.map((item, i) => {
                return {
                    Id: item.Id,
                    Text1: item.Subject,
                    Text2: item.Title,
                    Text3: getDateMonthYearFormatted(item.AssignedDate),
                    Text4: getDateMonthYearFormatted(item.CompleteByDate),
                    Text5: item.AttachmentPath,
                    Text7: item.IsPublished,

                }
            })

            dispatch(AddHomeworkSlice.actions.Homeworklist(a));
        };
export const GetPublishUnpublishHomework =
    (data: IPublishUnPublishHomeworkBody): AppThunk =>
        async (dispatch) => {
            const response = await AddHomeworkApi.PublishUnpublish(data);
            dispatch(AddHomeworkSlice.actions.getPublishunpublish(response.data))
        }

export const GetHomeworkDetails =
    (data: IGetHomeworkDetailBody): AppThunk =>
        async (dispatch) => {
            const response = await AddHomeworkApi.HomeworkDetail(data);
            dispatch(AddHomeworkSlice.actions.gethomeworkdetail(response.data))
        }
export const HomeworkDelete =
    (data: IDeleteHomeworkBody): AppThunk =>
        async (dispatch) => {
            const response = await AddHomeworkApi.Deletehomework(data);
            dispatch(AddHomeworkSlice.actions.deletehomework(response.data))
        }
export const HomeworkSave =
    (data: ISaveHomeworkBody): AppThunk =>
        async (dispatch) => {
            const response = await AddHomeworkApi.SaveHomework(data);
            dispatch(AddHomeworkSlice.actions.savehomework(response.data))
        }
export const DeleteDocument =
    (data: IDeleteHomeworkDocumentBody): AppThunk =>
        async (dispatch) => {
            const response = await AddHomeworkApi.DeleteDocument(data);
            dispatch(AddHomeworkSlice.actions.DeleteHomeworkDocument(response.data))
        }
export const SubjectListforTeacher =
    (data: IGetTeacherSubjectAndClassSubjectBody): AppThunk =>
        async (dispatch) => {
            const response = await AddHomeworkApi.ApiTeacheSubjectlist(data);
            let a = response.data.map((item, i) => {
                return {
                    Id: item.Subject_Id,
                    Name: item.Subject_Name,
                    Value: item.Subject_Id,
                }
            })
            dispatch(AddHomeworkSlice.actions.RTeacherSubjectList(a))

        }


export const resetMessage =
    (): AppThunk =>
        async (dispatch) => {
            dispatch(AddHomeworkSlice.actions.resetMessage());
        }

export const ResetFilePath =
    (): AppThunk =>
        async (dispatch) => {
            dispatch(AddHomeworkSlice.actions.resetFilepath());
        };
export const GetTeacherSubjectList =
    (data: IGetSubjectListForTeacherBody): AppThunk =>
        async (dispatch) => {
            const response = await AddHomeworkApi.GetSubjectListTeacher(data);
            let a = response.data.map((item, i) => {

                return {
                    Id: item.Id,
                    Text1: item.Id,
                    Text2: item.Subject,
                    Text3: item.Title,
                    Text4: item.IsPublished,
                    Text5: item.CompleteByDate,
                }
            })
            dispatch(AddHomeworkSlice.actions.getSubjectList(a))
        }
export const PublishUnpublishAllHomework =
    (data: IAllPublishUnpublishAddHomeworkBody): AppThunk =>
        async (dispatch) => {
            const response = await AddHomeworkApi.HomeworkAllPublishUnpublish(data);
            dispatch(AddHomeworkSlice.actions.allpublishunpublishhomework(response.data))
        }

export const GetAllHomeworkDocuments =
    (data: IGetAllHomeworkDocumentsBody): AppThunk =>
        async (dispatch) => {
            const response = await AddHomeworkApi.GetAllHomeworkDocuments(data);
            dispatch(AddHomeworkSlice.actions.getallhomeworkdocument(response.data))
        }

export default AddHomeworkSlice.reducer