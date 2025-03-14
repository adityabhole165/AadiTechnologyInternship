import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import { Box, Divider, Typography, useTheme } from '@mui/material';
import { saveAs } from 'file-saver';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { Styles } from 'src/assets/style/student-style';
import {
  CardDetail,
  CardDetail2,
  ListStyle,
  Wordbreak
} from '../styled/CardStyle';

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
    navigate('/RITeSchool/Common/SchoolNotice', { state: { fromInternal: true } });
  };

  const download = (e) => {
    saveAs(
      localStorage.getItem('SiteURL') +
      '/RITeSchool/' +
      '/DOWNLOADS/School%20Notices/' +
      FileName
    );
  };

  const file_path =
    localStorage.getItem('SiteURL') +
    '/RITeSchool/' +
    '/DOWNLOADS/School%20Notices/' +
    FileName;

  const classes = Styles();

  return (
    <>
      <Box sx={{ height: '600px' }}>
        <ListStyle>
          <Typography variant='h3'> {Name}</Typography>
          <Divider />
          <CardDetail2
            dangerouslySetInnerHTML={{ __html: Content }}
          ></CardDetail2>

          <CardDetail>
            <Wordbreak sx={{ mt: '5px' }}> {FileName}</Wordbreak>

            <Box>
              {FileName === '' ? null : (
                <>
                  <Box sx={{ marginTop: '1px' }}>
                    <a>
                      <FileDownloadOutlinedIcon onClick={download} />
                    </a>
                  </Box>
                </>
              )}
            </Box>
          </CardDetail>
        </ListStyle>
      </Box>
    </>
  );
}
export default Card5;
