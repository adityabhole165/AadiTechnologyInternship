import { createSlice } from "@reduxjs/toolkit";
import { AppThunk } from "src/store";
import ApiHomeworkDocuments from "src/api/AssignHomework/ApiHomeworkDocuments";
import { IGetAllHomeworkDocumentsBody,IDeleteHomeworkDocumentBody } from "src/interfaces/AssignHomework/IHomeworkDocuments";
import { getDateMonthYearFormatted } from "src/components/Common/Util";

const HomeworkdocumentSlice = createSlice({
    name: 'HomeworkDocuments',
    initialState: {
        GetAllHomeworkDocuments: [],
        DeleteHomeworkDocument: "",
 
    },

    reducers: {

        getallhomeworkdocument(state, action) {
            state.GetAllHomeworkDocuments = action.payload;
        },
        DeleteHomeworkDocument(state, action) {
            state.DeleteHomeworkDocument = action.payload;
        },
    }
});

export const GetAllHomeworkDocuments =
    (data: IGetAllHomeworkDocumentsBody): AppThunk =>
        async (dispatch) => {
            const response = await ApiHomeworkDocuments.GetAllHomeworkDocuments(data);
            let StudentList = response.data.map((item)=>{
                return {
                Id:item.Id,
                Text1:item.AttachmentName,
                
               // Text5: item.ReadyToSubmitCount==0?"":"Unread-" + item.ReadyToSubmitCount.toString()
            }
            
              })
            dispatch(HomeworkdocumentSlice.actions.getallhomeworkdocument(StudentList))
            
        }
        export const DeleteDocument =
        (data: IDeleteHomeworkDocumentBody): AppThunk =>
            async (dispatch) => {
                const response = await ApiHomeworkDocuments.DeleteDocument(data);
                dispatch(HomeworkdocumentSlice.actions.DeleteHomeworkDocument(response.data))
            }

export default HomeworkdocumentSlice.reducer