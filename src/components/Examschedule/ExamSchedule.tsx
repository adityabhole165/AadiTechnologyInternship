import { Box, useTheme } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Styles } from 'src/assets/style/student-style';
import ISelectExam, {
  GetExamsListResult,
  GetSelectExamListResult,
  IExamList
} from 'src/interfaces/Student/ExamSchedule';
import PageHeader from 'src/libraries/heading/PageHeader';
import Icon3 from 'src/libraries/icon/icon3';
import Card1 from 'src/libraries/mainCard/Card1';
import DotLegend from 'src/libraries/summary/DotLegend';
import {
  GetSelectExamList,
  ViewExamDataRess
} from 'src/requests/Examschedule/Examschedule';
import http from 'src/requests/SchoolService/schoolServices';
import { RootState } from 'src/store';

function ExamSchedule() {
  const asAcademicYearId = sessionStorage.getItem('AcademicYearId');
  const asSchoolId = localStorage.getItem('localSchoolId');
  const asStandardId = sessionStorage.getItem('StandardId');
  const asDivisionId = sessionStorage.getItem('DivisionId');
  const asUserId = sessionStorage.getItem('Id');

  const dispatch = useDispatch();

  const [examid, setexamid] = useState('0');
  const [allstd, setallstd] = useState('');

  const SelectExamList = useSelector(
    (state: RootState) => state.ExamsList.SelectExamData
  );
  var ExamsList = useSelector((state: RootState) => state.ExamsList.ExamData);

  const ExamList_body: IExamList = {
    asSchoolId: asSchoolId,
    asAcademicYearId: asAcademicYearId,
    asStandardId: asStandardId,
    asExamId: examid
  };

  const GetAllStandardsResult = () => {
    const ViewSms_body: any = {
      asAcademicYearId: asAcademicYearId,
      asSchoolId: asSchoolId
    };
    http
      .post('School/GetAllStandards', ViewSms_body)
      .then((resp) => resp.data.GetAllStandardsResult)
      .then((data) => {
        setallstd(data);
      });
  };

  const SelectexamList_body: ISelectExam = {
    asAcademicYearId: asAcademicYearId,
    asSchoolId: asSchoolId,
    asStandardId: asStandardId
  };
  const handleChange = (event: any) => {
    if (examid == '0') {
      setexamid('0');
    }

    setexamid(event?.target.value);
  };
  useEffect(() => {
    localStorage.setItem('url', window.location.pathname);
    dispatch(GetSelectExamList(SelectexamList_body));
    GetAllStandardsResult();
  }, []);

  useEffect(() => {
    dispatch(ViewExamDataRess(ExamList_body));
  }, [examid]);

  const theme = useTheme();
  const classes = Styles();

  return (
    <Box sx={{ px: 2 }}>
      <PageHeader heading={'Exam Schedule'} subheading={''} />

      <DotLegend color="success" text="Description" />

      <FormControl
        sx={{ marginTop: '50px', m: 1, width: '100%', marginLeft: '0px' }}
      >
        {
          <NativeSelect onChange={(e) => handleChange(e)}>
            <option value="0">Select Exam</option>

            {SelectExamList?.map((allexamslist: GetSelectExamListResult, i) => {
              return (
                <option value={allexamslist.Id} key={i}>
                  {allexamslist.Name}
                </option>
              );
            })}
          </NativeSelect>
        }
      </FormControl>

      {ExamsList?.map((items: GetExamsListResult, i) => {
        return (
          <>
            {i == 0 && items.Instructions !== '' ? (
              <Icon3 Note={items.Instructions} />
            ) : null}

            <Card1
              header={
                items.SubjectName +
                ' ' +
                (items.TestType !== '' ? '- ' + items.TestType : '')
              }
              text1=""
              text2={items.StartTime === "00:00" && items.EndTime === "00:00" ? '-' : items.StartTime + '-' + items.EndTime}
              text5={items.Description}
              text3={items.StartDate}
              text4=""
              text6=""
              Color=""
              margin=""
              FileName=""
              Textcolor=""
              key=""
            />
          </>
        );
      })}
    </Box>
  );
}

export default ExamSchedule;
