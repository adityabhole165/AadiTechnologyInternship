import { createSlice } from '@reduxjs/toolkit'
import { AppThunk } from 'src/store';
import  ApiEmailSettings from 'src/api/MessageCenter/ApiEmailSettings'
import { IGetUserEmailSettingsBody } from 'src/interfaces/MessageCenter/IEmailSettings';

const SliceEmailSettings = createSlice({
    name: 'Email Settings',
    initialState: {
      EmailSettingsList: [],
      Loading: true,
    },
    reducers: {
        GetUserEmailSettings(state, action) {
          state.Loading = false;
          state.EmailSettingsList = action.payload.EmailSetting.data;
        },
        getLoading (state,action) {
            state.Loading = true
            state.EmailSettingsList = [];
        }
        }
      });

      export const getUserEmailSettings =
  (data: IGetUserEmailSettingsBody): AppThunk =>
    async (dispatch) => {
      dispatch(SliceEmailSettings.actions.getLoading(true));
      const response = await ApiEmailSettings.EmailSettingsapi(data)
      dispatch(SliceEmailSettings.actions.GetUserEmailSettings(response.data));
    };

export default SliceEmailSettings.reducer