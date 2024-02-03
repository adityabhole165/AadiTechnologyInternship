import { createSlice } from '@reduxjs/toolkit';
import DailyLogApi from 'src/api/AddDailyLog/ApiAddDailyLog';
import { getDateMonthYearFormatted } from 'src/components/Common/Util';
import {
  IDeleteHomeworkDailyLogBody,
  IGetAllHomeworkDailyLogsBody,
  IGetHomeworkDailyLogBody,
  IPublishUnpublishHomeworkDailylogBody,
  ISaveDailyLogBody
} from 'src/interfaces/AddDailyLog/IAddDailyLog';
import { AppThunk } from 'src/store';

const DailyLogSlice = createSlice({
  name: 'Assign Homework',
  initialState: {
    Savelog: '',
    GetAllHomework: [],
    GetHomeworkDailyLog: [],
    DeleteHomework: '',
    ResetDelete: '',
    FilePath: '',
    PublishUnpublish: '',
    ISGetfile: ''
  },

  reducers: {
    Savedailylog(state, action) {
      state.Savelog = action.payload;
    },
    getalldailylog(state, action) {
      state.GetAllHomework = action.payload;
    },
    getdailylog(state, action) {
      state.GetHomeworkDailyLog = action.payload;
    },
    deletedailylog(state, action) {
      state.DeleteHomework = action.payload;
    },
    ResetDeleteLog(state) {
      state.ResetDelete = '';
    },
    resetFilepath(state) {
      state.FilePath = '';
    },
    PublishUnpublishHomework(state, action) {
      state.PublishUnpublish = action.payload;
    },

    RGetfile(state, action) {
      state.ISGetfile = action.payload;
    }
  }
});
export const Savedailylog =
  (data: ISaveDailyLogBody): AppThunk =>
  async (dispatch) => {
    const response = await DailyLogApi.SaveDailyLog(data);
    dispatch(DailyLogSlice.actions.Savedailylog(response.data));
  };
export const getalldailylog =
  (data: IGetAllHomeworkDailyLogsBody): AppThunk =>
  async (dispatch) => {
    const response = await DailyLogApi.GetAllHomeworkDailyLogs(data);
    let responseData = response.data.map((item) => {
      return {
        Id: item.Id,
        Text1: getDateMonthYearFormatted(item.Date),
        Text2: item.AttchmentName,
        Text3: item.IsPublished
      };
    });

    let GetFile = response.data.map((item) => {
      return {
        Id: item.Id,
        Text1: item.AttchmentName
      };
    });

    dispatch(DailyLogSlice.actions.getalldailylog(responseData));
    dispatch(DailyLogSlice.actions.RGetfile(GetFile));
  };

export const getdailylog =
  (data: IGetHomeworkDailyLogBody): AppThunk =>
  async (dispatch) => {
    const response = await DailyLogApi.GetHomeworkDailyLog(data);
    dispatch(DailyLogSlice.actions.getdailylog(response.data));
  };

export const ResetFilePath = (): AppThunk => async (dispatch) => {
  dispatch(DailyLogSlice.actions.resetFilepath());
};

export const deletedailylog =
  (data: IDeleteHomeworkDailyLogBody): AppThunk =>
  async (dispatch) => {
    const response = await DailyLogApi.DeleteHomeworkDailyLog(data);

    dispatch(DailyLogSlice.actions.deletedailylog(response.data));
  };

export const ResetDeleteLog = (): AppThunk => async (dispatch) => {
  dispatch(DailyLogSlice.actions.ResetDeleteLog());
};

export const PublishUnpublishHomework =
  (data: IPublishUnpublishHomeworkDailylogBody): AppThunk =>
  async (dispatch) => {
    const response = await DailyLogApi.PublishUnpublishHomeworkDailylog(data);
    dispatch(DailyLogSlice.actions.PublishUnpublishHomework(response.data));
  };

export default DailyLogSlice.reducer;
