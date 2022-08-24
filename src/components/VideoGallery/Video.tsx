import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getVideoss } from 'src/requests/Common/VideoGallery';
import { RootState } from 'src/store';
import {
  GetVideoGalleryResult,
  IVideoList
} from 'src/interfaces/Common/VideoGallery';
import { getYearList } from 'src/requests/PhotoGallery/PhotoGallery';
import { IYearList } from 'src/interfaces/Student/PhotoGallary';
import List10 from 'src/libraries/list/List10';
import PageHeader from 'src/libraries/heading/PageHeader';
import { Container, FormControl, Grid, MenuItem, Select } from '@mui/material';
import { makeStyles } from '@mui/styles';
import ErrorMessages from 'src/libraries/ErrorMessages/ErrorMessages';
import { Box, useTheme } from '@mui/material';

const useStyles = makeStyles((theme) => ({
  root: {
    '&:hover': {
      cursor: 'pointer',
      backgroundColor: '#42a5f5'
    }
  }
}));
function VideoGallary() {
  const dispatch = useDispatch();
  const VideoList = useSelector((state: RootState) => state.Video.VideoList);
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
    getVideoss(VideoList_body);
  };

  const YearData = YearList.map((key, index) => {
    return YearList[index].split('-')[0];
  });

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

  useEffect(() => {
    localStorage.setItem("url",window.location.pathname)
  },[])

  useEffect(() => {
    dispatch(getVideoss(VideoList_body));
    dispatch(getYearList(YearBody));
  }, [year, month]);
  return (
    <>
      <PageHeader heading={' Video Gallery'} subheading={''} />
      <Container>
        <Grid container spacing={2} sx={{ mb: 2 }}>
          <Grid item xs={6}>
            <Box>
              <FormControl fullWidth variant="standard">
                <Select value={month} onChange={handleChange} size="small">
                  <MenuItem value={1}>January</MenuItem>
                  <MenuItem value={2}>February</MenuItem>
                  <MenuItem value={3}>March</MenuItem>
                  <MenuItem value={4}>April</MenuItem>
                  <MenuItem value={5}>May</MenuItem>
                  <MenuItem value={6}>June</MenuItem>
                  <MenuItem value={7}>July</MenuItem>
                  <MenuItem value={8}>August</MenuItem>
                  <MenuItem value={9}>September</MenuItem>
                  <MenuItem value={10}>October</MenuItem>
                  <MenuItem value={11}>November</MenuItem>
                  <MenuItem value={12}>December</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box>
              <FormControl fullWidth variant="standard">
                <Select value={year} onChange={handleClick} size="small">
                  {YearData.map((item, key) => (
                    <MenuItem value={item} key={key}>
                      {item}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          </Grid>
        </Grid>
      </Container>

      {VideoList.length === 0 ? (
        <ErrorMessages Error={'No records found'} />
      ) : (
        <>
          {VideoList.map((items: GetVideoGalleryResult, i) => (
            <List10
              Title={items.VideoGalleryName}
              VideoID={items.VideoId}
              key={i}
              FromRoute={"/VideoGallery"}
            />
          ))}
        </>
      )}
    </>
  );
}

export default VideoGallary;
