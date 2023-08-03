import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import AnnualPlannerApi from "../../api/AnnualPlanner/AnnualPlanner";
import { AppThunk } from 'src/store';
import IGetUpcomingEventBody, {IEventList} from 'src/interfaces/Common/AnnualPlanner';
import IGetEventsInMonth from 'src/interfaces/Common/AnnualPlanner';

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
    getEvents(state, action) {
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

  export const getEvents =
    (body: IGetEventsInMonth): AppThunk =>
        async (dispatch) => {
            dispatch(AnnualPlannerSlice.actions.getLoading(true));

            const response = await AnnualPlannerApi.GetEventsMonth(body);

            console.log("response" ,response.data)
              let UpcomingEventList = response.data.GetEventsInMonthResult.map((item, index) => {
                return {
                    Id: item.Id,
                    header: item.Description,      
                    text1: item.StartDate,  
                    text2:item.TypeId,
                    text3:item.EventComment,
                    backgroundColor: item.TypeId === 1 ? "success" : item.TypeId === 2 ? "info" :"secondary"
                    
                  
                }
            })
           
            dispatch(AnnualPlannerSlice.actions.getEvents(UpcomingEventList));
          
        };

export default AnnualPlannerSlice.reducer
