import ArrowLeft from '@mui/icons-material/ArrowLeft';
import ArrowRight from '@mui/icons-material/ArrowRight';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import RefreshIcon from '@mui/icons-material/Refresh';
import ReplayIcon from '@mui/icons-material/Replay';
import SettingsIcon from '@mui/icons-material/Settings';
import {
  Avatar,
  Box,
  Card,
  Container,
  Divider,
  List,
  Popover,
  Slide,
  Stack,
  Typography,
  useTheme
} from '@mui/material';
import {
  blue,
  deepOrange,
  green,
  orange,
  purple,
  red
} from '@mui/material/colors';
import { makeStyles } from '@mui/styles';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import ErrorMessages2 from 'src/libraries/ErrorMessages/DashboardError';

Card12.propTypes = {
  data: PropTypes.array,
  viewToday: PropTypes.any
};

const useStyles = makeStyles((theme) => ({
  root: {
    '&:hover': {
      cursor: 'pointer',
      backgroundColor: 'gray'
    },
    '&:active': {
      cursor: 'pointer',
      borderBottom: ' 3px solid blue'
    }
  }
}));

function Card12({ data, viewToday }) {
  const theme = useTheme();
  const [current, setCurrent] = useState<any>(0);
  const length = data.length;
  const [apply, setApply] = useState<any>('T');
  const [sliDirection, setDirection] = useState<any>(true);
  const [checked, setChecked] = useState(true);

  const nextSlide = () => {
    setDirection(true);
    if (current < length) {
      setCurrent(current === length - 1 ? 0 : current + 1);
    } else {
      setCurrent(0);
    }
  };
  const prevSlide = () => {
    setDirection(false);
    setCurrent(current === 0 ? length - 1 : current - 1);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      nextSlide();
    }, 3000);
    return () => clearTimeout(timer);
  }, [nextSlide]);

  const clas = useStyles();
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const ViewClose = () => {
    setCurrent(0);
    viewToday(apply);
    handleClose();
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;
  const Pop = () => (
    <div>
      <SettingsIcon onClick={handleClick} sx={{ mt: '3px' }} />

      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left'
        }}
      >
        <List>
          <Typography>Select User</Typography>
          <Avatar sx={{ bgcolor: blue[300], mx: 1, my: 1 }}>N</Avatar>
          <Divider />
          <Typography>Select view</Typography>
          <Stack direction="row" spacing={2} sx={{ mx: 1, my: 1 }}>
            <Avatar
              sx={{ bgcolor: deepOrange[500] }}
              variant="rounded"
              className={clas.root}
              onClick={() => setApply('T')}
            >
              T
            </Avatar>
            <Avatar
              sx={{ bgcolor: purple[300] }}
              variant="rounded"
              className={clas.root}
              onClick={() => setApply('W')}
            >
              W
            </Avatar>
          </Stack>
          <Divider />
          <Stack direction="row" spacing={2} sx={{ mx: 1, my: 1 }}>
            <Avatar sx={{ bgcolor: green[500] }} variant="square">
              <CheckIcon onClick={() => ViewClose()} />
            </Avatar>
            <Avatar sx={{ bgcolor: orange[500] }} variant="square">
              <ReplayIcon />
            </Avatar>
            <Avatar sx={{ bgcolor: red[500] }} variant="square">
              <CloseIcon onClick={() => handleClose()} />
            </Avatar>
          </Stack>
        </List>
      </Popover>
    </div>
  );

  return (
    <>
      <Container>
        <Card sx={{ boxShadow: '6px 4px 5px grey !important' }}>
          <List
            sx={{
              background: `${theme.colors.gradients.pink1}`
            }}
          >
            <Box
              display="flex"
              flexDirection="row"
              alignItems="center"
              justifyContent="space-between"
            >
              <Typography sx={{ color: 'black' }}>
                <b>Birthdays</b>
              </Typography>
              <Box display="flex" flexDirection="row" justifyContent="flex-end">
                <Avatar sx={{ height: '30px', width: '30px' }}>
                  <Typography color={'black'}>
                    <b>{length}</b>
                  </Typography>
                </Avatar>
                <RefreshIcon sx={{ ml: '4px', mr: '4px', mt: '3px' }} />
                {Pop()}
              </Box>
            </Box>
          </List>
          <List>
            <Box
              sx={{
                textAlign: 'center',
                position: 'relative'
              }}
            >
              <>
                {data.length === 0 ? (
                  <ErrorMessages2 Error={'No record found'} />
                ) : (
                  <>
                    {data.map((slide, index) => {
                      return (
                        <div
                          className={
                            index === current ? 'slide active' : 'slide'
                          }
                          key={index}
                        >
                          <>
                            {index === current && (
                              <>
                                <Box
                                  display="flex"
                                  flexDirection="row"
                                  alignItems="center"
                                  justifyContent="space-between"
                                >
                                  <ArrowLeft onClick={prevSlide} />
                                  <Slide
                                    in={checked}
                                    direction={sliDirection ? 'left' : 'right'}
                                    style={{ transformOrigin: '0 0 0' }}
                                  >
                                    <Avatar
                                      sx={{
                                        width: 75,
                                        height: 75,
                                        mb: 2,
                                        mx: 'auto'
                                      }}
                                      alt="user.name"
                                      src={`data:image/png;base64,${slide.PhotoPath}`}
                                    />
                                  </Slide>
                                  <ArrowRight onClick={nextSlide} />
                                </Box>
                                <Slide
                                  in={checked}
                                  direction={sliDirection ? 'left' : 'right'}
                                  style={{ transformOrigin: '0 0 0' }}
                                >
                                  <Box>
                                    <Typography
                                      variant="h4"
                                      sx={{
                                        color: 'black'
                                      }}
                                    >
                                      {slide.UserName}
                                    </Typography>
                                    <Typography
                                      variant="subtitle1"
                                      sx={{
                                        color: 'black'
                                      }}
                                    >
                                      {slide.Date}
                                    </Typography>
                                  </Box>
                                </Slide>
                              </>
                            )}
                          </>
                        </div>
                      );
                    })}
                  </>
                )}
              </>
            </Box>
          </List>
        </Card>
      </Container>
    </>
  );
}

export default Card12;
