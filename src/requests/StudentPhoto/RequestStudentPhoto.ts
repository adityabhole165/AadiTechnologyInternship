import { createSlice } from '@reduxjs/toolkit';
import { AppThunk } from 'src/store';
import ApiStudentPic from 'src/api/StudentPhoto/ApiStudentPhoto';
import { IGetStudentPhotoBody } from 'src/interfaces/Student/GetStudentPhoto';

const SliceStudentPic = createSlice({
    name: 'StudentPic',
    initialState: {
        GetStudentpic: null
    },
    reducers: {
        getStudentPhoto(state, action) {
            state.GetStudentpic = action.payload.StudentPhotoDetails;
        }
    }
});

    export const getstudentpic =
  (data: IGetStudentPhotoBody): AppThunk =>
    async (dispatch) => {
      const response = await ApiStudentPic.GetStudentPhoto(data)
      dispatch(SliceStudentPic.actions.getStudentPhoto(response.data));
    };
    

    export default SliceStudentPic.reducer;