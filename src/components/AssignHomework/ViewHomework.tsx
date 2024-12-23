import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import {
  Box,
  Grid,
  IconButton,
  TextField,
  Tooltip,
  Typography
} from '@mui/material';
import { grey } from '@mui/material/colors';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { IGetAllHomeworkDocumentsBody, IGetHomeworkDetailBody } from 'src/interfaces/AssignHomework/IAddHomework';
import { GetAllHomeworkDocuments } from 'src/requests/AssignHomework/requestHomeworkDocuments';
import { GetHomeworkDetails } from 'src/requests/AssignHomework/requestViewHomework';
import { RootState } from 'src/store';
import { getCalendarDateFormatDate } from '../Common/Util';
import CommonPageHeader from '../CommonPageHeader';
import DatepickerLeave from '../LeaveDetails/DatepickerLeave';
import { encodeURL } from '../Common/Util';
const ViewHomework = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { Id, TeacherName, ClassName, SubjectName, SubjectId, MySubject, TeacherId, SelectClass } = useParams();
  const [AssignedDate, setAssignedDate] = useState('');
  const [Title, setTitle] = useState('');
  const [HomeworkId, setHomeworkId] = useState('');
  const [CompleteByDate, setCompleteDate] = useState('');
  const [AttachmentPath, setAttechment] = useState('');
  const [Details, setDetails] = useState('');

  const asSchoolId = Number(localStorage.getItem('localSchoolId'));
  const asAcademicYearId = Number(sessionStorage.getItem('AcademicYearId'));
  const HomeworkDetail: any = useSelector(
    (state: RootState) => state.ViewHomework.GetHomeworkDetail
  );

  const AllHomeworkDocuments = useSelector(
    (state: RootState) => state.Homeworkdocument.GetAllHomeworkDocuments
  );
  const IGetAllHomeworkDocuments: IGetAllHomeworkDocumentsBody = {
    asSchoolId: asSchoolId,
    asHomeworkId: Number(Id),
    asAcademicyearId: asAcademicYearId
  };

  useEffect(() => {
    dispatch(GetAllHomeworkDocuments(IGetAllHomeworkDocuments));
  }, []);

  const GetHomeworkDetailBody: IGetHomeworkDetailBody = {
    asSchoolId: asSchoolId,
    asAcademicyearId: asAcademicYearId,
    asHomeworkId: Number(Id)
  };
  useEffect(() => {
    dispatch(GetHomeworkDetails(GetHomeworkDetailBody));
  }, [Id]);

  useEffect(() => {
    console.log(' after View:', HomeworkDetail);
    if (HomeworkDetail && HomeworkDetail.length > 0) {
      setHomeworkId(HomeworkDetail.Id);
      setAttechment(HomeworkDetail[0].AttachmentPath);
      setAssignedDate(HomeworkDetail[0].AssignedDate);
      setCompleteDate(HomeworkDetail[0].CompleteByDate);
      setTitle(HomeworkDetail[0].Title);
      setDetails(HomeworkDetail[0].Details);
    }
  }, [HomeworkDetail]);
  const ClickAttachment = (AttachmentPath) => {
    if (AttachmentPath !== '') {
      window.open(
        localStorage.getItem('SiteURL') +
        '/RITeSchool/DOWNLOADS/Homework/' +
        AttachmentPath
      );
    }
  };



  const ClickAttachments = () => {
    navigate('/RITeSchool/Teacher/HomeworkDocuments/' + encodeURL(Id) +
      '/' +
      encodeURL(TeacherId) +
      '/' +
      encodeURL(TeacherName) +
      '/' +
      encodeURL(ClassName) +
      '/' +
      encodeURL(SubjectName) +
      '/' +
      encodeURL(SubjectId )+
      '/' +
      encodeURL(MySubject) +
      '/' +
      encodeURL(SelectClass)

    );
  };

  // const ClickAttachment = () => {
  //   event.preventDefault();
  //   // Handle click event here
  //   console.log('Link clicked!');
  // };
  return (
    <>
      <Box sx={{ px: 2 }}>
        <CommonPageHeader
          navLinks={[
            {
              title: 'Assign Homework',
              path: '/RITeSchool/Teacher/AssignHomework'
            },
            {
              title: 'Add Homework',
              path: '/RITeSchool/Teacher/AddHomeworkNew/' +
                TeacherId +
                '/' +
                TeacherName +
                '/' +
                ClassName +
                '/' +
                SubjectName +
                '/' +
                SubjectId +
                '/' +
                MySubject +
                '/' +
                SelectClass
            },
            {
              title: 'View Homework',
              path: ''
            }
          ]}
          rightActions={
            <>
              <Box>
                <Tooltip title={`User can view homework details.`}>
                  <IconButton
                    sx={{
                      color: 'white',
                      backgroundColor: grey[500],
                      height: '36px !important',
                      ':hover': { backgroundColor: grey[600] }
                    }}
                  >
                    <QuestionMarkIcon />
                  </IconButton>
                </Tooltip>
              </Box>
            </>
          }
        />
        <Box sx={{ background: 'white', p: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField fullWidth label={'Subject'} InputLabelProps={{ shrink: true }} value={HomeworkDetail.Subject}
                inputProps={{ readOnly: true, }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField fullWidth label={'Title'} InputLabelProps={{ shrink: true }} value={HomeworkDetail.Title} inputProps={{ readOnly: true, }} />
            </Grid>
            {/* <Grid item xs={6}>
              <TextField fullWidth label={'Assigned Date '} InputLabelProps={{ shrink: true }} value={getCalendarDateFormatDate(HomeworkDetail.AssignedDate)} inputProps={{ readOnly: true, }} />


            </Grid> */}
            <Grid item xs={6}>
              <DatepickerLeave
                DateValue={getCalendarDateFormatDate(HomeworkDetail.AssignedDate)}
                onDateChange={''}
                label={'Assigned Date'}
                size={"medium"}
                disabled={true}
              />
            </Grid>
            {/* <Grid item xs={6}>
              <TextField fullWidth label={'Complete Date '} InputLabelProps={{ shrink: true }} value={getCalendarDateFormatDate(HomeworkDetail.CompleteByDate)} inputProps={{ readOnly: true, }} />

            </Grid> */}

            <Grid item xs={6}>
              <DatepickerLeave
                DateValue={getCalendarDateFormatDate(HomeworkDetail.CompleteByDate)}
                onDateChange={''}
                label={'Complete Date '}
                size={"medium"}
                disabled={true}
              />
            </Grid>
            <Grid item xs={6}>
              <Typography   > Attachments:&nbsp;
                {
                  AllHomeworkDocuments.length > 0 ? <a href='#' onClick={() => ClickAttachments()} style={{ textDecoration: 'none' }} > Attachments </a> :
                    <span></span>
                }
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField multiline fullWidth rows={3} label={'Details'} InputLabelProps={{ shrink: true }} InputProps={{
                readOnly: true,
              }} value={HomeworkDetail.Details} />
            </Grid>
          </Grid>
        </Box>

      </Box>
    </>
  );
};

export default ViewHomework;
