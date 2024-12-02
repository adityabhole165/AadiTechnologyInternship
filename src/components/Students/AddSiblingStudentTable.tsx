import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import {
  Box,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from "@mui/material";
import { red } from "@mui/material/colors";


const AddSiblingStudentTable = ({ itemList = [] }) => {
  // Delete Handler
  const handleDelete = (StudentSiblingId: string) => {
    alert(`Delete action for Reg No: ${StudentSiblingId}`);
  };

  return (
    <Box>
      {itemList.length === 0 ? (
        <Paper sx={{ padding: 2, textAlign: 'center' }}>
          <Typography variant="h6" color="textSecondary">
            No records found.
          </Typography>
        </Paper>
      ) : (
        <TableContainer component={Paper}>
          <Table aria-label="simple table"
            sx={{
              border: (theme) => `1px solid ${theme.palette.grey[300]}`,
            }}>
            <TableHead>
              <TableRow sx={{
                background: (theme) => theme.palette.secondary.main,
                color: (theme) => theme.palette.common.white,
              }}>
                <TableCell sx={{ color: "white", py: 1.5 }}><b>Reg. No.</b></TableCell>
                <TableCell sx={{ color: "white", py: 1.5 }}><b>Student Name</b></TableCell>
                <TableCell sx={{ color: "white", py: 1.5 }}><b>Class</b></TableCell>
                <TableCell sx={{ color: "white", py: 1.5, textAlign: 'center' }}><b>Delete</b></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {itemList.map((row) => (
                <TableRow key={row.StudentSiblingId}>
                  <TableCell sx={{ py: 0.5 }}>{row.RegNo}</TableCell>
                  <TableCell sx={{ py: 0.5 }}>{row.StudentName}</TableCell>
                  <TableCell sx={{ py: 0.5 }}>{row.Standard_Name}</TableCell>
                  <TableCell sx={{ py: 0.5, textAlign: "center" }}>
                    <IconButton
                      sx={{
                        color: '#38548A	',
                        //  backgroundColor: grey[500],
                        '&:hover': {
                          color: 'red',
                          backgroundColor: red[100]
                        }
                      }}
                      onClick={() => handleDelete(row.StudentSiblingId)}
                    >
                      <DeleteForeverIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};

export default AddSiblingStudentTable;
