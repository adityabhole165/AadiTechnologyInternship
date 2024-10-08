import { createSlice } from '@reduxjs/toolkit';
import getuserlistapi from 'src/api/AdminSMSCenter/To1';
import {
  GetAdminAndprincipalUsers,
  IGetStudentsUser,
  IUsergroup
} from 'src/interfaces/AdminSMSCenter/To1';
import {
  IContactGRPBody,
  IShowPTAOptionBody
} from 'src/interfaces/MessageCenter/MessageCenter';
import { AppThunk } from 'src/store';
import MessageCenterApi from '../../api/MessageCenter/MessageCenter';
const GetuserSlice1 = createSlice({
  name: 'GetUser',
  initialState: {
    GetUser: [],
    getStudent: [],
    getGetAdminAndprincipalUsers: [],
    getClass: [],
    Loading: false,
    PTAOption: {}
  },
  reducers: {
    getClass(state, action) {
      state.getClass = action.payload;
      state.Loading = false;
    },
    getUser(state, action) {
      state.GetUser = action.payload;
      state.Loading = false;
    },
    getStudentDetails(state, action) {
      state.getStudent = action.payload;
      state.Loading = false;
    },
    getGetAdminAndprincipalUsers(state, action) {
      state.getGetAdminAndprincipalUsers = action.payload;
      state.Loading = false;
    },
    getShowPTAOption(state, action) {
      state.PTAOption = action.payload.PTAOptionStatusResult;
      state.Loading = false;
    },
    getLoading(state) {
      state.Loading = true;
    }
  }
});
const RoleId = sessionStorage.getItem('RoleId');

export const GetUser =
  (data: IUsergroup): AppThunk =>
    async (dispatch) => {
      dispatch(GetuserSlice1.actions.getLoading());
      const response = await getuserlistapi.GetUsersInGroup(data);
      const userList = response.data.GetUsersInGroupResult.map((item, index) => {
        return {
          Id: item.Id,
          Value: item.Id,
          isActive: false,
          Name: item.Name
        };
      });
      if (data.asSelectedUserGroup === '3') {
        dispatch(GetuserSlice1.actions.getClass(userList));
      } else dispatch(GetuserSlice1.actions.getUser(userList));
    };
export const ContactGroup =
  (data: IContactGRPBody): AppThunk =>
    async (dispatch) => {
      dispatch(GetuserSlice1.actions.getLoading());
      const response = await MessageCenterApi.ContactGRP(data);
      const contactgrplist = response.data.ContactGroups.map((item, index) => {
        return {
          Id: item.GroupId,
          Value: item.GroupName,
          Users: item.Users,
          isActive: false,
          Name: item.GroupName,
          IsAllDeactivated: item.IsAllDeactivated
        };
      });
      dispatch(GetuserSlice1.actions.getUser(contactgrplist));
    };

export const GetStudent =
  (data: IGetStudentsUser): AppThunk =>
    async (dispatch) => {
      let studentList = [];
      if (data.asStdDivId != '') {
        dispatch(GetuserSlice1.actions.getLoading());
        const response = await getuserlistapi.GetStudentGroup(data);
        studentList = response.data.GetStudentsUserResult.map((item, index) => {
          return {
            Id: item.Id,
            Value: item.Name,
            isActive: false,
            Name: item.Name
          };
        });
      }
      dispatch(GetuserSlice1.actions.getUser(studentList));
      // dispatch(GetuserSlice.actions.getStudentDetails(response?.data));
    };

export const GetGetAdminAndprincipalUsers =
  (data: GetAdminAndprincipalUsers): AppThunk =>
    async (dispatch) => {
      dispatch(GetuserSlice1.actions.getLoading());
      const response = await getuserlistapi.GetGetAdminAndprincipalUsers(data);
      let AddResipent = [];
      if (sessionStorage.getItem('RoleId') === '3') {
        AddResipent = response.data.GetAdminAndprincipalUsersResult.filter(
          (item, i) => i === 2
        ).map((item, index) => {
          return {
            Id: item.Id,
            Value: item.Name,
            isActive: false,
            Name: 'S/W Coordinator'
          };
        });
      } else {
        AddResipent = response.data.GetAdminAndprincipalUsersResult.map(
          (item, index) => {
            return {
              Id: item.Id,
              Value: item.Name,
              isActive: false,
              Name:
                index === 0
                  ? 'Admin'
                  : index === 1
                    ? 'Principal'
                    : 'S/W Coordinator'
            };
          }
        );
      }
      dispatch(GetuserSlice1.actions.getGetAdminAndprincipalUsers(AddResipent));
    };

export const getShowPTA =
  (data: IShowPTAOptionBody): AppThunk =>
    async (dispatch) => {
      dispatch(GetuserSlice1.actions.getLoading());
      const response = await getuserlistapi.ShowPTAOption(data);
      dispatch(GetuserSlice1.actions.getShowPTAOption(response.data));
    };
export default GetuserSlice1.reducer;
