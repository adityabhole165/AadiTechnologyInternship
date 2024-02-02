import {
  GetNewRelease,
  INewRelease
} from 'src/interfaces/Authentication/NewRelease';
import http from '../../requests/SchoolService/schoolServices';

const NewRelease = (data: INewRelease) => {
  return http.post<GetNewRelease>('User/GetNewAppVersionDetails', data);
};

const Newrelease = {
  NewRelease
};

export default Newrelease;
