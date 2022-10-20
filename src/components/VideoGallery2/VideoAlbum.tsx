import PageHeader from 'src/libraries/heading/PageHeader';
import MonthYearselector from '../PhotoGallery/MonthYearselector';
import List1 from 'src/libraries/mainCard/List1';
import { IYearList } from 'src/interfaces/Student/PhotoGallary';
import { getYearList } from 'src/requests/PhotoGallery/PhotoGallery';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { getVideoss } from 'src/requests/VideoGallery/VideoGallery';
import {
  GetVideoGalleryResult,
  IVideoList
} from 'src/interfaces/Common/VideoGallery';
import { RootState } from 'src/store';
import { Container } from '@mui/material';
const VideoAlbum = () => {
  const YearList: any = useSelector(
    (state: RootState) => state.PhotoGalllary.YearList
  );
  const dispatch = useDispatch();

  useEffect(() => {
    localStorage.setItem("url", window.location.pathname)
    dispatch(getYearList(YearBody));
    setMonth((new Date).getMonth() + 1)
    setYear((new Date).getFullYear())

  }, [])
  const [month, setMonth] = useState(0);
  const [year, setYear] = useState(0);

  useEffect(() => {
    if (!(month === 0 || year === 0)) {
      dispatch(getVideoss(VideoList_body));
    }
  }, [month, year]);

  const VideoList = useSelector((state: RootState) => state.Video.VideoList);

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
    <Container>
      <PageHeader heading='Video Album' subheading={''} />
      <MonthYearselector month={month} onChange={changeMonth} year={year} YearData={YearList} newChange={changeYear} />
      <List1 items={VideoList} />
    </Container>
  )
}

export default VideoAlbum