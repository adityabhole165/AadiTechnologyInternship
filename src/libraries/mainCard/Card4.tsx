import React from 'react';
import {
  CardDetail,
  CardDetail1,
  CardDetail2,
  CardDetail3
} from '../styled/CardStyle';

function Card4({ header, text1, text2, text3 , text4 }) {
  return (
    <>
      <CardDetail>
        <CardDetail1>{header}</CardDetail1>
        <CardDetail2>{text3}</CardDetail2>
      </CardDetail>

      <CardDetail>
        <CardDetail3>{text1}</CardDetail3>
        <CardDetail2>{text2}-{text4}</CardDetail2>
      </CardDetail>
    </>
  );
}

export default Card4;
