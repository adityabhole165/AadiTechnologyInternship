import { Typography, Box } from '@mui/material';
import { useTheme } from '@mui/material';

function Note({ NoteDetail }) {
  const theme = useTheme();
  return (
    <Box sx={{ background: theme.colors.gradients.HighlightedlistColor,
      borderRadius: '6px', p:.5
     }}>
      <Typography variant="h6"><b>Note:</b></Typography>
      {NoteDetail && NoteDetail.length > 0 ? (
        <ul style={{ paddingLeft: '20px', margin: '0' }}>
          {NoteDetail.map((elm, i) => (
            <li key={i} style={{ marginBottom: '8px' }}>
              <Typography variant="body1">{elm}</Typography>
            </li>
          ))}
        </ul>
      ) : null}
    </Box>
  );
}

export default Note;