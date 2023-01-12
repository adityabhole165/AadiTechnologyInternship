import { createSlice } from '@reduxjs/toolkit'
import ApiTransportDetails from 'src/api/TransportDetails/ApiTransportDetails'
import { AppThunk } from 'src/store';
import { GetStudentTransportDetailsBody } from 'src/interfaces/Student/ITransportDetails';

const SliceTransportDetails = createSlice({
  name: 'TransportDetails',
  initialState: {
    RouteDetails: [],
    StopDetails: [],
    Loading: true,
  },
  reducers: {

    getRouteDetails(state, action) {
      state.RouteDetails = action.payload;
    },
    getStopDetails(state, action) {
      state.StopDetails = action.payload;
    }

  }
});

export const getTransportDetails =
  (data: GetStudentTransportDetailsBody): AppThunk =>
    async (dispatch) => {
      
      const response = await ApiTransportDetails.TransportDetailsapi(data)

      let RouteDetails = [{ Text1: response?.data?.RouteName, Text2: "" }]
      let staffDetails = response?.data?.TransportStaffDetails.map((item) => {
        RouteDetails.push({
          Text1: item.TransportStaffName + '(' + item.Designation + ')',
          Text2: item.MobileNo
        })
      })
      RouteDetails.push({ Text1: response?.data?.VehicleType, Text2: response?.data?.VehicleNumber })

      let StopDetails = [];
      response?.data?.StopDetails.map((item) => {
        let StopDetail = []
        StopDetail.push({ Text1: "Shift - " + response?.data?.TransportShiftName, Text2:"" })
        StopDetail.push({ Text1: "Stop Number - " + item.StopNumber, Text2:"" })
        StopDetail.push({ Text1: item.StopName + " - " + item.PickupTime, Text2:"" })
        StopDetails.push({ StopDetail: StopDetail, 
          IsMyStop:  response?.data?.StopName === item.StopName 
        })
      })

      dispatch(SliceTransportDetails.actions.getRouteDetails(RouteDetails));
      dispatch(SliceTransportDetails.actions.getStopDetails(StopDetails));
    };


export default SliceTransportDetails.reducer