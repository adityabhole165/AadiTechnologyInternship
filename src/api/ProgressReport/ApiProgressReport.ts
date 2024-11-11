import { GetSchoolSettingsBody, GetSchoolSettingsResult, IGetAcademicYearsOfStudentBody, IGetAcademicYearsOfStudentResult, IGetAllMarksGradeConfigurationBody, IGetAllMarksGradeConfigurationResult, IGetAllStudentsProgressSheetBody, IGetAllStudentsProgressSheetResult, IGetClassTeachersBody, IGetClassTeachersResult, IGetOldStudentDetailsBody, IGetOldStudentDetailsResult, IGetPassedAcademicYearsBody, IGetPassedAcademicYearsResult, IGetSchoolSettingValuesBody, IGetSchoolSettingValuesResult, IGetStudentNameDropdownBody, IGetStudentNameDropdownResult, IsGradingStandarBody, IsTestPublishedForStdDivBody, IsTestPublishedForStudentBody, IStudentProgressReportBody, IStudentProgressReportResult } from "src/interfaces/ProgressReport/IprogressReport";
import http from '../../requests/SchoolService/schoolServices';

const GetClassTeachers = (data: IGetClassTeachersBody) => {
  return http.post<IGetClassTeachersResult[]>(
    'Teacher/GetClassTeachers',
    data
  );
};


const GetStudentNameDropdown = (data: IGetStudentNameDropdownBody) => {
  return http.post<IGetStudentNameDropdownResult[]>(
    'Teacher/GetStudentNameDropdown',
    data
  );
};

const StudentProgressReport = (data: IStudentProgressReportBody) => {
  return http.post<IStudentProgressReportResult>(
    'Teacher/StudentProgressReport',
    data
  );
};

const GetPassedAcademicYears = (data: IGetPassedAcademicYearsBody) => {
  return http.post<IGetPassedAcademicYearsResult[]>(
    'Teacher/GetPassedAcademicYears',
    data
  );
};


const GetAllMarksGradeConfiguration = (data: IGetAllMarksGradeConfigurationBody) => {
  return http.post<IGetAllMarksGradeConfigurationResult>(
    'Teacher/GetAllMarksGradeConfiguration',
    data
  );
};

const IsGradingStandard = (data: IsGradingStandarBody) => {
  return http.post(
    'Teacher/IsGradingStandard',
    data
  );
};
const IsTestPublishedForStdDiv = (data: IsTestPublishedForStdDivBody) => {
  return http.post(
    'Teacher/IsTestPublishedForStdDiv',
    data
  );
};

const GetAllStudentsProgressSheet = (data: IGetAllStudentsProgressSheetBody) => {
  return http.post<IGetAllStudentsProgressSheetResult>(
    'Teacher/GetAllStudentsProgressSheet',
    data
  );
};


const IsTestPublishedForStudent = (data: IsTestPublishedForStudentBody) => {
  return http.post(
    'Teacher/IsTestPublishedForStudent',
    data
  );
};





const GetSchoolSettings = (data: GetSchoolSettingsBody) => {
  return http.post<GetSchoolSettingsResult[]>(
    'School/GetSchoolSettings',
    data
  );
};


const GetAcademicYearsOfStudent = (data: IGetAcademicYearsOfStudentBody) => {
  return http.post<IGetAcademicYearsOfStudentResult>(
    'GetAcademicYearsOfStudent',
    data
  );
};

const GetOldStudentDetails = (data: IGetOldStudentDetailsBody) => {
  return http.post<IGetOldStudentDetailsResult>(
    'Student/GetOldStudentDetails',
    data
  );
};


const GetSchoolSettingValues = (data: IGetSchoolSettingValuesBody) => {
  return http.post<IGetSchoolSettingValuesResult>(
    'School/GetSchoolSettingValues',
    data
  );
};

const ApiProgressReport = {
  GetClassTeachers,
  GetStudentNameDropdown,
  StudentProgressReport,
  GetPassedAcademicYears,
  GetAllMarksGradeConfiguration,
  IsGradingStandard,
  IsTestPublishedForStdDiv,
  IsTestPublishedForStudent,
  GetSchoolSettings,
  GetAllStudentsProgressSheet,
  GetAcademicYearsOfStudent,
  GetOldStudentDetails,
  GetSchoolSettingValues
};
export default ApiProgressReport;