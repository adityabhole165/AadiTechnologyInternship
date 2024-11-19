import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import DownloadIcon from "@mui/icons-material/Download";
import EditIcon from "@mui/icons-material/Edit";
import SlideshowIcon from "@mui/icons-material/Slideshow";
import VisibilityIcon from "@mui/icons-material/Visibility";
import {
    Box,
    Card,
    CardContent,
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
    useTheme,
} from "@mui/material";
import { red } from "@mui/material/colors";
import React from "react";
import { useNavigate } from 'react-router';

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

    const handleAction = (action: string, item: any) => {
        alert(`${action} clicked for ${item.galleryName}`);
    };
   
      const ViewPhotoFilePage = (value) => {
        navigate('/extended-sidebar/Teacher/ViewPhotoFile');
      };

    return (
        <Box>
            {/* Automatically switch between table and card views */}
            {!isMobile ? (
                // Table View
                <Table aria-label="simple table" sx={{ border: (theme) => `1px solid ${theme.palette.grey[300]}` }}>
                    <TableHead>
                        <TableRow sx={{ background: (theme) => theme.palette.secondary.main, color: (theme) => theme.palette.common.white }}>
                            <TableCell sx={{ textTransform: 'capitalize', color: 'white', py: 2 }}>Gallery Name</TableCell>
                            <TableCell sx={{ textTransform: 'capitalize', color: 'white', py: 2 }}>Class Name</TableCell>
                            <TableCell sx={{ textTransform: 'capitalize', color: 'white', py: 2 }}>Last Updated Date</TableCell>
                            <TableCell sx={{ textTransform: 'capitalize', color: 'white', py: 2, textAlign: 'center', }}>View</TableCell>
                            <TableCell sx={{ textTransform: 'capitalize', color: 'white', py: 2, textAlign: 'center', }}>Slide Show</TableCell>
                            <TableCell sx={{ textTransform: 'capitalize', color: 'white', py: 2, textAlign: 'center', }}>Download</TableCell>
                            <TableCell sx={{ textTransform: 'capitalize', color: 'white', py: 2, textAlign: 'center', }}>Edit</TableCell>
                            <TableCell sx={{ textTransform: 'capitalize', color: 'white', py: 2, textAlign: 'center', }}>Delete</TableCell>
                        </TableRow>
                        
                    </TableHead>
                    <TableBody>
                        {data.map((item, index) => (
                            <TableRow key={index}>
                                <TableCell sx={{ textTransform: 'capitalize', py: 1 }}>{item.galleryName}</TableCell>
                                <TableCell sx={{ textTransform: 'capitalize', py: 1 }}>{item.className}</TableCell>
                                <TableCell sx={{ textTransform: 'capitalize', py: 1 }}>{item.lastUpdated}</TableCell>

                                <TableCell sx={{ textTransform: 'capitalize', py: 1, textAlign: 'center', }}>
                                    <Tooltip title={"View"}>
                                        <IconButton
                                            onClick={ViewPhotoFilePage}
                                            color="primary"
                                        >
                                            <VisibilityIcon />
                                        </IconButton>
                                    </Tooltip>
                                </TableCell>
                                <TableCell sx={{ textTransform: 'capitalize', py: 1, textAlign: 'center', }}>
                                    <Tooltip title={"Slide Show"}>
                                        <IconButton
                                            onClick={() => handleAction("Slide Show", item)}
                                            color="primary"
                                        >
                                            <SlideshowIcon />
                                        </IconButton>
                                    </Tooltip>
                                </TableCell>
                                <TableCell sx={{ textTransform: 'capitalize', py: 1, textAlign: 'center', }}>
                                    <Tooltip title={"Download"}>
                                        <IconButton
                                            onClick={() => handleAction("Download", item)}
                                            color="primary"
                                        >
                                            <DownloadIcon />
                                        </IconButton>
                                    </Tooltip>
                                </TableCell>
                                <TableCell sx={{ textTransform: 'capitalize', py: 1, textAlign: 'center', }}>
                                    <Tooltip title={"Edit"}>
                                        <IconButton
                                            onClick={() => handleAction("Edit", item)}
                                            color="primary"
                                        >
                                            <EditIcon />
                                        </IconButton>
                                    </Tooltip>
                                </TableCell>
                                <TableCell sx={{ textTransform: 'capitalize', py: 1, textAlign: 'center', }}>
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
    );
};

export default PhotopageTableCard;
