import { createSlice } from '@reduxjs/toolkit';
import GetTAttendanceListApi from 'src/api/TAttendance/TAttendance';
import {
  getDateFromatDateTime,
  getDateMonthSpace,
  getDateMonthYearDayDash,
  getDateMonthYearFormatted
} from 'src/components/Common/Util';
import StandardAttendance, {
  IStudentsDetails
} from 'src/interfaces/Teacher/TAttendance';
import AttendanceData, {
  IDeleteAttendanceBody,
  IGetAcademicDatesForStandardDivisionBody,
  IGetAttendanceStatus,
  IGetClassTeachersBodynew,
  IGetStudentDetails,
  IGetSummaryCountforAttendanceBody,
  ISaveAttendance,
  ISaveStudentAttendenceBody
} from 'src/interfaces/Teacher/TAttendanceList';
import { AppThunk } from 'src/store';

const TAttendanceSlice = createSlice({
  name: 'TAttendance',
  initialState: {
    StandardDivisionAttendance: [],
    AttendanceData: [],
    GetStudentDetailsList: [],
    AttendanceStatus: '',
    StudentList: [],
    SaveAttendanceStatus: [],
    stdlist: [],
    StudentAttendanceData: [],
    StudentAbsent: '',
    SaveResponse: '',
    AYStatus: '',
    ISGetSummaryCountforAttendance: null,
    listAttendanceCalender: [],
    DeleteAttendance: '',
    ISClassTeacherList: [],
    GetAcademicDates: null
  },
  reducers: {
    getStandardList(state, action) {
      state.StandardDivisionAttendance = action.payload;
    },
    getStandard(state, action) {
      state.stdlist = action.payload;
    },
    getTAttendanceList(state, action) {
      state.AttendanceData = action.payload;
    },
    getAttendanceStudentList(state, action) {
      state.StudentAttendanceData = action.payload;
    },
    GetStudentDetailsList(state, action) {
      state.GetStudentDetailsList = action.payload;
    },
    getAcademicDates(state, action) {
      state.GetAcademicDates = action.payload;
    },
    GetStudentList(state, action) {
      if (action.payload === null) {
        state.StudentAbsent = '';
        state.StudentList = [];
      } else {
        state.StudentList = action.payload;
        let arr = [];
        action.payload.map((obj) => {
          if (!obj.isActive) arr.push(obj.text1);
        });
        state.StudentAbsent = arr.join(',');
      }
    },
    GetAttendanceStatusList(state, action) {
      state.AttendanceStatus = action.payload;
    },

    GetSaveAttendanceStatusList(state, action) {
      const arr = action.payload[0].RollNo.split(', ');

      state.StudentList = state.StudentList.map((obj) => {
        return arr.includes(obj.text1.toString())
          ? { ...obj, isActive: false }
          : { ...obj, isActive: true };
      });
      state.StudentAbsent = arr.join(',');
      state.SaveAttendanceStatus = action.payload;
    },
    getSaveResponse(state, action) {
      state.SaveResponse = action.payload;
    },
    getAYStatus(state, action) {
      state.AYStatus = action.payload;
    },

    RGetSummaryCountforAttendance(state, action) {
      state.ISGetSummaryCountforAttendance =
        action.payload.GetSummaryCountforAttendance;
      state.listAttendanceCalender = action.payload.listAttendanceCalender;
    },

    RDeleteAttendance(state, action) {
      state.DeleteAttendance = action.payload;
    },

    resetDeleteAttendance(state) {
      state.DeleteAttendance = '';
    },

    RTeacherNameList(state, action) {
      state.ISClassTeacherList = action.payload;
    }
  }
});

export const setSaveResponse = (): AppThunk => async (dispatch) => {
  dispatch(TAttendanceSlice.actions.getSaveResponse(''));
};
export const getAttendanceDataList =
  (data: AttendanceData): AppThunk =>
    async (dispatch) => {
      const response = await GetTAttendanceListApi.GetAttendanceData(data);
      dispatch(TAttendanceSlice.actions.getTAttendanceList(response.data));
    };
