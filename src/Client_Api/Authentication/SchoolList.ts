import { createSlice, nanoid, createAsyncThunk } from '@reduxjs/toolkit'
import SchoolListApi from "../../api/Authentication/SchoolList";
import type { PayloadAction } from '@reduxjs/toolkit';
import { AppThunk } from 'src/store';
import {ISchoolList} from "src/Interface/Authentication/SchoolList"

const SchoolListslice = createSlice({
  name: 'SchoolList',
  initialState:{
    SchoolList:[],
   
  },
  reducers: {
    getSchoolList(state,action){
      state.SchoolList=action.payload.GetAllSchoolsResult;
    },
   
  }   
});


export const getSchoolList =
  (data:ISchoolList): AppThunk =>
  async (dispatch) => {
    const response = await SchoolListApi.SchoolList(data);
    dispatch(SchoolListslice.actions.getSchoolList(response.data));
  };


export default SchoolListslice.reducer
