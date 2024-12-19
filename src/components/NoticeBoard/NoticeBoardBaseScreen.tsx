import { Box, IconButton, Tooltip, Alert, Fade, Typography } from '@mui/material';
import React, { useState, useEffect } from 'react';
import CommonPageHeader from '../CommonPageHeader';
import { QuestionMark } from '@mui/icons-material';
import { blue, green, grey } from '@mui/material/colors';
import AddIcon from '@mui/icons-material/Add';
import NoticeList from './NoticeList';
import AddNotePopup from './AddNotePopup';
import SquareIcon from '@mui/icons-material/Square';


interface Note {
    id: number;
    message: string;
    startDate: string;
    endDate: string;
    isDefault?: boolean; 
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
    },
    {
        id: 3,
        message: "Feedback facility is available now! Click on top-right link Feedback to give your opinion about School as well as RITeSchool software.",
        startDate: "2024-01-01",
        endDate: "2024-12-31",
        isDefault: true, // Mark as default notice
      },
  ]);

  const [isPopupOpen, setPopupOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [currentNoticeIndex, setCurrentNoticeIndex] = useState(0);
  const [showBanner, setShowBanner] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setShowBanner(false);
      setTimeout(() => {
        setCurrentNoticeIndex((prevIndex) => 
          prevIndex === notes.length - 1 ? 0 : prevIndex + 1
        );
        setShowBanner(true);
      }, 1000); // Wait for fade out before changing notice
    }, 10000);

    return () => clearInterval(timer);
  }, [notes.length]);

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

      <Fade in={showBanner} style={{marginBottom:'10px', }}>
        <Alert 
        //    severity="info"
          sx={{
            width: '100%',
            color: '#38548A',
            bgcolor: '#F0F0F0',
            '& .MuiAlert-message': {
              width: '100%',
              textAlign: 'center'
            },
            '& .MuiAlert-icon': {
              display: 'none'
            }
          }}
        >
          {notes[currentNoticeIndex].message}
        </Alert>
      </Fade>

      <Box sx={{ background: 'white', p: 2, mb:1 }}>
        <Box sx={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
          <Typography variant="h4" sx={{ mb: 0, lineHeight: 'normal', alignSelf: 'center', paddingBottom: '2px' }}>Legend</Typography>
          <Box sx={{ display: 'flex', gap: '20px' }}>
            <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
              <SquareIcon style={{ color: grey[200], fontSize: 25, position: 'relative', top: '-2px' }} />
              <Typography>Active Notice</Typography>
            </Box>
            <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
              <SquareIcon style={{ color: grey[500], fontSize: 25, position: 'relative', top: '-2px' }} />
              <Typography>Default Notice</Typography>
            </Box>
           
          </Box>
        </Box>
      </Box>

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

