import { Avatar, Button, Grid } from '@mui/material';

import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import ReplayIcon from '@mui/icons-material/Replay';
// import { Button } from 'src/libraries/styled/ButtonStyle';
import { green, red } from '@mui/material/colors';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import ClearAllIcon from '@mui/icons-material/ClearAll';
import RotateLeftIcon from '@mui/icons-material/RotateLeft';
function CardMessDeleteButtons({
  TrashDelete,
  clickReset,
  activeTab,
  ConfirmUndelete,
  DeletePermanent,
  clickDelete
}) {
  return (
    <div>
      <Grid  gap={1} sx={{ p:2, display:'flex', backgroundColor:'white', borderRadius:'10px'}}>
        {activeTab == 'Sent' ? (
         
         <Grid item xs={5.5} sm={6} md={3} lg={2}>
            <Button
              onClick={activeTab == 'Sent' && DeletePermanent}
               endIcon={<ClearAllIcon />}
               fullWidth
              sx={{
                color:'red',
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
                // endIcon={
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
                // }
                fullWidth
              >
                Un-Delete
              </Button>
            </Grid>
          )
        )}

        <Grid item xs={3.5} sm={3} md={1.5} lg={1}>
          <Button
            fullWidth
            color={'error'}
            onClick={activeTab == 'Trash' ? TrashDelete : clickDelete}
            endIcon={
            //   <Avatar
            //     sx={{
            //       color:'red',
            //       width: 20,
            //       height: 20,
            //       ml: '-8px',
            //       filter: ' brightness(100%) invert(1) '
            //     }}
            //     src={'/imges/delete.png'}
            //   />
            <DeleteForeverIcon />}
           >
            Delete
            
          </Button>
        </Grid>
        <Grid item xs={3} sm={3} md={1.5} lg={1}>
          <Button
            fullWidth
            onClick={clickReset}
            endIcon={<RotateLeftIcon />}
            color="secondary"
          >
            Reset
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}

export default CardMessDeleteButtons;
