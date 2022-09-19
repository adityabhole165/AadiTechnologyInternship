import {
  Box,
  Typography,
  useTheme,
  List,
  Container,
  Grow,
  Divider
} from '@mui/material';
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Styles } from 'src/assets/style/student-style';
// import ShowMoreText from "react-show-more-text";
import ExpandLess from '@mui/material/Icon/Icon';
import ExpandMore from '@mui/material/Icon/Icon';
import { makeStyles } from '@mui/styles';
import { Link as RouterLink } from 'react-router-dom';
import {
  CardDetail,
  CardDetail1,
  CardDetail3,
  ListStyle
} from '../styled/CardStyle';

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
