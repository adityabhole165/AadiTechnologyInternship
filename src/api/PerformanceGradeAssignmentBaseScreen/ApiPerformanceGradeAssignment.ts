import { IGetAllDocumentsListBody, IGetAllDocumentsListResult, IGetAllUsersReportingToGivenUserBody, IGetAllUsersReportingToGivenUserResult, IGetAllYearsBody, IGetAllYearsResult, IGetPerformanceEvaluationDetailsBody, IGetPerformanceEvaluationDetailsResult, IGetUserInvestmentMethodDetailsBody, IGetUserInvestmentMethodDetailsResult } from 'src/interfaces/PerformanceGradeAssignmentBaseScreen/IPerformanceGradeAssignment';
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

const GetUserInvestmentMethodDetailsApi = (data: IGetUserInvestmentMethodDetailsBody) => {
    return http.post<IGetUserInvestmentMethodDetailsResult>('Teacher/GetUserInvestmentMethodDetails', data);
}

const GetAllDocumentsListApi = (data: IGetAllDocumentsListBody) => {
    return http.post<IGetAllDocumentsListResult[]>('Teacher/GetAllDocumentsList', data);
}
const PerformanceGradeAssignmentAPI = {
    GetAllYearsApi,
    GetAllUsersReportingToGivenUserApi,
    GetPerformanceEvaluationDetailsApi,
    GetUserInvestmentMethodDetailsApi,
    GetAllDocumentsListApi

};
export default PerformanceGradeAssignmentAPI;