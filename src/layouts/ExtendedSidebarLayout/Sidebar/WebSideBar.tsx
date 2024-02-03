// SideBar.js
import InboxIcon from '@mui/icons-material/Inbox';
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Paper,
  Toolbar
} from '@mui/material';

function WebSideBar() {
  return (
    <Paper style={{ zIndex: 1200, height: '100%', backgroundColor: '' }}>
      <Toolbar />
      <Toolbar />

      <Box>
        <List>
          <ListItem disableGutters>
            <ListItemButton>
              <InboxIcon />

              <ListItemText primary={'Attendance'} />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton>
              <InboxIcon />

              <ListItemText primary={'view Attendance'} />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton>
              <InboxIcon />

              <ListItemText primary={'Homework'} />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    </Paper>
  );
}

export default WebSideBar;
