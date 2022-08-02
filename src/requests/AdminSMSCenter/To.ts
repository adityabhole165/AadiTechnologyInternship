import { createSlice } from "@reduxjs/toolkit";
import getuserlistapi from "src/api/AdminSMSCenter/To";
import {IUsergroup} from "src/interfaces/AdminSMSCenter/To";
import {IGetStudentsUser} from "src/interfaces/AdminSMSCenter/To"
import {GetAdminAndprincipalUsers} from "src/interfaces/AdminSMSCenter/To";
import { AppThunk } from "src/store";
import { getStudentDetails } from "../Student/OnlineExamProgressReport";

const GetuserSlice = createSlice({
    name : 'GetUser',
    initialState: {
        GetUser: [],
        getStudent:[],
        getGetAdminAndprincipalUsers:[],

    },
    reducers:{
        getUser (state,action){
            state.GetUser = action.payload
        },
        getStudentDetails(state,action){
            state.getStudent = action.payload

        },
        getGetAdminAndprincipalUsers(state,action){
          state.getGetAdminAndprincipalUsers = action.payload
        }

    }
});

export const GetUser =
  (data:IUsergroup): AppThunk =>
  async (dispatch) => {
    const response = await getuserlistapi.GetUsersInGroup(data);
    dispatch(GetuserSlice.actions.getUser(response?.data));
  };

  export const GetStudent =
  (data:IGetStudentsUser): AppThunk =>
  async (dispatch) => {
    const response = await getuserlistapi.GetStudentGroup(data);
    dispatch(GetuserSlice.actions.getStudentDetails(response?.data));
  };

  export const GetGetAdminAndprincipalUsers =
  (data:GetAdminAndprincipalUsers): AppThunk =>
  async (dispatch) => {
    const response = await getuserlistapi.GetGetAdminAndprincipalUsers(data);
    dispatch(GetuserSlice.actions.getGetAdminAndprincipalUsers(response?.data));
  };

  export default GetuserSlice.reducer;