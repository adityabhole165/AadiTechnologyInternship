import {
  IClassListBody,
  IClassListResult
} from 'src/interfaces/LessonPlan/IAddLessonPlan';
import http from '../../requests/SchoolService/schoolServices';

const ClassList = (data: IClassListBody) => {
  return http.post<IClassListResult[]>('Teacher/GetClassForExamDropDown', data);
};

const AddLessonPlanApi = {
  ClassList
};

export default AddLessonPlanApi;