export const getAttendanceStudentList =
  (data: AttendanceData): AppThunk =>
    async (dispatch) => {
      const response = await GetTAttendanceListApi.GetAttendanceData(data);
      const studentAttendanceList = response.data.map((item, index) => {
        return {
          text1: item.RollNumber,
          text2: item.StudentName,
          isActive: item.IsPresent,
          status: item.Status
        };
      });
      dispatch(
        TAttendanceSlice.actions.getAttendanceStudentList(studentAttendanceList)
      );
    };

export const GetStudentDetailsList =
  (data: IGetStudentDetails): AppThunk =>
    async (dispatch) => {
      const response = await GetTAttendanceListApi.GetStudentDetails(data);
      dispatch(TAttendanceSlice.actions.GetStudentDetailsList(response.data));
    };
export const GetAcademicDatesForStandardDivision =
  (data: IGetAcademicDatesForStandardDivisionBody): AppThunk =>
    async (dispatch) => {
      const response = await GetTAttendanceListApi.GetAcademicDatesForStandardDivision(data);
      dispatch(TAttendanceSlice.actions.getAcademicDates(response.data));
    };

export const GetStudentList =
  (data: IGetStudentDetails): AppThunk =>
    async (dispatch) => {
      const response = await GetTAttendanceListApi.GetStudentDetails(data);
      let studentList = null;
      let message = 'There are no students in the class.';
      let AYmsg = 'Attendance date should be within the current academic year';
      let forInvalidAY = '';
      if (response?.data != null) {
        studentList = response?.data.map((item, index) => {
          let studentName = item.StudentName;
          let IsLateJoin = false;
          if (new Date(getDateMonthYearDayDash(item.JoinDate)) > new Date(data.asDate)) {
            IsLateJoin = true;
          }

          studentName = IsLateJoin ? studentName + ' (Late join-' + getDateMonthSpace(item.JoinDate) + ')' : studentName;
          return {
            text1: item.RollNumber,
            text2: studentName,
            isActive: item.IsPresent === 'true' ? true : false,
            status: item.Status,
            joinDate: item.JoinDate,
            StudentId: item.StudentId,
            IsExamSubmitted: IsLateJoin,
            isError: IsLateJoin ? true : item.IsPresent === 'true' ? true : false,
          };
        });

        const data2 = {
          asAcademicYearId: data.asAcademicYearId,
          asAttendanceDate: data.asDate,
          asSchoolId: data.asSchoolId,
          asStanardDivisionId: data.asStdDivId
        };
        const response2 = await GetTAttendanceListApi.GetAttendanceStatus(data2);
        response2.data?.map((item, i) => {

          message = item.AcademicYearMsg === '' ? item.StatusMessage : item.AcademicYearMsg;
          forInvalidAY = item.AcademicYearMsg === '' ? '' : 'none';
        });
      }
      if (message == 'There are no students in the class.') {
        forInvalidAY = 'none';
      } else if (
        message == 'Attendance date should be within the current academic year'
      ) {
        forInvalidAY = 'none';
      } else {
        forInvalidAY = '';
      }

      dispatch(TAttendanceSlice.actions.GetStudentList(studentList));
      dispatch(TAttendanceSlice.actions.GetAttendanceStatusList(message));
      dispatch(TAttendanceSlice.actions.getAYStatus(forInvalidAY));
    };

export const getStandard =
  (data: StandardAttendance): AppThunk =>
    async (dispatch) => {
      const response = await GetTAttendanceListApi.GetStandardList(data);
      const standardList = response.data.map((item) => {
        return {
          Value: item.Id,
          Name: item.Class
        };
      });
      dispatch(TAttendanceSlice.actions.getStandard(standardList));
    };

export const getStandardList =
  (data: StandardAttendance): AppThunk =>
    async (dispatch) => {
      const response = await GetTAttendanceListApi.GetStandardList(data);
      const standardList = response.data.map((item) => {
        return {
          Value: item.Id,
          Name: item.Class
        };
      });
      dispatch(TAttendanceSlice.actions.getStandard(standardList));
    };

