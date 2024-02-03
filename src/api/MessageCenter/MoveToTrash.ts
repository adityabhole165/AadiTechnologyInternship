import { IMoveToTrash } from '../../interfaces/MessageCenter/MoveToTrash';
import http from '../../requests/SchoolService/schoolServices';

const MoveToTrash = (data: IMoveToTrash) => {
  return http.post<IMoveToTrash>('MessageCenter/MoveToTrash', data);
};

const MoveToTrashApi = {
  MoveToTrash
};

export default MoveToTrashApi;
