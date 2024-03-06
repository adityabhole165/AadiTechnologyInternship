import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { IAddAnnualPlannerBody, IDeleteFileDetailsBody, IGetFileDetailsBody } from 'src/interfaces/AddAnnualPlanner/IAddAnnualPlanner';
import SingleFile from 'src/libraries/File/SingleFile';
import { DeleteFile, GetFile, addanual } from 'src/requests/AddAnnualPlanner/RequestAddAnnualPlanner';
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

  const clickSubmit = async () => {
    if (fileName.length !== 0 && base64URL.length !== 0) {
      try {
        const AnnualplannerBody: IAddAnnualPlannerBody = {
          asSchoolId: Number(asSchoolId),
          asAcademicYearId: Number(asAcademicYearId),
          asSaveFeature: 'Event Planner',
          asFileName: fileName,
          asFolderName: 'PPSN Website',
          asBase64String: base64URL,
          asUpdatedById: Number(UserId)
        };

        await dispatch(addanual(AnnualplannerBody));
        toast.success('File Uploaded Successfully', { toastId: 'success1' })
        dispatch(GetFile(GetFileDetailsBody));
        setFileName('')
        setbase64URL('')
      } catch (error) {
        console.error('Error uploading file:', error);
        toast.error('Error uploading file', { toastId: 'error1' });
      }
    }
  };

  const DeleteFileDetailsBody: IDeleteFileDetailsBody = {
    asSchoolId: Number(asSchoolId),
    asAcademicYearId: Number(asAcademicYearId),
    asUserId: Number(UserId)
  };

  const GetFileDetailsBody: IGetFileDetailsBody = {
    asSchoolId: Number(asSchoolId),
    asAcademicYearId: Number(asAcademicYearId),
  }

  useEffect(() => {
    dispatch(GetFile(GetFileDetailsBody));
  }, []);

  const clickDelete = async () => {
    if (window.confirm("Are you sure you want to delete current Annual Planner file?")) {
      try {
        await dispatch(DeleteFile(DeleteFileDetailsBody));
        dispatch(GetFile(GetFileDetailsBody));
        toast.success('File Deleted Successfully', { toastId: 'success1' });
      } catch (error) {
        console.error('Error deleting file:', error);
        toast.error('Error deleting file', { toastId: 'error1' });
      }
    }
  };
  const ChangeFile = (value) => {
    setFileName(value.Name);
    setbase64URL(value.Value);
  };
  const clickFileName = () => {
    if (FileDetails !== '') {
      window.open(
        localStorage.getItem('SiteURL') +
        '/RITeSchool/DOWNLOADS/Event%20Planner/' +
        FileDetails[0].LinkUrl
      );
      //localStorage.getItemItem("SiteURL", window.location.pathname)
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
                FileName={fileName}
                viewIcon={true}
                deleteIcon={true}
                FilePath={FileDetails.length > 0 ? FileDetails[0].LinkUrl : ''}
                clickDelete={clickDelete}
                clickFileName={clickFileName}
              ></SingleFile>
              {/* while file is selected */}
              {/* {FileDetails && FileDetails.length > 0 ? (
                <div>
                  <IconButton
                    sx={{ marginRight: 1 }}
                    color={'error'}
                    onClick={clickDelete}
                  >
                    <DeleteIcon style={{ fontSize: 32 }} />
                  </IconButton>
                  <IconButton
                    sx={{ marginLeft: 1 }}
                    color={'primary'}
                    onClick={clickFileName}
                  >
                    <VisibilityTwoToneIcon style={{ fontSize: 32 }} />
                  </IconButton>

                </div>
              ) : (

                <IconButton color={'default'}>
                </IconButton>

              )} */}

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
          <Button
            disabled={
              fileName.length !== 0 && base64URL.length !== 0 ? false : true
            }
            onClick={clickSubmit}
            color={'primary'}
            variant={'contained'}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default UploadAnnualPlanner;
