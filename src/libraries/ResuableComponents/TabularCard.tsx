import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { Box, Grid, Stack, Typography, alpha } from '@mui/material';
import { red } from '@mui/material/colors';

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
            <EditOutlinedIcon
              style={{ color: '#223354 ' }}
              onClick={() => clickEdit(item.Id)}
            />
            <DeleteForeverIcon
              sx={{
                color:'#223354',
                 //  backgroundColor: grey[500],
                  '&:hover': {
                color:'red',
                 backgroundColor: red[100]
                  }}}
              onClick={() => clickDelete(item.Id)}
            />
          </Stack>
        </Stack>
      </Box>
    </div>
  );
}

export default TabulerCard;
