
import http from "../../requests/SchoolService/schoolServices";
import {IMoveToTrash} from "../../interfaces/MessageCenter/MoveToTrash"

  const MoveToTrash = (data: IMoveToTrash) => {
    return http.post<IMoveToTrash>('MessageCenter/MoveToTrash',data);
  };
  
const MoveToTrashApi  ={
    MoveToTrash
}

export default MoveToTrashApi ;