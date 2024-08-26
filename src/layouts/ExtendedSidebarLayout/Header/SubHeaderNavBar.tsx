import InfoTwoToneIcon from '@mui/icons-material/InfoTwoTone';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import LogoutTwoToneIcon from '@mui/icons-material/LogoutTwoTone';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsTwoToneIcon from '@mui/icons-material/NotificationsTwoTone';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import {
  AppBar,
  Box,
  ClickAwayListener,
  Grow,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  Menu,
  MenuItem,
  MenuList,
  Paper,
  Popper,
  Stack,
  Tooltip,
  Typography,
  alpha
} from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import SettingsDropdown from 'src/libraries/Settingicon/Settingicon';

function SubHeaderNavBar({ toggleDrawer }) {
  const [pages, setPages] = React.useState([
    {
      name: "Counsellor's Corner",
      anchor: null,
      options: [
        {
          name: 'Self Discipline',
          link: ''
        },
        {
          name: 'Social Media',
          link: ''
        },
        {
          name: 'Effective Study Skills',
          link: ''
        },
        {
          name: 'Bullying - Copy',
          link: ''
        },
        {
          name: 'Benefit of pets for human health',
          link: ''
        },
        {
          name: 'Angry Child Outbursts',
          link: ''
        },
        {
          name: 'AUTISM WORKSHOP',
          link: ''
        },
        {
          name: 'Rashmi Gupta',
          link: ''
        },
        {
          name: 'Remedial Teaching',
          link: ''
        },
        {
          name: 'Why having choices should be a choice for children?',
          link: ''
        },
        {
          name: 'learning  difficulty2',
          link: ''
        },
        {
          name: 'cyber Safety',
          link: ''
        },
        {
          name: 'Learning Difficulty',
          link: ''
        }
      ]
    },
    {
      name: 'PTA',
      anchor: null,
      options: []
    },
    {
      name: 'Pre-Primary Activities',
      anchor: null,
      options: []
    },
    {
      name: 'Syllabus',
      anchor: null,
      options: [
        {
          name: 'Standard I',
          link: ''
        },
        {
          name: 'Standard II',
          link: ''
        },
        {
          name: 'Standard III',
          link: ''
        },
        {
          name: 'Standard IV',
          link: ''
        },
        {
          name: 'Standard V',
          link: ''
        },
        {
          name: 'Standard VI',
          link: ''
        },
        {
          name: 'Standard VI',
          link: ''
        },
        {
          name: 'Standard VII',
          link: ''
        },
        {
          name: 'Standard IX',
          link: ''
        },
        {
          name: 'Standard IV',
          link: ''
        },
        {
          name: 'Standard X',
          link: ''
        },
        {
          name: 'Exam Paper Pattern',
          link: ''
        }
      ]
    },
    {
      name: 'Practice Worksheet',
      anchor: null,
      options: []
    },
    {
      name: 'School Club',
      anchor: null,
      options: []
    },
    {
      name: 'Mediclaim',
      anchor: null,
      options: []
    },
    {
      name: 'Eloquium e-Newsletter',
      anchor: null,
      options: []
    },
    {
      name: 'Question Bank',
      anchor: null,
      options: []
    }
  ]);
  const [openSupportMenu, setOpenSupportMenu] = React.useState(false);
  const supportMenuRef = React.useRef<HTMLButtonElement>(null);
  const navigate = useNavigate();

  const handleToggle = () => {
    setOpenSupportMenu((prevOpen) => !prevOpen);
  };

  const handleClose = (event: Event | React.SyntheticEvent) => {
    if (
      supportMenuRef.current &&
      supportMenuRef.current.contains(event.target as HTMLElement)
    ) {
      return;
    }

    setOpenSupportMenu(false);
  };

  const handleEmail = () => {
    const Email = 'https://accounts.google.com/v3/signin/identifier?continue=https%3A%2F%2Fwww.google.com%3Fhl%3Den-GB&ec=GAlA8wE&hl=en-GB&flowName=GlifWebSignIn&flowEntry=AddSession&dsh=S-401164080%3A1724671374900003&ddm=0';
    window.open(Email, '_blank');
  };

  const handleSupport = () => {
    navigate('./Common/Support');
  };
  const handleuserguide = () => {
    window.location.href = 'https://www.riteschool.com/knowledge-base-user-guide';
  };

  const handleKnowledgebase = () => {
    window.location.href = 'https://www.riteschool.com/knowledge-base';
  };

  const supportOptions = [
    {
      name: 'Support',
      anchor: null,
      options: [
        {
          name: 'User Guide',
          link: ''
        },
        {
          name: 'Knowledge Base',
          link: ''
        },
        // {
        //   name: 'Email',
        //   link: ''
        // },
        {
          name: 'Feedback',
          link: ''
        },
        {
          name: 'Contact Us',
          link: ''
        }
      ]
    }
  ];
  const handleLogout = async (): Promise<void> => {
    try {
      localStorage.removeItem('auth');
      sessionStorage.clear();
      navigate('/');
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div>
      <AppBar
        position="fixed"
        sx={{
          mt: '60px',
          zIndex: 1201,
          backgroundColor: (theme) => theme.palette.primary.main,
        }}
      >
        <Stack
          direction={'row'}
          alignItems={'center'}
          justifyContent={'space-between'}
          px={2}
        >
          <Stack direction={'row'} alignItems={'center'}>
            <Typography sx={{ p: '5px', color: 'white' }}>
              <Tooltip title="Sidebar">
                <IconButton edge="start" color="inherit" onClick={toggleDrawer}>
                  <MenuIcon />
                </IconButton>
              </Tooltip>
            </Typography>
            <List
              sx={{
                flexDirection: 'row',
                p: 0,
                m: 0,
                flex: 1,
              }}
            >
              <ListItem sx={{ p: 0 }}>
                {pages.map((page, key) => (
                  <Box key={key}>
                    <ListItemButton
                      sx={{
                        color: (theme) => theme.palette.common.white,
                        '&:hover': {
                          color: (theme) => theme.palette.primary.main
                        },
                        px: 1,
                        fontWeight: 'bold',
                        whiteSpace: 'nowrap'
                      }}
                      key={key}
                      onClick={(e) => {
                        let pagesCpy = [...pages];
                        pagesCpy[key].anchor = e.currentTarget;
                        setPages(pagesCpy);
                      }}
                    >
                      {page.name}
                      {page?.options && page?.options.length > 0 && (
                        <KeyboardArrowDownIcon />
                      )}
                    </ListItemButton>
                    {page?.options && page?.options.length > 0 && (
                      <Menu
                        id={`${page.name}-menu`}
                        anchorEl={page.anchor}
                        open={Boolean(page.anchor)}
                        onClose={() => {
                          page.anchor = null;
                          setPages([...pages]);
                        }}
                        MenuListProps={{
                          'aria-labelledby': 'basic-button'
                        }}
                        sx={{
                          '& .MuiMenu-paper': {
                            padding: 0
                          }
                        }}
                      >
                        {page?.options.map((option, key) => (
                          <MenuItem key={key}>{option.name}</MenuItem>
                        ))}
                      </Menu>
                    )}
                  </Box>
                ))}
              </ListItem>
            </List>
          </Stack>
          <Stack direction={'row'} alignItems={'center'} gap={1}>
            <Tooltip
              title={`Displays dashboard for users. Lists available features of the application.`}
            >
              <IconButton
                sx={{
                  color: 'white',
                  background: (theme) => alpha(theme.palette.common.white, 0.2)
                }}
              >
                <QuestionMarkIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title={'Support'}>
              <IconButton
                sx={{
                  color: 'white',
                  background: (theme) => alpha(theme.palette.common.white, 0.2)
                }}
                ref={supportMenuRef}
                onClick={handleToggle}
              >
                <InfoTwoToneIcon />
              </IconButton>
            </Tooltip>

            {/* Support Menu Popup */}
            <Popper
              open={openSupportMenu}
              anchorEl={supportMenuRef.current}
              role={undefined}
              placement="bottom-start"
              transition
              disablePortal
            >
              {({ TransitionProps, placement }) => (
                <Grow
                  {...TransitionProps}
                  style={{
                    transformOrigin:
                      placement === 'bottom-start' ? 'left top' : 'left bottom'
                  }}
                >
                  <Paper>
                    <ClickAwayListener onClickAway={handleClose}>
                      <MenuList
                        id="composition-menu"
                        aria-labelledby="composition-button"
                      >
                        <MenuItem onClick={handleEmail}>Email</MenuItem>
                        <MenuItem onClick={handleSupport}>Support</MenuItem>
                        <MenuItem onClick={handleuserguide}>User Guide</MenuItem>
                        <MenuItem onClick={handleKnowledgebase}>
                          Knowledge Base
                        </MenuItem>
                      </MenuList>
                    </ClickAwayListener>
                  </Paper>
                </Grow>
              )}
            </Popper>
            {/* Support Menu Popup End */}
            <SettingsDropdown />
            <Tooltip title={'Notifications'}>
              <IconButton
                sx={{
                  color: 'white',
                  background: (theme) => alpha(theme.palette.common.white, 0.2)
                }}
              >
                <NotificationsTwoToneIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title={'Logout'}>
              <IconButton
                sx={{
                  color: 'white',
                  background: (theme) => alpha(theme.palette.common.white, 0.2)
                }}
                onClick={handleLogout}
              >
                <LogoutTwoToneIcon />
              </IconButton>
            </Tooltip>
          </Stack>
        </Stack>
      </AppBar>
    </div >
  );
}

export default SubHeaderNavBar;
