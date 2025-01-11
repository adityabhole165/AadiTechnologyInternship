// import CheckCircle from '@mui/icons-material/CheckCircle';
// import CloudUploadIcon from '@mui/icons-material/CloudUpload';
// import { default as DeleteIcon } from '@mui/icons-material/Delete';
// import VisibilityTwoToneIcon from '@mui/icons-material/VisibilityTwoTone';
// import { Box, Button, Grid, IconButton, Stack, Tooltip, Typography } from '@mui/material';
// import { useEffect, useRef, useState } from 'react';
// import { Styles } from 'src/assets/style/student-style';
// import {
//     ChangeFileIntoBase64,
//     CheckFileValidationAdhar
// } from 'src/components/Common/Util';
// import Errormessage from 'src/libraries/ErrorMessages/Errormessage';
// const MultipleFile = ({
//     ValidFileTypes,
//     MaxfileSize,
//     ChangeFile,
//     errorMessage = '',
//     clickDelete = undefined,
//     clickFileName = undefined,
//     FileName = '',
//     FilePath = '',
//     width = '300px',
//     viewIcon = false,
//     deleteIcon = false,
//     FileLabel = "",
//     isMandatory = true,
//     height = 'auto'
// }) => {
//     const classes = Styles();
//     const aRef = useRef(null);
//     const [FileError, setFileError] = useState('');
//     useEffect(() => {
//         setFileError(errorMessage);
//     }, [errorMessage]);
//     useEffect(() => {
//         if (FileName == '') aRef.current.value = null;
//     }, [FileName]);
//     const clickFile = async (e) => {
//         const multipleFiles = e.target.files;
//         let base64URL: any = '';
//         let returnVal = []
//         for (let i = 0; i < multipleFiles.length; i++) {
//             const isValid = CheckFileValidationAdhar(
//                 multipleFiles[i],
//                 ValidFileTypes,
//                 MaxfileSize
//             );
//             if (isValid == null) {
//                 base64URL = await ChangeFileIntoBase64(multipleFiles[i]);
//                 setFileError('');
//                 returnVal.push({
//                     FileName: multipleFiles[i].name,
//                     Base64URL: base64URL.slice(base64URL.indexOf(',') + 1)
//                 });
//             } else {
//                 setFileError(isValid);
//                 aRef.current.value = null;
//             }
//         }
//         ChangeFile(returnVal)
//     };
//     return (
//         <Grid container>
//             <Grid item xs={12} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height }}>
//                 <Tooltip
//                     title={
//                         'Supports only ' +
//                         ValidFileTypes.join(', ') +
//                         ' files types up to ' + (MaxfileSize / 1000000).toString() + ' MB'
//                     }
//                 >
//                     <Button
//                         sx={{
//                             width: width,
//                             height: height,
//                             border: (theme) =>
//                                 `1px dashed ${FileName ? theme.colors.success.main : theme.colors.primary.main
//                                 }`,
//                             gap: 1,
//                             position: 'relative',
//                             display: 'flex',
//                             alignItems: 'center',
//                             justifyContent: 'space-between'
//                         }}
//                         color={FileName ? 'success' : 'primary'}
//                     >
//                         <Stack
//                             direction={'row'}
//                             alignItems={'center'}
//                             gap={1}
//                             sx={{
//                                 overflow: 'hidden',
//                                 textOverflow: 'ellipsis',
//                                 whiteSpace: 'nowrap',
//                             }}>
//                             {FileName ? <CheckCircle /> : <CloudUploadIcon />}
//                             {FileName == '' ? FileLabel ? FileLabel : ' No file selected' : FileName}
//                             {isMandatory && <span style={{ color: 'red' }}>*</span>}
//                             <Box sx={{ textAlign: 'center' }}>
//                                 <input
//                                     ref={aRef}
//                                     type="file"
//                                     multiple
//                                     onChange={clickFile}
//                                     style={{
//                                         opacity: 0,
//                                         position: 'absolute',
//                                         top: 0,
//                                         left: 0,
//                                         right: 0,
//                                         bottom: 0,
//                                         cursor: 'pointer'
//                                     }}
//                                 />
//                             </Box>
//                         </Stack>
//                         <Stack
//                             direction={'row'}
//                             alignItems={'center'}
//                             justifyContent={'center'}
//                             gap={1}
//                         >

