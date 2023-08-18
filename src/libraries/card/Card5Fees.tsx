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
import { toast } from 'react-toastify';
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

Card5Fees.propTypes = {
  Content: PropTypes.string,
  Date: PropTypes.string,
  FileName: PropTypes.string,
  Id: PropTypes.string,
  IsText: PropTypes.string,
  Name: PropTypes.string
};

function Card5Fees({ item, Content, FileName, Name, internalFees, downloadReceiptFile ,clickIcon}) {

  const Toaster = () => {
    toast.success('This feature is coming soon. Please download receipt form web app.')
  }
  return (
    <>
      <Container>
        <ListStyle>
          <CardDetail1> {Name}</CardDetail1>

          <CardDetail2 dangerouslySetInnerHTML={{ __html: Content }}></CardDetail2>

          <CardDetail

          >
            <Wordbreak sx={{ mt: "5px" }}>  {FileName}</Wordbreak>

            <Box>
              {FileName === '' ? null : (
                <>
                  <Box
                    sx={{ marginTop: '1px' }}>
                    <a>
                      {internalFees == "internalFees" ?
                        <FileDownloadOutlinedIcon onClick={clickIcon} /> :
                        <>
                        {item.IsConcessionFee == true ? null :
                        <FileDownloadOutlinedIcon 
                        onClick={()=>{downloadReceiptFile(item.ReceiptNo, item.AccountHeaderId)}} />}
                        </>
                      }


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
export default Card5Fees;
