import React from 'react'
import PageHeader from 'src/libraries/heading/PageHeader'
import { useEffect,useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from 'src/store';
import { ISaveDailyLogBody,IGetAllHomeworkDailyLogsBody,IGetHomeworkDailyLogBody,IDeleteHomeworkDailyLogBody,IPublishUnpublishHomeworkDailylogBody } from "src/interfaces/AddDailyLog/IAddDailyLog";
import { Savedailylog,getalldailylog,getdailylog,deletedailylog, ResetFilePath,ResetDeleteLog,PublishUnpublishHomework } from 'src/requests/AddDailyLog/RequestAddDailyLog';
import Adddailyloglist from 'src/libraries/ResuableComponents/Adddailyloglist';
import { toast } from 'react-toastify';
import { Navigate,useNavigate, useParams } from 'react-router';
import { Container, Grid, TextField, Typography } from '@mui/material';
import { ButtonPrimary } from 'src/libraries/styled/ButtonStyle';
import SingleFile from 'src/libraries/File/SingleFile';
import BackButton from 'src/libraries/button/BackButton';
import { getDateMonthYearFormatted } from '../Common/Util';

const AddDailyLog = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
    const { Id , ClassName } = useParams();
    

    const [dateState, setDateState] = useState('');

    const [dateError, setDateError] = useState('');
    const [fileName, setFileName] = useState('');
    const [fileNameError, setFileNameError] = useState('');
    const [base64URL, setbase64URL] = useState('');
    const [base64URLError, setbase64URLError] = useState('');
    const [LogId,setLogId] = useState(0);
    const [ItemList, setItemList] = useState('');

  const SaveDailyLog = useSelector((state: RootState) => state.AddDailyLog.Savelog)
  console.log("SaveDailyLog", SaveDailyLog)
  const GetAllHomeworkDailyLogs: any = useSelector((state: RootState) => state.AddDailyLog.GetAllHomework)
  console.log("GetAllHomeworkDailyLogs", GetAllHomeworkDailyLogs)
  const GetHomeworkDailyLogs: any = useSelector((state: RootState) => state.AddDailyLog.GetHomeworkDailyLog)
  console.log("GetHomeworkDailyLogs", GetHomeworkDailyLogs)
  const DeleteHomeworkDailyLogs: any = useSelector((state: RootState) => state.AddDailyLog.DeleteHomework)
  console.log("DeleteHomeworkDailyLogs", DeleteHomeworkDailyLogs)
  const PublishUnpublishHomeworkDailylog: any = useSelector((state: RootState) => state.AddDailyLog.PublishUnpublish)
  console.log("PublishUnpublishHomeworkDailylog", PublishUnpublishHomeworkDailylog)
  const GetFileUS: any = useSelector((state: RootState) => state.AddDailyLog.ISGetfile)
  console.log("GetFileUS", GetFileUS)

  const HeaderPublish1 = [
    {Id:1,Header:"Date"},
    {Id:2,Header:"attechmnet" },
    {Id:3,Header:"publish/unpublish" }
    ,{Id:4,Header:"Edit" },
    {Id:5,Header:"Delete" }
    
  ]

  const ValidFileTypes = ["BMP", "DOC", "DOCX", "JPG", "JPEG", "PNG", "BMP", "PDF", "XLS", "XLSX" ];
  const MaxfileSize = 5000000;

  
  const asSchoolId = Number(localStorage.getItem('localSchoolId'));
  const asAcademicYearId = Number(sessionStorage.getItem('AcademicYearId'));
  const asUserId = Number(localStorage.getItem('UserId'));
  const TeacherId = Number(sessionStorage.getItem('TeacherId'));
  const SiteURL = localStorage.getItem('SiteURL');
    let asFolderName = SiteURL.split('/')[SiteURL.split('/').length-1]

  

  const GetAllHomeworkDailyLogsBody: IGetAllHomeworkDailyLogsBody = {

    asSchoolId:asSchoolId,
    asFilter:"",
    asStdDivId:Number(Id),
    asSortExpression:"Date",
    asStartIndex:0,
    asEndIndex:20,
    asUserId:asUserId
}
  useEffect(() => {
    
    dispatch(getalldailylog(GetAllHomeworkDailyLogsBody))
  }, []);

  // useEffect(() => {
  //   const PublishUnpublishHomeworkDailylogBody: IPublishUnpublishHomeworkDailylogBody = {

  //     "asSchoolId":18,
  //     "asAcademicYearId":54,
  //     "asLogId":2718,
  //     "asUpdatedById":4463,
  //     "asIsPublished":0
  //   }
  //   dispatch(PublishUnpublishHomework(PublishUnpublishHomeworkDailylogBody))
  // }, []);

  

  
    
  useEffect(() => {
  const getCurrentDateTime = () => {
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleString('en-US', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
    setDateState(formattedDate);
  };

  getCurrentDateTime();
}, []);
    
const [isPublish, setIsPublish] = useState(true);

  const Changestaus = (value) => {

    const updatedIsPublish = !isPublish

    const PublishUnpublishHomeworkDailylogBody: IPublishUnpublishHomeworkDailylogBody = {

      asSchoolId:Number(asSchoolId),
      asAcademicYearId:Number(asAcademicYearId),
      asLogId:value,
      asUpdatedById:TeacherId,
      asIsPublished: Number(updatedIsPublish)
    }
    
    dispatch(PublishUnpublishHomework(PublishUnpublishHomeworkDailylogBody))
    setIsPublish(updatedIsPublish);
  };


  useEffect(() => {
    if (PublishUnpublishHomeworkDailylog != '') { 
      toast.success(PublishUnpublishHomeworkDailylog);
      //dispatch(resetMessage());
      dispatch(getalldailylog(GetAllHomeworkDailyLogsBody))
    }
  }, [PublishUnpublishHomeworkDailylog]);


   
  useEffect(() =>{
    console.log(GetHomeworkDailyLogs,"GetStudentDetail")
    if (GetHomeworkDailyLogs !== null) {
      //setLogId(GetHomeworkDailyLogs.LogId)     
      setDateState(GetHomeworkDailyLogs.dateState)
      setFileName(GetHomeworkDailyLogs.fileName)
      setbase64URL(GetHomeworkDailyLogs.base64URL)
    }
  }, [GetHomeworkDailyLogs]);


  
  const clickEdit1=(value)=>{
      const GetHomeworkDailyLogsBody: IGetHomeworkDailyLogBody = {
  
       
         asSchoolId: Number(asSchoolId),
         asAcademicYearId: Number(asAcademicYearId),
          aId:value
      }
      dispatch(getdailylog(GetHomeworkDailyLogsBody))
    }; 
  
  // const clickDelete=()=>{
  //   console.log(id , "iD")
  // }
  
  // useEffect(() => {
  //   if (DeleteHomeworkDailyLogs!== '') {
  //     toast.success(DeleteHomeworkDailyLogs, { toastId: 'success1' })
  //    //dispatch(ResetDeletedLog());
  //    dispatch(deletedailylog(DeleteHomeworkDailyLogsBody))
  //   }
  // }, [DeleteHomeworkDailyLogs]); 

  const clickDelete = (value) => {
    if (confirm('Are You Sure you want to delete The Daily Log')) {
      const DeleteLog: IDeleteHomeworkDailyLogBody =
        { 
        asSchoolId:Number(asSchoolId),
        asAcademicYearId:Number(asAcademicYearId),
        asId:value,
        asUpdatedById:TeacherId
       }
      dispatch(deletedailylog(DeleteLog))
    }

      if (DeleteHomeworkDailyLogs!== '') {
      toast.success(DeleteHomeworkDailyLogs, { toastId: 'success1' })
      dispatch(ResetDeleteLog());
    }
    dispatch(getalldailylog(GetAllHomeworkDailyLogsBody))

} 
  
 

const clickFileName = () => {
  if (GetFileUS !== '') {
    window.open(localStorage.getItem('SiteURL') +
      '/RITeSchool/DOWNLOADS/Homework/DailyLog/' + GetFileUS
    );
     localStorage.getItemItem("SiteURL", window.location.pathname)
  }
};
  
  
  
  
  const onClickBack = () => {
    navigate('/extended-sidebar/Teacher/AssignHomework')
  }

  const handleChange = (e) => {
    const selectedDate = e.target.value;
    setDateState(selectedDate);

    // Validate date
    if (!selectedDate) {
      setDateError('Date should not be blank.');
    } else {
      const currentDate = new Date();
      const selectedDateObj = new Date(selectedDate);

      if (selectedDateObj > currentDate) {
        setDateError('Future dates are disabled.');
      } else {
        setDateError('');
      }
    }
  };

  const ChangeFile = (value) => {
    setFileName(value.Name);
    setbase64URL(value.Value);
  };


  const SaveDailylogBody: ISaveDailyLogBody = {

    aHomeWorkLogId:LogId,
    asStdDivId:Number(Id),
     asDate:dateState,
     asAttachmentName:fileName, 
     asSchoolId:asSchoolId,
     asAcademicYearId:Number(asAcademicYearId),
      asInsertedById:TeacherId,
      asSaveFeature:"Assign Homework",
      asFolderName:asFolderName,
      asBase64String:base64URL
}


const onClickSave=() =>{

    let isError = false;
    if (dateState == '') {
      setDateError('Field should not be blank')
      isError = true
  
    } else if (fileName == '') {
      setFileNameError('Field should not be blank')
      isError = true
    }
   else if (base64URL == '') {
    setbase64URLError('Field should not be blank')
    isError = true
  }

    if (!isError) {
    dispatch(Savedailylog(SaveDailylogBody))
    }

    if (!isError) {
      ResetForm()
    }
  }

useEffect(() => {
  if (SaveDailyLog != '') {
    toast.success(SaveDailyLog);
    dispatch(getalldailylog(GetAllHomeworkDailyLogsBody))
  }
}, [SaveDailyLog]);


const ResetForm = () => {
  setDateState('');
  setFileName('');
  setbase64URL('');

  //setItemList(prev => prev.map((item) => { return { ...item, IsActive: false } }))

};

const onClickCancel=() =>{
  ResetForm()
}

 

  return (
    <>
        <Container maxWidth={'xl'}>

        <PageHeader heading='Add Daily Log' />
        
        <div style={{ textAlign: 'right', color: 'red', paddingRight: '20px' }}>
          Mandatory Fields *
        </div>


        <Grid container spacing={1} justifyContent="center" alignItems="center">
        <Grid item xs={1}>
    <Typography >
    <b>Class :</b>
    </Typography>
  </Grid>
  
  <Grid item xs={1}>
  <TextField value={ClassName}/>
  </Grid>
  </Grid>
 
 <br></br>




        <Grid container spacing={1} justifyContent="center" alignItems="center">
        <Grid item xs={1}>
    <Typography  >
    <b>Date :</b>
    </Typography>
  </Grid>
  
  <Grid item xs={1}>
  <TextField  type='date' value={dateState} onChange={handleChange} variant='standard' error={dateError !== ''} helperText={dateError} InputLabelProps={{ shrink: true }} inputProps={{ max: new Date().toISOString().split('T')[0] }}/>
  {/* <span style={{ color: 'red' }}>{dateError}</span> */}
   
  <div style={{  color: 'red' }}>
         *
        </div>
  </Grid>
  </Grid>
 
 <br></br>
  <Grid container spacing={1} justifyContent="center" alignItems="center">
        <Grid item xs={1}>
    <Typography >
    <b>Attachment :</b>
    </Typography>
  </Grid>
  
  <Grid item xs={1}>
  <SingleFile
            ValidFileTypes={ValidFileTypes}
            MaxfileSize={MaxfileSize}
            ChangeFile={ChangeFile}
          ></SingleFile>{''}
          
  </Grid>
  </Grid>

  <br></br>

  <div >
  <Grid container spacing={2} style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", }}>
  <Grid item xs={1}>
<ButtonPrimary  onClick={onClickSave} variant="contained" >
              <b>Save</b>
            </ButtonPrimary>
            </Grid> 
            
        <Grid item xs={1}>
            <ButtonPrimary onClick={onClickCancel} variant="contained" style={{ backgroundColor: 'red', color: 'white' }}>
               Cancel
            </ButtonPrimary> 
            </Grid>
      </Grid> 
      </div>

      <hr style={{ margin: '20px 0' }} />

      <br />
      <Grid container spacing={1} justifyContent="center" alignItems="center">
        <Grid item xs={1}>
    <Typography  >
    <b>Date :</b>
    </Typography>
  </Grid>
  
  <Grid item xs={1}>
  <TextField  type='date' value={dateState} onChange={handleChange} variant='standard' InputLabelProps={{ shrink: true }} inputProps={{ max: new Date().toISOString().split('T')[0] }}/>
  <span style={{ color: 'red' }}>{dateError}</span>
   
  </Grid>
  </Grid>
      <br />
      {/* {GetAllHomeworkDailyLogs?.IsPublished} */}
        <Adddailyloglist ItemList={GetAllHomeworkDailyLogs}  clickView={clickFileName} HeaderArray={HeaderPublish1}  clickEdit={clickEdit1} clickDelete={clickDelete}  clickpublish={Changestaus}/>
<br></br>
<div>
        <Grid item xs={6}>
            <ButtonPrimary onClick={onClickBack} variant="contained" style={{ backgroundColor: 'red', color: 'white' }}>
               Back
            </ButtonPrimary> 
            </Grid>
    </div>
   </ Container>
    </>
  )
}

export default AddDailyLog
