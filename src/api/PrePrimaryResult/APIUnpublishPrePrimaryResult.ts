import http from "../../requests/SchoolService/schoolServices";
import { IGetUnPublishResltBody} from "src/interfaces/PrePrimaryResult/IUnpublishPrePrimaryResult";

const UnPublishReslt = (data: IGetUnPublishResltBody) => {
    return http.post('Teacher/UnPublishReslt', data);
};

const ApiPrePrimaryResult ={
    
    UnPublishReslt,
}
export default ApiPrePrimaryResult;