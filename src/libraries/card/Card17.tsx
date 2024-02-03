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
  FormControl,
  List,
  ListItem,
  MenuItem,
  Popover,
  Select,
  Slide,
  Stack,
  Typography,
  useTheme
} from '@mui/material';
import { green, orange, red } from '@mui/material/colors';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { Styles } from 'src/assets/style/student-style';
import ErrorMessages2 from 'src/libraries/ErrorMessages/DashboardError';

Card17.propTypes = {
  data: PropTypes.array,
  YearData: PropTypes.array
};

function Card17({ data, YearData }) {
  const theme = useTheme();
  const [current, setCurrent] = useState<any>(0);
  const length = data.length;
  const classes = Styles();
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

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;
  const [month, setMonth] = React.useState('');

  const handleChange = (event) => {
    setMonth(event.target.value);
  };

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
          <ListItem>Select Month</ListItem>
          <Box>
            <FormControl sx={{ mx: 2, minWidth: '220px' }} variant="outlined">
              <Select value={month} onChange={handleChange} size="small">
                <MenuItem value="">All</MenuItem>
                <MenuItem value={10}>January</MenuItem>
                <MenuItem value={20}>February</MenuItem>
                <MenuItem value={30}>March</MenuItem>
                <MenuItem value={40}>April</MenuItem>
                <MenuItem value={50}>May</MenuItem>
                <MenuItem value={60}>June</MenuItem>
                <MenuItem value={70}>July</MenuItem>
                <MenuItem value={80}>August</MenuItem>
                <MenuItem value={90}>September</MenuItem>
                <MenuItem value={100}>October</MenuItem>
                <MenuItem value={100}>November</MenuItem>
                <MenuItem value={100}>December</MenuItem>
                <MenuItem value={100}>Recent 5</MenuItem>
              </Select>
            </FormControl>
          </Box>

          <ListItem>Select Year</ListItem>
          <Box>
            <FormControl sx={{ mx: 2, minWidth: '220px' }} variant="outlined">
              <Select value={month} onChange={handleChange} size="small">
                {YearData.map((item, key) => (
                  <MenuItem value={item} key={key}>
                    {item}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          <Divider sx={{ mt: 2 }} />
          <Stack direction="row" spacing={2} sx={{ my: 1, px: 5 }}>
            <Avatar sx={{ bgcolor: green[500] }} variant="square">
              <CheckIcon />
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
                <b>Photo Albums</b>
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
                textAlign: 'center'
              }}
            >
              <>
                {!Array.isArray(data) || data.length === 0 ? (
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
                                      variant="rounded"
                                      sx={{
                                        width: '250px',
                                        height: '300px',
                                        mb: 2
                                        // mx: 'auto'
                                      }}
                                      alt={slide.Name}
                                      src={
                                        localStorage.getItem('siteURL') +
                                        slide.ImageList[0].ImagePath
                                      }
                                      // 'http://riteschool_old.aaditechnology.com/RITeSchool/' +
                                    />
                                  </Slide>

                                  <ArrowRight onClick={nextSlide} />
                                </Box>
                                <Slide
                                  in={checked}
                                  direction={sliDirection ? 'left' : 'right'}
                                  style={{ transformOrigin: '0 0 0' }}
                                >
                                  <Typography
                                    variant="h4"
                                    sx={{
                                      color: 'black'
                                    }}
                                  >
                                    {slide.ImageList[0].Description}
                                  </Typography>
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
          <List
            sx={{
              background: `${theme.colors.gradients.pink1}`
            }}
          >
            <Box display="flex" flexDirection="row" justifyContent="center">
              <Typography className={classes.Listfont1}>
                Please re-login or refresh the widget to see the updates
              </Typography>
            </Box>
          </List>
        </Card>
      </Container>
    </>
  );
}

export default Card17;
