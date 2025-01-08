import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";


import { ArrowCircleDown } from '@mui/icons-material';
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
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
    useMediaQuery
} from "@mui/material";
import { red } from "@mui/material/colors";
import React from "react";
import { useNavigate } from "react-router";
import { encodeURL } from "../Common/Util";



interface VideoPageTableCardProps {
    // handleDelete1
    handleSortChange1,
    SortBy1,
    SortDirection1,
    onDelete?: (Video_Id: number) => void;
    data: Array<{
        videoName: string;
        lastUpdated: string;
        Video_Id: number;
        URLSource: string;
    }>;
    view: "table" | "card";
}

const VideoPageTableCard: React.FC<VideoPageTableCardProps> = ({ data, onDelete, handleSortChange1, SortBy1, SortDirection1 }) => {

    const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down("sm"));
    const navigate = useNavigate();




    const ViewVideoGalleryPage = (Video_Id: any, videoName: string, URLSource: string) => {
        navigate('/RITeSchool/Teacher/ViewVideoGallery/' + encodeURL(Video_Id) + '/' + encodeURL(videoName) + '/' + encodeURL(URLSource), { state: { fromInternal: true } });
    };
    const handleEdit1 = (action: string, item: any) => {
        navigate('/RITeSchool/Teacher/AddNewVideo/' + (item.RowID), { state: { fromInternal: true } })
    }

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
                                background: (theme) => theme.palette.secondary.main, color: (theme) => theme.palette.common.white,
                            }}>
                            <TableCell
                                sx={{
                                    textTransform: 'capitalize',
                                    color: "white"
                                    , py: 1.5
                                }}>

                                <b onClick={() => handleSortChange1('Video_Name')} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
                                    Video Name{SortBy1 === 'Video_Name' && (SortDirection1 === 'asc' ? <ArrowCircleUpIcon /> : <ArrowCircleDown />)}
                                </b>
                            </TableCell>
                            <TableCell sx={{
                                textTransform: 'capitalize',
                                color: "white",
                                py: 1.5
                            }}>


                                <b onClick={() => handleSortChange1('Update_Date')} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
                                    Last Updated Date{SortBy1 === 'Update_Date' && (SortDirection1 === 'asc' ? <ArrowCircleUpIcon /> : <ArrowCircleDown />)}
                                </b>
                            </TableCell>
                            <TableCell sx={{ textAlign: "center", color: "white", py: 1.5 }}>View</TableCell>
                            <TableCell sx={{ textTransform: 'capitalize', color: "white", textAlign: "center", py: 1.5 }}><b>Edit</b></TableCell>
                            <TableCell sx={{ textTransform: 'capitalize', color: "white", textAlign: "center", py: 1.5 }}><b>Delete</b></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((row, index, item) => (
                            <TableRow key={index}>
                                <TableCell sx={{ py: 0.5 }}>{row.videoName}</TableCell>
                                <TableCell sx={{ py: 0.5 }}>{row.lastUpdated}</TableCell>
                                <TableCell sx={{ textAlign: "center", py: 0.5 }}>
                                    <Tooltip title={"View"}>
                                        <IconButton
                                            onClick={() => ViewVideoGalleryPage(row.Video_Id, row.URLSource, row.videoName)} color="primary">
                                            <VisibilityIcon />

                                        </IconButton>
                                    </Tooltip>
                                </TableCell>
                                <TableCell sx={{ textAlign: "center", py: 0.5 }}>
                                    <Tooltip title={"Edit"}>
                                        <IconButton
                                            onClick={() => handleEdit1("Edit", row)} color="primary">
                                            <EditIcon />
                                        </IconButton>
                                    </Tooltip>
                                </TableCell>
                                <TableCell sx={{ textAlign: "center", py: 0.5 }}>
                                    <Tooltip title="Delete">
                                        <IconButton
                                            // onClick={() => handleDelete1(row.videoName)}
                                            onClick={() => onDelete?.(row.Video_Id)}

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
                                        <IconButton onClick={() => (row.videoName)} color="primary">
                                            <VisibilityIcon />
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip title="Edit">
                                        <IconButton onClick={() => (row.videoName)} color="primary">
                                            <EditIcon />
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip title="Delete">
                                        <IconButton
                                            onClick={() => (row.videoName)}
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
