import http from "../../requests/SchoolService/schoolServices";
import { IGetLessonPlanListBody,IGetLessonPlanListResult } from "src/interfaces/LessonPlan/ILessonPlanBaseScreen";

const LessonPlanList = (data:IGetLessonPlanListBody) => {
    return http.post<IGetLessonPlanListResult[]>('Teacher/GetLessonPlanList',data);
};

const LessonPlanApi ={
    LessonPlanList,
    
}

export default LessonPlanApi