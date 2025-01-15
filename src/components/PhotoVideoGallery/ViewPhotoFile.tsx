import { QuestionMark } from '@mui/icons-material'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import EditIcon from '@mui/icons-material/Edit'
import SaveAsIcon from '@mui/icons-material/SaveAs'
import SwitchAccountIcon from '@mui/icons-material/SwitchAccount'
import { Box, Card, CardContent, CardMedia, Grid, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Tooltip, Typography, useMediaQuery, useTheme } from '@mui/material'
import { blue, green, grey, red } from '@mui/material/colors'
import { useContext, useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { AlertContext } from 'src/contexts/AlertContext'
import { IDeletePhotosBody, IGetAllImagesBody, IGetPhotoCountBody, IUpdateCommentBody } from 'src/interfaces/Common/PhotoGallery'
import ButtonGroupComponent from 'src/libraries/ResuableComponents/ButtonGroupComponent'
import { CDADeletePhotoMsg, CDAGetAllImages, CDAGetPhotoCount, CDAUpdateCommentMsg, resetDeletePhotoMsg, resetUpdateCommentMsg } from 'src/requests/PhotoGallery/PhotoGallery'
import { RootState } from 'src/store'
import CommonPageHeader from '../CommonPageHeader'

const ViewPhotoFile = () => {
    const dispatch = useDispatch();
    const { showAlert, closeAlert } = useContext(AlertContext);
    const [newPhotoUrl, setNewPhotoUrl] = useState("");
    const [galleryName, setGalleryName] = useState("JanmashtamiAug24");
    const [comment, setComment] = useState("");
    const [Gallery_Ids, setGalleryIds] = useState("");
    const [selectedPhotoId, setSelectedPhotoId] = useState(null);
    const [isUpdateDisabled, setIsUpdateDisabled] = useState(true);
    const [isTableView, setIsTableView] = useState(false);
    const [rowsPerPage, setRowsPerPage] = useState(20);
    const [page, setPage] = useState<number>(1);
    const rowsPerPageOptions = [20, 50, 100, 200];
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const asSchoolId = Number(localStorage.getItem('localSchoolId'));
    const USGetAllImages = useSelector((state: RootState) => state.PhotoGalllary.IGetAllImages);
    const USGetPhotoCount = useSelector((state: RootState) => state.PhotoGalllary.IGetPhotoCount);
    const USUpdateCommentMsg = useSelector((state: RootState) => state.PhotoGalllary.IUpdateCommentMsg);
    const USDeletePhotoMsg = useSelector((state: RootState) => state.PhotoGalllary.IDeletePhotoMsg);
    const GetAllImages: IGetAllImagesBody = {
        asSchool_Id: asSchoolId,
        asGallery_Name: 'new2021015'
    };
    useEffect(() => {
        dispatch(CDAGetAllImages(GetAllImages));
    }, []);
    const GetPhotoCount: IGetPhotoCountBody = {
        asSchool_Id: asSchoolId,
        asGallery_Name: 'new2021015'
    };
    useEffect(() => {
        dispatch(CDAGetPhotoCount(GetPhotoCount));
    }, []);
    const handleUpdatePhoto = () => {
        const UpdateComment: IUpdateCommentBody = {
            asSchool_Id: asSchoolId,
            asGallery_Id: Number(Gallery_Ids),
            ascomment: comment
        }
        dispatch(CDAUpdateCommentMsg(UpdateComment));
        setIsUpdateDisabled(true);
        setComment('')
    };
    useEffect(() => {
        if (USUpdateCommentMsg !== "") {
            toast.success(USUpdateCommentMsg);
            dispatch(resetUpdateCommentMsg());
            dispatch(CDAGetAllImages(GetAllImages));
        }
    }, [USUpdateCommentMsg, USGetAllImages]);
    const handleDeletePhoto = (Gallery_Id: number) => {
        if (!Gallery_Id) return;
        const DeletePhotos: IDeletePhotosBody = {
            asSchool_Id: asSchoolId,
            asGallery_Id: Gallery_Id
        };
        showAlert({
            title: 'Please Confirm',
            message: 'Are you sure you want to delete this photo?',
            variant: 'warning',
            confirmButtonText: 'Confirm',
            cancelButtonText: 'Cancel',
            onCancel: () => {
                closeAlert();
            },
            onConfirm: () => {
                dispatch(CDADeletePhotoMsg(DeletePhotos));
                closeAlert();
            },
        });
    };
    useEffect(() => {
        if (USDeletePhotoMsg !== "") {
            toast.success(USDeletePhotoMsg);
            dispatch(resetDeletePhotoMsg());
            dispatch(CDAGetAllImages(GetAllImages));
            dispatch(CDAGetPhotoCount(GetPhotoCount));
        }
    }, [USDeletePhotoMsg, USGetAllImages, USGetPhotoCount]);
    const handleEditPhoto = (Comment, Gallery_Id) => {
        setComment(Comment);
        setGalleryIds(Gallery_Id)
        setIsUpdateDisabled(false);
    };
    const singleTotalCount: number = useMemo(() => {
        if (!Array.isArray(USGetPhotoCount)) {
            return 0;
        }
        return USGetPhotoCount.reduce((acc: number, item: any) => {
            const count = Number(item.Cnt);
            if (isNaN(count)) {
                return acc;
            }
            return acc + count;
        }, 0);
    }, [USGetPhotoCount]);
    const PageChange = (pageNumber) => {
        setPage(pageNumber);
    };
    const ChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(1);
    };
    const startRecord = (page - 1) * rowsPerPage + 1;
    const endRecord = Math.min(page * rowsPerPage, singleTotalCount);
    const pageCount = Math.ceil(singleTotalCount / rowsPerPage);
    return (
        <Box px={2}>
            <CommonPageHeader
                navLinks={[
                    { title: 'Photo Video Gallery', path: '/RITeSchool/Teacher/PhotoVideoGalleryBaseScreen' },
                    { title: 'View Images', path: '' },
                ]}
                rightActions={<>
                    <Tooltip title={'Displays photos of selected gallery. To delete photo click on delete button.'}>
                        <IconButton sx={{ color: 'white', backgroundColor: grey[500], '&:hover': { backgroundColor: grey[600] } }}>
                            <QuestionMark />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title={isTableView ? 'Switch to Card View' : 'Switch to Table View'}>
                        <IconButton onClick={() => setIsTableView(!isTableView)} sx={{ color: 'white', backgroundColor: blue[500], '&:hover': { backgroundColor: blue[600] } }}>
                            <SwitchAccountIcon />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title={'Update'}>
                        <IconButton onClick={handleUpdatePhoto}
                            disabled={isUpdateDisabled} sx={{ color: 'white', backgroundColor: green[500], '&:hover': { backgroundColor: green[600] } }}>
                            <SaveAsIcon />
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

                    <Grid item xs={8}>
                        <TextField
                            label="Comment"
                            variant="outlined"
                            fullWidth
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            disabled={isUpdateDisabled}
                        />
                    </Grid>
                </Grid>
                {singleTotalCount > 0 ? (
                    <Box style={{ flex: 1, textAlign: 'center' }}>
                        <Typography
                            variant='subtitle1'
                            sx={{ margin: '16px 0', textAlign: 'center' }}
                        >
                            <Box component='span' fontWeight='fontWeightBold'>
                                {startRecord} to {endRecord}
                            </Box>{' '}
                            out of{' '}
                            <Box component='span' fontWeight='fontWeightBold'>
                                {singleTotalCount}
                            </Box>{' '}
                            {singleTotalCount === 1 ? 'record' : 'records'}
                        </Typography>
                    </Box>
                ) : (
                    <span> </span>
                )}
                {isSmallScreen || !isTableView ? (
                    <Grid container spacing={2} mt={1}>
                        {USGetAllImages.map((photo) => (
                            <Grid item xs={12} sm={4} key={photo.Image_Path}>
                                <Card>
                                    <CardMedia
                                        component="img"
                                        height="140"
                                        image={photo.url}
                                        alt={photo.title}
                                    />
                                    <CardContent>
                                        <Typography variant="body2" color="text.secondary">{photo.Comment}</Typography>
                                        <Box display="flex" justifyContent="space-between" mt={1}>
                                            <Tooltip title={'Edit'}>
                                                <IconButton color="primary" onClick={() => handleEditPhoto(photo.Comment, photo.Gallery_Id)}>
                                                    <EditIcon />
                                                </IconButton>
                                            </Tooltip>
                                            <Tooltip title={'Delete'}>
                                                <IconButton
                                                    sx={{
                                                        color: 'primary',
                                                        '&:hover': { color: 'red', backgroundColor: red[100] },
                                                    }}
                                                    onClick={() => handleDeletePhoto(photo.Gallery_Id)}
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
                    <TableContainer sx={{ mt: 2 }}>
                        <Table aria-label="simple table" sx={{ border: (theme) => `1px solid ${theme.palette.grey[300]}` }}>
                            <TableHead>
                                <TableRow sx={{ background: (theme) => theme.palette.secondary.main, color: (theme) => theme.palette.common.white }}>
                                    <TableCell sx={{ textTransform: 'capitalize', color: 'white', py: 2 }}><strong>Images</strong> </TableCell>
                                    <TableCell sx={{ textTransform: 'capitalize', color: 'white', py: 2 }}><strong>Comments</strong></TableCell>
                                    <TableCell sx={{ textTransform: 'capitalize', color: 'white', py: 2, textAlign: 'center', }}><strong>Edit</strong></TableCell>
                                    <TableCell sx={{ textTransform: 'capitalize', color: 'white', py: 2, textAlign: 'center', }}><strong>Delete</strong></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {USGetAllImages.map((photo) => (
                                    <TableRow key={photo.id}>
                                        <TableCell sx={{ textTransform: 'capitalize', py: 1 }}>
                                            <img src={photo.Image_Path} alt={photo.title} style={{ width: 50, height: 50 }} />
                                        </TableCell>
                                        <TableCell sx={{ textTransform: 'capitalize', py: 1 }}>{photo.Comment}</TableCell>
                                        <TableCell sx={{ textTransform: 'capitalize', py: 1, textAlign: 'center' }}>
                                            <Tooltip title={'Edit'}>
                                                <IconButton color="primary" onClick={() => handleEditPhoto(photo.Comment, photo.Gallery_Id)}>
                                                    <EditIcon />
                                                </IconButton>
                                            </Tooltip>
                                        </TableCell>
                                        <TableCell sx={{ textTransform: 'capitalize', py: 1, textAlign: 'center' }}>
                                            <Tooltip title={'Delete'}>
                                                <IconButton
                                                    sx={{
                                                        color: 'primary',
                                                        '&:hover': { color: 'red', backgroundColor: red[100] },
                                                    }}
                                                    onClick={() => handleDeletePhoto(photo.Gallery_Id)}
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
                <ButtonGroupComponent
                    rowsPerPage={rowsPerPage}
                    ChangeRowsPerPage={ChangeRowsPerPage}
                    rowsPerPageOptions={rowsPerPageOptions} // Set your options
                    PageChange={PageChange}
                    pagecount={pageCount}  // Use the calculated pageCount
                />
            </Box>
        </Box>
    );
};

export default ViewPhotoFile;
