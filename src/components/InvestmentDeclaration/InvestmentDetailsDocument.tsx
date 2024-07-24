import QuestionMark from '@mui/icons-material/QuestionMark';
import { Box, IconButton, TextField, Tooltip } from "@mui/material";
import { grey } from "@mui/material/colors";
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ICheckPublishUnpublishDocumentBody, IGetAllDocumentsListBody, IGetUserInvestmentMethodDetailsBody, ISaveInvestmentDocumentBody } from 'src/interfaces/InvestmentDeclaration/IAddInvestmentDetailsDocument';
import SingleFile from 'src/libraries/File/SingleFile';
import { getAllDocumentsList, getCheckPublishUnpublishDocument, getSaveInvestmentDocument, getUserInvestmentMethodDetails } from 'src/requests/InvestmentDeclaration/ReqAddInvestmentDetailsDocument';
import { RootState } from 'src/store';
import CommonPageHeader from "../CommonPageHeader";

const InvestmentDeclaration = () => {
    const dispatch = useDispatch();
    const ValidFileTypes = ['PDF', 'JPG', 'PNG', 'BMP', 'JPEG'];
    const MaxfileSize = 3000000;
    const [MultipleFiles, setMultipleFiles] = useState([]);
    const [fileName, setFileName] = useState('');
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
    const USGetUserInvestmentMethodDetails: any = useSelector(
        (state: RootState) => state.AddInvestmentDetailsDoc.ISGetUserInvestmentMethodDetails
    );
    const USSaveInvestmentDocument: any = useSelector(
        (state: RootState) => state.AddInvestmentDetailsDoc.ISSaveInvestmentDocument
    );
    const USGetAllDocumentsList: any = useSelector(
        (state: RootState) => state.AddInvestmentDetailsDoc.ISGetAllDocumentsList
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

    const ChangeFile = (value) => {
        setFile(value.Name);
        setbase64URL(value.Value);
        setFileName(value.Name);
    };

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
                                value={""}
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
                                value={""}
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
                        <Tooltip title={"Upload/Delete Document(s)."}>
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

        </Box>
    );
}
export default InvestmentDeclaration;