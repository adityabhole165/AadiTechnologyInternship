import { createSlice } from '@reduxjs/toolkit';
import AbsentStudentapi from 'src/api/AbsentStudentPopCp/AbsentStudentApi';
import { IGetAbsentStudentBody } from 'src/interfaces/AbsentStudentPopCp/IAbsentStudent';
import { AppThunk } from 'src/store';

const AbsentStudentslice = createSlice({
    name: 'AbsentStudent',
    initialState: {
        getlistAbsentStudentDetails: [],
        getlistLinkVisible: []
    },
    reducers: {
        listAbsentStudent(state, action) {
            state.getlistAbsentStudentDetails = action.payload;
        },

        listLinkVisible(state, action) {
            state.getlistLinkVisible = action.payload;
        },
    }
});

export const AbsentStudents = (data: IGetAbsentStudentBody): AppThunk => async (dispatch) => {
    const response = await AbsentStudentapi.GetAbsentStudentDetailsPopup(data);
    let AbsentStudent = response.data.listGetAbsentStudentDetails.map((item, i) => {

        return {
            Id: item.YearWise_Student_Id,
            Text1: item.EnrolmentNumber,
            Text2: item.RollNo,
            Text3: item.className,
            Text4: item.StudentName,

        };

    });

    let linkVisible = response.data.listLinkVisible.map((item, i) => {

        return {
            IsLinkVisibel: item.IsLinkVisibel,

        }
    })
    dispatch(AbsentStudentslice.actions.listAbsentStudent(AbsentStudent));
    dispatch(AbsentStudentslice.actions.listLinkVisible(linkVisible));
};

export default AbsentStudentslice.reducer;
