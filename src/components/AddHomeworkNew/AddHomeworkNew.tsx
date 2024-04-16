import Close from '@mui/icons-material/Close';
import { Box, Tooltip, IconButton, Grid, TextField, Button } from '@mui/material';
import { grey, red, green } from '@mui/material/colors';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IGetSubjectListForTeacherBody, IGetTeacherSubjectAndClassSubjectBody, ISaveHomeworkBody } from 'src/interfaces/AssignHomework/IAddHomework';
import { GetTeacherSubjectList, HomeworkSave, SubjectListforTeacherDropdown, resetHomework } from 'src/requests/AssignHomework/requestAddHomework';
import { RootState } from 'src/store';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import SaveIcon from '@mui/icons-material/Save';

import CommonPageHeader from '../CommonPageHeader';
import { useParams } from 'react-router-dom';
import SearchableDropdown from 'src/libraries/ResuableComponents/SearchableDropdown';
import SingleFile from 'src/libraries/File/SingleFile';
import CloudUpload from '@mui/icons-material/CloudUpload';
import UploadMultipleDialog from '../AssignHomework/UploadMultipleDialog';
import { toast } from 'react-toastify';

const AddHomeworkNew = () => {
    const {   TeacherName,  ClassName , SubjectName, SubjectId} =
    useParams();
    const [Subject, setSubject] = useState(SubjectName);
     const [Title, setTitle] = useState(SubjectName + ' : ' + new Date().toISOString().split('T')[0]);
     const [AssignedDate, setAssignedDate]: any = useState(new Date().toISOString().split('T')[0]);
     const [ErrorAssignedDate, setErrorAssignedDate]: any = useState('');
     const [ErrorTitle, setErrorTitle] = useState('');
     const [CompleteDate, setCompleteDate] = useState('');
     const ValidFileTypes = ['PDF', 'JPG', 'PNG', 'BMP', 'JPEG'];
     const MaxfileSize = 3000000;
     const [fileName, setFileName] = useState('');
     const [File, setFile] = useState('');
     const [base64URL, setbase64URL] = useState('');
     const [openUploadMultipleDialog, setOpenUploadMultipleDialog] = useState(false);
     const [MultipleFiles, setMultipleFiles] = useState([]);
     const [Details, setDetails] = useState('');
     const [ErrorDetails, setErrorDetails] = useState('');
     const [Errorbase64URL, setErrorbase64URL] = useState('');
     const [ErrorCompleteDate, setErrorCompleteDate] = useState('');
     const [SubjectCheckID, setSubjectCheckID] = useState(SubjectId);
    const dispatch = useDispatch();
    const asSchoolId = Number(localStorage.getItem('localSchoolId'));
    const asAcademicYearId = Number(sessionStorage.getItem('AcademicYearId'));
    const StandardDivisionId = Number(
        sessionStorage.getItem('StandardDivisionId')
    );
    const asUpdatedById = localStorage.getItem('Id');
    const asTeacherId = sessionStorage.getItem('TeacherId');
    // const SiteURL = localStorage.getItem('SiteURL');
    const [SubjectList, setSubjectList] = useState([]);
    // const asFolderName = localStorage.getItem('FolderName');
    // let asFolderName = SiteURL.split('/')[SiteURL.split('/').length-1]
    const SiteURL = localStorage.getItem('SiteURL');
    let asFolderName = SiteURL.split('/')[SiteURL.split('/').length - 1];

    const SaveHomework = useSelector(
        (state: RootState) => state.AddHomework.ISSaveHomework
    );
    //console.log(SaveHomework, "SaveHomework....")
    const ClassSubject = useSelector(
        (state: RootState) => state.AddHomework.Subjectlist
    );
    //console.log(ClassSubject, "ClassSubject....")
    const AllPublishUnPublishHomework = useSelector(
        (state: RootState) => state.AddHomework.AllPublishUnpublishHomeworkT
    );
    const HomeworkDetail: any = useSelector(
        (state: RootState) => state.AddHomework.GetHomeworkDetail
    );
    // console.log(HomeworkDetail, "HomeworkDetail..ssss..")
    const Subjectlistsforteacher = useSelector(
        (state: RootState) => state.AddHomework.SubjectListTeacher
    );
    // console.log(Subjectlistsforteacher, "Subjectlistsforteacher....")


    const GetSubjectListForTeacherBody: IGetSubjectListForTeacherBody = {
        asSchoolId: asSchoolId,
        asAcademicYearId: asAcademicYearId,
        asStandardDivisionId: StandardDivisionId,
        asHomeWorkStatus: 'All',
        asHomeworkTitle: '',
        asAssignedDate: '2023-04-18 00:00:00'
    };

    const GetTeacherSubjectAndClassSubjectBody: IGetTeacherSubjectAndClassSubjectBody =
    {
        asSchoolId: asSchoolId,
        aTeacherId: Number(asTeacherId),
        asAcademicYearId: asAcademicYearId,
        asStandardDivisionId: StandardDivisionId
    };

    const HomeworkSaveBody: ISaveHomeworkBody = {
        asTitle: Title,
        asSubjectId: Number(SubjectCheckID),
        
        
        asStandardDivisionId: StandardDivisionId,
        asAttachmentPath: File,
        asDetails: Details,
        asAssignDate: AssignedDate,
        asCompleteByDate: CompleteDate,
        asSchoolId: asSchoolId,
        asAcademicYearId: asAcademicYearId,
        asInsertedById: Number(asTeacherId),
        asSaveFeature: 'Homework',
        asFolderName: 'PPSN Website',
        asBase64String: base64URL,
        additionalAttachmentFile: MultipleFiles
      };
    
      console.log(SubjectCheckID,"SubjectCheckID");
     

      const ResetForm = () => {
        setSubjectCheckID('');
        setTitle('');
        setAssignedDate('');
        setCompleteDate('');
        setFile('');

        setDetails('');
      };
      const onClickCancel = () => {
        ResetForm();
      };
    

    const ClickSaveHomework = () => {
        let isError = false;
        if (AssignedDate == '') {
          setErrorAssignedDate('Field should not be blank')
          isError = true
    
        } else if (CompleteDate == '') {
          setErrorCompleteDate('Field should not be blank')
          isError = true
        }
        else if (base64URL == '') {
          setErrorbase64URL('Field should not be blank')
          isError = true
        }
       
        else if (Details == '') {
          setErrorDetails('Field should not be blank')
          isError = true
        }
    
        if (!isError) {
          dispatch(HomeworkSave(HomeworkSaveBody))
        }
    
        if (!isError) {
          ResetForm()
        }
      }
      useEffect(() => {
        if (SaveHomework != '') {
            dispatch(resetHomework());
          toast.success(SaveHomework);
        }
      }, [SaveHomework]);

    const clickSubjectList = (value) => {
        setSubject(value);
      };

      const ChangeFile = (value) => {
        setFile(value.Name);
        setbase64URL(value.Value);
        setFileName(value.Name);
      };


    //dropdown
    useEffect(() => {
        dispatch(SubjectListforTeacherDropdown(GetTeacherSubjectAndClassSubjectBody));
    }, []);

    useEffect(() => {
        dispatch(GetTeacherSubjectList(GetSubjectListForTeacherBody));
    }, []);




    return (
        <>

<Box>
        <CommonPageHeader
        navLinks={[
          {
            title: 'Assign Homework',
            path: '/extended-sidebar/Teacher/AssignHomework'
          },
          { title: 'Add Homework', path: '/extended-sidebar/Teacher/AddHomework' },
        ]}
        rightActions={
          <>
            <Box>
              <Tooltip
                title={`Users can Add/Edit/Delete/Publish and Unpublish homework. And displays homework added by other teachers.`}
              >
                <IconButton
                  sx={{
                    color: 'white',
                    backgroundColor: grey[500],
                    height: '36px !important',
                    ':hover': { backgroundColor: grey[600] }
                  }}
                >
                  <QuestionMarkIcon/>
                </IconButton>
              </Tooltip>
            </Box>
          
            <Box>
              <Tooltip title={`Cancel`}>
                <IconButton
                  sx={{
                    color: 'white',
                    backgroundColor: grey[500],
                    height: '36px !important',
                    ':hover': { backgroundColor: red[600] }
                  }}
                  onClick={() => onClickCancel}
                >
                  <Close />
                </IconButton>
              </Tooltip>
            </Box>
            <Box>
              <Tooltip title={`Save HomeWork`}>
                <IconButton
                  sx={{
                    color: 'white',
                    backgroundColor: green[500],
                    height: '36px !important',
                    ':hover': { backgroundColor: green[600] }
                  }}

                >
                 <SaveIcon onClick={ClickSaveHomework} />
                </IconButton>
              </Tooltip>
            </Box>
          </>
        }
      />

     
          <Grid container spacing={2}>
            <Grid item xs={3}>
              <TextField fullWidth label={'Class'} value={ClassName} />
            </Grid>
            <Grid item xs={3}>
              <TextField
                fullWidth
                label={'Class Teacher'}
                value={TeacherName}
              />
            </Grid>
            <Grid item xs={3}>
             
             <SearchableDropdown
               ItemList={ClassSubject}
               onChange={clickSubjectList}
               defaultValue={Subject}
               sx={{ minWidth: '100%' }}
               label='Select Subject'
             />

            
           </Grid>
           <Grid item xs={3}>
           <TextField
                fullWidth
                value={Title}
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
                error={ErrorTitle !== ''}
                helperText={ErrorTitle}
                label={
                  <span>
                    Title <span style={{ color: 'red' }}>*</span>
                  </span>
                }
              />
           </Grid>

           <Grid item xs={3}>
              <TextField
                fullWidth
                label={
                  <span>
                    Assigned Date <span style={{ color: 'red' }}>*</span>
                  </span>
                }
                InputLabelProps={{
                  shrink: true
                }}
                inputProps={{ type: 'date' }}
                value={AssignedDate}
                onChange={(e) => {
                  setAssignedDate(e.target.value);
                }}
                error={ErrorAssignedDate !== ''}
                helperText={ErrorAssignedDate}
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                fullWidth
                InputLabelProps={{
                  shrink: true
                }}
                label={
                  <span>
                    Complete By Date <span style={{ color: 'red' }}>*</span>
                  </span>
                }
                inputProps={{ type: 'date' }}
                value={CompleteDate}
                onChange={(e) => {
                  setCompleteDate(e.target.value);
                }}
              
              />
            </Grid>

            <Grid item xs={3}>
              <SingleFile
                ValidFileTypes={ValidFileTypes}
                MaxfileSize={MaxfileSize}
                FileName={fileName}
                ChangeFile={ChangeFile}
                FileLabel={'Attachment'}
                width={'100%'}
                height={"52px"}
                isMandatory={false}
              />
            </Grid>

            <Grid item xs={3}>
              <Button
                startIcon={<CloudUpload />}
                fullWidth
                sx={{ py: 1.6 }} variant={"outlined"}
                onClick={() => setOpenUploadMultipleDialog(true)}
              >
                Upload Multiple Attachments
              </Button>
             
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label={
                  <span>
                    Details <span style={{ color: 'red' }}>*</span>
                  </span>
                }
                multiline
                rows={3}
                value={Details}
                onChange={(e) => {
                  setDetails(e.target.value);
                }}
                error={ErrorDetails !== ''}
                helperText={ErrorDetails}
              />
            </Grid>

            </Grid>
          
            {openUploadMultipleDialog && (
            <UploadMultipleDialog
              open={openUploadMultipleDialog}
              MultipleFiles={MultipleFiles}
              setOpen={setOpenUploadMultipleDialog}
              setMultipleFiles={setMultipleFiles}
            />
          )}
           
      </Box>
        
        </>
        
    )
}

export default AddHomeworkNew