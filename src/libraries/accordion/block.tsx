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
  Grade: PropTypes.string,
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
  var subjectgrade: any = [];
  var singlesubject: any = [];
  var showonlyGrade = ''
  var indexval;
  const [grade, setgrade] = useState([]);
  const marks: any = [];
  const colors: any = [];
  const subject: any = [];
  const outofmarks: any = [];
  const grades: any = [];
  const conideredTotal :any=[];
  const gradeormarks: any = [];
  const endingmarksrange: any = [];
  const examstatus: any = [];
  const exmstats:any=[];
  const lateJoinee:any = [];
  const IsAbsent: any = [];
  const gradeormark: any = [];
  const [data, setData] = useState([]);

  useEffect(() => {
    setObject(subject);
    setSeries(marks);
    setColor(colors);
    setoutof(outofmarks);
    setgrade(grades);
  }, []);

  console.log("Data Fo Barchart",Data);

  Data.map((list, index) => {
   list.StudentMarksList.filter((item)=>item.ConsiderInTotal==="Y" ).map((list1, i) => {
      if (ExamId == list1.ExamId) {
        if (list1.Marks == 0 && list1.ExamStatus == 'Absent') {
          let Marks = '99.99'
          marks.push(Marks);
          colors.push('#800000')
        } 
        else if (list1.ExamStatus == 'Late Joinee'){
          let Marks = '99.99'
          marks.push(Marks);
          colors.push('#800000')
        }
        else if (list1.ExamStatus == 'Exempted'){
          let Marks = '99.99'
          marks.push(Marks);
          colors.push('#800000')
        }
        else {
          colors.push('#0000FF')
          marks.push((list1.Marks/Number(list1.OutOf))*100 );        
        }

        subject.push(list1.Subject);
        outofmarks.push(list1.OutOf);
        grades.push(list1.Grade);
        gradeormarks.push(list1.GradeOrMarks);
        endingmarksrange.push(list1.EndingMarksRange);
        examstatus.push(list1.ExamStatus);
        exmstats.push(list1.ExamStatus);
        lateJoinee.push(list1.ExamStatus);
        IsAbsent.push(list1.IsAbsent);
      }
      else {
      }
    });
  });

  Data.map((list, index) => {
   list.StudentMarksList.map((list1, index1) => {
      if (ExamId == list1.ExamId) {

        if (list1.ConsiderInTotal == 'N' ) {
          if(list1.GradeOrMarks == 'G'){
            gradeormark.push(list1.Grade);
          }
          if(list1.GradeOrMarks == 'M'){
            gradeormark.push(list1.Marks)
          }
          singlesubject.push(list1.Subject);
          showonlyGrade=list1.ShowOnlyGrade;
          conideredTotal.push(list1.ConsiderInTotal);
          indexval = index1;
        }
      }
      else {
      }
    });
  });

  const dataLabel = (val,opts) => {
    let returnVal = val
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
    return (getIsAbsent(opts.dataPointIndex, val, returnVal))
  }
  const getIsAbsent = (index,val, returnVal) => {

    if (IsAbsent[index] === 'Y') {
      return 'Absent'
    }
    else if (exmstats[index] == 'Late Joinee') { 
      return 'Late Joinee'
    }
    else if (exmstats[index] == 'Exempted'){
      return 'Exempted'
    }
    else if (showonlyGrade === 'true'){
      return returnVal
    }
    else{
      return val
    }
  }
  return (
    <>
      <BarChart xData={options} colors={color} series={series} dataLabel={dataLabel} ></BarChart>
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
      />
    </>
  );
}
export default Block;
