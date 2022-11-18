import React from 'react';
import {  CardD, CardDetail,CardDetail1,CardDetail2,CardDetail3,CardDetail5, CardDetail7, CardDetail9, DateWidth, DateWidth1} from '../styled/CardStyle';
import { useLocation } from 'react-router-dom';
import { Typography } from '@mui/material';

function Card4({ header, text1, text2, text3, text5 ,text4,text6,clickCard=undefined,ActiveTab=undefined,IsRead=undefined}) {
  
  const location = useLocation();
  const pathname = location.pathname;
  const pageName = pathname.replace('/extended-sidebar/Common/', '');
  const pageName1 = pathname.replace('/extended-sidebar/', '');
  const IsReadColor = IsRead == 'N'?'blue':''

  return (
    <>
      <CardDetail onClick={clickCard}>
      
      {ActiveTab == "Inbox" ? <CardDetail1 style={{color:IsReadColor}}>{header}</CardDetail1> : <CardDetail1>{header}</CardDetail1> }
      {pageName1== "Teacher/Texamschedule" ? <DateWidth>{text3}</DateWidth> : pageName == "EventOverview" ? <DateWidth1>{text3}</DateWidth1> : <CardDetail2>{text3}</CardDetail2>}
        </CardDetail>
        
        <CardDetail>
        {pageName1 == "MessageCenter/msgCenter" ?<CardD>{text1}</CardD> :<CardDetail3>{text1}</CardDetail3>}
        <CardDetail2>{text2}</CardDetail2>
        </CardDetail>
          
          <CardDetail>
          {pageName == "PTA" ? <CardDetail2 color="primary">{text6}</CardDetail2> : null } 
         <CardDetail9 color="primary">{text5}</CardDetail9>
        <CardDetail2>{text4}</CardDetail2> 
          </CardDetail>

    </>
  );
}

export default Card4;
