import React from 'react'
import Dropdown from 'src/libraries/dropdown/Dropdown'
import PageHeader from 'src/libraries/heading/PageHeader'
import { RootState } from 'src/store';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {getAcademicYearsforFeeChallan ,getAllFeeTypesForChallanImport ,getAllPayableforChallan, getDetailsForChallanImport, getFileNameForSNSChallan} from 'src/requests/Fees/Fees'
import { Card, Container ,Box} from '@mui/material';
import { IGetAcademicYearsforFeeChallanBody, IGetAllFeeTypesForChallanImportBody, IGetAllPayableforChallanBody, IGetDetailsForChallanImportBody, IGetFileNameForSNSChallanBody } from 'src/interfaces/Student/Fees';
import { ButtonPrimary } from 'src/libraries/styled/ButtonStyle';
function GenerateChallan() {
  const dispatch = useDispatch();
  const ChallanAcadamicYear = useSelector((state: RootState) => state.Fees.AcademicYearsforFeeChallan);
  const AllFeeTypesForChallan = useSelector((state: RootState) => state.Fees.AllFeeTypesForChallanImport);
  const AllPayableChallan = useSelector((state: RootState) => state.Fees.AllPayableforChallan);
  const FileNameChallan: any = useSelector((state: RootState) => state.Fees.FileNameForSNSChallan);
  const DetailsForChallanImport: any = useSelector((state: RootState) => state.Fees.DetailsForChallanImport);
  console.log(DetailsForChallanImport,"DetailsForChallanImport")
  const asSchoolId = localStorage.getItem('localSchoolId');
  const asAcademicYearId = sessionStorage.getItem('AcademicYearId');
  const asStandardDivision = (sessionStorage.getItem('StandardDivisionId'));
  const asStudentId = (sessionStorage.getItem('StudentId'));
  const asStandardId = (sessionStorage.getItem('StandardId'));
 
  const [year , setYear] = useState('')
  const [schoolType , setSchoolType] = useState('')
  const [Payable , setPayable] = useState('')



  const ClickYear=(value)=>{
    setYear(value)
  }

  const ClickSchoolType=(value)=>{
    setSchoolType(value)
  }

  const ClickPayable=(value)=>{
    setPayable(value)
  }
  const ChallanBody : IGetAcademicYearsforFeeChallanBody =
  {
    aiSchoolId:asSchoolId,
    aiAcademicYearId:asAcademicYearId,
    aiStudentId:asStudentId
   }

   const AllFeeTypesForChallanBody : IGetAllFeeTypesForChallanImportBody =
   {
    aiSchoolId:asSchoolId,
    aiSelectedAcademicYearId:asAcademicYearId,
    aiStandardDivisionId:asStandardDivision,
    aiStandardId:asStandardId
    }

    const AllPayableforChallanBody : IGetAllPayableforChallanBody =
    {
     aiSchoolId:asSchoolId,
     aiAcademicYearId:asAcademicYearId,
     aiStandardId:asStandardId,
     aiOriginalFeeTypeId:'228'
     }
     const FileNameForChallanBody: IGetFileNameForSNSChallanBody= {
      aiSchoolId: asSchoolId,
      aiAcademicYearId: asAcademicYearId,
      aiStandardId: DetailsForChallanImport.StandardId,
      aiStandardDivisionId: DetailsForChallanImport.StandardDivisionId,
      aiSchoolwiseStudentId: DetailsForChallanImport.SchoolwiseStudentId,
      aiFeeTypeId: schoolType,
      asPayableFor: Payable,
      aiSelectedAcademicYearId: year
    };

    const DetailsForChallanImportBody: IGetDetailsForChallanImportBody = {
      aiSchoolId: asSchoolId,
      aiAcademicYearId: asAcademicYearId,
      aiStudentId: asStudentId,
      aiSelectedAcademicYearId: year
    };
   useEffect(() => {
    dispatch(getAcademicYearsforFeeChallan(ChallanBody))
    dispatch(getAllFeeTypesForChallanImport(AllFeeTypesForChallanBody))
    dispatch(getAllPayableforChallan(AllPayableforChallanBody))
  
    }, []);

    useEffect(() => {
     dispatch(getDetailsForChallanImport(DetailsForChallanImportBody))
     }, [year]);

    const clickGenerate=()=>{
      dispatch(getFileNameForSNSChallan(FileNameForChallanBody))
    }
  return (
    <Container>
      <PageHeader heading = {'Generate Challan'}/>
      <Card component={Box} p={2}>
      <Dropdown  Array={ChallanAcadamicYear} handleChange={ClickYear} label={'Academic Year'} defaultValue = {year}/>
      <br></br> <br></br>
      <Dropdown  Array={AllFeeTypesForChallan} handleChange={ClickSchoolType} label={'Select School Type'} defaultValue = {schoolType}/>
      <br></br> <br></br>
      <Dropdown  Array={AllPayableChallan} handleChange={ClickPayable} label={'Select Payable'} defaultValue = {Payable}/>
      <br></br>   <br></br>
      <ButtonPrimary onClick={clickGenerate}>Generate</ButtonPrimary>
      </Card>

    </Container>
  )
}

export default GenerateChallan