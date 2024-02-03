import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IGetSettingValueBody } from 'src/interfaces/SchoolSetting/schoolSettings';
import Card20 from 'src/libraries/card/card20';
import { ShowTotalAsPerOutOfMarks } from 'src/requests/SchoolSetting/schoolSetting';
import { RootState } from 'src/store';
import BarChart from '../Charts/BarChart';
Block.propTypes = {
  Percentage: PropTypes.any,
  SubjectTotalMarks: PropTypes.string,
  GrandTotal: PropTypes.string,
  Rank: PropTypes.string,
  Grade: PropTypes.string,
  showonlyGrade: PropTypes.any
};

function Block({
  Data,
  ExamId,
  Percentage,
  Rank,
  GrandTotal,
  SubjectTotalMarks,
  Grade,
  showonlyGrade
}) {
  const [options, setObject] = useState([]);
  const [series, setSeries] = useState([]);
  const [color, setColor] = useState([]);
  const [outof, setoutof] = useState([]);
  const min = 0;
  let IsGrade = showonlyGrade;
  var singlesubject: any = [];
  var indexval;
  const [grade, setgrade] = useState([]);
  const marks: any = [];
  const actualMarks: any = [];
  const colors: any = [];
  const subject: any = [];
  const outofmarks: any = [];
  const grades: any = [];
  const conideredTotal: any = [];
  const gradeormarks: any = [];
  const endingmarksrange: any = [];
  const examstatus: any = [];
  const exmstats: any = [];
  const lateJoinee: any = [];
  const IsAbsent: any = [];
  const gradeormark: any = [];
  const [data, setData] = useState([]);
  const asSchoolId = localStorage.getItem('localSchoolId');
  const asAcademicYearId = sessionStorage.getItem('AcademicYearId');
  const ShowTotalAsPerOutOfM = useSelector(
    (state: RootState) => state.getSchoolSettings.ShowTotalAsPerOutOfMarks
  );
  Data.map((list, index) => {
    list.StudentMarksList.filter((item) => item.ConsiderInTotal === 'Y').map(
      (list1, i) => {
        if (ExamId == list1.ExamId) {
          if (list1.Marks == 0 && list1.ExamStatus == 'Absent') {
            let Marks = '99.99';
            marks.push(Marks);
            colors.push('#cf352e');
          } else if (list1.ExamStatus == 'Late Joinee') {
            let Marks = '99.99';
            marks.push(Marks);
            colors.push('#cf352e');
          } else if (list1.ExamStatus == 'Exempted') {
            let Marks = '99.99';
            marks.push(Marks);
            colors.push('#cf352e');
          } else {
            colors.push('#6699CC');
            marks.push(((list1.Marks / Number(list1.OutOf)) * 100).toFixed(2));
          }
          subject.push(list1.Subject);
          actualMarks.push(list1.Marks);
          outofmarks.push(list1.OutOf);
          grades.push(list1.Grade);
          gradeormarks.push(list1.GradeOrMarks);
          endingmarksrange.push(list1.EndingMarksRange);
          examstatus.push(list1.ExamStatus);
          exmstats.push(list1.ExamStatus);
          lateJoinee.push(list1.ExamStatus);
          IsAbsent.push(list1.Marks == 0 ? list1.IsAbsent : 'N');
        }
      }
    );
  });

  Data.map((list, index) => {
    list.StudentMarksList.map((list1, index1) => {
      if (ExamId == list1.ExamId) {
        if (list1.ConsiderInTotal == 'N') {
          if (list1.GradeOrMarks == 'G') {
            gradeormark.push(list1.Grade);
          }
          if (list1.GradeOrMarks == 'M') {
            gradeormark.push(list1.Marks);
          }
          singlesubject.push(list1.Subject);
          showonlyGrade = list1.ShowOnlyGrade;
          conideredTotal.push(list1.ConsiderInTotal);
          indexval = index1;
        }
      }
    });
  });
  const dispatch = useDispatch();
  const GetSettingValueBody: IGetSettingValueBody = {
    asSchoolId: parseInt(asSchoolId),
    aiAcademicYearId: parseInt(asAcademicYearId),
    asKey: ''
  };
  useEffect(() => {
    dispatch(ShowTotalAsPerOutOfMarks(GetSettingValueBody));
  }, []);

  useEffect(() => {
    setObject(subject);
    setSeries(marks);
    setColor(colors);
    setoutof(outofmarks);
    setgrade(grades);
  }, [Data]);

  const formatToolTip = (val, opts) => {
    const index = opts.dataPointIndex;
    if (IsAbsent[index] === 'Y') {
      return 'Absent';
    } else if (exmstats[index] == 'Late Joinee') {
      return 'Late Joinee';
    } else if (exmstats[index] == 'Exempted') {
      return 'Exempted';
    } else {
      return actualMarks[index] + '/' + outof[index];
    }
  };
  const dataLabel = (val, opts) => {
    let returnVal = val;
    if (val >= '90' && val <= '100' && val != '99.99') {
      returnVal = 'A+';
    } else if (val >= 80 && val <= 89) {
      returnVal = 'A';
    } else if (val >= 45 && val <= 49) {
      returnVal = 'D+';
    } else if (val >= 35 && val <= 44) {
      returnVal = 'D';
    } else if (val >= 0 && val <= 34) {
      returnVal = 'NH';
    } else if (val == 0) {
      returnVal = 'NH';
    } else if (val >= 50 && val <= 54) {
      returnVal = 'C';
    } else if (val >= 55 && val <= 59) {
      returnVal = 'C+';
    } else if (val >= 60 && val <= 69) {
      returnVal = 'B';
    } else if (val >= 70 && val <= 79) {
      returnVal = 'B+';
    } else if (val >= 80 && val <= 89) {
      returnVal = 'A';
    } else if (val >= 90 && val <= 92) {
      returnVal = 'A-';
    }
    {
      if (val == 0) {
        return getIsAbsent(opts.dataPointIndex, (val = ''), returnVal);
      } else {
        return getIsAbsent(opts.dataPointIndex, val + '%', returnVal);
      }
    }
  };
  const getIsAbsent = (index, val, returnVal) => {
    if (IsAbsent[index] === 'Y') {
      return 'Absent';
    } else if (exmstats[index] == 'Late Joinee') {
      return 'Late Joinee';
    } else if (exmstats[index] == 'Exempted') {
      return 'Exempted';
    } else {
      return IsGrade.trim() == 'true' ? returnVal : val;
    }
  };

  return (
    <>
      <BarChart
        xData={options}
        colors={color}
        series={series}
        dataLabel={dataLabel}
        formatToolTip={formatToolTip}
        Isgrade={showonlyGrade}
      ></BarChart>
      {ShowTotalAsPerOutOfM && (
        <Card20
          percentage={Percentage}
          rank={Rank}
          grandTotal={GrandTotal}
          subjectTotalMarks={SubjectTotalMarks}
          grade={Grade}
          subject={singlesubject}
          indexval={indexval}
          Gradeormarks={gradeormark}
          Data={Data}
          examstatus={examstatus}
          showonlyGrade={showonlyGrade}
        />
      )}
    </>
  );
}
export default Block;
