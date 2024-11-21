import { QuestionMark } from '@mui/icons-material'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import EditIcon from '@mui/icons-material/Edit'
import { Box, Button, Card, CardContent, CardMedia, Grid, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Tooltip, Typography, useMediaQuery, useTheme } from '@mui/material'
import { blue, grey, red } from '@mui/material/colors'
import { useState } from 'react'
import CommonPageHeader from '../CommonPageHeader'

const ViewPhotoFile = () => {
    const [photos, setPhotos] = useState([
        { id: 1, url: "https://via.placeholder.com/100", title: "Pic 1", comment: "" },
        { id: 2, url: "https://via.placeholder.com/100", title: "Pic 2", comment: "" },
        { id: 3, url: "https://via.placeholder.com/100", title: "Pic 1", comment: "" },
        { id: 4, url: "https://via.placeholder.com/100", title: "Pic 2", comment: "" },
    ]);
    const [newPhotoUrl, setNewPhotoUrl] = useState("");
    const [galleryName, setGalleryName] = useState("JanmashtamiAug24");
    const [comment, setComment] = useState("");
    const [selectedPhotoId, setSelectedPhotoId] = useState(null);
    const [isUpdateDisabled, setIsUpdateDisabled] = useState(true);
    const [isTableView, setIsTableView] = useState(false);  // Added state to toggle between table and card view

    // Detect screen size using Material-UI's useMediaQuery hook
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm')); // Detect small screens (mobile/tablet)

    const handleAddPhoto = () => {
        if (newPhotoUrl) {
            const newPhoto = {
                id: photos.length + 1,
                url: newPhotoUrl,
                title: `Pic ${photos.length + 1}`,
                comment: "",
            };
            setPhotos([...photos, newPhoto]);
            setNewPhotoUrl("");
        }
    };

    const handleDeletePhoto = (id) => {
        setPhotos(photos.filter((photo) => photo.id !== id));
    };

    const handleEditPhoto = (photo) => {
        setComment(photo.comment);
        setSelectedPhotoId(photo.id);
        setIsUpdateDisabled(false);
    };

    const handleUpdatePhoto = () => {
        setPhotos((prevPhotos) =>
            prevPhotos.map((photo) =>
                photo.id === selectedPhotoId ? { ...photo, comment } : photo
            )
        );
        setComment("");
        setSelectedPhotoId(null);
        setIsUpdateDisabled(true);
    };

    return (
        <Box px={2}>
            <CommonPageHeader
                navLinks={[
                    { title: 'Photo Video Gallery', path: '/extended-sidebar/Teacher/PhotoVideoGalleryBaseScreen' },
                    { title: 'View Images', path: '' },
                ]}
                rightActions={<>
                    <Tooltip title={'Displays photos of selected gallery. To delete photo click on delete button.'}>
                        <IconButton sx={{ color: 'white', backgroundColor: grey[500], '&:hover': { backgroundColor: grey[600] } }}>
                            <QuestionMark />
                        </IconButton>
                    </Tooltip>
                </>}
            />
            <Box sx={{ backgroundColor: 'white' }} p={2}>
                {/* Header */}
                <Grid
                    container
                    spacing={2}
                    sx={{ backgroundColor: 'white' }}
                    alignItems="center"
                    justifyContent="space-between"
                >
                    {/* Gallery Name Section */}
                    <Grid item xs={12} sm={6} md={4}>
                        <TextField
                            value={galleryName}
                            onChange={(e) => setGalleryName(e.target.value)}
                            disabled
                            variant="outlined"
                            fullWidth
                             label="Gallery Name"
                        />
                    </Grid>

                    {/* Comment Section */}
                    <Grid item xs={12} sm={6} md={8} container spacing={2} alignItems="center">
                        <Grid item xs={9}>
                            <TextField
                                label="Comment"
                                variant="outlined"
                                fullWidth
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                disabled={isUpdateDisabled}
                            />
                        </Grid>
                        <Grid item xs={1.5}>
                            <Button
                                // variant="contained"
                                sx={{
                                    color: 'primary',
                                    '&:hover': {
                                        color: 'primary',
                                        backgroundColor: blue[100]
                                    }
                                }}
                                fullWidth
                                onClick={handleUpdatePhoto}
                                disabled={isUpdateDisabled}
                            >
                                Update
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>

                {/* Add Photo Button */}
                <Box my={2} display="flex" justifyContent="end">

                    {/* Toggle View Button */}
                    {!isSmallScreen && (
                        <Button
                            variant="contained"
                            onClick={() => setIsTableView(!isTableView)} // Toggle between table and card view
                        >
                            {isTableView ? 'Switch to Card View' : 'Switch to Table View'}
                        </Button>
                    )}
                </Box>

                {/* Conditional Rendering for Mobile/Tablet and Desktop */}
                {isSmallScreen || !isTableView ? (
                    // Mobile/Tablet View (Card View)
                    <Grid container spacing={2}>
                        {photos.map((photo) => (
                            <Grid item xs={12} sm={4} key={photo.id}>
                                <Card>
                                    <CardMedia
                                        component="img"
                                        height="140"
                                        image={photo.url}
                                        alt={photo.title}
                                    />
                                    <CardContent>
                                        <Typography variant="body2" color="text.secondary">{photo.comment}</Typography>
                                        <Box display="flex" justifyContent="space-between" mt={1}>
                                            <Tooltip title={'Edit'}>
                                                <IconButton color="primary" onClick={() => handleEditPhoto(photo)}>
                                                    <EditIcon />
                                                </IconButton>
                                            </Tooltip>
                                            <Tooltip title={'Delete'}>
                                                <IconButton
                                                    sx={{
                                                        color: 'primary',
                                                        '&:hover': { color: 'red', backgroundColor: red[100] },
                                                    }}
                                                    onClick={() => handleDeletePhoto(photo.id)}
                                                >
                                                    <DeleteForeverIcon />
                                                </IconButton>
                                            </Tooltip>
                                        </Box>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                ) : (
                    // Desktop View (Table View)
                    <TableContainer>
                        <Table aria-label="simple table" sx={{ border: (theme) => `1px solid ${theme.palette.grey[300]}` }}>
                            <TableHead>
                                <TableRow sx={{ background: (theme) => theme.palette.secondary.main, color: (theme) => theme.palette.common.white }}>
                                    <TableCell sx={{ textTransform: 'capitalize', color: 'white', py: 2 }}>Image</TableCell>
                                    <TableCell sx={{ textTransform: 'capitalize', color: 'white', py: 2 }}>Comment</TableCell>
                                    <TableCell sx={{ textTransform: 'capitalize', color: 'white', py: 2,  textAlign: 'center', }}>Edit</TableCell> 
                                    <TableCell sx={{ textTransform: 'capitalize', color: 'white', py: 2,  textAlign: 'center', }}>Delete</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {photos.map((photo) => (
                                    <TableRow key={photo.id}>
                                        <TableCell sx={{ textTransform: 'capitalize', py: 1 }}>
                                            <img src={photo.url} alt={photo.title} style={{ width: 50, height: 50 }} />
                                        </TableCell>
                                        <TableCell sx={{ textTransform: 'capitalize', py: 1 }}>{photo.comment}</TableCell>
                                        <TableCell sx={{ textTransform: 'capitalize', py: 1,  textAlign: 'center' }}>
                                            <Tooltip title={'Edit'}>
                                                <IconButton color="primary" onClick={() => handleEditPhoto(photo)}>
                                                    <EditIcon />
                                                </IconButton>
                                            </Tooltip>
                                        </TableCell>
                                        <TableCell sx={{ textTransform: 'capitalize', py: 1,  textAlign: 'center' }}>
                                            <Tooltip title={'Delete'}>
                                                <IconButton
                                                    sx={{
                                                        color: 'primary',
                                                        '&:hover': { color: 'red', backgroundColor: red[100] },
                                                    }}
                                                    onClick={() => handleDeletePhoto(photo.id)}
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
                )}
            </Box>
        </Box>
    );
};

export default ViewPhotoFile;
