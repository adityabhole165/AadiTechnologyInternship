import React from 'react';
import {  ListStyle1 } from '../styled/CardStyle';
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
    <ListStyle1>
        <CardDetail>
          <CardDetail3><b>{text1}</b>&nbsp;:&nbsp;{text2}</CardDetail3>
          <CardDetail2 onClick={clickIcon}>{<FileDownloadOutlinedIcon />}</CardDetail2>
        </CardDetail>
      </ListStyle1>
    </div>
  );
}

export default Card5;
