import ClearIcon from '@mui/icons-material/Clear'; // Ensure you have the correct import for ClearIcon
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, TextField, Typography } from "@mui/material";
import { green } from "@mui/material/colors";
import { useState } from 'react';
import { toast } from 'react-toastify';
import SingleFile from 'src/libraries/File/SingleFile';
import InvestmentDocumentList from '../InvestmentDeclaration/InvestmentDocumentList';

const StudentDocumentUpload = ({ studentName, documentName, open, handleClose, onUploadSuccess, documents }) => {
    const [fileName, setFileName] = useState('');
    const [documentList, setdocumentList] = useState([]);
    const [fileNameError, setFileNameError] = useState('');
    const [base64URL, setBase64URL] = useState('');
    const HeaderList = [
        { Id: 1, Header: 'File Name' },
        { Id: 2, Header: 'View', align: "center" },
        { Id: 3, Header: 'Delete', align: "center" },

    ];
    const ValidFileTypes = ["BMP", "DOC", "DOCX", "JPG", "JPEG", "PDF", "XLS", "XLSX"];
    const MaxFileSize = 5000000;

    const ChangeFile = (value) => {
        setFileName(value.Name);
        setBase64URL(value.Value);
        setFileNameError(value.ErrorMsg);
    };

    const ClickUpload = () => {
        let isError = false;

        if (!fileName) {
            setFileNameError('Please select a file to upload.');
            isError = true;
        } else {
            setFileNameError('');
        }

        if (!isError) {
            // Call a function or dispatch an action to save the document here
            // Simulating upload success
            toast.success("Document uploaded successfully.");
            onUploadSuccess(); // Call the success handler passed from props
            ResetForm();
        }
    };

    const ResetForm = () => {
        setFileName('');
        setBase64URL('');
    };

    const ClickDelete = (documentId) => {
        // Simulate delete confirmation and action
        if (window.confirm('Are you sure you want to delete this document?')) {
            toast.success("Document deleted successfully.");
            // Call a function to handle deletion here
        }
    };

    const ClickView = (fileName) => {
        window.open(`your-file-url/${fileName}`);
    };

    const handleDialogClose = () => {
        ResetForm();
        handleClose();
    };

    return (
        <Dialog
            open={open}
            maxWidth={'md'}
            fullWidth
            onClose={handleDialogClose}
            PaperProps={{
                sx: {
                    borderRadius: "15px",
                }
            }}
        >
            <DialogTitle sx={{ bgcolor: '#223354' }}>
                <ClearIcon onClick={handleDialogClose}
                    sx={{
                        color: 'white',
                        // background:'white',
                        borderRadius: '7px',
                        position: 'absolute',
                        top: '5px',
                        right: '8px',
                        cursor: 'pointer',
                        '&:hover': {
                            color: 'red',
                            //  backgroundColor: red[100]

                        }
                    }} />
            </DialogTitle>

            <DialogContent>
                <Box>
                    <Typography variant="h2" sx={{ pt: 2, pl: 1 }}>Upload Documents</Typography>
                    <Box sx={{ background: 'white', top: '1px', alignItems: 'center', pl: 1, pr: 2, pt: 2 }}>
                        <Grid container spacing={2} >
                            <Grid item xs={6}>
                                <TextField
                                    fullWidth
                                    label="Student Name"
                                    InputLabelProps={{ shrink: true }}
                                    sx={{ bgcolor: '#F0F0F0', width: '100%' }}
                                    value={studentName}
                                    size={"medium"}
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    fullWidth
                                    label="Document Name"
                                    InputLabelProps={{ shrink: true }}
                                    sx={{ bgcolor: '#F0F0F0', width: '100%' }}
                                    value={documentName}
                                    size={"medium"}
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <SingleFile
                                    ValidFileTypes={ValidFileTypes}
                                    MaxfileSize={MaxFileSize}
                                    FileName={fileName}
                                    ChangeFile={ChangeFile}
                                    FileLabel={'Upload Document'}
                                    width={'100%'}
                                    height={"52px"}
                                    errorMessage={fileNameError}
                                    isMandatory={true}
                                />
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </DialogContent>

            <Box sx={{ backgroundColor: 'white', pl: 3.8, pr: 3.8 }}>
                {documentList.length > 0 ? (
                    <InvestmentDocumentList
                        HeaderArray={HeaderList}
                        ItemList={documentList}
                        clickDelete={ClickDelete}
                        clickView={ClickView}
                    />
                ) : (
                    <Typography variant="h6" align="center" color="blue" sx={{ textAlign: 'center', marginTop: 1, backgroundColor: '#324b84', padding: 1, borderRadius: 2, color: 'white' }}>
                        No record found.
                    </Typography>
                )}
            </Box>

            <DialogActions sx={{ py: 2, px: 3 }}>
                <Button color={'error'} onClick={handleDialogClose}>
                    Cancel
                </Button>
                <Button
                    onClick={ClickUpload}
                    sx={{
                        color: 'green',
                        '&:hover': {
                            color: 'green',
                            backgroundColor: green[100]
                        }
                    }}
                >
                    Upload
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default StudentDocumentUpload;
