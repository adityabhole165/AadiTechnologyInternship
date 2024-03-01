import { createSlice } from "@reduxjs/toolkit";
import GetEventDescriptionApi from 'src/api/EventManegment/ApiEventManegment';
import { DeleteEventImageBody, IAllClassesAndDivisionsBody, IDeleteEventBody, IEventDetailsBody, IEventListBody, ISelectedStandardAndDivisionCheckBoxBody, IUpdateEventBody } from "src/interfaces/EventManegment/IEventManegment";
import { AppThunk } from "src/store";


const EventDescriptionSlice = createSlice({
  name: 'Event Management',
  initialState: {

    EventListt: [],
    EventDetailss: null,
    AllClassesAndDivisionss: [],
    AllClassesAndDivisionss1: [],
    SelectedStandardAndDivisionCheckBoxx: [],
    SaveEventt: "",
    SaveUpdateEventt: "",
    DeleteEventt: "",
    DeleteEventImagee: "",
    ResetDailyLog: "",

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

    getAllClassesAndDivisionss1(state, action) {
      state.AllClassesAndDivisionss1 = action.payload;
    },
    getSelectedStandardAndDivisionCheckBoxx(state, action) {
      state.SelectedStandardAndDivisionCheckBoxx = action.payload;
    },
    getSaveEventt(state, action) {
      state.SaveEventt = action.payload;
    },
    getSaveUpdateEventt(state, action) {
      state.SaveUpdateEventt = action.payload;
    },
    getDeleteEventt(state, action) {
      state.DeleteEventt = action.payload;
    },
    resetDeleteEventt(state) {
      state.DeleteEventt = "";
    },
    getDeleteEventImagee(state, action) {
      state.DeleteEventImagee = action.payload;
    },
    resetMessage(state) {
      state.SaveUpdateEventt = ""
    },
    ResetDeletedLog(state) {
      state.ResetDailyLog = "";
    },
  }
});

//1.getEventList
export const GetEventtList =
  (data: IEventListBody): AppThunk =>
    async (dispatch) => {
      const response = await GetEventDescriptionApi.EventList(data);
      let a = response.data.map((item, i) => {

        return {

          Text1: item.Event_Name,
          Id: item.Event_Id,

        }
      })

      dispatch(EventDescriptionSlice.actions.getEventListt(a))
    }

//2.getEventDetails
export const GetEventdetail =
  (data: IEventDetailsBody): AppThunk =>
    async (dispatch) => {
      let response = await GetEventDescriptionApi.EventDetails(data);

      let responseData = null

      if (response.data != null &&
        response.data.GetEventDetailList.length > 0)
        responseData = response.data.GetEventDetailList[0]
      dispatch(EventDescriptionSlice.actions.getEventDetailss(responseData))

    }

//3.GetAllClassesAndDivisions
export const GetAllClassAndDivision =
  (data: IAllClassesAndDivisionsBody): AppThunk =>
    async (dispatch) => {
      const response = await GetEventDescriptionApi.AllClassesAndDivisions(data);
      let responseData = response.data.map((item, i) => {
        return {
          Id: item.SchoolWise_Standard_Division_Id,
          Name: item.Division_Name,
          Value: item.SchoolWise_Standard_Division_Id,
          ParentId: item.Standard_Id,
          IsActive: false
        }
      })

      let arr = []
      let arrStd = []
      response.data.map((item, i) => {
        if (!arrStd.includes(item.Standard_Id)) {

          arrStd.push(item.Standard_Id)
          arr.push({
            Id: item.Standard_Id,
            Name: item.Standard_Name,
            Value: item.Standard_Id,
            IsActive: false
          })
        }
      })
      // console.log(arr,"arr")


      dispatch(EventDescriptionSlice.actions.getAllClassesAndDivisionss(responseData))
      dispatch(EventDescriptionSlice.actions.getAllClassesAndDivisionss1(arr))

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
      const response = await GetEventDescriptionApi.SaveUpdateEvent(data);
      dispatch(EventDescriptionSlice.actions.getSaveUpdateEventt(response.data));
    };

//7.DeletEvent
export const GetDeleteEvent =
  (data: IDeleteEventBody): AppThunk =>
    async (dispatch) => {
      const response = await GetEventDescriptionApi.DeleteEvent(data);
      dispatch(EventDescriptionSlice.actions.getDeleteEventt(response.data));
    };
//7.DeletEvent
export const resetDeleteEventt =
  (): AppThunk =>
    async (dispatch) => {
      dispatch(EventDescriptionSlice.actions.resetDeleteEventt());
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


export const resetMessage =
  (): AppThunk =>
    async (dispatch) => {
      dispatch(EventDescriptionSlice.actions.resetMessage());
    }

export const ResetDeletedLog =
  (): AppThunk =>
    async (dispatch) => {
      dispatch(EventDescriptionSlice.actions.ResetDeletedLog())
    }

export default EventDescriptionSlice.reducer
