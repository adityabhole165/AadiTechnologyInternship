import {createSlice} from '@reduxjs/toolkit'
import HomeworkApi from "../../api/Homework/Homework";
import { AppThunk } from 'src/store';
import { IHomework,IHomeworkSubject} from "src/interfaces/Student/Homework";


const HomeworkSlice = createSlice ({

    name: 'homework',

    initialState: {
        HomeworkData:[],
        HomeworkSubjectData:[],
        Loading:true
    },

    reducers: {
        getHomework(state, action){
          state.Loading = false
        state.HomeworkData = action.payload.GetHomeworkDetailsResult.Homeworks;
      },

      getHomeworkSubject(state, action){
        state.Loading = false
        state.HomeworkSubjectData = action.payload.GetHomeworkSubjectsResult.HomeworkSubjects;
      },
      
      getLoading (state,action) {
        state.Loading = true
        state.HomeworkData=[];
        state.HomeworkSubjectData=[];
    }
    }
});

export const getHomework =
 (data:IHomework):AppThunk => 
    async (dispatch) => {
        dispatch(HomeworkSlice.actions.getLoading(true));
        const response = await HomeworkApi.GetHomeworkList(data);
        dispatch(HomeworkSlice.actions.getHomework(response.data));
      };

 export const getHomeworkSubject =
 (data:IHomeworkSubject):AppThunk => 
    async (dispatch) => {
        dispatch(HomeworkSlice.actions.getLoading(true));
        const response = await HomeworkApi.GetHomeworkSubjectList(data);
        dispatch(HomeworkSlice.actions.getHomeworkSubject(response.data));
      };

export default HomeworkSlice.reducer