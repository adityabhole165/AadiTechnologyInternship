import React,{useEffect,useState} from 'react';
import PageHeader from 'src/libraries/heading/PageHeader';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { RootState } from 'src/store';
import IGetAllStandards, {
  IGetExamsList
} from 'src/interfaces/Teacher/TExamSchedule';
// import { IGetExamsList } from 'src/interfaces/Student/ExamSchedule';
import {
  GetSelectStandardRes,
  GetSelectExamRes
} from 'src/requests/TExamschedule/TExamschedule';
import { GetStandardListResult } from 'src/interfaces/Teacher/TExamSchedule';
import Dropdown from 'src/libraries/dropdown/Dropdown';
import { Container } from '@mui/system';

const TExamScheduleNew = () => {
    const dispatch = useDispatch();

    const getstandard: any = useSelector(
      (state: RootState) => state.StandardAndExamList.SelectStandard
    );
    const getExamlist: any = useSelector(
      (state: RootState) => state.StandardAndExamList.SelectExam
    );
    const asAcademicYearId = sessionStorage.getItem('AcademicYearId');
    const asSchoolId = localStorage.getItem('localSchoolId');
    const asStandardId = sessionStorage.getItem('StandardId');
    const getstandardList_body: IGetAllStandards = {
      asAcademicYearId: asAcademicYearId,
      asSchoolId: asSchoolId
    };
  
    const [std, setStd] = useState('');
    const [exam, setExam] = useState('');
    const ExamList_body: IGetExamsList = {
      asSchoolId: asSchoolId,
      asAcademicYearId: asAcademicYearId,
      asStandardId: std
    };
  
    useEffect(() => {
      dispatch(GetSelectStandardRes(getstandardList_body));
    }, []);
    const stdChange = (value) => {
      setStd(value);
    
    };
  
    const examChange = (value) => {
      setExam(value);
    
    };
   
  
     useEffect(() => {
        if(std!='')
     dispatch(GetSelectExamRes(ExamList_body));
     }, [std]);
  
    return (
      <Container>
          <PageHeader heading={'Exam Schedule'} subheading={''} />
          <Dropdown  Array={getstandard} handleChange={stdChange} label={'Select Std'} defaultValue = {std}/>
          <Dropdown  Array={getExamlist} handleChange={examChange} label={'Select Exam'} defaultValue = {exam}/>
      </Container>
    )
}

export default TExamScheduleNew
