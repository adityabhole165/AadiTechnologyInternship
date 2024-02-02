import InfoTwoToneIcon from '@mui/icons-material/InfoTwoTone';
import { Box, ClickAwayListener, TextField, Tooltip } from '@mui/material';
import { useState } from 'react';
import { Styles } from 'src/assets/style/student-style';
import Errormessage from 'src/libraries/ErrorMessages/Errormessage';

const Attachments = () => {
  const classes = Styles();

  const [open, setOpen] = useState<any>(false);
  const [file, setFile] = useState<any>(' ');
  const [fileerror, setFilerror] = useState('');
  const AdharNote =
    'Support only PDF, DOC, DOCX. File size should not exceed 25 MB';
  const fileChangedHandler = (event) => {
    event.preventDefault();
    let file = event.target.files[0];

    setFile(file);
    let reader = new FileReader();

    reader.onload = function (e) {
      alert(e.target.result);
    };
    const fileExtension = file?.name?.split('.').at(-1);
    const allowedFileTypes = ['doc', 'docx', 'pdf'];
    if (fileExtension === undefined || null) {
      setFilerror(null);
    }
    if (
      !allowedFileTypes.includes(fileExtension) &&
      fileExtension != undefined
    ) {
      setFilerror('Please attach the file in the valid format.');
    } else if (allowedFileTypes.includes(fileExtension)) {
      setFilerror(null);
    }
    if (file?.size > 2500000) {
      setFilerror('Please upload a file smaller than 25 MB');
      return false;
    }
  };
  const handleClick = () => {
    setOpen((prev) => !prev);
  };
  const handleClickAway = () => {
    setOpen(false);
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
        inputProps={{ multiple: false }}
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
                  title={AdharNote}
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

      <Box sx={{ mt: '10px' }}>
        {' '}
        {fileerror ? <Errormessage Error={fileerror} /> : null}
      </Box>
    </div>
  );
};

export default Attachments;
