import {
  IGetUserAadharCardDetailsBody,
  IGetUserAadharCardDetailsResult,
  ISaveUserAadharCardDetailsBody,
  ISaveUserAadharCardDetailsResult
} from 'src/interfaces/Student/IAadharCardDetails';
import http from '../../requests/SchoolService/schoolServices';

const GetUserAadharCardDetailsApi = (data: IGetUserAadharCardDetailsBody) => {
  return http.post<IGetUserAadharCardDetailsResult>(
    'student/GetUserAadharCardDetails',
    data
  );
};

const SaveUserAadharCardDetailsapi = (data: ISaveUserAadharCardDetailsBody) => {
  return http.post<ISaveUserAadharCardDetailsResult>(
    'student/SaveUserAadharCardDetails',
    data
  );
};

const ApiAadharCardDetails = {
  GetUserAadharCardDetailsApi,
  SaveUserAadharCardDetailsapi
};
export default ApiAadharCardDetails;
