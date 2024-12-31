import { IAllClassTeachersBody, IAllClassTeachersResult, IBlockUnBlockStudentsBody, IBlockUnBlockStudentsResult } from "src/interfaces/BlockProgressReport/IBlockProgressReport";
import http from '../../requests/SchoolService/schoolServices';

const BlockUnBlockStudents = (data: IBlockUnBlockStudentsBody) => {
    return http.post<IBlockUnBlockStudentsResult>('School/BlockUnBlockStudents', data);
};

const AllClassTeachers = (data: IAllClassTeachersBody) => {
    return http.post<IAllClassTeachersResult[]>('School/AllClassTeachers', data);
};

const ApiBlockProgressReport = {
    BlockUnBlockStudents,
    AllClassTeachers

};
export default ApiBlockProgressReport;