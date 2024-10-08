import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IYearList } from 'src/interfaces/Student/PhotoGallary';
import { IPhotoAlbum, IPhotoAlbumBody } from 'src/interfaces/Student/dashboard';
import { CDAgetPhotoAlbum } from 'src/requests/Dashboard/Dashboard';
import { getYearList } from 'src/requests/PhotoGallery/PhotoGallery';

import Card17 from 'src/libraries/card/Card17';
import { RootState } from 'src/store';

function PhotoAlbum() {
  const dispatch = useDispatch();
  const PhotoAlbum: any = useSelector(
    (state: RootState) => state.Dashboard.PhotoAlbumList
  );
  const YearList: any = useSelector(
    (state: RootState) => state.PhotoGalllary.YearList
  );

  const YearData = YearList.map((key, index) => {
    return YearList[index].split('-')[0];
  });
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const asSchoolId = sessionStorage.getItem('SchoolId');
  const UserId = sessionStorage.getItem('Id');
  const RoleId = sessionStorage.getItem('RoleId');

  const PhotoAlbumBody: IPhotoAlbumBody = {
    aiSchoolId:  Number (asSchoolId),
    aiMonth: 100,
    aiYear: 2022,
    aiUserId: Number(UserId),
    iFirstLoad:isFirstLoad
  };
  const YearBody: IYearList = {
    asSchoolId: Number (asSchoolId),
    asUserId: Number (UserId),
    asUserRoleId: Number (RoleId)
  };

  useEffect(() => {
    dispatch(CDAgetPhotoAlbum(PhotoAlbumBody));
    dispatch(getYearList(YearBody));
  }, []);
  return (
    <>
      <Card17 data={PhotoAlbum} YearData={YearData} />
    </>
  );
}

export default PhotoAlbum;
