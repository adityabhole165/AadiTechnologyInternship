import { createSlice } from '@reduxjs/toolkit';
import SchoolAttendanceOverviewApi from 'src/api/SchoolAttendanceOverview/ApiSchoolAttendanceOverview';
import { IGetSchoolAttendanceOverviewBody } from 'src/interfaces/SchoolAttendanceOverview/ISchoolAttendanceOverview';
import { AppThunk } from 'src/store';

const SchoolAttendanceOverviewSlice = createSlice({
  name: 'SchoolAttendanceOverview',
  initialState: {
    AttendanceOverviewGridData: [],
    AttendanceOverviewDivArray: [],
    WeekendStatusList: ''
  },
  reducers: {
    GetWeekendStatusList(state, action) {
      state.WeekendStatusList = action.payload;
    },
    RAttendanceOverviewGridData(state, action) {
      state.AttendanceOverviewGridData = action.payload;
    },
    RAttendanceOverviewDivArray(state, action) {
      state.AttendanceOverviewDivArray = action.payload;
    }
  }
});

export const GetStudentAttendance =
  (data: IGetSchoolAttendanceOverviewBody): AppThunk =>
    async (dispatch) => {
      const response = await SchoolAttendanceOverviewApi.SchoolAttendanceOverview(
        data
      );
      // let a = response.data.ClasswiseAttendanceStatusList.map((item, i) => {
      //   return {
      //     id: i,
      //     Text1: item.DivisionName,
      //     Text2: item.StandardName,
      //     Text3: item.DivisionId,
      //     Text4: item.AttendanceTaken,
      //     Text5: item.PresentStudentWithTotal,
      //     Text6: item.StandardId,
      //     Text7: item.SchoolWiseStandardDivisionId
      //   }
      // })

      const getPresentStudentWithTotal = (div, std) => {
        let returnVal = '';
        response.data.ClasswiseAttendanceStatusList.map((item) => {
          if (item.DivisionName == div && item.StandardName == std) {
            returnVal = item.PresentStudentWithTotal;
          }
        });
        return returnVal;
      };
      const MarkedTotalDivision = (StandardId) => {
        let returnVal = '';
        response.data.MDTD_PSTSList.map((item) => {
          if (item.StandardId == StandardId) {
            returnVal = item.Marked_TotalDivision;
          }
        });
        return returnVal;
      };

      const PresentTotalStudent = (StandardId) => {
        let returnVal = '';
        response.data.MDTD_PSTSList.map((item) => {
          if (item.StandardId == StandardId) {
            returnVal = item.Present_TotalStudent;
          }
        });
        return returnVal;
      };

      function getHolidayTooltip(std, div) {
        let holiday = '';
        response.data.ClasswiseAttendanceStatusList?.forEach((item) => {
          if (item.DivisionName === div && item.StandardName === std && item.PresentStudentWithTotal === 'Holiday') {
            holiday = item.AssociatedHoliday;
          }
        });
        return holiday;
      }

      const StandardsPresentStudentPercentage = (StandardId) => {
        let returnVal = '';
        response.data.MDTD_PSTSList.map((item) => {
          if (item.StandardId == StandardId) {
            returnVal = item.StandardsPresentStudentPercentage;
          }
        });
        return returnVal;
      };
      let DivArray = [];
      let StdArray = [];
      let StdArrayId = [];
      response.data.ClasswiseAttendanceStatusList.map((item, i) => {
        if (!StdArray.includes(item.StandardName))
          StdArray.push(item.StandardName);
      });
      response.data.ClasswiseAttendanceStatusList.map((item, i) => {
        if (!StdArrayId.includes(item.StandardId))
          StdArrayId.push(item.StandardId);
      });
      response.data.ClasswiseAttendanceStatusList.map((item, i) => {
        if (!DivArray.includes(item.DivisionName))
          DivArray.push(item.DivisionName);
      });
      let GridData = [],
        GridLastData = [''],
        RowData = [],
        i = 0,
        j = 0,
        PresentStudentWithTotal = '';
      for (j = 0; j < StdArray.length; j++) {
        RowData = [StdArray[j]];
        for (i = 0; i < DivArray.length; i++) {
          PresentStudentWithTotal = getPresentStudentWithTotal(
            DivArray[i],
            StdArray[j]
          );
          RowData.push({ name: PresentStudentWithTotal, toolTip: getHolidayTooltip(StdArray[j], DivArray[i]) });
        }
        RowData.push(MarkedTotalDivision(StdArrayId[j]));   // marked for
        RowData.push(PresentTotalStudent(StdArrayId[j]));  // total
        RowData.push(StandardsPresentStudentPercentage(StdArrayId[j])); // %

        GridData.push(RowData);
        console.log('pushed data,', RowData);
      }
      for (i = 0; i < DivArray.length; i++) {
        GridLastData.push('');
      }
      GridLastData.push(
        response.data.Marked_Total_DivisionList[0].MarkedDivision_TotalDivision
      );
      GridLastData.push(
        response.data.Present_Total_StudentList[0].PresentStudent_TotalStudent
      );
      GridLastData.push(
        response.data.PresentStudent_PercentageList[0].PresentStudentPercentage
      );
      GridData.push(GridLastData);
      dispatch(
        SchoolAttendanceOverviewSlice.actions.RAttendanceOverviewGridData(
          GridData
        )
      );
      dispatch(
        SchoolAttendanceOverviewSlice.actions.RAttendanceOverviewDivArray(
          DivArray
        )
      );
      dispatch(
        SchoolAttendanceOverviewSlice.actions.GetWeekendStatusList(
          response.data.WeekendStatusList[0].OutSideAcademicYear
        )
      );
    };

export default SchoolAttendanceOverviewSlice.reducer;
