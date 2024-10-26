// import React from 'react'

// const AddmissionDocumentInformation = ({onSave}) => {
//   return (
//     <div>AddmissionDocumentInformation</div>
//   )
// }

// export default AddmissionDocumentInformation

import { Clear as ClearIcon } from '@mui/icons-material'; // Ensure ClearIcon is imported correctly
import AttachmentIcon from '@mui/icons-material/Attachment';
import {
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Tooltip,
  Typography
} from '@mui/material';
import { blue, grey } from '@mui/material/colors';
import green from '@mui/material/colors/green';
import { useState } from 'react';
import SingleFile from 'src/libraries/File/SingleFile';
import StudentDocumentUpload from './StudentDetailsDoc';

const AdmissionDocumentInformation = ({ onSave }) => {
  const [documents, setDocuments] = useState([
    { documentName: 'Two Photographs', isApplicable: false, isSubmitted: false, attachmentCount: 0 },
    { documentName: 'Copy of Birth Certificate', isApplicable: false, isSubmitted: false, attachmentCount: 0 },
    { documentName: 'Residence Proof', isApplicable: false, isSubmitted: false, attachmentCount: 0 },
    { documentName: 'Fitness Certificate', isApplicable: false, isSubmitted: false, attachmentCount: 0 },
    { documentName: 'Copy of Caste Certificate', isApplicable: false, isSubmitted: false, attachmentCount: 0 },
  ]);

  const [open, setOpen] = useState(false);
  const [selectedDocumentIndex, setSelectedDocumentIndex] = useState(null);
  const [fileName, setFileName] = useState('');
  const [fileNameError, setFileNameError] = useState('');
  const [studentName, setStudentName] = useState(''); // State for Student Name
  const [documentName, setDocumentName] = useState(''); // State for Document Name
  const ValidFileTypes = ["BMP", "DOC", "DOCX", "JPG", "JPEG", "PDF", "XLS", "XLSX"];
  const MaxfileSize = 5000000;
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState({});

  const handleCheckboxChange = (index, field) => {
    const updatedDocuments = [...documents];
    updatedDocuments[index][field] = !updatedDocuments[index][field];
    setDocuments(updatedDocuments);
  };

  const ChangeFile = (value) => {
    setFileName(value.Name);
    setFileNameError(value.ErrorMsg);
  };

  const handleOpenDialog = (index) => {
    setSelectedDocumentIndex(index);
    setStudentName('John Doe'); // Replace with actual student name logic
    setDocumentName(documents[index].documentName);
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
    setFileName('');
    setFileNameError('');
  };

  const handleUploadFile = () => {
    if (fileName && !fileNameError) {
      const updatedDocuments = [...documents];
      updatedDocuments[selectedDocumentIndex].attachmentCount += 1; // Increment attachment count
      setDocuments(updatedDocuments);
    }
    handleCloseDialog();
  };

  const validateForm = () => {
    const newErrors = {};
    setErrors(newErrors);
    return !Object.values(newErrors).includes(true);
  };

  const handleSave = () => {
    const isValid = validateForm();
    onSave(isValid);
    setMessage(isValid ? 'Draft saved successfully!' : 'Please fill in all required fields.');
    setTimeout(() => setMessage(''), 2000);
  };

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [documentList, setDocumentList] = useState([]); // Assume this is your document data

  const toggleDialog = () => {
    setIsDialogOpen(prev => !prev);
  };

  const refreshDocumentList = () => {
    // Logic to refresh the document list after upload
  };

  return (
    <Box sx={{ backgroundColor: 'white', p: 2 }}>
      <TableContainer component={Box} sx={{ border: '1px solid #ddd', marginTop: 2 }}>
        <Table aria-label="document information table">
          <TableHead sx={{ backgroundColor: (theme) => theme.palette.secondary.main }}>
            <TableRow>
              <TableCell align="center" sx={{ paddingTop: '1.5px', paddingBottom: '1.5px', color: 'white' }}>
                <Tooltip title="Select All Applicable">
                  <Checkbox color="primary" />
                </Tooltip>
                Is Applicable?
              </TableCell>
              <TableCell align="center" sx={{ paddingTop: '1.5px', paddingBottom: '1.5px', color: 'white' }}>
                <Tooltip title="Select All Submitted">
                  <Checkbox color="primary" />
                </Tooltip>
                Is Submitted?
              </TableCell>
              <TableCell align="left" sx={{ paddingTop: '1.5px', paddingBottom: '1.5px', color: 'white' }}>
                Document Name
              </TableCell>
              <TableCell align="center" sx={{ paddingTop: '1.5px', paddingBottom: '1.5px', color: 'white' }}>
                Upload Attachment
              </TableCell>
              <TableCell align="center" sx={{ paddingTop: '1.5px', paddingBottom: '1.5px', color: 'white' }}>
                Attachment Count
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {documents.map((doc, index) => (
              <TableRow key={index}>
                <TableCell align="center" sx={{ textTransform: 'capitalize', width: '250px', paddingTop: '1.5px', paddingBottom: '1.5px' }}>
                  <Checkbox
                    color="primary"
                    checked={doc.isApplicable}
                    onChange={() => handleCheckboxChange(index, 'isApplicable')}
                  />
                </TableCell>
                <TableCell align="center" sx={{ textTransform: 'capitalize', width: '250px', paddingTop: '1.5px', paddingBottom: '1.5px' }}>
                  <Checkbox
                    color="primary"
                    checked={doc.isSubmitted}
                    onChange={() => handleCheckboxChange(index, 'isSubmitted')}
                  />
                </TableCell>
                <TableCell align="left" sx={{ textTransform: 'capitalize', width: '250px', paddingTop: '1.5px', paddingBottom: '1.5px' }}>
                  {doc.documentName}
                </TableCell>
                <TableCell align="center" sx={{ textTransform: 'capitalize', width: '250px', paddingTop: '1.5px', paddingBottom: '1.5px' }}>
                  <IconButton color="primary" onClick={() => handleOpenDialog(index)}>
                    <AttachmentIcon />
                  </IconButton>
                </TableCell>
                <TableCell align="center" sx={{ textTransform: 'capitalize', width: '250px', paddingTop: '1.5px', paddingBottom: '1.5px' }}>
                  <Typography variant="body1">{doc.attachmentCount}</Typography> {/* Display attachment count */}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {/* <Grid item xs={12} pt={2} >
        <Button
          sx={{
            color: '#38548A',
            backgroundColor: grey[100],
            '&:hover': {
              color: '#38548A',
              backgroundColor: blue[100]
            }
          }}
          onClick={handleSave}>
          Save And Next
        </Button>
      </Grid> */}

      {/* File upload dialog */}
      <Dialog
        open={open}
        maxWidth={'md'}
        fullWidth
        onClose={handleCloseDialog}
        PaperProps={{
          sx: {
            borderRadius: "15px",
          }
        }}
      >
        <DialogTitle sx={{ bgcolor: '#223354' }}>
          <ClearIcon onClick={handleCloseDialog}
            sx={{
              color: 'white',
              borderRadius: '7px',
              position: 'absolute',
              top: '5px',
              right: '8px',
              cursor: 'pointer',
              '&:hover': {
                color: 'red',
              }
            }} />
        </DialogTitle>
        <DialogContent>
          <Box>
            <Typography variant="h2" sx={{ pt: 2, pl: 1 }}>Upload Documents</Typography>
            <Box sx={{ background: 'white', top: '1px', alignItems: 'center', pl: 1, pr: 2, pt: 2 }}>
              <Grid container spacing={2} >
                <Grid item xs={4}>
                  <TextField
                    fullWidth
                    label={<>
                      Student Name
                    </>}
                    InputLabelProps={{ shrink: true }}
                    sx={{ bgcolor: '#F0F0F0', width: '100%' }}
                    value={studentName} // Show selected student name
                    size={"medium"}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    fullWidth
                    label={<>
                      Document Name
                    </>}
                    InputLabelProps={{ shrink: true }}
                    sx={{ bgcolor: '#F0F0F0', width: '100%' }}
                    value={documentName || 'No record found'} // Show selected document name or 'No record found'
                    size={"medium"}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                </Grid>
                <Grid item xs={4}>
                  <Box sx={{ display: 'flex', alignItems: 'center', ml: 0.7, width: 'calc(100% + 1px)', position: 'relative' }}>
                    <SingleFile
                      ValidFileTypes={ValidFileTypes}
                      MaxfileSize={MaxfileSize}
                      FileName={fileName}
                      ChangeFile={ChangeFile}
                      FileLabel={'Upload Document '}
                      width={'100%'}
                      height={"52px"}
                      errorMessage={fileNameError}
                      isMandatory={true}
                    />
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </DialogContent>
        <Box sx={{ backgroundColor: 'white', pl: 3.8, pr: 3.8 }}>
          {documentList.length > 0 ? (
            <StudentDocumentUpload
              studentName="John Doe"
              documentName="Math Assignment"
              open={isDialogOpen}
              handleClose={toggleDialog}
              onUploadSuccess={refreshDocumentList}
              documents={documentList}
            />
          ) : (
            <Typography variant="h6" align="center" color="blue" sx={{ textAlign: 'center', marginTop: 1, backgroundColor: '#324b84', padding: 1, borderRadius: 2, color: 'white' }} >
              No record found.
            </Typography>
          )}
        </Box>
        <DialogActions sx={{ py: 2, px: 3 }}>
          <Button
            color={'error'}
            onClick={handleCloseDialog}
          >
            Cancel
          </Button>
          <Button
            onClick={handleUploadFile} // Increment attachment count only on upload
            sx={{
              color: 'green',
              '&:hover': {
                color: 'green',
                backgroundColor: green[100]
              }
            }}
            disabled={fileNameError ? true : false} // Disable upload if there's a file error
          >
            Upload
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AdmissionDocumentInformation;
