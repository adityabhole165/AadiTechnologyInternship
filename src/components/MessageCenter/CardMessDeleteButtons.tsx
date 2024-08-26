import { Avatar, Box, Button, Grid } from '@mui/material';

import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import ReplayIcon from '@mui/icons-material/Replay';
// import { Button } from 'src/libraries/styled/ButtonStyle';
import { blue, green, grey, red } from '@mui/material/colors';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import ClearAllIcon from '@mui/icons-material/ClearAll';
import RotateLeftIcon from '@mui/icons-material/RotateLeft';
import RestoreFromTrashIcon from '@mui/icons-material/RestoreFromTrash';
import { MarkAsReadMessage } from 'src/libraries/styled/CommonStyle';
import MarkunreadIcon from '@mui/icons-material/Markunread';
import MarkEmailReadIcon from '@mui/icons-material/MarkEmailRead';

function CardMessDeleteButtons({
  TrashDelete,
  clickReset,
  activeTab,
  ConfirmUndelete,
  DeletePermanent,
  clickDelete
}) {
  function clickReadUnread(arg0: string) {
    throw new Error('Function not implemented.');
  }

  return (
    <Box>
      <Grid  gap={1} sx={{ p:1, display:'flex', backgroundColor:'white', borderRadius:'10px'}}>
        {activeTab == 'Sent' ? (
         
         <Grid item xs={5.5} sm={6} md={0} lg={2}>
            <Button
              onClick={activeTab == 'Sent' && DeletePermanent}
               endIcon={<ClearAllIcon />}
               fullWidth
              sx={{
                color:'#38548A',
                width:'210px',
                //  backgroundColor: red[100],
                  '&:hover': {
                color:'red',
                 backgroundColor: red[100]
                  }}}
            >
              Delete From Everyone
            </Button>
          </Grid>
        ) : (
          activeTab == 'Trash' && (
            <Grid item xs={5.5} sm={6} md={3} lg={1.5}>
              <Button
                onClick={ConfirmUndelete}
                endIcon={
                //   <Avatar
                //   sx={{
                //     color:'green',
                //     //  backgroundColor: red[100],
                //       '&:hover': {
                //     color:'green',
                //      backgroundColor: green[100]
                //       }}}
                //     src={'/imges/unDelete.png'}
                //   />
                // 
                <RestoreFromTrashIcon />}
                fullWidth
                sx={{  borderRadius:'5px', color:'#38548A'}}
              >
                Un-Delete
              </Button>
            </Grid>
          )
        )}

       <Grid item xs={3.5} sm={3} md={1.5} lg={1} pl={1}>
          <Button
            fullWidth
            // color='#38548A'
            onClick={activeTab == 'Trash' ? TrashDelete : clickDelete }
            endIcon={
            <DeleteForeverIcon />}
            sx={{
              color:'#38548A',
                '&:hover': {
              color:'red',
               backgroundColor: red[100]
                }}}
           >
            Delete
            
          </Button>
        </Grid>
        <Grid item xs={3} sm={3} md={1.5} lg={1}>
          <Button
            fullWidth
            onClick={clickReset}
            endIcon={<RotateLeftIcon />}
            sx={{
              color:'#38548A',
                '&:hover': {
              color:'blue',
               backgroundColor: blue[100]
                }}}
          >
            Reset
          </Button>
        </Grid>
        <Grid >
                  {activeTab == 'Inbox' && (
                    <Grid  
                    //  sx={MarkAsReadMessage} bgcolor={"white"} pt={1} borderRadius={"10px"}
                     >
                      <Button
                      endIcon={<MarkunreadIcon />}
                        onClick={() => {
                          clickReadUnread('Unread');
                        }}
                        sx={{
                          color:'#38548A',
                            '&:hover': {
                          color:'blue',
                           backgroundColor: blue[100]
                            }}}
                      >
                        {' '}
                        Mark as Unread{' '}
                      </Button>
                      <Button
                       endIcon={<MarkEmailReadIcon />}
                        onClick={() => {
                          clickReadUnread('Read');
                        }}
                        sx={{
                          color:'#38548A',
                            '&:hover': {
                          color:'green',  
                           backgroundColor: green[100]
                            }}}
                      >
                        {' '}
                        Mark as Read
                      </Button>
                    </Grid>
                  )}
                  </Grid>
      </Grid>
      
    </Box>
  );
}

export default CardMessDeleteButtons;
