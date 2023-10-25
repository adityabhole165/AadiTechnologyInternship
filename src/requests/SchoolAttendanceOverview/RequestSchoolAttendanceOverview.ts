import { createSlice } from '@reduxjs/toolkit';
import { AppThunk } from 'src/store';
import SchoolAttendanceOverviewApi from 'src/api/SchoolAttendanceOverview/ApiSchoolAttendanceOverview';
import {IGetSchoolAttendanceOverviewBody , IGetSchoolAttendanceOverviewResult } from "src/interfaces/SchoolAttendanceOverview/ISchoolAttendanceOverview" ;

const SchoolAttendanceOverviewSlice = createSlice({
    name: 'SchoolAttendanceOverview',
    initialState: {
        SchoolAttendanceOverview: [],
       
    },
    reducers: {
        GetSchoolAttendanceOverview(state, action) {
          state.SchoolAttendanceOverview = action.payload;
        },
        
    }


});

export const GetStudentAttendance =
  (data: IGetSchoolAttendanceOverviewBody): AppThunk =>
   async (dispatch) => {
   const response = await SchoolAttendanceOverviewApi.SchoolAttendanceOverview(data);
   console.log(response ,"response")
   let a = response.data.ClasswiseAttendanceStatusList.map((item, i) => {
    return {
      id:i,
       Text1: item.DivisionName,
       Text2: item.StandardName,
       Text3: item.DivisionId,
       Text4: item.AttendanceTaken,
       Text5: item.PresentStudentWithTotal,
       Text6: item.StandardId,
       Text7: item.SchoolWiseStandardDivisionId

              
       
    }
    })
    

  
   
   dispatch(SchoolAttendanceOverviewSlice.actions.GetSchoolAttendanceOverview(a))
   }

   export default SchoolAttendanceOverviewSlice.reducer 
   