import { Typography, useTheme, Container, Card,Grid } from '@mui/material';
import PropTypes from 'prop-types';
import { Styles } from 'src/assets/style/student-style';
import { Link as RouterLink } from 'react-router-dom';
import { useState } from 'react';
import { ButtonPrimary } from '../styled/ButtonStyle';
import {
  CardWrapper,
  ListStyle,
  CardDetail3,
  CardDetail1,
  BoxWrapper,
  CardDetail2
} from '../styled/CardStyle';
import { sitePath } from 'src/components/Common/Util';

Card7.propTypes = {
  From: PropTypes.string,
  To: PropTypes.string,
  Date: PropTypes.string,
  Text: PropTypes.string,
  ViewDetail: PropTypes.object,
  Body: PropTypes.string,
  Attachments: PropTypes.any,
  ID: PropTypes.string,
  Viewsent: PropTypes.array
};

function Card7({
  ViewDetail,
  From,
  To,
  Body,
  Text,
  Attachments,
  ID,
  Viewsent,
  ViewSentObject
}) {
  const theme = useTheme();

  let attachment = Attachments;
  let attachmentObj: any = [];
  let file_path = sitePath+'/RITeSchool/Uploads/';

  const [AttachmentArray, setAttachmentArray] = useState<any>([]);

  if (Object.keys(Attachments).length == 0) {
    AttachmentArray.push('null');
  } else {
    for (const property in attachment) {
      let AttachmentFile: any = {
        FileName: `${property}`,
        FilePath: file_path + `${property}`
      };
      AttachmentArray.push(property);
      attachmentObj.push(AttachmentFile);
    }
  }

  const classes = Styles();
  const BODY = Body.replace(/(<([^>]+)>)/gi, '');
  const FromUserID = ViewSentObject.SenderUserId;

  return (
    <>
      <Container>
        <ListStyle>
          <BoxWrapper>
            <CardDetail1> {ViewDetail.From}</CardDetail1>

            <CardDetail2>{From}</CardDetail2>
          </BoxWrapper>
          <BoxWrapper>
            <CardDetail1> {ViewDetail.To}</CardDetail1>

            <CardDetail2>{To}</CardDetail2>
          </BoxWrapper>
          <BoxWrapper>
            <CardDetail1>{ViewDetail.Subject}</CardDetail1>
            <CardDetail2>{Text}</CardDetail2>
          </BoxWrapper>
          <BoxWrapper>
            {attachmentObj.length === 0 ? null : (
              <>
                {attachmentObj.map((item, i) => {
                  return (
                    <CardDetail1
                      key={i}
                      onClick={(event: React.MouseEvent<HTMLElement>) => {
                        window.open(item.FilePath);
                      }}
                      sx={{ color: '#628def' }}
                    >
                      {item.FileName.slice(0, 40) + '...'}
                    </CardDetail1>
                  );
                })}
              </>
            )}
          </BoxWrapper>
          <BoxWrapper>
            <CardDetail1> {ViewDetail.Body}</CardDetail1>
      
           
            <CardDetail2 dangerouslySetInnerHTML={{ __html: Body }} />
         
          </BoxWrapper>
        </ListStyle>
        <CardWrapper>
          <RouterLink
            style={{ textDecoration: 'none' }}
            to={
              `/${
                location.pathname.split('/')[1]
              }/MessageCenter/Compose/Reply/` +
              From +
              '/' +
              Text +
              '/' +
              AttachmentArray +
              '/' +
              BODY +
              '/' +
              FromUserID
            }
          >
            <ButtonPrimary> Reply</ButtonPrimary>&nbsp;&nbsp;
          </RouterLink>
          <RouterLink
            style={{ textDecoration: 'none' }}
            to={
              `/${
                location.pathname.split('/')[1]
              }/MessageCenter/Compose/Forward/` +
              Text +
              '/' +
              AttachmentArray +
              '/' +
              BODY
            }
          >
            <ButtonPrimary> Forward</ButtonPrimary>
          </RouterLink>
        </CardWrapper>
      </Container>
    </>
  );
}
export default Card7;
