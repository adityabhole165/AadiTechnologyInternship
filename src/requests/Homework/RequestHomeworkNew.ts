import { createSlice } from '@reduxjs/toolkit'
import ApiHomework from "../../api/Homework/ApiHomeworkNew";
import { AppThunk } from 'src/store';
import { IGetDatewiseHomeworkDetailsBody } from "src/interfaces/Student/IHomeworkNew";


const SliceHomework = createSlice({

    name: 'HomeworkNew',

    initialState: {
        GetHomeworkDetails: [],
        GetHomeworkDates: [],
        Loading: true
    },

    reducers: {
        getHomeworkDetails(state, action) {
            state.GetHomeworkDetails = action.payload;
            state.Loading = false;

        },
        getHomeworkDates(state, action) {
            state.GetHomeworkDates = action.payload;
            state.Loading = false;
        },
        getLoading(state, action) {
            state.Loading = true
        }
    }
});

export const getHomeworkDetails =
    (data: IGetDatewiseHomeworkDetailsBody): AppThunk =>
        async (dispatch) => {
            dispatch(SliceHomework.actions.getLoading(true));
            const response = await ApiHomework.GetHomeworkList(data)
        //     let HomeworkList = response.data.HomeworkDetails.map((item, index) => {
        //         return {
        //             Id: item.Id,
        //             Name: item.AssignedDate,
        //             Value: item.AssignedDate,
        //             IsActive: item.IsPublished
          
        // }
        //     })

            dispatch(SliceHomework.actions.getHomeworkDetails(response.data));
        };

        export const getHomeworkDates =
    (data: IGetDatewiseHomeworkDetailsBody): AppThunk =>
        async (dispatch) => {
            dispatch(SliceHomework.actions.getLoading(true));
            const response = await ApiHomework.GetHomeworkList(data)
        //     let HomeworkList = response.data.HomeworkDates.map((item, index)  => {
        //         return {
                  
        //             Name: item.HomeworkDates,
                    
          
        // }
        //     })
            dispatch(SliceHomework.actions.getHomeworkDates(response.data));
        };



export default SliceHomework.reducer;