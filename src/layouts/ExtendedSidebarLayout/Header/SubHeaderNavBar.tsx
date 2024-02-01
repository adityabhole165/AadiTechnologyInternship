import ContactSupportTwoToneIcon from '@mui/icons-material/ContactSupportTwoTone';
import Email from '@mui/icons-material/Email';
import FeedbackTwoToneIcon from '@mui/icons-material/FeedbackTwoTone';
import LibraryBooks from '@mui/icons-material/LibraryBooks';
import LocalLibrary from '@mui/icons-material/LocalLibrary';
import MenuIcon from '@mui/icons-material/Menu';
import {
  AppBar,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Popover,
  Stack,
  Tab,
  Tabs,
  Tooltip,
  Typography,
  styled
} from '@mui/material';
import React, { useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Detail1 } from 'src/libraries/styled/CardStyle';

const UserBoxLabel = styled(Typography)(
  ({ theme }) => `
    font-weight: ${theme.typography.fontWeightBold};
    color: ${theme.sidebar.menuItemColor};
    display: block;
    @media (max-width: 280px) {
      font-size: 11px;
    };
    &.popoverTypo {
      color: ${theme.palette.secondary.main};
    }
`
);

function SubHeaderNavBar({ toggleDrawer }) {
  const [value, setValue] = React.useState('0');
  const ref = useRef<any>(null);
  const [isOpen, setOpen] = useState<boolean>(false);
  const activeStyle = {
    backgroundColor: 'white'
  };

  const handleOpen = (): void => {
    setOpen(true);
  };

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const handleClose = (): void => {
    setOpen(false);
  };

  return (
    <div>
      <AppBar
        position="fixed"
        sx={{
          ml: '100px',
          mt: '60px',
          zIndex: 1201,
          backgroundColor: 'rgb(40, 160, 235)',
          display: 'flex',
          aligItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        <Stack
          direction={'row'}
          justifyContent={'space-between'}
          alignItems={'center'}
        >
          <Stack direction={'row'} alignItems={'center'}>
            <Typography sx={{ p: '5px', color: 'white' }}>
              <Tooltip title="Sidebar">
                <IconButton
                  edge="start"
                  color="inherit"
                  onClick={toggleDrawer}
                  sx={{ ml: 0 }}
                >
                  <MenuIcon />
                </IconButton>
              </Tooltip>
            </Typography>
            <Tabs
              value={value}
              onChange={handleChange}
              indicatorColor="primary"
              variant="scrollable"
              scrollButtons="auto"
              aria-label="primary example"
            >
              <Tab
                value="0"
                label={
                  <Typography sx={{ p: '5px', color: 'white' }}>
                    Syllabus
                  </Typography>
                }
              ></Tab>
              <Tab
                value="1"
                label={
                  <Typography sx={{ color: 'white' }}>
                    Practice WorkSheet
                  </Typography>
                }
              ></Tab>

              <Tab
                value="3"
                label={
                  <Typography sx={{ color: 'white' }}>Transport</Typography>
                }
              ></Tab>
              <Tab
                value="4"
                label={<Typography sx={{ color: 'white' }}>NavBar</Typography>}
              ></Tab>
              <Tab
                value="5"
                label={
                  <Typography sx={{ color: 'white' }}>Attendance</Typography>
                }
              ></Tab>
              <Tab
                value="6"
                label={
                  <Typography sx={{ color: 'white' }}>Homework</Typography>
                }
              ></Tab>
            </Tabs>
          </Stack>
          <Stack direction={'row'} alignItems={'center'} pr={1}>
            <IconButton
              color={'secondary'}
              sx={{
                border: (theme) => `2px solid ${theme.palette.secondary.main}`
              }}
              ref={ref}
              onClick={handleOpen}
            >
              <ContactSupportTwoToneIcon />
            </IconButton>
            <Popover
              disableScrollLock
              anchorEl={ref.current}
              onClose={handleClose}
              open={isOpen}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right'
              }}
            >
              <List
                sx={{
                  p: 1
                }}
                component="nav"
              >
                <ListItem
                  onClick={() => {
                    handleClose();
                  }}
                  button
                  to={'/extended-sidebar/common/changePassword'}
                  component={NavLink}
                >
                  <Email fontSize="small" sx={{ color: '#053082' }} />
                  <ListItemText
                    primary={
                      <UserBoxLabel sx={{ color: 'blue', fontWeight: 'bold' }}>
                        Email
                      </UserBoxLabel>
                    }
                  />
                </ListItem>
                <ListItem
                  onClick={() => {
                    handleClose();
                  }}
                  button
                  to={'/extended-sidebar/common/changePassword'}
                  component={NavLink}
                >
                  <LibraryBooks fontSize="small" sx={{ color: '#053082' }} />
                  <ListItemText
                    primary={
                      <UserBoxLabel sx={{ color: 'blue', fontWeight: 'bold' }}>
                        {' '}
                        User Guide
                      </UserBoxLabel>
                    }
                  />
                </ListItem>
                <ListItem
                  onClick={() => {
                    handleClose();
                  }}
                  button
                  to={'/extended-sidebar/common/changePassword'}
                  component={NavLink}
                >
                  <LocalLibrary fontSize="small" sx={{ color: '#053082' }} />
                  <ListItemText
                    primary={
                      <UserBoxLabel sx={{ color: 'blue', fontWeight: 'bold' }}>
                        Knowledge Base
                      </UserBoxLabel>
                    }
                  />
                </ListItem>
                <ListItem
                  onClick={() => {
                    handleClose();
                  }}
                  button
                  to={'/extended-sidebar/Student/Feedback'}
                  component={NavLink}
                >
                  <FeedbackTwoToneIcon
                    fontSize="small"
                    sx={{ color: '#053082' }}
                  />
                  <ListItemText primary={<Detail1>Feedback</Detail1>} />
                </ListItem>
              </List>
            </Popover>
          </Stack>
        </Stack>
      </AppBar>
    </div>
  );
}

export default SubHeaderNavBar;
