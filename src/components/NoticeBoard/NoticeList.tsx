import React from "react";
import { Table, TableBody, TableCell, TableHead, TableRow, IconButton, TableContainer, Paper } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { red } from "@mui/material/colors";

interface Note {
  id: number;
  message: string;
  startDate: string;
  endDate: string;
}

interface NoticeListProps {
  notes: Note[];
  onEdit: (note: Note) => void;
  onDelete: (id: number) => void;
}

const NoticeList: React.FC<NoticeListProps> = ({ notes, onEdit, onDelete }) => {
  return (
    <TableContainer component={Paper}>
    <Table aria-label="simple table" sx={{ border: (theme) => `1px solid ${theme.palette.grey[300]}` }}>
      <TableHead>
        <TableRow sx={{ background: (theme) => theme.palette.secondary.main, color: (theme) => theme.palette.common.white }}>
          <TableCell  sx={{ textTransform: 'capitalize', color: 'white', py: 1.5, }}> <strong>Message</strong> </TableCell>
          <TableCell  sx={{ textTransform: 'capitalize', color: 'white', py: 1.5, }}> <strong> Start Date</strong></TableCell>
          <TableCell  sx={{ textTransform: 'capitalize', color: 'white', py: 1.5, }}> <strong>End Date</strong> </TableCell>
          <TableCell  sx={{ textTransform: 'capitalize', color: 'white', py: 1.5, textAlign: 'center'}}> <strong>Edit</strong> </TableCell>
          <TableCell  sx={{ textTransform: 'capitalize', color: 'white', py: 1.5, textAlign: 'center'}}> <strong>Delete</strong> </TableCell>
        </TableRow> 
      </TableHead>
      <TableBody>
        {notes.map((note) => (
          <TableRow key={note.id}>
            <TableCell sx={{ textTransform: 'capitalize', py: 0.5,  }}>{note.message}</TableCell>
            <TableCell sx={{ textTransform: 'capitalize', py: 0.5,  }}>{note.startDate}</TableCell>
            <TableCell sx={{ textTransform: 'capitalize', py: 0.5,  }}>{note.endDate}</TableCell>
            <TableCell  sx={{ textTransform: 'capitalize', py: 0.5, textAlign: 'center', }}>
              <IconButton onClick={() => onEdit(note)} color="primary">
                <EditIcon />
              </IconButton>
            </TableCell>
            <TableCell  sx={{ textTransform: 'capitalize', py: 0.5, textAlign: 'center', }}>
              <IconButton onClick={() => onDelete(note.id)} 
                sx={{
                    color:'#38548A	',
                     //  backgroundColor: grey[500],
                      '&:hover': {
                    color:'red',
                     backgroundColor: red[100]
                      }}}>
                <DeleteForeverIcon />
              </IconButton>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
    </TableContainer>
  );
};

export default NoticeList;
