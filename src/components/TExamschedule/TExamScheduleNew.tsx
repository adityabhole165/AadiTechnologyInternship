

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import IGetAllStandards, {
  IExamList,
  IGetExamsList
} from 'src/interfaces/Teacher/TExamSchedule';
import SuspenseLoader from 'src/layouts/components/SuspenseLoader';
import { RootState } from 'src/store';
// import { IGetExamsList } from 'src/interfaces/Student/ExamSchedule';
import ErrorMessages from 'src/libraries/ErrorMessages/ErrorMessages';
import Dropdown from 'src/libraries/dropdown/Dropdown';
import {
  EmptyExam,
  GetSelectExamRes,
  GetSelectStandardRes,
  ViewExamDataRess
} from 'src/requests/TExamschedule/TExamschedule';

import InfoOutlined from '@mui/icons-material/InfoOutlined';
import QuestionMark from '@mui/icons-material/QuestionMark';
import { Alert, Box, IconButton, Table, TableBody, TableCell, TableHead, TableRow, Tooltip, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';
import CommonPageHeader from '../CommonPageHeader';

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
  const [showCardData, setShowCardData] = useState(false);

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
    setShowCardData(false); // Reset the card data visibility on exam change
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
      <CommonPageHeader
        navLinks={[
          {
            title: 'Exam Schedule',
            path: ''
          }
        ]}
        rightActions={<>
          <Box sx={{ width: '200px' }}>
            {RoleId !== '3' && (
              <Dropdown
                Array={getstandard}
                handleChange={stdChange}
                label={'Select Standard'}
                size={'small'}
                variant={"outlined"}
                defaultValue={std}
              />
            )}
          </Box>
          {getExamlist.length > 0 ? (
            <Box sx={{ width: '200px' }} >
              <Dropdown
                Array={getExamlist}
                handleChange={examChange}
                label={'Select Exam'}
                size={'small'}
                variant={"outlined"}
                defaultValue={exam}
              />
            </Box>
          ) : (
            ((!isFirstTime && RoleId === '2') || RoleId !== '2') && (
              <ErrorMessages Error={'No exam has been scheduled'} />
            )
          )}
          <Box>
            <Tooltip title={"Displays standardwise exam schedule."}>
              <IconButton sx={{
                color: 'white',
                backgroundColor: grey[500],
                '&:hover': {
                  backgroundColor: grey[600]
                }

              }}>
                <QuestionMark />
              </IconButton>
            </Tooltip>
          </Box>
        </>}
      />

      {exam && (
        <Box sx={{ mt: 2, cursor: 'pointer' }} onClick={() => setShowCardData(!showCardData)}>
          <Typography variant="h6">{`Selected Exam: ${exam}`}</Typography>
        </Box>
      )}

      {showCardData && (
        <Box sx={{ background: 'white', p: 2 }}>
          {loading ? (
            <SuspenseLoader />
          ) : (
            <>
              {SubList?.length > 0 ? (
                <Table>
                  <TableHead sx={{ background: '#87CEEB', '& > *': { color: 'white', fontWeight: 'bold' } }}>
                    <TableRow>
                      <TableCell> Date</TableCell>
                      <TableCell>Time</TableCell>
                      <TableCell>Subject</TableCell>
                      <TableCell>Instruction</TableCell>
                      <TableCell>Duration</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {SubList.map((item, i) => (
                      <TableRow key={i}>
                        <TableCell>{item.text3}</TableCell>
                        <TableCell>{item.text2}</TableCell>
                        <TableCell>{item.header}</TableCell>
                        <TableCell sx={{ color: 'blue' }}>{item.Instructions}</TableCell>
                        <TableCell>{getTime(item.startTime, item.endTime)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <Typography variant={"h6"} textAlign={'center'} color={"primary"} mb={2}>
                  <Alert variant={"filled"} color='info' sx={{ mb: 2 }} icon={<InfoOutlined />}>
                    <b style={{ color: 'blue' }}> No exam has been scheduled </b>
                  </Alert>
                </Typography>
              )}
            </>
          )}
        </Box>
      )}
      <br />
    </Box>
  );
};

export default TExamScheduleNew;

