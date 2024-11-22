import { QuestionMark } from '@mui/icons-material';
import SaveIcon from '@mui/icons-material/Save';
import {
  Box,
  Grid,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Tooltip
} from '@mui/material';
import { green, grey, red } from '@mui/material/colors';

import React, { useState } from 'react';
import CommonPageHeader from '../CommonPageHeader';
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from "@mui/icons-material/Edit";


interface Video {
  id: number;
  url: string;
  title: string;
}

const ViewVideoGallery = () => {
  const [data, setData] = useState<Video[]>([
    { id: 1, url: 'https://youtu.be/6fc2ahfyYQ0', title: 'Sasa' },
  ]);

  const [formData, setFormData] = useState<Pick<Video, 'url' | 'title'>>({
    url: '',
    title: '',
  });
  const [editId, setEditId] = useState<number | null>(null);

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle edit
  const handleEdit = (id: number) => {
    const selectedData = data.find((item) => item.id === id);
    if (selectedData) {
      setFormData({ url: selectedData.url, title: selectedData.title });
      setEditId(id); // Switch to edit mode
    }
  };

  // Handle update
  const handleUpdate = () => {
    if (editId !== null) {
      setData((prevData) =>
        prevData.map((item) =>
          item.id === editId ? { ...item, ...formData } : item
        )
      );
      setFormData({ url: '', title: '' });
      setEditId(null); // Switch back to add mode
    }
  };

  // Handle add
  const handleAdd = () => {
    const newId = data.length ? Math.max(...data.map((item) => item.id)) + 1 : 1;
    setData([...data, { id: newId, url: formData.url, title: formData.title }]);
    setFormData({ url: '', title: '' });
  };

  // Handle delete
  const handleDelete = (id: number) => {
    setData((prevData) => prevData.filter((item) => item.id !== id));
  };

  // Handle cancel
  const handleCancel = () => {
    setFormData({ url: '', title: '' });
    setEditId(null); // Switch back to add mode
  };

  return (
    <Box px={2}>
      <CommonPageHeader
        navLinks={[
          {
            title: 'Photo Video Gallery',
            path: '/extended-sidebar/Teacher/PhotoVideoGalleryBaseScreen',
          },
          { title: 'View Video Gallery', path: '' },
        ]}
        rightActions={
          <>
            <Tooltip title="Add / Edit / Delete videos of selected gallery.">
              <IconButton
                sx={{
                  color: 'white',
                  backgroundColor: grey[500],
                  '&:hover': {
                    backgroundColor: grey[600],
                  },
                }}
              >
                <QuestionMark />
              </IconButton>
            </Tooltip>

            {editId ? (
              <>
                <Tooltip title={'Update'}>
                  <IconButton
                    sx={{
                      color: 'white',
                      backgroundColor: green[500],
                      '&:hover': {
                        backgroundColor: green[600],
                      },
                    }}
                    onClick={handleUpdate}
                    disabled={!formData.url || !formData.title}
                  >
                    <SaveIcon />
                  </IconButton>
                </Tooltip>
              </>
            ) : (
              <Tooltip title={'Save'}>
                <IconButton
                  sx={{
                    color: 'white',
                    backgroundColor: green[500],
                    '&:hover': {
                      backgroundColor: green[600],
                    },
                  }}
                  onClick={handleAdd}
                // disabled={!formData.url || !formData.title}
                >
                  <SaveIcon />
                </IconButton>
              </Tooltip>
            )}

          </>}
      />
      <Box sx={{ backgroundColor: 'white', p: 2 }}>
        {/* Form Section */}
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Gallery Name"
              value="Video Test111"
              InputProps={{ readOnly: true }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="URL Source"
              value="YouTube"
              InputProps={{ readOnly: true }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label={
                <span>
                  URL <span style={{ color: 'red' }}>*</span>
                </span>
              }
              name="url"
              value={formData.url}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label={
                <span>
                  Title <span style={{ color: 'red' }}>*</span>
                </span>
              }
              name="title"
              value={formData.title}
              onChange={handleChange}
            />
          </Grid>
          <Grid item>

          </Grid>
        </Grid>

        {/* Table Section */}
        <TableContainer component={Paper} sx={{ mt: 4 }}>
          <Table aria-label="simple table"
            sx={{
              border: (theme) => `1px solid ${theme.palette.grey[300]}`,
              overflow: 'hidden'
            }}>
            <TableHead>
              <TableRow sx={{
                background: (theme) => theme.palette.secondary.main,
                color: (theme) => theme.palette.common.white,
              }}>
                <TableCell sx={{ textTransform: 'capitalize', color: 'white', py: 1.5 }}>Comments</TableCell>
                <TableCell align="center" sx={{ textTransform: 'capitalize', color: 'white', py: 1.5 }}>View</TableCell>
                <TableCell align="center" sx={{ textTransform: 'capitalize', color: 'white', py:  1.5 }}>Edit</TableCell>
                <TableCell align="center" sx={{ textTransform: 'capitalize', color: 'white', py:  1.5 }}>Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((item) => (
                <TableRow key={item.id}>
                  <TableCell sx={{ textTransform: 'capitalize', py:  0.5,  }}>{item.title}</TableCell>
                  <TableCell sx={{ textTransform: 'capitalize', py:  0.5, textAlign: 'center', }}>
                    <Tooltip title={"View"}>
                      <IconButton
                        // onClick={ViewPhotoFilePage}
                        color="primary"
                      >
                        <VisibilityIcon />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                  <TableCell sx={{ textTransform: 'capitalize', py: 0.5, textAlign: 'center', }}>
                  <Tooltip title={"Edit"}>
                    <IconButton
                      color="primary"
                      onClick={() => handleEdit(item.id)}
                    >
                      <EditIcon />
                    </IconButton>
                    </Tooltip>
                  </TableCell>
                  <TableCell sx={{ textTransform: 'capitalize', py: 0.5, textAlign: 'center', }}>
                  <Tooltip title={"Delete"}>
                    <IconButton
                      sx={{
                        color: "primary",
                        "&:hover": {
                            color: "red",
                            backgroundColor: red[100],
                        },
                    }}
                      onClick={() => handleDelete(item.id)}
                    >
                      <DeleteForeverIcon />
                    </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};

export default ViewVideoGallery;
