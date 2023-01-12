import { createSlice } from '@reduxjs/toolkit'
import ApiTransportDetails from 'src/api/TransportDetails/ApiTransportDetails'
import { AppThunk } from 'src/store';
import { GetStudentTransportDetailsBody} from 'src/interfaces/Student/ITransportDetails';

const SliceTransportDetails = createSlice({
    name: 'TransportDetails',
    initialState: {
      TransportDetailslist:[],
      Loading:true,
    },
    reducers: {
     
      getTransportDetails(state, action) {
        state.TransportDetailslist = action.payload;
      }
  
    }
  });

  export const getTransportDetails =
  (data: GetStudentTransportDetailsBody): AppThunk =>
    async (dispatch) => {
      const response = await ApiTransportDetails.TransportDetailsapi (data)
      dispatch(SliceTransportDetails.actions.getTransportDetails(response.data));
    };


export default  SliceTransportDetails.reducer