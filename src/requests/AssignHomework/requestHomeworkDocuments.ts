import { createSlice } from "@reduxjs/toolkit";
import { AppThunk } from "src/store";
import ApiHomeworkDocuments from "src/api/AssignHomework/ApiHomeworkDocuments";
import { IGetAllHomeworkDocumentsBody } from "src/interfaces/AssignHomework/IHomeworkDocuments";
import { getDateMonthYearFormatted } from "src/components/Common/Util";

const HomeworkdocumentSlice = createSlice({
    name: 'HomeworkDocuments',
    initialState: {
        GetAllHomeworkDocuments: [],
    },

    reducers: {

        getallhomeworkdocument(state, action) {
            state.GetAllHomeworkDocuments = action.payload;
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


export default HomeworkdocumentSlice.reducer