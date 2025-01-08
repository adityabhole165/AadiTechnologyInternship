import RefreshIcon from '@mui/icons-material/Refresh';
import SettingsIcon from '@mui/icons-material/Settings';
import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  Typography
} from '@mui/material';
import { ClearIcon } from '@mui/x-date-pickers';
import {
  differenceInHours, differenceInMinutes, differenceInSeconds
} from 'date-fns';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IGetAllAcademicYearsForSchoolEVBody } from 'src/interfaces/AddAnnualPlanner/IAnnualPlanerBaseScreen';
import CarouselPhoto from 'src/libraries/card/CarouselPhoto';
import { CDAAllAcademicYearsForSchool } from 'src/requests/AddAnnualPlanner/ReqAnnualPlanerBaseScreen';
import { CDAgetPhotoAlbum, CDAresetphotolist, CDAresetphotolist1 } from 'src/requests/Dashboard/Dashboard';
import { RootState } from 'src/store';
import Actions from './Actions';
import Header from './Header';
import PhotoPopup from './PhotoPopup';

function PhotoCardDash() {
  const dispatch = useDispatch();
  const currentYear = new Date().getFullYear().toString();
  // console.log(currentYear, 'currentYear')
  const currentMonth = (new Date().getMonth() + 1).toString();
  const asSchoolId = localStorage.getItem('localSchoolId');
  const asUserId = sessionStorage.getItem('Id');
  const RoleId = sessionStorage.getItem('RoleId');
  const [month, setMonth] = useState('100');
  const [year, setYear] = useState('currentYear');

  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const [isRefresh, setIsRefresh] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isSlideshowRunning, setIsSlideshowRunning] = useState(true);
  const toggleSlideshow = () => {
    setIsSlideshowRunning((prev) => !prev);
  };

  const SelectYearList = useSelector(
    (state: RootState) => state.AnnualPlanerBaseScreen.ISSelectYearList
  );
  const AllAcademicYearsForSchool: any = useSelector(
    (state: RootState) =>
      state.AnnualPlanerBaseScreen.ISGetAllAcademicYearsForSchool
  );


  useEffect(() => {
    const lastIndex = AllAcademicYearsForSchool.length - 1;
    if (lastIndex >= 0) {
      setYear(AllAcademicYearsForSchool[lastIndex].Value);
    }
  }, [AllAcademicYearsForSchool]);
  const GetAllAcademicYearsForSchoolBody: IGetAllAcademicYearsForSchoolEVBody =
  {
    asSchoolId: Number(asSchoolId),
    asUserId: Number(asUserId),
    asUserRoleId: Number(RoleId)
  };

  const PhotoAlbum = useSelector(
    (state: RootState) => state.Dashboard.PhotoAlbumList
  );

  const PhotoAlbum1 = useSelector(
    (state: RootState) => state.Dashboard.PhotoAlbumList1
  );



  const picsBody = {
    aiSchoolId: Number(asSchoolId),
    aiMonth: Number(month),
    aiYear: Number(year),
    aiUserId: Number(asUserId),
    iFirstLoad: isFirstLoad
  };

  useEffect(() => {
    dispatch(CDAAllAcademicYearsForSchool(GetAllAcademicYearsForSchoolBody));
  }, []);



  useEffect(() => {
    dispatch(CDAgetPhotoAlbum(picsBody));
    setIsFirstLoad(false);
  }, [month]);

  const [lastRefreshTime, setLastRefreshTime] = useState<Date | null>(new Date());
  const [countdown, setCountdown] = useState('');
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const getTimeDifference = () => {
    if (!lastRefreshTime) return 'no';

    const now = new Date();
    const seconds = differenceInSeconds(now, lastRefreshTime);
    if (seconds < 60) {
      return `${seconds} second(s)`;
    }

    const minutes = differenceInMinutes(now, lastRefreshTime);
    if (minutes < 60) {
      return `${minutes} minute(s)`;
    }

    const hours = differenceInHours(now, lastRefreshTime);
    return `${hours} hour(s)`;
  };

  const updateCountdown = () => {
    setCountdown(getTimeDifference());
  };

  useEffect(() => {

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    intervalRef.current = setInterval(updateCountdown, 1000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [lastRefreshTime]);

  const handleMouseEnter = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };

  const handleMouseLeave = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    intervalRef.current = setInterval(updateCountdown, 1000);
  };

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

  useEffect(() => {
    if (isRefresh == true) {
      dispatch(CDAgetPhotoAlbum(picsBody));
      setIsRefresh(false)
    }
  }, [isRefresh]);
  const handleClearFilter = () => {
    setMonth('100');
    setYear(currentYear);

    handleClose();
    setLastRefreshTime(new Date());
  };


  const handleApplyFilter = () => {

    const filteredPicsBody = {
      ...picsBody,
      aiMonth: Number(month),
      aiYear: Number(year),
    };
    dispatch(CDAgetPhotoAlbum(picsBody));
    dispatch(CDAresetphotolist());
    dispatch(CDAresetphotolist1());
    handleClose();
    setLastRefreshTime(new Date()); // Update the last refresh time
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;
  const [selectedAlbumID, setSelectedAlbumID] = useState(null);

  const handleImageClick = (albumID) => {
    setSelectedAlbumID(albumID);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <Box sx={{height: '382px',}}>
    <Box sx={{ backgroundColor: 'white' }}>
      <Grid item sx={{ overflow: 'auto', display: 'flex', borderRadius: '10px' , }}>
        <Grid item xs={12} mt={1}>
          <Header Title="Photo Albums" />
        </Grid>
        <Grid item sx={{ display: 'flex', justifyContent: 'flex-end', pr: 4, mt: 1 }}>
          <Actions IconType="Label" DiplayText={PhotoAlbum1.length !== 0 ? PhotoAlbum1.length : '0'} />
          <Actions Icon={RefreshIcon} ClickIcon={handleClearFilter}
            title={`You are viewing ${countdown} old data, click here to see the latest data.`}
            handleMouseEnter={handleMouseEnter} handleMouseLeave={handleMouseLeave} />
          <Actions Icon={SettingsIcon} ClickIcon={handleClickpop} />
        </Grid>
      </Grid>

      <PhotoPopup id={id} open={open} anchorEl={anchorEl}
        handleClose={handleClose} handleApplyFilter={handleApplyFilter} handleClearFilter={handleClearFilter}
        year={year} month={month} ClickMonth={ClickMonth} ClickYear={ClickYear}
      />


      {/* Photo Album Display */}
      <div>
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: -1 }}>
          {PhotoAlbum.length > 0 ? (
            <CarouselPhoto
              itemlist={PhotoAlbum1}
              IsPath={true}
              onImageClick={handleImageClick}
              largeImage={false}
              isSlideshowRunning={undefined} />
          ) : (
            <Typography variant="body1" sx={{ textAlign: 'center', mt: 15 }}>
              <b>No record found.</b>
            </Typography>
          )}
        </Box>

        <Dialog
          open={openDialog}
          onClose={handleCloseDialog}
          fullWidth
          maxWidth="md"
          PaperProps={{
            sx: {
              borderRadius: "15px",
            }
          }}
        >
          <DialogTitle sx={{ bgcolor: '#223354', position: 'relative' }}>
            <ClearIcon onClick={handleCloseDialog}
              sx={{
                color: 'white',
                borderRadius: '7px',
                position: 'absolute',
                top: '5px',
                right: '8px',
                cursor: 'pointer',
                '&:hover': {
                  color: 'red',
                }
              }} />
          </DialogTitle>
          <DialogContent sx={{
            height: '600px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            // flexDirection: 'column',
            mt: '20px',
            // overflow: 'hidden'
          }}>

            <CarouselPhoto
              itemlist={PhotoAlbum.filter((item) => item.AlbumID == selectedAlbumID)}
              IsPath={true}
              onImageClick={handleImageClick}
              largeImage={true}
              isSlideshowRunning={isSlideshowRunning}
            />

            <Typography
              variant="body1"
              onClick={toggleSlideshow}
              sx={{
                position: 'absolute',
                bottom: '16px',
                right: '16px',
                color: isSlideshowRunning ? 'primary.main' : 'primary.main',
                cursor: 'pointer',
                fontWeight: 'bold',
                textDecoration: 'underline',
              }}
            >
              {isSlideshowRunning ? 'Stop Slideshow' : 'Start Slideshow'}
            </Typography>

          </DialogContent>
        </Dialog>
      </div>
      
    </Box>
    <Grid item xs={12} textAlign={'center'}  >
        <Typography variant="h4" sx={{ textAlign: 'center', mt: 15 }}> <b>Please re-login or refresh the widget to see the updates.</b></Typography>
      </Grid>
    </Box>
  );
}

export default PhotoCardDash;
