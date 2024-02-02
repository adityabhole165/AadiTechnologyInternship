import { IGetPassword } from 'src/interfaces/Authentication/GetPassword';
import http from '../../requests/SchoolService/schoolServices';

const GetPasswordResult = (data: IGetPassword) => {
  return http.post<IGetPassword>('School/GetPassword', data);
};

const GetPasswordApi = {
  GetPasswordResult
};

export default GetPasswordApi;
