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
const CheckValidation = (fileData, ValidFileTypes, MaxfileSize) => {
  const fileExtension = fileData?.name?.split('.').at(-1);
  const allowedFileTypes = ValidFileTypes.map((type) => type.toLowerCase());

  if (!fileExtension || !allowedFileTypes.includes(fileExtension.toLowerCase())) {
    return 'Invalid file format.' ;
  }

  if (fileData?.size > MaxfileSize) {
    return `File size should be less than ${MaxfileSize / 1e6} MB.`;
  }

  return null;
};

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
  FileLabel = '',
  isMandatory = true,
  height = 'auto',
}) => {
  const classes = Styles();
  const aRef = useRef(null);
  const [FileError, setFileError] = useState('');

  useEffect(() => {
    if (FileName === '') aRef.current.value = null;
  }, [FileName]);

  const clickFile = async (e) => {
    const multipleFiles = e.target.files;

    for (let i = 0; i < multipleFiles.length; i++) {
      const validationError = CheckValidation(
        multipleFiles[i],
        ValidFileTypes,
        MaxfileSize
      );

      if (!validationError) {
        const base64URL:any = await ChangeFileIntoBase64(multipleFiles[i]);
        setFileError('');
        ChangeFile({
          Name: multipleFiles[i].name,
          Value: base64URL.slice(base64URL.indexOf(',') + 1),
          FileExtension: multipleFiles[i].name.split('.').at(-1),
          ErrorMsg: '',
        });
      } else {
        setFileError(validationError);
        ChangeFile({
          Name: '',
          Value: '',
          FileExtension: '',
          ErrorMsg: validationError,
        });
        aRef.current.value = null;
      }
    }
  };

  return (
    <Grid container>
      <Grid
        item
        xs={9}
        sm={12}
        md={12}
        lg={12}

        sx={{
          display: 'flex',
          alignItems: FileError ? 'flex-start' : 'center',
          justifyContent: 'left',
          height: 'auto',
        }}
      >
        <Tooltip
           title={
            'Supports only ' +
            ValidFileTypes.join(', ') +
            ' file types up to ' +
            (MaxfileSize / 1e6) +
            ' MB .'
            
          }
        >
          <Button
            sx={{
              width: width,
              height: height,
              border: (theme) =>
                `1px dashed ${
                  FileName ? theme.colors.primary.main : theme.colors.primary.main
                }`,
              gap: 1,
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
            color={FileName ? 'primary' : 'primary'}
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
              {FileName ? <CheckCircle /> : <CloudUploadIcon />}
              {FileName === ''
                ? FileLabel
                  ? FileLabel
                  : ' No file selected'
                : FileName}
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
                    cursor: 'pointer',
                  }}
                />
              </Box>
            </Stack>
          </Button>
        </Tooltip>
        {FilePath !== '' && (
          <Grid item xs={3} sm={3} md={3} sx={{ display: 'flex', ml: 1 }}>
            {viewIcon && (
              <Tooltip title={'View'}>
                <IconButton color={'primary'} onClick={clickFileName} >
                  <Visibility style={{ fontSize: 30 }} />
                </IconButton>
              </Tooltip>
            )}
            {deleteIcon && (
              <Tooltip title={'Delete'}>
                <IconButton
                  sx={{
                    // marginLeft: 1,
                    '&:hover': {
                      color: 'red',
                      backgroundColor: red[100],
                    },
                  }}
                  onClick={clickDelete}
                >
                  <DeleteForeverIcon style={{ fontSize: 30 }} />
                </IconButton>
              </Tooltip>
            )}
         </Grid>
        )}
      </Grid>
      {FileError && (
        <Grid
          item
          xs={12}
          sx={{
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'flex-start',
            pt: 2,
          }}
        >
          <Typography sx={{ml:0}}>{<Errormessage Error={FileError} />}</Typography>
        </Grid>
      )}
    </Grid>
  );
};

export default SingleFile;

