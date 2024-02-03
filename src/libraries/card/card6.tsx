import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import ReplyIcon from '@mui/icons-material/Reply';
import {
  Box,
  Card,
  Container,
  Divider,
  Fab,
  Typography,
  useTheme
} from '@mui/material';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { Styles } from 'src/assets/style/student-style';

Card6.propTypes = {
  Content: PropTypes.string,
  Date: PropTypes.string,
  FileName: PropTypes.string,
  Id: PropTypes.string,
  IsText: PropTypes.string,
  Name: PropTypes.string
};

function Card6({ Content, FileName, Name }) {
  const theme = useTheme();
  const navigate = useNavigate();
  const file_path =
    localStorage.getItem('siteURL') + '/DOWNLOADS/School%20Notices/' + FileName;

  // 'http://riteschool_old.aaditechnology.com/RITeSchool' +

  const classes = Styles();
  return (
    <>
      <Container>
        <Card
          sx={{
            background: `${theme.colors.gradients.pink1}`,
            marginTop: 10
          }}
        >
          <Box>
            <Fab
              className={classes.backArrow}
              sx={{
                background: `${theme.colors.gradients.pink1}`,
                position: 'absolute'
              }}
              onClick={() => {
                navigate(-1);
              }}
            >
              <ReplyIcon />
            </Fab>
          </Box>
          <Box p={2}>
            <span>
              <Typography>
                <Box>
                  <h3>
                    <></>
                    {Name}
                  </h3>
                </Box>
              </Typography>
              <Divider />

              <Typography>
                <Box
                  sx={{ marginTop: '15px' }}
                  dangerouslySetInnerHTML={{ __html: Content }}
                ></Box>
              </Typography>
            </span>

            <Typography className={classes.Cardfont2}>
              <Box
                display="flex"
                flexDirection="row"
                alignItems="center"
                justifyContent="space-between"
                sx={{
                  mt: 1,
                  ml: 3
                }}
              >
                {FileName}
                <Box>
                  <Typography color="white" variant="subtitle1">
                    {FileName === '' ? null : (
                      <>
                        <Box>
                          <Box
                            onClick={(event: React.MouseEvent<HTMLElement>) => {
                              window.open(file_path);
                            }}
                            sx={{
                              backgroundColor: 'grey',
                              fontSize: 'small',
                              width: '40px',
                              height: '15px',
                              paddingTop: '2px',
                              marginLeft: '10px',
                              color: 'black',
                              marginTop: '-5px',
                              padding: '-7px'
                            }}
                          >
                            <FileDownloadOutlinedIcon />
                          </Box>
                        </Box>
                      </>
                    )}
                  </Typography>
                </Box>
              </Box>
            </Typography>
          </Box>
        </Card>
      </Container>
    </>
  );
}
export default Card6;
