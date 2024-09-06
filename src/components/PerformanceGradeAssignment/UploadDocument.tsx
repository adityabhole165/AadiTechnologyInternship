import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, TextField, Typography } from "@mui/material";
import { green } from "@mui/material/colors";
import { ClearIcon } from "@mui/x-date-pickers";
import { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { AlertContext } from 'src/contexts/AlertContext';
import { ICheckPublishUnpublishDocumentBody, IDeleteInvestmentDocumentBody, IGetAllDocumentsListBody, IGetInvestmentDocumentFileBody, ISaveInvestmentDocumentBody } from 'src/interfaces/InvestmentDeclaration/IAddInvestmentDetailsDocument';
import { IGetUserInvestmentMethodDetailsBody } from "src/interfaces/PerformanceGradeAssignmentBaseScreen/IPerformanceGradeAssignment";
import SingleFile from 'src/libraries/File/SingleFile';
import { deleteresetInvestMessage, getAllDocumentsList, getCheckPublishUnpublishDocument, getDeleteInvestmentDocument, getInvestmentDocumentFile, getSaveInvestmentDocument, resetSaveInvestmentMessage } from 'src/requests/InvestmentDeclaration/ReqAddInvestmentDetailsDocument';
import { CDAGetAllDocumentsList, CDAGetUserInvestmentMethodDetails } from "src/requests/PerformanceGradeAssignmentBaseScreen/RequestPerformanceGradeAssignment";
import { RootState } from 'src/store';
import UploadDocList from './UploadDocList';


const UploadDocument = ({ Id, yearId, ReportingUserId, open, handleClose, RefreshList, saveButton }) => {
    console.log(Id, "wow");
    // console.log(UserName, "UserName");
    // console.log(DocumentName, "DocumentName");
    // useSelectors()
    const UserInvestmentMethodDetails: any = useSelector((state: RootState) => state.PerformanceGradeAssignment.ISUserInvestmentMethodDetails);
    const GetAllDocumentsList: any = useSelector((state: RootState) => state.PerformanceGradeAssignment.ISGetAllDocumentsList);

    // Performance Evaluation - PAGE
    const schoolId = localStorage.getItem('SchoolId');
    const financialYearId = sessionStorage.getItem('FinancialYearId');
    const GetUserInvestmentMethodDetailsBody: IGetUserInvestmentMethodDetailsBody = {
        asSchoolId: Number(schoolId),
        asFinancialYearId: Number(financialYearId),
        asUserId: Number(Id),
        asDocumentId: null,
        asDocumentTypeId: 8
    }
    const IGetAllDocumentsListBody: IGetAllDocumentsListBody = {
        asSchoolId: Number(schoolId),
        asUserId: Number(Id),
        asFinancialYearId: Number(financialYearId),
        asDocumentTypeId: 8,
        asAcademicYearId: Number(yearId),
        asDocumentId: 0,
        asReportingUserId: Number(ReportingUserId),
        asLoginUserId: Number(sessionStorage.getItem('Id'))
    }
    useEffect(() => {
        if (Id !== '0' && ReportingUserId !== '0') {
            dispatch(CDAGetUserInvestmentMethodDetails(GetUserInvestmentMethodDetailsBody));
            dispatch(CDAGetAllDocumentsList(IGetAllDocumentsListBody))
        }
    }, [Id, ReportingUserId])


    //


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
    // const debouncedFetch = useCallback(debounce((body) => {
    //     dispatch(getSaveInvestmentDocument(body));
    // }, 500), [dispatch]);
    // console.log(debouncedFetch, "debouncedFetch");


    const { showAlert, closeAlert } = useContext(AlertContext);
    const [fileName, setFileName] = useState('');
    const [fileNameError, setFileNameError] = useState('');
    const [ValidFile, setValidFile] = useState('')
    const [base64URL, setbase64URL] = useState('');
    const asSchoolId = Number(localStorage.getItem('localSchoolId'));
    const asFolderName = localStorage.getItem('FolderName');
    const asFinancialYearId = sessionStorage.getItem('FinancialYearId');
    const asAcademicYearId = Number(sessionStorage.getItem('AcademicYearId'));
    const asUserId = Number(localStorage.getItem('UserId'));
    const envUserId = sessionStorage.getItem('Id');
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
        asAcademicYearId: Number(yearId),
        asFinancialYearId: 1,
        asDocumentId: 0,
        asFileName: fileName == '' ? null : fileName,
        asUserId: Number(Id),
        asInsertedById: asUserId,
        asDocumnetTypeId: 8,
        asReportingUserId: Number(ReportingUserId),
        asSaveFeature: "Performance Evaluation",
        asFolderName: asFolderName.toString(),
        asBase64String: base64URL == '' ? null : base64URL
    }
    const GetGetAllDocumentsListBody: IGetAllDocumentsListBody = {
        asSchoolId: asSchoolId,
        asUserId: asUserId,
        asFinancialYearId: 1,
        asDocumentTypeId: 8,
        asAcademicYearId: asAcademicYearId,
        asDocumentId: null,
        asReportingUserId: Number(Id),
        asLoginUserId: asUserId
    }
    const InvestmentDocumentFileBody: IGetInvestmentDocumentFileBody = {
        asSchoolId: asSchoolId,
        asId: Number(Id),    /*2303,*/
    };
    useEffect(() => {
        dispatch(getCheckPublishUnpublishDocument(GetCheckPublishUnpublishDocumentBody))
    }, [])

    const ClickUpload = () => {
        let isError = false;
        // const fileExtension = fileName.split('.').pop().toUpperCase();

        // // Check for valid file type
        // if (!ValidFileTypes.includes(fileExtension)) {
        //     setValidFile('Please select a valid file type.');
        //     isError = true;
        // } else {
        //     setValidFile('');
        // }
        if (!fileName || fileName === '') {
            setFileNameError('Please select file to upload.');
            isError = true;
        } else {
            setFileNameError('');
        }
        if (!isError) {
            dispatch(getSaveInvestmentDocument(SaveInvestmentDocumentBody));
            ResetForm();
        }
        // dispatch(getSaveInvestmentDocument(SaveInvestmentDocumentBody))
    }
    useEffect(() => {
        if (USSaveInvestmentDocument != '') {
            toast.success(USSaveInvestmentDocument);
            dispatch(resetSaveInvestmentMessage());
            dispatch(getAllDocumentsList(GetGetAllDocumentsListBody))
            RefreshList()

        }
    }, [USSaveInvestmentDocument]);
    // useEffect(() => {
    //     dispatch(getAllDocumentsList(GetGetAllDocumentsListBody))
    // }, [Id])
    useEffect(() => {
        dispatch(getInvestmentDocumentFile(InvestmentDocumentFileBody))
    }, [])
    const ChangeFile = (value) => {
        setFileName(value.Name);
        setbase64URL(value.Value);
        console.log(value, "setFileNameError");

        setFileNameError(value.ErrorMsg);

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
            asDocumnetTypeId: 8
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
            dispatch(getAllDocumentsList(GetGetAllDocumentsListBody))
            RefreshList()

        }
    }, [USDeleteInvestmentDocument]);
    const ClickView = (fileName) => {
        window.open(
            localStorage.getItem('SiteURL') +
            '/RITeSchool//downloads/Performance%20Evaluation/' +
            fileName

        );

    }
    const handleDialogClose = () => {
        ResetForm();
        handleClose();
    }
    const handleUploadControl = () => {
        let flag = true;
        if (ReportingUserId === envUserId && saveButton === 'True') {
            flag = false;
        }
        return flag;
    }

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

            <DialogContent  >
                <Box>
                    <Typography variant="h2" sx={{ pt: 2, pl: 1 }}>Documents</Typography>
                    <Box sx={{ background: 'white', top: '1px', alignItems: 'center', pl: 1, pr: 2, pt: 2 }}>
                        <Grid container spacing={2} >
                            <Grid item xs={4}>
                                <TextField
                                    fullWidth
                                    label={<>
                                        User Name <span style={{ color: 'red' }}>*</span>
                                    </>}
                                    InputLabelProps={{ shrink: true }}
                                    sx={{ bgcolor: '#F0F0F0', width: '100%' }}
                                    value={Object.keys(UserInvestmentMethodDetails).length > 0 ? UserInvestmentMethodDetails?.UserName : ''}
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
                                        FilePath={USGetAllDocumentsList.length > 0 ? USGetAllDocumentsList.FileName : ''}
                                        // errorMessage={''}
                                        // isMandatory={false}
                                        errorMessage={fileNameError}
                                        isMandatory={true}
                                    />
                                    {/* {fileNameError && (
                                        <Box sx={{ mt: 1, position: 'absolute', bottom: '-25px', }}>
                                            <ErrorMessage1 Error={fileNameError}></ErrorMessage1>
                                        </Box>
                                    )} */}
                                    {/* {ValidFile && (
                                        <Box sx={{ mt: 1, position: 'absolute', bottom: '-25px' }}>
                                            <ErrorMessage1 Error={ValidFile}></ErrorMessage1>
                                        </Box>
                                    )} */}
                                </Box>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </DialogContent>
            <Box sx={{ backgroundColor: 'white', pl: 3.8, pr: 3.8 }}>
                {GetAllDocumentsList.length > 0 ? (
                    <UploadDocList
                        HeaderArray={HeaderList}
                        ItemList={GetAllDocumentsList}
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
                    onClick={handleDialogClose}
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
                    disabled={handleUploadControl()}
                >
                    Upload
                </Button>
            </DialogActions>
        </Dialog >
    );
}
export default UploadDocument;;