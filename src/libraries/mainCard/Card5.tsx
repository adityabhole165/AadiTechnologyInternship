import React from 'react';
import {  CardDetail4, ListStyle } from '../styled/CardStyle';
import {
  CardDetail,
  CardDetail1,
  CardDetail2,
  CardDetail3,
} from '../styled/CardStyle';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
// import CurrencyRupeeRoundedIcon from '@mui/icons-material/CurrencyRupeeRounded';


function Card5({ text1, text2, clickIcon }) {
  return (
    <div>
    <ListStyle>
        <CardDetail>
          {/* <CardDetail4><b>{text1}</b>&nbsp;:&nbsp; <CurrencyRupeeRoundedIcon  sx={{fontSize:'18px',position:'relative',top:'5px'}}/>{text2}</CardDetail4> */}
          <CardDetail2 onClick={clickIcon}>{<FileDownloadOutlinedIcon />}</CardDetail2>
        </CardDetail>
      </ListStyle>
    </div>
  );
}

export default Card5;
