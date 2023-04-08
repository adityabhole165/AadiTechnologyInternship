import { createSlice } from '@reduxjs/toolkit';
import { AppThunk } from 'src/store';
import ApiTransportCommittee from 'src/api/TransportCommittee/ApiTransportCommittee';
import { IGetTransportCommitteeDetailsBody, IGetTransportCommitteeDetailsResult } from 'src/interfaces/Student/ITransportCommittee';

const SliceTransportcommittee = createSlice({
    name: 'TransportCommittee',
    initialState: {
        TeacherCommittee: [],
        ParentCommittee: [],
        Loading: true,
    },
    reducers: {
        getTransportCommittee(state, action) {
            state.TeacherCommittee=action.payload.GetTransportCommittee?.TeachersCommittee;
            state.ParentCommittee=action.payload.GetTransportCommittee?.ParentCommittee;
            state.Loading = false;
        },
        

        getLoading(state, action) {
            state.Loading = true
        }
    }
});

export const getTransportCommittee =
  (data:IGetTransportCommitteeDetailsBody): AppThunk =>
  async (dispatch) => {
    const response = await ApiTransportCommittee.GetTransportCommittee(data);
    dispatch(SliceTransportcommittee.actions.getTransportCommittee(response.data));
  };

  export default SliceTransportcommittee.reducer