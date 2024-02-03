import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DeleteIcon from '@mui/icons-material/Delete';
import FilePresentRoundedIcon from '@mui/icons-material/FilePresentRounded';
import { Grid, IconButton, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useRef, useState } from 'react';
import { CheckFileValidation } from 'src/components/Common/Util';
import { CardDetail8 } from 'src/libraries/styled/CardStyle';
import ErrorMessages from '../ErrorMessages/ErrorMessages';

import { Styles } from 'src/assets/style/student-style';
import Icon3 from '../icon/icon3';
const ChooseFiles = ({
  validFiles,
  onChangeFiles,
  maxfileSize = 0,
  multipleAllowed = true
}) => {
  const classes = Styles();
  const aRef = useRef(null);
  const [finalBase642New, setFinalBase642New] = useState<any>([]);
  const [fileError, setFileError] = useState<any>('');

  const fileChangedHandler = async (multipleFiles) => {
    for (let i = 0; i < multipleFiles.length; i++) {
      const isValid = CheckFileValidation(
        multipleFiles[i],
        validFiles,
        maxfileSize
      );
      setFileError(isValid);
      if (isValid) {
        aRef.current.value = null;
      } else {
        setFileError('');
        setFinalBase642New((prev) => [
          ...prev,
          { FileName: multipleFiles[i].name, Base64URL: multipleFiles[i] }
        ]);
        onChangeFiles([
          ...finalBase642New,
          { FileName: multipleFiles[i].name, Base64URL: multipleFiles[i] }
        ]);
      }
    }
  };

  const handleClick = (event) => {
    aRef.current.click();
  };

  const handleRemoveListItems = (fileName) => {
    setFinalBase642New((item) =>
      item.filter((obj) => obj.FileName !== fileName)
    );
    onChangeFiles(finalBase642New.filter((obj) => obj.FileName !== fileName));
    aRef.current.value = null;
  };

  return (
    <>
      Upload files
      <CloudUploadIcon onClick={handleClick} />
      <input
        ref={aRef}
        multiple={multipleAllowed}
        type="file"
        style={{ display: 'none' }}
        onChange={(e) => {
          fileChangedHandler(e.target.files);
        }}
      />
      <Box className={classes.iIconSupport} sx={{ mb: '-35px', mr: '0px' }}>
        <Icon3
          Note={
            'Supports only ' +
            validFiles.join(' ') +
            ' files types up to ' +
            maxfileSize
          }
        />
      </Box>
      {fileError !== '' && <ErrorMessages Error={fileError} />}
      {finalBase642New.length > 0 && (
        <div style={{ marginTop: '10px' }}>
          <Typography sx={{ mb: '10px' }}>Attachment(s):</Typography>

          {finalBase642New.map((item, i) => {
            return (
              <Box key={i}>
                <Grid container>
                  <Grid item xs={2}>
                    <FilePresentRoundedIcon sx={{ color: 'blue' }} />
                  </Grid>
                  <Grid item xs={8}>
                    <CardDetail8 sx={{ mt: '5px' }}>
                      {item.FileName.slice(0, 25)}
                    </CardDetail8>
                  </Grid>
                  <Grid item xs={2}>
                    <IconButton
                      edge="end"
                      aria-label="delete"
                      title="Delete"
                      onClick={() => handleRemoveListItems(item.FileName)}
                    >
                      <DeleteIcon
                        sx={{ color: 'red', mr: '-50px', mt: '-8px' }}
                      />
                    </IconButton>
                  </Grid>
                </Grid>
              </Box>
            );
          })}
        </div>
      )}
    </>
  );
};

export default ChooseFiles;
{
  /* 
--> sample call
<ChooseFiles validFiles={validFiles}
    maxfileSize={2000000}
    onChangeFiles={onChangeFiles}
    multipleAllowed={false}>
</ChooseFiles> */
}
