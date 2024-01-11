
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState, useRef } from 'react'
import { RootState } from 'src/store'
import { IGetSubjectListForTeacherBody, IPublishUnPublishHomeworkBody, IGetAllHomeworkDocumentsBody } from "src/interfaces/AssignHomework/IHomeworkSubjectList";
import { homeworklistforteacher, GetPublishUnpublishHomework, resetMessage, GetAllHomeworkDocuments } from "src/requests/AssignHomework/requestHomeworkSubjetList";
import { useNavigate, useParams } from "react-router"
import Assignedhomeworklist from "src/libraries/ResuableComponents/Assignedhomeworklist1"
import { toast } from 'react-toastify';
import { Box, Grid, TextField, Typography } from '@mui/material';
import DropDown from "src/libraries/list/DropDown"
import { ButtonPrimary } from 'src/libraries/styled/ButtonStyle';
import id from 'date-fns/locale/id';
const HomeworkSubjectList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const [HomeworkS, setHomeworkS] = useState("0")
  const [AssignedDate, setAssignedDate] = useState("")
  const [Title, setTitle] = useState("");

  const asSchoolId = Number(localStorage.getItem('localSchoolId'));
  const asAcademicYearId = Number(sessionStorage.getItem('AcademicYearId'));
  const StandardDivisionId = Number(sessionStorage.getItem('StandardDivisionId'));
  const asUpdatedById = localStorage.getItem('Id');
  const asTeacherId = sessionStorage.getItem('TeacherId');
  const { Id ,  } = useParams();
  const HeaderPublish = [
    { Id: 1, Header: "Subject 	" }, { Id: 2, Header: " 	Title" }, { Id: 3, Header: "Assigned Date" },
    { Id: 4, Header: " 	Complete By Date" }, { Id: 5, Header: " Attachment" }, { Id: 6, Header: "View" }, { Id: 7, Header: "Publish/Unpublish" },
    { Id: 8, Header: "Edit" }, { Id: 9, Header: "Delete" }
  ]
  const HomeworkStatus = [
    { Id: "1", Name: "All", Value: "All" },
    { Id: "2", Name: "AssignedDate", Value: "AssignedDate" },
    { Id: "3", Name: "CompleteByDate", Value: "CompleteByDate" }
  ]





  const Subjectlistsforteacher = useSelector((state: RootState) => state.HomeworkSubjectList.SubjectListForTeacher);
  //console.log(Subjectlistsforteacher, "Subjectlistsforteacher....")
  const PublishUnpublishHomework = useSelector((state: RootState) => state.HomeworkSubjectList.PublishUnPublishHomework);
  //console.log(PublishUnpublishHomework, "PublishUnpublishHomework....")
  const AllHomeworkDocuments = useSelector((state: RootState) => state.HomeworkSubjectList.GetAllHomeworkDocuments);
  //           console.log(AllHomeworkDocuments, "AllHomeworkDocuments....")

  const GetSubjectListForTeacherBody: IGetSubjectListForTeacherBody = {
    asSchoolId: asSchoolId,
    asAcademicYearId: asAcademicYearId,
    asStandardDivisionId: StandardDivisionId,
    asHomeWorkStatus: HomeworkS,
    asHomeworkTitle: Title,
    asAssignedDate: AssignedDate
  }
  const IGetAllHomeworkDocuments: IGetAllHomeworkDocumentsBody = {
    asSchoolId: asSchoolId,
    asHomeworkId:Number(Id),
    asAcademicyearId: asAcademicYearId
  }
  useEffect(() => {
    dispatch(GetAllHomeworkDocuments(IGetAllHomeworkDocuments))
  }, []);
  useEffect(() => {
    dispatch(homeworklistforteacher(GetSubjectListForTeacherBody))
  }, []);

  const [isPublish, setIsPublish] = useState(true);

  const clickPublishUnpublish = (Id) => {
    alert(Id)
    const updatedIsPublish = !isPublish;

    const PublishUnPublishHomeworkBody: IPublishUnPublishHomeworkBody = {
      asSchoolId: asSchoolId,
      asAcademicYearId: asAcademicYearId,
      asHomeworkId: Id,
      asReason: "",
      asUpdatedById: asTeacherId,
      asIsPublish: updatedIsPublish,
      asIsSMSSent: true
    }

    dispatch(GetPublishUnpublishHomework(PublishUnPublishHomeworkBody));
    setIsPublish(updatedIsPublish);
  }
  useEffect(() => {
    if (PublishUnpublishHomework != '') {
      toast.success(PublishUnpublishHomework);
      dispatch(resetMessage());
      dispatch(homeworklistforteacher(GetSubjectListForTeacherBody));
    }
  }, [PublishUnpublishHomework]);

  const clickHomeworkStatus = (value) => {
    setHomeworkS(value)
    setAssignedDate(value)
    dispatch(homeworklistforteacher(GetSubjectListForTeacherBody))

  }
  const handleTitle = (value) => {
    setTitle(value)
  }
  const clickSearch = (value) => {

    dispatch(homeworklistforteacher(GetSubjectListForTeacherBody))

  }
  const clickView = (Id) => {
    
    navigate('/extended-sidebar/Teacher/HomeworkDocuments/' + Id)
  } 

  const clickFileName = (value) => {

    if (value !== "") {
      window.open(localStorage.getItem('SiteURL') + "/RITeSchool/DOWNLOADS/Homework/" + value);
    }
  
};
const clickTitle = (Id) => {
  alert(Id)
  navigate('/extended-sidebar/Teacher/ViewHomework/'  + Id)
} 

  return (
    <div>
      <br></br>
      <br></br>
      <br></br>

      {/* <Grid item xs={4}>
  <DropDown
    itemList={HomeworkStatus}
    ClickItem={clickHomeworkStatus}
    DefaultValue={HomeworkS}
    Label={''}
    
  />
</Grid> */}

      <Grid container spacing={2}>
        <Grid item xs={4}>
          <DropDown itemList={HomeworkStatus} ClickItem={clickHomeworkStatus} DefaultValue={HomeworkS} Label={''} />
          <br></br> <br />
        </Grid>

        <Grid item xs={4}>

          <TextField
            sx={{ width: '50%', margin: '1px 0', border: "1px solid #000", boxShadow: '4px 4px 10px rgba(0, 0, 0, 0.2)' }}
            inputProps={{ type: 'date' }} value={AssignedDate}
            onChange={(e) => {
              setAssignedDate(e.target.value);
              console.log('EventEndDate :', e.target.value);
            }}
            variant="standard"
          // error={ErrorEventEndDate !== ''}
          // helperText={ErrorEventEndDate}
          />
        </Grid>
      </Grid>

      <br></br>

      <Grid item xs={2}>
        <Typography margin={'1px'}>
          <b>Title:</b>
        </Typography>
      </Grid>
      <Grid item xs={2} >
        <TextField label=""
          value={Title} onChange={(e) => { handleTitle(e.target.value) }}
        /><br></br>

      </Grid>
      <Grid item xs={2}>
        <ButtonPrimary onClick={clickSearch} variant='contained' style={{ marginRight: "150px", backgroundColor: 'green' }}>
          Search
        </ButtonPrimary>

      </Grid>


      <br></br>
      <br></br>
      <Assignedhomeworklist ItemList={Subjectlistsforteacher} clickView={clickTitle} clickDelete={""} clickEdit={""} clickVisibilityIcon={clickView} clickpublish={clickPublishUnpublish}
        HeaderArray={HeaderPublish} clickAttachment={clickFileName} /><br></br>
      <br></br>











    </div>
  )
}

export default HomeworkSubjectList