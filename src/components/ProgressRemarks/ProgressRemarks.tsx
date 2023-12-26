
 import React from 'react'
 import {  useEffect } from 'react';
 import { useDispatch, useSelector } from 'react-redux';
 import { RootState } from 'src/store';
 import { IAllPrimaryClassTeachersBody, IGetTestwiseTermBody,IStudentswiseRemarkDetailsToExportBody, IUpdateAllStudentsRemarkDetailsBody, IStudentListToCaptureHeighthWeightBody, IGetAllStudentswiseRemarkDetailsBody} from "src/interfaces/ProgressRemarks/IProgressRemarks"
 import { CDAGetClassTeachers, CDAGetTestwiseTerm, CDAStudentswiseRemarkDetailsToExport, CDAUpdateAllStudentsRemarkDetails, CDAStudentListToCaptureHeighthWeight, CDAGetAllStudentswiseRemarkDetails} from "src/requests/ProgressRemarks/ReqProgressRemarks"

 const ProgressRemarks = () => {
   const dispatch = useDispatch();

   const asSchoolId = Number(localStorage.getItem('localSchoolId'));
   const asAcademicYearId = Number(sessionStorage.getItem('AcademicYearId'));
   
   const USGetTestwiseTerm: any = useSelector(
    (state: RootState) => state.ProgressRemarkSlice.ISGetTestwiseTerm
  );
  console.log(USGetTestwiseTerm,"USGetTestwiseTerm==1");
  

   const USClassTeachers: any = useSelector((state: RootState) => state.ProgressRemarkSlice.ISGetClassTeachers);
    console.log(USClassTeachers,"USClassTeachers====2");

    const StudentswiseRemarkDetails: any = useSelector((state: RootState) => state.ProgressRemarkSlice.ISStudentswiseRemarkDetailsToExport);
    console.log(StudentswiseRemarkDetails,"StudentswiseRemarkDetails3");

    const UpdateAllStudentsRemarkDetail: any = useSelector((state: RootState) => state.ProgressRemarkSlice.ISUpdateAllStudentsRemarkDetailsBody);
     console.log(UpdateAllStudentsRemarkDetail,"UpdateAllStudentsRemarkDetail4");
     

    const StudentListToCaptureHeighthWeight: any = useSelector((state: RootState) => state.ProgressRemarkSlice.ISStudentListToCaptureHeighthWeight);
  console.log(StudentListToCaptureHeighthWeight,"StudentListToCaptureHeighthWeight5");
  
  const USGetAllStudentswiseRemarkDetails: any = useSelector((state: RootState) => state.ProgressRemarkSlice.ISGetAllStudentswiseRemarkDetails);
 console.log(USGetAllStudentswiseRemarkDetails,"USGetAllStudentswiseRemarkDetails--6");
 
    
    const GetTestwiseTermBody: IGetTestwiseTermBody = {
        asSchoolId:18
      };

   const ClassTeachersBody: IAllPrimaryClassTeachersBody =
   {
    "asSchoolId":18,
    "asAcademicYearId":54
   }

   const StudentswiseRemarkDetailsBody: IStudentswiseRemarkDetailsToExportBody =
   {
    "asSchoolId":18,
    "asAcademicYearId":54,
    "asStandardDivId":1266,
    "asStudentId":0,
    "asTermId":1
}

const UpdateAllStudentsRemarkDetailsBody: IUpdateAllStudentsRemarkDetailsBody =
{
    "StudentwiseRemarkXML":"<ArrayOfStudentwiseRemarkConfigDetails xmlns:xsd=\"http://www.w3.org/2001/XMLSchema\" xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\"><StudentwiseRemarkConfigDetails><YearwiseStudentId>37608</YearwiseStudentId><StudentwiseRemarkId>0</StudentwiseRemarkId><Remark /><RemarkConfigId>0</RemarkConfigId><RemarkMaster><RemarkConfigId>17</RemarkConfigId></RemarkMaster><SalutationId>0</SalutationId><IsPassedAndPromoted>false</IsPassedAndPromoted><IsLeftStudent>0</IsLeftStudent></StudentwiseRemarkConfigDetails><StudentwiseRemarkConfigDetails><YearwiseStudentId>37609</YearwiseStudentId><StudentwiseRemarkId>0</StudentwiseRemarkId><Remark /><RemarkConfigId>0</RemarkConfigId><RemarkMaster><RemarkConfigId>17</RemarkConfigId></RemarkMaster><SalutationId>0</SalutationId><IsPassedAndPromoted>false</IsPassedAndPromoted><IsLeftStudent>0</IsLeftStudent></StudentwiseRemarkConfigDetails><StudentwiseRemarkConfigDetails><YearwiseStudentId>37610</YearwiseStudentId><StudentwiseRemarkId>0</StudentwiseRemarkId><Remark /><RemarkConfigId>0</RemarkConfigId><RemarkMaster><RemarkConfigId>17</RemarkConfigId></RemarkMaster><SalutationId>0</SalutationId><IsPassedAndPromoted>false</IsPassedAndPromoted><IsLeftStudent>0</IsLeftStudent></StudentwiseRemarkConfigDetails><StudentwiseRemarkConfigDetails><YearwiseStudentId>37611</YearwiseStudentId><StudentwiseRemarkId>0</StudentwiseRemarkId><Remark /><RemarkConfigId>0</RemarkConfigId><RemarkMaster><RemarkConfigId>17</RemarkConfigId></RemarkMaster><SalutationId>0</SalutationId><IsPassedAndPromoted>false</IsPassedAndPromoted><IsLeftStudent>0</IsLeftStudent></StudentwiseRemarkConfigDetails><StudentwiseRemarkConfigDetails><YearwiseStudentId>37612</YearwiseStudentId><StudentwiseRemarkId>0</StudentwiseRemarkId><Remark /><RemarkConfigId>0</RemarkConfigId><RemarkMaster><RemarkConfigId>17</RemarkConfigId></RemarkMaster><SalutationId>0</SalutationId><IsPassedAndPromoted>false</IsPassedAndPromoted><IsLeftStudent>0</IsLeftStudent></StudentwiseRemarkConfigDetails><StudentwiseRemarkConfigDetails><YearwiseStudentId>37613</YearwiseStudentId><StudentwiseRemarkId>0</StudentwiseRemarkId><Remark /><RemarkConfigId>0</RemarkConfigId><RemarkMaster><RemarkConfigId>17</RemarkConfigId></RemarkMaster><SalutationId>0</SalutationId><IsPassedAndPromoted>false</IsPassedAndPromoted><IsLeftStudent>0</IsLeftStudent></StudentwiseRemarkConfigDetails><StudentwiseRemarkConfigDetails><YearwiseStudentId>37614</YearwiseStudentId><StudentwiseRemarkId>0</StudentwiseRemarkId><Remark /><RemarkConfigId>0</RemarkConfigId><RemarkMaster><RemarkConfigId>17</RemarkConfigId></RemarkMaster><SalutationId>0</SalutationId><IsPassedAndPromoted>false</IsPassedAndPromoted><IsLeftStudent>0</IsLeftStudent></StudentwiseRemarkConfigDetails><StudentwiseRemarkConfigDetails><YearwiseStudentId>37615</YearwiseStudentId><StudentwiseRemarkId>0</StudentwiseRemarkId><Remark /><RemarkConfigId>0</RemarkConfigId><RemarkMaster><RemarkConfigId>17</RemarkConfigId></RemarkMaster><SalutationId>0</SalutationId><IsPassedAndPromoted>false</IsPassedAndPromoted><IsLeftStudent>0</IsLeftStudent></StudentwiseRemarkConfigDetails><StudentwiseRemarkConfigDetails><YearwiseStudentId>37616</YearwiseStudentId><StudentwiseRemarkId>0</StudentwiseRemarkId><Remark /><RemarkConfigId>0</RemarkConfigId><RemarkMaster><RemarkConfigId>17</RemarkConfigId></RemarkMaster><SalutationId>0</SalutationId><IsPassedAndPromoted>false</IsPassedAndPromoted><IsLeftStudent>0</IsLeftStudent></StudentwiseRemarkConfigDetails><StudentwiseRemarkConfigDetails><YearwiseStudentId>37617</YearwiseStudentId><StudentwiseRemarkId>0</StudentwiseRemarkId><Remark /><RemarkConfigId>0</RemarkConfigId><RemarkMaster><RemarkConfigId>17</RemarkConfigId></RemarkMaster><SalutationId>0</SalutationId><IsPassedAndPromoted>false</IsPassedAndPromoted><IsLeftStudent>0</IsLeftStudent></StudentwiseRemarkConfigDetails><StudentwiseRemarkConfigDetails><YearwiseStudentId>37618</YearwiseStudentId><StudentwiseRemarkId>0</StudentwiseRemarkId><Remark /><RemarkConfigId>0</RemarkConfigId><RemarkMaster><RemarkConfigId>17</RemarkConfigId></RemarkMaster><SalutationId>0</SalutationId><IsPassedAndPromoted>false</IsPassedAndPromoted><IsLeftStudent>0</IsLeftStudent></StudentwiseRemarkConfigDetails><StudentwiseRemarkConfigDetails><YearwiseStudentId>37619</YearwiseStudentId><StudentwiseRemarkId>0</StudentwiseRemarkId><Remark /><RemarkConfigId>0</RemarkConfigId><RemarkMaster><RemarkConfigId>17</RemarkConfigId></RemarkMaster><SalutationId>0</SalutationId><IsPassedAndPromoted>false</IsPassedAndPromoted><IsLeftStudent>0</IsLeftStudent></StudentwiseRemarkConfigDetails><StudentwiseRemarkConfigDetails><YearwiseStudentId>37620</YearwiseStudentId><StudentwiseRemarkId>0</StudentwiseRemarkId><Remark /><RemarkConfigId>0</RemarkConfigId><RemarkMaster><RemarkConfigId>17</RemarkConfigId></RemarkMaster><SalutationId>0</SalutationId><IsPassedAndPromoted>false</IsPassedAndPromoted><IsLeftStudent>0</IsLeftStudent></StudentwiseRemarkConfigDetails><StudentwiseRemarkConfigDetails><YearwiseStudentId>37621</YearwiseStudentId><StudentwiseRemarkId>0</StudentwiseRemarkId><Remark /><RemarkConfigId>0</RemarkConfigId><RemarkMaster><RemarkConfigId>17</RemarkConfigId></RemarkMaster><SalutationId>0</SalutationId><IsPassedAndPromoted>false</IsPassedAndPromoted><IsLeftStudent>0</IsLeftStudent></StudentwiseRemarkConfigDetails><StudentwiseRemarkConfigDetails><YearwiseStudentId>37622</YearwiseStudentId><StudentwiseRemarkId>0</StudentwiseRemarkId><Remark /><RemarkConfigId>0</RemarkConfigId><RemarkMaster><RemarkConfigId>17</RemarkConfigId></RemarkMaster><SalutationId>0</SalutationId><IsPassedAndPromoted>false</IsPassedAndPromoted><IsLeftStudent>0</IsLeftStudent></StudentwiseRemarkConfigDetails><StudentwiseRemarkConfigDetails><YearwiseStudentId>37623</YearwiseStudentId><StudentwiseRemarkId>2775928</StudentwiseRemarkId><Remark>She can easily express probabilities as ratios, fractions and percent. She can sort materials into groups using simple properties and can recognise and name common materials.</Remark><RemarkConfigId>0</RemarkConfigId><RemarkMaster><RemarkConfigId>17</RemarkConfigId></RemarkMaster><SalutationId>0</SalutationId><IsPassedAndPromoted>false</IsPassedAndPromoted><IsLeftStudent>0</IsLeftStudent></StudentwiseRemarkConfigDetails><StudentwiseRemarkConfigDetails><YearwiseStudentId>37625</YearwiseStudentId><StudentwiseRemarkId>0</StudentwiseRemarkId><Remark /><RemarkConfigId>0</RemarkConfigId><RemarkMaster><RemarkConfigId>17</RemarkConfigId></RemarkMaster><SalutationId>0</SalutationId><IsPassedAndPromoted>false</IsPassedAndPromoted><IsLeftStudent>0</IsLeftStudent></StudentwiseRemarkConfigDetails><StudentwiseRemarkConfigDetails><YearwiseStudentId>37652</YearwiseStudentId><StudentwiseRemarkId>0</StudentwiseRemarkId><Remark /><RemarkConfigId>0</RemarkConfigId><RemarkMaster><RemarkConfigId>17</RemarkConfigId></RemarkMaster><SalutationId>0</SalutationId><IsPassedAndPromoted>false</IsPassedAndPromoted><IsLeftStudent>0</IsLeftStudent></StudentwiseRemarkConfigDetails><StudentwiseRemarkConfigDetails><YearwiseStudentId>37626</YearwiseStudentId><StudentwiseRemarkId>0</StudentwiseRemarkId><Remark /><RemarkConfigId>0</RemarkConfigId><RemarkMaster><RemarkConfigId>17</RemarkConfigId></RemarkMaster><SalutationId>0</SalutationId><IsPassedAndPromoted>false</IsPassedAndPromoted><IsLeftStudent>0</IsLeftStudent></StudentwiseRemarkConfigDetails><StudentwiseRemarkConfigDetails><YearwiseStudentId>37627</YearwiseStudentId><StudentwiseRemarkId>0</StudentwiseRemarkId><Remark /><RemarkConfigId>0</RemarkConfigId><RemarkMaster><RemarkConfigId>17</RemarkConfigId></RemarkMaster><SalutationId>0</SalutationId><IsPassedAndPromoted>false</IsPassedAndPromoted><IsLeftStudent>0</IsLeftStudent></StudentwiseRemarkConfigDetails></ArrayOfStudentwiseRemarkConfigDetails>",

    "asSchoolId":18,
    "asAcademicYearId":54,
    "asInsertedById":4463,
    "asStandardDivId":1266,
    "asTermId":1

}


const StudentListToCaptureHeighthWeightBody: IStudentListToCaptureHeighthWeightBody =
{
    "asStdDivId":1266 ,
"asAcademic_Year_Id":54 ,
"asSchoolId":18,
"asTerm_Id":1
}


const GetAllStudentswiseRemarkDetailsBody: IGetAllStudentswiseRemarkDetailsBody =
{
    "asSchoolId":18,
    "asAcademicYearId":54,
    "asStandardDivId":1266,
    "asStudentId":0,
    "asTermId":1
}




   useEffect(() => {
     dispatch(CDAGetClassTeachers(ClassTeachersBody));
 }, []);

 useEffect(() => {
    dispatch(CDAGetTestwiseTerm(GetTestwiseTermBody));
  }, []);

  useEffect(() => {
    dispatch(CDAStudentswiseRemarkDetailsToExport(StudentswiseRemarkDetailsBody));
  }, []);

  useEffect(() => {
    dispatch(CDAUpdateAllStudentsRemarkDetails(UpdateAllStudentsRemarkDetailsBody));
  }, []);


  useEffect(() => {
    dispatch(CDAStudentListToCaptureHeighthWeight(StudentListToCaptureHeighthWeightBody));
  }, []);

  useEffect(() => {
    dispatch(CDAGetAllStudentswiseRemarkDetails(GetAllStudentswiseRemarkDetailsBody));
  }, []);

   return (
     <div>AssignPre-PrimaryGrades</div>
   )
 }

 export default ProgressRemarks
