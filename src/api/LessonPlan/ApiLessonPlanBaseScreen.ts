import {
  IDeleteLessonPlanBody,
  IGetLessonPlanDetailsForReportBody,
  IGetLessonPlanListBody,
  IGetLessonPlanListResult
} from 'src/interfaces/LessonPlan/ILessonPlanBaseScreen';
import http from '../../requests/SchoolService/schoolServices';

const LessonPlanList = (data: IGetLessonPlanListBody) => {
  return http.post<IGetLessonPlanListResult[]>(
    'Teacher/GetLessonPlanList',
    data
  );
};

const DeleteLessonPlan = (data: IDeleteLessonPlanBody) => {
  return http.post('Teacher/DeleteLessonPlan', data);
};
const LessonPlanReport = (data: IGetLessonPlanDetailsForReportBody) => {
  return http.post('Teacher/GetLessonPlanDetailsForReport', data);
};

const LessonPlanApi = {
  LessonPlanList,
  DeleteLessonPlan,
  LessonPlanReport
};

export default LessonPlanApi;
