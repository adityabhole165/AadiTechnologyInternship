import ArrowCircleDownIcon from "@mui/icons-material/ArrowCircleDown";
import ArrowCircleUpIcon from "@mui/icons-material/ArrowCircleUp";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import DownloadIcon from "@mui/icons-material/Download";
import EditIcon from "@mui/icons-material/Edit";
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import SlideshowIcon from "@mui/icons-material/Slideshow";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { ClearIcon } from '@mui/x-date-pickers';

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
    data: Array<{
        galleryName: string;
        className: string;
        lastUpdated: string;
    }>;
    view: "table" | "card";
}

const PhotopageTableCard: React.FC<PhotopageTableCardProps> = ({ data, view }) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm")); // Detect mobile screens
    const navigate = useNavigate();
    const [sortConfig, setSortConfig] = useState<{ key: string; direction: "asc" | "desc" } | null>(null);
    const [slideShow, setSlideShow] = useState(false);
    const [isFullscreen, setIsFullscreen] = useState<boolean>(false);


    const handleAction = (action: string, item: any) => {
        setSlideShow(true)
        setIsFullscreen(false);
    };
    const handleClose = () => {
        setSlideShow(false);
    };
    const handleDoubleClick = () => {
        setIsFullscreen((prev) => !prev);
    };

    const ViewPhotoFilePage = (value) => {
        navigate('/RITeSchool/Teacher/ViewPhotoFile');
    };
    const sortedData = React.useMemo(() => {
        if (!sortConfig) return data;

        return [...data].sort((a, b) => {
            const aValue = a[sortConfig.key];
            const bValue = b[sortConfig.key];

            if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
            if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;
            return 0;
        });
    }, [data, sortConfig]);


    const handleSort = (key: string) => {
        setSortConfig((prevConfig) => {
            if (prevConfig?.key === key) {
                // Toggle sort direction
                return { key, direction: prevConfig.direction === "asc" ? "desc" : "asc" };
            }
            // Default to ascending
            return { key, direction: "asc" };
        });
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
                                <TableCell onClick={() => handleSort("galleryName")}
                                    sx={{
                                        cursor: "pointer",
                                        display: "flex",
                                        alignItems: "center",
                                        textTransform: 'capitalize',
                                        color: 'white', py: 1.5
                                    }}>
                                    Gallery Name
                                    {sortConfig?.key === "galleryName" && (
                                        sortConfig.direction === "asc" ? (
                                            <ArrowCircleUpIcon sx={{ ml: 1, color: "white", fontSize: "20px" }} />
                                        ) : (
                                            <ArrowCircleDownIcon sx={{ ml: 1, color: "white", fontSize: "20px" }} />
                                        )
                                    )}
                                </TableCell>
                                <TableCell onClick={() => handleSort("className")}
                                    sx={{ alignItems: "center", textTransform: 'capitalize', color: 'white', py: 1.5, cursor: "pointer", }}>
                                    Class Name
                                    {sortConfig?.key === "className" && (
                                        sortConfig.direction === "asc" ? (
                                            <ArrowCircleUpIcon sx={{ ml: 1, color: "white", fontSize: "20px" }} />
                                        ) : (
                                            <ArrowCircleDownIcon sx={{ ml: 1, color: "white", fontSize: "20px" }} />
                                        )
                                    )}
                                </TableCell>
                                <TableCell onClick={() => handleSort("lastUpdated")}
                                    sx={{ textTransform: 'capitalize', color: 'white', py: 1.5, cursor: "pointer", }}>Last Updated Date
                                    {sortConfig?.key === "lastUpdated" && (
                                        sortConfig.direction === "asc" ? (
                                            <ArrowCircleUpIcon sx={{ ml: 1, color: "white", fontSize: "20px" }} />
                                        ) : (
                                            <ArrowCircleDownIcon sx={{ ml: 1, color: "white", fontSize: "20px" }} />
                                        )
                                    )}
                                </TableCell>
                                <TableCell sx={{ textTransform: 'capitalize', color: 'white', py: 1.5, textAlign: 'center', }}>View</TableCell>
                                <TableCell sx={{ textTransform: 'capitalize', color: 'white', py: 1.5, textAlign: 'center', }}>Slide Show</TableCell>
                                <TableCell sx={{ textTransform: 'capitalize', color: 'white', py: 1.5, textAlign: 'center', }}>Download</TableCell>
                                <TableCell sx={{ textTransform: 'capitalize', color: 'white', py: 1.5, textAlign: 'center', }}>Edit</TableCell>
                                <TableCell sx={{ textTransform: 'capitalize', color: 'white', py: 1.5, textAlign: 'center', }}>Delete</TableCell>
                            </TableRow>

                        </TableHead>
                        <TableBody>
                            {data.map((item, index) => (
                                <TableRow key={index}>
                                    <TableCell sx={{ textTransform: 'capitalize', py: 0.5 }}>{item.galleryName}</TableCell>
                                    <TableCell sx={{ textTransform: 'capitalize', py: 0.5 }}>{item.className}</TableCell>
                                    <TableCell sx={{ textTransform: 'capitalize', py: 0.5 }}>{item.lastUpdated}</TableCell>
                                    <TableCell sx={{ textTransform: 'capitalize', py: 0.5, textAlign: 'center', }}>
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
                                                onClick={() => handleAction("Edit", item)}
                                                color="primary"
                                            >
                                                <EditIcon />
                                            </IconButton>
                                        </Tooltip>
                                    </TableCell>
                                    <TableCell sx={{ textTransform: 'capitalize', py: 0.5, textAlign: 'center', }}>
                                        <Tooltip title={"Delete"}>
                                            <IconButton
                                                onClick={() => handleAction("Delete", item)}
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
                    <SlideshowPhotoGallery />
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
