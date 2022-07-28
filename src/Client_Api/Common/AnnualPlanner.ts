import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import AnnualPlannerApi from "../../Api/Common/AnnualPlanner";
import { AppThunk } from 'src/store';
import {IEventList} from 'src/Interface/Common/AnnualPlanner';

const AnnualPlannerSlice = createSlice({
  name: 'Annual Planner',
  initialState:{
    EventList:[],
    Loading : true
  },
  reducers: {
    getEventList (state,action){
      state.Loading = false
      state.EventList=action.payload.GetEventsInMonthResult;
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
    dispatch(AnnualPlannerSlice.actions.getEventList(response.data));
  };


export default AnnualPlannerSlice.reducer
