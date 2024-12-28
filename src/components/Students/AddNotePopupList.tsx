// ExampleTable.tsx
import { Visibility } from '@mui/icons-material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import {
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip
} from '@mui/material';
import { red } from '@mui/material/colors';
import { useEffect } from 'react';


const AddNotePopupList = ({ data, clickView, onEdit, onDelete }) => {
  useEffect(() => {
    //console.log('AddNotePopupList', data);
  }, [data]);
  return (
    <div>
      <TableContainer>
        <Table
          aria-label="simple table"
          sx={{
            border: (theme) => `1px solid ${theme.palette.grey[300]}`,
            overflow: 'hidden'
          }}
        >
          <TableHead>
            <TableRow
              sx={{
                background: (theme) => theme.palette.secondary.main,
                color: (theme) => theme.palette.common.white
              }}
            >
              <TableCell sx={{ color: 'white' }}>Class</TableCell>
              <TableCell sx={{ color: 'white' }}>Date</TableCell>
              <TableCell sx={{ color: 'white' }}>Description</TableCell>
              <TableCell sx={{ color: 'white' }}>Attachment</TableCell>
              <TableCell sx={{ color: 'white' }}>Edit</TableCell>
              <TableCell sx={{ color: 'white' }}>Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, index) => (
              <TableRow key={index}>
                <TableCell sx={{ py: 1 }}>{row.Text1}</TableCell>
                <TableCell sx={{ py: 1 }}>{row.Text2}</TableCell>
                <TableCell sx={{ py: 1 }}>{row.Text3}</TableCell>
                {/* <TableCell sx={{ py: 1 }}>{row.Text4}</TableCell> */}
                <TableCell sx={{ pr: 8, textTransform: 'capitalize', paddingTop: '2.5px', paddingBottom: '2.5px' }} align='center' >
                  <Tooltip title={"View"}>
                    <Visibility onClick={() => clickView(row.Text4)}
                      sx={{
                        color: '#223354',
                        '&:hover': {
                          color: '#223354',
                          bgcolor: 'grey.300',
                          cursor: 'pointer'
                        }
                      }} />
                  </Tooltip>
                </TableCell>
                <TableCell sx={{ py: 1 }}>
                  <IconButton color="primary"
                    onClick={() => onEdit(row.Id)}>
                    <EditIcon />
                  </IconButton>
                </TableCell>
                <TableCell sx={{ py: 1 }}>
                  <IconButton
                    sx={{
                      color: '#38548A	',
                      //  backgroundColor: grey[500],
                      '&:hover': {
                        color: 'red',
                        backgroundColor: red[100]
                      }
                    }}
                    onClick={() => onDelete(row.Id)}
                  >
                    <DeleteForeverIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default AddNotePopupList;
