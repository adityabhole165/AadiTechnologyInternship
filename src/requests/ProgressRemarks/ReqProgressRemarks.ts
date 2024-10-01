import { createSlice } from '@reduxjs/toolkit';
import ApiProgressRemark from 'src/api/ProgressRemarks/ApiProgressRemarks';
import {
  IAllPrimaryClassTeachersBody,
  IGetAllGradesForStandardBody,
  IGetAllStudentsForProgressRemarkBody,
  IGetAllStudentswiseRemarkDetailsNewBody,
  IGetConfiguredMaxRemarkLengthBody,
  IGetFinalPublishedExamStatusBody,
  IGetRemarkTemplateDetailsBody,
  IGetRemarksCategoryBody,
  IGetTestwiseTermBody,
  IStudentListDropDowntBody,
  IStudentswiseRemarkDetailsToExportBody,
  IUpdateAllStudentsRemarkDetailsBody
} from 'src/interfaces/ProgressRemarks/IProgressRemarks';
import { AppThunk } from 'src/store';

const ProgressRemarkSlice = createSlice({
  name: 'ProgressRemark',
  initialState: {
    ISGetTestwiseTerm: [],
    ISGetClassTeachers: [],
    ISStudentswiseRemarkDetailsToExport: {},
    ISStudentswiseRemarkDetailsToExport1: {},
    ISStudentswiseRemarkDetailsToExport2: {},
    ISUpdateAllStudentsRemarkDetailsBody: '',
    ISStudentListDropDown: [],
    ISGetAllStudentswiseRemarkDetails: [],
    ISresetSaveMassage: '',
    ISGradesForStandard: [],
    ISGetRemarksCategoryList: [],
    ISGetRemarkTemplateDetail: [],
    ISGetAllStudentsForProgressRemark: [],
    ISRGetFinalPublishedExamStatus: {},
    ISRemarkDetailsHeaderList: [],
    ISGetConfiguredMaxRemarkLength:[]

  },
  reducers: {
    RGetTestwiseTerm(state, action) {
      state.ISGetTestwiseTerm = action.payload;
    },
    RGetClassTeachers(state, action) {
      state.ISGetClassTeachers = action.payload;
    },

    RstudentswiseRemarkDetailsToExport(state, action) {
      state.ISStudentswiseRemarkDetailsToExport = action.payload;
    },

    RstudentswiseRemarkDetailsToExport1(state, action) {
      state.ISStudentswiseRemarkDetailsToExport1 = action.payload;
    },

    RstudentswiseRemarkDetailsToExport2(state, action) {
      state.ISStudentswiseRemarkDetailsToExport2 = action.payload;
    },

    RSUpdateAllStudentsRemarkDetailsBody(state, action) {
      state.ISUpdateAllStudentsRemarkDetailsBody = action.payload;
    },

    RStudentListDropDown(state, action) {
      state.ISStudentListDropDown = action.payload;
    },
    RSGetAllStudentswiseRemarkDetails(state, action) {
      state.ISGetAllStudentswiseRemarkDetails = action.payload;
    },
    RSGetRemarkDetailsHeaderList(state, action) {
      state.ISRemarkDetailsHeaderList = action.payload;
    },

    RSGradesForStandard(state, action) {
      state.ISGradesForStandard = action.payload;
    },
    RSGetRemarksCategory(state, action) {
      state.ISGetRemarksCategoryList = action.payload;
    },
    RSGetRemarksTemplateDetail(state, action) {
      state.ISGetRemarkTemplateDetail = action.payload;
    },
    RGetAllStudentsForProgressRemark(state, action) {
      state.ISGetAllStudentsForProgressRemark = action.payload;
    },
    RGetFinalPublishedExamStatus(state, action) {
      state.ISRGetFinalPublishedExamStatus = action.payload;
    },

    RGetConfiguredMaxRemarkLength(state, action) {
      state.ISGetConfiguredMaxRemarkLength = action.payload;
    },
    RresetSaveMassage(state) {
      state.ISUpdateAllStudentsRemarkDetailsBody = '';
    },
    ResetStudentDropdown(state) {
      state.ISGetAllStudentswiseRemarkDetails = [];
  }
  

  }

});

