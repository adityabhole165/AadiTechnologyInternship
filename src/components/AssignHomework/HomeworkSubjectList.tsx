import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, TextField, Typography } from '@mui/material';
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
import SearchableDropdown from 'src/libraries/ResuableComponents/SearchableDropdown';
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

  // const Subjectlistsforteacher = useSelector(
  //   (state: RootState) => state.HomeworkSubjectList.SubjectListForTeacher
  // );
  console.log(Subjectlistsforteacher, "aa");

  const PublishUnpublishHomework = useSelector(
    (state: RootState) => state.HomeworkSubjectList.PublishUnPublishHomework
  );
  const AllHomeworkDocuments = useSelector(
    (state: RootState) => state.HomeworkSubjectList.GetAllHomeworkDocuments
  );
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
  useEffect(() => {
    const GetHomeworkDetailBody: IGetHomeworkDetailBody = {
      asSchoolId: asSchoolId,
      asAcademicyearId: asAcademicYearId,
      asHomeworkId: Number(Id)
    };
    dispatch(GetHomeworkDetailss(GetHomeworkDetailBody));
  }, []);
  // useEffect(() => {
  //   dispatch(GetHomeworkDetailss(GetHomeworkDetailBody));
  // }, []);

  useEffect(() => {
    dispatch(GetAllHomeworkDocuments(IGetAllHomeworkDocuments));
  }, []);
  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    setAssignedDate(today);
    dispatch(homeworklistforteacher(GetSubjectListForTeacherBody));
  }, []);

  const clickEdit1 = (Id) => {
    const GetHomeworkDetailBody: IGetHomeworkDetailBody = {
      asSchoolId: asSchoolId,
      asAcademicyearId: asAcademicYearId,
      asHomeworkId: Number(Id)
    };
    dispatch(GetHomeworkDetailss(GetHomeworkDetailBody));
  };

  // useEffect(() => {
  //   console.log(' after edit:', HomeworkDetail);
  //   if (HomeworkDetail && HomeworkDetail.length > 0) {
  //     setHomeworkId(HomeworkDetail.Id.toString);
  //     setAttechment(HomeworkDetail[0].AttachmentPath);
  //     setAssignedDate(HomeworkDetail[0].AssignedDate);
  //     setCompleteDate(HomeworkDetail[0].CompleteByDate);
  //     setTitle(HomeworkDetail[0].Title);
  //     setDetails(HomeworkDetail[0].Details);
  //   }
  // }, [HomeworkDetail]);
  useEffect(() => {
    if (HomeworkDetail !== null) {
      console.log(' after edit:', HomeworkDetail);

      setTitle(HomeworkDetail.Title);

      setDetails(HomeworkDetail.Details);

    }
  }, [HomeworkDetail]);

  const [isPublish, setIsPublish] = useState(true);
  const [openIsPublishDialog, setOpenIsPublishDialog] = useState(false);
  const [publishId, setPublishId] = useState();

  const getIsPublish = (Id) => {
    let IsPublish = true;
    Subjectlistsforteacher.map((item) => {
      if (item.Id.toString() == Id.toString()) {
        IsPublish = item.Text7 == 'false' ? true : false;
        return IsPublish;
      }
    });
    return IsPublish;
  };
  const clickPublishUnpublish = (Id) => {
    let IsPublish = getIsPublish(Id);
    if (IsPublish == false) {
      // navigate('/extended-sidebar/Teacher/AddUnpublish/' + Id);
      setOpenIsPublishDialog(true);
      setPublishId(Id);
    } else {
      setOpenIsPublishDialog(false);
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
  const clickEdit = (Id) => {
    setHomeworkS(Id);
    navigate('/extended-sidebar/Teacher/AddHomework/' + Id);
  };

  return (
    <>

      {/* <Grid item xs={4}>
  <DropDown
    itemList={HomeworkStatus}
    ClickItem={clickHomeworkStatus}
    DefaultValue={HomeworkS}
    Label={''}
    
  />
</Grid> */}
      <Grid container spacing={2} justifyContent={'flex-end'} pb={1}>
        <Grid item xs={3}>
          <SearchableDropdown
            sx={{ minWidth: '100%' }}
            ItemList={HomeworkStatus}
            onChange={clickHomeworkStatus}
            defaultValue={HomeworkS}
            label={'Select Homework Status'}
          />
        </Grid>


        <Grid item xs={3}>
          <TextField
            fullWidth
            InputLabelProps={{
              shrink: true
            }}
            label={'Date'}
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
        <Grid item xs={2}>
          <TextField
            fullWidth
            label="Title"
            value={Title}
            variant={'standard'}
            onChange={(e) => {
              handleTitle(e.target.value);
            }}
          />
        </Grid>
        <Grid item xs={1}>
          <Button onClick={clickSearch} variant="contained">
            Search
          </Button>
        </Grid>
      </Grid>

      <Assignedhomeworklist
        ItemList={Subjectlistsforteacher}
        clickView={clickTitle}
        clickDelete={clickDelete}
        clickEdit={clickEdit}
        clickVisibilityIcon={clickView}
        clickpublish={clickPublishUnpublish}
        HeaderArray={HeaderPublish}
        clickAttachment={clickFileName}
      />
      {openIsPublishDialog && (
        <PublishUnpublishDialog
          open={openIsPublishDialog}
          setOpen={setOpenIsPublishDialog}
          publishId={publishId}
          setPublishId={setPublishId}
          clickPublishUnpublish={clickPublishUnpublish}
        />
      )}
    </>
  );
};

export default HomeworkSubjectList;

const PublishUnpublishDialog = ({ open, setOpen, publishId: Id, setPublishId, clickPublishUnpublish }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [Details, setDetails] = useState('');
  const asSchoolId = Number(localStorage.getItem('localSchoolId'));
  const asAcademicYearId = Number(sessionStorage.getItem('AcademicYearId'));
  const asTeacherId = sessionStorage.getItem('TeacherId');
  const AllPublishUnPublishHomework = useSelector(
    (state: RootState) => state.AddHomework.PublishUnPublishHomework
  );

  const ClickOk = () => {
    if (Details != '') clickPublishUnpublish(Id);
  };

  return (
    <Dialog
      open={open}
      onClose={() => {
        setOpen(false)
      }}
      fullWidth
      maxWidth={'sm'}
    >
      <DialogTitle
        sx={{
          backgroundColor: (theme) => theme.palette.primary.main,
          py: 1
        }}
      ></DialogTitle>
      <DialogContent dividers sx={{ px: 4 }}>
        <Typography variant={"h4"} sx={{ mb: 1 }}>
          Unpublish Reason
        </Typography>
        <TextField
          multiline
          rows={3}
          value={Details}
          onChange={(e) => {
            setDetails(e.target.value);
          }}
          sx={{ width: '100%' }}
        />
      </DialogContent>
      <DialogActions sx={{ py: 2, px: 3 }}>
        <Button onClick={() => {
          setOpen(false)
        }} color={'error'}>
          Cancel
        </Button>
        <Button onClick={() => { ClickOk() }} variant={'contained'}>
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  )
}