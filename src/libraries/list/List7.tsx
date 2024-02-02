import {
  Box,
  Card,
  Container,
  List,
  Typography,
  useTheme
} from '@mui/material';
import PropTypes from 'prop-types';
import { Styles } from 'src/assets/style/student-style';
import { GetFMsgfromResult } from 'src/interfaces/Student/dashboard';

List7.propTypes = {
  title: PropTypes.string,
  GetMsg: PropTypes.array
};

function List7({ title, GetMsg }) {
  const theme = useTheme();
  const classes = Styles();

  return (
    <Container>
      <Card sx={{ boxShadow: '6px 4px 5px grey !important' }}>
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
              <b>Message from</b>
            </Typography>
          </Box>
        </List>

        {GetMsg.map((items: GetFMsgfromResult, i) => {
          return (
            <List
              key={i}
              sx={{
                marginLeft: '-30px',
                marginTop: '-10px',
                marginBottom: '-10px'
              }}
            >
              <Box>
                <Typography
                  className={classes.Listfont1}
                  // dangerouslySetInnerHTML={{ __html: items.ConfigureMenuContent }}
                  sx={{ marginTop: '7px', marginLeft: '30px' }}
                >
                  TEST
                </Typography>
              </Box>
            </List>
          );
        })}
      </Card>
    </Container>
  );
}

export default List7;
