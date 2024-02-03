import { createSlice } from '@reduxjs/toolkit';
import ApiGetMenuDetails from 'src/api/NavBarMenu/ApiNavbarMenu';
import { IGetMenuDetailsBody } from 'src/interfaces/Student/INavbarMenu';
import { AppThunk } from 'src/store';

const SliceNavbarMenu = createSlice({
  name: 'NavBarMenus',
  initialState: {
    GetNavbarMenuDetails: [],
    Loading: true
  },
  reducers: {
    getNavbarMenuDetails(state, action) {
      // state.GetNavbarMenuDetails = [
      //   { MenuId: 1, MenuName: "Counsellor's  Corner 1-0", Priority: 1, ParentMenuId: 0, MenuContent: '' },
      //   { MenuId: 2, MenuName: "Counsellor's  Corner 2-0", Priority: 1, ParentMenuId: 0, MenuContent: '' },
      //   { MenuId: 3, MenuName: "Counsellor's  Corner 3-0", Priority: 1, ParentMenuId: 0, MenuContent: '' },
      //   { MenuId: 4, MenuName: "Improve Your Child's Reading 4-1", Priority: 350, ParentMenuId: 1, MenuContent: '&lt;p&gt;\r\n\t&lt;span style=&quot;background: yello…;&amp;nbsp;&lt;/span&gt;&lt;/strong&gt;&lt;/p&gt;' },
      //   { MenuId: 5, MenuName: 'Foster self-esteem 5-1', Priority: 360, ParentMenuId: 1, MenuContent: '&lt;p&gt;\r\n\t&amp;nbsp;&lt;/p&gt;\r\n&lt;meta content…sp;&lt;/div&gt;\r\n&lt;p&gt;\r\n\t&amp;nbsp;&lt;/p&gt;' },
      //   { MenuId: 6, MenuName: 'Useful websites 6-2', Priority: 340, ParentMenuId: 2, MenuContent: '&lt;div style=&quot;line-height: normal; margin-ri…=&quot;refHTML&quot;&gt;\r\n\t&amp;nbsp;&lt;/div&gt;' },
      //   { MenuId: 7, MenuName: 'Standard I 7-2', Priority: 570, ParentMenuId: 2, MenuContent: '' },
      //   { MenuId: 8, MenuName: 'Standard II 8-2', Priority: 580, ParentMenuId: 2, MenuContent: '' },
      //   { MenuId: 9, MenuName: 'Standard III 9-3', Priority: 590, ParentMenuId: 3, MenuContent: '' },
      //   { MenuId: 10, MenuName: 'Standard IV 10-4', Priority: 600, ParentMenuId: 4, MenuContent: '' },
      //   { MenuId: 11, MenuName: 'Standard V 11-4', Priority: 610, ParentMenuId: 4, MenuContent: '' },
      //   { MenuId: 12, MenuName: 'Standard VI 12-4', Priority: 620, ParentMenuId: 4, MenuContent: '' },
      //   { MenuId: 13, MenuName: 'Standard VI 13-4', Priority: 620, ParentMenuId: 4, MenuContent: '' },
      // ]

      state.GetNavbarMenuDetails = action.payload.MenuDetails;
      state.Loading = false;
    },
    getLoading(state, action) {
      state.Loading = true;
    }
  }
});

export const getNavbarMenuDetails =
  (data: IGetMenuDetailsBody): AppThunk =>
  async (dispatch) => {
    dispatch(SliceNavbarMenu.actions.getLoading(true));
    const response = await ApiGetMenuDetails.GetMenuDetailsApi(data);
    // console.log(response,"response",response.data.MenuDetails)
    // const itemlist = response?.data.MenuDetails.map((item) => {
    //     return {
    //       id: item.MenuId,
    //       Name: item.MenuName,
    //       Value: item.MenuId,
    //     }
    //   })
    dispatch(SliceNavbarMenu.actions.getNavbarMenuDetails(response.data));
    // dispatch(SliceNavbarMenu.actions.getNavbarMenuDetails([]));
  };

export default SliceNavbarMenu.reducer;
