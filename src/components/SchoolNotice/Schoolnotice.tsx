import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { RootState } from 'src/store';
import PageHeader from 'src/libraries/heading/PageHeader';
import { getSchoolNotice } from 'src/requests/Schoolnotice/Schoolnotice';
import ISchoolnotice from '../../interfaces/Common/SchoolNotice';
import List1 from 'src/libraries/mainCard/List1';
import {
  Container,
  Accordion,
  AccordionSummary,
  Typography,
  AccordionDetails,
  useTheme
} from '@mui/material';
import BackButton from 'src/libraries/button/BackButton';
import { Box } from '@mui/system';
import { BoxStyle } from 'src/libraries/styled/HeadingStyled';
import SuspenseLoader from 'src/layouts/components/SuspenseLoader';
import { IGetAllActiveNoticesBody } from 'src/interfaces/Student/ISchoolNoticeBoard';
import { getAllActiveNotices } from 'src/requests/SchoolNoticeBoard/requestSchoolNoticaBoard';
import Card5Fees from 'src/libraries/card/Card5Fees';
import Card5 from 'src/libraries/mainCard/Card5';
import { Styles } from 'src/assets/style/student-style';
import CardNotice from 'src/libraries/card/CardNotice';

function Schoolnotice() {
  const dispatch = useDispatch();
  const SchoolnoticeList = useSelector(
    (state: RootState) => state.Schoolnotice.SchoolNoticeData
  );

  const GetAllActiveNotices = useSelector(
    (state: RootState) => state.SchoolNoticeBoard.AllActiveNotices
  );

  const asSchoolId = localStorage.getItem('localSchoolId');
  const asUserId = sessionStorage.getItem('Id');
  

  const loading = useSelector((state: RootState) => state.Schoolnotice.Loading);

  const body: ISchoolnotice = {
    asSchoolId: asSchoolId,
    asNoticeId: 0,
    asUserId: asUserId
  };

  const ActiveNoticesBody: IGetAllActiveNoticesBody = {
    asSchoolId: asSchoolId,
    asUserId: asUserId
  };
  useEffect(() => {
    if (sessionStorage.getItem('Id') !== null)
      localStorage.setItem('url', window.location.pathname);
    dispatch(getSchoolNotice(body));
  }, []);
  const  [drop,setDrop] = useState('')


  
  useEffect(() => {
    dispatch(getAllActiveNotices(ActiveNoticesBody));
  }, []);
  let filevalue=""
   const name = GetAllActiveNotices.filter((item,i)=>{
    return drop == item.id ? filevalue=item.FileName :""
      })


  useEffect(() => {

    if (GetAllActiveNotices.length > 0 ) {
      window.open(localStorage.getItem('SiteURL')+ 'RITeSchool/DOWNLOADS/'+ filevalue )
      // dispatch(resetReciept());
    }
  }, [GetAllActiveNotices])


  const Data = SchoolnoticeList.map((item, index) => {
    const date = item.Date;
    const day = new Date(date).getDate();
    const month = new Date(date).toLocaleString('default', { month: 'short' });
    const year = new Date(date).getFullYear();
    const newdate = `${day} ${month} ${year}`;
    return {
      id: index,
      header: item.Name,
      text1: newdate,
      text2: '',
      linkPath: '/Common/Viewschoolnotice/' + item.Id,
      FileName: item.FileName
    };
  });
  const downloadNotice = (value) => {
    const ActiveNoticesBody: IGetAllActiveNoticesBody = {
      asSchoolId: asSchoolId,
      asUserId: asUserId
    };
    dispatch(getAllActiveNotices(ActiveNoticesBody));
    setDrop(value)
  };
 const Data1 = GetAllActiveNotices.map((item, index) => {
    return {
      id: item.Id,
      header: item.Name,
      text2: '',
      linkPath: '/Common/Viewschoolnotice/' + item.Id,
      FileName: item.FileName,
      IsText: item.IsText
    };
  });
  const theme = useTheme();
  const classes = Styles();

  return (
    <BoxStyle>
      <Container>
        <PageHeader heading={'School Notices'} subheading={''} />

        {Data1.map((item, index) => {
  
          if (item.IsText) {
            return (
              <CardNotice
                key={index}
                text1={item.header}
                text2={item.FileName}
                id={item.id}
              downloadNotice={downloadNotice}
              />
             
            );
          } 
          })}
            <br></br>
        {sessionStorage.getItem('Id') === null && (
          <BackButton FromRoute={'/schoolList'} />
        )}
        {loading ? (
          <SuspenseLoader />
        ) : (
        
          <>
            <List1 items={Data} />
          </>
        )}
      </Container>
    </BoxStyle>
  );
}
export default Schoolnotice;
