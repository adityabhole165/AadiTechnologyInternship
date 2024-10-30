import React, { useState } from 'react';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  List,
  ListItem,
  Typography,
  Grid,
  TextField,
  IconButton,
  Tooltip
} from '@mui/material';
import { Clear as ClearIcon, Visibility } from '@mui/icons-material';
import Datepicker from 'src/libraries/DateSelector/Datepicker';
import { useParams } from 'react-router';
import { getCalendarDateFormatDateNew } from '../Common/Util';
import SingleFile from 'src/libraries/File/SingleFile';
import { red } from '@mui/material/colors';
import SearchableDropdown1 from 'src/libraries/ResuableComponents/SearchableDropdown1';
import SearchableDropdown from 'src/libraries/ResuableComponents/SearchableDropdown';
import { ResizableTextField } from '../AddSchoolNitice/ResizableDescriptionBox';

interface AddNotePopupProps {
  open: boolean;
  onClose: () => void;
}

const ValidFileTypes = [
  'BMP',
  'DOC',
  'DOCX',
  'JPG',
  'JPEG',
  'PDF',
  'XLS',
  'XLSX'
];
const MaxfileSize = 5000000;

const AddNotePopup: React.FC<AddNotePopupProps> = ({ open, onClose }) => {
  const [fileNames, setFileNames] = useState<string[]>([]);
  const { AssignedDate } = useParams();
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const uploadedFiles = Array.from(event.target.files).map(
        (file) => file.name
      );
      setFileNames([...fileNames, ...uploadedFiles]);
    }
  };
  const [SelectDate, SetSelectDate] = useState(
    AssignedDate == undefined
      ? new Date().toISOString().split('T')[0]
      : getCalendarDateFormatDateNew(AssignedDate)
  );
  const onSelectDate = (value) => {
    SetSelectDate(value);
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="md"
      PaperProps={{
        sx: {
          borderRadius: '15px'
        }
      }}
    >
      <DialogTitle sx={{ bgcolor: '#223354', position: 'relative' }}>
        <ClearIcon
          onClick={onClose}
          sx={{
            color: 'white',
            borderRadius: '7px',
            position: 'absolute',
            top: '5px',
            right: '8px',
            cursor: 'pointer',
            '&:hover': {
              color: 'red'
            }
          }}
        />
      </DialogTitle>
      <Typography variant="h3" sx={{ pt: 1, pl: 2 }}>
        Student Achievement/Punishment Details
      </Typography>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              name="RegistrationNumber"
              label="Registration Number"
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              name="StudentName"
              label="Student Name"
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <Datepicker
              DateValue={SelectDate}
              onDateChange={onSelectDate}
              // label={'Start Date'}
              size={'medium'}
              label={'Joining Date'}
            />
          </Grid>
          <Grid item xs={4}>
            <Tooltip
              title="Supports only .JPG, .JPEG, .PNG, .BMP, .PDF file type.
                   File size should not exceed 1MB.">
              <SingleFile
                ValidFileTypes={ValidFileTypes}
                MaxfileSize={MaxfileSize}
                // FileName={form.aadharCardScanCopy}
                // ChangeFile={handleImageChange}
                FileLabel={'Attachment'}
                isMandatory={false}
                height={'52px'}
                width="100%"
                ChangeFile={undefined}
              />
            </Tooltip>
          </Grid>
          <Grid item xs={2}>
            <>
              <Tooltip title={'View'}>
                <IconButton
                  onClick={() => ''}
                  sx={{
                    color: '#223354',
                    mt: 0.7,
                    '&:hover': {
                      color: '#223354',
                      cursor: 'pointer'
                    }
                  }}
                >
                  <Visibility />
                </IconButton>
              </Tooltip>

              <Tooltip title={'Delete'}>
                <IconButton
                  onClick={() => ''}
                  sx={{
                    color: '#223354',
                    mt: 0.7,
                    '&:hover': {
                      color: 'red',
                      backgroundColor: red[100]
                    }
                  }}
                >
                  <DeleteForeverIcon />
                </IconButton>
              </Tooltip>
            </>
          </Grid>
        </Grid>
        <Grid xs={12} spacing={2} mt={2}>
          <Grid item>
          <ResizableTextField
          name='description' 
          label={
            <span>
                Description
            </span>
        }
        sx={{
          resize: 'both'
      }}  
          multiline
          fullWidth/>
          </Grid>
        </Grid>
        <List>
          {fileNames.map((fileName, index) => (
            <ListItem key={index}>{fileName}</ListItem>
          ))}
        </List>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Close
        </Button>
        <Button onClick={onClose} color="primary">
          save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddNotePopup;
