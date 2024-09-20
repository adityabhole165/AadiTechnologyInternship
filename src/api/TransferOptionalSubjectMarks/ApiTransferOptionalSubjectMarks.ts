
import { IGetClassTeachersBody, IGetClassTeachersResult } from 'src/interfaces/ExamResult/IExamResult';
import { IGetStudentsToTransferMarksBody, ITransferStudentSubjectsMarkDetailsListResult, ITransferOptionalSubjectMarksBody, IGetOptionalSubjectsForMarksTransferBody, IGetOptionalSubjectsForMarksTransferResult } from 'src/interfaces/TransferOptionalSubjectMarks/ITransferOptionalSubjectMarks';
import http from '../../requests/SchoolService/schoolServices';
  
  const GetClassTeachers = (data: IGetClassTeachersBody) => {
    return http.post<IGetClassTeachersResult[]>('Teacher/GetClassTeachersForOptionalSubjectClasses', data);
  };
  
  const GetStudentsToTransferMarks = (data: IGetStudentsToTransferMarksBody) => {
    return http.post<ITransferStudentSubjectsMarkDetailsListResult>('Teacher/GetStudentsToTransferMarks', data);
  };

  const GetOptionalSubjectsForMarksTransfer = (data: IGetOptionalSubjectsForMarksTransferBody) => {
    return http.post<IGetOptionalSubjectsForMarksTransferResult[]>('Teacher/GetOptionalSubjectsForMarksTransfer', data);
  };

  const TransferOptionalSubjectMarks = (data: ITransferOptionalSubjectMarksBody) => {
    return http.post<string>('Teacher/TransferOptionalSubjectMarks', data);
  };
 
  
  const ApiTransferOptionalSubjectMarks = {
    GetClassTeachers,
    GetStudentsToTransferMarks,
    GetOptionalSubjectsForMarksTransfer,
    TransferOptionalSubjectMarks
    
   
  };
  
  export default ApiTransferOptionalSubjectMarks;
  