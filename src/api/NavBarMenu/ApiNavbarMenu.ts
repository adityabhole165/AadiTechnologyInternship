import http from "../../requests/SchoolService/schoolServices";
import {IGetMenuDetailsBody, IGetMenuDetailsResult} from "src/interfaces/Student/INavbarMenu" ;

const GetMenuDetailsApi = (data: IGetMenuDetailsBody) => {
    return http.post<IGetMenuDetailsResult>('School/GetMenuDetails',data);
};




const ApiGetMenuDetails={
    GetMenuDetailsApi
}
 export default  ApiGetMenuDetails;
