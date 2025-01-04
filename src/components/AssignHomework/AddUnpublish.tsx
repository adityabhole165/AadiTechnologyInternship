import { Box, Grid, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import { IPublishUnPublishHomeworkBody } from 'src/interfaces/AssignHomework/IAddUnpublish';
import { ButtonPrimary } from 'src/libraries/styled/ButtonStyle';
import { GetPublishUnpublishHomework } from 'src/requests/AssignHomework/requestAddUnpublish';
import { RootState } from 'src/store';
import { decodeURL } from '../Common/Util';
const AddUnpublish = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [Details, setDetails] = useState('');

  const asSchoolId = Number(localStorage.getItem('localSchoolId'));
  const asAcademicYearId = Number(sessionStorage.getItem('AcademicYearId'));
  const StandardDivisionId = Number(
    sessionStorage.getItem('StandardDivisionId')
  );
  const asUpdatedById = localStorage.getItem('Id');
  const asTeacherId = sessionStorage.getItem('TeacherId');
  let {
    Id
  } = useParams();

  // Decode in-place
  Id = decodeURL(Id);


  const PublishUnpublishHomework = useSelector(
    (state: RootState) => state.HomeworkSubjectList.PublishUnPublishHomework
  );
  //console.log(PublishUnpublishHomework, 'ddddd....');

  const ClickBack = () => {
    navigate('/RITeSchool/Teacher/AddHomework', { state: { fromInternal: true } });
  };
  const Unpublish = () => {
    const newAsIsPublish = !PublishUnpublishHomework;

    const PublishUnPublishHomeworkBody: IPublishUnPublishHomeworkBody = {
      asSchoolId: asSchoolId,
      asAcademicYearId: asAcademicYearId,
      asHomeworkId: Number(Id),
      asReason: Details,
      asUpdatedById: asTeacherId,
      asIsPublish: newAsIsPublish,
      asIsSMSSent: true
    };

    dispatch(GetPublishUnpublishHomework(PublishUnPublishHomeworkBody));
  };

  return (
    <div>
      <br></br>
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

export default AddUnpublish;
