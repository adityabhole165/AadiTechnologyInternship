import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import {
    Box,
    Card,
    CardContent,
    IconButton,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Theme,
    Tooltip,
    Typography,
    useMediaQuery,
} from "@mui/material";
import { red } from "@mui/material/colors";
import React from "react";
import { useNavigate } from "react-router";

interface VideoData {
    videoName: string;
    lastUpdated: string;
}

interface VideoPageTableCardProps {
    data: VideoData[];
    onView?: (videoName: string) => void;
    onEdit?: (videoName: string) => void;
    onDelete?: (videoName: string) => void;
}

const VideoPageTableCard: React.FC<VideoPageTableCardProps> = ({ data, onView, onEdit, onDelete }) => {
    const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down("sm"));
    const navigate = useNavigate();

    const handleAction = (action: string, videoName: string) => {
        if (action === "View" && onView) onView(videoName);
        if (action === "Edit" && onEdit) onEdit(videoName);
        if (action === "Delete" && onDelete) onDelete(videoName);
    };
    const ViewVideoGalleryPage = (value) => {
        navigate('/extended-sidebar/Teacher/ViewVideoGallery');
      };

    return (
        <Box>
            {!isMobile ? (
                <Table
                    aria-label="simple table"
                    sx={{
                        border: (theme) => `1px solid ${theme.palette.grey[300]}`,
                    }}
                >
                    <TableHead>
                        <TableRow
                            sx={{
                                background: (theme) => theme.palette.secondary.main,
                                color: (theme) => theme.palette.common.white,
                            }}
                        >
                            <TableCell sx={{ textTransform: "capitalize", color: "white" }}>
                                Video Name
                            </TableCell>
                            <TableCell sx={{ textTransform: "capitalize", color: "white" }}>
                                Last Updated Date
                            </TableCell>
                            <TableCell
                                sx={{
                                    textTransform: "capitalize",
                                    color: "white",
                                    textAlign: "center",
                                }}
                            >
                                View
                            </TableCell>
                            <TableCell
                                sx={{
                                    textTransform: "capitalize",
                                    color: "white",
                                    textAlign: "center",
                                }}
                            >
                                Edit
                            </TableCell>
                            <TableCell
                                sx={{
                                    textTransform: "capitalize",
                                    color: "white",
                                    textAlign: "center",
                                    py:1,
                                }}
                            >
                                Delete
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((row, index) => (
                            <TableRow key={index}>
                                <TableCell sx={{ py:1, textTransform:'capitalize'}}>{row.videoName}</TableCell>
                                <TableCell sx={{ py:1, textTransform:'capitalize'}}>{row.lastUpdated}</TableCell>
                                <TableCell sx={{ textAlign: "center",  py:1 }}>
                                    <Tooltip title="View">
                                        <IconButton
                                            onClick={() => ViewVideoGalleryPage(row.videoName)}
                                            color="primary"
                                        >
                                            <VisibilityIcon />
                                        </IconButton>
                                    </Tooltip>
                                </TableCell>
                                <TableCell sx={{ textAlign: "center",  py:1 }}>
                                    <Tooltip title="Edit">
                                        <IconButton
                                            onClick={() => handleAction("Edit", row.videoName)}
                                            color="primary"
                                        >
                                            <EditIcon />
                                        </IconButton>
                                    </Tooltip>
                                </TableCell>
                                <TableCell sx={{ textAlign: "center",  py:1 }}>
                                    <Tooltip title="Delete">
                                        <IconButton
                                            onClick={() => handleAction("Delete", row.videoName)}
                                            sx={{
                                                color: red[500],
                                                "&:hover": {
                                                    backgroundColor: red[100],
                                                   
                                                },
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
                <Box>
                    {data.map((row, index) => (
                        <Card
                            key={index}
                            sx={{
                                mb: 2,
                                border: (theme) => `1px solid ${theme.palette.grey[300]}`,
                            }}
                        >
                            <CardContent>
                                <Typography variant="h6" gutterBottom>
                                    {row.videoName}
                                </Typography>
                                <Typography variant="body2" color="textSecondary" gutterBottom>
                                    Last Updated: {row.lastUpdated}
                                </Typography>
                                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                                    <Tooltip title="View">
                                        <IconButton
                                            onClick={() => handleAction("View", row.videoName)}
                                            color="primary"
                                        >
                                            <VisibilityIcon />
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip title="Edit">
                                        <IconButton
                                            onClick={() => handleAction("Edit", row.videoName)}
                                            color="primary"
                                        >
                                            <EditIcon />
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip title="Delete">
                                        <IconButton
                                            onClick={() => handleAction("Delete", row.videoName)}
                                            sx={{
                                                color: red[500],
                                                "&:hover": {
                                                    backgroundColor: red[100],
                                                }
                                            }}>
                                            <DeleteForeverIcon />
                                        </IconButton>
                                    </Tooltip>
                                </Box>
                            </CardContent>
                        </Card>
                    ))}
                </Box>
            )
            }
        </Box>
    );
};
export default VideoPageTableCard
