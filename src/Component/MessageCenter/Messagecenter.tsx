import React from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import SearchIcon from '@mui/icons-material/Search';
import InboxIcon from '@mui/icons-material/Inbox';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import { BrowserRouter, Link } from 'react-router-dom';
import { Styles } from 'src/assets/style/student-style';
import PageHeader from 'src/UI_Library/heading/PageHeader';
import Search from 'src/Component/MessageCenter/Search';
import { useTheme } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';

import { Outlet } from 'react-router-dom';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary
}));

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="down" ref={ref} {...props} />;
});

function MessaageCenter() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const theme = useTheme();

  const classes = Styles();
  const [state, setState] = React.useState(false);

  const pathname = window.location.pathname;
  const pageName = pathname.replace(
    '/extended-sidebar/MessageCenter/msgCenter/',
    ''
  );

  const SearchData = (e) => {
    console.log(e);
  }

  return (
    <>
      <Container>
        <PageHeader heading={'Message Center'} subheading={''} />
        <Box sx={{ width: 'auto', marginBottom: '10px' }}>
          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            
            <Grid item xs={3}>
              <Link
                to="/extended-sidebar/MessageCenter/msgCenter/Inbox"
                className={classes.TextDecoration}
              >
                <Item
                  sx={
                    pageName == '/extended-sidebar/MessageCenter/msgCenter' ||
                    pageName == 'Inbox'
                      ? {
                          fontSize: '10px',
                          backgroundColor: 'gray',
                          color: 'white'
                        }
                      : { fontSize: '10px' }
                  }
                >
                  <InboxIcon />
                  <br />
                  <b>Inbox</b>
                </Item>
              </Link>
            </Grid>

            <Grid item xs={3}>
              <Link
                to="/extended-sidebar/MessageCenter/msgCenter/Sent"
                className={classes.TextDecoration}
              >
                <Item
                  sx={
                    pageName == 'Sent'
                      ? {
                          fontSize: '10px',
                          backgroundColor: 'gray',
                          color: 'white'
                        }
                      : { fontSize: '10px' }
                  }
                >
                  <SendIcon />
                  <br />
                  <b>Sent</b>
                </Item>
              </Link>
            </Grid>

            <Grid item xs={3}>
              <Link
                to="/extended-sidebar/MessageCenter/msgCenter/Trash"
                className={classes.TextDecoration}
              >
                <Item
                  sx={
                    pageName == 'Trash'
                      ? {
                          fontSize: '10px',
                          backgroundColor: 'gray',
                          color: 'white'
                        }
                      : { fontSize: '10px' }
                  }
                >
                  <DeleteIcon />
                  <br />
                  <b>Trash</b>
                </Item>
              </Link>
            </Grid>

            <Grid item xs={3}>
              <Item
                onClick={handleClickOpen}
                sx={
                  pageName == 'Search'
                    ? {
                        fontSize: '10px',
                        backgroundColor: 'gray',
                        color: 'white'
                      }
                    : { fontSize: '10px' }
                }
              >
                <SearchIcon />
                <br />
                <b>Search</b>
              </Item>

              <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
                sx={{ mt: 10 }}
              >
                <Search searchData={SearchData}/>
              </Dialog>
            </Grid>

            <Grid
              item
              xs={3}
              sx={{ position: 'fixed',  bottom: '90px',zIndex:'2',width:'21vw',marginLeft:'10px' }}
            >
              <Link
                to="/extended-sidebar/MessageCenter/Compose"
                className={classes.TextDecoration}
              >
                <Item sx={{ fontSize: '10px', marginLeft: '-7px' }}>
                  <AddCircleIcon />
                  <br />
                  <b>Compose</b>
                </Item>
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Container>
      <Box
        display="block"
        sx={{ position: 'absolute', width: '100%', paddingBottom: '80px' }}
      >
        <Outlet />
      </Box>
    </>
  );
}

export default MessaageCenter;
