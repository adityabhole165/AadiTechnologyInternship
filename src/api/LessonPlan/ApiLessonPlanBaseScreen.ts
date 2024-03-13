import {
  IAddOrEditLessonPlanDetailsBody,
  IAddOrEditLessonPlanDetailsResult,
  IDeleteLessonPlanBody,
  IGetAllTeachersOfLessonPlanBody,
  IGetAllTeachersOfLessonPlanResult,
  IGetLessonPlanDetailsForReportBody,
  IGetLessonPlanListBody,
  IGetLessonPlanListResult
} from 'src/interfaces/LessonPlan/ILessonPlanBaseScreen';
import http from '../../requests/SchoolService/schoolServices';

const LessonPlanList = (data: IGetLessonPlanListBody) => {
  return http.post<IGetLessonPlanListResult>(
    'Teacher/GetLessonPlanConfigDetailss',
    data
  );
};

const DeleteLessonPlan = (data: IDeleteLessonPlanBody) => {
  return http.post('Teacher/DeleteLessonPlan', data);
};
const LessonPlanReport = (data: IGetLessonPlanDetailsForReportBody) => {
  return http.post('Teacher/GetLessonPlanDetailsForReport', data);
};

const AddOrEditLessonPlanDetails = (data: IAddOrEditLessonPlanDetailsBody) => {
  return http.post<IAddOrEditLessonPlanDetailsResult>('Teacher/AddOrEditLessonPlanDetails', data);
};
const GetAllTeachersOfLessonPlan = (data: IGetAllTeachersOfLessonPlanBody) => {
  return http.post<IGetAllTeachersOfLessonPlanResult[]>('Teacher/GetAllTeachersOfLessonPlan', data);
};


const LessonPlanApi = {
  LessonPlanList,
  DeleteLessonPlan,
  LessonPlanReport,
  AddOrEditLessonPlanDetails,
  GetAllTeachersOfLessonPlan
};

export default LessonPlanApi;
