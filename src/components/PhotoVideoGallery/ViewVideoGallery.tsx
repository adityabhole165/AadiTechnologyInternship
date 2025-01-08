import { QuestionMark } from '@mui/icons-material';
import SaveIcon from '@mui/icons-material/Save';
import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
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
  Tooltip,
  Typography
} from '@mui/material';
import { green, grey, red } from '@mui/material/colors';

import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from "@mui/icons-material/Edit";
import SaveAsIcon from '@mui/icons-material/SaveAs';
import VisibilityIcon from "@mui/icons-material/Visibility";
import { ClearIcon } from '@mui/x-date-pickers';
import React, { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { toast } from 'react-toastify';
import { AlertContext } from 'src/contexts/AlertContext';
import { IDeleteVideogallaryDetails, IGetSaveUpdateVideoBody, IGetViewVideoListBody } from 'src/interfaces/VideoGalleryInterface/IVideoGallery';
import { DeleteViewVideoGallary, getSaveVideo, getViewVideoDetails, resetDeleteViewVideoGallary, resetSaveUpdateVideo } from 'src/requests/RVideoGallery/ReqVideo';
import { RootState } from 'src/store';
import { decodeURL } from '../Common/Util';
import CommonPageHeader from '../CommonPageHeader';



interface Video {
  id: number;
  url: string;
  title: string;
}

const ViewVideoGallery = () => {
  const [data, setData] = useState<Video[]>([
    { id: 1, url: 'https://www.youtube.com/embed/6fc2ahfyYQ0', title: 'Sasa' },
    { id: 2, url: 'https://www.youtube.com/embed/6fc2ahfyYQ0', title: 'Saaasa' },

  ]);

  let {
    Video_Id,
    videoName,
    URLSource
  } = useParams();


  console.log(decodeURL(Video_Id), decodeURL(videoName), decodeURL(URLSource), "1234567")
  Video_Id = decodeURL(Video_Id);
  videoName = decodeURL(videoName);
  URLSource = decodeURL(URLSource);

  const dispatch = useDispatch();
  const [formData, setFormData] = useState<Pick<Video, 'url' | 'title'>>({
    url: '',
    title: '',
  });
  const [editId, setEditId] = useState<number | null>(null);
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [dialogVideo, setDialogVideo] = useState<string>('');
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [videoDetailsId, setVideoDetailsId] = useState('');
  const { showAlert, closeAlert } = useContext(AlertContext);

  const asSchoolId = Number(localStorage.getItem('localSchoolId'));
  const asUserId = Number(localStorage.getItem('UserId'));
  const ViewVideoDetails = useSelector(
    (state: RootState) => state.VideoNew.ISGetViewVideoDetails
  );
  const SaveUpdateVideoDetails = useSelector(
    (state: RootState) => state.VideoNew.SaveUpdateVideo
  );
  const deleteVideodetailsMsg = useSelector(
    (state: RootState) => state.VideoNew.DeleteVideoGallary
  );


  const ViewVideoListBody: IGetViewVideoListBody = {
    asSchoolId: Number(asSchoolId),
    asVideoId: Number(Video_Id),
    asSubjectId: 0
  };

  useEffect(() => {
    dispatch(getViewVideoDetails(ViewVideoListBody));
  }, []);

  useEffect(() => {
    if (ViewVideoDetails && ViewVideoDetails.length > 0) {
      setVideoDetailsId(ViewVideoDetails[0].VideoDetailsId);
    }
  }, [ViewVideoDetails]);

  const deleteRow = (id) => {
    const DeleteLeaveBody: IDeleteVideogallaryDetails = {
      asSchoolId: Number(asSchoolId),
      asVideoId: Number(Video_Id),
      asIsDeleted: 1,
      asUpdateDate: new Date().toISOString().split('T')[0],
      asId: Number(id),
      asUpdatedById: Number(asUserId), // userId for delete 
    };
    showAlert({
      title: 'Please Confirm',
      message:
        'Are you sure you want to delete this video?',
      variant: 'warning',
      confirmButtonText: 'Confirm',
      cancelButtonText: 'Cancel',
      onCancel: () => {
        closeAlert();
      },
      onConfirm: () => {
        dispatch(DeleteViewVideoGallary(DeleteLeaveBody));
        closeAlert();
      }
    });
  };
  useEffect(() => {
    if (deleteVideodetailsMsg != '') {
      toast.success(deleteVideodetailsMsg)
      dispatch(resetDeleteViewVideoGallary());
      dispatch(getViewVideoDetails(ViewVideoListBody));
    }
  }, [deleteVideodetailsMsg])

  const SaveVideoListBody: IGetSaveUpdateVideoBody = {
    asVideoId: Number(Video_Id),
    asVideoDetailId: Number(0),
    asVideoName: videoName,
    asDescription: title,
    asVideoURL: url,
    asSchoolId: Number(asSchoolId),
    asInsertedById: Number(asUserId),
    asSubjectId: 0
  };

  const UpdateVideoListBody: IGetSaveUpdateVideoBody = {
    asVideoId: Number(Video_Id),
    asVideoDetailId: Number(videoDetailsId),
    asVideoName: videoName,
    asDescription: title,
    asVideoURL: url,
    asSchoolId: Number(asSchoolId),
    asInsertedById: Number(asUserId),
    asSubjectId: 0
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  useEffect(() => {
    if (formData) {
      setUrl(formData.url);
      setTitle(formData.title);
    }
  }, [formData]);
  // Handle edit
  const handleEdit = (id: number) => {
    const selectedData = ViewVideoDetails.find((item) => item.VideoDetailsId === id);
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
    dispatch(getSaveVideo(UpdateVideoListBody));

  };

  // Handle add
  const handleAdd = () => {
    const newId = ViewVideoDetails.length ? Math.max(...ViewVideoDetails.map((item) => item.id)) + 1 : 1;
    setData([...ViewVideoDetails, { id: newId, url: formData.url, title: formData.title }]);
    setFormData({ url: '', title: '' });
    dispatch(getSaveVideo(SaveVideoListBody));
  };
  useEffect(() => {
    if (SaveUpdateVideoDetails != "") {
      toast.success(SaveUpdateVideoDetails);
      dispatch(resetSaveUpdateVideo());
      dispatch(getViewVideoDetails(ViewVideoListBody));
    }
  }, [SaveUpdateVideoDetails])

  // Handle delete
  const handleDelete = (id: number) => {
    setData((prevData) => prevData.filter((item) => item.id !== id));
  };

  // Handle cancel
  const handleCancel = () => {
    setFormData({ url: '', title: '' });
    setEditId(null); // Switch back to add mode
  };
  // Handle dialog open
  const handleView = (url: string) => {
    setDialogVideo(url);
    setOpenDialog(true);
    setIsFullscreen(false); // Reset fullscreen state
  };

  // Handle dialog close
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  // Toggle fullscreen
  const handleDoubleClick = () => {
    setIsFullscreen((prev) => !prev);
  };


  return (
    <Box px={2}>
      <CommonPageHeader
        navLinks={[
          {
            title: 'Photo/Video Gallery',
            path: '/RITeSchool/Teacher/PhotoVideoGalleryBaseScreen',
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
                  >
                    <SaveAsIcon />
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
              value={URLSource}
              InputProps={{ readOnly: true }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="URL Source"
              value={videoName}
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
        <TableContainer component={Paper} sx={{ mt: 0 }}>
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
                <TableCell align="center" sx={{ textTransform: 'capitalize', color: 'white', py: 1.5 }}>Edit</TableCell>
                <TableCell align="center" sx={{ textTransform: 'capitalize', color: 'white', py: 1.5 }}>Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {ViewVideoDetails.map((item) => (
                <TableRow key={item.id}>
                  <TableCell sx={{ textTransform: 'capitalize', py: 1.5, }}>{item.title}</TableCell>
                  <TableCell sx={{ textTransform: 'capitalize', py: 0.5, textAlign: 'center', }}>
                    <Tooltip title={"View"}>
                      <IconButton
                        onClick={() => handleView(item.url)}
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
                        onClick={() => handleEdit(item.VideoDetailsId)}
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
                        onClick={() => deleteRow(item.VideoDetailsId)}
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
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        fullWidth
        maxWidth={isFullscreen ? false : 'md'}
        PaperProps={{
          sx: isFullscreen ? { width: '100%', height: '100%' } : { height: 'auto', borderRadius: '15px' },
        }}
      >
        <DialogTitle sx={{ bgcolor: '#223354' }}>
          <ClearIcon
            onClick={handleCloseDialog}
            sx={{
              color: 'white',
              borderRadius: '7px',
              position: 'absolute',
              top: '5px',
              right: '8px',
              cursor: 'pointer',
              '&:hover': {
                color: 'red'
              }
            }}
          />
        </DialogTitle>
        <DialogContent
          sx={{
            display: 'flex',
            flexDirection: 'column',
            position: 'relative',
            p: 0,
          }}
        >


          <iframe
            src={dialogVideo}
            title="Video Player"
            frameBorder="1"
            allowFullScreen
            width="100%"
            height={isFullscreen ? '100%' : '500px'}
            onDoubleClick={handleDoubleClick}
          />
          <Typography
            align="center"
            sx={{
              fontSize: 14,
              color: grey[600],
              mt: 1,
            }}
          >
            Double-click the video to toggle fullscreen.
          </Typography>
        </DialogContent>
      </Dialog>

    </Box>
  );
};
export default ViewVideoGallery;
