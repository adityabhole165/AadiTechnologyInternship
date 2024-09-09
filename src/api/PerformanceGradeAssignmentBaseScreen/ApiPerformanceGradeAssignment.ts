import { IGetAllDocumentsListBody, IGetAllDocumentsListResult, IGetAllUsersReportingToGivenUserBody, IGetAllUsersReportingToGivenUserResult, IGetAllYearsBody, IGetAllYearsResult, IGetPerformanceEvaluationDetailsBody, IGetPerformanceEvaluationDetailsResult, IGetUserInvestmentMethodDetailsBody, IGetUserInvestmentMethodDetailsResult, IPublishStaffPerformanceDetailsBody, ISaveStaffPerformanceEvalDetailsBody, ISubmitStaffPerformanceDetailsBody } from 'src/interfaces/PerformanceGradeAssignmentBaseScreen/IPerformanceGradeAssignment';
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

const SaveStaffPerformanceEvalDetailsApi = (data: ISaveStaffPerformanceEvalDetailsBody) => {
    return http.post<string>('Teacher/SaveStaffPerformanceEvalDetails', data);
}

const SubmitStaffPerformanceDetailsApi = (data: ISubmitStaffPerformanceDetailsBody) => {
    return http.post<string>('Teacher/SubmitStaffPerformanceDetails', data);
}

const PublishStaffPerformanceDetailsApi = (data: IPublishStaffPerformanceDetailsBody) => {
    return http.post<string>('Teacher/PublishStaffPerformanceDetails', data);
}
const PerformanceGradeAssignmentAPI = {
    GetAllYearsApi,
    GetAllUsersReportingToGivenUserApi,
    GetPerformanceEvaluationDetailsApi,
    GetUserInvestmentMethodDetailsApi,
    GetAllDocumentsListApi,
    SaveStaffPerformanceEvalDetailsApi,
    SubmitStaffPerformanceDetailsApi,
    PublishStaffPerformanceDetailsApi

};
export default PerformanceGradeAssignmentAPI;