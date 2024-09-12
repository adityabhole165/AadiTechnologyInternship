import { createSlice } from '@reduxjs/toolkit';
import ApiHomeworkDocuments from 'src/api/AssignHomework/ApiHomeworkDocuments';
import {
  IDeleteHomeworkDocumentBody,
  IGetAllHomeworkDocumentsBody
} from 'src/interfaces/AssignHomework/IHomeworkDocuments';
import { AppThunk } from 'src/store';

const HomeworkdocumentSlice = createSlice({
  name: 'HomeworkDocuments',
  initialState: {
    GetAllHomeworkDocuments: [],
    DeleteHomeworkDocument: ''
  },

  reducers: {
    getallhomeworkdocument(state, action) {
      state.GetAllHomeworkDocuments = action.payload;
    },
    DeleteHomeworkDocument(state, action) {
      state.DeleteHomeworkDocument = action.payload;
    },

    rdeleteresetMessage(state) {
      state.DeleteHomeworkDocument = '';
    },

  }
});

export const GetAllHomeworkDocuments =
  (data: IGetAllHomeworkDocumentsBody): AppThunk =>
    async (dispatch) => {
      const response = await ApiHomeworkDocuments.GetAllHomeworkDocuments(data);
      let StudentList = []
      if (response && response.data && Array.isArray(response.data)) {
        StudentList = response.data.map((item) => {
          return {
            Id: item.Id,
            Text1: item.AttachmentName

          };
        });
      }
      dispatch(
        HomeworkdocumentSlice.actions.getallhomeworkdocument(StudentList)
      );
    }


export const DeleteDocument =
  (data: IDeleteHomeworkDocumentBody): AppThunk =>
    async (dispatch) => {
      const response = await ApiHomeworkDocuments.DeleteDocument(data);
      dispatch(
        HomeworkdocumentSlice.actions.DeleteHomeworkDocument(response.data)
      );
    };

export const deleteresetMessage = (): AppThunk => async (dispatch) => {
  dispatch(HomeworkdocumentSlice.actions.rdeleteresetMessage());
};



export default HomeworkdocumentSlice.reducer;
