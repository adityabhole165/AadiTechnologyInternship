import { QuestionMark } from '@mui/icons-material';
import PushPinIcon from '@mui/icons-material/PushPin';
import RefreshIcon from '@mui/icons-material/Refresh';
import { Box, Card, Grid, IconButton, Tooltip } from '@mui/material';
import { blue, red } from '@mui/material/colors';
import { motion } from 'framer-motion'; // Import framer-motion for animations
import { useEffect, useState } from 'react';
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult
} from 'react-beautiful-dnd';

// Components and other imports...
import SchoolNoticeBoard from 'src/components/SchoolNoticeBoard/SchoolNoticeBoard';
import SchoolNoticePopupCom from 'src/components/SchoolNoticePopup/SchoolNoticePopup';
import AnnualPlannerDashBoard from 'src/librariesWeb/AnnualPlannerDashBoard';
import BirthdayDashboard from 'src/librariesWeb/BirthdayDashboard';
import FeedBackCard from 'src/librariesWeb/FeedBackCard';
import PhotoCardDash from 'src/librariesWeb/PhotoCardDash';
import PieChart from 'src/librariesWeb/PieChart';
import Profile from 'src/librariesWeb/Profile';
import UnreadMessage from 'src/librariesWeb/UnreadMessage';
import UpcomingEvent from 'src/librariesWeb/UpcomingEvent';
// ... other imports

