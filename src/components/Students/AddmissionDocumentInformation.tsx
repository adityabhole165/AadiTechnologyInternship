// import React from 'react'

// const AddmissionDocumentInformation = ({onSave}) => {
//   return (
//     <div>AddmissionDocumentInformation</div>
//   )
// }

// export default AddmissionDocumentInformation
import { Clear as ClearIcon, QuestionMark } from '@mui/icons-material';
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
import { green } from '@mui/material/colors';
import { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { IDeleteInvestmentDocumentBody, IGetAllDocumentsListBody, ISaveInvestmentDocumentBody } from 'src/interfaces/InvestmentDeclaration/IAddInvestmentDetailsDocument';
import { IGetUserInvestmentMethodDetailsBody } from "src/interfaces/PerformanceGradeAssignmentBaseScreen/IPerformanceGradeAssignment";
import SingleFile from 'src/libraries/File/SingleFile';
import { deleteresetInvestMessage, getDeleteInvestmentDocument, getSaveInvestmentDocument, resetSaveInvestmentMessage } from 'src/requests/InvestmentDeclaration/ReqAddInvestmentDetailsDocument';
import { CDAGetAllDocumentsList, CDAGetUserInvestmentMethodDetails } from "src/requests/PerformanceGradeAssignmentBaseScreen/RequestPerformanceGradeAssignment";
import { CDAGetStudentDocuments } from 'src/requests/Students/RequestStudentUI';
import { RootState } from 'src/store';
//import StudentDocumentUpload from './StudentDetailsDoc';
import { toast } from 'react-toastify';
import UploadDocList from 'src/components/PerformanceGradeAssignment/UploadDocList';
import { AlertContext } from 'src/contexts/AlertContext';
import { IStandrdwiseStudentsDocumentBody } from 'src/interfaces/Students/IStudentUI';


const AdmissionDocumentInformation = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const schoolId = localStorage.getItem('SchoolId');
  const financialYearId = sessionStorage.getItem('FinancialYearId');
  const asUserId = Number(localStorage.getItem('UserId'));  //Environmental User Id
  const asFolderName = localStorage.getItem('FolderName');

  const { Name, standardId, DivisionId, YearWise_Student_Id, SchoolWise_Student_Id, StandardDivision } = location.state || {};
  const { showAlert, closeAlert } = useContext(AlertContext);

  // const [documents, setDocuments] = useState([
  //   { documentName: 'Two Photographs 2', isApplicable: false, isSubmitted: false, attachmentCount: 0 },
  //   { documentName: 'Copy of Birth Certificate', isApplicable: false, isSubmitted: false, attachmentCount: 0 },
  //   { documentName: 'Residence Proof', isApplicable: false, isSubmitted: false, attachmentCount: 0 },
  //   { documentName: 'Fitness Certificate', isApplicable: false, isSubmitted: false, attachmentCount: 0 },
  //   { documentName: 'Copy of Caste Certificate', isApplicable: false, isSubmitted: false, attachmentCount: 0 },
  // ]);

  const [open, setOpen] = useState(false);
  const [selectedDocumentIndex, setSelectedDocumentIndex] = useState(null);
  const [fileName, setFileName] = useState('');
  const [base64URL, setbase64URL] = useState('');
  const [newFile, setNewFile] = useState(false);
  const [fileNameError, setFileNameError] = useState('');
  const [studentName, setStudentName] = useState(''); // State for Student Name
  const [documentName, setDocumentName] = useState(''); // State for Document Name
  const [documentId, setDocumentId] = useState(''); // State for Document Name
  const ValidFileTypes = ["BMP", "DOC", "DOCX", "JPG", "JPEG", "PDF", "XLS", "XLSX"];
  const MaxfileSize = 5000000;
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState({});
  //console.log('documentId', documentId);

  //#region DocBase
  const [selectAllApplicable, setSelectAllApplicable] = useState(false);
  const [selectAllSubmitted, setSelectAllSubmitted] = useState(false);
  const [localDocuments, setLocalDocuments] = useState([]);
  console.log('localDocuments', localDocuments);

  const NavigationValues = useSelector((state: RootState) => state.Students.NavigationValues);
  const RName = NavigationValues?.Name;
  const RYearWise_Student_Id = NavigationValues?.YearWise_Student_Id;
  const RSchoolWise_Student_Id = NavigationValues?.SchoolWise_Student_Id;
  const RDivisionId = NavigationValues?.DivisionId;
  const RStandardId = NavigationValues?.standardId;
  const GetStudentDocumentsList = useSelector((state: RootState) => state.StudentUI.ISGetStudentDocuments);
  // console.log('GetStudentDocumentsList', GetStudentDocumentsList);

  const GetStudentDocuments: IStandrdwiseStudentsDocumentBody = {
    asSchoolId: Number(localStorage.getItem('localSchoolId')),
    asStandardId: standardId ?? RStandardId,
    asStudentId: SchoolWise_Student_Id ?? RSchoolWise_Student_Id,
    asAcademicYearId: Number(sessionStorage.getItem('AcademicYearId')),
  };

  // useEffect(() => {
  //   dispatch(CDAGetStudentDocuments(GetStudentDocuments));
  // }, []);

  useEffect(() => {
    if (GetStudentDocumentsList?.length > 0) {
      setLocalDocuments(GetStudentDocumentsList.map(doc => ({
        ...doc,
        IsApplicable: doc.IsApplicable == "True" ? true : false,
        IsSubmitted: doc.IsSubmitted == "True" ? true : false,
      })));
    }
  }, [GetStudentDocumentsList]);

  // const handleCheckboxChange = (index, field) => {
  //   const updatedDocuments = [...GetStudentDocumentsList];
  //   updatedDocuments[index][field] = !updatedDocuments[index][field];
  //   //console.log('updatedDocuments', updatedDocuments[index][field]);
  //   //setDocuments(updatedDocuments);
  // };

  useEffect(() => {
    // Check if all IsApplicable checkboxes are selected, and update selectAllApplicable accordingly
    setSelectAllApplicable(localDocuments.every(doc => doc.IsApplicable));
    setSelectAllSubmitted(localDocuments.every(doc => doc.IsSubmitted));
  }, [localDocuments]);


  const handleSelectAllApplicable = (event) => {
    const isChecked = event.target.checked;
    setSelectAllApplicable(isChecked);


    const updatedDocs = localDocuments.map(doc => ({
      ...doc,
      IsApplicable: isChecked
    }));
    setLocalDocuments(updatedDocs);
    console.log('isChecked', isChecked);
    console.log('updatedDocs', updatedDocs);
  };

  const handleSelectAllSubmitted = (event) => {
    const isChecked = event.target.checked;
    setSelectAllSubmitted(isChecked);


    const updatedDocs = localDocuments.map(doc => ({
      ...doc,
      IsSubmitted: isChecked
    }));
    setLocalDocuments(updatedDocs);
  };

  const handleCheckboxChange = (documentId, field) => {
    // Update local state
    setLocalDocuments(prevDocs => {
      const updatedDocs = prevDocs.map(doc => {
        if (doc.StandardwiseDocumentId === documentId) {
          //const newValue = !doc[field];
          return {
            ...doc,
            [field]: !doc[field]
          };
        }
        return doc;
      });

      // Update select all states based on all documents
      if (field === 'IsApplicable') {
        setSelectAllApplicable(updatedDocs.every(doc => doc.IsApplicable));
      } else if (field === 'IsSubmitted') {
        setSelectAllSubmitted(updatedDocs.every(doc => doc.IsSubmitted));
      }

      return updatedDocs;
    });
  }

  //#endregion

  //#region DocPop
  const HeaderList = [
    { Id: 1, Header: 'File Name' },
    { Id: 2, Header: 'View', align: "center" },
    { Id: 3, Header: 'Delete', align: "center" },

  ];
  const USGetSingleStudentDetails = useSelector((state: RootState) => state.StudentUI.ISGetSingleStudentDetails);
  const oStudentDetails = USGetSingleStudentDetails[0]
  const User_Id = oStudentDetails?.User_Id || '';  //Student UserId
  //console.log('User_Id', User_Id);
  const UserInvestmentMethodDetails: any = useSelector((state: RootState) => state.PerformanceGradeAssignment.ISUserInvestmentMethodDetails);
  const GetAllDocumentsList: any = useSelector((state: RootState) => state.PerformanceGradeAssignment.ISGetAllDocumentsList);
  console.log('UserInvestmentMethodDetails', UserInvestmentMethodDetails);
  //console.log('GetAllDocumentsList', GetAllDocumentsList);

  const USDeleteInvestmentDocument: any = useSelector((state: RootState) => state.AddInvestmentDetailsDoc.ISDeleteInvestmentDocument);
  const USSaveInvestmentDocument: any = useSelector((state: RootState) => state.AddInvestmentDetailsDoc.ISSaveInvestmentDocument);
  const USGetAllDocumentsList: any = useSelector((state: RootState) => state.AddInvestmentDetailsDoc.ISGetAllDocumentsList);
  console.log('USGetAllDocumentsList', GetAllDocumentsList);

  const GetUserInvestmentMethodDetailsBody: IGetUserInvestmentMethodDetailsBody = {
    asSchoolId: Number(schoolId),
    asFinancialYearId: Number(financialYearId),
    asUserId: User_Id,
    asDocumentId: documentId,
    asDocumentTypeId: 2
  }

  const IGetAllDocumentsListBody: IGetAllDocumentsListBody = {
    asSchoolId: Number(schoolId),
    asUserId: User_Id,
    asFinancialYearId: 1,
    asDocumentTypeId: 2,
    asAcademicYearId: 0,// Number(yearId),
    asDocumentId: Number(documentId),
    asReportingUserId: 0,// Number(ReportingUserId),
    asLoginUserId: Number(sessionStorage.getItem('Id'))
  }

  useEffect(() => {
    // if (Id !== '0' && ReportingUserId !== '0') {
    dispatch(CDAGetUserInvestmentMethodDetails(GetUserInvestmentMethodDetailsBody));
    dispatch(CDAGetAllDocumentsList(IGetAllDocumentsListBody))
    setFileNameError('')
    // }
  }, [open])

  const ClickUpload = () => {
    let isError = false;

    const SaveInvestmentDocumentBody: ISaveInvestmentDocumentBody = {
      asSchoolId: Number(schoolId),
      asAcademicYearId: 0,//Number(yearId),
      asFinancialYearId: Number(financialYearId),
      asDocumentId: Number(documentId),
      asFileName: fileName === '' ? null : fileName,
      asUserId: User_Id,
      asInsertedById: asUserId,
      asDocumnetTypeId: 2,
      asReportingUserId: 0,// Number(ReportingUserId),
      asSaveFeature: UserInvestmentMethodDetails?.DocumentName,
      asFolderName: asFolderName.toString(),
      asBase64String: base64URL == '' ? null : base64URL
    }
    // const fileExtension = fileName.split('.').pop().toUpperCase();

    // // Check for valid file type
    // if (!ValidFileTypes.includes(fileExtension)) {
    //     setValidFile('Please select a valid file type.');
    //     isError = true;
    // } else {
    //     setValidFile('');
    // }
    console.log('SaveInvestmentDocumentBody', SaveInvestmentDocumentBody);

    if (!fileName || fileName === '') {
      setFileNameError('Please select file to upload.');
      isError = true;
    } else {
      setFileNameError('');
    }
    if (!isError) {
      // console.log(`Following is the Body for the save document -`, SaveInvestmentDocumentBody)
      dispatch(getSaveInvestmentDocument(SaveInvestmentDocumentBody));
      //ResetForm();
    }
    // dispatch(getSaveInvestmentDocument(SaveInvestmentDocumentBody))
  }

  useEffect(() => {
    if (USSaveInvestmentDocument != '') {
      toast.success(USSaveInvestmentDocument);
      dispatch(resetSaveInvestmentMessage());
      setNewFile(true);
      // dispatch(getAllDocumentsList(GetGetAllDocumentsListBody))
      dispatch(CDAGetAllDocumentsList(IGetAllDocumentsListBody))
      //RefreshList()
    }
  }, [USSaveInvestmentDocument]);

  const ClickView = (fileName) => {
    window.open(
      localStorage.getItem('SiteURL') +
      '/RITESCHOOL/DOWNLOADS/StudentDocuments/' +
      fileName
      // \\PPSN Website\RITESCHOOL\DOWNLOADS\Performance Evaluation\MCAResult12320240906143621.pdf
      // http://web.aaditechnology.info/RITeSchool//downloads//Performance%20Evaluation//Screenshot%202024-09-05%20095824.pdf
    );
    // RITESchool_PPS_API\PPSN Website\RITESCHOOL\DOWNLOADS\Performance Evaluation
  }

  const ClickDelete = (Id) => {
    const DeleteInvestmentDocumentBody: IDeleteInvestmentDocumentBody = {
      asSchoolId: Number(schoolId),
      asFinancialYearId: Number(financialYearId),
      asUpdatedById: asUserId,
      asDocumentId: Number(Id),
      asDocumnetTypeId: 2
    };
    showAlert({
      title: 'Please Confirm',
      message:
        'Are you sure you want to delete this record?',
      variant: 'warning',
      confirmButtonText: 'Confirm',
      cancelButtonText: 'Cancel',
      onCancel: () => {
        closeAlert();
      },
      onConfirm: () => {
        dispatch(getDeleteInvestmentDocument(DeleteInvestmentDocumentBody))
        closeAlert();
      }
    });
  };
  useEffect(() => {
    if (USDeleteInvestmentDocument !== '') {
      toast.success("Document deleted successfully.");
      dispatch(deleteresetInvestMessage());
      //setNewFile(true);
      // dispatch(getAllDocumentsList(GetGetAllDocumentsListBody))
      dispatch(CDAGetAllDocumentsList(IGetAllDocumentsListBody))
      // RefreshList()
    }
  }, [USDeleteInvestmentDocument]);

  const ResetForm = () => {
    setFileName('');
    setbase64URL('');

  };

  //endregion
  const ChangeFile = (value) => {
    console.log('value', value);
    if (!ValidFileTypes.includes(value.FileExtension.toUpperCase())) {
      //setFileNameError('Invalid file format. Supported formats are BMP, DOC, DOCX, JPG, JPEG, PDF, XLS, XLSX.');
      setFileNameError(value.ErrorMsg);
      setFileName(''); // Clear file name
      setbase64URL(''); // Clear Base64 URL
      return;
    }

    // Calculate file size from Base64 string
    const base64Length = value.Value.length - (value.Value.indexOf(',') + 1); // Exclude metadata
    const padding = (value.Value.endsWith('==') ? 2 : value.Value.endsWith('=') ? 1 : 0);
    const fileSizeInBytes = (base64Length * 3) / 4 - padding;

    if (fileSizeInBytes > MaxfileSize) {
      setFileNameError('File size exceeds 5 MB. Please upload a smaller file.');
      setFileName(''); // Clear file name
      setbase64URL(''); // Clear Base64 URL
      return;
    }
    //ValidateFile passed
    setFileName(value.Name);
    setbase64URL(value.Value);
    setFileNameError(value.ErrorMsg);
  };

  const handleOpenDialog = (index) => {
    setSelectedDocumentIndex(index);
    setStudentName(Name ?? RName); // Replace with actual student name logic
    setDocumentName(GetStudentDocumentsList[index].Name);
    setDocumentId(GetStudentDocumentsList[index].StandardwiseDocumentId);
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
    setFileName('');
    setFileNameError('');
    dispatch(CDAGetStudentDocuments(GetStudentDocuments));
  };

  // const handleUploadFile = () => {
  //   if (fileName && !fileNameError) {
  //     const updatedDocuments = [...documents];
  //     updatedDocuments[selectedDocumentIndex].attachmentCount += 1; // Increment attachment count
  //     setDocuments(updatedDocuments);
  //   }
  //   handleCloseDialog();
  // };

  const validateForm = () => {
    const newErrors = {};
    setErrors(newErrors);
    return !Object.values(newErrors).includes(true);
  };

  // const handleSave = () => {
  //   const isValid = validateForm();
  //   onSave(isValid);
  //   setMessage(isValid ? 'Draft saved successfully!' : 'Please fill in all required fields.');
  //   setTimeout(() => setMessage(''), 2000);
  // };

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
                  <Checkbox color="primary"
                    checked={selectAllApplicable}
                    onChange={handleSelectAllApplicable} />
                </Tooltip>
                Is Applicable?
              </TableCell>
              <TableCell align="center" sx={{ paddingTop: '1.5px', paddingBottom: '1.5px', color: 'white' }}>
                <Tooltip title="Select All Submitted">
                  <Checkbox color="primary"
                    checked={selectAllSubmitted}
                    onChange={handleSelectAllSubmitted} />
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
            {localDocuments.map((doc, index) => (
              <TableRow key={doc.StandardwiseDocumentId}>
                <TableCell align="center" sx={{ textTransform: 'capitalize', width: '250px', paddingTop: '1.5px', paddingBottom: '1.5px' }}>
                  <Checkbox
                    color="primary"
                    checked={doc.IsApplicable}
                    onChange={() => handleCheckboxChange(doc.StandardwiseDocumentId, 'IsApplicable')}
                  />
                </TableCell>
                <TableCell align="center" sx={{ textTransform: 'capitalize', width: '250px', paddingTop: '1.5px', paddingBottom: '1.5px' }}>
                  <Checkbox
                    color="primary"
                    checked={doc.IsSubmitted}
                    onChange={() => handleCheckboxChange(doc.StandardwiseDocumentId, 'IsSubmitted')}
                  />
                </TableCell>
                <TableCell align="left" sx={{ textTransform: 'capitalize', width: '250px', paddingTop: '1.5px', paddingBottom: '1.5px' }}>
                  {doc.Name}
                </TableCell>
                <TableCell align="center" sx={{ textTransform: 'capitalize', width: '250px', paddingTop: '1.5px', paddingBottom: '1.5px' }}>
                  <IconButton color="primary" onClick={() => handleOpenDialog(index)}>
                    <AttachmentIcon />
                  </IconButton>
                </TableCell>
                <TableCell align="center" sx={{ textTransform: 'capitalize', width: '250px', paddingTop: '1.5px', paddingBottom: '1.5px' }}>
                  <Typography variant="body1">{doc.DocumentCount}</Typography> {/* Display attachment count */}
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
          <Tooltip title={'Upload / Delete document(s).'} placement="bottom-end">
            <IconButton
              sx={{
                color: 'white',
                // backgroundColor: grey[500],
                // '&:hover': {
                //   backgroundColor: grey[600]
                // },
                position: 'absolute',
                top: '-1px',
                right: '40px',
              }}
            >
              <QuestionMark />
            </IconButton>
          </Tooltip>
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
                    value={Object.keys(UserInvestmentMethodDetails).length > 0 ? UserInvestmentMethodDetails?.UserName : ''} // Show selected student name
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
                    value={Object.keys(UserInvestmentMethodDetails).length > 0 ? UserInvestmentMethodDetails?.DocumentName : ''}
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
                      FilePath={GetAllDocumentsList.length > 0 ? GetAllDocumentsList.Text2 : ''}
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
          {GetAllDocumentsList.length > 0 ? (
            // <StudentDocumentUpload
            //   studentName="John Doe"
            //   documentName="Math Assignment"
            //   open={isDialogOpen}
            //   handleClose={toggleDialog}
            //   onUploadSuccess={refreshDocumentList}
            //   documents={GetAllDocumentsList}
            // />
            <UploadDocList
              HeaderArray={HeaderList}
              ItemList={GetAllDocumentsList}
              clickDelete={ClickDelete}
              clickView={ClickView}
              isDeletePermission={''}
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
            onClick={ClickUpload} // Increment attachment count only on upload
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
