import {
    IClassTeacherBody, IClassTeacherResult,
    IGetAllStudentTestprogressBody, IGetAllStudentTestprogressResult,
    IGetPagedStudentBody,
    IGetPagedStudentResult,
    IGetStudentNameListBody, IGetStudentNameListResult, IGetsingleStudentBody,
    IGetsingleStudentresult,
    IUnpublishedTestexamBody, IUnpublishedTestexamResult,
    IconfiguredExamBody, IconfiguredExamResult
} from 'src/interfaces/VeiwResultAll/IViewResultAll';
import http from '../../requests/SchoolService/schoolServices';
const ClassTeacherList = (data: IClassTeacherBody) => {
    return http.post<IClassTeacherResult[]>('Teacher/GetClassTeachersDropdown', data);
};

const GetStudentNameResult = (data: IGetStudentNameListBody) => {
    return http.post<IGetStudentNameListResult[]>('Teacher/GetStudentNameDropdown', data);
};

const GetsingleStudentResult = (data: IGetsingleStudentBody) => {
    return http.post<IGetsingleStudentresult>('Teacher/GetStudentResult', data);
};

const GetAllStudentResult = (data: IGetAllStudentTestprogressBody) => {
    return http.post<IGetAllStudentTestprogressResult[]>('Teacher/GetAllStudentsTestProgressSheet', data);
};

const Getisconfigred = (data: IconfiguredExamBody) => {
    return http.post<IconfiguredExamResult>('Teacher/AllConffguredTestPublished', data);
};
const Getunplishedexam = (data: IUnpublishedTestexamBody) => {
    return http.post<IUnpublishedTestexamResult[]>('Teacher//AllUnpublishedTestForStdDiv', data);
};
const GetResultnotgenrate = (data: IGetPagedStudentBody) => {
    return http.post<IGetPagedStudentResult[]>('Homework/GetPagedStudentResult', data);
};

const VeiwResultAll = {
    ClassTeacherList,
    GetStudentNameResult,
    GetsingleStudentResult,
    GetAllStudentResult,
    Getisconfigred,
    Getunplishedexam,
    GetResultnotgenrate
};
export default VeiwResultAll;