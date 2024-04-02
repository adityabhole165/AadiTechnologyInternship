import { createSlice } from '@reduxjs/toolkit';
import ApiTransferOptionalSubjectMarks from 'src/api/TransferOptionalSubjectMarks/ApiTransferOptionalSubjectMarks';
import { IGetClassTeachersBody, IGetOptionalSubjectsForMarksTransferBody, IGetStudentsToTransferMarksBody, ITransferOptionalSubjectMarksBody } from 'src/interfaces/TransferOptionalSubjectMarks/ITransferOptionalSubjectMarks';

import { AppThunk } from 'src/store';

const TransferOptionalSubjectMarksSlice = createSlice({
  name: 'Transfer Optional Subject Marks',
  initialState: {
    ISGetClassTeachers: [],
    ISStudentsToTransferMarks:{},
    ISOptionalSubjectsForMarksTransfer:[],
    ISTransferOptionalSubjectMarks:""


    
  },
  reducers: {
    RGetClassTeachers(state, action) {
      state.ISGetClassTeachers = action.payload;
    },
    RStudentsToTransferMarks(state, action) {
        state.ISStudentsToTransferMarks = action.payload;
      },
      ROptionalSubjectsForMarksTransfer(state, action) {
        state.ISOptionalSubjectsForMarksTransfer = action.payload;
      },
      RTransferOptionalSubjectMarks(state, action) {
        state.ISTransferOptionalSubjectMarks = action.payload;
      },
   
  }
});

export const CDAGetClassTeachers =
  (data: IGetClassTeachersBody): AppThunk =>
    async (dispatch) => {
      const response = await ApiTransferOptionalSubjectMarks.GetClassTeachers(data);
      let abc = response.data.map((item, i) => {
        return {
          Id: item.Teacher_Id,
          Name: item.TeacherName,
          Value: item.Teacher_Id
        };
      });
      dispatch(TransferOptionalSubjectMarksSlice.actions.RGetClassTeachers(abc));
    };

    export const CDAStudentsToTransferMarks =
  (data: IGetStudentsToTransferMarksBody): AppThunk =>
    async (dispatch) => {
      const response = await ApiTransferOptionalSubjectMarks.GetStudentsToTransferMarks(data);
   
      dispatch(TransferOptionalSubjectMarksSlice.actions.RStudentsToTransferMarks(response.data));
    };


    export const CDAOptionalSubjectsForMarksTransfer =
    (data: IGetOptionalSubjectsForMarksTransferBody): AppThunk =>
      async (dispatch) => {
        const response = await ApiTransferOptionalSubjectMarks.GetOptionalSubjectsForMarksTransfer(data);
     
        dispatch(TransferOptionalSubjectMarksSlice.actions.ROptionalSubjectsForMarksTransfer(response.data));
      };
  


    export const CDATransferOptionalSubjectMarks =
  (data: ITransferOptionalSubjectMarksBody): AppThunk =>
    async (dispatch) => {
      const response = await ApiTransferOptionalSubjectMarks.TransferOptionalSubjectMarks(data);
   
      dispatch(TransferOptionalSubjectMarksSlice.actions.RTransferOptionalSubjectMarks(response.data));
    };





export default TransferOptionalSubjectMarksSlice.reducer;