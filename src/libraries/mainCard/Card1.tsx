import { Grow } from '@mui/material';
import AttachmentIcon from '@mui/icons-material/Attachment';
import Card4 from 'src/libraries/mainCard/Card4';
import { BoxStyle, ListStyle } from '../styled/CardStyle';

function Card1({
  header,
  text1,
  text2,
  text3,
  text5,
  
  isSelected,
  Color,
  FileName = '',
  margin = '',
  RealatedSection = ''
}) {

  return (
    <Grow
      in={true}
      style={{ transformOrigin: '0 0 1' }}
      {...{ timeout: 1500 }}
    >
      <ListStyle color={Color} sx={{mx: margin}}>
        {FileName === '' || FileName === undefined ? null : (
          <BoxStyle>
            <AttachmentIcon />
          </BoxStyle>
        )}
        <Card4 header={header} text1={text1} text2={text2} text3={text3} text5={text5} />
      </ListStyle>
    </Grow>
  );
}

export default Card1;
