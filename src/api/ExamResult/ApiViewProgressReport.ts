import {
    IGetAllStudentsTestProgressSheetBody,
    IGetAllStudentsTestProgressSheetResult,
} from 'src/interfaces/ExamResult/IViewProgressReport';
import http from '../../requests/SchoolService/schoolServices';


const StudentProgressSheet = (data: IGetAllStudentsTestProgressSheetBody) => {
    return http.post<IGetAllStudentsTestProgressSheetResult>('Teacher/GetAllStudentsTestProgressSheet', data);
};

const ApiViewProgressReport = {
    StudentProgressSheet
};
export default ApiViewProgressReport;
