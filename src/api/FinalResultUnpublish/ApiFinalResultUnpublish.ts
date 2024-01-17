import http from "../../requests/SchoolService/schoolServices";
import { IUnPublishFinalResultBody,IUnPublishFinalResultResult } from "src/interfaces/FinalResultUnpublish/IFinalResultUnpublish";

const UnPublishFinalResult = (data:IUnPublishFinalResultBody) => {
    return http.post('Teacher/UnPublishFinalResult',data);
};

const UnPublishApi ={
    UnPublishFinalResult,
    
}

export default UnPublishApi