import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPhotoAlbum } from 'src/requests/Student/Dashboard';
import { getYearList } from 'src/requests/Common/PhotoGallery';
import { IPhotoAlbum } from 'src/interfaces/Student/dashboard';
import { IYearList } from 'src/interfaces/Student/PhotoGallary';

import { RootState } from 'src/store';
import Card17 from 'src/libraries/card/Card17';

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

  const asSchoolId = sessionStorage.getItem('SchoolId');
  const UserId = sessionStorage.getItem('Id');
  const RoleId = sessionStorage.getItem('RoleId');

  const PhotoAlbumBody: IPhotoAlbum = {
    aiSchoolId: asSchoolId,
    aiMonth: '100',
    aiYear: '2022',
    abSetPreviousMonth: 'true',
    aiUserId: UserId
  };
  const YearBody: IYearList = {
    asSchoolId: asSchoolId,
    asUserId: UserId,
    asUserRoleId: RoleId
  };

  useEffect(() => {
    dispatch(getPhotoAlbum(PhotoAlbumBody));
    dispatch(getYearList(YearBody));
  }, []);
  return (
    <>
      <Card17 data={PhotoAlbum} YearData={YearData} />
    </>
  );
}

export default PhotoAlbum;
