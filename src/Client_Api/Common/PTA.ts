import { createSlice, nanoid, createAsyncThunk } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit';
import { AppThunk } from 'src/store';
import IPta from 'src/Interface/Common/PTA';
import PtaApi from "../../Api/Common/PTA";

const PtaSlice = createSlice({
  name: 'PTA',
  initialState:{
    TeacherCommittee:[],
    ParentCommittee:[]
  },
  reducers: {
    getPtaList(state,action){
      state.TeacherCommittee=action.payload.GetPTADetailsResult.TeachersCommittee;
      state.ParentCommittee=action.payload.GetPTADetailsResult.ParentCommittee;
    }
  }   
});


export const getPtaList =
  (data:IPta): AppThunk =>
  async (dispatch) => {
    const response = await PtaApi.GetPtaList(data);
    dispatch(PtaSlice.actions.getPtaList(response.data));
  };


export default PtaSlice.reducer
