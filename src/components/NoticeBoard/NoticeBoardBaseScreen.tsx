import { Box, IconButton, Tooltip } from '@mui/material';
import React, { useState } from 'react';
import CommonPageHeader from '../CommonPageHeader';
import { QuestionMark } from '@mui/icons-material';
import { blue, grey } from '@mui/material/colors';
import AddIcon from '@mui/icons-material/Add';
import NoticeList from './NoticeList';
import AddNotePopup from './AddNotePopup';

interface Note {
    id: number;
    message: string;
    startDate: string;
    endDate: string;
  }
const NoticeBoardBaseScreen = () => {
  const [notes, setNotes] = useState<Note[]>([
    {
      id: 1,
      message: 'test notice 13',
      startDate: '16 Dec 2024',
      endDate: '18 Dec 2024'
    },
    {
      id: 2,
      message: 'Feedback facility is available now!',
      startDate: '01 Apr 2024',
      endDate: '31 Mar 2025'
    }
  ]);

  const [isPopupOpen, setPopupOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);

  // Open popup for new note
  const handleAdd = () => {
    setEditMode(false);
    setSelectedNote(null);
    setPopupOpen(true);
  };

  // Open popup for editing a note
  const handleEdit = (note: Note) => {
    setEditMode(true);
    setSelectedNote(note);
    setPopupOpen(true);
  };

  // Handle saving a new or updated note
  const handleSave = (note: Note) => {
    if (editMode) {
      setNotes((prevNotes) =>
        prevNotes.map((n) => (n.id === note.id ? note : n))
      );
    } else {
      setNotes([...notes, { ...note, id: Date.now() }]);
    }
    setPopupOpen(false);
  };

  // Delete a note
  const handleDelete = (id: number) => {
    setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
  };
  return (
    <Box px={2}>
      <CommonPageHeader
        navLinks={[
          {
            title: 'Notice Board',
            path: '/extended-sidebar/Teacher/NoticeBoardBaseScreen'
          }
        ]}
        rightActions={
          <>
            <Tooltip title="Add/Edit/Delete notice board messages. Click on Add button to add new message.Click on Edit/Delete button to modify/delete message.">
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
            <Tooltip title="Add">
              <IconButton
                onClick={handleAdd}
                sx={{
                  color: 'white',
                  backgroundColor: blue[500],
                  '&:hover': {
                    backgroundColor: blue[600]
                  }
                }}
              >
                <AddIcon />
              </IconButton>
            </Tooltip>
          </>
        }
      />

      <Box sx={{ backgroundColor: (theme) => theme.palette.common.white, p:2}}>
        <NoticeList notes={notes} onEdit={handleEdit} onDelete={handleDelete} />
        </Box>
            <Box>
        {/* Popup */}
        {isPopupOpen && (
          <AddNotePopup
            open={isPopupOpen}
            onClose={() => setPopupOpen(false)}
            onSave={handleSave}
            note={selectedNote}
            editMode={editMode}
          />
        )}
      </Box>
    </Box>
  );
};

export default NoticeBoardBaseScreen;
