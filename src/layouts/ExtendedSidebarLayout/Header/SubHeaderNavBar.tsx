import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import InfoTwoToneIcon from '@mui/icons-material/InfoTwoTone';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import LogoutTwoToneIcon from '@mui/icons-material/LogoutTwoTone';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsTwoToneIcon from '@mui/icons-material/NotificationsTwoTone';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';

import {
  alpha,
  AppBar,
  Box,
  ClickAwayListener,
  Grow,
  Hidden,
  IconButton,
  ListItemButton,
  Menu,
  MenuItem,
  MenuList,
  Paper,
  Popper,
  Stack,
  Theme,
  Tooltip,
  useMediaQuery
} from '@mui/material';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import SettingsDropdown from 'src/libraries/Settingicon/Settingicon';
import { getChildMenuId, getMenuDescription } from 'src/requests/NavBarMenu/requestNavBarMenu';
import { RootState } from 'src/store';
import ImprovedNestedMenu from './NestedMenu';

interface MenuItem {
  MenuId: number;
  MenuName: string;
  ParentMenuId: number;
  LevelIndex: number;
  children?: MenuItem[];
}

function SubHeaderNavBar({ toggleDrawer }) {
  let schoolId = localStorage.getItem('SchoolId');
  const dispatch = useDispatch();
  const GetNavbarmenu: any = useSelector((state: RootState) => state.NavbarMenu.GetNavbarMenuDetails);
  const GetNavbarMenuDetails: any = useSelector((state: RootState) => state.NavbarMenu.MenuDescription);
  const [menuStructure, setMenuStructure] = useState<MenuItem[]>([]);
  const [anchorEl, setAnchorEl] = useState<{ [key: number]: HTMLElement | null }>({});
  const navigate = useNavigate();
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));

  useEffect(() => {
    if (GetNavbarmenu.length > 0) {
      const structure = buildMenuStructure(GetNavbarmenu);
      setMenuStructure(structure);
    }
  }, [GetNavbarmenu]);
  useEffect(() => {
    if (GetNavbarMenuDetails.length > 0) {
      //console.log(`🎉`, GetNavbarMenuDetails)
    }
  }, [GetNavbarMenuDetails])
  const handleItemClick = (item) => {
    //console.log('Clicked item:', item);
    navigate('/RITeSchool/landing/NavContent');
    dispatch(getMenuDescription({ aiMenuId: String(item.MenuId), aiSchoolId: Number(schoolId) }));
    dispatch(getChildMenuId({ aiMenuId: String(item.MenuId), aiSchoolId: Number(schoolId) }));
  };

  const buildMenuStructure = (menuItems: any[]): MenuItem[] => {
    const itemMap: { [key: number]: MenuItem } = {};

    // Create a map to track MenuId and filter out duplicates
    const seen = new Set<number>();

    // First pass: create all menu items, skipping duplicates
    menuItems.forEach(item => {
      if (!seen.has(item.MenuId)) {
        seen.add(item.MenuId);
        itemMap[item.MenuId] = { ...item, children: [] };
      }
    });


    // Second pass: build the tree structure
    const rootItems: MenuItem[] = [];
    seen.forEach(menuId => {
      const item = itemMap[menuId];
      if (item.ParentMenuId === 0) {
        rootItems.push(itemMap[item.MenuId]);
      } else {
        const parent = itemMap[item.ParentMenuId];
        if (parent) {
          parent.children.push(itemMap[item.MenuId]);
        }
      }
    });

    return rootItems;
  };

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>, menuId: number) => {
    setAnchorEl({ ...anchorEl, [menuId]: event.currentTarget });
  };

  const handleMenuClose = (menuId: number) => {
    setAnchorEl({ ...anchorEl, [menuId]: null });
  };

  const scrollRef = React.useRef<HTMLDivElement>(null);
  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: -200, // Adjust scroll distance as needed
        behavior: 'smooth', // Smooth scrolling
      });
    }
  };

  // Function to scroll to the right
  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: 200, // Adjust scroll distance as needed
        behavior: 'smooth',
      });
    }
  };

  const renderMenuItem = (item: MenuItem) => {
    const hasChildren = item.children && item.children.length > 0;
    return (
      <Box key={item.MenuId}>
        <ListItemButton
          sx={{
            color: 'inherit',
            '&:hover': {
              color: (theme) => theme.palette.primary.main,
            },
            px: 1, py: .5,
            fontWeight: 'bold',
            whiteSpace: 'nowrap'
          }}
          // onMouseEnter={(e) => handleMenuClick(e, item.MenuId)}
          // onMouseEnter={(e) => { }}
          onClick={(e) => {
            //console.log('----->>>>', item);
            // handleMenuClick(e, item.MenuId)
            // actionPage(item)
            navigate('/RITeSchool/landing/NavContent');
            dispatch(getMenuDescription({ aiMenuId: String(item.MenuId), aiSchoolId: Number(schoolId) }));
            dispatch(getChildMenuId({ aiMenuId: String(item.MenuId), aiSchoolId: Number(schoolId) }))
          }}
        // onMouseLeave={() => handleMenuClose(item.MenuId)}
        >
          {item.MenuName}
          {hasChildren && <KeyboardArrowDownIcon onMouseOver={(e: any) => { handleMenuClick(e, item.MenuId); }} />}
        </ListItemButton>
        {hasChildren && (
          <Menu
            anchorEl={anchorEl[item.MenuId]}
            open={Boolean(anchorEl[item.MenuId])}
            onClose={() => handleMenuClose(item.MenuId)}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
              onMouseLeave: () => setAnchorEl({})
            }}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left', // Aligns to bottom-right of the button
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left', // Menu opens from the top-right corner
            }}
            sx={{
              '& .MuiMenu-paper': {
                padding: 0,
                scrollBehavior: 'smooth',
                maxHeight: '60vh', // Set the maximum height of the dropdown
                overflowY: 'auto', // Enable vertical scrolling if content exceeds the height
              }
            }}
          >
            {item.children.map((child) => renderMenuItem(child))}
          </Menu>
        )}
      </Box>
    );
  };

  const [openSupportMenu, setOpenSupportMenu] = React.useState(false);
  const supportMenuRef = React.useRef<HTMLButtonElement>(null);

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

  const handleMenuItemClick = (action: () => void) => (event: React.MouseEvent) => {
    action();
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
    const UserGuide = 'https://www.riteschool.com/knowledge-base-user-guide';
    window.open(UserGuide, '_blank');
  };

  const handleKnowledgebase = () => {
    const KnowledgeBase = 'https://www.riteschool.com/knowledge-base';
    window.open(KnowledgeBase, '_blank');
  };

  const handleLogout = async (): Promise<void> => {
    try {
      localStorage.removeItem('auth');
      sessionStorage.clear();
      navigate('/Sessionlogout');
    } catch (err) {
      console.error(err);
    }
  };

  // Conflict resolving commit 
  // const scrollRef = useRef<HTMLDivElement>(null);
  const scrollIntervalRef = useRef<number | null>(null);

  const scroll = useCallback((direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -40 : 40;
      scrollRef.current.scrollLeft += scrollAmount;
    }
  }, []);

  const startScrolling = useCallback((direction: 'left' | 'right') => {
    if (scrollIntervalRef.current === null) {
      scrollIntervalRef.current = window.setInterval(() => scroll(direction), 50);
    }
  }, [scroll]);

  const stopScrolling = useCallback(() => {
    if (scrollIntervalRef.current !== null) {
      clearInterval(scrollIntervalRef.current);
      scrollIntervalRef.current = null;
    }
  }, []);

  useEffect(() => {
    return () => {
      if (scrollIntervalRef.current !== null) {
        clearInterval(scrollIntervalRef.current);
      }
    };
  }, []);

  const handleMouseDown = (direction: 'left' | 'right') => {
    scroll(direction);
    startScrolling(direction);
  };

  const handleMouseUp = () => {
    stopScrolling();
  };

  const handleMouseLeave = () => {
    stopScrolling();
  };


  return (
    <Box mb={1.5}>
      <AppBar
        position="fixed"
        sx={{
          mt: '60px',
          zIndex: 1201,
          backgroundColor: (theme) => theme.palette.primary.main,
          // backgroundColor: 'green',
          minHeight: '50px',
        }}
      >
        <Stack
          direction={'row'}
          alignItems={'center'}
          justifyContent={'space-between'}
          px={2}
          py={.5}
        >
          {/* <Tooltip title={'Left'}> */}
          {!isMobile && 
          <IconButton
            onMouseDown={() => handleMouseDown('left')}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseLeave}
            sx={{ zIndex: 1200, ml: 3 }}
          >
            {menuStructure.length > 0 && <ArrowBackIosNewIcon sx={{ color: 'white' }} />}
          </IconButton>}
          {/* </Tooltip> */}

          <Box
            sx={{
              display: 'flex',
              flex: 1,
              overflow: 'hidden', // Ensures container is scrollable
            }}
          >
            <Stack
              ref={scrollRef}
              direction={'row'}
              alignItems={'center'}
              justifyContent={'space-between'}
              overflow={'scroll'} // Enables horizontal scroll
              sx={{
                overflowY: 'hidden', // Hides vertical scroll
                '::-webkit-scrollbar': { display: 'none' }, // Hides scrollbar in WebKit browsers
                '-ms-overflow-style': 'none', // Hides scrollbar in Internet Explorer
                'scrollbar-width': 'none', // Hides scrollbar in Firefox
              }}
            >
              <Stack direction={'row'} alignItems={'center'} >
                <Stack direction={'row'} alignItems={'center'} gap={1} sx={{ pl: '8px', zIndex: '1000', position: 'fixed', left: '0', top: '63px', height: '45px', backgroundColor: (theme) => theme.palette.primary.main }}>
                  <Tooltip title="Sidebar">
                    <IconButton color="inherit" onClick={toggleDrawer}>
                      <MenuIcon />
                    </IconButton>
                  </Tooltip>
                </Stack>
                {!isMobile &&
                <Box sx={{ gap: 0, display: 'flex', alignItems: 'center' }}>
                  {menuStructure.map((item, i) => (
                    <ImprovedNestedMenu key={i}
                      menuStructure={item} onItemClick={handleItemClick} />
                  ))}
                </Box>}
                <div style={{ width: '16vw' }} />
              </Stack>
            </Stack>
          </Box>



          {/* Right-hand controls (support, settings, notifications, logout) */}
          <Stack direction={'row'} alignItems={'center'} gap={1} sx={{ position: 'fixed', right: '0', top: '63px', height: '45px', backgroundColor: (theme) => theme.palette.primary.main }}>
            {/* Add your support, settings, notifications, and logout buttons here */}
            {!isMobile && 
            <IconButton
              onMouseDown={() => handleMouseDown('right')}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseLeave}
              sx={{ zIndex: 1200, right: 0, pr: 0, p: 0.5, mr: 0.5 }}
            >
              {menuStructure.length > 0 && <ArrowForwardIosIcon sx={{ color: 'white' }} />}
            </IconButton>}
            
              {/* <Tooltip
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
              </Tooltip> */}
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
                          onMouseLeave={handleClose}
                          id="composition-menu"
                          aria-labelledby="composition-button"
                        >
                          <MenuItem onClick={handleMenuItemClick(handleEmail)}>Email</MenuItem>
                          <MenuItem onClick={handleMenuItemClick(handleSupport)}>Support</MenuItem>
                          <MenuItem onClick={handleMenuItemClick(handleuserguide)}>User Guide</MenuItem>
                          <MenuItem onClick={handleMenuItemClick(handleKnowledgebase)}>
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
              {/* <Tooltip title={'Notifications'}>
                <IconButton
                  sx={{
                    color: 'white',
                    background: (theme) => alpha(theme.palette.common.white, 0.2)
                  }}
                >
                  <NotificationsTwoToneIcon />
                </IconButton>
              </Tooltip> */}
              <Tooltip title={'Logout'}>
                <IconButton
                  sx={{
                    marginRight: '10px',
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
    </Box>
  );
}
export default SubHeaderNavBar;