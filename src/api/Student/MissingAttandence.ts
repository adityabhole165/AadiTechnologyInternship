import MissingAttandenceInterface from 'src/interfaces/Student/MissingAttandenceInterface';
import http from '../../requests/SchoolService/schoolServices';

const GetMissingAttandence = (data: MissingAttandenceInterface) => {
  return http.post<MissingAttandenceInterface>(
    'School/GetAttendanceStatusOfClasses',
    data
  );
};

const GetMissingAttandenceApi = {
  GetMissingAttandence
};

export default GetMissingAttandenceApi;
