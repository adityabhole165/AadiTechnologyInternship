import React from 'react';
import PropTypes from 'prop-types';

import Card21 from 'src/libraries/card/card21';
import {
  CardDetail,
  CardDetail1,
  CardDetail2
} from '../styled/AccordianStyled';
import { ListStyle } from '../styled/CardStyle';


Card20.propTypes = {
  percentage: PropTypes.any,
  subjecttotalmarks: PropTypes.string,
  testgrade: PropTypes.string,
  rank: PropTypes.string,
  grade: PropTypes.string,
  subject: PropTypes.any,
  subjectgrade: PropTypes.any,
  indexval: PropTypes.any
};

function Card20({
  percentage,
  rank,
  grandTotal,
  subjectTotalMarks,
  grade,
  subjectgrade,
  subject,
  indexval
})
{
  return (
    <>
    
      <ListStyle sx={{backgroundColor:"pink"}}>
        <CardDetail>
          <CardDetail1> Total</CardDetail1>
          <CardDetail2>{grandTotal + "/" + subjectTotalMarks}</CardDetail2>
        </CardDetail>
        <CardDetail>
          <CardDetail1> Percentage</CardDetail1>
          <CardDetail2> {percentage}</CardDetail2>
        </CardDetail>
        <CardDetail>
          <CardDetail1> Grade</CardDetail1>
          <CardDetail2> {grade}</CardDetail2>
        </CardDetail>
        <CardDetail>
          <CardDetail1> Rank</CardDetail1>
          {
              (rank != "999" &&  rank != "-99") ? <CardDetail1> {rank}</CardDetail1> : <CardDetail1> </CardDetail1>
          }
        </CardDetail>
      </ListStyle>

      <Card21
        subjectgrade={subjectgrade}
        subject={subject}
        indexval={indexval}
      />
    </>
  );
}

export default Card20;
