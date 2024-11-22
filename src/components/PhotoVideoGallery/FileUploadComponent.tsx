import React, { useState } from "react";
import {
    Box,
    Button,
    Grid,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    TextField,
    Tooltip,
    Typography,
} from "@mui/material";
import { CheckCircle, CloudUpload as CloudUploadIcon } from "lucide-react";
import { blue } from "@mui/material/colors";

const FileUploadComponent: React.FC = () => {
    const [files, setFiles] = useState<File[]>([]);
    const [comment, setComment] = useState("");
    const [fileList, setFileList] = useState<{ fileNames: string[]; comment: string }[]>([]);

    const ValidFileTypes = [".bmp", ".jpg", ".jpeg", ".png"];
    const MaxfileSize = 10 * 1000000; // 10 MB in bytes
    const FileLabel = "No files selected";

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            const selectedFiles = Array.from(event.target.files);
            setFiles(selectedFiles);
        }
    };

    const handleAddFile = () => {
        if (files.length === 0) {
            alert("At least one file must be selected.");
            return;
        }

        if (!comment.trim()) {
            alert("Please add a comment.");
            return;
        }

        const newEntry = {
            fileNames: files.map((file) => file.name),
            comment,
        };

        setFileList([...fileList, newEntry]);
        setFiles([]); // Reset file input
        setComment(""); // Reset comment field
    };

    return (
        <Box pt={2}>
            <Grid container spacing={2}>
                {/* File Input */}
                <Grid item xs={12} sm={6} md={4} lg={4} xl={3}>
                    <Tooltip
                        title={`Supports only ${ValidFileTypes.join(", ")} file types. File size should not exceed ${(MaxfileSize / 1000000).toFixed(1)} MB.`}
                        arrow
                    >
                        <Button
                            sx={{
                                width: 470,
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
                                {files.length > 0 ? <CheckCircle color="blue" /> : <CloudUploadIcon color="blue" />}
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
                        onChange={(e) => setComment(e.target.value)}
                        fullWidth
                    />
                </Grid>

                {/* Add Button */}
                <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
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
                    Add Files
                </Button>
            </Grid>
        </Grid>

      {/* Table to display files */ }
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
                    </TableRow>
                </TableHead>
                <TableBody>
                    {fileList.map((entry, index) => (
                        <TableRow key={index}>
                            <TableCell>{entry.fileNames.join(", ")}</TableCell>
                            <TableCell>{entry.comment}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        )
    }
    </Box >
  );
};

export default FileUploadComponent;
