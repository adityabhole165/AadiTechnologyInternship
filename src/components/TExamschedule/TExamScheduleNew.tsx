import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import IGetAllStandards, {
  IExamList,
  IGetExamsList
} from 'src/interfaces/Teacher/TExamSchedule';
import SuspenseLoader from 'src/layouts/components/SuspenseLoader';
import PageHeader from 'src/libraries/heading/PageHeader';
import { RootState } from 'src/store';
// import { IGetExamsList } from 'src/interfaces/Student/ExamSchedule';
import ErrorMessages from 'src/libraries/ErrorMessages/ErrorMessages';
import Dropdown from 'src/libraries/dropdown/Dropdown';
import Icon3 from 'src/libraries/icon/icon3';
import {
  EmptyExam,
  GetSelectExamRes,
  GetSelectStandardRes,
  ViewExamDataRess
} from 'src/requests/TExamschedule/TExamschedule';

import { Box } from '@mui/material';
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
    if (RoleId === '3') {
      setStd(asStandardId);
    }
  }, []);
  const stdChange = (value) => {
    setStd(value);
    setExam('');
    setIsFirstTime(false);
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

  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [totalHours, setTotalHours] = useState(0);
  const [totalMinutes, setTotalMinutes] = useState(0);

  let STime = '';
  let ETime = '';
  useEffect(() => {
    if (SubList !== undefined) {
      SubList.map((item) => {
        STime = item.startTime;
      });
      SubList.map((item) => {
        ETime = item.endTime;
      });
    }
    setStartTime(STime);
    setEndTime(ETime);
  }, [SubList]);

  const getTime = (startTime, endTime) => {
    const [startHours, startMinutes, startPeriod] = startTime.split(/:|\s/);
    let adjustedStartHours =
      parseInt(startHours, 10) + (startPeriod == 'PM' ? 12 : 0);
    const [endHours, endMinutes, endPeriod] = endTime.split(/:|\s/);
    let adjustedEndHours =
      parseInt(endHours, 10) + (endPeriod == 'PM' ? 12 : 0);

    const startDate = new Date();
    startDate.setHours(adjustedStartHours);
    startDate.setMinutes(parseInt(startMinutes, 10));

    const endDate = new Date();
    endDate.setHours(adjustedEndHours);
    endDate.setMinutes(parseInt(endMinutes, 10));
    const startTime1 = new Date(startDate).getTime();
    const endTime1 = new Date(endDate).getTime();

    const timeDifference = Math.abs(endTime1 - startTime1);
    const hours1 = Math.floor(timeDifference / (1000 * 60 * 60));
    const minutes2 = Math.floor(
      (timeDifference % (1000 * 60 * 60)) / (1000 * 60)
    );
    const diffInMs = Number(endDate) - Number(startDate);
    const hours = Math.floor(diffInMs / (1000 * 60 * 60));
    const minutes = Math.floor((diffInMs % (1000 * 60 * 60)) / (1000 * 60));
    return hours1 + ' hrs ' + minutes2 + ' mins';
  };

  return (
    <Box sx={{ px: 2 }}>
      <PageHeader heading={'Exam Schedule'} subheading={''} />
      {RoleId !== '3' && (
        <Dropdown
          Array={getstandard}
          handleChange={stdChange}
          label={'Select Standard'}
          defaultValue={std}
        />
      )}
      <Box sx={{ mt: '10px' }}>
        {getExamlist.length > 0 ? (
          <Dropdown
            Array={getExamlist}
            handleChange={examChange}
            label={'Select Exam'}
            defaultValue={exam}
          />
        ) : (
          ((!isFirstTime && RoleId === '2') || RoleId !== '2') && (
            <ErrorMessages Error={'No exam has been scheduled'} />
          )
        )}
      </Box>
      <br />
      {loading ? (
        <SuspenseLoader />
      ) : (
        <>
          {SubList?.map((item, i) => {
            return (
              <div key={i}>
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
                <CardExamSchedule
                  header={item.header}
                  text2={item.text3}
                  text3={item.text2}
                  text5={item.text5}
                  text6={getTime(item.startTime, item.endTime)}
                />
              </div>
            );
          })}
        </>
      )}
    </Box>
  );
};

export default TExamScheduleNew;
