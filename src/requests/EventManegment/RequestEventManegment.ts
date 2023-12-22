import { createSlice } from "@reduxjs/toolkit";
import { AppThunk } from "src/store";
import { IEventDetailsBody, IAllClassesAndDivisionsBody, ISelectedStandardAndDivisionCheckBoxBody, IUpdateEventBody, IDeleteEventBody, DeleteEventImageBody, IEventListBody } from "src/interfaces/EventManegment/IEventManegment";
import GetEventDescriptionApi from 'src/api/EventManegment/ApiEventManegment';


const EventDescriptionSlice = createSlice({
  name: 'Event Management',
  initialState: {

    EventListt: [],
    EventDetailss: [],
    AllClassesAndDivisionss: [],
    SelectedStandardAndDivisionCheckBoxx: [],
    SaveEventt: "",
    UpdateEventt: "",
    DeleteEventt: "",
    DeleteEventImagee: ""

  },

  reducers: {
    getEventListt(state, action) {
      state.EventListt = action.payload;
    },
    getEventDetailss(state, action) {
      state.EventDetailss = action.payload;
    },
    getAllClassesAndDivisionss(state, action) {
      state.AllClassesAndDivisionss = action.payload;
    },
    getSelectedStandardAndDivisionCheckBoxx(state, action) {
      state.SelectedStandardAndDivisionCheckBoxx = action.payload;
    },
    getSaveEventt(state, action) {
      state.SaveEventt = action.payload;
    },
    getUpdateEventt(state, action) {
      state.UpdateEventt = action.payload;
    },
    getDeleteEventt(state, action) {
      state.DeleteEventt = action.payload;
    },
    getDeleteEventImagee(state, action) {
      state.DeleteEventImagee = action.payload;
    }
  }
});

//1.getEventList
export const GetEventtList =
  (data: IEventListBody): AppThunk =>
    async (dispatch) => {
      const response = await GetEventDescriptionApi.EventList(data);
      let a = response.data.map((item, i) => {
 
        return {
          Text1: item.Event_Name 

        }
      })
      dispatch(EventDescriptionSlice.actions.getEventListt(a))
    }

//2.getEventDetails
export const GetEventdetail =
  (data: IEventDetailsBody): AppThunk =>
    async (dispatch) => {
      const response = await GetEventDescriptionApi.EventDetails(data);
      let responseData = response.data.map((item, i) => {

        return {
          Id: item.Event_Id,
          text1: item.Event_Description,
          text2: item.Event_Start_Date,
          text3: item.Event_End_Date,
          //text4: item.Event_Comment,
          text5: item.Event_Image,

        }
      })
      dispatch(EventDescriptionSlice.actions.getEventDetailss(responseData))
    }

//3.GetAllClassesAndDivisions
export const GetAllClassAndDivision =
  (data: IAllClassesAndDivisionsBody): AppThunk =>
    async (dispatch) => {
      const response = await GetEventDescriptionApi.AllClassesAndDivisions(data);
      dispatch(EventDescriptionSlice.actions.getAllClassesAndDivisionss(response.data))
    }

//4.SelectedStandardAndDivisionCheckBoxx
export const GetSelectedStandardAndDivisionCheckBoxx =
  (data: ISelectedStandardAndDivisionCheckBoxBody): AppThunk =>
    async (dispatch) => {
      const response = await GetEventDescriptionApi.SelectedStandardAndDivisionCheckBox(data);
      dispatch(EventDescriptionSlice.actions.getSelectedStandardAndDivisionCheckBoxx(response.data))
    }




//6.UpadteEvent
export const GetupdateEvent =
  (data: IUpdateEventBody): AppThunk =>
    async (dispatch) => {
      const response = await GetEventDescriptionApi.UpdateEvent(data);
      dispatch(EventDescriptionSlice.actions.getUpdateEventt(response.data));
    };

//7.DeletEvent
export const GetDeleteEvent =
  (data: IDeleteEventBody): AppThunk =>
    async (dispatch) => {
      const response = await GetEventDescriptionApi.DeleteEvent(data);
      dispatch(EventDescriptionSlice.actions.getDeleteEventt(response.data));
    };


//8.getDeleteEventImagee
export const GetDeleteEventImagee =
  (data: DeleteEventImageBody): AppThunk =>
    async (dispatch) => {
      const response = await GetEventDescriptionApi.DeleteEventImage(data);
      // let responseData = response.data.map((item, i) => {

      //   return {
      //     Id: item.EventId,
      //     text1: item.Event_Description,
      //     //Text2: item.EventStartDate,
      //     //Text3: item.EventEndDate

      //   }
      // })
      dispatch(EventDescriptionSlice.actions.getDeleteEventImagee(response.data));
    };

export default EventDescriptionSlice.reducer
