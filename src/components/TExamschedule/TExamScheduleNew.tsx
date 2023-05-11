import React, { useEffect, useState } from 'react';
import PageHeader from 'src/libraries/heading/PageHeader';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { RootState } from 'src/store';
import IGetAllStandards, {
  IGetExamsList,
  IExamList
} from 'src/interfaces/Teacher/TExamSchedule';
import List1 from 'src/libraries/mainCard/List1';
import SuspenseLoader from 'src/layouts/components/SuspenseLoader';
// import { IGetExamsList } from 'src/interfaces/Student/ExamSchedule';
import {
  GetSelectStandardRes,
  GetSelectExamRes,
  ViewExamDataRess,
  EmptyExam
} from 'src/requests/TExamschedule/TExamschedule';
import { GetStandardListResult } from 'src/interfaces/Teacher/TExamSchedule';
import Dropdown from 'src/libraries/dropdown/Dropdown';
import { Container } from '@mui/material';
import Icon3 from 'src/libraries/icon/icon3';
import ErrorMessages from 'src/libraries/ErrorMessages/ErrorMessages';

import Card1 from 'src/libraries/mainCard/Card1';
import { Typography, Box } from '@mui/material';
import { ErrorDetail } from 'src/libraries/styled/ErrormessageStyled';
import CardExamSchedule from 'src/libraries/card/CardExamSchedule';

const TExamScheduleNew = () => {
  const dispatch = useDispatch();

  const getstandard: any = useSelector(
    (state: RootState) => state.StandardAndExamList.SelectStandard
  );
  const getExamlist: any = useSelector(
    (state: RootState) => state.StandardAndExamList.SelectExam
  );

  const SubList = useSelector(
    (state: RootState) => state.StandardAndExamList.ExamData
  );

  const loading = useSelector(
    (state: RootState) => state.StandardAndExamList.Loading
  );
  const asAcademicYearId = sessionStorage.getItem('AcademicYearId');
  const asSchoolId = localStorage.getItem('localSchoolId');
  const RoleId = sessionStorage.getItem('RoleId');
  const asStandardId = sessionStorage.getItem('StandardId');
  const getstandardList_body: IGetAllStandards = {
    asAcademicYearId: asAcademicYearId,
    asSchoolId: asSchoolId
  };

  const [std, setStd] = useState('');
  const [exam, setExam] = useState('');
  const [isFirstTime, setIsFirstTime] = useState(true);

  const ExamList_body: IGetExamsList = {
    asSchoolId: asSchoolId,
    asAcademicYearId: asAcademicYearId,
    asStandardId: std
  };

  useEffect(() => {
    dispatch(EmptyExam());
    dispatch(GetSelectStandardRes(getstandardList_body));
    if (RoleId === "3") {
      setStd(asStandardId)
    }

  }, []);
  const stdChange = (value) => {
    setStd(value);
    setExam('');
    setIsFirstTime(false)
  };

  const examChange = (value) => {
    setExam(value);
  };

  useEffect(() => {
    if (std != '') dispatch(GetSelectExamRes(ExamList_body));
  }, [std]);

  const getexamType_body: IExamList = {
    asSchoolId: asSchoolId,
    asAcademicYearId: asAcademicYearId,
    asStandardId: std,
    asExamId: exam
  };
  useEffect(() => {
    dispatch(ViewExamDataRess(getexamType_body));
  }, [exam]);

  return (
    <Container>
      <PageHeader heading={'Exam Schedule'} subheading={''} />
      {RoleId !== '3' &&
        <Dropdown
          Array={getstandard}
          handleChange={stdChange}
          label={'Select Standard'}
          defaultValue={std}
        />}
      <Box sx={{ mt: "10px" }}>
        {
          (getExamlist.length > 0) ?
            (<Dropdown
              Array={getExamlist}
              handleChange={examChange}
              label={'Select Exam'}
              defaultValue={exam}
            />) :
            ((!isFirstTime && RoleId === "2") || (RoleId !== "2")) &&
            <ErrorMessages Error={'No exam has been scheduled'} />
        }
      </Box>
      <br />
       {loading ? (
              <SuspenseLoader />
            ) : (
      <>
      {SubList?.map((item, i) => {
        return (
          <div key={i} >
            {i == 0 && item.Instructions !== '' ? (
              <Icon3 Note={item.Instructions} />
            ) : null}
           
              {/* <Card1 key={i}
                header={item.header}
                text1={''}
                text2={item.text2}
                text3={item.text3}
                text4={''}
                text5={item.text5}
                text6={''}
                Color={''}
                margin={''}
                FileName={''}

              /> */}
               <CardExamSchedule  header={item.header}     text2={item.text3}
                text3={item.text2}  text5={item.text5}/>
          </div>
        );
      })}
      </>
       )}
    </Container>
  );
};

export default TExamScheduleNew;
