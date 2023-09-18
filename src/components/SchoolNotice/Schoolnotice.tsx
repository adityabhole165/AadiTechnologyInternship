import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { RootState } from 'src/store';
import PageHeader from 'src/libraries/heading/PageHeader';
import { getSchoolNotice } from 'src/requests/Schoolnotice/Schoolnotice';
import ISchoolnotice from '../../interfaces/Common/SchoolNotice';
import List1 from 'src/libraries/mainCard/List1';
import {
  Container,useTheme
} from '@mui/material';
import BackButton from 'src/libraries/button/BackButton';
import { BoxStyle } from 'src/libraries/styled/HeadingStyled';
import SuspenseLoader from 'src/layouts/components/SuspenseLoader';
import { IGetAllActiveNoticesBody } from 'src/interfaces/Student/ISchoolNoticeBoard';
import { getAllActiveNotices } from 'src/requests/SchoolNoticeBoard/requestSchoolNoticaBoard';
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
      FileName: item.FileName,
     
    };
  });
 const Data1 = GetAllActiveNotices.map((item, index) => {
    return {
      id: item.Id,
      header: item.Name,
      text2: '',
      linkPath: '/Common/Viewschoolnotice/' + item.Id,
      FileName: item.FileName,
      IsText: item.IsText,
      IsImageNotice:item.IsImageNotice
    };
  });

 const downloadNotice = (FileName) => {
    
    window.open(localStorage.getItem('SiteURL') + 'RITeSchool/DOWNLOADS/School Notices/' + FileName )
    // window.open(localStorage.getItem('SiteURL') + 'RITeSchool/Images/'+ FileName)
}
  const theme = useTheme();
  const classes = Styles();

  return (
    <BoxStyle>
      <Container>
        <PageHeader heading={'School Notices'} subheading={''} />

        {Data1.map((item, index) => {
          return (
            <div key={index}>
             <CardNotice 
               item={item}
              downloadNotice={downloadNotice}
              />
              </div>);
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
