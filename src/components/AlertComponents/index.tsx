import CheckCircleTwoTone from '@mui/icons-material/CheckCircleTwoTone';
import ErrorTwoToneIcon from '@mui/icons-material/ErrorTwoTone';
import InfoTwoToneIcon from '@mui/icons-material/InfoTwoTone';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Typography
} from '@mui/material';

export type AlertProps = {
  variant: 'success' | 'error' | 'warning' | 'info';
  title?: string;
  message: string;
  confirmButtonText?: string;
  cancelButtonText?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
};

const AlertDialog = ({
  variant,
  title,
  message,
  confirmButtonText,
  cancelButtonText,
  onConfirm,
  onCancel
}: AlertProps) => {
  return (
    <Dialog open={true} fullWidth maxWidth={'sm'}>
      <DialogTitle
        sx={{
          backgroundColor: (theme) => theme.palette[variant].main,
          py: 1
        }}
      ></DialogTitle>
      <DialogContent dividers sx={{ px: 4 }}>
        <Grid container spacing={2}>
          <Grid item xs={2}>
            <Box>
              {variant === 'error' && (
                <ErrorTwoToneIcon
                  sx={{
                    fontSize: '68px',
                    color: (theme) => theme.palette.error.main
                  }}
                />
              )}
              {variant === 'warning' && (
                <ErrorTwoToneIcon
                  sx={{
                    fontSize: '68px',
                    color: (theme) => theme.palette.warning.main
                  }}
                />
              )}
              {variant === 'info' && (
                <InfoTwoToneIcon
                  sx={{
                    fontSize: '68px',
                    color: (theme) => theme.palette.info.main
                  }}
                />
              )}
              {variant === 'success' && (
                <CheckCircleTwoTone
                  sx={{
                    fontSize: '68px',
                    color: (theme) => theme.palette.success.main
                  }}
                />
              )}
            </Box>
          </Grid>
          <Grid item xs={10}>
            <Typography variant={'h3'} fontWeight={'normal'}>
              {title}
            </Typography>
            <Typography variant={'body2'}>{message}</Typography>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions sx={{ py: 2, px: 3 }}>
        <Button onClick={onCancel} color={'error'}>
          {cancelButtonText || 'Cancel'}
        </Button>
        <Button onClick={onConfirm} variant={'contained'}>
          {confirmButtonText || 'Confirm'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AlertDialog;
