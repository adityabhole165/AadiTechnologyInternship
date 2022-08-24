
import { Iimg, IPics } from "src/interfaces/Common/PhotoGallery";
import http from "../../requests/SchoolService/schoolServices";
import {IYearList} from "../../interfaces/Student/PhotoGallary"

//Get year list

const GetAllAcademicYearsForSchool = (data: IYearList) => {
      return http.post<IYearList>('School/GetAllAcademicYearsForSchool',data);
};

const GetPICSList = (data: IPics) => {
  return http.post<IPics>('User/GetAlbums',data);
};

const GetimgList = (data: Iimg) => {
  return http.post<Iimg>('User/GetImages',data);
};

const PhotoGallaryApi  ={
    GetAllAcademicYearsForSchool,
    GetPICSList,
    GetimgList
};


export default PhotoGallaryApi ;