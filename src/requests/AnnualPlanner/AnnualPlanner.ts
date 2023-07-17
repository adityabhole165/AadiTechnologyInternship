import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import AnnualPlannerApi from "../../api/AnnualPlanner/AnnualPlanner";
import { AppThunk } from 'src/store';
import IGetUpcomingEventBody, {IEventList} from 'src/interfaces/Common/AnnualPlanner';

const AnnualPlannerSlice = createSlice({
  name: 'Annual Planner',
  initialState:{
    EventList:[],
    Event:[],
    Loading : true
  },
  reducers: {
    getEventList (state,action){
      state.EventList=action.payload;
      state.Loading = false
    },
    getUpcomingEvent(state, action) {
      state.Event = action.payload;
      state.Loading = false;
  },
    getLoading (state,action) {
        state.Loading = true
        state.EventList = [];
    }
  }   
});

export const getEventList =
  (data:IEventList): AppThunk =>
  async (dispatch) => {

    dispatch(AnnualPlannerSlice.actions.getLoading(true));
    const response = await AnnualPlannerApi.GetEventOverviewList(data);
    let Data = []
    Data = response.data.GetEventsInMonthResult?.map((item, index) => {
    return {
      id: index,
      header: item.Description,
      text1: 'Standard : ' + item.StandardList,
      text3: item.StartDate,
      linkPath: '/Common/viewevent/' + item.Id + '/' + data.asMonth + '/' + data.asYear
    };
  });
    dispatch(AnnualPlannerSlice.actions.getEventList(Data));

  };

  export const getUpcomingEvent =
    (body: IGetUpcomingEventBody): AppThunk =>
        async (dispatch) => {
            dispatch(AnnualPlannerSlice.actions.getLoading(true));

            const response = await AnnualPlannerApi.GetUpcomingEvents(body);

            console.log("response" ,response.data)
              let UpcomingEventList = response.data.UpcomingEventsData.map((item, index) => {
                return {
                    Id: item.EventId,
                    Header: item.EventTitle,      
                    Text1: item.StartDate,       
                    Text2: item.EventType,
                    Text3: item.StandardName,
                    Text4 :item.EndDate,
                    Text5:item.EventDescription,
                    Text6:item.EndDateUniversal,
                    backgroundColor: item.EventType === "Exam" ? "success" : item.EventType === "Event" ? "info" : "secondary",
                    linkPath: item.EventId 
                }
            })
           
            dispatch(AnnualPlannerSlice.actions.getUpcomingEvent(UpcomingEventList));
          
        };

export default AnnualPlannerSlice.reducer
