import React from 'react';
import { AttachmentIcon1, CardD, CardDetail, CardDetail1, CardDetail2, CardDetail3, CardDetail5, CardDetail7, CardDetail9, DateWidth, DateWidth1 } from '../styled/CardStyle';
import { useLocation, Link as RouterLink } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import ForwardToInboxIcon from '@mui/icons-material/ForwardToInbox';
import { isFutureDateTime } from 'src/components/Common/Util';
import AttachmentIcon from '@mui/icons-material/Attachment';
import { BoxStyle } from '../styled/CardStyle';
function Card4({ header, text1, text2, text3, text5, text4, text6, clickCard = undefined, ActiveTab = undefined, IsRead = undefined, IsSchedule = undefined, IsAttachmentExist = undefined }) {

  const location = useLocation();
  const pathname = location.pathname;
  const pageName = pathname.replace('/extended-sidebar/Common/', '');
  const pageName1 = pathname.replace('/extended-sidebar/', '');
  const pageNameStudent = pathname.replace('/extended-sidebar/Student/', '');

  let msgDateArr = []
  let IsReadColor = ''
  if (text2 !== undefined) {
    msgDateArr = text2.split(' ')
    let msgDate = text2
    if (msgDateArr.length === 4)
      msgDate = msgDateArr[0] + " " + msgDateArr[1] + " 2023 " + msgDateArr[2] + " " + msgDateArr[3]
      IsReadColor = ActiveTab == "Inbox" ? IsRead == 'N' ? 'blue' : '' :
      ActiveTab == "Sent" ? isFutureDateTime(msgDate) ? 'blue' : '' : ''
  }
  
  return (
    <>

      <CardDetail onClick={clickCard}>

        <CardDetail1 sx={{ color: IsReadColor }}>{header}</CardDetail1>


        {pageNameStudent == 'SubjectTeacher' ?
          <>
            <RouterLink
              style={{ textDecoration: 'none' }}
              to={
                `/${location.pathname.split('/')[1]}/MessageCenter/Compose/` +
                header
              }
            >
              <ForwardToInboxIcon sx={{ cursor: 'pointer', color: '#f0483e', height: "18px" }} fontSize="small" />
            </RouterLink>
          </> : <>
            {pageName1 == "Teacher/Texamschedule" ? <DateWidth>{text3}</DateWidth> : pageName == "EventOverview" ? <DateWidth1>{text3}</DateWidth1> :
              <CardDetail2>{text3}  {IsAttachmentExist &&
                <AttachmentIcon1 >
                  <AttachmentIcon />
                </AttachmentIcon1>

              }</CardDetail2>}
          </>}
      </CardDetail>

      <CardDetail>
        {pageName1 == "MessageCenter/msgCenter" ? <CardD>{text1}</CardD> : <CardDetail3>{text1}</CardDetail3>}
        <CardDetail2>{text2} </CardDetail2>
      </CardDetail>

      <CardDetail>
        {pageName == "PTA" ? <CardDetail2 color="primary">{text6}</CardDetail2> : null}
        <CardDetail9 color="primary">{text5}</CardDetail9>
        <CardDetail2>{text4}</CardDetail2>
      </CardDetail>

    </>
  );
}

export default Card4;
