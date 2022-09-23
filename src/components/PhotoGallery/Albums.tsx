import { useEffect, useState } from 'react';
import PageHeader from 'src/libraries/heading/PageHeader';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'src/store';
import { getYearList } from 'src/requests/PhotoGallery/PhotoGallery';
import { IYearList } from 'src/interfaces/Student/PhotoGallary';
import { IPhotoAlbum } from 'src/interfaces/Common/PhotoGallery';
import { getPhotoAlbum } from 'src/requests/Dashboard/Dashboard';
import MonthYearselector from './MonthYearselector';
import List1 from 'src/libraries/mainCard/List1';
import { Container } from '@mui/material';
function Photos() {
  const dispatch = useDispatch();
  const PhotoAlbum: any = useSelector(
    (state: RootState) => state.Dashboard.PhotoAlbumList
  );

  const YearList: any = useSelector(
    (state: RootState) => state.PhotoGalllary.YearList
  );

  const asSchoolId = localStorage.getItem('localSchoolId');
  const asUserId = sessionStorage.getItem('Id');
  const RoleId = sessionStorage.getItem('RoleId');

  const [month, setMonth] = useState(0);
  const [year, setYear] = useState(0);

  useEffect(() => {
    localStorage.setItem("url", window.location.pathname)
    setMonth(new Date().getMonth() + 1)
    setYear(new Date().getFullYear())
    const YearBody: IYearList = {
      asSchoolId: asSchoolId,
      asUserId: asUserId,
      asUserRoleId: RoleId
    };
    dispatch(getYearList(YearBody));
  }, [])
  const handleChange = (event) => {
    setMonth(event.target.value);
  };

  const handleClick = (event) => {
    setYear(event.target.value);
  };

  useEffect(() => {
    const PhotoAlbumBody: IPhotoAlbum = {
      aiSchoolId: asSchoolId,
      aiMonth: month,
      aiYear: year,
      abSetPreviousMonth: 'true',
      aiUserId: asUserId
    };
      dispatch(getPhotoAlbum(PhotoAlbumBody));
  }, [year, month]);


  return (
    <Container>
      <PageHeader heading={'Photo Gallery'} subheading={''} />

      <MonthYearselector month={month} onChange={handleChange} year={year} YearData={YearList} newChange={handleClick} />

      <List1 items={PhotoAlbum} />

    </Container>
  );
}
export default Photos;
