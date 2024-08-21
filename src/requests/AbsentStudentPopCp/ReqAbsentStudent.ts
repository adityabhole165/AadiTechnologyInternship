import { createSlice } from '@reduxjs/toolkit';
import AbsentStudentapi from 'src/api/AbsentStudentPopCp/AbsentStudentApi';
import { IGetAbsentStudentBody, ISchoolIdBody } from 'src/interfaces/AbsentStudentPopCp/IAbsentStudent';
import { AppThunk } from 'src/store';

const AbsentStudentslice = createSlice({
    name: 'AbsentStudent',
    initialState: {
        getlistAbsentStudentDetails: [],
        getlistLinkVisible: {},
        IsGetSchoolSettings: {},
    },
    reducers: {
        listAbsentStudent(state, action) {
            state.getlistAbsentStudentDetails = action.payload;
        },

        listLinkVisible(state, action) {
            state.getlistLinkVisible = action.payload;
        },

        getSchoolSettings(state, action) {
            state.IsGetSchoolSettings = action.payload;
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

    let linkVisible = response.data.listLinkVisible.IsLinkVisibel

    dispatch(AbsentStudentslice.actions.listAbsentStudent(AbsentStudent));
    dispatch(AbsentStudentslice.actions.listLinkVisible(linkVisible));
};


export const GetSchoolSettings =
    (data: ISchoolIdBody): AppThunk =>
        async (dispatch) => {
            const response = await AbsentStudentapi.GetSchoolSettings(data)

            dispatch(AbsentStudentslice.actions.getSchoolSettings(response.data.GetSchoolSettingsResult.StudentAbsentCount));

        };
export default AbsentStudentslice.reducer;
