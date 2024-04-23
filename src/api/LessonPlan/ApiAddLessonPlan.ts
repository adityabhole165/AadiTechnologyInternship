import {
  IAddOrEditLessonPlanDetailsBody, IAddOrEditLessonPlanDetailsResult,
  IClassListBody,
  IClassListResult,
  ISaveApproverCommentBody,
  ISaveLessonPlanBody,
  ISubmitLessonPlanBody
} from 'src/interfaces/LessonPlan/IAddLessonPlan';
import http from '../../requests/SchoolService/schoolServices';

const ClassList = (data: IClassListBody) => {
  return http.post<IClassListResult[]>('Teacher/GetClassesForLessonPlan', data);
};

const AddOrEditLessonPlanDetails = (data: IAddOrEditLessonPlanDetailsBody) => {
  return http.post<IAddOrEditLessonPlanDetailsResult>('Teacher/AddOrEditLessonPlanDetails', data);
};
const SaveLessonPlanapi = (data: ISaveLessonPlanBody) => {
  return http.post<string>('Teacher/SaveLessonPlan', data);
};
const SubmitLessonPlanapi = (data: ISubmitLessonPlanBody) => {
  return http.post<string>('Teacher/SubmitLessonPlan', data);
};
const SaveApproverCommentapi = (data: ISaveApproverCommentBody) => {
  return http.post<string>('Teacher/SaveApproverComment', data);
};
const UpdateLessonPlanDateapi = (data: ISaveApproverCommentBody) => {
  return http.post<string>('Teacher/UpdateLessonPlanDate', data);
};

const AddLessonPlanApi = {
  ClassList,
  AddOrEditLessonPlanDetails,
  SaveLessonPlanapi,
  SubmitLessonPlanapi,
  SaveApproverCommentapi,
  UpdateLessonPlanDateapi
};

export default AddLessonPlanApi;
