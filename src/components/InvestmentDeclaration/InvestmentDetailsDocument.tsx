import QuestionMark from '@mui/icons-material/QuestionMark';
import { Box, IconButton, TextField, Tooltip } from "@mui/material";
import { grey } from "@mui/material/colors";
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ICheckPublishUnpublishDocumentBody, IGetUserInvestmentMethodDetailsBody } from 'src/interfaces/InvestmentDeclaration/IAddInvestmentDetailsDocument';
import MultipleFile from 'src/libraries/File/MultipleFile';
import { getCheckPublishUnpublishDocument, getUserInvestmentMethodDetails } from 'src/requests/InvestmentDeclaration/ReqAddInvestmentDetailsDocument';
import { RootState } from 'src/store';
import CommonPageHeader from "../CommonPageHeader";

const InvestmentDeclaration = () => {
    const dispatch = useDispatch();
    const ValidFileTypes = ['PDF', 'JPG', 'PNG', 'BMP', 'JPEG'];
    const MaxfileSize = 3000000;
    const [MultipleFiles, setMultipleFiles] = useState([]);
    const asSchoolId = Number(localStorage.getItem('localSchoolId'));
    const asFinancialYearId = sessionStorage.getItem('FinancialYearId');
    const asUserId = Number(localStorage.getItem('UserId'));
    const USCheckPublishUnpublishDocument: any = useSelector(
        (state: RootState) => state.AddInvestmentDetailsDoc.ISCheckPublishUnpublishDocument
    );
    const USGetUserInvestmentMethodDetails: any = useSelector(
        (state: RootState) => state.AddInvestmentDetailsDoc.ISGetUserInvestmentMethodDetails
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

    useEffect(() => {
        dispatch(getCheckPublishUnpublishDocument(GetCheckPublishUnpublishDocumentBody))
    }, [])
    useEffect(() => {
        dispatch(getUserInvestmentMethodDetails(GetUserInvestmentMethodDetailsBody))
    }, [])

    const handleFileChange = (files) => {
        setMultipleFiles(files);
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
                            <MultipleFile
                                ValidFileTypes={ValidFileTypes}
                                MaxfileSize={MaxfileSize}
                                ChangeFile={handleFileChange}
                                FileLabel={'Upload Document'}
                                width={'100%'}
                                height={'52px'}
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