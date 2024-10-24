import { createSlice } from "@reduxjs/toolkit";
import ContactGroupApi from "src/api/ContactGroup/ContactGroupApi";
import { IGetMailingGroupsBody } from "src/interfaces/ContactGroup/IContactGroup";
import { AppThunk } from "src/store";

const ContactGroupSlice = createSlice({
    name: 'ContactGroup',
    initialState: {
        IGetMailingGroups: [],
        Loading: true
    },
    reducers: {
        RGetMailingGroups(state, action) {
            state.Loading = false;
            state.IGetMailingGroups = action.payload;
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
    console.log(response.data, '>>>>>>');
    dispatch(ContactGroupSlice.actions.RGetMailingGroups(GroupDetails));
};

export default ContactGroupSlice.reducer;
