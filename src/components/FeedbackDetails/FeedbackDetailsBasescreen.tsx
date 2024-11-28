import React, { useState } from 'react';
import {
  Box,
  FormControl,
  FormControlLabel,
  IconButton,
  Radio,
  RadioGroup,
  TextField,
  Tooltip,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Grid,
} from '@mui/material';
import { SearchTwoTone, Add as AddIcon, Save as SaveIcon } from '@mui/icons-material';
import { blue, green } from '@mui/material/colors';
import CommonPageHeader from '../CommonPageHeader';
import FeedbackFromUsersTable from './FeedbackFromUsersTable';
import AddNewFeedback from './AddNewFeedback';
import { useSelector } from 'react-redux';
import { RootState } from 'src/store';
import { ClearIcon } from '@mui/x-date-pickers';


const FeedbackDetailsBasescreen = () => {
  const [rowsPerPage, setRowsPerPage] = useState(20);
  const [page, setPage] = useState(1);
  const [selectedFeedback, setSelectedFeedback] = useState<string>('users');
  const [isPopupOpen, setPopupOpen] = useState(false);
  const dummyData = [
    {
      id: 1,
      date: '28 Sep 2024',
      userName: 'Omkar',
      email: 'test@gmail.com',
      comments:
        "**This is feedback for Ms. Manisha Sathe Ma'am** Dear Manisha ma'am, Prisha in last few weeks have upskilled considerably on public speaking. Really appreciate your efforts in giving her confidence and teaching her ways of presenting herself in front of audience. Really appreciate. Thank you, Prasad Ombhase 7799650001",
    },
    { id: 2, date: '26 Aug 2024', userName: 'Omkar Nanaware', email: 'test2@gmail.com', comments: 'Sample comment 2' },
    { id: 3, date: '24 Jul 2024', userName: 'Prisha Prasad Ombhase', email: 'test3@gmail.com', comments: 'Sample comment 3' },
  ];

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedFeedback(event.target.value);
  };

  const clickSearch = () => {
    alert('Search clicked!');
  };

  const handleAddNewFeedbackClick = () => {
    setPopupOpen(true);
  };

  const handleClosePopup = () => {
    setPopupOpen(false);
  };
  

  return (
    <Box px={2}>
      <CommonPageHeader
        navLinks={[{ title: 'Feedback Details', path: '/extended-sidebar/Teacher/FeedbackDetailsBasescreen' }]}
        rightActions={
          <>
            <TextField
              sx={{ width: '15vw' }}
              fullWidth
              label="User Name"
              variant="outlined"
              size="small"
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === 'Tab') {
                  clickSearch();
                }
              }}
            />
            <Tooltip title="Search">
              <IconButton
                onClick={clickSearch}
                sx={{
                  background: (theme) => theme.palette.primary.main,
                  color: 'white',
                  '&:hover': {
                    backgroundColor: (theme) => theme.palette.primary.dark,
                  },
                }}
              >
                <SearchTwoTone />
              </IconButton>
            </Tooltip>
            <Tooltip title="Save">
              <IconButton
                sx={{
                  color: 'white',
                  backgroundColor: green[500],
                  '&:hover': {
                    backgroundColor: green[600],
                  },
                }}
              >
                <SaveIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Add new feedback">
              <IconButton
                onClick={handleAddNewFeedbackClick}
                sx={{
                  color: 'white',
                  backgroundColor: blue[500],
                  '&:hover': {
                    backgroundColor: blue[600],
                  },
                }}
              >
                <AddIcon />
              </IconButton>
            </Tooltip>
          </>
        }
      />
      <Box sx={{ backgroundColor: 'white', p: 1, mb: 1 }}>
        <FormControl component="fieldset">
          <RadioGroup row value={selectedFeedback} onChange={handleRadioChange} aria-label="feedback-options">
            <FormControlLabel value="users" control={<Radio />} label="Feedback from Users" />
            <FormControlLabel value="others" control={<Radio />} label="Feedback from Others" />
          </RadioGroup>
        </FormControl>
      </Box>
      <Box sx={{ backgroundColor: 'white', p: 2, mb: 1 }}>
        {selectedFeedback === 'users' ? (
          <>
            {dummyData.length > 0 ? (
              <Typography variant="subtitle1" sx={{ margin: '2px 0', textAlign: 'center' }}>
                <Box component="span" fontWeight="fontWeightBold">
                  {dummyData.length}
                </Box>{' '}
                records found
              </Typography>
            ) : (
              <Typography
                variant="body1"
                sx={{
                  textAlign: 'center',
                  marginTop: 1,
                  backgroundColor: '#324b84',
                  padding: 1,
                  borderRadius: 2,
                  color: 'white',
                }}
              >
                <b>No record found.</b>
              </Typography>
            )}
            <FeedbackFromUsersTable data={dummyData} rowsPerPage={rowsPerPage} />
          </>
        ) : (
          <AddNewFeedback />
        )}
      </Box>

      {/* Popup for Add New Feedback */}
      <Dialog open={isPopupOpen} onClose={handleClosePopup} maxWidth="md" fullWidth PaperProps={{ sx: { borderRadius: '15px' } }}>
        <DialogTitle sx={{ bgcolor: '#223354' }}>
        <ClearIcon
            onClick={handleClosePopup}
            sx={{
              color: 'white',
              borderRadius: '7px',
              position: 'absolute',
              top: '5px',
              right: '8px',
              cursor: 'pointer',
              '&:hover': {
                color: 'red'
              }
            }}/>
            </DialogTitle>
            <Typography variant="h3" sx={{ pt: 2, pl: 3 }}>
            Add New Feedback
          </Typography>
        <DialogContent>
          <AddNewFeedback />
        </DialogContent>
        <DialogActions>
          <Grid item xs={12} display="flex" justifyContent="flex-end" gap={2} pr={2} pb={2}>
          <Button  color="error" onClick={handleClosePopup}>
            Close
          </Button>
          <Button   sx={{
                // backgroundColor: green[100],
                color: 'green',
                ':hover': { backgroundColor: green[100] }
              }}  onClick={handleClosePopup}>
            Submit
          </Button>
        </Grid>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default FeedbackDetailsBasescreen;
