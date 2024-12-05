import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Box,
  Button,
  Typography,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  DialogActions
} from '@mui/material';
import { ClearIcon } from '@mui/x-date-pickers';
import { green } from '@mui/material/colors';

interface GradeConfigurationPopupProps {
  open: boolean;
  onClose: () => void;
}

const GradeConfigurationPopup: React.FC<GradeConfigurationPopupProps> = ({
  open,
  onClose
}) => {
  const subjectsData = [
    { percentage: '91 - 100', grade: 'A1', remarks: 'Outstanding' },
    { percentage: '81 - 90', grade: 'A2', remarks: 'Excellent' },
    { percentage: '71 - 80', grade: 'B1', remarks: 'Very Good' },
    { percentage: '61 - 70', grade: 'B2', remarks: 'Good' },
    { percentage: '51 - 60', grade: 'C1', remarks: 'Above Average' },
    { percentage: '40 - 50', grade: 'C2', remarks: 'Average' },
    { percentage: '0 - 39', grade: 'D', remarks: 'Below Average' }
  ];

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{ sx: { borderRadius: '15px' } }}
    >
      <DialogTitle sx={{ bgcolor: '#223354' }}>
        <ClearIcon
          onClick={onClose}
          sx={{
            color: 'white',
            borderRadius: '7px',
            position: 'absolute',
            top: '5px',
            right: '8px',
            cursor: 'pointer',
            '&:hover': {
              color: 'red'
            }
          }}
        />
      </DialogTitle>
      <DialogContent>
        <Typography variant="h3" sx={{ pt: 2, mb: 2 }}>
          Grade Configuration Details
        </Typography>

        <Box>
          <Typography variant="h5">Subjects</Typography>
          <Table
            aria-label="simple table"
            sx={{
              border: (theme) => `1px solid ${theme.palette.grey[300]}`
            }}
          >
            <TableHead>
              <TableRow
                sx={{
                  background: (theme) => theme.palette.secondary.main,
                  color: (theme) => theme.palette.common.white
                }}
              >
                <TableCell sx={{ color: 'white', py: 1.5 }}>
                  Percentage
                </TableCell>
                <TableCell sx={{ color: 'white', py: 1.5 }}>
                  Grade Name
                </TableCell>
                <TableCell sx={{ color: 'white', py: 1.5 }}>Remarks</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {subjectsData.map((row, index) => (
                <TableRow key={index}>
                  <TableCell sx={{ py: 1 }}>{row.percentage}</TableCell>
                  <TableCell sx={{ py: 1 }}>{row.grade}</TableCell>
                  <TableCell sx={{ py: 1 }}>{row.remarks}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <Typography variant="h5" mt={3}>
            Co-Curricular Subjects
          </Typography>
          <Table
            aria-label="simple table"
            sx={{
              border: (theme) => `1px solid ${theme.palette.grey[300]}`
            }}
          >
            <TableHead>
              <TableRow
                sx={{
                  background: (theme) => theme.palette.secondary.main,
                  color: (theme) => theme.palette.common.white
                }}
              >
                <TableCell sx={{ color: 'white', py: 1.5 }}>
                  Percentage
                </TableCell>
                <TableCell sx={{ color: 'white', py: 1.5 }}>
                  Grade Name
                </TableCell>
                <TableCell sx={{ color: 'white', py: 1.5 }}>Remarks</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {subjectsData.map((row, index) => (
                <TableRow key={index}>
                  <TableCell sx={{ py: 1 }}>{row.percentage}</TableCell>
                  <TableCell sx={{ py: 1 }}>{row.grade}</TableCell>
                  <TableCell sx={{ py: 1 }}>{row.remarks}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
        <DialogActions sx={{ py: 2, px: 2 }}>
              <Button color={'error'} onClick={onClose}>
                Cancel
              </Button>
              <Button
                // onClick={() => { clickConfirm() }}
                sx={{
                  color: 'green',
                  '&:hover': {
                    color: 'green',
                    backgroundColor: green[100]
                  }
                }}
              >
                Confirm
              </Button>
            </DialogActions>
      </DialogContent>
    </Dialog>
  );
};

export default GradeConfigurationPopup;
