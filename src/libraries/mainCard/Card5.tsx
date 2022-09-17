import React from 'react';
import { ListStyle } from '../styled/CardStyle';
import {
  CardDetail,
  CardDetail1,
  CardDetail2,
  CardDetail3,
} from '../styled/CardStyle';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';

function Card5({ text1, text2, clickIcon }) {
  return (
    <div>
    <ListStyle>
        <CardDetail>
          <CardDetail1>{text1}</CardDetail1>
          <CardDetail2>{text2}</CardDetail2>
          <CardDetail2 onClick={clickIcon}>{<FileDownloadOutlinedIcon />}</CardDetail2>
        </CardDetail>
      </ListStyle>
    </div>
  );
}

export default Card5;
