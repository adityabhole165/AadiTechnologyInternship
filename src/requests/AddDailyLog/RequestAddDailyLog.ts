import { createSlice } from '@reduxjs/toolkit';
import { AppThunk } from 'src/store';
import DailyLogApi from 'src/api/AddDailyLog/ApiAddDailyLog';
import { ISaveDailyLogBody ,IGetAllHomeworkDailyLogsBody,IGetHomeworkDailyLogBody,IDeleteHomeworkDailyLogBody,IPublishUnpublishHomeworkDailylogBody} from "src/interfaces/AddDailyLog/IAddDailyLog";
import {  getDateMonthYearFormatted  } from 'src/components/Common/Util';


const DailyLogSlice = createSlice({
    name: 'Assign Homework',
    initialState: { 
        Savelog:"",
        GetAllHomework:[],
        GetHomeworkDailyLog:[],
        DeleteHomework:"",
        ResetDailyLog : "",
        FilePath:"",
        PublishUnpublish:""
        
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
        ResetDeletedLog (state) {
            state.ResetDailyLog = "";
        },
        resetFilepath (state) {
            state.FilePath = "";
        },
        PublishUnpublishHomework(state, action) {
            state.PublishUnpublish = action.payload;
        },
    }
});
export const Savedailylog =
  (data: ISaveDailyLogBody): AppThunk =>
    async (dispatch) => {
      const response = await DailyLogApi.SaveDailyLog(data)
      dispatch(DailyLogSlice.actions.Savedailylog(response.data))
    }
    export const getalldailylog = 
    (data:IGetAllHomeworkDailyLogsBody ) : AppThunk =>
    async (dispatch) => {
        const response = await DailyLogApi.GetAllHomeworkDailyLogs(data)
        let responseData = response.data.map((item) => {
     
            return{
            
                Text1: getDateMonthYearFormatted(item.Date),
                Text2: item.AttchmentName,
                Text3: item.IsPublished
            }
        })

        dispatch(DailyLogSlice.actions.getalldailylog(responseData));
    };

    export const getdailylog =
  (data: IGetHomeworkDailyLogBody): AppThunk =>
    async (dispatch) => {
      const response = await DailyLogApi.GetHomeworkDailyLog(data)
      dispatch(DailyLogSlice.actions.getdailylog(response.data))
    }


    export const ResetFilePath =
    (): AppThunk =>
    async (dispatch) => {
      dispatch(DailyLogSlice.actions.resetFilepath());
    };
  

    export const deletedailylog =
  (data: IDeleteHomeworkDailyLogBody): AppThunk =>
    async (dispatch) => {
      const response = await DailyLogApi.DeleteHomeworkDailyLog(data)
      
      dispatch(DailyLogSlice.actions.deletedailylog(response.data))
    }
    
    export const ResetDeletedLog =
  (): AppThunk =>
    async (dispatch) => {
      dispatch(DailyLogSlice.actions.ResetDeletedLog())
    }

    export const PublishUnpublishHomework =
  (data: IPublishUnpublishHomeworkDailylogBody): AppThunk =>
    async (dispatch) => {
      const response = await DailyLogApi.PublishUnpublishHomeworkDailylog(data)
      dispatch(DailyLogSlice.actions.PublishUnpublishHomework(response.data))
    }

    export default DailyLogSlice.reducer;