 import React from 'react'
 import {  useEffect } from 'react';
 import { useDispatch, useSelector } from 'react-redux';
 import { RootState } from 'src/store';
 import { IGetTestwiseTermBody, IGetClassTeachersBody, IGetTeacherXseedSubjectsBody} from "src/interfaces/AssignPrePrimaryGrade/IAssignPrePrimaryGrades"
 import { CDAGetTestwiseTerm, CDAGetClassTeachers, CDAGetTeacherXseedSubjects} from "src/requests/AssignPrePrimaryGrades/ReqAssignPrePrimaryGrades"

 const AssignPrePrimaryGrades = () => {
   const dispatch = useDispatch();

   const USGetTestwiseTerm: any = useSelector((state: RootState) => state.AssignPrePrimaryGrades.ISGetTestwiseTerm);
    console.log(USGetTestwiseTerm,"USGetTestwiseTerm");
    
   const USGetClassTeachers: any = useSelector((state: RootState) => state.AssignPrePrimaryGrades.ISGetClassTeachers);
  console.log(USGetClassTeachers, "USGetClassTeachers");
  
  const USGetTeacherXseedSubjects: any = useSelector((state: RootState) => state.AssignPrePrimaryGrades.ISGetTeacherXseedSubjectsBody);
   console.log(USGetTeacherXseedSubjects,"USGetTeacherXseedSubjects");
   
  
   const GetTestwiseTermBody: IGetTestwiseTermBody =
   {

     "asSchoolId":18
   }


   const GetClassTeachersBody: IGetClassTeachersBody =
   {
    "asSchoolId":18,
    "asAcademicYearId":54
   }


   const GetTeacherXseedSubjectsBody: IGetTeacherXseedSubjectsBody =
   {
    "asSchoolId":18,
    "asAcademicYear_ID":54,
    "asTeacherId":2396,
    "asAssessmentId":27
}

   useEffect(() => {
   
     dispatch(CDAGetTestwiseTerm(GetTestwiseTermBody));
  
 }, []);


 useEffect(() => {
   
    dispatch(CDAGetClassTeachers(GetClassTeachersBody));
 
}, []);


useEffect(() => {
   
    dispatch(CDAGetTeacherXseedSubjects(GetTeacherXseedSubjectsBody));
 
}, []);

   return (
    <>
     <div>AssignPre-PrimaryGrades</div>
    <h1>jhhhhhhhhhhhhhhhhhhhh</h1>
    CDAGetClassTeachers
     </>
   )
 }

 export default AssignPrePrimaryGrades
