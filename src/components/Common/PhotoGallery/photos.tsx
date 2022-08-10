import React, { useEffect } from 'react';
import PageHeader from 'src/libraries/heading/PageHeader';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'src/store';
import { Link as RouterLink } from 'react-router-dom';
import ErrorMessages from 'src/libraries/ErrorMessages/ErrorMessages';
import { getYearList } from 'src/requests/Common/PhotoGallery';
import { IYearList } from 'src/interfaces/Student/PhotoGallary';
import { IPhotoAlbum } from 'src/interfaces/Common/PhotoGallery';
import Card22 from 'src/libraries/card/card22';
import { useParams } from 'react-router-dom';
import { getPhotoAlbum } from 'src/requests/Student/Dashboard';
import {
  Box,
  Container,
  FormControl,
  Grid,
  MenuItem,
  Select,
} from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    '&:hover': {
      cursor: 'pointer',
      backgroundColor: '#42a5f5'
    }
  }
}));
function Photos() {
  const { imgId,ImagePath } = useParams();
  const dispatch = useDispatch();
  const PhotoAlbum: any = useSelector(
    (state: RootState) => state.Dashboard.PhotoAlbumList
  );
  // console.log("vvvvv",PhotoAlbum[0].ImageList);

  const YearList: any = useSelector(
    (state: RootState) => state.PhotoGalllary.YearList
  );
  const asSchoolId = localStorage.getItem('localSchoolId');
  const asUserId = sessionStorage.getItem('Id');
  const RoleId = sessionStorage.getItem('RoleId');

  const Month = new Date().getMonth() + 1;
  const Year = new Date().getFullYear();

  const [month, setMonth] = React.useState(Month);
  const handleChange = (event) => {
    setMonth(event.target.value);
  };
  const [year, setYear] = React.useState(Year);
  const handleClick = (event) => {
    setYear(event.target.value);
    getPhotoAlbum(PhotoAlbumBody);
  };
  const YearData = YearList.map((key, index) => {
    return YearList[index].split('-')[0];
  });

  // const pics_body: IPics = {
  //   asSchoolId: asSchoolId,
  //   asMonth: month,
  //   asYear: year
  // };
  const PhotoAlbumBody: IPhotoAlbum = {
    aiSchoolId: asSchoolId,
    aiMonth: month,
    aiYear: year,
    abSetPreviousMonth: 'true',
    aiUserId: "695"
  };

  const YearBody: IYearList = {
    asSchoolId: asSchoolId,
    asUserId: asUserId,
    asUserRoleId: RoleId
  };
  useEffect(() => {
    localStorage.setItem("url",window.location.pathname)
  },[])

  useEffect(() => {
    dispatch(getPhotoAlbum(PhotoAlbumBody));
    dispatch(getYearList(YearBody));
  }, [year, month]);
  
  return (
    <div>
    <PageHeader heading={'Photos'} subheading={''} />
    <Card22 pic={PhotoAlbum} imgId={imgId}  />
  </div>
  );
}
export default Photos;
