import { IGenerateTransportFeeEntriesBody, IGetStandardwiseMinMaxDOBBody, IGetStandardwiseMinMaxDOBResult, IGetStudentUIPreConditionMsgBody, IGetStudentUIPreConditionMsgResult, IsClassTeacherBody, IsClassTeacherResult } from 'src/interfaces/StudentDetails/IStudentDetails';
import http from '../../requests/SchoolService/schoolServices';

const GetStandardwiseMinMaxDOB = (data: IGetStandardwiseMinMaxDOBBody) => {
    return http.post<IGetStandardwiseMinMaxDOBResult>('Teacher/GetStandardwiseMinMaxDOB', data);
};

const GetStudentUIPreConditionMsg = (data: IGetStudentUIPreConditionMsgBody) => {
    return http.post<IGetStudentUIPreConditionMsgResult[]>('School/GetStudentUIPreConditionMsg', data);
};

const GetIsClassTeacher = (data: IsClassTeacherBody) => {
    return http.post<IsClassTeacherResult>('School/IsClassTeacher', data);
};
const GetGenerateTransportFeeEntriesBody = (data: IGenerateTransportFeeEntriesBody) => {
    return http.post<''>('School/GenerateTransportFeeEntries', data);
};


const APIStudentDetails = {
    GetStandardwiseMinMaxDOB,
    GetStudentUIPreConditionMsg,
    GetIsClassTeacher,
    GetGenerateTransportFeeEntriesBody
};

export default APIStudentDetails;
