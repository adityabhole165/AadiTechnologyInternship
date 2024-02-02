import { createSlice } from '@reduxjs/toolkit';
import IPta from 'src/interfaces/Common/PTA';
import { AppThunk } from 'src/store';
import PtaApi from '../../api/PTA/PTA';

const PtaSlice = createSlice({
  name: 'PTA',
  initialState: {
    TeacherCommittee: [],
    ParentCommittee: []
  },
  reducers: {
    getPtaList(state, action) {
      state.TeacherCommittee =
        action.payload.GetPTADetailsResult.TeachersCommittee;
      state.ParentCommittee =
        action.payload.GetPTADetailsResult.ParentCommittee;
    }
  }
});

export const getPtaList =
  (data: IPta): AppThunk =>
  async (dispatch) => {
    const response = await PtaApi.GetPtaList(data);
    dispatch(PtaSlice.actions.getPtaList(response.data));
  };

export default PtaSlice.reducer;
