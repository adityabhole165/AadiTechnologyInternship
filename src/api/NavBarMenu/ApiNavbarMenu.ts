import {
  IGetMenuDetailsBody,
  IGetMenuDetailsResult
} from 'src/interfaces/Student/INavbarMenu';
import http from '../../requests/SchoolService/schoolServices';

const GetMenuDetailsApi = (data: IGetMenuDetailsBody) => {
  return http.post<IGetMenuDetailsResult>('School/GetMenuDetails', data);
};

const ApiGetMenuDetails = {
  GetMenuDetailsApi
};
export default ApiGetMenuDetails;
