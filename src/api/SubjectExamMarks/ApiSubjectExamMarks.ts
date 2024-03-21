import {
    IGetAllStudentsForMarksAssignmentsBody,
    IGetAllStudentsForMarksAssignmentsResult,IGetSubjectExamMarkslistsBody,IGetSubjectExamMarkslistsResult
    ,IGetAllGradesForSubjectMarkListBody,IGetAllGradesForSubjectMarkListResult,IManageStudentsTestMarkBody,IGetSubjectMarkListBody,IGetSubjectMarkListResult
} from 'src/interfaces/SubjectExamMarks/ISubjectExamMarks';
import http from '../../requests/SchoolService/schoolServices';

const GetSubjectMarkList = (data: IGetSubjectMarkListBody) => {
    return http.post<IGetSubjectMarkListResult>('Teacher/GetSubjectMarkList', data);
};

const GetAllStudentsForMarksAssignments = (data: IGetAllStudentsForMarksAssignmentsBody) => {
    return http.post<IGetAllStudentsForMarksAssignmentsResult[]>('Teacher/GetAllStudentsForMarksAssignments', data);
};

const GetAllGradesForSubjectMarkList = (data: IGetAllGradesForSubjectMarkListBody) => {
    return http.post<IGetAllGradesForSubjectMarkListResult>('Teacher/GetAllGradesForSubjectMarkList', data);
};
const GetSubjectExamMarkslists = (data: IGetSubjectExamMarkslistsBody) => {
    return http.post<IGetSubjectExamMarkslistsResult>('Teacher/GetSubjectExamMarkslists', data);
};
const ManageStudentsTestMark = (data: IManageStudentsTestMarkBody) => {
    return http.post<string>('Teacher/ManageStudentsTestMark', data);
};
const SubjectExamMarksApi = {
    GetAllStudentsForMarksAssignments,
    GetSubjectMarkList,
    GetAllGradesForSubjectMarkList,
    GetSubjectExamMarkslists,
    ManageStudentsTestMark
    
};
export default SubjectExamMarksApi;
