import SettingsIcon from '@mui/icons-material/Settings';
import {
  Avatar,
  Box,
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
import { getimgs } from 'src/requests/PhotoGallery/PhotoGallery';
import { RootState } from 'src/store';

// import { getPhotoAlbum } from 'src/requests/Dashboard/Dashboard';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import RefreshIcon from '@mui/icons-material/Refresh';
import ReplayIcon from '@mui/icons-material/Replay';
import { green, grey, orange, red } from '@mui/material/colors';
import { monthArray } from 'src/components/Common/Util';
import { IGetYearsForAnnualPalannerDropDownBody } from 'src/interfaces/AddAnnualPlanner/IAnnualPlanerBaseScreen';
import Dropdown from 'src/libraries/dropdown/Dropdown';
import { GetYearList } from 'src/requests/AddAnnualPlanner/ReqAnnualPlanerBaseScreen';

function PhotoCardDash() {
  const dispatch = useDispatch();
  const currentYear = new Date().getFullYear().toString();
  const currentMonth = (new Date().getMonth() + 1).toString();
  const asSchoolId = localStorage.getItem('localSchoolId');
  const asUserId = sessionStorage.getItem('Id');
  const RoleId = sessionStorage.getItem('RoleId');
  const [month, setMonth] = useState(currentMonth);
  const [year, setYear] = useState(currentYear);

  const SelectYearList: any = useSelector(
    (state: RootState) => state.AnnualPlanerBaseScreen.ISSelectYearList
  );
  const PhotoAlbum: any = useSelector(
    (state: RootState) => state.Dashboard.PhotoAlbumList
  );
  const img: any = useSelector((state: RootState) => state.Gallery.imgList);
  const GetYearsForAnnualPalannerBody: IGetYearsForAnnualPalannerDropDownBody =
  {
    asSchoolId: Number(asSchoolId)
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
    dispatch(GetYearList(GetYearsForAnnualPalannerBody));
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
    <Box sx={{ height: '300px', backgroundColor: 'white', p: 1 }}>
      <Grid item sx={{ overflow: 'auto', display: 'flex', backgroundColor: '#38548A' }}>
        <Grid item xs={12}>
          <Typography variant="h3" p={0.8} sx={{ color: 'white' }}>
            Photo Albums
          </Typography>
        </Grid>

        <Grid sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <IconButton>
            <RefreshIcon sx={{
              color: 'white',
              borderRadius: '7px',
              mt: '4px',
              cursor: 'pointer',
              '&:hover': { backgroundColor: grey[600] }
            }} />
          </IconButton>
          <IconButton
            onClick={handleClickpop}>
            <SettingsIcon
              sx={{
                color: 'white',
                borderRadius: '7px',
                mt: '4px',
                cursor: 'pointer',
                '&:hover': { backgroundColor: grey[600] }
              }} />
          </IconButton>
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
          <Dropdown Array={monthArray} handleChange={ClickMonth} label={'select month'} defaultValue={month} />
          <Dropdown
            Array={SelectYearList}
            handleChange={ClickYear}
            defaultValue={year}
            label={'Select Year'}
          />
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
    </Box>
  );
}

export default PhotoCardDash;

