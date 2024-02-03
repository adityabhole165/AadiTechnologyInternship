import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { Box, Stack, TextField, Typography } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import {
  ChangeFileIntoBase64,
  CheckFileValidationUploadPic
} from 'src/components/Common/Util';
import ErrorMessages from '../ErrorMessages/ErrorMessages';

function TextFilePath({ item, onFileSelect, onTextChange }) {
  const width = 112,
    height = 151,
    maxFileSize = 80000;
  const arrAllowedFiles = ['jpg', 'jpeg', 'png', 'bmp'];
  const [error, setError] = useState('');
  const aRef = useRef(null);

  useEffect(() => {
    setError('');
    aRef.current.value = '';
  }, [item.Id]);
  const handleClick = (event) => {
    aRef.current.click();
  };

  const changeFile = async (e) => {
    let isValid = CheckFileValidationUploadPic(
      e.target.files[0],
      arrAllowedFiles,
      maxFileSize
    );
    setError(isValid);
    if (isValid === null) {
      if (e.target.files && e.target.files.length > 0) {
        let base64URL: any = await ChangeFileIntoBase64(e.target.files[0]);
        let DataAttachment = base64URL.slice(base64URL.indexOf(',') + 1);
        let img = new Image();
        img.src = window.URL.createObjectURL(e.target.files[0]);
        img.onload = () => {
          if (img.width > width && img.height > height) {
            setError(
              `Image is ${img.height} x ${img.width}, Height and Width of photo file should not exceed 151px and 112px respectively`
            );
          } else {
            item = {
              ...item,
              Value: DataAttachment,
              fileName: e.target.files[0].name,
              selectedFile: e.target.files[0].name
            };
            onFileSelect(item);
          }
        };
      }
    } else {
      aRef.current.value = null;
    }
  };

  return (
    <div>
      {item.Id == 3 ? (
        <TextField
          value={item.Text}
          fullWidth
          variant="standard"
          onChange={(e) => {
            onTextChange({ ...item, Text: e.target.value });
          }}
        />
      ) : (
        <TextField value={item.Text} fullWidth variant="standard" />
      )}
      <Box sx={{ textAlign: 'center', mt: '10px' }}>
        <img
          id="imgParent"
          width="112"
          height="151"
          style={{ border: '1px solid gray' }}
          src={
            item.Value === '' || item.Value === null
              ? '/imges/defualtUser.jpg'
              : 'data:image/png;base64,' + item.Value
          }
        />
      </Box>
      <Stack alignItems={'center'}>
        <Box sx={{ display: 'flex', mt: '5px' }}>
          <CloudUploadIcon
            onClick={handleClick}
            sx={{ mt: '-2px' }}
            color={item.choosefileDisable ? 'disabled' : 'primary'}
          />
          <Typography
            sx={{ mt: '2px', fontWeight: 'bold', ml: '2px', fontSize: '12px' }}
          >
            Upload files :{' '}
          </Typography>
          <Box
            sx={{
              width: '100px',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              mt: '2px'
            }}
          >
            {item.selectedFile === '' || item.selectedFile === undefined
              ? ' No file selected'
              : item.selectedFile}
          </Box>
        </Box>
      </Stack>
      <input
        ref={aRef}
        type="file"
        onChange={changeFile}
        disabled={item.choosefileDisable}
        style={{ display: 'none' }}
      />
      {error && <ErrorMessages Error={error} />}
    </div>
  );
}

export default TextFilePath;
