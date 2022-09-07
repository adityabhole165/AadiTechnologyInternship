import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import Card20 from 'src/libraries/card/card20';
import PropTypes from 'prop-types';
import BarChart from '../Charts/BarChart'
Block.propTypes = {
  Percentage: PropTypes.any,
  SubjectTotalMarks: PropTypes.string,
  GrandTotal: PropTypes.string,
  Rank: PropTypes.string,
  Grade: PropTypes.string
};

function Block({
  Data,
  ExamId,
  Percentage,
  Rank,
  GrandTotal,
  SubjectTotalMarks,
  Grade
}) {
  const [options, setObject] = useState([]);
  const [series, setSeries] = useState([]);
  const [color, setColor] = useState([]);
  const [outof, setoutof] = useState([]);

  const min = 0;
  // console.log("here - ", Data)
  var subjectgrade: any = [];
  var singlesubject: any = [];
  var indexval;
  const [grade, setgrade] = useState([]);
  const marks: any = [];
  const colors: any = [];
  const subject: any = [];
  const outofmarks: any = [];
  const grades: any = [];
  const gradeormarks: any = [];
  const endingmarksrange: any = [];
  const examstatus: any = [];
  const IsAbsent: any = [];

  useEffect(() => {
    setObject(subject);
    setSeries(marks);
    setColor(colors);
    setoutof(outofmarks);
    setgrade(grades);
  }, []);


  Data.map((list, index) => {
    list.StudentMarksList.map((list1, index1) => {
      if (ExamId == list1.ExamId) {
        if (list1.ConsiderInTotal == 'N') {
          subjectgrade.push(list1.Grade);
          singlesubject.push(list1.Subject);
          indexval = index1;
        }
        if (list1.Marks == 0 && list1.Grade == 'Absent') {
          let Marks = '101'
          marks.push(Marks);
          colors.push('#800000')
        } else {
          colors.push('#0000FF')
          marks.push(list1.Marks);
        }
        subject.push(list1.Subject);
        outofmarks.push(list1.OutOf);
        grades.push(list1.Grade);
        gradeormarks.push(list1.GradeOrMarks);
        endingmarksrange.push(list1.EndingMarksRange);
        examstatus.push(list1.ExamStatus);
        IsAbsent.push(list1.IsAbsent);
      }

      else {
      }
    });
  });
  // console.log(color)
  const dataLabel = (val) => {
    if (val >= '90' && val <= '100') {
      return 'A+';
    } else if (val >= 80 && val <= 89) {
      return 'A';
    } else if (val === 101) {
      return 'Absent';
    } else if (val >= 45 && val <= 49) {
      return 'D+';
    } else if (val >= 35 && val <= 44) {
      return 'D';
    } else if (val >= 0 && val <= 34) {
      return 'NH';
    } else if (val == 0) {
      return 'NH';
    } else if (val >= 50 && val <= 54) {
      return 'C';
    } else if (val >= 55 && val <= 59) {
      return 'C+';
    } else if (val >= 60 && val <= 69) {
      return 'B';
    } else if (val >= 70 && val <= 79) {
      return 'B+';
    } else if (val >= 80 && val <= 89) {
      return 'A';
    } else if (val >= 90 && val <= 92) {
      return 'A-';
    }
  }

  return (
    <>
      <BarChart xData={options} colors={color} series={series} dataLabel={dataLabel}></BarChart>
      <Card20
        percentage={Percentage}
        rank={Rank}
        grandTotal={GrandTotal}
        subjectTotalMarks={SubjectTotalMarks}
        grade={Grade}
        subjectgrade={subjectgrade}
        subject={singlesubject}
        indexval={indexval}
      />
    </>
  );
}
export default Block;
