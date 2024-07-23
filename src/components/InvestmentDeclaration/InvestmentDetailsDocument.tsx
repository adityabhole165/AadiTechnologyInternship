import QuestionMark from '@mui/icons-material/QuestionMark';
import { Box, IconButton, TextField, Tooltip } from "@mui/material";
import { grey } from "@mui/material/colors";
import { useState } from 'react';
import MultipleFile from 'src/libraries/File/MultipleFile';
import CommonPageHeader from "../CommonPageHeader";

const InvestmentDeclaration = () => {
    const ValidFileTypes = ['PDF', 'JPG', 'PNG', 'BMP', 'JPEG'];
    const MaxfileSize = 3000000;
    const [MultipleFiles, setMultipleFiles] = useState([]);
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
                        <Box>
                            <MultipleFile
                                ValidFileTypes={ValidFileTypes}
                                MaxfileSize={MaxfileSize}
                                ChangeFile={handleFileChange}
                                FileLabel={'Attachments'}
                                width={'100%'}
                                height={'52px'}
                                isMandatory={false}

                            />
                        </Box>
                    </>

                }

            >

            </CommonPageHeader>

        </Box>
    );
}
export default InvestmentDeclaration;