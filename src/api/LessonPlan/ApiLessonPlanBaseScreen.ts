import http from "../../requests/SchoolService/schoolServices";
import { IGetLessonPlanListBody,IGetLessonPlanListResult ,IDeleteLessonPlanBody} from "src/interfaces/LessonPlan/ILessonPlanBaseScreen";

const LessonPlanList = (data:IGetLessonPlanListBody) => {
    return http.post<IGetLessonPlanListResult[]>('Teacher/GetLessonPlanList',data);
};

const DeleteLessonPlan = (data:IDeleteLessonPlanBody) => {
    return http.post('Teacher/DeleteLessonPlan',data);
};

const LessonPlanApi ={
    LessonPlanList,
    DeleteLessonPlan
}

export default LessonPlanApi