import { Container } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { IPhotoAlbum } from 'src/interfaces/Common/PhotoGallery';
import { IYearList } from 'src/interfaces/Student/PhotoGallary';
import SuspenseLoader from 'src/layouts/components/SuspenseLoader';
import PageHeader from 'src/libraries/heading/PageHeader';
import List1 from 'src/libraries/mainCard/List1';
import { getPhotoAlbum } from 'src/requests/Dashboard/Dashboard';
import { getYearList } from 'src/requests/PhotoGallery/PhotoGallery';
import { RootState } from 'src/store';
import MonthYearselector from './MonthYearselector';
function Photos() {
  const dispatch = useDispatch();
  const { Month, Year } = useParams();

  const PhotoAlbum: any = useSelector(
    (state: RootState) => state.Dashboard.PhotoAlbumList
  );

  const loading = useSelector((state: RootState) => state.Dashboard.Loading);

  const YearList: any = useSelector(
    (state: RootState) => state.PhotoGalllary.YearList
  );

  const asSchoolId = localStorage.getItem('localSchoolId');
  const asUserId = sessionStorage.getItem('Id');
  const RoleId = sessionStorage.getItem('RoleId');

  const [month, setMonth] = useState(0);
  const [year, setYear] = useState(0);

  useEffect(() => {
    localStorage.setItem('url', window.location.pathname);
    if (Month !== undefined) {
      setMonth(Number(Month));
      setYear(Number(Year));
    } else {
      setMonth(new Date().getMonth() + 1);
      setYear(new Date().getFullYear());
    }
    const YearBody: IYearList = {
      asSchoolId: asSchoolId,
      asUserId: asUserId,
      asUserRoleId: RoleId
    };
    dispatch(getYearList(YearBody));
  }, []);

  const handleChange = (value) => {
    setMonth(value);
  };

  const handleClick = (value) => {
    setYear(value);
  };

  useEffect(() => {
    if (month > 0) {
      const PhotoAlbumBody: IPhotoAlbum = {
        aiSchoolId: asSchoolId,
        aiMonth: month,
        aiYear: year,
        abSetPreviousMonth: 'true',
        aiUserId: asUserId
      };
      dispatch(getPhotoAlbum(PhotoAlbumBody));
    }
  }, [year, month]);

  return (
    <Container>
      <PageHeader heading={'Photo Gallery'} subheading={''} />

      <MonthYearselector
        month={month}
        onChange={handleChange}
        year={year}
        YearData={YearList}
        newChange={handleClick}
      />
      {loading ? (
        <SuspenseLoader />
      ) : (
        <List1 items={PhotoAlbum} SelectedMonth={month} SelectedYear={year} />
      )}
    </Container>
  );
}
export default Photos;
