import CheckCircle from '@mui/icons-material/CheckCircle';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { default as DeleteIcon } from '@mui/icons-material/Delete';
import VisibilityTwoToneIcon from '@mui/icons-material/VisibilityTwoTone';
import { Box, Button, Grid, IconButton, Stack, Tooltip, Typography } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import { Styles } from 'src/assets/style/student-style';
import {
    ChangeFileIntoBase64,
    CheckFileValidationAdhar
} from 'src/components/Common/Util';
import Errormessage from 'src/libraries/ErrorMessages/Errormessage';
const MultipleFile = ({
    ValidFileTypes,
    MaxfileSize,
    ChangeFile,
    errorMessage = '',
    clickDelete = undefined,
    clickFileName = undefined,
    FileName = '',
    FilePath = '',
    width = '300px',
    viewIcon = false,
    deleteIcon = false,
    FileLabel = "",
    isMandatory = true,
    height = 'auto'
}) => {
    const classes = Styles();
    const aRef = useRef(null);
    const [FileError, setFileError] = useState('');
    useEffect(() => {
        setFileError(errorMessage);
    }, [errorMessage]);
    useEffect(() => {
        if (FileName == '') aRef.current.value = null;
    }, [FileName]);
    const clickFile = async (e) => {
        const multipleFiles = e.target.files;
        let base64URL: any = '';
        let returnVal = []
        for (let i = 0; i < multipleFiles.length; i++) {
            const isValid = CheckFileValidationAdhar(
                multipleFiles[i],
                ValidFileTypes,
                MaxfileSize
            );
            if (isValid == null) {
                base64URL = await ChangeFileIntoBase64(multipleFiles[i]);
                setFileError('');
                returnVal.push({
                    FileName: multipleFiles[i].name,
                    Base64URL: base64URL.slice(base64URL.indexOf(',') + 1)
                });
            } else {
                setFileError(isValid);
                aRef.current.value = null;
            }
        }
        ChangeFile(returnVal)
    };
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
                                `1px dashed ${FileName ? theme.colors.success.main : theme.colors.primary.main
                                }`,
                            gap: 1,
                            position: 'relative',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between'
                        }}
                        color={FileName ? 'success' : 'primary'}
                    >
                        <Stack
                            direction={'row'}
                            alignItems={'center'}
                            gap={1}
                            sx={{
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap',
                            }}>
                            {FileName ? <CheckCircle /> : <CloudUploadIcon />}
                            {FileName == '' ? FileLabel ? FileLabel : ' No file selected' : FileName}
                            {isMandatory && <span style={{ color: 'red' }}>*</span>}
                            <Box sx={{ textAlign: 'center' }}>
                                <input
                                    ref={aRef}
                                    type="file"
                                    multiple
                                    onChange={clickFile}
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
                            direction={'row'}
                            alignItems={'center'}
                            justifyContent={'center'}
                            gap={1}
                        >

                        </Stack>
                    </Button>
                </Tooltip>
                {FilePath != '' && (
                    <div>
                        {deleteIcon &&
                            <IconButton
                                sx={{ marginRight: 1 }}
                                color={'error'}
                                onClick={clickDelete}
                            >
                                <DeleteIcon style={{ fontSize: 32 }} />
                            </IconButton>
                        }
                        {viewIcon && <IconButton
                            sx={{ marginLeft: 1 }}
                            color={'primary'}
                            onClick={clickFileName}
                        >
                            <VisibilityTwoToneIcon style={{ fontSize: 32 }} />
                        </IconButton>
                        }
                    </div>
                )}
            </Grid>
            {FileError && (
                <Grid item xs={12} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>

                    <Typography mt={2}>
                        {FileError && <Errormessage Error={FileError} />}
                    </Typography>
                </Grid>
            )}
        </Grid>
    );
};

export default MultipleFile;
