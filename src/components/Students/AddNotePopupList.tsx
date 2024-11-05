// ExampleTable.tsx
import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Button
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { red } from '@mui/material/colors';

// Define the type for table row data
interface TableData {
  className: string;
  date: string;
  description: string;
}

// Define props for the component
interface ExampleTableProps {
  data: TableData[];
  onEdit: (rowIndex: number) => void;
  onDelete: (rowIndex: number) => void;
}

const AddNotePopupList: React.FC<ExampleTableProps> = ({
  data,
  onEdit,
  onDelete
}) => {
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
                <TableCell sx={{ py: 1 }}>{row.className}</TableCell>
                <TableCell sx={{ py: 1 }}>{row.date}</TableCell>
                <TableCell sx={{ py: 1 }}>{row.description}</TableCell>
                <TableCell sx={{ py: 1 }}></TableCell>
                <TableCell sx={{ py: 1 }}>
                  <IconButton color="primary" onClick={() => onEdit(index)}>
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
                    onClick={() => onDelete(index)}
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
