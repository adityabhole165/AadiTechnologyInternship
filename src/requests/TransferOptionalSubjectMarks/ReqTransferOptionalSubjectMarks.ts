import { createSlice } from '@reduxjs/toolkit';
import ApiTransferOptionalSubjectMarks from 'src/api/TransferOptionalSubjectMarks/ApiTransferOptionalSubjectMarks';
import { IGetClassTeachersBody, IGetOptionalSubjectsForMarksTransferBody, IGetStudentsToTransferMarksBody, ITransferOptionalSubjectMarksBody } from 'src/interfaces/TransferOptionalSubjectMarks/ITransferOptionalSubjectMarks';

import { AppThunk } from 'src/store';

const TransferOptionalSubjectMarksSlice = createSlice({
  name: 'Transfer Optional Subject Marks',
  initialState: {
    ISGetClassTeachers: [],
    ISStudentsToTransferMarks:[],
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
      let abc = [{ Id: '0', Name: 'Select', Value: '0' }];
      response.data.map((item, i) => {
        abc.push({
          Id: item.Teacher_Id,
          Name: item.TeacherName,
          Value: item.SchoolWise_Standard_Division_Id
        });
      });
      dispatch(TransferOptionalSubjectMarksSlice.actions.RGetClassTeachers(abc));
    };


export const CDAStudentsToTransferMarks = (data: IGetStudentsToTransferMarksBody): AppThunk => async (dispatch) => {
    const response = await ApiTransferOptionalSubjectMarks.GetStudentsToTransferMarks(data);


    const subjectsByRollNo = {};

    response.data.TransferStudentSubjectsMarkDetailsList.forEach(item => {
       
        if (!subjectsByRollNo[item.RollNo]) {
            subjectsByRollNo[item.RollNo] = [];
        }
       
        subjectsByRollNo[item.RollNo].push(item.CurrentApplicableSubjects);
    });

  
    const TransferStudentSubjectsMarkDetailsList = Object.keys(subjectsByRollNo).map(rollNo => ({
        Text1: response.data.TransferStudentSubjectsMarkDetailsList.find(item => item.RollNo === rollNo)?.RegNo || '', 
        Text2: rollNo,
        Text3: response.data.TransferStudentSubjectsMarkDetailsList.find(item => item.RollNo === rollNo)?.StudentName || '', 
        Text4: subjectsByRollNo[rollNo].join(', ') 
    }));

    dispatch(TransferOptionalSubjectMarksSlice.actions.RStudentsToTransferMarks(TransferStudentSubjectsMarkDetailsList));
};


    export const CDAOptionalSubjectsForMarksTransfer =
    (data: IGetOptionalSubjectsForMarksTransferBody): AppThunk =>
      async (dispatch) => {
        const response = await ApiTransferOptionalSubjectMarks.GetOptionalSubjectsForMarksTransfer(data);
        let abc = response.data.map((item, i) => {
          return {
            SubjectId: item.SubjectId,
            StandardDivisionId: item.SchoolWiseStandardDivisionId,
            SubjectGroupId: item.SubjectGroupId,
            StudentId:item.ChildOptionalSubjectId
          };
        });
        dispatch(TransferOptionalSubjectMarksSlice.actions.ROptionalSubjectsForMarksTransfer(abc));
      };
  


    export const CDATransferOptionalSubjectMarks =
  (data: ITransferOptionalSubjectMarksBody): AppThunk =>
    async (dispatch) => {
      const response = await ApiTransferOptionalSubjectMarks.TransferOptionalSubjectMarks(data);
   
      dispatch(TransferOptionalSubjectMarksSlice.actions.RTransferOptionalSubjectMarks(response.data));
    };





export default TransferOptionalSubjectMarksSlice.reducer;