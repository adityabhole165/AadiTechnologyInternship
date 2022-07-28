
import http from "../../Client_Api/SchoolService/schoolServices";
import {IMoveToTrash} from "../../Interface/MessageCenter/MoveToTrash"

  const MoveToTrash = (data: IMoveToTrash) => {
    return http.post<IMoveToTrash>('MessageCenter/MoveToTrash',data);
  };
  
const MoveToTrashApi  ={
    MoveToTrash
}

export default MoveToTrashApi ;