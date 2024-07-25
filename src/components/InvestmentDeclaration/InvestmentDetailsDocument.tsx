import { UploadFile } from '@mui/icons-material';
import QuestionMark from '@mui/icons-material/QuestionMark';
import { Box, IconButton, TextField, Tooltip, Typography } from "@mui/material";
import { blue, grey } from "@mui/material/colors";
import { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { toast } from 'react-toastify';
import { AlertContext } from 'src/contexts/AlertContext';
import { ICheckPublishUnpublishDocumentBody, IDeleteInvestmentDocumentBody, IGetAllDocumentsListBody, IGetUserInvestmentMethodDetailsBody, ISaveInvestmentDocumentBody } from 'src/interfaces/InvestmentDeclaration/IAddInvestmentDetailsDocument';
import SingleFile from 'src/libraries/File/SingleFile';
import { getAllDocumentsList, getCheckPublishUnpublishDocument, getDeleteInvestmentDocument, getSaveInvestmentDocument, getUserInvestmentMethodDetails } from 'src/requests/InvestmentDeclaration/ReqAddInvestmentDetailsDocument';
import { deleteresetMessage } from 'src/requests/StudentWiseProgressReport/ReqStudentWiseProgressReport';
import { RootState } from 'src/store';
import CommonPageHeader from "../CommonPageHeader";
import InvestmentDocumentList from './InvestmentDocumentList';

const InvestmentDeclaration = () => {
    const dispatch = useDispatch();
    const { Id } = useParams();
    const HeaderList = [
        { Id: 1, Header: 'File Name' },
        { Id: 2, Header: 'View', align: "center" },
        { Id: 3, Header: 'Delete', align: "center" },

    ];
    const ValidFileTypes = ['PDF', 'JPG', 'PNG', 'BMP', 'JPEG'];
    const MaxfileSize = 3000000;
    const [MultipleFiles, setMultipleFiles] = useState([]);
    const { showAlert, closeAlert } = useContext(AlertContext);
    const [fileName, setFileName] = useState('');
    const [File, setFile] = useState('');
    const [base64URL, setbase64URL] = useState('');
    const [Username, setUsername] = useState('');
    const [Documentname, setDocumentname] = useState('');
    const asSchoolId = Number(localStorage.getItem('localSchoolId'));
    const asFolderName = Number(localStorage.getItem('FolderName'));
    const asFinancialYearId = sessionStorage.getItem('FinancialYearId');
    const asAcademicYearId = Number(sessionStorage.getItem('AcademicYearId'));
    const asUserId = Number(localStorage.getItem('UserId'));
    const USCheckPublishUnpublishDocument: any = useSelector(
        (state: RootState) => state.AddInvestmentDetailsDoc.ISCheckPublishUnpublishDocument
    );
    const USGetUserInvestmentMethodDetails: any = useSelector(
        (state: RootState) => state.AddInvestmentDetailsDoc.ISGetUserInvestmentMethodDetails
    );
    const USSaveInvestmentDocument: any = useSelector(
        (state: RootState) => state.AddInvestmentDetailsDoc.ISSaveInvestmentDocument
    );
    const USGetAllDocumentsList: any = useSelector(
        (state: RootState) => state.AddInvestmentDetailsDoc.ISGetAllDocumentsList
    );
    const USDeleteInvestmentDocument: any = useSelector(
        (state: RootState) => state.AddInvestmentDetailsDoc.ISDeleteInvestmentDocument
    );


    console.log(USCheckPublishUnpublishDocument, "USCheckPublishUnpublishDocument");

    const GetCheckPublishUnpublishDocumentBody: ICheckPublishUnpublishDocumentBody = {
        asSchoolId: asSchoolId,
        asFinancialYearId: 1,
        asUserId: asUserId
    }
    const GetUserInvestmentMethodDetailsBody: IGetUserInvestmentMethodDetailsBody = {
        asSchoolId: asSchoolId,
        asFinancialYearId: 1,
        asUserId: asUserId,
        asDocumentId: 81,
        asDocumentTypeId: 1
    }
    const SaveInvestmentDocumentBody: ISaveInvestmentDocumentBody = {
        asSchoolId: asSchoolId,
        asAcademicYearId: asAcademicYearId,
        asFinancialYearId: 1,
        asDocumentId: 81,
        asFileName: "MCAResult123.pdf",
        asUserId: asUserId,
        asInsertedById: 4463,
        asDocumnetTypeId: 1,
        asReportingUserId: 0,
        asSaveFeature: "Investment Declarations",
        asFolderName: asFolderName.toString(),
        asBase64String: base64URL
    }
    const GetGetAllDocumentsListBody: IGetAllDocumentsListBody = {
        asSchoolId: asSchoolId,
        asUserId: asUserId,
        asFinancialYearId: 1,
        asDocumentTypeId: 1,
        asAcademicYearId: asAcademicYearId,
        asDocumentId: 81,
        asReportingUserId: 0,
        asLoginUserId: asUserId
    }
    useEffect(() => {
        dispatch(getCheckPublishUnpublishDocument(GetCheckPublishUnpublishDocumentBody))
    }, [])
    useEffect(() => {
        dispatch(getUserInvestmentMethodDetails(GetUserInvestmentMethodDetailsBody))
    }, [])
    useEffect(() => {
        dispatch(getSaveInvestmentDocument(SaveInvestmentDocumentBody))
    }, [])
    useEffect(() => {
        dispatch(getAllDocumentsList(GetGetAllDocumentsListBody))
    }, [])
    const onClickUsername = (value) => {
        setUsername(value)
    }
    const onClickDocumentname = (value) => {
        setDocumentname(value)
    }
    const ChangeFile = (value) => {
        setFile(value.Name);
        setbase64URL(value.Value);
        setFileName(value.Name);
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
        if (USDeleteInvestmentDocument !== '') {
            toast.success("Document deleted successfully.");
            dispatch(deleteresetMessage());
            dispatch(getAllDocumentsList(GetGetAllDocumentsListBody))
        }
    }, [USDeleteInvestmentDocument]);
    const ClickView = (Id) => {
    }
    return (
        <Box sx={{ px: 2 }} maxWidth="xl">
            <CommonPageHeader
                navLinks={[
                    {
                        title: 'Investment Declaration',
                        path: '/extended-sidebar/Teacher/InvestmentDeclaration'
                    },
                    {
                        title: 'Documents',
                        path: '/extended-sidebar/Teacher/InvestmentDetailsDocument'
                    }
                ]}
                rightActions={
                    <>
                        <Box sx={{ width: '250px' }}>
                            <TextField
                                fullWidth
                                label={<>
                                    User Name <span style={{ color: 'red' }}>*</span>
                                </>}
                                InputLabelProps={{ shrink: true }}
                                sx={{ bgcolor: '#D3D3D3' }}
                                value={Username}
                                size={"small"}
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                        </Box>
                        <Box sx={{ width: '250px' }}>
                            <TextField
                                fullWidth
                                label={<>
                                    Doucment Name  <span style={{ color: 'red' }}>*</span>
                                </>}
                                InputLabelProps={{ shrink: true }}
                                sx={{ bgcolor: '#D3D3D3' }}
                                value={Documentname}
                                size={"small"}
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                        </Box>
                        <Box>
                            <SingleFile
                                ValidFileTypes={ValidFileTypes}
                                MaxfileSize={MaxfileSize}
                                FileName={fileName}
                                ChangeFile={ChangeFile}
                                FileLabel={'Upload Document '}
                                width={'100%'}
                                height={"52px"}
                                isMandatory={false}
                            />
                        </Box>
                        <Tooltip title={"Upload"}>
                            <IconButton sx={{
                                color: 'white',
                                backgroundColor: blue[500],
                                '&:hover': {
                                    backgroundColor: blue[500]
                                }
                            }}>
                                <UploadFile />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title={"Upload / Delete Document(s)."}>
                            <IconButton sx={{
                                color: 'White',
                                backgroundColor: grey[500],
                                '&:hover': {
                                    backgroundColor: grey[500]
                                }
                            }}
                            >
                                <QuestionMark />
                            </IconButton>

                        </Tooltip>
                    </>

                }
            >
            </CommonPageHeader>
            <Box sx={{ backgroundColor: 'white', p: 2 }}>
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

        </Box>
    );
}
export default InvestmentDeclaration;