//                         </Stack>
//                     </Button>
//                 </Tooltip>
//                 {FilePath != '' && (
//                     <div>
//                         {deleteIcon &&
//                             <IconButton
//                                 sx={{ marginRight: 1 }}
//                                 color={'error'}
//                                 onClick={clickDelete}
//                             >
//                                 <DeleteIcon style={{ fontSize: 32 }} />
//                             </IconButton>
//                         }
//                         {viewIcon && <IconButton
//                             sx={{ marginLeft: 1 }}
//                             color={'primary'}
//                             onClick={clickFileName}
//                         >
//                             <VisibilityTwoToneIcon style={{ fontSize: 32 }} />
//                         </IconButton>
//                         }
//                     </div>
//                 )}
//             </Grid>
//             {FileError && (
//                 <Grid item xs={12} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>

//                     <Typography mt={2}>
//                         {FileError && <Errormessage Error={FileError} />}
//                     </Typography>
//                 </Grid>
//             )}
//         </Grid>
//     );
// };

// export default MultipleFile;
// import CheckCircle from '@mui/icons-material/CheckCircle';
// import CloudUploadIcon from '@mui/icons-material/CloudUpload';
// import DeleteIcon from '@mui/icons-material/Delete';
// import VisibilityTwoToneIcon from '@mui/icons-material/VisibilityTwoTone';
// import { Box, Button, Grid, IconButton, Stack, Tooltip, Typography } from '@mui/material';
// import React, { useEffect, useRef, useState } from 'react';
// import { Styles } from 'src/assets/style/student-style';
// import { ChangeFileIntoBase64, CheckFileValidationAdhar } from 'src/components/Common/Util';
// import Errormessage from 'src/libraries/ErrorMessages/Errormessage';

// interface MultipleFileProps {
//     ValidFileTypes: string[];
//     MaxfileSize: number;
//     ChangeFile: (files: { FileName: string; Base64URL: string }[]) => void;
//     errorMessage?: string;
//     clickDelete?: () => void;
//     clickFileName?: () => void;
//     width?: string;
//     viewIcon?: boolean;
//     deleteIcon?: boolean;
//     FileLabel?: string;
//     isMandatory?: boolean;
//     height?: string;
// }

// const MultipleFile: React.FC<MultipleFileProps> = ({
//     ValidFileTypes,
//     MaxfileSize,
//     ChangeFile,
//     errorMessage = '',
//     clickDelete,
//     clickFileName,
//     width = '300px',
//     viewIcon = false,
//     deleteIcon = false,
//     FileLabel = "",
//     isMandatory = true,
//     height = 'auto'
// }) => {
//     const classes = Styles();
//     const aRef = useRef<HTMLInputElement>(null);
//     const [FileError, setFileError] = useState('');
//     const [fileList, setFileList] = useState<{ FileName: string; Base64URL: string }[]>([]);

//     useEffect(() => {
//         setFileError(errorMessage);
//     }, [errorMessage]);

//     const clickFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
//         const multipleFiles = e.target.files;
//         if (!multipleFiles) return;

//         let returnVal = [];
//         let errorFound = false;

//         for (let i = 0; i < multipleFiles.length; i++) {
//             const isValid = CheckFileValidationAdhar(
//                 multipleFiles[i],
//                 ValidFileTypes,
//                 MaxfileSize
//             );
//             if (isValid == null) {
//                 const base64URL = await ChangeFileIntoBase64(multipleFiles[i]) as string;
//                 setFileError('');
//                 returnVal.push({
//                     FileName: multipleFiles[i].name,
//                     Base64URL: base64URL.slice(base64URL.indexOf(',') + 1)
//                 });
//             } else {
//                 setFileError(isValid);
//                 if (aRef.current) aRef.current.value = '';
//                 errorFound = true;
//                 break;
//             }
//         }
//         if (!errorFound) {
//             setFileList(returnVal);
//             ChangeFile(returnVal);
//         }
//     };

