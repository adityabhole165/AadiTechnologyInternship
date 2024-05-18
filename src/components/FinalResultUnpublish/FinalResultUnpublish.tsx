import QuestionMark from '@mui/icons-material/QuestionMark';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, IconButton, TextField, Tooltip, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';
import { useState } from 'react';

const FinalResultUnpublish = ({ open, setOpen, ExamName, TeacherName, ClickCloseDialogBox, onClickUnpublish }) => {
  const [Reason, setReason] = useState('');

  const ClickOk = () => {
    if (Reason !== '') onClickUnpublish(false, Reason);
    setOpen(false);
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
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          p: 1
        }}
      >
        <Tooltip title={"Enter the reason for exam unpublish"}>
          <IconButton
            sx={{
              color: 'white',
              backgroundColor: grey[500],
              '&:hover': {
                backgroundColor: grey[600]
              }
            }}
          >
            <QuestionMark />
          </IconButton>
        </Tooltip>
      </Box>
      <DialogTitle
        sx={{
          backgroundColor: (theme) => theme.palette.error.main,
          py: 1
        }}
      >
        <Typography variant="h6">
          Enter reason for Unpublish
        </Typography>

      </DialogTitle>


      <DialogContent dividers sx={{ px: 4 }}>
        <Typography variant={"h4"} sx={{ mb: 1 }}>
          Exam :
        </Typography>
        <Grid container spacing={1} alignItems="center">

          <Grid item xs={2}>
            <TextField
              sx={{ minWidth: '400px' }}
              label={'Exam'}
              size={"small"}
              value={ExamName} />
          </Grid>
        </Grid>
        <br></br>
        <Typography variant={"h4"} sx={{ mb: 1 }}>
          Class Teacher Name :
        </Typography>
        <Grid container spacing={1} alignItems="center">
          <Grid item >
            <TextField
              sx={{ minWidth: '400px' }}
              label={'Class Teacher Name'}
              size={"small"}
              value={TeacherName} />
          </Grid>
        </Grid>
        <br></br>
        <Typography variant={"h4"} sx={{ mb: 1 }}>
          Unpublish Reason
        </Typography>
        <TextField
          multiline
          rows={3}
          value={Reason}
          onChange={(e) => {
            setReason(e.target.value);
          }}
          sx={{ width: '100%' }}
        />
      </DialogContent>
      <DialogActions sx={{ py: 2, px: 3 }}>
        <Button onClick={() => { ClickOk() }} variant={'contained'}>
          Unpublish
        </Button>
        <Button onClick={() => {
          setOpen(false)
        }} color={'error'}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default FinalResultUnpublish;