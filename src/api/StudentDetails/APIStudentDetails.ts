import { IGetStandardwiseMinMaxDOBBody, IGetStandardwiseMinMaxDOBResult } from 'src/interfaces/StudentDetails/IStudentDetails';
import http from '../../requests/SchoolService/schoolServices';

const GetStandardwiseMinMaxDOB = (data: IGetStandardwiseMinMaxDOBBody) => {
    return http.post<IGetStandardwiseMinMaxDOBResult>('Teacher/GetStandardwiseMinMaxDOB', data);
};

const APIStudentDetails = {
    GetStandardwiseMinMaxDOB
};

export default APIStudentDetails;
