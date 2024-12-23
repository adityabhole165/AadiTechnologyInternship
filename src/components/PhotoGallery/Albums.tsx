import { Box } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { IPhotoAlbumBody } from 'src/interfaces/Student/dashboard';
import { IYearList } from 'src/interfaces/Student/PhotoGallary';
import SuspenseLoader from 'src/layouts/components/SuspenseLoader';
import List1 from 'src/libraries/mainCard/List1';
import { CDAgetPhotoAlbum } from 'src/requests/Dashboard/Dashboard';
import { getYearList } from 'src/requests/PhotoGallery/PhotoGallery';
import { RootState } from 'src/store';
import { decodeURL } from '../Common/Util';
import CommonPageHeader from '../CommonPageHeader';
import MonthYearselector from './MonthYearselector';
function Photos() {
  const dispatch = useDispatch();
  let {
    Month,
    Year
  } = useParams();

  // Decode in-place
  Month = decodeURL(Month);
  Year = decodeURL(Year);


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
      asSchoolId: Number(asSchoolId),
      asUserId: Number(asUserId),
      asUserRoleId: Number(RoleId)
    };
    dispatch(getYearList(YearBody));
  }, []);

  const handleChange = (value) => {
    setMonth(value);
  };

  const handleClick = (value) => {
    setYear(value);
  };
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  useEffect(() => {
    if (month > 0) {
      const PhotoAlbumBody: IPhotoAlbumBody = {
        aiSchoolId: Number(asSchoolId),
        aiMonth: month,
        aiYear: year,
        aiUserId: Number(asUserId),
        iFirstLoad: isFirstLoad
      };
      dispatch(CDAgetPhotoAlbum(PhotoAlbumBody));
    }
  }, [year, month]);

  return (
    <Box sx={{ px: 2 }}>
      <CommonPageHeader navLinks={[
        {
          title: 'Photo Gallery',
          path: ''
        }
      ]} />
      <Box sx={{ background: 'white', p: 2 }}>
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
      </Box>
    </Box>
  );
}
export default Photos;
