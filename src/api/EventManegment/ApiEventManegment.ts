import http from "../../requests/SchoolService/schoolServices";
import { IEventDetailsBody, IEventDetailsResult, IAllClassesAndDivisionsBody, IAllClassesAndDivisionsResult, ISelectedStandardAndDivisionCheckBoxBody, ISelectedStandardAndDivisionCheckBoxResult, IUpdateEventBody,IDeleteEventBody,DeleteEventImageBody ,IEventListBody,IEventlIstResult} from "src/interfaces/EventManegment/IEventManegment";

//GetEventList
const EventList = (data: IEventListBody) => {
    return http.post<IEventlIstResult[]>('Teacher/GetEventList', data);
}

//2.GetEventDetails
const EventDetails = (data: IEventDetailsBody) => {
    return http.post<IEventDetailsResult[]>('Teacher/GetEventDetails', data);
}

//3.AllClassesAndDivisions
const AllClassesAndDivisions = (data: IAllClassesAndDivisionsBody) => {
    return http.post<IAllClassesAndDivisionsResult[]>('Teacher/GetAllClassesAndDivisions', data);
}

//4.SelectedStandardAndDivisionCheckBox
const SelectedStandardAndDivisionCheckBox = (data: ISelectedStandardAndDivisionCheckBoxBody) => {
    return http.post<ISelectedStandardAndDivisionCheckBoxResult[]>('Teacher/GetSelectedStandardAndDivisionCheckBox', data);
}

// //5.SaveEvent
// const SaveEvent = (data: ISaveEventBody) => {
//     return http.post('Teacher/SaveEvent', data)
// }

//6.UpdateEvent
const UpdateEvent = (data: IUpdateEventBody) => {
    return http.post('Teacher/SaveUpdateEvent', data);
}

//7.DeleteEvent
const DeleteEvent = (data: IDeleteEventBody) => {
    return http.post('Teacher/DeleteEvent', data);
}

//8.DeleteEventImage
const DeleteEventImage = (data: DeleteEventImageBody) => {
    return http.post('Teacher/DeleteEventImage', data)
}

const GetEventDescriptionApi = {

    EventList,
    EventDetails,
    AllClassesAndDivisions,
    SelectedStandardAndDivisionCheckBox,
   // SaveEvent,
    UpdateEvent,
    DeleteEvent,
    DeleteEventImage

}

export default GetEventDescriptionApi
