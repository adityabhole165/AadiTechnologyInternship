import { useNavigate } from 'react-router-dom';
import ReplyIcon from '@mui/icons-material/Reply';
import {
    Box,
    useTheme,
    Fab,
} from '@mui/material';
import { Styles } from 'src/assets/style/student-style'

function BackButton() {
    const theme = useTheme();
    const classes = Styles();
    const navigate = useNavigate();

    return (
        <>
           <Box onClick={() => navigate(-1)}>
                <Fab className={classes.backArrow}
                    sx={{
                        background: `${theme.colors.gradients.pink1}`,
                        position: 'absolute',
                    }}><ReplyIcon /></Fab>
            </Box>
        </>
    )   
                   
}

export default BackButton