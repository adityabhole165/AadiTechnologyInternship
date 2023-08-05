import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { RootState } from 'src/store';
import PageHeader from 'src/libraries/heading/PageHeader';
import { getSchoolNotice } from 'src/requests/Schoolnotice/Schoolnotice';
import ISchoolnotice from '../../interfaces/Common/SchoolNotice';
import List1 from 'src/libraries/mainCard/List1';
import { Container } from '@mui/material';
import BackButton from 'src/libraries/button/BackButton';
import { Box } from '@mui/system';
import { BoxStyle } from 'src/libraries/styled/HeadingStyled';
import SuspenseLoader from 'src/layouts/components/SuspenseLoader';

function Schoolnotice() {
  const asSchoolId = localStorage.getItem('localSchoolId');
  const asUserId = sessionStorage.getItem('Id');

  const dispatch = useDispatch();
  const SchoolnoticeList = useSelector(
    (state: RootState) => state.Schoolnotice.SchoolNoticeData
  );
  const loading = useSelector(
    (state: RootState) => state.Schoolnotice.Loading
  );

  const body: ISchoolnotice = {
    asSchoolId: asSchoolId,
    asNoticeId: 0,
    asUserId: asUserId
  };

  useEffect(() => {
    if(sessionStorage.getItem("Id")!==null)
    localStorage.setItem("url",window.location.pathname)
    dispatch(getSchoolNotice(body));
  }, []);

  const Data = SchoolnoticeList.map((item, index) => { 
    const date = item.Date;
    const day = new Date(date).getDate();
    const month = new Date(date).toLocaleString('default',{month:"short"});
    const year = new Date(date).getFullYear();
    const newdate= `${day} ${month} ${year}`
    return {
      id: index,
      header: item.Name,
      text1: newdate,
      text2: '',
      linkPath: '/Common/Viewschoolnotice/' + item.Id,
      FileName: item.FileName
    };
  });

  return (
    <BoxStyle>
    <Container>
      <PageHeader heading={'School Notices'} subheading={''} />
      {sessionStorage.getItem('Id')===null &&
        <BackButton FromRoute={"/schoolList"}/>
      }
            {loading ? 
        <SuspenseLoader />
       : 
<List1 items={Data} />
}
    </Container>
    </BoxStyle>
  );
}
export default Schoolnotice;
