import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import {
    Box,
    Button,
    Grid,
    IconButton,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    TextField,
    Tooltip,
    Typography
} from "@mui/material";
import { red } from "@mui/material/colors";
import ErrorMessage1 from 'src/libraries/ErrorMessages/ErrorMessage1';



const FileUploadComponent = ({ files, commentError, comment, setFiles, setComment, setFileList, fileList, handleFileChange, handleAddFile }) => {
    const FileLabel = "Select Images";
    const handleDelete = (index: number) => {
        const updatedFileList = fileList.filter((_, fileIndex) => fileIndex !== index);
        setFileList(updatedFileList); // Update the state
    };
    return (
        <Box pt={2}>
            <Grid container spacing={2}>
                {/* File Input */}
                <Grid item xs={12} sm={6} md={4} lg={4} xl={2}>
                    <Tooltip
                        title={'Supports files of types - .BMP, .JPG, .JPEG, .PNG with total size upto 10 MB.'}
                    >
                        <Button
                            sx={{
                                width: 'auto',
                                height: 52,
                                border: (theme) => `1px dashed ${theme.palette.primary.main}`,
                                gap: 1,
                                position: "relative",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                                color: "primary.main",
                            }}
                            component="label"
                        >
                            <Stack
                                direction="row"
                                alignItems="center"
                                gap={1}
                                sx={{
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                    whiteSpace: "nowrap",
                                }}
                            >
                                {files.length > 0 ? <CloudUploadIcon sx={{ color: '#38548A' }} /> : <CloudUploadIcon sx={{ color: '#38548A' }} />}
                                <Typography variant="body2" noWrap>
                                    {files.length > 0
                                        ? files.map((file) => file.name).join(", ")
                                        : FileLabel}
                                </Typography>
                            </Stack>
                            <input
                                type="file"
                                multiple
                                style={{ display: "none" }}
                                onChange={handleFileChange}
                            />
                        </Button>
                    </Tooltip>
                </Grid>

                {/* Comment Input */}
                <Grid item xs={12} sm={6} md={4} lg={5} xl={4}>
                    <TextField
                        label="Comment"
                        variant="outlined"
                        value={comment}
                        // onChange={(e) => setComment(e.target.value)}
                        onChange={(e) => setComment(e.target.value.slice(0, 200))}
                        inputProps={{ maxLength: 200 }}
                        fullWidth
                    />
                    <ErrorMessage1 Error={commentError}></ErrorMessage1>
                </Grid>

                {/* Add Button */}
                {/* <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
                    <Button
                        onClick={handleAddFile}
                        sx={{
                            mt: 1, color: '#38548A',
                            //  backgroundColor: grey[500],
                            '&:hover': {
                                color: '#38548A',
                                backgroundColor: blue[100]
                            }
                        }}

                    >
                        Add Photos
                    </Button>
                </Grid> */}
            </Grid>

            {/* Table to display files */}
            {
                fileList.length > 0 && (
                    <Table sx={{ mt: 3, border: 1, borderColor: "grey.300" }}>
                        <TableHead>
                            <TableRow>
                                <TableCell>
                                    <Typography color="primary"><strong>File Names</strong></Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography color="primary"><strong>Comment</strong></Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography color="primary"><strong>Delete</strong></Typography>
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {fileList.map((entry, index) => (
                                <TableRow key={index}>
                                    <TableCell>  <Stack direction="row" spacing={1} flexWrap="wrap">{entry.fileNames}</Stack></TableCell>
                                    <TableCell>{entry.comment}</TableCell>
                                    <TableCell>
                                        <IconButton
                                            onClick={() => handleDelete(index)} // Call the delete handler

                                            // onClick={() => handleDelete(user.UserId)}
                                            sx={{
                                                color: '#38548A	',
                                                '&:hover': {
                                                    color: 'red',
                                                    backgroundColor: red[100]
                                                }
                                            }}
                                        >
                                            <Tooltip title="Delete" >
                                                <DeleteForeverIcon />
                                            </Tooltip>
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                )
            }
        </Box >
    );
};

export default FileUploadComponent




