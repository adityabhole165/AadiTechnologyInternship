import {
  IAcceptTermsBody,
  IAcceptTermsResult,
  IChangePassword
} from 'src/interfaces/Common/ChangePassword';
import http from '../../requests/SchoolService/schoolServices';

const changepassword = (data: IChangePassword) => {
  return http.post<IChangePassword>('School/ChangePassword', data);
};
const Terms = (data: IAcceptTermsBody) => {
  return http.post<IAcceptTermsResult>('School/AcceptTerms', data);
};

const ChangePasswordapi = {
  changepassword,
  Terms
};
export default ChangePasswordapi;
