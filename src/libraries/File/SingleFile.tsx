import CheckCircle from '@mui/icons-material/CheckCircle';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Delete from '@mui/icons-material/Delete';
import Visibility from '@mui/icons-material/Visibility';
import { Box, Button, Stack, Tooltip, Typography } from '@mui/material';
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
  filePath = '',
  FileName = '',
  width = '300px',
  viewIcon = false,
  deleteIcon = false,
  isMandatory = true
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
    for (let i = 0; i < multipleFiles.length; i++) {
      const isValid = CheckFileValidationAdhar(
        multipleFiles[i],
        ValidFileTypes,
        MaxfileSize
      );
      if (isValid == null) {
        base64URL = await ChangeFileIntoBase64(multipleFiles[i]);
        setFileError('');
        ChangeFile({
          Name: multipleFiles[i].name,
          Value: base64URL.slice(base64URL.indexOf(',') + 1),
          FileExtension: multipleFiles[i].name.split('.').at(-1)
        });
      } else {
        setFileError(isValid);
        aRef.current.value = null;
      }
    }
  };
  const handleClick = (event) => {
    aRef.current.click();
  };
  const clickImage = () => {
    if (filePath != '') window.open(filePath);
  };
  return (
    <>
      <Tooltip
        title={
          'Supports only ' +
          ValidFileTypes.join(', ') +
          ' files types up to 3 MB'
        }
      >
        <Button
          sx={{
            width: width,
            border: (theme) =>
              `1px dashed ${
                FileName ? theme.colors.success.main : theme.colors.primary.main
              }`,
            gap: 1,
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
          color={FileName ? 'success' : 'primary'}
        >
          <Stack direction={'row'} alignItems={'center'} gap={1}>
            {FileName ? <CheckCircle /> : <CloudUploadIcon />}
            {FileName == '' ? ' No file selected' : FileName}{' '}
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
            {FileName != '' && (
              <>
                {viewIcon && <Visibility onClick={clickDelete} />}
                {deleteIcon && <Delete color={'error'} onClick={clickDelete} />}
              </>
            )}
          </Stack>
        </Button>
      </Tooltip>
      <Typography mt={2}>
        {FileError && <Errormessage Error={FileError} />}
      </Typography>
    </>
  );
};

export default SingleFile;
