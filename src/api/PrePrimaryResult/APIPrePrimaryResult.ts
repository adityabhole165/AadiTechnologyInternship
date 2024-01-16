import http from "../../requests/SchoolService/schoolServices";
import { IGetPrePrimaryResultBody,IGetPrePrimaryResultResult,IGetAssessmentBody,IGetAssessmentResult,IGetTeacherXseedSubjectsBody,IGetTeacherXseedSubjectsResult } from "src/interfaces/PrePrimaryResult/IPrePrimaryResult";

const PrePrimaryResultApi = (data:IGetPrePrimaryResultBody) => {
    return http.post<IGetPrePrimaryResultResult[]>('Teacher/GetClassTeacherss',data);
};
const AssessmentApi = (data:IGetAssessmentBody) => {
    return http.post<IGetAssessmentResult[]>('Teacher/GetAssessmentDropdown',data);
};
const TeacherXseedSubjectsApi = (data:IGetTeacherXseedSubjectsBody) => {
    return http.post<IGetTeacherXseedSubjectsResult[]>('Teacher/GetTeacherXseedSubjects',data);
};

const ApiPrePrimaryResult ={
    
    PrePrimaryResultApi,
    AssessmentApi,
    TeacherXseedSubjectsApi,
}
   
 
export default ApiPrePrimaryResult;
