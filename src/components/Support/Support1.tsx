import { Box, Button, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import CommonPageHeader from '../CommonPageHeader';

const Support1 = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const asSchoolId = Number(localStorage.getItem('localSchoolId'));
    const asAcademicYearId = Number(sessionStorage.getItem('AcademicYearId'));
    const asUserId = Number(localStorage.getItem('UserId'));
    const asFolderName = localStorage.getItem('FolderName');
    const [radioBtn, setRadioBtn] = useState('1');
    const [subject, setSubject] = useState('');
    const [description, setDescription] = useState('');
    const [file, setFile] = useState(null);

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleSubmit = () => {
       
    };

    return (
        <>
            <Box sx={{ px: 2 }}>
                <CommonPageHeader
                    navLinks={[{ title: 'Support', path: ' ' }]}
                />
                <Box sx={{ mt: 4 }}>
                    <Typography variant="h5" gutterBottom>
                        Support Request
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        Dear Teacher, <br />
                        Mention the Subject for your Support Request and Description of the problem in detail with exact steps if possible. You may attach a file as a supporting document. It will help our support member to understand the problem in full and speed up the resolution of your request.
                    </Typography>
                    <Box sx={{ mt: 2 }}>
                        <TextField
                            fullWidth
                            label="Subject"
                            variant="outlined"
                            value={subject}
                            onChange={(e) => setSubject(e.target.value)}
                            sx={{ mb: 2 }}
                        />
                        <TextField
                            fullWidth
                            label="Description"
                            variant="outlined"
                            multiline
                            rows={4}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            sx={{ mb: 2 }}
                        />
                        <Button
                            variant="contained"
                            component="label"
                            sx={{ mb: 2 }}
                        >
                            Attach File
                            <input
                                type="file"
                                hidden
                                onChange={handleFileChange}
                            />
                        </Button>
                        {file && (
                            <Typography variant="body2">
                                Attached file: {file.name}
                            </Typography>
                        )}
                        <Box sx={{ mt: 2 }}>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleSubmit}
                            >
                                Submit Request
                            </Button>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </>
    );
};

export default Support1;
