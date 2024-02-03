import { Box, Grow } from '@mui/material';
import PropTypes from 'prop-types';
import { useState } from 'react';
// import ShowMoreText from "react-show-more-text";
import { CardDetail3, ListStyle } from '../styled/CardStyle';

ExamDetails.propTypes = {
  StartDate: PropTypes.string,
  StartTime: PropTypes.string,
  EndTime: PropTypes.string,
  SubjectName: PropTypes.string
};
function ExamDetails({
  StartDate,
  StartTime,
  EndTime,
  Exam,
  SubjectName,
  EndDate
}) {
  const [checked, setChecked] = useState(true);

  return (
    <>
      <Grow
        in={checked}
        style={{ transformOrigin: '0 0 1' }}
        {...(checked ? { timeout: 1500 } : {})}
      >
        <ListStyle>
          <Box>
            <CardDetail3>
              <b>Exam</b> : {Exam}
            </CardDetail3>
          </Box>

          <CardDetail3>
            <b>Subject</b> : {SubjectName}
          </CardDetail3>

          <CardDetail3>
            <b>Date/Time</b> : {StartDate}-{StartTime} To {EndTime}
          </CardDetail3>
        </ListStyle>
      </Grow>
    </>
  );
}

export default ExamDetails;
