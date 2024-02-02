import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import {
  CardDetail,
  CardDetail2,
  CardDetail4,
  ListStyle
} from '../styled/CardStyle';
// import CurrencyRupeeRoundedIcon from '@mui/icons-material/CurrencyRupeeRounded';

function Card5({ text1, text2, clickIcon }) {
  return (
    <div>
      <ListStyle>
        <CardDetail>
          <CardDetail4>
            <b>{text1}</b>&nbsp;:&nbsp; {text2}
          </CardDetail4>
          <CardDetail2 onClick={clickIcon}>
            {<FileDownloadOutlinedIcon />}
          </CardDetail2>
        </CardDetail>
      </ListStyle>
    </div>
  );
}

export default Card5;