function DashBoard() {
  const IsClassTeacher = sessionStorage.getItem('IsClassTeacher');
  const initialTiles = [
    { id: 'profile', label: 'Profile', SortOrder: 1 },
    // { id: 'attendance', label: 'Attendance', SortOrder: 2 },
    { id: 'unreadMessages', label: 'Unread Messages', SortOrder: 3 },
    { id: 'birthday', label: 'Birthday Dashboard', SortOrder: 4 },
    { id: 'photoCardDash', label: 'Photo Card Dashboard', SortOrder: 5 },
    { id: 'feedbackCard', label: 'Feedback Card', SortOrder: 6 },
    { id: 'upcomingEvent', label: 'Upcoming Events', SortOrder: 7 },
    { id: 'annualplanner', label: 'Annual Planner DashBoard', SortOrder: 8 }
  ];

  if (IsClassTeacher === 'Y') {
    initialTiles.push({ id: 'attendance', label: 'Attendance', SortOrder: 2 });
  }

  const getComponent = (id: string) => {
    switch (id) {
      case 'profile':
        return <Profile />;
      case 'birthday':
        return <BirthdayDashboard />;
      case 'unreadMessages':
        return <UnreadMessage />;
      case 'photoCardDash':
        return <PhotoCardDash />;
      case 'feedbackCard':
        return <FeedBackCard />;
      case 'annualplanner':
        return <AnnualPlannerDashBoard />;
      case 'attendance':
        return <PieChart />;
      case 'upcomingEvent': // Fix here - lowercase 'u'
        return <UpcomingEvent />;
      default:
        return null;
    }
  };

  const [SchoolNoticeDialog, setSchoolNoticeDialog] = useState(false);
  const [tiles, setTiles] = useState(initialTiles);
  const [resetKey, setResetKey] = useState(Date.now()); // Add a key for resetting

  const handleSchoolNoticePopupDialogClose = () => {
    setSchoolNoticeDialog(false);
    sessionStorage.setItem('hasShownPopup', 'true');
  };

  useEffect(() => {
    if (localStorage.getItem('tiles') !== null) {
      setTiles(
        JSON.parse(localStorage.getItem('tiles')).sort(
          (a, b) => a.SortOrder - b.SortOrder
        )
      );
    } else {
      setTiles(initialTiles);
    }
  }, []);

  useEffect(() => {
    if (tiles.length > 0) localStorage.setItem('tiles', JSON.stringify(tiles));
  }, [tiles]);

  const handleOnDragEnd = (result: DropResult) => {
    const { source, destination } = result;
    if (!destination) return;

    const reorderedTiles = Array.from(tiles);
    const [removed] = reorderedTiles.splice(source.index, 1);
    reorderedTiles.splice(destination.index, 0, removed);
    const profileCard = tiles[0];
    const profileCardCurrentIndex = reorderedTiles.findIndex(
      (tile) => tile === profileCard
    );
    if (profileCardCurrentIndex !== 0) {
      reorderedTiles.splice(profileCardCurrentIndex, 1); // Remove from its current position
      reorderedTiles.splice(0, 0, profileCard); // Reinsert at the original position
    }
    setTiles(reorderedTiles);
  };

  const handleUnpinTile = (id: string) => {
    setTiles((prevTiles) => prevTiles.filter((tile) => tile.id !== id));
  };

  const handleReset = () => {
    setTiles(initialTiles);
    setResetKey(Date.now()); // Change the key to trigger animation
  };

  return (
    <Box sx={{ px: 2 , mb:2}}>
      <SchoolNoticeBoard />
      <Grid container justifyContent="flex-end" my={1} mr={2}>
        {/* <IconButton onClick={handleReset}>
          <Typography variant="h6"> Reset Dashboard </Typography>
          <RefreshIcon />
        </IconButton> */}

        <Tooltip
          title={`Displays dashboard for users. Lists available features of the application.`}
        >
          <IconButton
            sx={{
              bgcolor: 'grey.500',
              color: 'white',
              '&:hover': {
                bgcolor: 'grey.600'
              }
            }}
          >
            <QuestionMark />
          </IconButton>
        </Tooltip>
        <Tooltip
          title={`Reset Dashboard`}
        >
          <IconButton
            sx={{
              bgcolor: blue[500],
              color: 'white',
              ml: 1,
              '&:hover': {
                bgcolor: blue[600]
              }
            }}
            onClick={handleReset}
          >
            <RefreshIcon />
          </IconButton>
        </Tooltip>
        {/* <Button
          sx={{
            my: 1,
            color: '#38548A',
            borderRadius: '7px',
            '&:hover': {
              color: 'blue',
              backgroundColor: blue[100]
            }
          }}
          onClick={handleReset}
          endIcon={<RefreshIcon />}
        >
          Reset Dashboard{' '}
        </Button> */}
      </Grid>

      {/* Drag and Drop Context */}
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="dashboard" direction="horizontal">
          {(provided) => (
            <Grid
              container
              spacing={1}
              // mt={-1}
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {tiles.map((tile, index) => (
                <Draggable
                  isDragDisabled={tile.id === 'profile' ? true : false}
                  key={tile.id}
                  draggableId={tile.id}
                  index={index}
                >
                  {(provided) => (
                    <Grid
                      item
                      xs={tile.id === 'attendance' ? 12 : 12}
                      sm={tile.id === 'attendance' ? 12 : 0}
                      md={tile.id === 'attendance' ? 8 : 4}
                      lg={tile.id === 'attendance' ? 8 : 4}
                      key={resetKey} // Use the resetKey to force re-render
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      {/* Animated Card using framer-motion */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 1 }}
                      >
                        <Card
                          elevation={3}
                          sx={{ position: 'relative', borderRadius: '10px' }}
                        >
                          {/* Unpin Button */}
                          {tile.id !== 'profile' && (
                            <IconButton
                              // size="medium"
                              sx={{
                                position: 'absolute',
                                top: 10,
                                right: 2,
                                '&:hover': {
                                  color: 'red',
                                  backgroundColor: red[100]
                                }
                              }}
                              onClick={() => handleUnpinTile(tile.id)}
                            >
                              <PushPinIcon />
                            </IconButton>
                          )}

                          {/* Component for each tile */}
                          {getComponent(tile.id)}
                        </Card>
                      </motion.div>
                    </Grid>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </Grid>
          )}
        </Droppable>
      </DragDropContext>

      <Grid container spacing={2} mt={-1}>
        {SchoolNoticeDialog && (
          <SchoolNoticePopupCom
            open={SchoolNoticeDialog}
            setOpen={handleSchoolNoticePopupDialogClose}
          />
        )}
      </Grid>
    </Box>
  );
}

export default DashBoard;
