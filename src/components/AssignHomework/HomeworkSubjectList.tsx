import { Grid, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import { toast } from 'react-toastify';
import {
  IDeleteHomeworkBody,
  IGetAllHomeworkDocumentsBody,
  IGetHomeworkDetailBody,
  IGetSubjectListForTeacherBody,
  IPublishUnPublishHomeworkBody
} from 'src/interfaces/AssignHomework/IHomeworkSubjectList';
import Assignedhomeworklist from 'src/libraries/ResuableComponents/Assignedhomeworklist1';
import DropDown from 'src/libraries/list/DropDown';
import { ButtonPrimary } from 'src/libraries/styled/ButtonStyle';
import {
  GetAllHomeworkDocuments,
  GetHomeworkDetailss,
  GetPublishUnpublishHomework,
  HomeworkDelete,
  homeworklistforteacher
} from 'src/requests/AssignHomework/requestHomeworkSubjetList';
import { RootState } from 'src/store';
const HomeworkSubjectList = ({ Subjectlistsforteacher }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [HomeworkS, setHomeworkS] = useState('0');
  const [AssignedDate, setAssignedDate] = useState('');
  const [Title, setTitle] = useState('');
  const [HomeworkId, setHomeworkId] = useState('');
  const [CompleteByDate, setCompleteDate] = useState('');
  const [AttachmentPath, setAttechment] = useState('');
  const [Details, setDetails] = useState('');

  const asSchoolId = Number(localStorage.getItem('localSchoolId'));
  const asAcademicYearId = Number(sessionStorage.getItem('AcademicYearId'));
  const StandardDivisionId = Number(
    sessionStorage.getItem('StandardDivisionId')
  );
  const asUpdatedById = localStorage.getItem('Id');
  const asTeacherId = sessionStorage.getItem('TeacherId');
  const { Id } = useParams();
  const HeaderPublish = [
    { Id: 1, Header: 'Subject 	' },
    { Id: 2, Header: ' 	Title' },
    { Id: 3, Header: 'Assigned Date' },
    { Id: 4, Header: ' 	Complete By Date' },
    { Id: 5, Header: ' Attachment' },
    { Id: 6, Header: 'View' },
    { Id: 7, Header: 'Publish/Unpublish' },
    { Id: 8, Header: 'Edit' },
    { Id: 9, Header: 'Delete' }
  ];
  const HomeworkStatus = [
    { Id: '1', Name: 'All', Value: 'All' },
    { Id: '2', Name: 'AssignedDate', Value: 'AssignedDate' },
    { Id: '3', Name: 'CompleteByDate', Value: 'CompleteByDate' }
  ];

  //const Subjectlistsforteacher = useSelector(
  //(state: RootState) => state.HomeworkSubjectList.SubjectListForTeacher
  //);
  //console.log(Subjectlistsforteacher, "Subjectlistsforteacher....")
  const PublishUnpublishHomework = useSelector(
    (state: RootState) => state.HomeworkSubjectList.PublishUnPublishHomework
  );
  //console.log(PublishUnpublishHomework, "PublishUnpublishHomework.hgy...")
  const AllHomeworkDocuments = useSelector(
    (state: RootState) => state.HomeworkSubjectList.GetAllHomeworkDocuments
  );
  //console.log(AllHomeworkDocuments, "AllHomeworkDocuments....")
  const DeleteHomework = useSelector(
    (state: RootState) => state.HomeworkSubjectList.DeleteHomework
  );

  const HomeworkDetail: any = useSelector(
    (state: RootState) => state.HomeworkSubjectList.GetHomeworkDetail
  );
  console.log(HomeworkDetail, 'HomeworkDetail.eeeeee...');

  const GetSubjectListForTeacherBody: IGetSubjectListForTeacherBody = {
    asSchoolId: asSchoolId,
    asAcademicYearId: asAcademicYearId,
    asStandardDivisionId: StandardDivisionId,
    asHomeWorkStatus: HomeworkS,
    asHomeworkTitle: Title,
    asAssignedDate: AssignedDate
  };
  const IGetAllHomeworkDocuments: IGetAllHomeworkDocumentsBody = {
    asSchoolId: asSchoolId,
    asHomeworkId: Number(Id),
    asAcademicyearId: asAcademicYearId
  };
  const GetHomeworkDetailBody: IGetHomeworkDetailBody = {
    asSchoolId: asSchoolId,
    asAcademicyearId: asAcademicYearId,
    asHomeworkId: Number(Id)
  };
  useEffect(() => {
    dispatch(GetHomeworkDetailss(GetHomeworkDetailBody));
  }, []);

  useEffect(() => {
    dispatch(GetAllHomeworkDocuments(IGetAllHomeworkDocuments));
  }, []);
  useEffect(() => {
    dispatch(homeworklistforteacher(GetSubjectListForTeacherBody));
  }, []);

  // useEffect(() => {
  //   console.log(HomeworkDetail, 'GetStudentDetail');
  //   if (HomeworkDetail !== '') {
  //     setHomeworkId(HomeworkDetail.Id);
  //     setAssignedDate(HomeworkDetail.AssignedDate);
  //     setCompleteDate(HomeworkDetail.CompleteByDate);
  //     setTitle(HomeworkDetail.Title);
  //     setAttechment(HomeworkDetail.AttachmentPath);
  //     setDetails(HomeworkDetail.Details);
  //   }
  // }, [HomeworkDetail]);

  const [isPublish, setIsPublish] = useState(true);

  const getIsPublish = (Id) => {
    let IsPublish = false;
    Subjectlistsforteacher.map((item) => {
      if (item.Id.toString() == Id.toString()) {
        IsPublish = item.Text7 == 'False' ? true : false;
        return IsPublish;
      }
    });
    return IsPublish;
  };
  const clickPublishUnpublish = (Id) => {
    let IsPublish = getIsPublish(Id);
    if (IsPublish) {
      navigate('/extended-sidebar/Teacher/AddUnpublish/' + Id);
    } else {
      const PublishUnPublishHomeworkBody: IPublishUnPublishHomeworkBody = {
        asSchoolId: asSchoolId,
        asAcademicYearId: asAcademicYearId,
        asHomeworkId: Id,
        asReason: '',
        asUpdatedById: asTeacherId,
        asIsPublish: IsPublish,
        asIsSMSSent: true
      };
      dispatch(GetPublishUnpublishHomework(PublishUnPublishHomeworkBody));
    }
  };
  useEffect(() => {
    if (PublishUnpublishHomework != '') {
      toast.success(PublishUnpublishHomework);
      //dispatch(resetMessage());
      dispatch(homeworklistforteacher(GetSubjectListForTeacherBody));
    }
  }, [PublishUnpublishHomework]);

  // const Changestaus = (Id) => {
  //   const updatedIsPublish = !isPublish;

  //   const PublishUnPublishHomeworkBody: IPublishUnPublishHomeworkBody = {
  //     asSchoolId: asSchoolId,
  //     asAcademicYearId: asAcademicYearId,
  //     asHomeworkId: Number(Id),
  //     asReason: '',
  //     asUpdatedById: asTeacherId,
  //     asIsPublish: updatedIsPublish,
  //     asIsSMSSent: true
  //   };
  //   dispatch(GetPublishUnpublishHomework(PublishUnPublishHomeworkBody));

  //   setIsPublish(updatedIsPublish);
  // };

  // useEffect(() => {
  //   if (PublishUnpublishHomework != '') {
  //     toast.success(PublishUnpublishHomework);
  //     //dispatch(resetMessage());
  //     dispatch(homeworklistforteacher(GetSubjectListForTeacherBody));
  //   }
  // }, [PublishUnpublishHomework]);

  const clickDelete = (Id) => {
    // alert(Id)
    if (confirm('Are You Sure you want to delete The List')) {
      const DeleteHomeworkBody: IDeleteHomeworkBody = {
        asSchoolId: asSchoolId,
        asAcademicYearId: asAcademicYearId,
        asHomeworkId: Id,
        asUpdatedById: Number(asUpdatedById)
      };
      dispatch(HomeworkDelete(DeleteHomeworkBody));
    }
  };
  const clickHomeworkStatus = (value) => {
    setHomeworkS(value);
    setAssignedDate(value);
    dispatch(homeworklistforteacher(GetSubjectListForTeacherBody));
  };
  const handleTitle = (value) => {
    setTitle(value);
  };
  // const clickSearch = (value) => {
  //   dispatch(homeworklistforteacher(GetSubjectListForTeacherBody));
  // };
  const clickSearch = (value) => {
    setAssignedDate(value);
    setTitle(value);

    if (Subjectlistsforteacher && Subjectlistsforteacher.length == 0) {
      toast.success('No Records Found');
    }
    dispatch(homeworklistforteacher(GetSubjectListForTeacherBody));
  };

  const clickView = (Id) => {
    navigate('/extended-sidebar/Teacher/HomeworkDocuments/' + Id);
  };

  const clickFileName = (value) => {
    if (value !== '') {
      window.open(
        localStorage.getItem('SiteURL') +
          '/RITeSchool/DOWNLOADS/Homework/' +
          value
      );
    }
  };
  const clickTitle = (Id) => {
    navigate('/extended-sidebar/Teacher/ViewHomework/' + Id);
  };
  // const clickEdit = (Id) => {
  //   setHomeworkS(Id);
  //   navigate('/extended-sidebar/Teacher/AddHomework/' + Id);
  // };
  const clickEdit1 = (value) => {
    setHomeworkS(value);
    const GetHomeworkDetailBody: IGetHomeworkDetailBody = {
      asSchoolId: asSchoolId,
      asAcademicyearId: asAcademicYearId,
      asHomeworkId: Number(Id)
    };
    dispatch(GetHomeworkDetailss(GetHomeworkDetailBody));
  };

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
          <DropDown
            width={200}
            itemList={HomeworkStatus}
            ClickItem={clickHomeworkStatus}
            DefaultValue={HomeworkS}
            Label={''}
          />
          <br></br> <br />
        </Grid>

        <Grid item xs={4}>
          <TextField
            sx={{
              width: '50%',
              margin: '1px 0',
              border: '1px solid #000',
              boxShadow: '4px 4px 10px rgba(0, 0, 0, 0.2)'
            }}
            inputProps={{ type: 'date' }}
            value={AssignedDate}
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
      <Grid item xs={2}>
        <TextField
          label=""
          value={Title}
          onChange={(e) => {
            handleTitle(e.target.value);
          }}
        />
        <br></br>
      </Grid>
      <Grid item xs={2}>
        <ButtonPrimary
          onClick={clickSearch}
          variant="contained"
          style={{ marginRight: '150px', backgroundColor: 'green' }}
        >
          Search
        </ButtonPrimary>
      </Grid>

      <br></br>
      <br></br>
      <Assignedhomeworklist
        ItemList={Subjectlistsforteacher}
        clickView={clickTitle}
        clickDelete={clickDelete}
        clickEdit={clickEdit1}
        clickVisibilityIcon={clickView}
        clickpublish={clickPublishUnpublish}
        HeaderArray={HeaderPublish}
        clickAttachment={clickFileName}
      />
      <br></br>
      <br></br>
    </div>
  );
};

export default HomeworkSubjectList;
