import { useDispatch } from 'react-redux';
import {
  GetSelectExamList,
  ViewExamDataRess
} from 'src/requests/Examschedule/Examschedule';
import { useSelector } from 'react-redux';
import { RootState } from 'src/store';
import { styled, useTheme } from '@mui/material';
import ISelectExam, {
  GetSelectExamListResult
} from 'src/interfaces/Student/ExamSchedule';
import {
  IExamList,
  GetExamsListResult
} from 'src/interfaces/Student/ExamSchedule';
import PageHeader from 'src/libraries/heading/PageHeader';
import { useEffect, useState } from 'react';
import Container from '@mui/material/Container';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';
import List6 from 'src/libraries/list/List6';
import { Styles } from 'src/assets/style/student-style';
import http from 'src/requests/SchoolService/schoolServices';
import Icon3 from 'src/libraries/icon/icon3';

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
    localStorage.setItem("url",window.location.pathname)
    dispatch(GetSelectExamList(SelectexamList_body));
    GetAllStandardsResult();
  }, []);

  useEffect(() => {
    dispatch(ViewExamDataRess(ExamList_body));
  }, [examid]);

  const theme = useTheme();
  const classes = Styles();
  const DotLegend = styled('span')(
    ({ theme }) => `
          border-radius: 22px;
          width: ${theme.spacing(1.5)};
          height: ${theme.spacing(1.5)};
          display: inline-block;
          margin-right: ${theme.spacing(1)};
          margin-top: -${theme.spacing(0.1)};
      `
  );

  return (
    <div>
      <PageHeader heading={'Exam Schedule'} subheading={''} />
      <DotLegend
        className={classes.border}
        style={{
          background: 'darkmagenta',
          marginLeft: '1.5rem',
          marginBottom: '-2px'
        }}
      />
      <small>
        <b>Description</b>
      </small>
      <></>
      <Container>
        <FormControl
          sx={{ marginTop: '50px', m: 1, width: '100%', marginLeft: '0px' }}
        >
          {
            <NativeSelect onChange={(e) => handleChange(e)}>
              <option value="0">Select Exam</option>

              {SelectExamList?.map(
                (allexamslist: GetSelectExamListResult, i) => {
                  return (
                    <option value={allexamslist.Id} key={i}>
                      {allexamslist.Name}
                    </option>
                  );
                }
              )}
            </NativeSelect>
          }
        </FormControl>
      </Container>

      {ExamsList?.map((items: GetExamsListResult, i) => {
        return (
          <>
            {i == 0 && items.Instructions !== '' ? (
              <Icon3 Note={items.Instructions} />
            ) : null}
            <List6
              StartDate={items.StartDate}
              StartTime={items.StartTime}
              EndTime={items.EndTime}
              SubjectName={items.SubjectName}
              TestType={items.TestType}
              Description={items.Description}
              Instruction={items.Instructions}
              index={i}
            />
          </>
        );
      })}
    </div>
  );
}

export default ExamSchedule;
