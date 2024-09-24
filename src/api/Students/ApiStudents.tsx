import { IGetStandardDivisionOfTeacherBody, IGetStandardDivisionOfTeacherResult, IGetStudentsListBody, IGetStudentsListResult } from 'src/interfaces/Students/IStudents';
import http from '../../requests/SchoolService/schoolServices';

const GetStandardDivisionOfTeacherApi = (data: IGetStandardDivisionOfTeacherBody) => {
    return http.post<IGetStandardDivisionOfTeacherResult[]>('Teacher/GetStandardDivisionOfTeacher', data);
}

const GetStudentsListApi = (data: IGetStudentsListBody) => {
    return http.post<IGetStudentsListResult[]>('Teacher/StudentsList', data);
}

const GetStudentsDataAPI = {
    GetStandardDivisionOfTeacherApi,
    GetStudentsListApi
};
export default GetStudentsDataAPI;