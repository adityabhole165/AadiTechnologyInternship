import { createSlice } from '@reduxjs/toolkit';
import ApiStudents from 'src/api/Students/ApiStudents';
import { IGetStandardDivisionOfTeacherBody, IGetStudentsListBody } from 'src/interfaces/Students/IStudents';
import { AppThunk } from 'src/store';


const StudentsSlice = createSlice({
    name: 'Students',
    // Initial states
    initialState: {
        ISRGetStdDivForTeacher: [],
        ISGetStudentsList: [],
        NavigationValues: null,
        Loading: true
    },

    // Reducers
    reducers: {
        RGetStdDivForTeacher(state, action) {
            state.ISRGetStdDivForTeacher = action.payload;
            state.Loading = false;
        },
        RGetStudentsList(state, action) {
            state.ISGetStudentsList = action.payload;
            state.Loading = false;
        },
        RSetNavigationValues(state, action) { // New reducer to handle NavigationValues
            state.NavigationValues = action.payload;
        },
        getLoading(state, action) {
            state.Loading = true;
        },

    }
});

// CDA's - Control Dispatch Action
export const CDAGetStandardDivisionOfTeacher =
    (data: IGetStandardDivisionOfTeacherBody): AppThunk =>
        async (dispatch) => {
            dispatch(StudentsSlice.actions.getLoading(true));
            const response = await ApiStudents.GetStandardDivisionOfTeacherApi(data);
            const responseData = response.data.map((item, i) => {
                return ({
                    Id: item.StandardDivision,
                    Name: item.StandardDivision,
                    Value: item.StandardDivision,
                    SchoolStdDivId: item.SchoolWise_Standard_Division_Id,
                    StandardId: item.standard_Id,
                    DivisionId: item.division_Id,
                })
            })
            // responseData.unshift({ Id: '0', Name: 'Select class', Value: '0', SchoolStdDivId: '0', StandardId: '0', DivisionId: '0' });
            dispatch(StudentsSlice.actions.RGetStdDivForTeacher(responseData));
        };

export const CDAGetStudentsList =
    (data: IGetStudentsListBody): AppThunk =>
        async (dispatch) => {
            dispatch(StudentsSlice.actions.getLoading(true));
            const response = await ApiStudents.GetStudentsListApi(data);
            const responseData = response.data.map((item, i) => {
                return ({
                    Text1: item.Name,
                    Text2: item.Roll_No,
                    Text3: item.Enrolment_Number,
                    Text4: item.DOB,
                    Text5: item.SchoolWise_Standard_Division_Id,
                    Text6: item.Is_Leave,
                    Text7: item.SchoolLeft_Date,
                    Text8: item.Photo_file_Path_Image,
                    Text9: item.TotalRows,
                    Text10: item.StudentIsOnLeave,
                    Text11: item.Is_Locked,
                    Text12: item.YearWise_Student_Id,
                    Text13: item.SchoolWise_Student_Id,
                    Text14: item.StandardDivision,
                    Text15: item.Joining_Date,
                    Text16: item.User_Id,
                })
            })
            dispatch(StudentsSlice.actions.RGetStudentsList(responseData));
        }

export const CDANavigationValues =
    (data): AppThunk =>
        async (dispatch) => {
            dispatch(StudentsSlice.actions.RSetNavigationValues(data));
        };


export default StudentsSlice.reducer;
