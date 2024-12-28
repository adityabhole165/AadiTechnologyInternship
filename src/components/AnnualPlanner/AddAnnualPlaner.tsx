import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Button, Dialog, DialogActions, DialogContent } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import {
  IAddAnnualPlannerBody,
  IDeleteFileDetailsBody,
  IGetFileDetailsBody
} from 'src/interfaces/AddAnnualPlanner/IAddAnnualPlanner';
import SingleFile from 'src/libraries/File/SingleFile';
import { ButtonPrimary } from 'src/libraries/styled/ButtonStyle';
import {
  DeleteFile,
  GetFile,
  addanual
} from 'src/requests/AddAnnualPlanner/RequestAddAnnualPlanner';
import { RootState } from 'src/store';

const AddAnnualPlaner = () => {
  const dispatch = useDispatch();

  const AddAnnualPlanner: any = useSelector(
    (state: RootState) => state.AddPlanner.AddAnnual
  );
  //console.log(AddAnnualPlanner, 'AddAnnualPlanner');

  const FileDetails: any = useSelector(
    (state: RootState) => state.AddPlanner.getfile
  );
  //console.log(FileDetails, 'FileDetails');

  // const DeleteFileDetails = useSelector((state: RootState) => state.AddPlanner.deletefile);
  // console.log(DeleteFileDetails, "DeleteFileDetails")

  const ValidFileTypes = ['PDF', 'JPG', 'PNG', 'BMP', 'JPEG'];
  const MaxfileSize = 3000000;

  const [Open, setOpen] = useState(false);
  const [fileName, setFileName] = useState('');
  const [base64URL, setbase64URL] = useState('');
  const [buttonEnable, setbuttonEnable] = useState(true);

  const asAcademicYearId = sessionStorage.getItem('AcademicYearId');
  const asSchoolId = localStorage.getItem('localSchoolId');
  const asUpdatedById = localStorage.getItem('Id');
  const SiteURL = localStorage.getItem('SiteURL');
  let asFolderName = SiteURL.split('/')[SiteURL.split('/').length - 1];
  const AnnualplannerBody: IAddAnnualPlannerBody = {
    asSchoolId: Number(asSchoolId),
    asAcademicYearId: Number(asAcademicYearId),
    asSaveFeature: 'Event Planner',
    asFileName: fileName,
    asFolderName: 'PPSN Website',
    asBase64String: base64URL,
    asUpdatedById: Number(asUpdatedById)
  };
  // useEffect(() => {
  // dispatch(addanual(AnnualplannerBody));
  // }, []);

  const GetFileDetailsBody: IGetFileDetailsBody = {
    asSchoolId: Number(asSchoolId),
    asAcademicYearId: Number(asAcademicYearId)
  };
  useEffect(() => {
    dispatch(GetFile(GetFileDetailsBody));
  }, []);
  useEffect(() => { }, [FileDetails]);
  const DeleteFileDetailsBody: IDeleteFileDetailsBody = {
    asSchoolId: Number(asSchoolId),
    asAcademicYearId: Number(asAcademicYearId)
  };
  // useEffect(() => {
  // dispatch(DeleteFile(DeleteFileDetailsBody));
  // }, []);

  const ClickOpenDialogbox = () => {
    setOpen(true);
  };
  const ClickCloseDialogbox = () => {
    setOpen(false);
  };

  const ChangeFile = (value) => {
    setFileName(value.Name);
    setbase64URL(value.Value);
    //console.log('filevalue', value);
  };
  const clickFileName = () => {
    if (FileDetails !== '') {
      window.open(
        localStorage.getItem('SiteURL') +
        '/RITeSchool/DOWNLOADS/Event%20Planner/' +
        FileDetails[0].LinkUrl
      );
      // localStorage.getItemItem("SiteURL", window.location.pathname)
    }
  };
  const clickSubmit = () => {
    if (fileName.length !== 0 && base64URL.length !== 0) {
      dispatch(addanual(AnnualplannerBody));
      toast.success('File uploaded successfully.', { toastId: 'success1' });
    }
  };

  const clickDelete = (Id) => {
    if (confirm('Are You Sure you want to delete The File')) {
      dispatch(DeleteFile(DeleteFileDetailsBody));
      toast.success('File deleted successfully', { toastId: 'success1' });
    }
  };
  return (
    <div>
      <br></br>
      <br></br>
      <br></br>
      <Button variant="outlined" onClick={ClickOpenDialogbox}>
        Add Annual Planner
      </Button>
      <Dialog open={Open} onClose={ClickCloseDialogbox}>
        <DialogContent>
          <SingleFile
            ValidFileTypes={ValidFileTypes}
            MaxfileSize={MaxfileSize}
            ChangeFile={ChangeFile}
            errorMessage={''}
            filePath={clickFileName.toString()}
            FileName={fileName}
          ></SingleFile>
          <h6>
            (Supports only .PDF, .PNG and .JPG file type. File size should not
            exceed 2 MB.)
          </h6>{' '}
        </DialogContent>
        <DialogActions>
          <VisibilityIcon onClick={clickFileName} />
          <HighlightOffIcon onClick={clickDelete} />
          <ButtonPrimary
            disabled={
              fileName.length !== 0 && base64URL.length !== 0 ? false : true
            }
            onClick={clickSubmit}
          >
            Submit
          </ButtonPrimary>
          <Button
            variant="outlined"
            color="error"
            onClick={ClickCloseDialogbox}
            autoFocus
            size="small"
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AddAnnualPlaner;
