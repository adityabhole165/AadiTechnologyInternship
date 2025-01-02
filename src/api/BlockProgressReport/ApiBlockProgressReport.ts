import { IAllClassTeachersBody, IAllClassTeachersResult, IBlockUnBlockStudentsBody, IBlockUnBlockStudentsResult, IBlockUnBlockUpdateBtnBody, IBlockUnBlockUpdateBtnResult } from "src/interfaces/BlockProgressReport/IBlockProgressReport";
import http from '../../requests/SchoolService/schoolServices';

const BlockUnBlockStudents = (data: IBlockUnBlockStudentsBody) => {
    return http.post<IBlockUnBlockStudentsResult>('School/BlockUnBlockStudents', data);
};

const AllClassTeachers = (data: IAllClassTeachersBody) => {
    return http.post<IAllClassTeachersResult[]>('School/AllClassTeachers', data);
};

const BlockUnblockUpdateBtn = (data: IBlockUnBlockUpdateBtnBody) => {
    return http.post<IBlockUnBlockUpdateBtnResult>('Teacher/BlockUnBlockUpdateBtn', data);
};

const ApiBlockProgressReport = {
    BlockUnBlockStudents,
    AllClassTeachers,
    BlockUnblockUpdateBtn

};
export default ApiBlockProgressReport;