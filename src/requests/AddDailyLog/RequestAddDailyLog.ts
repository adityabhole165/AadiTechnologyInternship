import { createSlice } from '@reduxjs/toolkit';
import { AppThunk } from 'src/store';
import DailyLogApi from 'src/api/AddDailyLog/ApiAddDailyLog';
import { ISaveDailyLogBody ,IGetAllHomeworkDailyLogsBody,IGetAllHomeworkDailyLogsResult} from "src/interfaces/AddDailyLog/IAddDailyLog";


const DailyLogSlice = createSlice({
    name: 'Assign Homework',
    initialState: { 
        Savelog:"",
        GetAllHomework:[],
        
        
    },
    reducers: {
      Savedailylog(state, action) {
            state.Savelog = action.payload;
        },
        getalldailylog(state, action) {
            state.GetAllHomework = action.payload;
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
            
                Text1:item.Date,
                Text2: item.AttchmentName,
                Text3: item.IsPublished
            }
        })
        dispatch(DailyLogSlice.actions.getalldailylog(responseData));
    };

    export default DailyLogSlice.reducer;