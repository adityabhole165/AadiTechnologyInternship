
import { IUpcomingEventDashBody, IUpcomingEventDashResult } from 'src/interfaces/UpcomingEventDash/IUpcomingEventDash';
import http from '../../requests/SchoolService/schoolServices';


const GetUpcomingEventList = (data: IUpcomingEventDashBody) => {
    return http.post<IUpcomingEventDashResult>('Teacher/GetUpcomingEventsNew', data);
};

const ApiUpcomingEventDash = {
    GetUpcomingEventList
};
export default ApiUpcomingEventDash;
