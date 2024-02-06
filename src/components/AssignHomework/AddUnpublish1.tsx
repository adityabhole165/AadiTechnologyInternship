import { Box, Grid, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import { IAllPublishUnpublishAddHomeworkBody } from 'src/interfaces/AssignHomework/IAddHomework';
import { ButtonPrimary } from 'src/libraries/styled/ButtonStyle';
import { PublishUnpublishAllHomework } from 'src/requests/AssignHomework/requestAddHomework';
import { RootState } from 'src/store';

const AddUnpublish1 = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { Id } = useParams();
  const [Details, setDetails] = useState('');
  const asSchoolId = Number(localStorage.getItem('localSchoolId'));
  const asAcademicYearId = Number(sessionStorage.getItem('AcademicYearId'));
  const StandardDivisionId = Number(
    sessionStorage.getItem('StandardDivisionId')
  );
  const asUpdatedById = localStorage.getItem('Id');
  const asTeacherId = sessionStorage.getItem('TeacherId');
  const SiteURL = localStorage.getItem('SiteURL');
  const AllPublishUnPublishHomework = useSelector(
    (state: RootState) => state.AddHomework.AllPublishUnpublishHomeworkT
  );
  console.log(AllPublishUnPublishHomework, 'AllPublishUnPublishHomework....');

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

    const AllPublishUnpublishAddHomeworkBody: IAllPublishUnpublishAddHomeworkBody =
      {
        asSchoolId: asSchoolId.toString(),
        asAcademicYearId: asAcademicYearId.toString(),
        asHomeWorkLogId: Id,
        asUnpublishReason: "Yesss'",
        asUpdatedById: asTeacherId,
        IsPublished: Number(newAsIsPublish),
        IsSMSSent: 1
      };

    dispatch(PublishUnpublishAllHomework(AllPublishUnpublishAddHomeworkBody));
  };
  const ClickBack = () => {
    navigate('/extended-sidebar/Teacher/AddHomework');
  };

  return (
    <div>
      <br></br>
      <br></br>
      <Grid container spacing={2} mt={0.5}>
        <Grid item xs={6}>
          <Typography fontSize={'10px'}>
            {' '}
            <h4>Unpublish Reason :</h4>{' '}
          </Typography>
        </Grid>

        <Grid item xs={6}>
          <TextField
            sx={{ width: '60%', margin: '2px 0', border: '1px solid #000' }}
            multiline
            rows={2}
            value={Details}
            onChange={(e) => {
              setDetails(e.target.value);
            }}
            variant="standard"
            // error={ErrorDetails !== ''}
            // helperText={ErrorDetails}
            // label={''}
          />
        </Grid>
      </Grid>
      <Grid item xs={6}>
        <Box sx={{ textAlign: 'center' }} m={2}>
          <ButtonPrimary
            style={{ backgroundColor: '#ef5350' }}
            onClick={ClickBack}
          >
            CLOSE
          </ButtonPrimary>
        </Box>
      </Grid>
      <Grid item xs={6}>
        <Box sx={{ textAlign: 'center' }} m={2}>
          <ButtonPrimary
            style={{ backgroundColor: 'green' }}
            onClick={Unpublish}
          >
            OK
          </ButtonPrimary>
        </Box>
      </Grid>
    </div>
  );
};

export default AddUnpublish1;
