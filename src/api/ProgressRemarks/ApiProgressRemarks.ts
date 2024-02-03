import {
  IAllPrimaryClassTeachersBody,
  IAllPrimaryClassTeachersResult,
  IGetAllStudentswiseRemarkDetailsBody,
  IGetAllStudentswiseRemarkDetailsResult,
  IGetTestwiseTermBody,
  IGetTestwiseTermResult,
  IStudentListDropDownResult,
  IStudentListDropDowntBody,
  IStudentswiseRemarkDetailsToExportBody,
  IStudentswiseRemarkDetailsToExportResult,
  IUpdateAllStudentsRemarkDetailsBody
} from 'src/interfaces/ProgressRemarks/IProgressRemarks';
import http from '../../requests/SchoolService/schoolServices';

const ClassTeachers = (data: IAllPrimaryClassTeachersBody) => {
  return http.post<IAllPrimaryClassTeachersResult[]>(
    'Teacher/GetAllPrimaryClassTeachers1',
    data
  );
};

const GetTestwiseTerm = (data: IGetTestwiseTermBody) => {
  return http.post<IGetTestwiseTermResult[]>('Teacher/GetTestwiseTerm', data);
};

const StudentswiseRemarkDetailsToExport = (
  data: IStudentswiseRemarkDetailsToExportBody
) => {
  return http.post<IStudentswiseRemarkDetailsToExportResult>(
    'Teacher/GetStudentswiseRemarkDetailsToExport',
    data
  );
};

const UpdateAllStudentsRemarkDetails = (
  data: IUpdateAllStudentsRemarkDetailsBody
) => {
  return http.post<''>('Teacher/UpdateAllStudentsRemarkDetails', data);
};

const StudentListDropDown = (data: IStudentListDropDowntBody) => {
  return http.post<IStudentListDropDownResult[]>(
    'Teacher/GetStudentListToAssignRemark',
    data
  );
};

const GetAllStudentswiseRemarkDetails = (
  data: IGetAllStudentswiseRemarkDetailsBody
) => {
  return http.post<IGetAllStudentswiseRemarkDetailsResult[]>(
    'Teacher/GetAllStudentswiseRemarkDetails',
    data
  );
};

const ApiProgressRemark = {
  ClassTeachers,
  GetTestwiseTerm,
  StudentswiseRemarkDetailsToExport,
  UpdateAllStudentsRemarkDetails,
  StudentListDropDown,
  GetAllStudentswiseRemarkDetails
};
export default ApiProgressRemark;
