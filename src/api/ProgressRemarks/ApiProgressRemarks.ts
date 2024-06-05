import {
  IAllPrimaryClassTeachersBody,
  IAllPrimaryClassTeachersResult,
  IGetAllGradesForStandardBody, IGetAllGradesForStandardResult,
  IGetAllStudentsForProgressRemarkBody,
  IGetAllStudentsForProgressRemarkResult,
  IGetAllStudentswiseRemarkDetailsNewBody,
  IGetAllStudentswiseRemarkDetailsNewResult,
  IGetConfiguredMaxRemarkLengthResult,
  IGetFinalPublishedExamStatusBody,
  IGetFinalPublishedExamStatusResult,
  IGetRemarkTemplateDetailsBody,
  IGetRemarkTemplateDetailsResult,
  IGetRemarksCategoryBody, IGetRemarksCategoryResult,
  IGetTestwiseTermBody,
  IGetTestwiseTermResult,
  IStudentListDropDownResult,
  IStudentListDropDowntBody,
  IStudentswiseRemarkDetailsToExportBody,
  IStudentswiseRemarkDetailsToExportResult,
  IUpdateAllStudentsRemarkDetailsBody,
  IGetConfiguredMaxRemarkLengthBody
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

const GetAllStudentswiseRemarkDetails = (data: IGetAllStudentswiseRemarkDetailsNewBody) => {
  return http.post<IGetAllStudentswiseRemarkDetailsNewResult>(
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

const GetAllStudentsForProgressRemark = (data: IGetAllStudentsForProgressRemarkBody) => {
  return http.post<IGetAllStudentsForProgressRemarkResult[]>(
    'Teacher/GetStudentListToProgressRemark',
    data
  );
};

const GetFinalPublishedExamStatus = (data: IGetFinalPublishedExamStatusBody) => {
  return http.post<IGetFinalPublishedExamStatusResult>(
    'Teacher/GetFinalPublishedExamStatus',
    data
  );
};


const GetConfiguredMaxRemarkLength = (data: IGetConfiguredMaxRemarkLengthBody) => {
  return http.post<IGetConfiguredMaxRemarkLengthResult>(
    'Teacher/GetConfiguredMaxRemarkLength',
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
  GetRemarksTemplateDetail,
  GetAllStudentsForProgressRemark,
  GetFinalPublishedExamStatus,
  GetConfiguredMaxRemarkLength
};
export default ApiProgressRemark;
