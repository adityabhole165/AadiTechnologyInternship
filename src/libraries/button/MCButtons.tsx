import Grid from '@mui/material/Grid';
import MCButton from './MCButton';

const MCButtons = ({ activeTab, clickTab, MarkAsRead }) => {
  return (
    <div>
      <Grid
         spacing={{ xs: 1, sm: 0 }}
         direction={{ xs: 'row', sm: 'column' }}
            
      >
        <Grid item xs={3} sx={{ textAlign: 'center', color:'#38548A' }}>
          <MCButton
            ButtonType="Inbox"
            clickTab={clickTab}
            activeTab={activeTab}
            MarkAsRead={MarkAsRead}
          ></MCButton>
        </Grid>
        <Grid item xs={3} sx={{ textAlign: 'center', color:'#38548A' }}>
          <MCButton
            ButtonType="Sent"
            clickTab={clickTab}
            activeTab={activeTab}
            MarkAsRead={MarkAsRead}
          ></MCButton>
        </Grid>
        <Grid item xs={3} sx={{ textAlign: 'center', color:'#38548A' }}>
          <MCButton
            ButtonType="Trash"
            clickTab={clickTab}
            activeTab={activeTab}
            MarkAsRead={MarkAsRead}
          ></MCButton>
        </Grid>
        <Grid item xs={3} sx={{ textAlign: 'center', color:'#38548A' }}>
          <MCButton
            ButtonType="Draft"
            clickTab={clickTab}
            activeTab={activeTab}
            MarkAsRead={MarkAsRead}
          ></MCButton>
        </Grid>
      </Grid>
    </div>
  );
};
export default MCButtons;
