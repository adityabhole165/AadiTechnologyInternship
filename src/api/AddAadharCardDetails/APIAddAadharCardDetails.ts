import http from "../../requests/SchoolService/schoolServices";
import {IGetAddAadharCardDetailsBody,IGetAddAadharCardDetailsResult,IGetSubmitAadharDetailsBody,IGetSubmitAadharDetailsResult} from "src/interfaces/AddAadharCardDetails/IAddAadharCardDetails" ;

const AddAadharCardDetailsApi = (data: IGetAddAadharCardDetailsBody) => {
    return http.post<IGetAddAadharCardDetailsResult[]>('Teacher/GetUserDetailsForAadharCardNo',data);
};
const SubmitAadharDetailsApi = (data: IGetSubmitAadharDetailsBody) => {
    return http.post<IGetSubmitAadharDetailsResult>('Teacher/UpdateStudentAadharDetails',data);
};

const ApiAddAadharCardDetails={
    AddAadharCardDetailsApi,
    SubmitAadharDetailsApi
}
 export default  ApiAddAadharCardDetails;
