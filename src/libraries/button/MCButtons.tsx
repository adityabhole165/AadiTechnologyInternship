import Grid from '@mui/material/Grid';
import MCButton from './MCButton';

const MCButtons = ({ activeTab, clickTab, MarkAsRead }) => {
  return (
    <div>
      <Grid
        container
        spacing={{ xs: 1, sm: 0 }}
        direction={{ xs: 'row', sm: 'column' }}
      >
        <Grid item xs={3} sx={{ textAlign: 'center' }}>
          <MCButton
            ButtonType="Inbox"
            clickTab={clickTab}
            activeTab={activeTab}
            MarkAsRead={MarkAsRead}
          ></MCButton>
        </Grid>
        <Grid item xs={3} sx={{ textAlign: 'center' }}>
          <MCButton
            ButtonType="Sent"
            clickTab={clickTab}
            activeTab={activeTab}
            MarkAsRead={MarkAsRead}
          ></MCButton>
        </Grid>
        <Grid item xs={3} sx={{ textAlign: 'center' }}>
          <MCButton
            ButtonType="Trash"
            clickTab={clickTab}
            activeTab={activeTab}
            MarkAsRead={MarkAsRead}
          ></MCButton>
        </Grid>
        <Grid item xs={3} sx={{ textAlign: 'center' }}>
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
