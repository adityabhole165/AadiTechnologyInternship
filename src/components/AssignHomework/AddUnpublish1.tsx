import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import { IPublishUnPublishHomeworkBody } from 'src/interfaces/AssignHomework/IAddHomework';
import { GetPublishUnpublishHomework } from 'src/requests/AssignHomework/requestAddHomework';
import { RootState } from 'src/store';
import { decodeURL } from '../Common/Util';

const AddUnpublish1 = ({ open, setOpen, ClickCloseDialogbox, clickPublishUnpublish }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let {
    Id
  } = useParams();

  // Decode in-place
  Id = decodeURL(Id);

  const [Details, setDetails] = useState('');
  const [IsUnPublish, setIsUnpublish] = useState('');
  const asSchoolId = Number(localStorage.getItem('localSchoolId'));
  const asAcademicYearId = Number(sessionStorage.getItem('AcademicYearId'));
  const StandardDivisionId = Number(
    sessionStorage.getItem('StandardDivisionId')
  );
  const asUpdatedById = localStorage.getItem('Id');
  const asTeacherId = sessionStorage.getItem('TeacherId');
  const SiteURL = localStorage.getItem('SiteURL');
  const AllPublishUnPublishHomework = useSelector(
    (state: RootState) => state.AddHomework.PublishUnPublishHomework
  );
  //console.log(AllPublishUnPublishHomework, 'AllPublishUnPublishHomework....');

  // const AllPublishUnpublishAddHomeworkBody: IAllPublishUnpublishAddHomeworkBody =
  //   {
  //     asSchoolId: asSchoolId.toString(),
  //     asAcademicYearId: asAcademicYearId.toString(),
  //     asHomeWorkLogId: '2717',
  //     asUnpublishReason: "Yesss'",
  //     asUpdatedById: '4463',
  //     IsPublished: 0,
  //     IsSMSSent: 1
  //   };
  // useEffect(() => {
  //   dispatch(PublishUnpublishAllHomework(AllPublishUnpublishAddHomeworkBody));
  // }, []);

  const Unpublish = () => {
    const newAsIsPublish = !AllPublishUnPublishHomework;

    const AllPublishUnpublishAddHomeworkBody: IPublishUnPublishHomeworkBody = {
      asSchoolId: asSchoolId,
      asAcademicYearId: asAcademicYearId,
      asHomeworkId: Number(Id),
      asReason: Details,
      asUpdatedById: asTeacherId,
      asIsPublish: newAsIsPublish,
      asIsSMSSent: false
    };

    dispatch(GetPublishUnpublishHomework(AllPublishUnpublishAddHomeworkBody));
  };
  const ClickBack = () => {
    navigate('/RITeSchool/Teacher/AddHomework', { state: { fromInternal: true } });
  };
  const ClickOk = () => {
    if (Details != '') clickPublishUnpublish(0);
  };

  return (
    <Dialog
      open={open}
      onClose={() => {
        setOpen(false);
      }}
      fullWidth
      maxWidth={'sm'}
    >
      <DialogTitle
        sx={{
          backgroundColor: (theme) => theme.palette.error.main,
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
  );
};

export default AddUnpublish1;
