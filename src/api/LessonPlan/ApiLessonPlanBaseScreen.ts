import http from "../../requests/SchoolService/schoolServices";
import { IGetLessonPlanListBody,IGetLessonPlanListResult ,IDeleteLessonPlanBody,IGetLessonPlanDetailsForReportBody,IGetLessonPlanDetailsForReportResult} from "src/interfaces/LessonPlan/ILessonPlanBaseScreen";

const LessonPlanList = (data:IGetLessonPlanListBody) => {
    return http.post<IGetLessonPlanListResult[]>('Teacher/GetLessonPlanList',data);
};

const DeleteLessonPlan = (data:IDeleteLessonPlanBody) => {
    return http.post('Teacher/DeleteLessonPlan',data);
};
const LessonPlanReport = (data:IGetLessonPlanDetailsForReportBody)=>{
    return http.post('Teacher/GetLessonPlanDetailsForReport',data);
}

const LessonPlanApi ={
    LessonPlanList,
    DeleteLessonPlan,
    LessonPlanReport
}

export default LessonPlanApi