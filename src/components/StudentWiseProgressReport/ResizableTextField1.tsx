import { TextField } from '@mui/material';
import { styled } from '@mui/material/styles';

export const ResizableTextField1 = styled(TextField)({
    '& .MuiInputBase-root': {
        resize: 'both',
        overflow: 'auto',
        // minHeight: '100px', // Adjust to your required minimum height
        width: '100%', // Full width
        boxSizing: 'border-box',
    },
    '& .MuiInputLabel-root': {
        color: '#000', // Custom label color
    },
    '& .MuiInputBase-input': {
        color: '#000', // Custom input text color
    },
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            borderColor: '#757575', // Custom border color
        },
        '&:hover fieldset': {
            borderColor: '#000', // Border color on hover
        },
        '&.Mui-focused fieldset': {
            borderColor: '#000', // Border color when focused
        },
    },
});
