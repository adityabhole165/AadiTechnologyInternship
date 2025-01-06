import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditTwoTone from '@mui/icons-material/EditTwoTone';
import { Box, Grid, IconButton, Stack, Tooltip, Typography, alpha } from '@mui/material';
import { red } from '@mui/material/colors';

function TabulerCard({ item, clickEdit, clickDelete }) {
  return (
    <>
      <Box
        sx={{
          mb: 1,
          p: 1,
          background: (theme) => `${alpha(theme.palette.primary.main, 0.2)}`,
        }}
      >
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography sx={{wordBreak:'break-word'}}>{item.Text1}</Typography>
          <Grid item xs={2} md={2}></Grid>

          <Stack direction="row" gap={1}>
            <Tooltip title="Edit">
              <IconButton
                onClick={() => clickEdit(item.Id)}
                sx={{
                  color: '#223354',
                  '&:hover': {
                    color: '#223354',
                    cursor: 'pointer',
                  },
                }}
              >
                <EditTwoTone />
              </IconButton>
            </Tooltip>

            <Tooltip title="Delete">
              <IconButton
                onClick={() => clickDelete(item.Id)}
                sx={{
                  color: '#223354',
                  '&:hover': {
                    color: 'red',
                    backgroundColor: red[100],
                  },
                }}
              >
                <DeleteForeverIcon />
              </IconButton>
            </Tooltip>
          </Stack>
        </Stack>
      </Box>
    </>
  );
}

export default TabulerCard;
