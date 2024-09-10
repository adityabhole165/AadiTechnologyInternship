import {
  IGetMenuDetailsBody,
  IGetMenuDetailsResult
} from 'src/interfaces/Student/INavbarMenu';
import http from '../../requests/SchoolService/schoolServices';

const GetMenuDetailsApi = (data: IGetMenuDetailsBody) => {
  return http.post<IGetMenuDetailsResult>('School/GetMenuDetails', data);
};

const GetMenuDescriptionApi = (data: IGetMenuDetailsBody) => {
  return http.post<IGetMenuDetailsResult>('School/GetMenuDescription', data);
};

const ApiGetMenuDetails = {
  GetMenuDetailsApi,
  GetMenuDescriptionApi
};
export default ApiGetMenuDetails;
