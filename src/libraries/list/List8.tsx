import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import LoopIcon from '@mui/icons-material/Loop';
import WatchLaterTwoToneIcon from '@mui/icons-material/WatchLaterTwoTone';
import {
  Box,
  Card,
  Container,
  IconButton,
  List,
  Typography,
  useTheme
} from '@mui/material';
import PropTypes from 'prop-types';
import { Styles } from 'src/assets/style/student-style';

List8.propTypes = {
  name: PropTypes.string,
  text: PropTypes.string,
  Datee: PropTypes.string
};

function List8({ name, text, Datee }) {
  // const [value, setValue] = useState();

  const refreshPage = () => {
    // window.location.reload();
    //  setValue({});
  };
  const theme = useTheme();
  const classes = Styles();
  return (
    <>
      <Container>
        <Card>
          <List
            sx={{
              background: `${theme.colors.gradients.pink1}`
            }}
          >
            <Box
              display="flex"
              flexDirection="row"
              alignItems="center"
              justifyContent="space-between"
            >
              <Typography sx={{ color: 'black' }}>
                <b>Feedback</b>
              </Typography>
              <LoopIcon
                sx={{ ml: '4px', mr: '4px', mt: '3px' }}
                onClick={refreshPage}
              />
            </Box>
          </List>

          <List sx={{ marginLeft: '-10px' }}>
            <Typography
              sx={{ marginLeft: '15px', color: 'black' }}
              variant="h4"
            >
              {name}
            </Typography>
            <IconButton>
              <WatchLaterTwoToneIcon />
            </IconButton>
            <Typography sx={{ color: 'black' }} display="inline">
              {text}
            </Typography>

            <Box sx={{ marginTop: '-15px' }}>
              <IconButton>
                <FormatQuoteIcon />
              </IconButton>
              <Typography sx={{ color: 'black' }} display="inline">
                {Datee}
              </Typography>
            </Box>
          </List>
        </Card>
      </Container>
    </>
  );
}

export default List8;
