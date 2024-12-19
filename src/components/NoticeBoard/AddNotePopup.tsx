import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Typography,
  Grid,
  Box
} from '@mui/material';
import { ClearIcon } from '@mui/x-date-pickers';
import Datepicker1 from 'src/libraries/DateSelector/Datepicker1';

interface Note {
  id?: number;
  message: string;
  startDate: string;
  endDate: string;
}

interface AddNotePopupProps {
  open: boolean;
  onClose: () => void;
  onSave: (note: Note) => void;
  note: Note | null;
  editMode: boolean;
}

const AddNotePopup: React.FC<AddNotePopupProps> = ({
  open,
  onClose,
  onSave,
  note,
  editMode
}) => {
  const [form, setForm] = useState<
    Note & { applicableTo: { [key: string]: boolean } }
  >({
    message: '',
    startDate: '',
    endDate: '',
    applicableTo: {
      admin: true,
      teacher: true,
      student: true,
      adminStaff: true,
      otherStaff: true
    }
  });

  const [roles, setRoles] = useState({
    admin: false,
    teacher: false,
    student: false,
    adminStaff: false,
    otherStaff: false,
    selectAll: false
  });

  useEffect(() => {
    if (note) {
      setForm({ ...note, applicableTo: form.applicableTo });
    }
  }, [note]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    const { applicableTo, ...noteData } = form;
    onSave(noteData);
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setRoles((prevRoles) => ({
      ...prevRoles,
      [name]: checked,
      selectAll: name === 'selectAll' ? checked : prevRoles.selectAll
    }));

    if (name === 'selectAll') {
      setRoles((prevRoles) => ({
        admin: checked,
        teacher: checked,
        student: checked,
        adminStaff: checked,
        otherStaff: checked,
        selectAll: checked
      }));
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{ sx: { borderRadius: '15px' } }}
    >
      {/* Title */}
      <DialogTitle sx={{ bgcolor: '#223354', position: 'relative' }}>
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
      <Typography variant="h3" sx={{ p: 2 }}>
        {editMode ? 'Update Note' : 'Add Note'}
      </Typography>

      {/* Dialog Content */}
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label={
                <span>
                  Message <span style={{ color: 'red' }}> *</span>
                </span>
              }
              name="message"
              value={form.message}
              onChange={handleChange}
              fullWidth
              margin="dense"
            />
          </Grid>
          <Grid item xs={12}>
            <Datepicker1
              DateValue={form.startDate}
              onDateChange={handleChange}
              size={'medium'}
              label={'Start Date '}
              error={undefined}
              helperText={undefined}
            />
          </Grid>
          <Grid item xs={12}>
            <Datepicker1
              DateValue={form.endDate}
              onDateChange={handleChange}
              size={'medium'}
              label={'End Date '}
              error={undefined}
              helperText={undefined}
            />
          </Grid>
          <Box pl={1} width="100%" ml={1} mt={1}>
            {/* Associated User Roles */}
            <Box sx={{ backgroundColor: 'lightgrey', px: 1 }}>
              <FormControlLabel
                sx={{}}
                control={
                  <Checkbox
                    name="selectAll"
                    checked={roles.selectAll}
                    onChange={handleCheckboxChange}
                  />
                }
                label={
                  <span>
                    <strong> Applicable To</strong>
                    <span style={{ color: 'red' }}> *</span>
                  </span>
                }
              />
            </Box>

            {/* Roles Grid */}
            <Grid container spacing={2} alignItems="center" pl={1}>
              <Grid item xs={12}>
                <FormGroup row>
                  {[
                    { label: 'Admin', name: 'admin' },
                    { label: 'Teacher', name: 'teacher' },
                    { label: 'Student', name: 'student' },
                    { label: 'Admin Staff', name: 'adminStaff' },
                    { label: 'Other Staff', name: 'otherStaff' }
                  ].map((role) => (
                    <FormControlLabel
                      key={role.name}
                      control={
                        <Checkbox
                          name={role.name}
                          checked={roles[role.name as keyof typeof roles]}
                          onChange={handleCheckboxChange}
                        />
                      }
                      label={role.label}
                    />
                  ))}
                </FormGroup>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </DialogContent>

      {/* Actions */}
      <DialogActions sx={{ pt: 2, pb: 3, px: 3 }}>
        <Button onClick={onClose} color="error">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="success">
          {editMode ? 'Update' : 'Add'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddNotePopup;
