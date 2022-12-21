import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import AnnualPlannerApi from "../../api/AnnualPlanner/AnnualPlanner";
import { AppThunk } from 'src/store';
import {IEventList} from 'src/interfaces/Common/AnnualPlanner';

const AnnualPlannerSlice = createSlice({
  name: 'Annual Planner',
  initialState:{
    EventList:[],
    Loading : true
  },
  reducers: {
    getEventList (state,action){
      state.EventList=action.payload;
      state.Loading = false
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

export default AnnualPlannerSlice.reducer
