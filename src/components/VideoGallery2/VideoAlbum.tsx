import { Box } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IVideoList } from 'src/interfaces/Common/VideoGallery';
import { IYearList } from 'src/interfaces/Student/PhotoGallary';
import SuspenseLoader from 'src/layouts/components/SuspenseLoader';
import List1 from 'src/libraries/mainCard/List1';
import { getYearList } from 'src/requests/PhotoGallery/PhotoGallery';
import { getVideoss } from 'src/requests/VideoGallery/VideoGallery';
import { RootState } from 'src/store';
import CommonPageHeader from '../CommonPageHeader';
import MonthYearselector from '../PhotoGallery/MonthYearselector';
const VideoAlbum = () => {
  const YearList: any = useSelector(
    (state: RootState) => state.PhotoGalllary.YearList
  );
  const dispatch = useDispatch();

  useEffect(() => {
    localStorage.setItem('url', window.location.pathname);
    dispatch(getYearList(YearBody));
    setMonth(new Date().getMonth() + 1);
    setYear(new Date().getFullYear());
  }, []);
  const [month, setMonth] = useState(0);
  const [year, setYear] = useState(0);

  useEffect(() => {
    if (!(month === 0 || year === 0)) {
      dispatch(getVideoss(VideoList_body));
    }
  }, [month, year]);

  const VideoList = useSelector((state: RootState) => state.Video.VideoList);
  const loading = useSelector((state: RootState) => state.Video.Loading);

  const asSchoolId = localStorage.getItem('localSchoolId');
  const asUserId = sessionStorage.getItem('Id');
  const RoleId = sessionStorage.getItem('RoleId');

  const changeMonth = (value) => {
    setMonth(value);
  };
  const changeYear = (value) => {
    setYear(value);
  };

  const VideoList_body: IVideoList = {
    asSchoolId: asSchoolId,
    asMonth: month,
    asYear: year,
    asUserId: asUserId
  };
  const YearBody: IYearList = {
    asSchoolId: asSchoolId,
    asUserId: asUserId,
    asUserRoleId: RoleId
  };

  return (
    <Box sx={{ px: 2 }}>
      <CommonPageHeader navLinks={
        [
          {
            title: "Video Gallery",
            path: ''
          }
        ]
      } />
      <Box sx={{ background: 'white', p: 2 }}>
        <MonthYearselector
          month={month}
          onChange={changeMonth}
          year={year}
          YearData={YearList}
          newChange={changeYear}
        />
        {loading ? <SuspenseLoader /> : <List1 items={VideoList} />}
      </Box>
    </Box>
  );
};

export default VideoAlbum;
