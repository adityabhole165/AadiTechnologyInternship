import { createSlice } from '@reduxjs/toolkit'
import ApiHomework from "../../api/Homework/ApiHomeworkNew";
import { AppThunk } from 'src/store';
import { HomeworkDailyLogsBody, IGetDatewiseHomeworkDetailsBody } from "src/interfaces/Student/IHomeworkNew";
import { getDateMonthFormatted, getDateMonthYearFormatted } from 'src/components/Common/Util';


const SliceHomework = createSlice({

    name: 'HomeworkNew',

    initialState: {
        GetHomeworkDetails: [],
        GetHomeworkDates: [],
        HomeworkDailyLogs:[],
        ButtonState: null,
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

        getHomeworkDailyLogs(state, action) {
            state.HomeworkDailyLogs = action.payload;
            state.Loading = false;
        },
        getButtonState(state, action) {
            state.ButtonState = action.payload;
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
            const response = await ApiHomework.GetDatewiseHomeworkDetails(data)
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
            const response = await ApiHomework.GetDatewiseHomeworkDetails(data)
            
            let HomeworkList = response.data.HomeworkDates?.map((item, index) => {
                return {
                    Id: index,
                    Name: getDateMonthYearFormatted(item),
                    Value: getDateMonthYearFormatted(item),
                    IsActive: false
                }
            })

        
            const child = (SubjectId) => {
                return response.data.HomeworkDetails
                    .filter((obj) => {
                        return obj.SubjectId === SubjectId;
                    })
                    .map((item, index) => {
                        return {
                            Id: item.Id,
                            Name: item.Title,
                            Value: item.CompleteByDate.replace("-", " ").replace("-", " "),
                            navPath: '/extended-sidebar/Student/viewHomework/' + item.Id + '/' + item.AssignedDate,
                            AssignedDate: item.AssignedDate
                        };
                    })
            }
            let subjectArr = [];
            const Data2 = []
            response.data.HomeworkDetails.map((item, index) => {

                    if(!subjectArr.includes(item.SubjectId)){
                        subjectArr.push(item.SubjectId)
                        Data2.push( {
                        Id: index,
                        Name: item.SubjectName,
                        AssignedDate: item.AssignedDate,
                        Child: child(item.SubjectId)
                    });

                }

                })
            dispatch(SliceHomework.actions.getHomeworkDates(HomeworkList));
            dispatch(SliceHomework.actions.getHomeworkDetails(Data2));
            dispatch(SliceHomework.actions.getButtonState(response.data.HomeworkDateStatus));
        };



    export const getHomeworkDailyLogs =
    (data: HomeworkDailyLogsBody): AppThunk =>
        async (dispatch) => {
            dispatch(SliceHomework.actions.getLoading(true));
            const response = await ApiHomework.GetHomeworkDailyLogs(data)
            console.log(response ,"responseDaily")
            let HomeworkDailyLogs = response.data.GetStudentDailyLogDetails?.map((item, index) => {
          
                return {
                    
                    Id: index,
                    Header: getDateMonthYearFormatted(item.Date),
                    Text1: item.AttachmentPath,
                   
                }
            })

            dispatch(SliceHomework.actions.getHomeworkDailyLogs(HomeworkDailyLogs));
        };

     

export default SliceHomework.reducer;