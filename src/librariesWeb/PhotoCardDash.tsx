import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import RefreshIcon from '@mui/icons-material/Refresh';
import ReplayIcon from '@mui/icons-material/Replay';
import SettingsIcon from '@mui/icons-material/Settings';
import {
  Avatar,
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Popover,
  Stack,
  Tooltip,
  Typography
} from '@mui/material';
import { green, grey, orange, red } from '@mui/material/colors';
import { ClearIcon } from '@mui/x-date-pickers';
import {
  differenceInHours, differenceInMinutes, differenceInSeconds
} from 'date-fns';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IGetAllAcademicYearsForSchoolEVBody } from 'src/interfaces/AddAnnualPlanner/IAnnualPlanerBaseScreen';
import CarouselPhoto from 'src/libraries/card/CarouselPhoto';
import Dropdown from 'src/libraries/dropdown/Dropdown';
import { CDAAllAcademicYearsForSchool } from 'src/requests/AddAnnualPlanner/ReqAnnualPlanerBaseScreen';
import { getPhotoAlbum } from 'src/requests/Dashboard/Dashboard';
import { RootState } from 'src/store';

function PhotoCardDash() {
  const dispatch = useDispatch();
  const currentYear = new Date().getFullYear().toString();
  console.log(currentYear, 'currentYear')
  const currentMonth = (new Date().getMonth() + 1).toString();
  const asSchoolId = localStorage.getItem('localSchoolId');
  const asUserId = sessionStorage.getItem('Id');
  const RoleId = sessionStorage.getItem('RoleId');
  const [month, setMonth] = useState('100');
  const [year, setYear] = useState('currentYear');
  const [lastRefreshTime, setLastRefreshTime] = useState<Date | null>(null);
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const [refreshFlag, setRefreshFlag] = useState(0);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const MonthArray = [
    { Id: 1, Name: 'All', Value: '0' },
    { Id: 2, Name: 'January', Value: '1' },
    { Id: 3, Name: 'February', Value: '2' },
    { Id: 4, Name: 'March', Value: '3' },
    { Id: 5, Name: 'April', Value: '4' },
    { Id: 6, Name: 'May', Value: '5' },
    { Id: 7, Name: 'June', Value: '6' },
    { Id: 8, Name: 'July', Value: '7' },
    { Id: 9, Name: 'August', Value: '8' },
    { Id: 10, Name: 'September', Value: '9' },
    { Id: 11, Name: 'October', Value: '10' },
    { Id: 12, Name: 'November', Value: '11' },
    { Id: 13, Name: 'December', Value: '12' },
    { Id: 14, Name: 'Recent 5', Value: '100' },
  ]

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
    dispatch(getPhotoAlbum(picsBody));
    setIsFirstLoad(false);
  }, []);

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
    if (refreshFlag == 1) {
      dispatch(getPhotoAlbum(picsBody));
      setRefreshFlag(0)
    }
  }, [refreshFlag]);
  const handleClearFilter = () => {
    setMonth('100');
    setYear(currentYear);
    setRefreshFlag(1)
    handleClose();
  };


  const handleApplyFilter = () => {
    setMonth(month);
    setYear(year);
    const filteredPicsBody = {
      ...picsBody,
      aiMonth: Number(month),
      aiYear: Number(year),
    };
    dispatch(getPhotoAlbum(picsBody));
    handleClose();
    setLastRefreshTime(new Date()); // Update the last refresh time
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;
  const [selectedAlbumID, setSelectedAlbumID] = useState(null);
   console.log(selectedAlbumID,"selectedAlbumID");

  const handleImageClick = (albumID) => {
    setSelectedAlbumID(albumID); 
    setOpenDialog(true); 
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <Box sx={{ height: '487px', backgroundColor: 'white', p: 1 }}>
      <Grid item sx={{ overflow: 'auto', display: 'flex', backgroundColor: '#38548A', borderRadius: '10px' }}>
        <Grid item xs={12}>
          <Typography variant="h3" p={0.8} sx={{ color: 'white' }}>
            Photo Albums
          </Typography>
        </Grid>
        <Grid item sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <IconButton sx={{ mt: '4px', pr: 1 }} >
            <Box sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '30px',      // Circle diameter
              height: '30px',     // Circle diameter
              borderRadius: '50%', // Makes the Box a circle
              backgroundColor: 'white', // Secondary background color
              color: 'black',      // Text color
              fontSize: '0.8rem',
            }}> <b>{PhotoAlbum.length !== 0 ? PhotoAlbum.length : '0'}</b></Box>

          </IconButton>
          <Tooltip
            title={

              `You are viewing ${getTimeDifference()} old data, click here to see the latest data.`

            }
          >
            <IconButton onClick={handleClearFilter}>
              <RefreshIcon sx={{
                color: 'white',
                borderRadius: '7px',
                mt: '4px',
                cursor: 'pointer',
                '&:hover': { backgroundColor: grey[600] }
              }} />
            </IconButton>
          </Tooltip>
          <Tooltip
            title={
              'Click here to display all galleries of selected year, select All option from month and apply filter.'
            }
          >
            <IconButton onClick={handleClickpop}>
              <SettingsIcon sx={{
                color: 'white',
                borderRadius: '7px',
                mt: '4px',
                cursor: 'pointer',
                '&:hover': { backgroundColor: grey[600] }
              }} />
            </IconButton>
          </Tooltip>
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
        onClose={handleClose}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }} p={1}>
          <Dropdown Array={MonthArray} handleChange={ClickMonth} label={'Select Month'} defaultValue={month} />
          <Dropdown
            Array={AllAcademicYearsForSchool}
            handleChange={ClickYear}
            defaultValue={year}
            label={'Select Year'}
          />
        </Box>
        <Stack direction="row" spacing={2} sx={{ my: 1, px: 5 }}>
          <Tooltip title="Apply Filter">
            <Avatar sx={{ bgcolor: green[500] }} variant="square">
              <CheckIcon onClick={handleApplyFilter} />
            </Avatar>
          </Tooltip>
          <Tooltip title="Clear Filter">
            <Avatar sx={{ bgcolor: orange[500] }} variant="square">
              <ReplayIcon onClick={handleClearFilter} />
            </Avatar>
          </Tooltip>
          <Tooltip title="Cancel">
            <Avatar sx={{ bgcolor: red[500] }} variant="square">
              <CloseIcon onClick={handleClose} />
            </Avatar>
          </Tooltip>
        </Stack>
      </Popover>

      {/* Photo Album Display */}
      <div>
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
        {PhotoAlbum.length > 0 ? (
          <CarouselPhoto itemlist={PhotoAlbum1} IsPath={true} onImageClick={handleImageClick} />
        ) : (
          <Typography variant="h4" color="textSecondary" sx={{ mt: 5 }}>
            No Photos Available
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
        <DialogContent>
        
              <CarouselPhoto
            
                itemlist={PhotoAlbum.filter((item) => item.AlbumID == selectedAlbumID)}
                IsPath={true}
                onImageClick={handleImageClick}
              />
            
        </DialogContent>
      </Dialog>
    </div>
    </Box>
  );
}

export default PhotoCardDash;
