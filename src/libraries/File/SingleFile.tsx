import CheckCircle from '@mui/icons-material/CheckCircle';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Visibility from '@mui/icons-material/Visibility';
import { Box, Button, Grid, IconButton, Stack, Tooltip, Typography } from '@mui/material';
import { red } from '@mui/material/colors';
import { useEffect, useRef, useState } from 'react';
import { Styles } from 'src/assets/style/student-style';
import {
  ChangeFileIntoBase64,
  CheckFileValidationAdhar
} from 'src/components/Common/Util';
import Errormessage from 'src/libraries/ErrorMessages/Errormessage';
const SingleFile = ({
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
  // useEffect(() => {
  //   setFileError(errorMessage);
  // }, [errorMessage]);
  useEffect(() => {
    if (FileName == '') aRef.current.value = null;
  }, [FileName]);
  const clickFile = async (e) => {
    const multipleFiles = e.target.files;
    let base64URL: any = '';
    for (let i = 0; i < multipleFiles.length; i++) {
      const isValid = CheckFileValidationAdhar(
        multipleFiles[i],
        ValidFileTypes,
        MaxfileSize
      );
      if (isValid == null) {
        base64URL = await ChangeFileIntoBase64(multipleFiles[i]);
        setFileError('');
        errorMessage = ''
        ChangeFile({
          Name: multipleFiles[i].name,
          Value: base64URL.slice(base64URL.indexOf(',') + 1),
          FileExtension: multipleFiles[i].name.split('.').at(-1),
          ErrorMsg: ""
        });
      } else {
        console.log(isValid, "isValid");

        setFileError(isValid);
        errorMessage = ''
        ChangeFile({
          Name: "",
          Value: "",
          FileExtension: "",
          ErrorMsg: isValid
        });
        aRef.current.value = null;
      }
    }
  };
  return (
    <Grid container>
      <Grid item xs={12} sx={{ display: 'flex', alignItems: FileError ? 'flex-start' : 'center', justifyContent: 'center', height: 'auto' }}>
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
                `1px dashed ${FileName ? theme.colors.primary.main : theme.colors.primary.main
                }`,
              gap: 1,
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
            color={FileName ? 'primary' : 'primary'}
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
          <Stack direction="row" spacing={-1}>
            {deleteIcon &&
              <IconButton
                // sx={{ marginRight: 1 }}
                // color={'error'}
                sx={{
                  marginLeft: 1,
                  '&:hover': {
                    color: 'red',
                    backgroundColor: red[100]
                  }
                }}
                onClick={clickDelete}
              >
                <DeleteForeverIcon style={{ fontSize: 30 }} />
              </IconButton>
            }
            {viewIcon && <IconButton
              color={'primary'}
              onClick={clickFileName}
            >
              <Visibility style={{ fontSize: 30 }} />
            </IconButton>
            }
          </Stack>
        )}
      </Grid>
      {errorMessage && (
        <Grid item xs={12} sx={{ display: 'flex', alignItems: 'left', justifyContent: 'left', pt:2 }}>

          <Typography >
            {errorMessage && <Errormessage Error={errorMessage} />}
          </Typography>
        </Grid>
      )}
    </Grid>
  );
};

export default SingleFile;
