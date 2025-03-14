import { Box } from '@mui/material';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import BackButton from 'src/libraries/button/BackButton';
import Card5 from 'src/libraries/card/card5';
import { getviewSchoolNotice } from 'src/requests/Schoolnotice/Schoolnotice';
import { RootState } from 'src/store';
import { GetSchoolNoticeListResult } from '../../interfaces/Common/SchoolNotice';
import IViewschoolnotice from '../../interfaces/Student/ViewSchoolNotice';
import { decodeURL } from '../Common/Util';
import SchoolNoticeHeader from '../SchoolNoticeHeader';

function Viewschoolnotice() {
  const asSchoolId = localStorage.getItem('localSchoolId');
  const asUserId = localStorage.getItem('UserId');

  const dispatch = useDispatch();

  const ViewSchoolnotice = useSelector(
    (state: RootState) => state.Schoolnotice.ViewSchoolNotice
  );
  let {
    ID
  } = useParams();

  // Decode in-place
  ID = decodeURL(ID);

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
      <Box px={2} py={2} sx={{ backgroundColor: 'F5F5F5' }}>
        <Box>
          {/* <PageHeader heading={'Notice Details'} subheading={''} /> */}
          <SchoolNoticeHeader
            navLinks={[
              {
                title: 'School Notice',
                path: sessionStorage.getItem('Id') === null ? '/schoolNotice' : '/RITeSchool/Common/SchoolnoticeOwn'
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
        </Box>
      </Box>
    </>
  );
}
export default Viewschoolnotice;
