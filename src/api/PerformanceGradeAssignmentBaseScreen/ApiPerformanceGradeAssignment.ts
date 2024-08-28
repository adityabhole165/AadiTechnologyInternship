import { IGetAllUsersReportingToGivenUserBody, IGetAllUsersReportingToGivenUserResult, IGetAllYearsBody, IGetAllYearsResult } from 'src/interfaces/PerformanceGradeAssignmentBaseScreen/IPerformanceGradeAssignment';
import http from '../../requests/SchoolService/schoolServices';

const GetAllYearsApi = (data: IGetAllYearsBody) => {
    return http.post<IGetAllYearsResult[]>('Teacher/GetAllYears', data);
}
const GetAllUsersReportingToGivenUserApi = (data: IGetAllUsersReportingToGivenUserBody) => {
    return http.post<IGetAllUsersReportingToGivenUserResult[]>('Teacher/GetAllUsersReportingToGivenUser', data);
}
const PerformanceGradeAssignmentAPI = {
    GetAllYearsApi,
    GetAllUsersReportingToGivenUserApi

};
export default PerformanceGradeAssignmentAPI;