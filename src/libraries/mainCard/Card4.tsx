import React from 'react';
import { CardDetail,CardDetail1,CardDetail2,CardDetail3} from '../styled/CardStyle';
import { useLocation } from 'react-router-dom';

function Card4({ header, text1, text2, text3, text5 }) {
  console.log("text1",text1);
  
  const location = useLocation();
  const pathname = location.pathname;
  const pageName = pathname.replace('/extended-sidebar/Common/', '');
  return (
    <>
      <CardDetail>
      {pageName == "Feedback" ? null :<CardDetail1>{header}</CardDetail1>}
         <CardDetail2>{text3}</CardDetail2>
        </CardDetail><CardDetail>
        {pageName == "Feedback" ? null : <CardDetail3>{text1}</CardDetail3>}
        {pageName == "Feedback" ? null : <CardDetail2>{text2}</CardDetail2>}
          </CardDetail>
         {pageName == "Feedback" ? null : <CardDetail3 color="primary">{text5}</CardDetail3>}
    </>
  );
}

export default Card4;
