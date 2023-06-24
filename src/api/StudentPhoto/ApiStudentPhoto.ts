import http from "../../requests/SchoolService/schoolServices";
import {IGetStudentPhotoBody,IGetStudentPhotoResult} from "src/interfaces/Student/GetStudentPhoto" ;

const GetStudentPhoto = (data: IGetStudentPhotoBody) => {
    return http.post<IGetStudentPhotoResult>('Student/GetStudentPhoto',data);
};

const ApiStudentPic={
    GetStudentPhoto
}
 export default  ApiStudentPic;