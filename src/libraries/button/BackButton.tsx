import { useNavigate } from 'react-router-dom';
import ReplyIcon from '@mui/icons-material/Reply';
import PropTypes from 'prop-types';
import {
    Box,
    useTheme,
    Fab,
} from '@mui/material';
import { Styles } from 'src/assets/style/student-style'
import { Link as RouterLink, useParams, useLocation } from 'react-router-dom';

BackButton.propTypes = {
    FromRoute: PropTypes?.string
  };

function BackButton({FromRoute}) {
    const theme = useTheme();
    const classes = Styles();
    //const navigate = useNavigate();

    return (
        <>
        <RouterLink
                  to={
                    `/${
                      location.pathname.split('/')[1]
                    }` + FromRoute
                  }
                  color="primary"
                  style={{ textDecoration: 'none' }}
                >
                    <Box >
                
                <Fab className={classes.backArrow}
                    sx={{
                        background: `${theme.colors.gradients.pink1}`,
                        position: 'absolute',
                
                    }}><ReplyIcon /></Fab>
            </Box>
                </RouterLink>
           
        </>
    )   
                  
}

export default BackButton