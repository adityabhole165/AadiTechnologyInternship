
import { createSlice } from "@reduxjs/toolkit";
import ApiFinalResultGenerateAll from "src/api/FinalResult/ApiFinalResultGenerateAll";
import { IGetGenerateAllStudentBody, IGetStudentPrrogressReportBody, IViewBody } from "src/interfaces/FinalResult/IFinalResultGenerateAll";
import { AppThunk } from "src/store";



const FinalResultGenerateAllSlice = createSlice({
    name: 'FinalResultGenerateAll',

    initialState: {
        getStudentDetails: [],
        getGenerateAll: '',
        getViewResult: [],
        Loading: true
    },

    reducers: {
        StudentDetails(state, action) {
            state.Loading = false;
            state.getStudentDetails = action.payload;
        },
        GenerateAll(state, action) {
            state.Loading = false;
            state.getGenerateAll = action.payload;
        },
        resetGenerateAll(state) {
            state.Loading = false;
            state.getGenerateAll = '';
        },
        ViewResult(state, action) {
            state.Loading = false;
            state.getViewResult = action.payload;
        },
        getLoading(state, action) {
            state.Loading = true;
            state.getStudentDetails = [];
        }
    }

});

export const StudentDetailsGA =
    (data: IGetStudentPrrogressReportBody): AppThunk =>
        async (dispatch) => {
            const response = await ApiFinalResultGenerateAll.StudentPrrogressReport(data);
            let abc = response.data.listStudentsDetails.map((item, i) => {
                return {
                    Id: item.YearWise_Student_Id,
                    Text1: item.Student_Name,
                    Text2: item.Roll_No,
                    Text3: item.Standard_Name,
                    Text4: item.Division_Name,
                    Text5: item.Academic_Year
                };
            });
            dispatch(FinalResultGenerateAllSlice.actions.StudentDetails(abc));
            console.log(abc)
        }



export const GenerateAllGA = (data: IGetGenerateAllStudentBody): AppThunk => async (dispatch) => {
    dispatch(FinalResultGenerateAllSlice.actions.getLoading(true));
    const response = await ApiFinalResultGenerateAll.GenerateResultAll(data);
    console.log(response, 'dddf');
    dispatch(FinalResultGenerateAllSlice.actions.GenerateAll(response.data));
    console.log(response.data, 'assdf');
};


export const resetGenerateAllGA = (): AppThunk => async (dispatch) => {
    dispatch(FinalResultGenerateAllSlice.actions.resetGenerateAll());
};


export const ViewResultGA =
    (data: IViewBody): AppThunk =>
        async (dispatch) => {
            const response = await ApiFinalResultGenerateAll.ViewReportProgress(data);
            let abc = response.data.listStudentDetail.map((item, i) => {
                return {
                    Id: item.YearWise_Student_Id,
                    Text1: item.School_Name,
                    Text2: item.Roll_No,
                    Text3: item.Standard_Name,
                    Text4: item.Division_Name,
                    Text5: item.Academic_Year
                };
            });
            dispatch(FinalResultGenerateAllSlice.actions.ViewResult(abc));
            console.log(abc)
        }



export default FinalResultGenerateAllSlice.reducer