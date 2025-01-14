import CancelIcon from '@mui/icons-material/Cancel';
import {
  Box,
  Button,
  Grid,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Tooltip
} from "@mui/material";
import { blue, red } from "@mui/material/colors";
import ErrorMessage1 from "src/libraries/ErrorMessages/ErrorMessage1";
const VideoUrlComponent = ({ handleDelete, UrlSourceError, handleAddVideo, setVideoUrl, setTitle, videoList, title, videoUrl }) => {
  // const handleDelete = (index: number) => {
  //   const updatedFileList = videoList.filter((_, fileIndex) => fileIndex !== index);
  //   setvideoList(updatedFileList); // Update the state
  // };

  return (
    <Box sx={{ pt: 2 }}>
      {/* Input Fields */}
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            label={<span>
              Video URL<span style={{ color: 'red' }}> *</span>
            </span>
            }
            variant="outlined"
            fullWidth
            value={videoUrl}
            onChange={(e) => setVideoUrl(e.target.value.slice(0, 50))}
          />
          <Box>
            <ErrorMessage1 Error={UrlSourceError}></ErrorMessage1>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
          <TextField
            label={<span>
              Title<span style={{ color: 'red' }}> *</span>
            </span>
            }
            variant="outlined"
            fullWidth
            value={title}
            onChange={(e) => setTitle(e.target.value.slice(0, 100))}
          />

        </Grid>
        <Grid item xs={12} sm={6} md={2}>
          <Button
            onClick={handleAddVideo}
            sx={{
              mt: 1, color: '#38548A',
              //  backgroundColor: grey[500],
              '&:hover': {
                color: '#38548A',
                backgroundColor: blue[100]
              }
            }} >
            Add Videos
          </Button>
        </Grid>
      </Grid>

      {/* Video List Table */}
      {videoList.length > 0 && (
        <Table sx={{ mt: 3, border: 1, borderColor: "grey.300" }}>
          <TableHead>
            <TableRow>
              <TableCell>
                <strong>Video URL</strong>
              </TableCell>
              <TableCell>
                <strong>Title</strong>
              </TableCell>
              <TableCell>
                <strong>Cancel</strong>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {videoList.map((video, index) => (
              <TableRow key={index}>
                <TableCell>{video.url}</TableCell>
                <TableCell>{video.title}</TableCell>
                <TableCell>
                  <IconButton
                    onClick={() => handleDelete(index)} // Call the delete handler

                    // onClick={() => handleDelete(user.UserId)}
                    sx={{
                      color: '#38548A	',
                      '&:hover': {
                        color: 'red',
                        backgroundColor: red[100]
                      }
                    }}
                  >
                    <Tooltip title="Cancel" >
                      <CancelIcon />
                    </Tooltip>
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </Box>
  );
};

export default VideoUrlComponent;
