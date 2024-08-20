
import { IGetAbsentStudentBody, IGetAbsentStudentResult } from 'src/interfaces/AbsentStudentPopCp/IAbsentStudent';
import http from '../../requests/SchoolService/schoolServices';

const GetAbsentStudentDetailsPopup = (data: IGetAbsentStudentBody) => {
    return http.post<IGetAbsentStudentResult>('Teacher/GetAbsentStudentDetailsPopup', data);

};


const AbsentStudentapi = {
    GetAbsentStudentDetailsPopup
};

export default AbsentStudentapi;