import { useEffect, useRef, useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';

import AccountBoxTwoToneIcon from '@mui/icons-material/AccountBoxTwoTone';
import LockOpenTwoToneIcon from '@mui/icons-material/LockOpenTwoTone';
import PowerSettingsNewTwoToneIcon from '@mui/icons-material/PowerSettingsNewTwoTone';
import UnfoldMoreTwoToneIcon from '@mui/icons-material/UnfoldMoreTwoTone';
import {
  Avatar,
  Box,
  Button,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Popover,
  Typography,
  alpha,
  styled,
  useTheme
} from '@mui/material';
import { useTranslation } from 'react-i18next';

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

function SidebarTopSection() {
  const { t }: { t: any } = useTranslation();
  const theme = useTheme();

  const Name = sessionStorage.getItem('StudentName');
  const Class = sessionStorage.getItem('Class');
  const RollNo = sessionStorage.getItem('RollNo');
  const studnetprofile = sessionStorage.getItem('PhotoFilePath');

  const navigate = useNavigate();
  const location = useLocation();

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
      localStorage.removeItem('auth');
      sessionStorage.clear();
      navigate('/');
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    // alert("call api")
  });

  return (
    <Box
      sx={{
        textAlign: 'center',
        mx: 2,
        pt: 1,
        position: 'relative'
      }}
    >
      <Avatar
        sx={{
          width: 68,
          height: 68,
          mb: 2,
          mx: 'auto'
        }}
        alt="user.name"
        src={`data:image/png;base64,${studnetprofile}`}
      />

      <Typography
        variant="h4"
        sx={{
          color: `${theme.colors.alpha.trueWhite[100]}`
        }}
      >
        {Name}
      </Typography>
      {RollNo != undefined ? (
        <>
          <Typography
            variant="subtitle1"
            sx={{
              color: `${theme.colors.alpha.trueWhite[100]}`
            }}
          >
            Class : {Class}
          </Typography>
          <Typography
            variant="subtitle1"
            sx={{
              color: `${theme.colors.alpha.trueWhite[100]}`
            }}
          >
            Roll No. : {RollNo}
          </Typography>
        </>
      ) : null}

      <IconButton
        size="small"
        sx={{
          position: 'absolute',
          right: theme.spacing(0),
          color: `${theme.colors.alpha.trueWhite[70]}`,
          top: theme.spacing(0),
          background: `${theme.colors.alpha.trueWhite[10]}`,

          '&:hover': {
            color: `${theme.colors.alpha.trueWhite[100]}`,
            background: `${alpha(theme.colors.alpha.trueWhite[100], 0.2)}`
          }
        }}
        ref={ref}
        onClick={handleOpen}
      >
        <UnfoldMoreTwoToneIcon fontSize="small" />
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
            minWidth: 210
          }}
          display="flex"
        >
          <Avatar
            variant="rounded"
            alt="user.name"
            src={`data:image/png;base64,${studnetprofile}`}
          />
          <UserBoxText>
            <UserBoxLabel className="popoverTypo" variant="body1">
              {Name}
            </UserBoxLabel>
            {RollNo != undefined ? (
              <>
                <UserBoxDescription className="popoverTypo" variant="body2">
                  {Class}
                </UserBoxDescription>{' '}
              </>
            ) : null}
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
            to={'/extended-sidebar/Student/Profile'}
            component={NavLink}
          >
            <AccountBoxTwoToneIcon fontSize="small" sx={{ color: 'blue' }} />
            <ListItemText sx={{ color: 'blue' }} primary={t('Profile')} />
          </ListItem>
          <ListItem
            onClick={() => {
              handleClose();
            }}
            button
            to={'/extended-sidebar/Student/changePassword'}
            component={NavLink}
          >
            <LockOpenTwoToneIcon fontSize="small" sx={{ color: 'blue' }} />
            <ListItemText
              sx={{ color: 'blue' }}
              primary={t('Change Password')}
            />
          </ListItem>
        </List>
        <Divider />
        <Box m={1}>
          <Button color="primary" fullWidth onClick={handleLogout}>
            <PowerSettingsNewTwoToneIcon
              fontSize="small"
              sx={{
                mr: 1
              }}
            />
            {t('Sign out')}
          </Button>
        </Box>
      </Popover>
    </Box>
  );
}

export default SidebarTopSection;
