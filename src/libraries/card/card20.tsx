import React from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Typography,
  useTheme,
  List,
  Container,
  Grow,
  Divider
} from '@mui/material';
import { useState, useEffect } from 'react';
import { Styles } from 'src/assets/style/student-style';
import ExpandLess from '@mui/material/Icon/Icon';
import ExpandMore from '@mui/material/Icon/Icon';
import { makeStyles } from '@mui/styles';
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
}) {
  const [checked, setChecked] = useState(true);
  const [expand, setExpand] = useState(false);

  const onClick = () => {
    setExpand(!expand);
  };
  const theme = useTheme();

  const classes = Styles();

  return (
    
      <>
        <ListStyle>
          <CardDetail>
            <CardDetail1> Total</CardDetail1>
            <CardDetail2>{grandTotal / subjectTotalMarks}</CardDetail2>
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
            <CardDetail2> {rank}</CardDetail2>
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
