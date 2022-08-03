import { useContext, useRef, useState } from 'react';

import {
  Box,
  alpha,
  Stack,
  lighten,
  Divider,
  IconButton,
  Tooltip,
  styled,
  useTheme,
  Avatar,
  Popover,
  Typography,
  List,
  ListItem,
  ListItemText,
  Button
} from '@mui/material';
import MenuTwoToneIcon from '@mui/icons-material/MenuTwoTone';
import { SidebarContext } from 'src/contexts/SidebarContext';
import CloseTwoToneIcon from '@mui/icons-material/CloseTwoTone';
import NotificationsIcon from '@mui/icons-material/Notifications';
import HeaderButtons from './Buttons';
import HeaderUserbox from './Userbox';
import ThemeSettings from 'src/layouts/Components/ThemeSettings';
import { Styles } from 'src/assets/style/student-style'
import { useNavigate } from 'react-router';
import { NavLink } from 'react-router-dom';
import UnfoldMoreTwoToneIcon from '@mui/icons-material/UnfoldMoreTwoTone';
import AccountBoxTwoToneIcon from '@mui/icons-material/AccountBoxTwoTone';
import LockOpenTwoToneIcon from '@mui/icons-material/LockOpenTwoTone';
import PowerSettingsNewTwoToneIcon from '@mui/icons-material/PowerSettingsNewTwoTone';
import { useTranslation } from 'react-i18next';

const HeaderWrapper = styled(Box)(
  ({ theme }) => `
        height: ${theme.header.height};
        color: ${theme.header.textColor};
        padding: ${theme.spacing(0, 2)};
        right: 0;
        z-index: 6;
        background-color: ${alpha(theme.header.background, 0.95)};
        backdrop-filter: blur(3px);
        position: fixed;
        justify-content: space-between;
        width: 100%;
        @media (min-width: ${theme.breakpoints.values.lg}px) {
             left: 0px;
            width: auto;
        }
`
);

const MenuUserBox = styled(Box)(
  ({ theme }) => `
    background: ${theme.colors.alpha.black[5]};
    padding: ${theme.spacing(2)};
`
);

const UserBoxText = styled(Box)(
  ({ theme }) => `
    text-align: left;
    padding-left: ${theme.spacing(1)};
`
);

const UserBoxLabel = styled(Typography)(
  ({ theme }) => `
    font-weight: ${theme.typography.fontWeightBold};
    color: ${theme.sidebar.menuItemColor};
    display: block;

    &.popoverTypo {
      color: ${theme.palette.secondary.main};
    }
`
);

const UserBoxDescription = styled(Typography)(
  ({ theme }) => `
    color: ${alpha(theme.sidebar.menuItemColor, 0.6)};

    &.popoverTypo {
      color: ${theme.palette.secondary.light};
    }
`
);


const img_src = localStorage.getItem('SiteURL') + "/images/" + localStorage.getItem('SchoolName')?.split(' ').join('%20') + "_logo.png";