export const CDAGetTestwiseTerm =
  (data: IGetTestwiseTermBody): AppThunk =>
    async (dispatch) => {
      const response = await ApiProgressRemark.GetTestwiseTerm(data);
      let TestwiseTerm = response.data.map((item, i) => {
        return {
          Id: item.Term_Id,
          Name: item.Term_Name,
          Value: item.Term_Id
        };
      });

      dispatch(ProgressRemarkSlice.actions.RGetTestwiseTerm(TestwiseTerm));
    };

export const CDAGetClassTeachers =
  (data: IAllPrimaryClassTeachersBody): AppThunk =>
    async (dispatch) => {
      const response = await ApiProgressRemark.ClassTeachers(data);
      let ClassTeachers = [{ Id: '0', Name: '--Select--', Value: '0', asStandardId :'0'}];
      response.data.map((item, i) => {
        ClassTeachers.push({
          Id: item.SchoolWise_Standard_Division_Id,
          Name: item.TeacherName,
          Value: item.SchoolWise_Standard_Division_Id,      
          asStandardId: item.Standard_Id
        });
      });

      dispatch(ProgressRemarkSlice.actions.RGetClassTeachers(ClassTeachers));
    };

export const CDAStudentswiseRemarkDetailsToExport =
  (data: IStudentswiseRemarkDetailsToExportBody): AppThunk =>
    async (dispatch) => {
      const response = await ApiProgressRemark.StudentswiseRemarkDetailsToExport(
        data
      );

      const ExlFile = response.data.listStudentDetails.map((item, i) => {
        return {
          ...item
        };
      });

      const ExlFile1 = response.data.listRemarkDetails.map((item, i) => {
        return {
          ...item
        };
      });

      const ExlFile2 = response.data.listTermDetails.map((item, i) => {
        return {
          ...item
        };
      });

      dispatch(
        ProgressRemarkSlice.actions.RstudentswiseRemarkDetailsToExport(ExlFile)
      );
      dispatch(
        ProgressRemarkSlice.actions.RstudentswiseRemarkDetailsToExport1(ExlFile1)
      );
      dispatch(
        ProgressRemarkSlice.actions.RstudentswiseRemarkDetailsToExport2(ExlFile2)
      );

      return response.data.listStudentDetails;
      return response.data.listRemarkDetails;
      return response.data.listTermDetails;
    };

export const CDAUpdateAllStudentsRemarkDetails =
  (data: IUpdateAllStudentsRemarkDetailsBody): AppThunk =>
    async (dispatch) => {
      const response = await ApiProgressRemark.UpdateAllStudentsRemarkDetails(
        data
      );
      // let ClassTeachers = response.data.map((item, i) => {
      //     return {
      //         Id: item.Teacher_Id,
      //         Name: item.TeacherName,
      //         Value: item.Teacher_Id,
      //     }
      // })

      dispatch(
        ProgressRemarkSlice.actions.RSUpdateAllStudentsRemarkDetailsBody(
          response.data
        )
      );
    };
export const CDAGradeDropDown =
  (data: IGetAllGradesForStandardBody): AppThunk =>
    async (dispatch) => {
      const response = await ApiProgressRemark.GetAllGradeForStandard(data);
      let GradeList = [{ Id: '0', Name: 'All', Value: '0' }];
      response.data.map((item, i) => {
        GradeList.push({
          Id: item.Marks_Grades_Configuration_Detail_ID,
          Name: item.Grade_Name,
          Value: item.Marks_Grades_Configuration_Detail_ID
        });
      });

      dispatch(ProgressRemarkSlice.actions.RSGradesForStandard(GradeList));
    };
