import { createSlice } from '@reduxjs/toolkit';
import ApiTransportDetails from 'src/api/TransportDetails/ApiTransportDetails';
import { GetStudentTransportDetailsBody } from 'src/interfaces/Student/ITransportDetails';
import { AppThunk } from 'src/store';

const SliceTransportDetails = createSlice({
  name: 'TransportDetails',
  initialState: {
    RouteDetails: [],
    StopDetails: [],
    Loading: true,
    OtherTrackingDetails: ''
  },
  reducers: {
    getRouteDetails(state, action) {
      state.RouteDetails = action.payload;
      state.Loading = false;
    },
    getStopDetails(state, action) {
      state.StopDetails = action.payload;
    },
    getOtherTrackingDetails(state, action) {
      state.OtherTrackingDetails = action.payload;
    },
    getLoading(state, action) {
      state.Loading = true;
      state.RouteDetails = [];
    }
  }
});

export const getTransportDetails =
  (data: GetStudentTransportDetailsBody): AppThunk =>
  async (dispatch) => {
    dispatch(SliceTransportDetails.actions.getLoading(true));
    const response = await ApiTransportDetails.TransportDetailsapi(data);
    let RouteDetails = [];
    let StopDetails = [];
    if (response?.data?.RouteName !== null) {
      RouteDetails = [
        {
          Text1: response?.data?.RouteName,
          Text2: response?.data?.TransportShiftName
        }
      ];
      response?.data?.TransportStaffDetails.map((item) => {
        RouteDetails.push({
          Text1: response?.data?.ShowStaffContactDetails
            ? item.MobileNo
            : item.Designation,
          // + (response?.data?.ShowStaffContactDetails ? '(' + item.Designation + ')' : ''),

          Text2:
            item.TransportStaffName +
            // + (response?.data?.ShowStaffContactDetails ? item.MobileNo : item.Designation)
            (response?.data?.ShowStaffContactDetails ? item.MobileNo : '')
          // Text2: response?.data?.ShowStaffContactDetails ? item.MobileNo : item.Designation
        });
      });
      RouteDetails.push({
        Text1: response?.data?.VehicleType,
        Text2: response?.data?.VehicleNumber
      });
      if (response?.data?.ShowVehicleOfficialContactNo) {
        RouteDetails.push({
          Text1: 'Vehicle Contact Number',
          Text2: response?.data?.VehicleOfficialContactNo,
          IsDial: true
        });
      }

      response?.data?.StopDetails.map((item) => {
        let StopDetail = {
          Text1: item.StopNumber,
          Text2: item.StopName,
          Text3: data.aiTypeId === 1 ? item.PickupTime : item.DropTime
        };
        StopDetails.push({
          StopDetail: StopDetail,
          IsMyStop: response?.data?.StopName === item.StopName
        });
      });
    }
    dispatch(SliceTransportDetails.actions.getRouteDetails(RouteDetails));
    dispatch(SliceTransportDetails.actions.getStopDetails(StopDetails));
    dispatch(
      SliceTransportDetails.actions.getOtherTrackingDetails(response?.data)
    );
  };

export default SliceTransportDetails.reducer;
