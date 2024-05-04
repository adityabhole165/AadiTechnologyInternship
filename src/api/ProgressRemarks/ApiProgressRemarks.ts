import {
  IAllPrimaryClassTeachersBody,
  IAllPrimaryClassTeachersResult,
  IGetAllGradesForStandardBody, IGetAllGradesForStandardResult,
  IGetAllStudentswiseRemarkDetailsBody,
  IGetAllStudentswiseRemarkDetailsResult,
  IGetRemarkTemplateDetailsBody,
  IGetRemarkTemplateDetailsResult,
  IGetRemarksCategoryBody, IGetRemarksCategoryResult,
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
const GetAllGradeForStandard = (data: IGetAllGradesForStandardBody) => {
  return http.post<IGetAllGradesForStandardResult[]>(
    'Teacher/GetAllGradesForStandard',
    data
  );
};
const GetRemarksCategory = (data: IGetRemarksCategoryBody) => {
  return http.post<IGetRemarksCategoryResult[]>(
    'Teacher/GetRemarksCategory',
    data
  );
};
const GetRemarksTemplateDetail = (data: IGetRemarkTemplateDetailsBody) => {
  return http.post<IGetRemarkTemplateDetailsResult[]>(
    'Teacher/GetRemarkTemplateDetails',
    data
  );
};
const ApiProgressRemark = {
  ClassTeachers,
  GetTestwiseTerm,
  StudentswiseRemarkDetailsToExport,
  UpdateAllStudentsRemarkDetails,
  StudentListDropDown,
  GetAllStudentswiseRemarkDetails,
  GetAllGradeForStandard,
  GetRemarksCategory,
  GetRemarksTemplateDetail
};
export default ApiProgressRemark;
