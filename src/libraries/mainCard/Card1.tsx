import { Grow } from '@mui/material';
import { CardDetail, CardDetail1, CardDetail2, CardDetail3 } from '../styled/CardStyle';
import { BoxStyle, ListStyle } from '../styled/CardStyle';
import AttachmentIcon from '@mui/icons-material/Attachment';
function Card1({ header, text1, text2, text3, text5, text4, text6, 
  Color = '', FileName = '', margin = '', }) {
   const pageName = window.location.pathname.replace('/extended-sidebar/Common/', '');
  return (
    <Grow
      in={true}
      style={{ transformOrigin: '0 0 1' }}
      {...{ timeout: 1500 }}
    >
      <ListStyle color={Color} sx={{ mx: margin }}>
        {FileName === '' || FileName === undefined ? null : (
          <BoxStyle>
            <AttachmentIcon />
          </BoxStyle>
        )}
        <CardDetail>
          <CardDetail1>{header}</CardDetail1>
          <CardDetail2>{text3}</CardDetail2>
        </CardDetail>

        <CardDetail>
          {pageName == "Feedback" ? null : <CardDetail3>{text1}</CardDetail3>}
          <CardDetail2>{text2}</CardDetail2>
        </CardDetail>

        <CardDetail>
          {pageName == "PTA" ? <CardDetail2 color="primary">{text6}</CardDetail2> : null}
          {pageName == "Feedback" ? null : <CardDetail3 color="primary">{text5}</CardDetail3>}
          {pageName == "Feedback" ? null : <CardDetail2>{text4}</CardDetail2>}
        </CardDetail>
      </ListStyle>

    </Grow>
  )
}

export default Card1;
