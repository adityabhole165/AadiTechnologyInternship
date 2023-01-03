import {
  Box,
  Divider,
  Card,
  Typography,
  useTheme,
  Container,
  Grid,
  Fab
} from '@mui/material';
import PropTypes from 'prop-types';
import { saveAs } from 'file-saver';
import { Styles } from 'src/assets/style/student-style';
import { useNavigate } from 'react-router-dom';
import ReplyIcon from '@mui/icons-material/Reply';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import BackButton from '../button/BackButton';
import {
  CardDetail1,
  ListStyle,
  CardDetail,
  CardDetail3,
  CardDetail2,
  CardDetail8,
  CardDetail9,
  Wordbreak
} from '../styled/CardStyle';
import { sitePath } from 'src/components/Common/Util';

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
    navigate('/extended-sidebar/Common/SchoolNotice');
  };

  const download = (e) => {
    saveAs(
      localStorage.getItem('SiteURL') + '/RITeSchool/' +
        '/DOWNLOADS/School%20Notices/' +
        FileName
    );
  };

  const file_path =
  localStorage.getItem('SiteURL')+'/RITeSchool/' +
    '/DOWNLOADS/School%20Notices/' +
    FileName;

  const classes = Styles();

  return (
    <>
      <Container>
        <ListStyle>
          <CardDetail1> {Name}</CardDetail1>
          <Divider />
          <CardDetail2 dangerouslySetInnerHTML={{ __html: Content }}></CardDetail2>

          <CardDetail
          
          >
            <Wordbreak sx={{mt:"5px"}}>  {FileName}</Wordbreak>
          
            <Box>
              {FileName === '' ? null : (
                <>
                  <Box
                    sx={{marginTop: '1px'}}>
                    <a>
                      <FileDownloadOutlinedIcon onClick={download} />
                    </a>
                  </Box>
                </>
              )}
            </Box>
          </CardDetail>
      
        </ListStyle>
      </Container>
    </>
  );
}
export default Card5;
