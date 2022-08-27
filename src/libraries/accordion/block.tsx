import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import Card20 from 'src/libraries/card/card20';
import PropTypes from 'prop-types';

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
  const [outof, setoutof] = useState([]);

  const min = 0;

  var subjectgrade: any = [];
  var singlesubject: any = [];
  var indexval;
  const [grade, setgrade] = useState([]);
  const marks: any = [];
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

        subject.push(list1.Subject);
        marks.push(list1.Marks);
        outofmarks.push(list1.OutOf);
        grades.push(list1.Grade);
        gradeormarks.push(list1.GradeOrMarks);
        endingmarksrange.push(list1.EndingMarksRange);
        examstatus.push(list1.ExamStatus);
        IsAbsent.push(list1.IsAbsent);
      } else {
      }
    });
  });

  return (
    <>
      <Chart
        options={{
          chart: {
            stacked: true,
            background: '#FFFFFF',
            zoom: {
              enabled: false
            },

            animations: {
              enabled: true,
              easing: 'easeinout',
              speed: 800,
              animateGradually: {
                enabled: true,
                delay: 150
              },

              dynamicAnimation: {
                enabled: true,
                speed: 530
              }
            }
          },

          dataLabels: {
            formatter: (val: any, outof: any) => {
              if (gradeormarks !== 'G') {
                if (val >= '90' && val <= '100') {
                  return 'A+';
                } else if (val >= 80 && val <= 89) {
                  return 'A';
                } else if (val === min) {
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
            }
          },

          theme: {
            mode: 'dark'
          },

          xaxis: {
            categories: options,

            min: 0,
            max: 100,
            range: 0 - 100,

            labels: {
              show: true
            },
            axisTicks: {
              show: false
            }
          },

          yaxis: {
            labels: {
              formatter: (val) => {
                return `${val}`;
              },

              style: {
                colors: ['#000000'],
                fontSize: '14px',
                fontWeight: 600
              }
            }
          },

          plotOptions: {
            bar: {
              horizontal: true,
              columnWidth: '100%',
              barHeight: '70%',
              borderRadius: 4
            }
          },
          tooltip: {
            x: {
              show: false
            },
            y: {
              title: {
                formatter: function () {
                  return 'Marks Scored :'
                }
              },
              
            }
          }
        }}
        series={[
          {
            name: 'Marks Scored',
            data: series,
            color: '#0000FF'
          },
          {
            name: 'Outof Marks',
            color: '#800000'
          }
        ]}
        type="bar"
        width="100%"
        height="100%"
      ></Chart>

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