function Header() {
  const { sidebarToggle, toggleSidebar } = useContext(SidebarContext);
  const theme = useTheme();
  const classes = Styles();

  const Name = sessionStorage.getItem("StudentName");
  const Class = sessionStorage.getItem("Class");
  const RollNo = sessionStorage.getItem("RollNo");
  const studnetprofile = sessionStorage.getItem("PhotoFilePath")

  const { t }: { t: any } = useTranslation();
  const navigate = useNavigate();
  const ref = useRef<any>(null);
  const [isOpen, setOpen] = useState<boolean>(false);

  const handleOpen = (): void => {
    setOpen(true);
  };

  const handleClose = (): void => {
    setOpen(false);
  };

  const handleLogout = async (): Promise<void> => {
    try {
      handleClose();
      //localStorage.clear();
      sessionStorage.clear();
      localStorage.removeItem("auth")
      navigate('/');
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <HeaderWrapper
      display="flex"
      alignItems="center"
      sx={{
        boxShadow:
          theme.palette.mode === 'dark'
            ? '0 1px 0 ' +
            alpha(lighten(theme.colors.primary.main, 0.7), 0.15) +
            ', 0px 2px 8px -3px rgba(0, 0, 0, 0.2), 0px 5px 22px -4px rgba(0, 0, 0, .1)'
            : '0px 2px 8px -3px ' +
            alpha(theme.colors.alpha.black[100], 0.2) +
            ', 0px 5px 22px -4px ' +
            alpha(theme.colors.alpha.black[100], 0.1)
      }}
    >
      <Stack
        direction="row"
        divider={<Divider orientation="vertical" flexItem />}
        alignItems="center"
        spacing={2}
      >
        <img src={img_src} className={classes.smalllogo} />
      </Stack>
      <Stack direction="row" spacing={1}>
        <IconButton
          size="small"
          sx={{
            width: 35, 
            height: 35 ,
            '&:hover': {
              color: `${theme.colors.alpha.trueWhite[100]}`,
              background: `${alpha(theme.colors.alpha.trueWhite[100], 0.2)}`
            }
          }}
          ref={ref}
          onClick={handleOpen}
        >
          <Avatar alt="user.name" src={`data:image/png;base64,${studnetprofile}`}  sx={{ backgroundColor: "#90caf9", width: 35, height: 35}} variant="rounded" aria-label="add" />
        </IconButton>
        <Popover
          disableScrollLock
          anchorEl={ref.current}
          onClose={handleClose}
          open={isOpen}
          anchorOrigin={{
            vertical: 'center',
            horizontal: 'center'
          }}
          transformOrigin={{
            vertical: 'center',
            horizontal: 'center'
          }}
        >
          <MenuUserBox
            sx={{
              minWidth: 600
            }}
            display="flex"
          >
            <Avatar variant="rounded" alt="user.name" src={`data:image/png;base64,${studnetprofile}`} />
            <UserBoxText>
              <UserBoxLabel className="popoverTypo" variant="h4">
                {Name}
              </UserBoxLabel>
              {
                (RollNo != undefined ? <>

                  <UserBoxDescription className="popoverTypo" variant="body2">
                    {Class}
                  </UserBoxDescription> </>
                  : null)
              }

            </UserBoxText>
          </MenuUserBox>
          <Divider
            sx={{
              mb: 0
            }}
          />
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
              to={"/extended-sidebar/Student/Profile"}
              component={NavLink}
            >
              <AccountBoxTwoToneIcon fontSize="small" sx={{color:"#053082"}}/>
              <ListItemText primary={<Typography sx={{color:"blue",fontWeight:"bold"}}  >Profile</Typography>} />
            </ListItem>
            <ListItem
              onClick={() => {
                handleClose();
              }}
              button
              to={"/extended-sidebar/common/changePassword"}
              component={NavLink}
            >
              <LockOpenTwoToneIcon fontSize="small" sx={{color:"#053082"}}/>
              <ListItemText  primary={<Typography sx={{color:"blue",fontWeight:"bold"}}  >Change Password</Typography>} />
            </ListItem>
            {/* <ListItem
            onClick={() => {
              handleClose();
            }}
            button
            to={`/${
              location.pathname.split('/')[1]
            }/applications/projects-board`}
            component={NavLink}
          >
            <AccountTreeTwoToneIcon fontSize="small" />
            <ListItemText primary={t('Projects')} />
          </ListItem> */}
          </List>
          <Divider />
          <Box m={1}>
            <Button color="primary" fullWidth onClick={handleLogout}>
              <PowerSettingsNewTwoToneIcon fontSize="small"
                sx={{
                  mr: 1,
                  fontWeight:"bold",
                  color:"#053082"
                }}
              />
              <Typography sx={{color:"blue",fontWeight:"bold"}}  >Sign Out</Typography>
            </Button>
          </Box>
        </Popover>
        <Avatar sx={{ backgroundColor: "#90caf9", width: 35, height: 35 }} variant="rounded" aria-label="add">
          <NotificationsIcon fontSize="medium" />
        </Avatar>
        <ThemeSettings />
      </Stack>

    </HeaderWrapper>
  );
}

export default Header;
