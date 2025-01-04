import CheckIcon from '@mui/icons-material/Check';
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
import { green } from '@mui/material/colors';
import { ClearIcon } from '@mui/x-date-pickers';
import { useState } from 'react';

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
  const [open, setOpen] = useState(true);

  const handleClose = () => {
    setOpen(false);
    if (onCancel) {
      onCancel();
    }
  }
  return (
    <Dialog open={true} fullWidth maxWidth={'sm'} PaperProps={{
      sx: {
        borderRadius: "15px",
      }
    }} >
      <DialogTitle
        sx={{
          backgroundColor: '#23527C',
          py: 1.5
        }}
      >
        <ClearIcon onClick={handleClose}
          sx={{
            color: 'white',
            // background:'white',
            borderRadius: '7px',
            position: 'absolute',
            top: '2px',
            right: '8px',
            cursor: 'pointer',
            '&:hover': {
              color: 'red',
              //  backgroundColor: red[100]

            }
          }} />
      </DialogTitle>
      <DialogContent dividers sx={{ px: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={2}>
            <Box>
              {variant === 'error' && (
                <ErrorTwoToneIcon
                  sx={{
                    fontSize: 'clamp(35px, 10vw, 68px)',
                    color: (theme) => theme.palette.error.main
                  }}
                />
              )}
              {variant === 'warning' && (
                <CheckIcon
                  sx={{
                    fontSize: 'clamp(35px, 10vw, 68px)',
                    color: (theme) => theme.palette.success.main
                  }}
                />
              )}
              {variant === 'info' && (
                <InfoTwoToneIcon
                  sx={{
                    fontSize: 'clamp(35px, 10vw, 68px)',
                    color: (theme) => theme.palette.info.main
                  }}
                />
              )}
              {variant === 'success' && (
                <CheckCircleTwoTone
                  sx={{
                    fontSize: 'clamp(35px, 7vw, 68px)',
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
            <Typography variant={'body2'} dangerouslySetInnerHTML={{ __html: message }} />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions sx={{ py: 2, px: 3 }}>
        <Button onClick={onCancel} color={'error'}>
          {cancelButtonText || 'Cancel'}
        </Button>
        <Button onClick={onConfirm}
          //  variant={'contained'} 
          sx={{
            // backgroundColor: green[100],
            color: 'green',
            ':hover': { backgroundColor: green[100] }
          }}>
          {confirmButtonText || 'Confirm'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AlertDialog;



// import CheckCircleTwoTone from '@mui/icons-material/CheckCircleTwoTone';
// import ErrorTwoToneIcon from '@mui/icons-material/ErrorTwoTone';
// import InfoTwoToneIcon from '@mui/icons-material/InfoTwoTone';
// import {
//   Box,
//   Button,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogTitle,
//   Grid,
//   Typography
// } from '@mui/material';
// import { green } from '@mui/material/colors';
// import CheckIcon from '@mui/icons-material/Check';
// import { ClearIcon } from '@mui/x-date-pickers';

// export type AlertProps = {
//   variant: 'success' | 'error' | 'warning' | 'info';
//   title?: string;
//   message: string;
//   confirmButtonText?: string;
//   cancelButtonText?: string;
//   onConfirm?: () => void;
//   onCancel?: () => void;
// };

// const AlertDialog = ({
//   variant,
//   title,
//   message,
//   confirmButtonText,
//   cancelButtonText,
//   onConfirm,
//   onCancel
// }: AlertProps) => {
//   return (
//     <Dialog open={true} fullWidth maxWidth={'sm'}   PaperProps={{
//       sx: {
//         borderRadius: "15px",
//       }
//     }} >
//       <DialogTitle
//         sx={{
//           backgroundColor: '#23527C',
//           py: 1.5
//         }}
//       >
//         {/* <ClearIcon
//         sx={{color: 'white',
//         // background:'white',
//         borderRadius: '7px',
//         position: 'absolute',
//         top: '2px',
//         right: '8px',
//         cursor: 'pointer',
//         '&:hover': {
//           color: 'red',
//           //  backgroundColor: red[100]

//         }
//       }} /> */}
//       </DialogTitle>
//       <DialogContent dividers sx={{ px: 4 }}>
//         <Grid container spacing={2}>
//           <Grid item xs={2}>
//             <Box>
//               {variant === 'error' && (
//                 <ErrorTwoToneIcon
//                   sx={{
//                     fontSize: '68px',
//                     color: (theme) => theme.palette.error.main
//                   }}
//                 />
//               )}
//               {variant === 'warning' && (
//                 <CheckIcon
//                   sx={{
//                     fontSize: '68px',
//                     color: (theme) => theme.palette.success.main
//                   }}
//                 />
//               )}
//               {variant === 'info' && (
//                 <InfoTwoToneIcon
//                   sx={{
//                     fontSize: '68px',
//                     color: (theme) => theme.palette.info.main
//                   }}
//                 />
//               )}
//               {variant === 'success' && (
//                 <CheckCircleTwoTone
//                   sx={{
//                     fontSize: '68px',
//                     color: (theme) => theme.palette.success.main
//                   }}
//                 />
//               )}
//             </Box>
//           </Grid>
//           <Grid item xs={10}>
//             <Typography variant={'h3'} fontWeight={'normal'}>
//               {title}
//             </Typography>
//             <Typography variant={'body2'}>{message}</Typography>
//           </Grid>
//         </Grid>
//       </DialogContent>
//       <DialogActions sx={{ py: 2, px: 3 }}>
//         <Button onClick={onCancel} color={'error'}>
//           {cancelButtonText || 'Cancel'}
//         </Button>
//         <Button onClick={onConfirm}
//         //  variant={'contained'}
//         sx={{
//           // backgroundColor: green[100],
//           color: 'green',
//           ':hover': { backgroundColor: green[100] }
//         }}>
//           {confirmButtonText || 'Confirm'}
//         </Button>
//       </DialogActions>
//     </Dialog>
//   );
// };

// export default AlertDialog;
