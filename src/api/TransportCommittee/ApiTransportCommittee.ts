import http from "../../requests/SchoolService/schoolServices";
import {IGetTransportCommitteeDetailsBody,IGetTransportCommitteeDetailsResult} from "src/interfaces/Student/ITransportCommittee" ;

const GetTransportCommittee= (data: IGetTransportCommitteeDetailsBody) => {
    return http.post<IGetTransportCommitteeDetailsResult>('Student/GetTransportCommitteeDetails',data);
};


const ApiTransportCommittee={
    GetTransportCommittee
}
 export default  ApiTransportCommittee;