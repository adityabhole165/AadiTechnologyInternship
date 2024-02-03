import {
  ISaveStudentDetailsForSupportBody,
  ISaveStudentDetailsForSupportResult
} from 'src/interfaces/Student/ISupport';
import http from '../../requests/SchoolService/schoolServices';

const SaveSupportapi = (data: ISaveStudentDetailsForSupportBody) => {
  return http.post<ISaveStudentDetailsForSupportResult>(
    'SaveStudentDetailsForSupport',
    data
  );
};
const ApiSupport = {
  SaveSupportapi
};
export default ApiSupport;
