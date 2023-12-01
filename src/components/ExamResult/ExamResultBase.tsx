import React, { useEffect, useState } from 'react'
import PageHeader from 'src/libraries/heading/PageHeader'
import { useDispatch } from 'react-redux';
import { getAllTestsForClass, getClassPassFailDetailsForTest, getClassTeachers } from 'src/requests/ExamResult/RequestExamResult';
import { IGetAllTestsForClassBody, IGetClassPassFailDetailsForTestBody, IGetClassTeachersBody } from 'src/interfaces/ExamResult/IExamResult';
import DropdownNew from 'src/libraries/dropdown/DropdownNew';
import { RootState, useSelector } from 'src/store';
import Dropdown from 'src/libraries/dropdown/Dropdown';

import Card1 from 'src/libraries/mainCard/Card1';
const ExamResultBase = () => {
    const dispatch = useDispatch();
    const asSchoolId = localStorage.getItem("localSchoolId")
    const asAcademicYearId = sessionStorage.getItem("AcademicYearId")
    const [StandardDivisionId, setStandardDivisionId] = useState("0")
    const [TestId, setTestId] = useState("0")

    
  const ClassTeachers: any = useSelector((state: RootState) => state.ExamResult.ClassTeachers);
          const ClassPassFailDetailsForTest: any = useSelector((state: RootState) => state.ExamResult.ClassPassFailDetailsForTest);
          console.log(ClassPassFailDetailsForTest,"ClassPassFailDetailsForTest")
  const AllTestsForClass: any = useSelector((state: RootState) => state.ExamResult.AllTestsForClass);
    const ClassTeachersBody:IGetClassTeachersBody = {
        asSchoolId:asSchoolId,
        asAcademicYearId:asAcademicYearId
    }
    const AllTestsForClassBody:IGetAllTestsForClassBody = {
        asSchoolId:asSchoolId,
        asAcademicYearId:asAcademicYearId,
        asStandardDivisionId:StandardDivisionId
    }
    const ClassPassFailDetailsForTestBody:IGetClassPassFailDetailsForTestBody = {
        asSchoolId:Number(asSchoolId),
        asAcademicYearId:Number(asAcademicYearId),
        asStdDivId:StandardDivisionId,
        aiTestId:TestId
    }

    useEffect(()=>{
        dispatch(getClassTeachers(ClassTeachersBody));
    },[])
    useEffect(()=>{
        if(ClassTeachers.length>0){
            setStandardDivisionId(ClassTeachers[1].Value)
    }
    },[ClassTeachers])
    useEffect(()=>{
        if(StandardDivisionId!=="0")
        dispatch(getAllTestsForClass(AllTestsForClassBody));
    },[StandardDivisionId])

    useEffect(()=>{
        if(AllTestsForClass.length>0)
            setTestId(AllTestsForClass[0].Value)
    },[AllTestsForClass])

    useEffect(()=>{
        dispatch(getClassPassFailDetailsForTest(ClassPassFailDetailsForTestBody));
    },[TestId])
    
    const clickTeacher = (value) => {
        setStandardDivisionId(value)
    }
    const clickExam = (value) => {
        setTestId(value)
    }
  return (
    <div>
      <PageHeader heading={'Exam Results'} subheading={''} />
      <Dropdown Array={ClassTeachers} handleChange={clickTeacher} 
      label={"Teacher"} defaultValue={StandardDivisionId}/>
      <Dropdown Array={AllTestsForClass} handleChange={clickExam} 
      label={"Exam"} defaultValue={TestId}/>
      {ClassPassFailDetailsForTest?.map((items, i) => {
        return (
          <>
            
            <Card1
              header={items.Subject_Name}
              text1=""
              text2={items.ExamStatus}
              text5=""
              text3=""
              text4=""
              text6=""
              Color=""
              margin=""
              FileName=""
              Textcolor=''
              key=""
            />
          </>
        );
      })}
    </div>
  )
}

export default ExamResultBase