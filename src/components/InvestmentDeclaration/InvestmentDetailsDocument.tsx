import { Box, Button, debounce, Dialog, DialogActions, DialogContent, DialogTitle, Grid, TextField, Typography } from "@mui/material";
import { green } from "@mui/material/colors";
import { ClearIcon } from "@mui/x-date-pickers";
import { useCallback, useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { AlertContext } from 'src/contexts/AlertContext';
import { ICheckPublishUnpublishDocumentBody, IDeleteInvestmentDocumentBody, IGetAllDocumentsListBody, IGetInvestmentDocumentFileBody, ISaveInvestmentDocumentBody } from 'src/interfaces/InvestmentDeclaration/IAddInvestmentDetailsDocument';
import ErrorMessage1 from "src/libraries/ErrorMessages/ErrorMessage1";
import SingleFile from 'src/libraries/File/SingleFile';
import { deleteresetInvestMessage, getAllDocumentsList, getCheckPublishUnpublishDocument, getDeleteInvestmentDocument, getInvestmentDocumentFile, getSaveInvestmentDocument, resetSaveInvestmentMessage } from 'src/requests/InvestmentDeclaration/ReqAddInvestmentDetailsDocument';
import { RootState } from 'src/store';
import InvestmentDocumentList from './InvestmentDocumentList';


const InvestmentDeatailsDocument = ({ Id, UserName, DocumentName, open, handleClose }) => {
    console.log(Id, "wow");
    console.log(UserName, "UserName");
    console.log(DocumentName, "DocumentName");


    const [ID, setID] = useState('')
    const dispatch = useDispatch();
    const HeaderList = [
        { Id: 1, Header: 'File Name' },
        { Id: 2, Header: 'View', align: "center" },
        { Id: 3, Header: 'Delete', align: "center" },

    ];
    const SiteURL = localStorage.getItem('SiteURL');
    let aFolderName = SiteURL.split('/')[SiteURL.split('/').length - 1];
    const ValidFileTypes = ["BMP", "DOC", "DOCX", "JPG", "JPEG", "PDF", "XLS", "XLSX"];
    const MaxfileSize = 5000000;
    const debouncedFetch = useCallback(debounce((body) => {
        dispatch(getSaveInvestmentDocument(body));
    }, 500), [dispatch]);
    console.log(debouncedFetch, "debouncedFetch");


    const { showAlert, closeAlert } = useContext(AlertContext);
    const [fileName, setFileName] = useState('');
    const [fileNameError, setFileNameError] = useState('');
    const [File, setFile] = useState('');
    const [base64URL, setbase64URL] = useState('');
    const asSchoolId = Number(localStorage.getItem('localSchoolId'));
    const asFolderName = Number(localStorage.getItem('FolderName'));
    const asFinancialYearId = sessionStorage.getItem('FinancialYearId');
    const asAcademicYearId = Number(sessionStorage.getItem('AcademicYearId'));
    const asUserId = Number(localStorage.getItem('UserId'));
    const USCheckPublishUnpublishDocument: any = useSelector(
        (state: RootState) => state.AddInvestmentDetailsDoc.ISCheckPublishUnpublishDocument
    );
    const USSaveInvestmentDocument: any = useSelector(
        (state: RootState) => state.AddInvestmentDetailsDoc.ISSaveInvestmentDocument
    );
    const USGetAllDocumentsList: any = useSelector(
        (state: RootState) => state.AddInvestmentDetailsDoc.ISGetAllDocumentsList
    );
    const USInvestmentDocumentFile: any = useSelector(
        (state: RootState) => state.AddInvestmentDetailsDoc.ISGetInvestmentDocumentFile
    );
    const USDeleteInvestmentDocument: any = useSelector(
        (state: RootState) => state.AddInvestmentDetailsDoc.ISDeleteInvestmentDocument
    );


    console.log(USCheckPublishUnpublishDocument, "USCheckPublishUnpublishDocument");

    const GetCheckPublishUnpublishDocumentBody: ICheckPublishUnpublishDocumentBody = {
        asSchoolId: asSchoolId,
        asFinancialYearId: 1,
        asUserId: asUserId
    };
    const SaveInvestmentDocumentBody: ISaveInvestmentDocumentBody = {
        asSchoolId: asSchoolId,
        asAcademicYearId: asAcademicYearId,
        asFinancialYearId: 1,
        asDocumentId: Number(Id),
        asFileName: fileName == '' ? null : fileName,
        asUserId: asUserId,
        asInsertedById: asUserId,
        asDocumnetTypeId: 1,
        asReportingUserId: 0,
        asSaveFeature: "Investment Declarations",
        asFolderName: asFolderName.toString(),
        asBase64String: base64URL == '' ? null : base64URL
    }
    const GetGetAllDocumentsListBody: IGetAllDocumentsListBody = {
        asSchoolId: asSchoolId,
        asUserId: asUserId,
        asFinancialYearId: 1,
        asDocumentTypeId: 1,
        asAcademicYearId: asAcademicYearId,
        asDocumentId: Number(Id),
        asReportingUserId: 0,
        asLoginUserId: asUserId
    }
    const InvestmentDocumentFileBody: IGetInvestmentDocumentFileBody = {
        asSchoolId: asSchoolId,
        asId: 2303,
    };
    useEffect(() => {
        dispatch(getCheckPublishUnpublishDocument(GetCheckPublishUnpublishDocumentBody))
    }, [])

    const ClickUpload = () => {
        let isError = false;
        if (!fileName || fileName === '') {
            setFileNameError('Please select file to upload.');
            isError = true; // Set isError to true for this condition
        } else {
            setFileNameError('');
        }
        if (!isError) {
            // dispatch(Savedailylog(SaveDailylogBody));
            debouncedFetch(SaveInvestmentDocumentBody);
            ResetForm();
        }
        // dispatch(getSaveInvestmentDocument(SaveInvestmentDocumentBody))
    }
    useEffect(() => {
        dispatch(getAllDocumentsList(GetGetAllDocumentsListBody))
    }, [Id])
    useEffect(() => {
        dispatch(getInvestmentDocumentFile(InvestmentDocumentFileBody))
    }, [])
    const ChangeFile = (value) => {
        setFile(value.Name);
        setbase64URL(value.Value);
        setFileName(value.Name);
    };
    const ResetForm = () => {
        setFileName('');
        setbase64URL('');

    };
    const ClickDelete = (Id) => {
        const DeleteInvestmentDocumentBody: IDeleteInvestmentDocumentBody = {
            asSchoolId: asSchoolId,
            asFinancialYearId: 1,
            asUpdatedById: asUserId,
            asDocumentId: Number(Id),
            asDocumnetTypeId: 1
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
        if (USSaveInvestmentDocument != '') {
            toast.success(USSaveInvestmentDocument);
            dispatch(resetSaveInvestmentMessage());
            dispatch(getAllDocumentsList(GetGetAllDocumentsListBody))
        }
    }, [USSaveInvestmentDocument]);

    useEffect(() => {
        if (USDeleteInvestmentDocument !== '') {
            toast.success("Document deleted successfully.");
            dispatch(deleteresetInvestMessage());
            dispatch(getAllDocumentsList(GetGetAllDocumentsListBody))
        }
    }, [USDeleteInvestmentDocument]);
    const ClickView = (Id) => {
        if (USInvestmentDocumentFile !== '') {
            window.open(
                localStorage.getItem('SiteURL') +
                '/RITeSchool/DOWNLOADS/InvestmentDeclaration/InvestmentDetailsDocument/' +
                Id
            );
        }
    }
    return (
        <Dialog
            open={open}
            maxWidth={'md'}
            fullWidth
            onClose={handleClose}
            PaperProps={{
                sx: {
                    borderRadius: "15px",
                }
            }}
        >
            <DialogTitle sx={{ bgcolor: '#223354' }}>
                <ClearIcon onClick={handleClose}
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

            <DialogContent  >
                <Box>
                    <Typography variant="h2" sx={{pt:2, pl:1}}>Documents</Typography>
                   <Box sx={{ background: 'white', top: '1px', alignItems:'center',pl:1, pr:2, pt:2 }}>
                    <Grid container spacing={2} >
                        <Grid item xs={4}>
                            <TextField
                                fullWidth
                                label={<>
                                    User Name <span style={{ color: 'red' }}>*</span>
                                </>}
                                InputLabelProps={{ shrink: true }}
                                sx={{ bgcolor: '#F0F0F0', width:'100%' }}
                                value={UserName}
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
                                    Doucment Name  <span style={{ color: 'red' }}>*</span>
                                </>}
                                InputLabelProps={{ shrink: true }}
                                sx={{ bgcolor: '#F0F0F0', width:'100%' }}
                                value={DocumentName}
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
                                    errorMessage={''}
                                    isMandatory={false}
                                    
                                />
                                {fileNameError && (
                                    <Box sx={{ mt: 1, position: 'absolute', bottom: '-25px',  }}>
                                        <ErrorMessage1 Error={fileNameError}></ErrorMessage1>
                                    </Box>
                                )}
                            </Box>
                        </Grid>
                    </Grid>
                    </Box>
                </Box>
            </DialogContent>
            <Box sx={{ backgroundColor: 'white', pl: 2, pr:2 }}>
                {USGetAllDocumentsList.length > 0 ? (
                    <InvestmentDocumentList
                        HeaderArray={HeaderList}
                        ItemList={USGetAllDocumentsList}
                        clickDelete={ClickDelete}
                        clickView={ClickView}
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
                    onClick={handleClose}
                >
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
        </Dialog >
    );
}
export default InvestmentDeatailsDocument;