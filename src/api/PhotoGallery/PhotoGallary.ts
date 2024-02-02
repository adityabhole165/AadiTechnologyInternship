import {
  GetImagesResult,
  IPics,
  Iimg
} from 'src/interfaces/Common/PhotoGallery';
import {
  AllAcademicYearsForSchoolResult,
  IYearList
} from '../../interfaces/Student/PhotoGallary';
import http from '../../requests/SchoolService/schoolServices';

//Get year list

const GetAllAcademicYearsForSchool = (data: IYearList) => {
  return http.post<AllAcademicYearsForSchoolResult>(
    'School/GetAllAcademicYearsForSchool',
    data
  );
};

const GetPICSList = (data: IPics) => {
  return http.post<IPics>('User/GetAlbums', data);
};

const GetimgList = (data: Iimg) => {
  return http.post<GetImagesResult>('User/GetImages', data);
};

const PhotoGallaryApi = {
  GetAllAcademicYearsForSchool,
  GetPICSList,
  GetimgList
};

export default PhotoGallaryApi;
