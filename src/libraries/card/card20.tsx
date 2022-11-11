import React from 'react';
import PropTypes from 'prop-types';

import Card21 from 'src/libraries/card/card21';
import {

  CardDetailB
} from '../styled/AccordianStyled';
import { CardDetail2 } from '../styled/CardStyle';
import { ListStyle } from '../styled/CardStyle';


Card20.propTypes = {
  percentage: PropTypes.any,
  subjecttotalmarks: PropTypes.string,
  testgrade: PropTypes.string,
  rank: PropTypes.string,
  grade: PropTypes.string,
  subject: PropTypes.any,
  subjectgrade: PropTypes.any,
  indexval: PropTypes.any,
  MarkScored: PropTypes.any,
  Data:PropTypes.any
};

function Card20({
  percentage,
  rank,
  grandTotal,
  subjectTotalMarks,
  grade,
  subjectgrade,
  subject,
  indexval,
  MarkScored,
  Data,
  showonlyGrade,
  examstatus
})
{
  return (
    <>
      <ListStyle sx={{backgroundColor:"pink"}}>
        <CardDetailB>
          <CardDetail2> Total</CardDetail2>
          <CardDetail2>{grandTotal + "/" + subjectTotalMarks}</CardDetail2>
        </CardDetailB>
        <CardDetailB>
          <CardDetail2> Percentage</CardDetail2>
          <CardDetail2> {percentage}</CardDetail2>
        </CardDetailB>
        <CardDetailB>
          <CardDetail2>Grade</CardDetail2>
          <CardDetail2>{grade}</CardDetail2>
        </CardDetailB>
        <CardDetailB>
          <CardDetail2> Rank</CardDetail2>
          {
              (rank != "999" &&  rank != "-99") ? <CardDetail2> {rank}</CardDetail2> : <CardDetail2> </CardDetail2>
          }
        </CardDetailB>
      </ListStyle>

      <Card21
        subjectgrade={subjectgrade}
        subject={subject}
        indexval={indexval}
        MarkScored={MarkScored}
        Data={Data}
        showonlyGrade={showonlyGrade}
        examstatus={examstatus}
      />
    </>
  );
}

export default Card20;