//     return (
//         <Grid container>
//             <Grid item xs={12} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height }}>
//                 <Tooltip
//                     title={
//                         'Supports only ' +
//                         ValidFileTypes.join(', ') +
//                         ' files types up to ' + (MaxfileSize / 1000000).toString() + ' MB'
//                     }
//                 >
//                     <Button
//                         sx={{
//                             width: width,
//                             height: height,
//                             border: (theme) =>
//                                 `1px dashed ${fileList.length ? theme.colors.primary.main : theme.colors.primary.main}`,
//                             gap: 1,
//                             position: 'relative',
//                             display: 'flex',
//                             alignItems: 'center',
//                             justifyContent: 'space-between'
//                         }}
//                         color={fileList.length ? 'primary' : 'primary'}
//                     >
//                         <Stack
//                             direction={'row'}
//                             alignItems={'center'}
//                             gap={1}
//                             sx={{
//                                 overflow: 'hidden',
//                                 textOverflow: 'ellipsis',
//                                 whiteSpace: 'nowrap',
//                             }}>
//                             {fileList.length ? <CheckCircle /> : <CloudUploadIcon />}
//                             {fileList.length === 0 ? FileLabel || ' No file selected' : fileList.map(file => file.FileName).join(', ')}
//                             {isMandatory && <span style={{ color: 'red' }}>*</span>}
//                             <Box sx={{ textAlign: 'center' }}>
//                                 <input
//                                     ref={aRef}
//                                     type="file"
//                                     multiple
//                                     onChange={clickFile}
//                                     style={{
//                                         opacity: 0,
//                                         position: 'absolute',
//                                         top: 0,
//                                         left: 0,
//                                         right: 0,
//                                         bottom: 0,
//                                         cursor: 'pointer'
//                                     }}
//                                 />
//                             </Box>
//                         </Stack>
//                         <Stack
//                             direction={'row'}
//                             alignItems={'center'}
//                             justifyContent={'center'}
//                             gap={1}
//                         >
//                         </Stack>
//                     </Button>
//                 </Tooltip>
//                 <div>
//                     {deleteIcon && (
//                         <IconButton
//                             sx={{ marginRight: 1 }}
//                             color={'error'}
//                             onClick={clickDelete}
//                         >
//                             <DeleteIcon style={{ fontSize: 32 }} />
//                         </IconButton>
//                     )}
//                     {viewIcon && (
//                         <IconButton
//                             sx={{ marginLeft: 1 }}
//                             color={'primary'}
//                             onClick={clickFileName}
//                         >
//                             <VisibilityTwoToneIcon style={{ fontSize: 32 }} />
//                         </IconButton>
//                     )}
//                 </div>
//             </Grid>
//             {FileError && (
//                 <Grid item xs={12} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
//                     <Typography mt={2}>
//                         <Errormessage Error={FileError} />
//                     </Typography>
//                 </Grid>
//             )}
//         </Grid>
//     );
// };

// export default MultipleFile;
import { CheckCircle, CloudUpload as CloudUploadIcon, Delete as DeleteIcon, VisibilityTwoTone as VisibilityTwoToneIcon } from '@mui/icons-material';
import { Box, Button, Grid, IconButton, Stack, Tooltip, Typography } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import { ChangeFileIntoBase64, CheckFileValidationAdhar } from 'src/components/Common/Util';
import Errormessage from 'src/libraries/ErrorMessages/Errormessage';

interface MultipleFileProps {
    ValidFileTypes: string[];
    MaxfileSize: number;
    ChangeFile: (files: { FileName: string; Base64URL: string }[]) => void;
    errorMessage?: string;
    clickDelete?: () => void;
    MultipleFiles?: any[];
    clickFileName?: () => void;
    width?: string;
    viewIcon?: boolean;
    deleteIcon?: boolean;
    FileLabel?: string;
    isMandatory?: boolean;
    height?: string;
    resetFileInput?: boolean; // Added prop to reset file input
}

