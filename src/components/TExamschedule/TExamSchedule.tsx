import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { RootState } from 'src/store';
import IGetAllStandards, {
  IGetExamsList
} from 'src/interfaces/Teacher/TExamSchedule';
import {
  GetSelectStandardRes,
  GetSelectExamRes
} from 'src/requests/TExamschedule/TExamschedule';
import { GetExamsListResult } from 'src/interfaces/Teacher/TExamSchedule';
import { GetStandardListResult } from 'src/interfaces/Teacher/TExamSchedule';
import { GetExamListResult } from 'src/interfaces/Teacher/TExamSchedule';
import PageHeader from 'src/libraries/heading/PageHeader';
import { useEffect, useState } from 'react';
import Container from '@mui/material/Container';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';
import List15 from 'src/libraries/list/List15';
import Icon4 from 'src/libraries/icon/icon4';
import { IExamList } from 'src/interfaces/Student/ExamSchedule';
import { ViewExamDataRess } from 'src/requests/Examschedule/Examschedule';
import ErrorMessages from 'src/libraries/ErrorMessages/ErrorMessages';
import Card1 from 'src/libraries/mainCard/Card1';
import DotLegend from 'src/libraries/summary/DotLegend';

function Texamschedule() {
  const dispatch = useDispatch();
  const [standardid, setstandardid] = useState(0);
  const [examid, setexamid] = useState<any>(0);
  const getstandard: any = useSelector(
    (state: RootState) => state.StandardAndExamList.SelectStandard
  );
  const getExamType: any = useSelector(
    (state: RootState) => state.StandardAndExamList.SelectExam
  );
  const ExamsList = useSelector(
    (state: RootState) => state.StandardAndExamList.ExamData
  );
  const asAcademicYearId = sessionStorage.getItem('AcademicYearId');
  const asSchoolId = localStorage.getItem('localSchoolId');
  const asStandardId = sessionStorage.getItem('StandardId');

  const handleChange = (event: any) => {
    setstandardid(event?.target.value);
    setexamid(0);
  };

  const Getexamchange = (event: any) => {
    setexamid(event.target.value);
  };

  const ExamList_body: IExamList = {
    asSchoolId: asSchoolId,
    asAcademicYearId: asAcademicYearId,
    asStandardId: standardid,
    asExamId: examid
  };

  const getstandardList_body: IGetAllStandards = {
    asAcademicYearId: asAcademicYearId,
    asSchoolId: asSchoolId
  };

  const getexamType_body: IGetExamsList = {
    asAcademicYearId: asAcademicYearId,
    asSchoolId: asSchoolId,
    asStandardId: standardid
  };

  useEffect(() => {
    dispatch(GetSelectExamRes(getexamType_body));
    dispatch(ViewExamDataRess(ExamList_body));
  }, [standardid, examid]);

  useEffect(() => {
    dispatch(GetSelectStandardRes(getstandardList_body));
  }, [standardid]);

  return (
    <Container>
      <PageHeader heading={'Exam Schedule'} subheading={''} />
      <DotLegend color="success" text="Description" />
      <FormControl
        sx={{ marginTop: '50px', m: 1, width: '100%', marginLeft: '0px' }}
      >
        <NativeSelect onChange={(e) => handleChange(e)}>
          <option value={0}>Select Standard</option>

          {getstandard?.map((getstandarditems, i) => {
            return (
              <option value={getstandarditems.Id} key={getstandarditems.Id}>
                {getstandarditems.Name}
              </option>
            );
          })}
        </NativeSelect>
      </FormControl>
      <br />

      {standardid == 0 ? (
        <> </>
      ) : standardid != 0 && getExamType != undefined ? (
        <FormControl
          sx={{ marginTop: '0px', m: 1, width: '100%', marginLeft: '0px' }}
        >
          <NativeSelect id="ddlSelectExam" onChange={(e) => Getexamchange(e)}>
            <option id="" value="none">
              Select Exam
            </option>

            {getExamType?.map((getExamitems: GetExamListResult, index) => {
              return (
                <option value={getExamitems.Id} key={index}>
                  {getExamitems.Name}
                </option>
              );
            })}
          </NativeSelect>
        </FormControl>
      ) : (
        <ErrorMessages Error={'No exam has been scheduled'} />
      )}

      {/* {ExamsList?.map((items: GetExamsListResult, i) => {
        return (
          <>
            {i == 0 && items.Instructions !== '' ? (
              <Icon4 Note={items.Instructions} />
            ) : null}

            <Card1
              header={
                items.SubjectName +
                ' ' +
                (items.TestType !== '' ? '- ' + items.TestType : '')
              }
              text1=""
              text2={items.StartTime + '-' + items.EndTime}
              text5={items.Description}
              text3={items.StartDate}
              text4=""
              text6=""
              Color=""
              margin=""
              FileName=""
              key=""
            />
          </>
        );
      })} */}
    </Container>
  );
}

export default Texamschedule;
