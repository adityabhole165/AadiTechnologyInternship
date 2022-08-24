import { createSlice, nanoid, createAsyncThunk } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit';
import { AppThunk } from 'src/store';
import ISchoolnotice from 'src/interfaces/Common/SchoolNotice';
import SchoolNoticeApi from "../../api/SchoolNotice/SchoolNotice";
import IViewschoolnotice from 'src/interfaces/Student/ViewSchoolNotice'

const Schoolnoticeslice = createSlice({
    name: 'schoolnotice',
    initialState:{
        SchoolNoticeData:[],
        ViewSchoolNotice:[],
    },
    reducers: {
        getSchoolNotice(state,action){
        state.SchoolNoticeData=action.payload.GetSchoolNoticesResult;
    
      },
      getviewSchoolNotice(state,action){     
        state.ViewSchoolNotice=action.payload.GetSchoolNoticesResult;
      }
    }   
  });
  

  export const getSchoolNotice =
  (data:ISchoolnotice): AppThunk =>
  async (dispatch) => {
    const response = await SchoolNoticeApi.GetSchoolNoticeList(data);
    dispatch(Schoolnoticeslice.actions.getSchoolNotice(response.data));
  };

  export const getviewSchoolNotice =
  (data:IViewschoolnotice): AppThunk =>
  async (dispatch) => {
    const response = await SchoolNoticeApi.ViewSchoolNoticeList(data);
    dispatch(Schoolnoticeslice.actions.getviewSchoolNotice(response.data));
  };


  export default Schoolnoticeslice.reducer