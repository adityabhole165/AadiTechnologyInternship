import { createSlice } from "@reduxjs/toolkit";
import { AppThunk } from "src/store";
import { IGetClassDropdownBody,IGetexamDropdownBody,IGetClassSubjectDropdownBody,IGetClassToppersListBOdy } from "src/interfaces/FinalResult/IFinalResultToppers";
import FinalResultToppersApi from "src/api/FinalResult/ApiFinalResultToppers";

const FinalResultToppersSlice = createSlice({
    name: 'FinalResultToppers',

    initialState: {
        ClassDropdownList: [],
        ExamDropdownList:[],
        SubjectDropdownList:[],
        ClassToppers:[]
    },
    reducers: {
        classList(state, action) {
            state.ClassDropdownList = action.payload;
        },
        ExamList(state,action){
            state.ExamDropdownList=action.payload;
        },
        SubjectList(state,action){
            state.SubjectDropdownList=action.payload;
        },
        ToppersList(state,action){
            state.ClassToppers=action.payload;
        },
    }
})
export const ClassdropdownList =
    (data: IGetClassDropdownBody): AppThunk =>
        async (dispatch) => {
            const response = await FinalResultToppersApi.ClassDropdown(data)
            let abc = response.data.map((item, i) => {
                return {
                  Id: item.Division_Name,
                  Name: item.StandardDivision,
                  Value: item.Division_Name,
                }                
              })  
            dispatch(FinalResultToppersSlice.actions.classList(abc))
        console.log(abc,"abc");
        
        };
        export const ClassExamList =
        (data: IGetexamDropdownBody): AppThunk =>
            async (dispatch) => {
                const response = await FinalResultToppersApi.ClassExamDropdown(data)
                let abc = response.data.map((item, i) => {
                    return {
                      Id: item.Original_SchoolWise_Test_Id,
                      Name: item.SchoolWise_Test_Name,
                      Value: item.Original_SchoolWise_Test_Id,
                    }                
                  })
                dispatch(FinalResultToppersSlice.actions.ExamList(abc))
            };
            export const ClassSubjectList =
            (data: IGetClassSubjectDropdownBody): AppThunk =>
                async (dispatch) => {
                    const response = await FinalResultToppersApi.  ClassSubjectDropdown(data)
                    let abc = response.data.map((item, i) => {
                        return {
                          Id: item.Subject_Id,
                          Name: item.Subject_Name,
                          Value: item.Subject_Name,
                        }                
                      })
                    dispatch(FinalResultToppersSlice.actions.SubjectList(abc))
                };
                export const ClassTopperList =
                (data:IGetClassToppersListBOdy): AppThunk =>
                    async (dispatch) => {
                        const response = await FinalResultToppersApi.ClassToppersList(data)
                        console.log(response,"abc-------------------");

                         let abc = response.data.GetTopperList.map((item, i) => {
                             return {
                               Text1: item.Student_Name,
                               Text2: item.Total_Marks,
                               Text3: item.Marks_Scored,
                               Text4: localStorage.getItem("SiteURL") + item.Rank_Image.replace("~",""),
                             }                
                           })
                        dispatch(FinalResultToppersSlice.actions.ToppersList(abc))
                        
                    };
                        
                    
                 
export default FinalResultToppersSlice.reducer