export const CDAGetRemarksCategory =
  (data: IGetRemarksCategoryBody): AppThunk =>
    async (dispatch) => {
      const response = await ApiProgressRemark.GetRemarksCategory(data);
      let RemarksCategoryList = [{ Id: '0', Name: 'All', Value: '0' }];
      response.data.map((item, i) => {
        RemarksCategoryList.push({
          Id: item.Id,
          Name: item.Name,
          Value: item.Id
        });
      });

      dispatch(ProgressRemarkSlice.actions.RSGetRemarksCategory(RemarksCategoryList));

    };
export const CDAStudentListDropDown =
  (data: IStudentListDropDowntBody): AppThunk =>
    async (dispatch) => {
      const response = await ApiProgressRemark.StudentListDropDown(data);
      let StudentList = [{ Id: '0', Name: 'All', Value: '0' }];
      response.data.map((item, i) => {
        StudentList.push({
          Id: item.Student_Id,
          Name: item.Student_Name,
          Value: item.Student_Id
        });
      });

      dispatch(ProgressRemarkSlice.actions.RStudentListDropDown(StudentList));
    };



export const CDAGetAllStudentswiseRemarkDetails = (
  data: IGetAllStudentswiseRemarkDetailsNewBody
): AppThunk => async (dispatch) => {
  const response = await ApiProgressRemark.GetAllStudentswiseRemarkDetails(data);
  const NewBody: IGetAllStudentsForProgressRemarkBody =
  {
    asSchoolId: data.asSchoolId,
    asAcademicYearId: data.asAcademicYearId,
    asStandard_Division_Id: data.asStandardDivId,
    asStudentId: data.asStudentId,
    asTerm_Id: data.asTermId,
    asStartIndex: data.asStartIndex,
    asEndIndex: data.asEndIndex,
    asSortExp: "Roll_No"
   
  }

  const response2 = await ApiProgressRemark.GetAllStudentsForProgressRemark(NewBody);

  let AllStudentsList = response2.data.map((item, i) => ({
    Id: item.Student_Id,
    Text1: item.Roll_No,
    Text2: item.Student_Name,
   
    Text5: item.SchoolWise_Standard_Division_Id,
    
    Value: item.Student_Id,
    Name: item.Student_Name,
    TotalRows:item.TotalRows
   


  }));

  dispatch(ProgressRemarkSlice.actions.RGetAllStudentsForProgressRemark(AllStudentsList));

  const getRemarks = (value) => {

    const returnVal = []
    if (value.RemarkConfigId == 0) {
      response.data.RemarkMasterList.map((MasterItem) => {
        returnVal.push({
          Text3: "",
          Text4: "",
          Text5: MasterItem.RemarkName,
          Text6: MasterItem.RemarkConfigId
        })
      })
    }
    else {
      response.data.RemarkMasterList.map((MasterItem) => {
        let lst = response.data.GetAllStudentswiseRemarkDetailsList
          .filter((studentItem) => {
            return (value.YearwiseStudentId == studentItem.YearwiseStudentId
              && studentItem.RemarkConfigId == MasterItem.RemarkConfigId
            )
          })
        if (lst.length == 0) {
          returnVal.push({
            Text3: "",
            Text4: "",
            Text5: MasterItem.RemarkName,
            Text6: MasterItem.RemarkConfigId
          })
        }
        else {
          returnVal.push({
            Text3: lst[0].Remark,
            Text4: lst[0].OldRemark,
            Text5: MasterItem.RemarkName,
            Text6: MasterItem.RemarkConfigId
          })
        }

      })
    }
    return returnVal
  }
  // Safely handle the response
  if (response.data && response.data.GetAllStudentswiseRemarkDetailsList) {
    // response.data.GetAllStudentswiseRemarkDetailsList.map((item, i) => {
    //   if (!arrRemarkMaster.includes(item.RemarkMaster.RemarkName))
    //     arrRemarkMaster.push(item.RemarkMaster.RemarkName)
    // })

    let listResult1st = []
    let PrevRollNo = 0
    response2.data.map((StudentItem, index) => {
      response.data.GetAllStudentswiseRemarkDetailsList.map((item, i) => {
        if (StudentItem.Student_Id == item.YearwiseStudentId.toString()) {
          if (PrevRollNo !== item.RollNo) {
            PrevRollNo = item.RollNo
            listResult1st.push({
              Id: item.YearwiseStudentId,
              Text1: item.RollNo,
              Text2: item.StudentName,
              Text3: item.Remark,
              Text4: item.OldRemark,
              Text5: item.RemarkMaster.RemarkName,
              Text6: item.RemarkMaster.RemarkConfigId,
              Remarks: getRemarks(item),
              Text7: '0',
              Text8: item.SalutationId,
              Text9: item.IsPassedAndPromoted,
              Text10: item.IsLeftStudent,
              Text11: item.YearwiseStudentId,
              Text12: item.StudentwiseRemarkId,
              Text13: item.Remark,
              FName: item.FName,
              SalutationId: item.SalutationId,
              Value: item.YearwiseStudentId,
              Name: item.StudentName,
              IsLeftStudent: item.IsLeftStudent
            });
          }
        }
      });
    })

    dispatch(ProgressRemarkSlice.actions.RSGetAllStudentswiseRemarkDetails(listResult1st));
    dispatch(ProgressRemarkSlice.actions.RSGetRemarkDetailsHeaderList(response.data.RemarkMasterList));
  }
};

