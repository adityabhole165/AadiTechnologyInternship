import SettingsIcon from '@mui/icons-material/Settings';
import {
  Avatar,
  Box,
  Card,
  Grid,
  IconButton,
  Popover,
  Stack,
  Tooltip,
  Typography
} from '@mui/material';
import { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { IPics, Iimg } from 'src/interfaces/Common/PhotoGallery';
import { IYearList } from 'src/interfaces/Student/PhotoGallary';
import { getimgs } from 'src/requests/PhotoGallery/PhotoGallery';
import { RootState } from 'src/store';

// import { getPhotoAlbum } from 'src/requests/Dashboard/Dashboard';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import RefreshIcon from '@mui/icons-material/Refresh';
import ReplayIcon from '@mui/icons-material/Replay';
import { green, orange, red } from '@mui/material/colors';

function PhotoCardDash() {
  const dispatch = useDispatch();
  const asSchoolId = localStorage.getItem('localSchoolId');
  const asUserId = sessionStorage.getItem('Id');
  const RoleId = sessionStorage.getItem('RoleId');
  const [month, setMonth] = useState(0);
  const [year, setYear] = useState(0);

  const Yearitem: any = useSelector(
    (state: RootState) => state.PhotoGalllary.YearList
  );
  const PhotoAlbum: any = useSelector(
    (state: RootState) => state.Dashboard.PhotoAlbumList
  );
  const img: any = useSelector((state: RootState) => state.Gallery.imgList);

  const YearlistBody: IYearList = {
    asSchoolId: asSchoolId,
    asUserId: asUserId,
    asUserRoleId: RoleId
  };
  const imgBody: Iimg = {
    asSchoolId: asSchoolId,
    asGalleryName: 'Test'
  };
  const picsBody: IPics = {
    asSchoolId: asSchoolId,
    asMonth: month,
    asYear: year
  };
  useEffect(() => {
    dispatch(getimgs(imgBody));
  }, []);

  const ClickMonth = (value) => {
    setMonth(value);
  };
  const ClickYear = (value) => {
    setYear(value);
  };
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClickpop = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;
  const [index, setIndex] = useState(0);

  const arrowClick = (value) => {
    const maxlength = PhotoAlbum.length - 1;
    const min = 0;
    if (value === -1 && index === 0) {
      setIndex(maxlength);
    } else if (value === 1 && index === maxlength) {
      setIndex(min);
    } else {
      setIndex(index + value);
    }
  };
  return (
    <div>
      <Card sx={{ height: '255px', overflow: 'auto' }}>
        <Grid container>
          <Grid item xs={6}>
            <Typography variant="h3" p={1} sx={{ color: '#304ffe' }}>
              Photo Albums
            </Typography>
          </Grid>

          <Grid item xs={6}>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <RefreshIcon sx={{ mr: '-8px', mt: '8px' }} />

              <IconButton sx={{ padding: '10px' }}>
                {' '}
                <SettingsIcon onClick={handleClickpop} />
              </IconButton>
            </Box>
          </Grid>
        </Grid>

        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left'
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }} p={1}>
            {/* <Dropdown Array={monthArray} handleChange={ClickMonth} label={'select month'} defaultValue={month}/>
        <Dropdown Array={Yearitem} handleChange={ClickYear} label={'select year'} defaultValue={year}/> */}
          </Box>
          <Stack direction="row" spacing={2} sx={{ my: 1, px: 5 }}>
            <Tooltip title="Apply Filter">
              <Avatar sx={{ bgcolor: green[500] }} variant="square">
                <CheckIcon onClick={handleClose} />
              </Avatar>
            </Tooltip>
            <Avatar sx={{ bgcolor: orange[500] }} variant="square">
              <ReplayIcon />
            </Avatar>
            <Avatar sx={{ bgcolor: red[500] }} variant="square">
              <CloseIcon onClick={handleClose} />
            </Avatar>
          </Stack>
        </Popover>
      </Card>
    </div>
  );
}

export default PhotoCardDash;
