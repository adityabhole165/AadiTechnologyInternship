import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Box, Grid, Stack, Typography, alpha } from '@mui/material';

function TabulerCard({ item, clickEdit, clickDelete }) {
  return (
    <div>
      <Box
        sx={{
          mb: 1,
          p: 1,
          background: (theme) => `${alpha(theme.palette.primary.main, 0.2)}`
        }}
      >
        <Stack
          direction={'row'}
          alignItems={'center'}
          justifyContent={'space-between'}
        >
          <Typography>{item.Text1}</Typography>
          <Grid item xs={2} md={2}></Grid>

          <Stack direction={'row'} gap={1}>
            <EditIcon
              style={{ color: 'black ' }}
              onClick={() => clickEdit(item.Id)}
            />
            <DeleteIcon
              style={{ color: 'Red ' }}
              onClick={() => clickDelete(item.Id)}
            />
          </Stack>
        </Stack>
      </Box>
    </div>
  );
}

export default TabulerCard;