const MultipleFile: React.FC<MultipleFileProps> = ({
    ValidFileTypes,
    MaxfileSize,
    ChangeFile,
    errorMessage = '',
    clickDelete,
    clickFileName,
    width = '300px',
    viewIcon = false,
    deleteIcon = false,
    FileLabel = "",
    isMandatory = true,
    height = 'auto',
    resetFileInput = false, // Default to false
    MultipleFiles = []
}) => {
    const [FileError, setFileError] = useState<string>('');
    const [fileList, setFileList] = useState<{ FileName: string; Base64URL: string }[]>([]);
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        setFileError(errorMessage);
    }, [errorMessage]);

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const multipleFiles = e.target.files;
        if (!multipleFiles) return;

        let returnVal = [];
        let errorFound = false;

        for (let i = 0; i < multipleFiles.length; i++) {
            const isValid = CheckFileValidationAdhar(
                multipleFiles[i],
                ValidFileTypes,
                MaxfileSize
            );
            if (isValid == null) {
                const base64URL = await ChangeFileIntoBase64(multipleFiles[i]) as string;
                setFileError('');
                returnVal.push({
                    FileName: multipleFiles[i].name,
                    Base64URL: base64URL.slice(base64URL.indexOf(',') + 1)
                });
            } else {
                setFileError(isValid);
                if (fileInputRef.current) fileInputRef.current.value = ''; // Reset file input
                errorFound = true;
                break;
            }
        }

        if (!errorFound) {
            setFileList(returnVal);
            ChangeFile(returnVal);
        }
    };

    useEffect(() => {
        // Reset file input when resetFileInput changes to true
        if (resetFileInput && fileInputRef.current) {
            fileInputRef.current.value = '';
            setFileList([]);
            setFileError('');
        }
    }, [resetFileInput]);
    useEffect(() => {
        if (MultipleFiles.length == 0) {
            fileInputRef.current.value = '';
            setFileList([])
        }

    }, [MultipleFiles])

    return (
        <Grid container>
            <Grid item xs={12} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height }}>
                <Tooltip
                    title={
                        'Supports only ' +
                        ValidFileTypes.join(', ') +
                        ' files types up to ' + (MaxfileSize / 1000000).toString() + ' MB'
                    }
                >
                    <Button
                        sx={{
                            width: width,
                            height: height,
                            border: (theme) =>
                                `1px dashed ${fileList.length ? theme.palette.primary.main : theme.palette.primary.main}`,
                            gap: 1,
                            position: 'relative',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between'
                        }}
                        color={fileList.length ? 'primary' : 'primary'}
                        variant="outlined"
                        component="label"
                    >
                        <Stack
                            direction="row"
                            alignItems="center"
                            gap={1}
                            sx={{
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap',
                            }}
                        >
                            {fileList.length ? <CheckCircle /> : <CloudUploadIcon />}
                            {fileList.length === 0 ? FileLabel || ' No file selected' : fileList.map(file => file.FileName).join(', ')}
                            {isMandatory && <span style={{ color: 'red' }}>*</span>}
                            <Box sx={{ textAlign: 'center' }}>
                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    multiple
                                    onChange={handleFileChange}
                                    style={{
                                        opacity: 0,
                                        position: 'absolute',
                                        top: 0,
                                        left: 0,
                                        right: 0,
                                        bottom: 0,
                                        cursor: 'pointer'
                                    }}
                                />
                            </Box>
                        </Stack>
                        <Stack
                            direction="row"
                            alignItems="center"
                            justifyContent="center"
                            gap={1}
                        >
                            {deleteIcon && (
                                <IconButton
                                    sx={{ marginRight: 1 }}
                                    color="error"
                                    onClick={clickDelete}
                                >
                                    <DeleteIcon style={{ fontSize: 32 }} />
                                </IconButton>
                            )}
                            {viewIcon && (
                                <IconButton
                                    sx={{ marginLeft: 1 }}
                                    color="primary"
                                    onClick={clickFileName}
                                >
                                    <VisibilityTwoToneIcon style={{ fontSize: 32 }} />
                                </IconButton>
                            )}
                        </Stack>
                    </Button>
                </Tooltip>
            </Grid>
            {FileError && (
                <Grid item xs={12} sx={{ display: 'flex', alignItems: 'left', justifyContent: 'left' }}>
                    <Typography mt={2}>
                        <Errormessage Error={FileError} />
                    </Typography>
                </Grid>
            )}
        </Grid>
    );
};

export default MultipleFile;
