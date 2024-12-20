import ArrowCircleDownIcon from "@mui/icons-material/ArrowCircleDown";
import ArrowCircleUpIcon from "@mui/icons-material/ArrowCircleUp";
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
    TableSortLabel,
    Theme,
    Tooltip,
    Typography,
    useMediaQuery,
} from "@mui/material";
import { red } from "@mui/material/colors";
import React, { useState } from "react";
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
    const [sortConfig, setSortConfig] = useState<{ key: keyof VideoData; direction: "asc" | "desc" } | null>(null);
    const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down("sm"));
    const navigate = useNavigate();

    const sortedData = React.useMemo(() => {
        if (sortConfig) {
            return [...data].sort((a, b) => {
                const aValue = a[sortConfig.key];
                const bValue = b[sortConfig.key];
                if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
                if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;
                return 0;
            });
        }
        return data;
    }, [data, sortConfig]);

    const handleSort = (key: keyof VideoData) => {
        setSortConfig((prevConfig) => {
            if (prevConfig?.key === key) {
                return { key, direction: prevConfig.direction === "asc" ? "desc" : "asc" };
            }
            return { key, direction: "asc" };
        });
    };

    const ViewVideoGalleryPage = (value: string) => {
        navigate("/RITeSchool/Teacher/ViewVideoGallery");
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
                            <TableCell sx={{ color: "white", py: 1.5 }}>
                                <TableSortLabel
                                    active={sortConfig?.key === "videoName"}
                                    direction={sortConfig?.key === "videoName" ? sortConfig.direction : "asc"}
                                    onClick={() => handleSort("videoName")}
                                    IconComponent={() =>
                                        sortConfig?.key === "videoName" &&
                                        (sortConfig.direction === "asc" ? (
                                            <ArrowCircleUpIcon sx={{ ml: 1, color: "white", fontSize: "20px" }} />
                                        ) : (
                                            <ArrowCircleDownIcon sx={{ ml: 1, color: "white", fontSize: "20px" }} />
                                        ))
                                    }
                                    sx={{
                                        "&.Mui-active": {
                                            color: "white",
                                        },
                                        "&.MuiTableSortLabel-root:hover": {
                                            color: "white",
                                        },
                                    }}
                                >
                                    Video Name
                                </TableSortLabel>
                            </TableCell>
                            <TableCell sx={{ color: "white", py: 1.5 }}>
                                <TableSortLabel
                                    active={sortConfig?.key === "lastUpdated"}
                                    direction={sortConfig?.key === "lastUpdated" ? sortConfig.direction : "asc"}
                                    onClick={() => handleSort("lastUpdated")}
                                    IconComponent={() =>
                                        sortConfig?.key === "lastUpdated" &&
                                        (sortConfig.direction === "asc" ? (
                                            <ArrowCircleUpIcon sx={{ ml: 1, color: "white", fontSize: "20px" }} />
                                        ) : (
                                            <ArrowCircleDownIcon sx={{ ml: 1, color: "white", fontSize: "20px" }} />
                                        ))
                                    }
                                    sx={{
                                        "&.Mui-active": {
                                            color: "white",
                                        },
                                        "&.MuiTableSortLabel-root:hover": {
                                            color: "white",
                                        },
                                    }}
                                >
                                    Last Updated Date
                                </TableSortLabel>
                            </TableCell>
                            <TableCell sx={{ color: "white", textAlign: "center", py: 1.5 }}>View</TableCell>
                            <TableCell sx={{ color: "white", textAlign: "center", py: 1.5 }}>Edit</TableCell>
                            <TableCell sx={{ color: "white", textAlign: "center", py: 1.5 }}>Delete</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {sortedData.map((row, index) => (
                            <TableRow key={index}>
                                <TableCell sx={{ py: 0.5 }}>{row.videoName}</TableCell>
                                <TableCell sx={{ py: 0.5 }}>{row.lastUpdated}</TableCell>
                                <TableCell sx={{ textAlign: "center", py: 0.5 }}>
                                    <Tooltip title="View">
                                        <IconButton onClick={() => ViewVideoGalleryPage(row.videoName)} color="primary">
                                            <VisibilityIcon />
                                        </IconButton>
                                    </Tooltip>
                                </TableCell>
                                <TableCell sx={{ textAlign: "center", py: 0.5 }}>
                                    <Tooltip title="Edit">
                                        <IconButton onClick={() => onEdit?.(row.videoName)} color="primary">
                                            <EditIcon />
                                        </IconButton>
                                    </Tooltip>
                                </TableCell>
                                <TableCell sx={{ textAlign: "center", py: 0.5 }}>
                                    <Tooltip title="Delete">
                                        <IconButton
                                            onClick={() => onDelete?.(row.videoName)}
                                            sx={{
                                                color: "#38548A",
                                                "&:hover": {
                                                    color: "red",
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
                                        <IconButton onClick={() => onView?.(row.videoName)} color="primary">
                                            <VisibilityIcon />
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip title="Edit">
                                        <IconButton onClick={() => onEdit?.(row.videoName)} color="primary">
                                            <EditIcon />
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip title="Delete">
                                        <IconButton
                                            onClick={() => onDelete?.(row.videoName)}
                                            sx={{
                                                color: "#38548A",
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
                    ))}
                </Box>
            )}
        </Box>
    );
};

export default VideoPageTableCard;