export const GetAttendanceStatus =
  (data: IGetAttendanceStatus): AppThunk =>
    async (dispatch) => {
      const response = await GetTAttendanceListApi.GetAttendanceStatus(data);
      let message = '';
      response.data?.map((item, i) => {
        message = item.StatusMessage;
      });
      dispatch(TAttendanceSlice.actions.GetAttendanceStatusList(message));
    };

export const GetSaveAttendanceStatus =
  (data: ISaveAttendance): AppThunk =>
    async (dispatch) => {
      let response = await GetTAttendanceListApi.SaveStudentAttendanceDetails(
        data
      );
      let responseMsg = '';

      responseMsg = 'Attendance saved for the valid roll number(s) !!!';

      const GetStudentDetails: IStudentsDetails = {
        asStdDivId: data.asStandardDivisionId,
        asDate: data.asDate,
        asAcademicYearId: data.asAcademicYearId,
        asSchoolId: data.asSchoolId
      };
      dispatch(TAttendanceSlice.actions.getSaveResponse(responseMsg));
      dispatch(
        TAttendanceSlice.actions.GetSaveAttendanceStatusList(response.data)
      );
    };

export const GetSaveStudentAttendence =
  (data: ISaveStudentAttendenceBody): AppThunk =>
    async (dispatch) => {
      let response = await GetTAttendanceListApi.SaveStudentAttendence(data);
      dispatch(TAttendanceSlice.actions.getSaveResponse(response.data));
    };

