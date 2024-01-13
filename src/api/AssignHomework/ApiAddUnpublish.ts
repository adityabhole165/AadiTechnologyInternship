import http from "../../requests/SchoolService/schoolServices"
import { IPublishUnPublishHomeworkBody,} from "src/interfaces/AssignHomework/IAddUnpublish"


const PublishUnpublish = (data: IPublishUnPublishHomeworkBody) => {
    return http.post('Teacher/PublishUnPublishHomework', data);
};

const ApiAddUnpublish ={
    PublishUnpublish,
    
    
}
export default  ApiAddUnpublish