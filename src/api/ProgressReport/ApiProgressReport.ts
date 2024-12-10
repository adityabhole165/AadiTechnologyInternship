import { GetSchoolSettingsBody, GetSchoolSettingsResult, IGetLatestExamIdBody,IGetTeachersForPrePrimaryProgressReportBody,IGetAcademicYearsOfStudentBody,IProgressReportBody, IGetAcademicYearsOfStudentResult, IGetAllMarksGradeConfigurationBody, IGetAllMarksGradeConfigurationResult, IGetAllStudentsProgressSheetBody, IGetAllStudentsProgressSheetResult, IGetClassTeachersBody, IGetClassTeachersResult, IGetOldStudentDetailsBody, IGetOldStudentDetailsResult, IGetPassedAcademicYearsBody, IGetPassedAcademicYearsResult, IGetProgressReportFileNameResult, IGetSchoolSettingValuesBody, IGetSchoolSettingValuesResult, IGetStudentNameDropdownBody, IGetStudentNameDropdownResult, IsGradingStandarBody, IsTestPublishedForStdDivBody, IsTestPublishedForStudentBody, IStudentProgressReportBody, IStudentProgressReportResult, GetIsPrePrimaryBody, DownloadButtonStateDetailsResult, IGetPrePrimaryExamPublishStatusBody, IgetIsTermExamPublishedBody, IgetIsFinalResultPublishedBody, IGetTeachersForPrePrimaryProgressReportresult } from "src/interfaces/ProgressReport/IprogressReport";
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


const GetProgressReport = (data:IProgressReportBody) => {
  return http.post<IGetProgressReportFileNameResult>('https://mobileappapi.regulusit.net/Student/GetFileNameForProgressReport',data);
};
const GetIsPrePrimary = (data: GetIsPrePrimaryBody) => {
  return http.post(
    'School/GetIsPrePrimary',
    data
  );
};



const GetPrePrimaryExamPublishStatus = (data: IGetPrePrimaryExamPublishStatusBody) => {
  return http.post<DownloadButtonStateDetailsResult>(
    'ProgressReport/GetPrePrimaryExamPublishStatus',
    data
  );
};

const getIsTermExamPublished = (data: IgetIsTermExamPublishedBody) => {
  return http.post(
    'ProgressReport/getIsTermExamPublished',
    data
  );
};


const getIsFinalResultPublished = (data: IgetIsFinalResultPublishedBody) => {
  return http.post(
    'ProgressReport/getIsFinalResultPublished',
    data
  );
};
const GetLatestExamId = (data: IGetLatestExamIdBody) => {
  return http.post(
    'Teacher/GetLatestExamId',
    data
  );
};


const ApiGetTeachersForPrePrimaryProgressReport = (data: IGetTeachersForPrePrimaryProgressReportBody) => {
  return http.post<IGetTeachersForPrePrimaryProgressReportresult>(
    'Teacher/GetTeachersForPrePrimaryProgressReport',
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
  GetSchoolSettingValues,
  GetProgressReport,
  GetIsPrePrimary,
  GetPrePrimaryExamPublishStatus,
  getIsTermExamPublished,
  getIsFinalResultPublished,
  GetLatestExamId,
  ApiGetTeachersForPrePrimaryProgressReport
};
export default ApiProgressReport;