export const CDASummaryCountforAttendanceBody =
  (data: IGetSummaryCountforAttendanceBody): AppThunk =>
    async (dispatch) => {
      const response = await GetTAttendanceListApi.GetSummaryCountforAttendance(
        data
      );
      const listAttendanceCalender = response.data.listAttendanceCalender.map(
        (item, i) => {
          return {
            Id: i,
            Name: getDateFromatDateTime(item.Att_date),
            Value: getDateMonthYearFormatted(item.Att_date),
            IsActive: false,
            Text1: item.Status,
            Text3: item.Status_Desc,
            ForeColur: item.Status_ForeColur,
            BackgroundColor: item.Status_BackColur,
            IsClickable: true
          };
        }
      );
      const getValue = (Value) => {
        return (Value !== "0" ? Value : "-")
      }
      const GetSummaryCountforAttendance = {
        GetSummaryCountList: [{
          Id: 1,
          Name: 'Present Student ', Color: 'green',
          Values: [
            { Id: 1, Name: 'Boys', Value: getValue(response.data.listSummaryCountforAttendance.Boys) },
            { Id: 2, Name: 'Girls', Value: getValue(response.data.listSummaryCountforAttendance.Girls) },
            { Id: 3, Name: 'Total', Value: getValue(response.data.listSummaryCountforAttendance.Total) },
          ]
        },
        {
          Id: 2,
          Name: 'Absent  Student ', Color: 'error',
          Values: [
            { Id: 1, Name: 'Boys', Value: getValue(response.data.listAbsentCountforAttendance.Boys) },
            { Id: 2, Name: 'Girls', Value: getValue(response.data.listAbsentCountforAttendance.Girls) },
            { Id: 3, Name: 'Total', Value: getValue(response.data.listAbsentCountforAttendance.Total) },
          ]
        },
        {
          Id: 3,
          Name: 'Total  Student ', Color: 'primary',
          Values: [
            { Id: 1, Name: 'Boys', Value: getValue(response.data.listtotalCountforAttendance.Boys) },
            { Id: 2, Name: 'Girls', Value: getValue(response.data.listtotalCountforAttendance.Girls) },
            { Id: 3, Name: 'Total', Value: getValue(response.data.listtotalCountforAttendance.Total) },
          ]
        },
        {
          Id: 4,
          Name: (new Date(data.asAttendanceDate).toLocaleString('default', { month: 'long' })) + ' Summary',
          Values: [
            { Id: 1, Name: 'Boys', Value: getValue(response.data.listPresentGendersAttendance.PresentBoys) },
            { Id: 2, Name: 'Girls', Value: getValue(response.data.listPresentGendersAttendance.PresentGirls) },
            { Id: 3, Name: 'Total', Value: getValue(response.data.listPresentGendersAttendance.Total) },
          ]
        }],
        TotalStudents:
          response.data.listTotalStudentAttendance.PresentStudents +
          '   /    ' +
          response.data.listTotalStudentAttendance.TotalStudents,
        TotalDivisions:
          response.data.listTotalStudentAttendance.PresentDivisions +
          '   /    ' +
          response.data.listTotalStudentAttendance.TotalDivisions
      }
      const GetSummaryCountforAttendance1 = {
        GetSummaryCountList: [
          {
            Id: '1',
            Text1: 'Present Student ',
            Text2: response.data.listSummaryCountforAttendance.Boys !== "0" ? response.data.listSummaryCountforAttendance.Boys : "-",
            Text3: response.data.listSummaryCountforAttendance.Girls !== "0" ? response.data.listSummaryCountforAttendance.Girls : "-",
            Text4: response.data.listSummaryCountforAttendance.Total !== "0" ? response.data.listSummaryCountforAttendance.Total : "-",
          },
          {
            Id: '2',
            Text1: 'Absent  Student ',
            Text2: response.data.listAbsentCountforAttendance.Boys !== "0" ? response.data.listAbsentCountforAttendance.Boys : "-",
            Text3: response.data.listAbsentCountforAttendance.Girls !== "0" ? response.data.listAbsentCountforAttendance.Girls : "-",
            Text4: response.data.listAbsentCountforAttendance.Total !== "0" ? response.data.listAbsentCountforAttendance.Total : "-",
          },
          {
            Id: '3',
            Text1: 'Total Student ',
            Text2: response.data.listtotalCountforAttendance.Boys !== "0" ? response.data.listtotalCountforAttendance.Boys : "-",
            Text3: response.data.listtotalCountforAttendance.Girls !== "0" ? response.data.listtotalCountforAttendance.Girls : "-",
            Text4: response.data.listtotalCountforAttendance.Total !== "0" ? response.data.listtotalCountforAttendance.Total : "-",
          },
          {
            Id: '4',
            Text1: 'Present month summary',
            Text2: response.data.listPresentGendersAttendance.PresentBoys !== "0" ? response.data.listPresentGendersAttendance.PresentBoys : "-",
            Text3: response.data.listPresentGendersAttendance.PresentGirls !== "0" ? response.data.listPresentGendersAttendance.PresentGirls : "-",
            Text4: response.data.listPresentGendersAttendance.Total !== "0" ? response.data.listPresentGendersAttendance.Total : "-"
          }
        ],
        TotalStudents:
          response.data.listTotalStudentAttendance.PresentStudents +
          '   /    ' +
          response.data.listTotalStudentAttendance.TotalStudents,
        TotalDivisions:
          response.data.listTotalStudentAttendance.PresentDivisions +
          '   /    ' +
          response.data.listTotalStudentAttendance.TotalDivisions

      };

      dispatch(
        TAttendanceSlice.actions.RGetSummaryCountforAttendance({
          GetSummaryCountforAttendance: GetSummaryCountforAttendance,
          listAttendanceCalender: listAttendanceCalender.sort((a, b) => a.Name - b.Name)
        })
      );
    };

export const CDADeleteAttendance =
  (data: IDeleteAttendanceBody): AppThunk =>
    async (dispatch) => {
      const response = await GetTAttendanceListApi.DeleteAttendance(data);
      dispatch(TAttendanceSlice.actions.RDeleteAttendance(response.data));
    };

export const CDAresetDeleteAttendance = (): AppThunk => async (dispatch) => {
  dispatch(TAttendanceSlice.actions.resetDeleteAttendance());
};

export const CDAGetTeacherNameList =
  (data: IGetClassTeachersBodynew): AppThunk =>
    async (dispatch) => {
      const response = await GetTAttendanceListApi.ClassTeacherDropdownnew(data);

      let abc = response.data.map((item, i) => {
        return {
          Id: item.Teacher_Id,
          Name: item.TeacherName,
          Value: item.SchoolWise_Standard_Division_Id,
          StandardDivision: item.Standard_Name + '-' + item.Division_Name
        };
      });
      dispatch(TAttendanceSlice.actions.RTeacherNameList(abc));
    };

export default TAttendanceSlice.reducer;
