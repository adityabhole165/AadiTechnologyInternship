import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, TextField, Tooltip } from '@mui/material';
import { grey } from '@mui/material/colors';
import { ClearIcon } from '@mui/x-date-pickers';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import { ResizableTextField } from '../AddSchoolNitice/ResizableDescriptionBox';
import { decodeURL } from '../Common/Util';
const FinalResultUnpublish = ({ open, setOpen, ExamName, TeacherName, ClickCloseDialogBox, onClickUnpublish }) => {
  const dispatch = useDispatch();
  let {
    Id
  } = useParams();

  // Decode in-place
  Id = decodeURL(Id);

  const navigate = useNavigate();

  const [Reason, setReason] = useState('');
  const [ReasonError, setReasonError] = useState('');

  const asSchoolId = Number(localStorage.getItem('localSchoolId'));
  const asAcademicYearId = Number(sessionStorage.getItem('AcademicYearId'));




  const ResetForm = () => {
    setReason('');
  };


  // const ClickOk = () => {
  //   if (Reason !== '') clickPublishUnpublish(false, Reason);
  //   setOpen(false);
  // };
  const ClickOk = () => {
    if (Reason === '') {
      setReasonError("Reason for unpublish should not be blank.");
    } else {
      setReasonError('');
      onClickUnpublish(false, Reason);
      setOpen(false);
    }
  };

  return (
    <>

      <Dialog
        open={open}
        maxWidth={'sm'}
        fullWidth
        onClose={() => {
          setOpen(false);
        }}
        PaperProps={{
          sx: {
            borderRadius: "15px",
          }
        }}
      >
        <DialogTitle
          sx={{
            bgcolor: '#223354',
            // backgroundColor: (theme) => theme.colors.primary.main,
            color: (theme) => theme.palette.common.white
          }}
        >
          <ClearIcon onClick={() => {
            setOpen(false)
          }}
            sx={{
              color: 'white',
              // background:'white',
              borderRadius: '7px',
              position: 'absolute',
              top: '5px',
              right: '7px',
              cursor: 'pointer',
              '&:hover': {
                color: 'red',
                //  backgroundColor: red[100]

              }
            }} />
          <Tooltip title={'Enter the reason for exam unpublish.'}>

            <QuestionMarkIcon
              sx={{
                color: 'white',
                // background:'white',
                borderRadius: '7px',
                position: 'absolute',
                top: '4px',
                right: '35px',
                cursor: 'pointer',
                '&:hover': { backgroundColor: grey[600] }
              }} />
          </Tooltip>




        </DialogTitle>
        <DialogContent >
          <Box sx={{ maxHeight: '300px', overflowY: 'auto', position: 'relative', background: 'white' }}>
            <h2>
              Enter reason for unpublish
            </h2>


            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} sm={6} >
                <Tooltip title={ExamName || 'No Exam Name Available'}>
                  <TextField
                    sx={{ width: '100%', bgcolor: '#F0F0F0' }}
                    label={'Exam'}
                    size={"medium"}
                    value={ExamName} />
                </Tooltip>
              </Grid>


              <Grid item xs={12} sm={6}>
                <Tooltip title={TeacherName || 'No Teacher Name Available'}>
                  <TextField
                    sx={{ width: '100%', bgcolor: '#F0F0F0' }}
                    label={'Class Teacher'}
                    size={"medium"}
                    value={TeacherName} />
                </Tooltip>
              </Grid>


              <Grid item xs={12} marginTop={1}>
                <ResizableTextField
                  multiline
                  label={<>
                    Reason for Unpublish  <span style={{ color: 'red' }}>*</span>
                  </>}
                  // rows={5}
                  value={Reason}
                  onChange={(e) => {
                    setReason(e.target.value);
                  }}
                  sx={{ width: '100%' }}
                  error={ReasonError !== ''}
                  helperText={ReasonError}
                />
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions sx={{ py: 2, px: 3 }}>
          <Button
            color={'error'}
            onClick={() => {
              setOpen(false)
            }}
          >
            Close
          </Button>
          <Button

            onClick={() => { ClickOk() }}
            color={'error'}
          >
            Unpublish
          </Button>
        </DialogActions>
      </Dialog>


    </>
  );
};

export default FinalResultUnpublish;