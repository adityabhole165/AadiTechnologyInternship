import InfoTwoToneIcon from '@mui/icons-material/InfoTwoTone';
import { Box, ClickAwayListener, TextField, Tooltip } from '@mui/material';
import { useState } from 'react';
import { Styles } from 'src/assets/style/student-style';
import { CheckFileValidation } from 'src/components/Common/Util';
import { AttachmentFile } from '../../interfaces/MessageCenter/MessageCenter';

const ChooseFile = ({ ObjectOfFileNameAndBase64 }) => {
  const classes = Styles();
  const [open, setOpen] = useState(false);
  const [fileerror, setFilerror] = useState<any>('');
  const [finalBase642, setFinalBase642] = useState<AttachmentFile[]>([]);
  const [finalBase642Duplicate, setFinalBase642Duplicate] = useState([]);
  const [FileNameOfAttachment, setFileNameOfAttachment] = useState([]);
  const [Base64URLOfAttachment, setBase64URLOfAttachment] = useState([]);
  const [finalBase642New, setFinalBase642New] = useState<any>([]);

  const handleClick = () => {
    setOpen((prev) => !prev);
  };

  const handleClickAway = () => {
    setOpen(false);
  };

  const fileChangedHandler = async (event) => {
    const multipleFiles = event.target.files;
    for (let i = 0; i < multipleFiles.length; i++) {
      const allowedFileTypes = [
        'BMP',
        'DOC',
        'DOCX',
        'JPG',
        'JPEG',
        'PDF',
        'PNG',
        'PPS',
        'PPSX',
        'PPT',
        'PPTX',
        'XLS',
        'XLSX',
        'bmp',
        'doc',
        'docx',
        'jpg',
        'jpeg',
        'pdf',
        'png',
        'pps',
        'ppsx',
        'ppt',
        'pptx',
        'xls',
        'xlsx'
      ];
      setFilerror(
        CheckFileValidation(multipleFiles[i], allowedFileTypes, 20e6)
      );

      let fileName = multipleFiles[i].name;
      let base64URL: any = '';
      if (fileerror === null) {
        base64URL = await ChangeFileIntoBase64(multipleFiles[i]);
        let DataAttachment = base64URL.slice(base64URL.indexOf(',') + 1);

        let AttachmentFile: AttachmentFile = {
          FileName: fileName,
          Base64URL: DataAttachment
        };
        finalBase642.push(AttachmentFile);
        finalBase642Duplicate.push(AttachmentFile);
        FileNameOfAttachment.push(AttachmentFile.FileName);
        Base64URLOfAttachment.push(AttachmentFile.Base64URL);
      }
    }
    setFinalBase642((prev) => {
      return [...prev];
    });
    setFinalBase642Duplicate((prev) => {
      return [...prev];
    });
    setFileNameOfAttachment((prev) => [...prev]);
    setBase64URLOfAttachment((prev) => [...prev]);

    for (let key in FileNameOfAttachment) {
      finalBase642New.push({
        FileName: FileNameOfAttachment[key],
        Base64URL: Base64URLOfAttachment[key]
      });
    }

    setFinalBase642New((prev) => [...prev]);
    ObjectOfFileNameAndBase64({
      NameOFFile: FileNameOfAttachment,
      Base64UrlOfFile: Base64URLOfAttachment,
      FileBaseandNameObject: finalBase642New
    });
  };

  const ChangeFileIntoBase64 = (fileData) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(fileData);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (err) => {
        reject(err);
      };
    });
  };

  return (
    <div>
      <TextField
        fullWidth
        id="fullWidth"
        type="file"
        name="Attachment"
        variant="standard"
        className={classes.InputField}
        onChange={fileChangedHandler}
        inputProps={{ multiple: true }}
        InputProps={{
          endAdornment: (
            <Box
              display="flex"
              flexDirection="row"
              alignItems="center"
              justifyContent="space-between"
              sx={{ mb: 2 }}
            >
              <ClickAwayListener onClickAway={handleClickAway}>
                <Tooltip
                  PopperProps={{
                    disablePortal: true
                  }}
                  onClose={handleClick}
                  open={open}
                  disableFocusListener
                  disableHoverListener
                  disableTouchListener
                  title={
                    'Supports only .BMP, .DOC, .DOCX, .JPG, .JPEG, .PDF, .PNG, .PPS, .PPSX, .PPT, .PPTX, .XLS, .XLSX files types with total size upto 20 MB.'
                  }
                  arrow
                  placement="left"
                  componentsProps={{
                    tooltip: {
                      sx: {
                        marginLeft: '70px',
                        mt: 0.5,
                        transform: 'translate3d(17px, 0.5px, 0px) !important'
                      }
                    }
                  }}
                >
                  <InfoTwoToneIcon
                    type="button"
                    onClick={handleClick}
                    sx={{
                      color: 'navy',
                      mt: 2,
                      fontSize: '17px',
                      float: 'right'
                    }}
                  />
                </Tooltip>
              </ClickAwayListener>
            </Box>
          )
        }}
      />
      {fileerror && (
        <p style={{ marginBottom: -25 }} className={classes.error}>
          {fileerror}
        </p>
      )}
    </div>
  );
};

export default ChooseFile;
