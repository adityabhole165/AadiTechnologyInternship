import IGetAllStandards, {
  GetExamsListResult,
  GetStandardListResult,
  ICopyStandardTestBody,
  ICopyStandardTestResult,
  IGetExamScheduleBody,
  IGetExamScheduleResult,
  IGetExamsList,
  IGetStandardsForExamCopyBody,
  IGetStandardsForExamCopyResult,
  IGetSubjectExamScheduleBody,
  IGetSubjectExamScheduleResult,
  IInsertExamScheduleBody,
  IInsertExamScheduleResult,
  ISumbitExamScheduleBody,
  ISumbitExamScheduleResult,
  IUpdateExamScheduleInstructionsBody,
  IUpdateExamScheduleInstructionsResult,
  IUpdateStandardWiseExamScheduleBody,
  IUpdateStandardWiseExamScheduleResult
} from 'src/interfaces/Teacher/TExamSchedule';
import http from '../../requests/SchoolService/schoolServices';

const GetAllStandards = (data: IGetAllStandards) => {
  return http.post<GetStandardListResult>('School/GetAllStandards', data);
};


const GetExamsList = (data: IGetExamsList) => {
  return http.post<GetExamsListResult>(
    'Teacher/GetExamScheduleForAllStandard',
    data
  );
};

const GetExamScheduleFullAcc = (data: IGetExamScheduleBody) => {
  return http.post<IGetExamScheduleResult>('School/GetExamScheduleFullacc', data);
};
const GetSubjectExamScheduleList = (data: IGetSubjectExamScheduleBody) => {
  return http.post<IGetSubjectExamScheduleResult>('School/getSubjectExamScheduleList', data);
};

const GetStandardsForExamCopy = (data: IGetStandardsForExamCopyBody) => {
  return http.post<IGetStandardsForExamCopyResult>('School/GetStandardsForExamCopy', data);
};
const UpdateExamScheduleInstructions = (data: IUpdateExamScheduleInstructionsBody) => {
  return http.post<IUpdateExamScheduleInstructionsResult>('School/UpdateExamScheduleInstructions', data);
};

const UpdateStandardWiseExamSchedule = (data: IUpdateStandardWiseExamScheduleBody) => {
  return http.post<IUpdateStandardWiseExamScheduleResult>('School/UpdateExamScheduleInstructions', data);
};

const CopyExamschedule = (data: ICopyStandardTestBody) => {
  return http.post<ICopyStandardTestResult>('School/UpdateExamScheduleInstructions', data);
};

const InsertExamSchedule = (data: IInsertExamScheduleBody) => {
  return http.post<IInsertExamScheduleResult>('Teacher/InsertExamSchedule', data);
};
const SumbitExamSchedule = (data: ISumbitExamScheduleBody) => {
  return http.post<ISumbitExamScheduleResult>('Teacher/SumbitExamSchedule', data);
};
const GetTExamResultListApi = {
  GetAllStandards,
  GetExamsList,
  GetExamScheduleFullAcc,
  GetSubjectExamScheduleList,
  GetStandardsForExamCopy,
  UpdateExamScheduleInstructions,
  UpdateStandardWiseExamSchedule,
  CopyExamschedule,
  InsertExamSchedule,
  SumbitExamSchedule
};

export default GetTExamResultListApi;

