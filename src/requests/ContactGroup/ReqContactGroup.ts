import { createSlice } from "@reduxjs/toolkit";
import ContactGroupApi from "src/api/ContactGroup/ContactGroupApi";
import { IAddUpdateGroupBody, IDeleteMailGroupBody, IDeleteMailingGroupUserBody, IGetMailingGroupsBody, IGetStandardClassBody, IGetUserNameBody, IGetUserRoleBody } from "src/interfaces/ContactGroup/IContactGroup";
import { AppThunk } from "src/store";

const ContactGroupSlice = createSlice({
    name: 'ContactGroup',
    initialState: {
        IGetMailingGroups: [],
        IGetUserRole: [],
        IGetStandardClass: [],
        IGetUserName: [],
        IlistGetUserName: [],
        IlistGetUserNameCount: [],
        IAddUpdateGroup: '',
        IDeleteMailGroupMsg: '',
        IDeleteMailingGroupUserMsg: '',
        Loading: true
    },
    reducers: {
        RGetMailingGroups(state, action) {
            state.Loading = false;
            state.IGetMailingGroups = action.payload;
        },
        RGetUserRole(state, action) {
            state.IGetUserRole = action.payload;
            state.Loading = false;
        },
        RGetStandardClass(state, action) {
            state.Loading = false;
            state.IGetStandardClass = action.payload;
        },

        RGetUserName(state, action) {
            state.Loading = false;
            state.IGetUserName = action.payload;
        },
        RAddUpdateGroup(state, action) {
            state.IAddUpdateGroup = action.payload
        },
        RresetAddUpdateGroup(state) {
            state.Loading = false;
            state.IAddUpdateGroup = "";
        },
        RlistGetUserName(state, action) {
            state.IlistGetUserName = action.payload;
        },
        RlistGetUserNameCount(state, action) {
            state.IlistGetUserNameCount = action.payload;
        },
        RDeleteMailGroupMsg(state, action) {
            state.Loading = false;
            state.IDeleteMailGroupMsg = action.payload;
        },
        resetDeleteMailGroupMsg(state) {
            state.Loading = false;
            state.IDeleteMailGroupMsg = '';
        },
        RDeleteMailingGroupUserMsg(state, action) {
            state.Loading = false;
            state.IDeleteMailGroupMsg = action.payload;
        },
        resetDeleteMailingGroupUserMsg(state) {
            state.Loading = false;
            state.IDeleteMailGroupMsg = '';
        },
        getLoading(state, action) {
            state.Loading = true;
        }

    }
})

export const CDAGetMailingGroups = (data: IGetMailingGroupsBody): AppThunk => async (dispatch) => {
    dispatch(ContactGroupSlice.actions.getLoading(true));
    const response = await ContactGroupApi.GetMailingGroupsApi(data);
    let GroupDetails = response.data.map((item, i) => {
        return {
            GroupId: item.GroupId,
            GroupName: item.GroupName,
            Users: item.Users
        };
    });
    // console.log(response.data, '>>>>>>');
    dispatch(ContactGroupSlice.actions.RGetMailingGroups(GroupDetails));
};
export const CDAGetStandardClass =
    (data: IGetStandardClassBody): AppThunk =>
        async (dispatch) => {
            dispatch(ContactGroupSlice.actions.getLoading(true));
            const response = await ContactGroupApi.GetStandardClassApi(data);
            let StandardClass = response.data.map((item, i) => {
                return {
                    Id: item.SchoolWise_Standard_Division_id,
                    Name: item.StandardDivision,
                    Value: item.SchoolWise_Standard_Division_id
                };
            });
            //StandardClass.unshift({ Id: '0', Name: 'Select', Value: '0' });
            dispatch(ContactGroupSlice.actions.RGetStandardClass(StandardClass));
        };

export const CDAGetUserRole =
    (data: IGetUserRoleBody): AppThunk =>
        async (dispatch) => {
            dispatch(ContactGroupSlice.actions.getLoading(true));
            const response = await ContactGroupApi.GetUserRoleApi(data);
            let userRole = response.data.map((item, i) => {
                return {
                    Id: item.User_Role_Id,
                    Name: item.User_Role_Name,
                    Value: item.User_Role_Id
                };
            });
            //userRole.unshift({ Id: '0', Name: 'Select', Value: '0' });
            dispatch(ContactGroupSlice.actions.RGetUserRole(userRole));
        };

export const CDAGetUserName =
    (data: IGetUserNameBody): AppThunk =>
        async (dispatch) => {
            const response = await ContactGroupApi.UserNameApi(data);
            let getUserName = response.data.listGetUserName.map((item, i) => {
                return {
                    UserId: item.UserId,
                    UserName: item.UserName,
                    IsInGroup: item.IsInGroup,
                    IsDeactivated: item.IsDeactivated

                }
            });
            let getUserTotalCount = response.data.listGetUserNameCount.map((item, i) => {
                return {
                    TotalUserCount: item.TotalUserCount
                }

            });

            dispatch(ContactGroupSlice.actions.RlistGetUserName(getUserName));
            dispatch(ContactGroupSlice.actions.RlistGetUserNameCount(getUserTotalCount));
        };

export const CDAaddUpdateGroup =
    (data: IAddUpdateGroupBody): AppThunk =>
        async (dispatch) => {
            const response = await ContactGroupApi.AddUpdateGroupApi(data);
            dispatch(ContactGroupSlice.actions.RAddUpdateGroup(response.data));
        }
export const resetAddUpdateGroup = (): AppThunk => async (dispatch) => {
    dispatch(ContactGroupSlice.actions.RresetAddUpdateGroup());
};

export const CDADeleteMailGroupMsg = (data: IDeleteMailGroupBody): AppThunk => async (dispatch) => {
    dispatch(ContactGroupSlice.actions.getLoading(true));
    const response = await ContactGroupApi.DeleteGroupApi(data);
    dispatch(ContactGroupSlice.actions.RDeleteMailGroupMsg(response.data));
};

export const resetDeleteMailGroupMsg = (): AppThunk => async (dispatch) => {
    dispatch(ContactGroupSlice.actions.resetDeleteMailGroupMsg());
};
export const CDADeleteMailingGroupUserMsg = (data: IDeleteMailingGroupUserBody): AppThunk => async (dispatch) => {
    dispatch(ContactGroupSlice.actions.getLoading(true));
    const response = await ContactGroupApi.DeleteMailingGroupUserApi(data);
    dispatch(ContactGroupSlice.actions.RDeleteMailingGroupUserMsg(response.data));
};

export const resetDeleteMailingGroupUserMsg = (): AppThunk => async (dispatch) => {
    dispatch(ContactGroupSlice.actions.resetDeleteMailingGroupUserMsg());
};


export default ContactGroupSlice.reducer;
