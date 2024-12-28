import { createSlice } from '@reduxjs/toolkit';
import ApiTransportCommittee from 'src/api/TransportCommittee/ApiTransportCommittee';
import { IGetTransportCommitteeDetailsBody } from 'src/interfaces/Student/ITransportCommittee';
import { AppThunk } from 'src/store';

const SliceTransportcommittee = createSlice({
  name: 'TransportCommittee',
  initialState: {
    TeachersCommittee: [],
    ParentCommittee: [],
    Loading: true
  },
  reducers: {
    getTransportCommittee(state, action) {
      state.TeachersCommittee =
        action.payload.GetTransportCommitteeDetails?.TeachersCommittee;
      state.ParentCommittee =
        action.payload.GetTransportCommitteeDetails?.ParentCommittee;
      state.Loading = false;
    },

    getLoading(state, action) {
      state.Loading = true;
    }
  }
});

export const getTransportCommittee =
  (data: IGetTransportCommitteeDetailsBody): AppThunk =>
    async (dispatch) => {
      dispatch(SliceTransportcommittee.actions.getLoading(true));
      const response = await ApiTransportCommittee.GetTransportCommittee(data);
      dispatch(
        SliceTransportcommittee.actions.getTransportCommittee(response.data)
      );
      //console.log('response', response.data);
    };

export default SliceTransportcommittee.reducer;
