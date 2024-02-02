import {
  GetStudentTransportDetailsBody,
  GetStudentTransportDetailsResult
} from 'src/interfaces/Student/ITransportDetails';
import http from '../../requests/SchoolService/schoolServices';

const TransportDetailsapi = (data: GetStudentTransportDetailsBody) => {
  return http.post<GetStudentTransportDetailsResult>(
    'Transport/GetStudentTransportDetails',
    data
  );
};
const ApiTransportDetails = {
  TransportDetailsapi
};
export default ApiTransportDetails;
