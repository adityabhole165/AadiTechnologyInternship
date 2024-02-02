import { createSlice } from '@reduxjs/toolkit';
import { IHomework, IHomeworkSubject } from 'src/interfaces/Student/Homework';
import { AppThunk } from 'src/store';
import HomeworkApi from '../../api/Homework/Homework';

const HomeworkSlice = createSlice({
  name: 'homework',

  initialState: {
    HomeworkData: [],
    HomeworkSubjectData: null,
    Loading: true
  },

  reducers: {
    getHomework(state, action) {
      state.Loading = false;
      state.HomeworkData = action.payload.GetHomeworkDetailsResult.Homeworks;
    },

    getHomeworkSubject(state, action) {
      state.Loading = false;
      state.HomeworkSubjectData = action.payload;
    },

    getLoading(state, action) {
      state.Loading = true;
      state.HomeworkData = [];
      state.HomeworkSubjectData = null;
    }
  }
});

export const getHomework =
  (data: IHomework): AppThunk =>
  async (dispatch) => {
    dispatch(HomeworkSlice.actions.getLoading(true));
    const response = await HomeworkApi.GetHomeworkList(data);

    dispatch(HomeworkSlice.actions.getHomework(response.data));
  };

export const getHomeworkSubject =
  (data: IHomeworkSubject): AppThunk =>
  async (dispatch) => {
    dispatch(HomeworkSlice.actions.getLoading(true));
    const response = await HomeworkApi.GetHomeworkSubjectList(data);
    const response1 = await HomeworkApi.GetHomeworkList(data);
    const child = (SubjectId) => {
      return response1.data.GetHomeworkDetailsResult.Homeworks.filter((obj) => {
        return obj.SubjectId === SubjectId;
      }).map((item, index) => {
        return {
          Id: item.Id,
          Name: item.Title,
          Value: item.CompleteByDate.replace('-', ' ').replace('-', ' '),
          navPath: '/extended-sidebar/Student/viewHomework/' + item.Id
        };
      });
    };

    const Data2 =
      response.data.GetHomeworkSubjectsResult.HomeworkSubjects.length === 0
        ? []
        : response.data.GetHomeworkSubjectsResult.HomeworkSubjects.map(
            (item, index) => {
              return {
                Id: index,
                Name: item.SubjectName,
                Child: child(item.SubjectId)
              };
            }
          );
    dispatch(HomeworkSlice.actions.getHomeworkSubject(Data2));
  };

export default HomeworkSlice.reducer;
