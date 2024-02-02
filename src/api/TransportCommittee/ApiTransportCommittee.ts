import {
  IGetTransportCommitteeDetailsBody,
  IGetTransportCommitteeDetailsResult
} from 'src/interfaces/Student/ITransportCommittee';
import http from '../../requests/SchoolService/schoolServices';

const GetTransportCommittee = (data: IGetTransportCommitteeDetailsBody) => {
  return http.post<IGetTransportCommitteeDetailsResult>(
    'Student/GetTransportCommitteeDetails',
    data
  );
};

const ApiTransportCommittee = {
  GetTransportCommittee
};
export default ApiTransportCommittee;
