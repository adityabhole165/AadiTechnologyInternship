import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Card, Grid, Typography } from '@mui/material';

function TabulerCard({ item, clickEdit, clickDelete }) {
  return (
    <div>
      <Card sx={{ mb: 1 }}>
        <Grid container style={{ display: 'flex', alignItems: 'center' }}>
          <Grid item xs={8} md={2}>
            <Typography>{item.Text1}</Typography>
          </Grid>

          <Grid item xs={2} md={2}>
            <EditIcon
              style={{ color: 'black ' }}
              onClick={() => clickEdit(item.Id)}
            />
          </Grid>

          <Grid item xs={2} md={2}>
            <DeleteIcon
              style={{ color: 'Red ' }}
              onClick={() => clickDelete(item.Id)}
            />
          </Grid>
        </Grid>
      </Card>
    </div>
  );
}

export default TabulerCard;
