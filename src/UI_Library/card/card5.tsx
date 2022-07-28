import {
  Box,
  Divider,
  Card,
  Typography,
  useTheme,
  Container,
  Fab,
} from '@mui/material';
import PropTypes from 'prop-types';
import { saveAs } from 'file-saver';
import { Styles } from 'src/assets/style/student-style';
import { useNavigate } from 'react-router-dom';
import ReplyIcon from '@mui/icons-material/Reply';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';

Card5.propTypes = {
  Content: PropTypes.string,
  Date: PropTypes.string,
  FileName: PropTypes.string,
  Id: PropTypes.string,
  IsText: PropTypes.string,
  Name: PropTypes.string
};

function Card5({ Content, FileName, Name }) {
  const theme = useTheme();
  const navigate = useNavigate();

  const redirect = () => {
    navigate('/extended-sidebar/student/Schoolnotice');
  };

  const download = (e) => {
    saveAs(
      'http://riteschool_old.aaditechnology.com/RITeSchool' +
        '/DOWNLOADS/School%20Notices/' +
        FileName
    );
  };

  const file_path =
    'http://riteschool_old.aaditechnology.com/RITeSchool' +
    '/DOWNLOADS/School%20Notices/' +
    FileName;

  const classes = Styles();

  return (
    <>
      <Container>
        <Card
          sx={{
            background: `${theme.colors.gradients.pink1}`,
            marginTop: '25px'
          }}
        >
          <Box
            sx={{
              mb: 2
            }}
          >
            <Fab
              className={classes.backArrow}
              onClick={redirect}
              sx={{
                background: `${theme.colors.gradients.pink1}`,
                position: 'absolute'
              }}
            >
              <ReplyIcon />
            </Fab>
          </Box>
          <Box p={2}>
            <span>
              <Typography>
                <Box
                  sx={{
                    whiteSpace: 'nowrap',
                    textOverflow: 'ellipsis',
                    overflow: 'hidden'
                  }}
                >
                  <b>
                    <></>
                    {Name}
                  </b>
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
                            // onClick={showimg}
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
                            <a>
                              <FileDownloadOutlinedIcon onClick={download} />
                            </a>
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
export default Card5;
