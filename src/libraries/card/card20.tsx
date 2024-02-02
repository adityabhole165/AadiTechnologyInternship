import PropTypes from 'prop-types';

import Card21 from 'src/libraries/card/card21';
import { CardDetailB } from '../styled/AccordianStyled';
import { CardDetail2, ListStyle } from '../styled/CardStyle';

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
  Data: PropTypes.any,
  Gradeormarks: PropTypes.any
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
  examstatus,
  Gradeormarks,
  showonlyGrade
}) {
  return (
    <>
      <ListStyle sx={{ backgroundColor: 'pink' }}>
        {showonlyGrade.trim() == 'false' && (
          <>
            <CardDetailB>
              <CardDetail2> Total</CardDetail2>
              <CardDetail2>{grandTotal + '/' + subjectTotalMarks}</CardDetail2>
            </CardDetailB>
            <CardDetailB>
              <CardDetail2> Percentage</CardDetail2>
              <CardDetail2> {percentage}</CardDetail2>
            </CardDetailB>
          </>
        )}
        <CardDetailB>
          <CardDetail2>Grade</CardDetail2>
          <CardDetail2>{grade}</CardDetail2>
        </CardDetailB>
        {showonlyGrade.trim() == 'false' && (
          <>
            {rank <= 3 ? (
              <CardDetailB>
                <CardDetail2> Rank</CardDetail2>
                <CardDetail2> {rank}</CardDetail2>
              </CardDetailB>
            ) : null}
          </>
        )}
      </ListStyle>

      <Card21
        subjectgrade={subjectgrade}
        subject={subject}
        indexval={indexval}
        MarkScored={MarkScored}
        Data={Data}
        Gradeormarks={Gradeormarks}
      />
    </>
  );
}

export default Card20;
