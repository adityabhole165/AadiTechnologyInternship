import { IGetAllUsersReportingToGivenUserBody, IGetAllUsersReportingToGivenUserResult, IGetAllYearsBody, IGetAllYearsResult, IGetPerformanceEvaluationDetailsBody, IGetPerformanceEvaluationDetailsResult } from 'src/interfaces/PerformanceGradeAssignmentBaseScreen/IPerformanceGradeAssignment';
import http from '../../requests/SchoolService/schoolServices';

const GetAllYearsApi = (data: IGetAllYearsBody) => {
    return http.post<IGetAllYearsResult[]>('Teacher/GetAllYears', data);
}
const GetAllUsersReportingToGivenUserApi = (data: IGetAllUsersReportingToGivenUserBody) => {
    return http.post<IGetAllUsersReportingToGivenUserResult[]>('Teacher/GetAllUsersReportingToGivenUser', data);
}

const GetPerformanceEvaluationDetailsApi = (data: IGetPerformanceEvaluationDetailsBody) => {
    return http.post<IGetPerformanceEvaluationDetailsResult>('Teacher/GetStaffPerformanceEvaluationDetails', data);
}
const PerformanceGradeAssignmentAPI = {
    GetAllYearsApi,
    GetAllUsersReportingToGivenUserApi,
    GetPerformanceEvaluationDetailsApi

};
export default PerformanceGradeAssignmentAPI;