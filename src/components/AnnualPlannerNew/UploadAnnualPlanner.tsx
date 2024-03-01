import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityTwoToneIcon from '@mui/icons-material/VisibilityTwoTone';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormLabel,
  IconButton,
  Typography
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { IAddAnnualPlannerBody, IDeleteFileDetailsBody } from 'src/interfaces/AddAnnualPlanner/IAddAnnualPlanner';
import SingleFile from 'src/libraries/File/SingleFile';
import { DeleteFile, addanual } from 'src/requests/AddAnnualPlanner/RequestAddAnnualPlanner';
import { RootState } from 'src/store';

const UploadAnnualPlanner = ({
  openAnnualPlannerDialog,
  setOpenAnnualPlannerDialog
}) => {
  const dispatch = useDispatch();
  const [fileName, setFileName] = useState('');
  const [base64URL, setbase64URL] = useState('');
  const asAcademicYearId = sessionStorage.getItem('AcademicYearId');
  const asSchoolId = localStorage.getItem('localSchoolId');
  const UserId = sessionStorage.getItem('Id');
  const ValidFileTypes = ['PDF', 'JPG', 'PNG', 'BMP', 'JPEG'];
  const MaxfileSize = 3000000;

  const FileDetails: any = useSelector(
    (state: RootState) => state.AddPlanner.getfile
  );
  const AddAnnualPlanner: any = useSelector(
    (state: RootState) => state.AddPlanner.AddAnnual
  );

  const DeleteFileDetails = useSelector((state: RootState) => state.AddPlanner.deletefile);

  const clickSubmit = () => {
    if (fileName.length !== 0 && base64URL.length !== 0) {
      const AnnualplannerBody: IAddAnnualPlannerBody = {
        asSchoolId: Number(asSchoolId),
        asAcademicYearId: Number(asAcademicYearId),
        asSaveFeature: 'Event Planner',
        asFileName: fileName,
        asFolderName: 'PPSN Website',
        asBase64String: base64URL,
        asUpdatedById: Number(UserId)
      };
      dispatch(addanual(AnnualplannerBody));
      toast.success('File Uploaded Successfully', { toastId: 'success1' });
    }
  };
  
  useEffect(() => {}, [FileDetails]);
  const DeleteFileDetailsBody: IDeleteFileDetailsBody = {
    asSchoolId: Number(asSchoolId),
    asAcademicYearId: Number(asAcademicYearId),
    asUserId: Number(UserId)
  };

  const clickDelete = () => {
    if (confirm('Are You Sure you want to delete The File')) {
      dispatch(DeleteFile(DeleteFileDetailsBody));
      toast.success('File Deleted Successfully', { toastId: 'success1' });
    }
  };
  const ChangeFile = (value) => {
    setFileName(value.Name);
    setbase64URL(value.Value);
  };
  const clickFileName = () => {
    if (FileDetails && FileDetails.length > 0) {
      const fileUrl =
        localStorage.getItem('SiteURL') +
        '/RITeSchool/DOWNLOADS/Event%20Planner/' +
        FileDetails[0].LinkUrl;
  
      
      window.open(fileUrl);
    }
  };
   
  
  
  return (
    <>
      {' '}
      <Dialog
        open={openAnnualPlannerDialog}
        maxWidth={'sm'}
        fullWidth
        onClose={() => setOpenAnnualPlannerDialog(false)}
      >
        <DialogTitle
          sx={{
            py: 1,
            backgroundColor: (theme) => theme.colors.primary.main,
            color: (theme) => theme.palette.common.white
          }}
        ></DialogTitle>
        <DialogContent dividers>
          <Box>
            <Typography variant={'h3'}>Upload Annual Planner</Typography>
            <Box sx={{ mt: 2 }}>
              {/* while file is not selected */}
              <SingleFile
                ValidFileTypes={ValidFileTypes}
                MaxfileSize={MaxfileSize}
                ChangeFile={ChangeFile}
                errorMessage={''}
                filePath={clickFileName.toString()}
                FileName={fileName}
              ></SingleFile>
              {/* while file is selected */}
              {AddAnnualPlanner && (
                <Box
                  sx={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    border: (theme) =>
                      `2px dashed ${theme.colors.primary.main}`,
                    fontSize: '18px',
                    gap: 2,
                    p: 1
                  }}
                >
                  {AddAnnualPlanner?.name}
                  <IconButton
                    color={'error'}
                    onClick={() => {
                      setFileName(null);
                    }}
                  >
                    <DeleteIcon   onClick={clickDelete}/>
                  </IconButton>
                  <IconButton color={'primary'}>
                  <VisibilityTwoToneIcon onClick={clickFileName} />
                  </IconButton>
                </Box>
              )}
              <FormLabel>
                Supports only .PDF, .PNG and .JPG file type. File size should
                not exceed 2 MB.
              </FormLabel>
            </Box>
          </Box>
        </DialogContent>
        <DialogActions sx={{ py: 2, px: 3 }}>
          <Button
            color={'error'}
            onClick={() => {
              setOpenAnnualPlannerDialog(false);
            }}
          >
            Cancel
          </Button>
          <Button onClick={clickSubmit} color={'primary'} variant={'contained'}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default UploadAnnualPlanner;
