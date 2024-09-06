import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import BackButton from 'src/libraries/button/BackButton';
import Card5 from 'src/libraries/card/card5';
import PageHeader from 'src/libraries/heading/PageHeader';
import { BoxStyle } from 'src/libraries/styled/HeadingStyled';
import { getviewSchoolNotice } from 'src/requests/Schoolnotice/Schoolnotice';
import { RootState } from 'src/store';
import { GetSchoolNoticeListResult } from '../../interfaces/Common/SchoolNotice';
import IViewschoolnotice from '../../interfaces/Student/ViewSchoolNotice';
import { Box, Typography } from '@mui/material';
import SchoolNoticeHeader from '../SchoolNoticeHeader';

function Viewschoolnotice() {
  const asSchoolId = localStorage.getItem('localSchoolId');
  const asUserId = localStorage.getItem('UserId');

  const dispatch = useDispatch();

  const ViewSchoolnotice = useSelector(
    (state: RootState) => state.Schoolnotice.ViewSchoolNotice
  );
  const { ID } = useParams();
  const body: IViewschoolnotice = {
    asSchoolId: asSchoolId,
    asNoticeId: `${ID}`,
    asUserId: asUserId
  };

  useEffect(() => {
    dispatch(getviewSchoolNotice(body));
  }, []);

  return (
    <>
    <Box px={2} sx={{backgroundColor:'F5F5F5'}}>
      <BoxStyle>
        {/* <PageHeader heading={'Notice Details'} subheading={''} /> */}
        <SchoolNoticeHeader
        navLinks={[
          {
            title: 'School Notice',
            path: '/schoolNotice'
          },
          {
            title: 'Notice Details',
            path: ''
          }
        ]}
      /> 
        {/* <Typography variant="h3" pl={8} pt={2.4} mb={2} >
        Notice Details
         </Typography> */}
        {sessionStorage.getItem('Id') === null ? (
          <BackButton FromRoute={'/schoolnotice'} />
        ) : (
          <BackButton FromRoute={'/Common/schoolnotice'} />
        )}
        <div>
          {ViewSchoolnotice.map((items: GetSchoolNoticeListResult, i) => (
            <Card5
              FileName={items.FileName}
              Content={items.Content}
              Name={items.Name}
              key={i}
            />
          ))}
        </div>
      </BoxStyle>
      </Box>
    </>
  );
}
export default Viewschoolnotice;
