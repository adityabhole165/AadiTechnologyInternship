import React, { useState } from "react";
import {
  Box,
  Button,
  Grid,
  TextField,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { blue } from "@mui/material/colors";

const VideoUrlComponent: React.FC = () => {
  const [videoUrl, setVideoUrl] = useState("");
  const [title, setTitle] = useState("");
  const [videoList, setVideoList] = useState<{ url: string; title: string }[]>([]);

  const handleAddVideo = () => {
    if (!videoUrl.trim() || !title.trim()) {
      alert("Both Video URL and Title are required.");
      return;
    }

    // Add video URL and title to the list
    setVideoList([...videoList, { url: videoUrl, title }]);

    // Clear inputs
    setVideoUrl("");
    setTitle("");
  };

  return (
    <Box sx={{ pt: 2 }}>
      {/* Input Fields */}
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            label="Video URL"
            variant="outlined"
            fullWidth
            value={videoUrl}
            onChange={(e) => setVideoUrl(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
          <TextField
            label="Title"
            variant="outlined"
            fullWidth
            value={title}
            onChange={(e) => setTitle(e.target.value)}
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
                }}} >
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
            </TableRow>
          </TableHead>
          <TableBody>
            {videoList.map((video, index) => (
              <TableRow key={index}>
                <TableCell>{video.url}</TableCell>
                <TableCell>{video.title}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </Box>
  );
};

export default VideoUrlComponent;
