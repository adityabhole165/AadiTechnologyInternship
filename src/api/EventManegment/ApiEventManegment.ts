import { DeleteEventImageBody, IAllClassesAndDivisionsBody, IAllClassesAndDivisionsResult, IDeleteEventBody, IEventDetailsBody, IEventDetailsResult, IEventListBody, IEventlIstResult, ISelectedStandardAndDivisionCheckBoxBody, ISelectedStandardAndDivisionCheckBoxResult, IUpdateEventBody } from "src/interfaces/EventManegment/IEventManegment";
import http from "../../requests/SchoolService/schoolServices";

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

//6.SaveUpdateEvent
const SaveUpdateEvent = (data: IUpdateEventBody) => {
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
  SaveUpdateEvent,
  DeleteEvent,
  DeleteEventImage

}

export default GetEventDescriptionApi
