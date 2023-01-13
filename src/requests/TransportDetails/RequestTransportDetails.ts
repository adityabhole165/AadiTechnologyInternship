import { createSlice } from '@reduxjs/toolkit'
import ApiTransportDetails from 'src/api/TransportDetails/ApiTransportDetails'
import { AppThunk } from 'src/store';
import { GetStudentTransportDetailsBody } from 'src/interfaces/Student/ITransportDetails';
import { string } from 'prop-types';

const SliceTransportDetails = createSlice({
  name: 'TransportDetails',
  initialState: {
    RouteDetails: [],
    StopDetails: [],
    Loading: true,
    TrackingURL:""
  },
  reducers: {

    getRouteDetails(state, action) {
      state.RouteDetails = action.payload;
      state.Loading = false;
    },
    getStopDetails(state, action) {
      state.StopDetails = action.payload;
    },
    getTrackingURL(state, action) {
      state.TrackingURL = action.payload;
    },
    getLoading (state,action) {
      state.Loading = true
      state.RouteDetails = [];
  }
  }
});

export const getTransportDetails =
  (data: GetStudentTransportDetailsBody): AppThunk =>
    async (dispatch) => {
      dispatch(SliceTransportDetails.actions.getLoading(true));
      const response = await ApiTransportDetails.TransportDetailsapi(data)
      let RouteDetails = []
      let StopDetails = [];
      if(response?.data?.RouteName!==null){

      RouteDetails = [{ Text1: response?.data?.RouteName, Text2: "" }]
      let staffDetails = response?.data?.TransportStaffDetails.map((item) => {
        RouteDetails.push({
          Text1: item.TransportStaffName + '(' + item.Designation + ')',
          Text2: item.MobileNo
        })
      })
      RouteDetails.push({ Text1: response?.data?.VehicleType, Text2: response?.data?.VehicleNumber })
      
      response?.data?.StopDetails.map((item) => {
        let StopDetail = []
        StopDetail.push({ Text1: "Shift - " + response?.data?.TransportShiftName, Text2:"" })
        StopDetail.push({ Text1: "Stop Number - " + item.StopNumber, Text2:"" })
        StopDetail.push({ Text1: item.StopName + " - " + ((data.aiTypeId===1)?item.PickupTime:item.DropTime), Text2:"" })
        StopDetails.push({ StopDetail: StopDetail, 
          IsMyStop:  response?.data?.StopName === item.StopName 
        })
      })
    }
      dispatch(SliceTransportDetails.actions.getRouteDetails(RouteDetails));
      dispatch(SliceTransportDetails.actions.getStopDetails(StopDetails));
      dispatch(SliceTransportDetails.actions.getTrackingURL(response?.data?.TrackingURL));
    };


export default SliceTransportDetails.reducer