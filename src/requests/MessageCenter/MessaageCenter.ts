import { createSlice} from '@reduxjs/toolkit'
import MessageCenterApi from "../../api/MessageCenter/MessageCenter";
import { AppThunk } from 'src/store';
import {ITrashList} from 'src/interfaces/MessageCenter/MessageCenter';
import { IUserGroupList } from "../../interfaces/MessageCenter/MessageCenter";
import { IgetList } from 'src/interfaces/MessageCenter/GetList';
import {Iyears,IGetAllMonths} from "../../interfaces/MessageCenter/Search";
import filterApi from "../../api/MessageCenter/Search";


const MessageCenterSlice = createSlice({
  name: 'Message Center',
  initialState:{
    TrashList:[],
    TeacherList:[],
    AdminStaffList:[],
    YearsList:[],
    AllMonthList:[],
    PageIndex:0,
    Loading:true

  },
  reducers: {
    getTrashList (state,action){
      state.Loading = false
      state.TrashList=action.payload.GetTrashMessagesResult;
    },
    getTeacherList (state,action){
      state.TeacherList=action.payload.GetUsersInGroupResult;
    },
    getAdminstaffList (state,action){
      state.AdminStaffList=action.payload.GetUsersInGroupResult;
    },
    getYearsList (state,action){
      state.YearsList=action.payload.GetAcademicYearsResult;
    },
    getAllMonthList (state,action){
      state.AllMonthList=action.payload.GetAllMonthDetailsResult;
    },
    sePageIndex (state,action){
      state.PageIndex=action.payload;
    },
    getLoading (state,action) {
      state.Loading = true
      state.TrashList=[];
  }
  }   
});


export const getTrashList =
  (data ? :IgetList): AppThunk =>
  async (dispatch) => {
    dispatch(MessageCenterSlice.actions.getLoading(true));
    const response = await MessageCenterApi.GetTrashList(data);
    dispatch(MessageCenterSlice.actions.getTrashList(response.data));
  };
  export const getYearsList =
  (data:Iyears): AppThunk =>
  async (dispatch) => {
    const response = await filterApi.getyears(data);
    dispatch(MessageCenterSlice.actions.getYearsList(response.data));
  };
  export const getAllMonthList =
  (data:IGetAllMonths): AppThunk =>
  async (dispatch) => {
    const response = await filterApi.getmonths(data);
    dispatch(MessageCenterSlice.actions.getAllMonthList(response.data));
  };

  export const getTeacherList =
  (data :IUserGroupList): AppThunk =>
  async (dispatch) => {
    const response = await MessageCenterApi.GetUsegroupList(data);
    dispatch(MessageCenterSlice.actions.getTeacherList(response.data));
  };

  export const getAdminstaffList =
  (data :IUserGroupList): AppThunk =>
  async (dispatch) => {
    const response = await MessageCenterApi.GetUsegroupList(data);
    dispatch(MessageCenterSlice.actions.getAdminstaffList(response.data));
  };
  
  // export const getPageINdex = () => {
  //   dispatch(MessageCenterSlice.actions.sePageIndex(1))
  // }

export default MessageCenterSlice.reducer