export const CDAGetRemarkTemplateDetails =
  (data: IGetRemarkTemplateDetailsBody): AppThunk =>
    async (dispatch) => {
      const response = await ApiProgressRemark.GetRemarksTemplateDetail(
        data
      );
      let RemarkTemplateDetailList = response.data.map((item, i) => {
        return {
          Text1: item.Template,
          IsActive: false,
          Id: item.TemplateId,
          CategoryId: item.CategoryId

        };
      });

      dispatch(
        ProgressRemarkSlice.actions.RSGetRemarksTemplateDetail(RemarkTemplateDetailList)
      );

    };


export const CDAGetAllStudentsForProgressRemark =
  (data: IGetAllStudentsForProgressRemarkBody): AppThunk =>
    async (dispatch) => {
      const response = await ApiProgressRemark.GetAllStudentsForProgressRemark(data);

      let AllStudentsList = response.data.map((item, i) => ({
        Id: item.Student_Id,
        Text1: item.Roll_No,
        Text2: item.Student_Name,
        Text5: item.SchoolWise_Standard_Division_Id,
        Value: item.Student_Id,
        Name: item.Student_Name

      }));
      dispatch(ProgressRemarkSlice.actions.RGetAllStudentsForProgressRemark(AllStudentsList));
    };


export const   CDAGetConfiguredMaxRemarkLength =
  (data: IGetConfiguredMaxRemarkLengthBody): AppThunk =>
    async (dispatch) => {
      const response = await ApiProgressRemark.GetConfiguredMaxRemarkLength(data);
      console.log(response,"response---");
      
      dispatch(ProgressRemarkSlice.actions.RGetConfiguredMaxRemarkLength(response.data));};


  export const CDAGetFinalPublishedExamStatus =
  (data: IGetFinalPublishedExamStatusBody): AppThunk =>
    async (dispatch) => {
      const response = await ApiProgressRemark.GetFinalPublishedExamStatus(data);


      dispatch(ProgressRemarkSlice.actions.RGetFinalPublishedExamStatus(response.data));
    };




export const CDAresetSaveMassage = (): AppThunk => async (dispatch) => {
  dispatch(ProgressRemarkSlice.actions.RresetSaveMassage());
};

export const CDAResetStudentDropdown = (): AppThunk => async (dispatch) => {
  dispatch(ProgressRemarkSlice.actions.ResetStudentDropdown());
};

export default ProgressRemarkSlice.reducer;
