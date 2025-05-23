import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import DownloadIcon from "@mui/icons-material/Download";
import EditIcon from "@mui/icons-material/Edit";
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import SlideshowIcon from "@mui/icons-material/Slideshow";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { ClearIcon } from '@mui/x-date-pickers';

import { ArrowCircleDown } from '@mui/icons-material';
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';

import {
    Box,
    Card,
    CardContent,
    Dialog,
    DialogContent,
    DialogTitle,
    Grid,
    IconButton,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Tooltip,
    Typography,
    useMediaQuery,
    useTheme
} from "@mui/material";
import { red } from "@mui/material/colors";
import React, { useState } from "react";
import { useNavigate } from 'react-router';
import SlideshowPhotoGallery from "./SlideshowPhotoGallery";
// Define props for PhotoPage
interface PhotopageTableCardProps {
    handleDelete,
    handleSortChange,
    SortBy,
    SortDirection,

    data: Array<{
        galleryName: string;
        className: string;
        lastUpdated: string;
        IsDelete;


    }>;
    view: "table" | "card";
}

const PhotopageTableCard: React.FC<PhotopageTableCardProps> = ({ data, handleDelete, handleSortChange, SortBy, SortDirection }) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm")); // Detect mobile screens
    const navigate = useNavigate();
    const [slideShow, setSlideShow] = useState(false);
    const [isFullscreen, setIsFullscreen] = useState<boolean>(false);




    const handleEdit = (action: string, item: any) => {
        // navigate('/RITeSchool/Teacher/AddNewPhoto/' + (item.galleryName));
        navigate('/RITeSchool/Teacher/AddNewPhoto/' + (item.RowID), { state: { fromInternal: true } });
    }
    const [currentGallery, setCurrentGallery] = useState<string | null>(null);

    const handleAction = (action: string, item: any) => {
        if (action === "Slide Show") {
            setCurrentGallery(item.galleryName); // Set the current gallery name
            setSlideShow(true);
            setIsFullscreen(false);
        }
    };
    const handleClose = () => {
        setSlideShow(false);
    };
    const handleDoubleClick = () => {
        setIsFullscreen((prev) => !prev);
    };

    const ViewPhotoFilePage = (value) => {
        navigate('/RITeSchool/Teacher/ViewPhotoFile', { state: { fromInternal: true } });
    };

    return (
        <>
            <Box pb={1}>
                {/* Automatically switch between table and card views */}
                {!isMobile ? (
                    // Table View
                    <Table aria-label="simple table" sx={{ border: (theme) => `1px solid ${theme.palette.grey[300]}` }}>
                        <TableHead>
                            <TableRow
                                sx={{ background: (theme) => theme.palette.secondary.main, color: (theme) => theme.palette.common.white }}>
                                <TableCell

                                    sx={{
                                        alignItems: "center",
                                        textTransform: 'capitalize',
                                        color: 'white',
                                        py: 1.5,
                                        cursor: "pointer",
                                    }}>

                                    <b onClick={() => handleSortChange('Gallery_Name')} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
                                        Gallery Name{SortBy === 'Gallery_Name' && (SortDirection === 'asc' ? <ArrowCircleUpIcon /> : <ArrowCircleDown />)}
                                    </b>

                                </TableCell>
                                <TableCell
                                    sx={{
                                        alignItems: "center",
                                        textTransform: 'capitalize',
                                        color: 'white',
                                        py: 1.5,
                                        cursor: "pointer",
                                    }}>

                                    <b onClick={() => handleSortChange('Classes')} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
                                        Class Name{SortBy === 'Classes' && (SortDirection === 'asc' ? <ArrowCircleUpIcon /> : <ArrowCircleDown />)}
                                    </b>

                                </TableCell>
                                <TableCell
                                    sx={{ textTransform: 'capitalize', color: 'white', py: 1.5, cursor: "pointer", }}>
                                    <b onClick={() => handleSortChange('Update_Date')} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
                                        Last Updated Date{SortBy === 'Update_Date' && (SortDirection === 'asc' ? <ArrowCircleUpIcon /> : <ArrowCircleDown />)}
                                    </b>
                                </TableCell>


                                <TableCell sx={{ textTransform: 'capitalize', color: 'white', py: 1.5, textAlign: 'center', }}><b>View</b></TableCell>
                                <TableCell sx={{ textTransform: 'capitalize', color: 'white', py: 1.5, textAlign: 'center', }}><b>Slide Show</b></TableCell>
                                <TableCell sx={{ textTransform: 'capitalize', color: 'white', py: 1.5, textAlign: 'center', }}><b>Download</b></TableCell>
                                <TableCell sx={{ textTransform: 'capitalize', color: 'white', py: 1.5, textAlign: 'center', }}><b>Edit</b></TableCell>
                                <TableCell sx={{ textTransform: 'capitalize', color: 'white', py: 1.5, textAlign: 'center', }}><b>Delete</b></TableCell>
                            </TableRow>

                        </TableHead>
                        <TableBody>
                            {data.map((item, index) => (
                                <TableRow key={index}>
                                    <TableCell sx={{ textTransform: 'capitalize', py: 0.5 }}>{item.galleryName}</TableCell>
                                    <TableCell sx={{ textTransform: 'capitalize', py: 0.5 }}>{item.className}</TableCell>
                                    <TableCell sx={{ textTransform: 'capitalize', py: 0.5 }}>{item.lastUpdated}</TableCell>
                                    <TableCell sx={{ textTransform: 'capitalize', py: 0.5, textAlign: 'center' }}>
                                        <Tooltip title={"View"}>
                                            <IconButton
                                                onClick={ViewPhotoFilePage}
                                                color="primary"
                                            >
                                                <VisibilityIcon />
                                            </IconButton>
                                        </Tooltip>
                                    </TableCell>
                                    <TableCell sx={{ textTransform: 'capitalize', py: 0.5, textAlign: 'center', }}>
                                        <Tooltip title={"Slide Show"}>
                                            <IconButton
                                                onClick={() => handleAction("Slide Show", item)}
                                                color="primary"
                                            >
                                                <SlideshowIcon />
                                            </IconButton>
                                        </Tooltip>
                                    </TableCell>
                                    <TableCell sx={{ textTransform: 'capitalize', py: 0.5, textAlign: 'center', }}>
                                        <Tooltip title={"Download"}>
                                            <IconButton
                                                onClick={() => handleAction("Download", item)}
                                                color="primary"
                                            >
                                                <FileDownloadOutlinedIcon />
                                            </IconButton>
                                        </Tooltip>
                                    </TableCell>
                                    <TableCell sx={{ textTransform: 'capitalize', py: 0.5, textAlign: 'center', }}>
                                        <Tooltip title={"Edit"}>
                                            <IconButton
                                                onClick={() => handleEdit("Edit", item)}
                                                color="primary"
                                            >
                                                <EditIcon />
                                            </IconButton>
                                        </Tooltip>
                                    </TableCell>
                                    <TableCell sx={{ textTransform: 'capitalize', py: 0.5, textAlign: 'center', }}>

                                        <Tooltip title={"Delete"}>
                                            <IconButton
                                                onClick={() => handleDelete(item.galleryName)}
                                                sx={{
                                                    color: 'primary',
                                                    '&:hover': {
                                                        color: 'red',
                                                        backgroundColor: red[100]
                                                    }
                                                }}
                                            >
                                                <DeleteForeverIcon />
                                            </IconButton>
                                        </Tooltip>


                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                ) : (
                    // Card View for Mobile
                    <Grid container spacing={2}>
                        {data.map((item, index) => (
                            <Grid item xs={12} sm={6} md={4} key={index}>
                                <Card>
                                    <CardContent>
                                        <Typography variant="h6" gutterBottom>
                                            {item.galleryName}
                                        </Typography>
                                        <Typography variant="body2">
                                            <strong>Class Name:</strong> {item.className}
                                        </Typography>
                                        <Typography variant="body2">
                                            <strong>Last Updated:</strong> {item.lastUpdated}
                                        </Typography>
                                        <Box sx={{ display: "flex", justifyContent: "space-around", mt: 2 }}>
                                            <Tooltip title="View">
                                                <IconButton onClick={() => handleAction("View", item)} color="primary">
                                                    <VisibilityIcon />
                                                </IconButton>
                                            </Tooltip>

                                            <Tooltip title="Slide Show">
                                                <IconButton onClick={() => handleAction("Slide Show", item)} color="primary">
                                                    <SlideshowIcon />
                                                </IconButton>
                                            </Tooltip>

                                            <Tooltip title="Download">
                                                <IconButton onClick={() => handleAction("Download", item)} color="primary">
                                                    <DownloadIcon />
                                                </IconButton>
                                            </Tooltip>

                                            <Tooltip title="Edit">
                                                <IconButton onClick={() => handleAction("Edit", item)} color="primary">
                                                    <EditIcon />
                                                </IconButton>
                                            </Tooltip>

                                            <Tooltip title="Delete">
                                                <IconButton
                                                    onClick={() => handleAction("Delete", item)}
                                                    sx={{
                                                        color: "primary",
                                                        "&:hover": {
                                                            color: "red",
                                                            backgroundColor: red[100],
                                                        },
                                                    }}
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
                )}
            </Box>
            <Dialog
                open={slideShow}
                onClose={handleClose}
                maxWidth={isFullscreen ? false : 'md'}
                PaperProps={{
                    sx: isFullscreen ? { width: '100%', height: '100%', borderRadius: '15px' } : { height: 'auto', borderRadius: '15px' },
                }}
            >
                <DialogTitle sx={{ bgcolor: '#223354' }}>
                    <ClearIcon
                        onClick={handleClose}
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
                <Typography variant="h3" sx={{ pt: 2, pl: 3 }}>
                    Slide Show Photo
                </Typography>
                <DialogContent onDoubleClick={handleDoubleClick}>
                    <SlideshowPhotoGallery galleryName={currentGallery} />
                </DialogContent>
                {/* <DialogActions sx={{ py: 2, px: 3 }}>
                    <Button color={'error'} onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button
                        // onClick={clickConfirm}
                        sx={{
                            color: 'green',
                            '&:hover': {
                                color: 'green',
                                backgroundColor: green[100]
                            }
                        }}
                    >
                        Confirm
                    </Button>
                </DialogActions> */}
            </Dialog>
        </>
    );
};

export default PhotopageTableCard;
