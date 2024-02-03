import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import { Box, Container, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import {
  CardDetail,
  CardDetail1,
  CardDetail2,
  ListStyle,
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

function Card5Fees({
  item,
  Content,
  FileName,
  Name,
  internalFees,
  downloadReceiptFile,
  clickIcon
}) {
  const Toaster = () => {
    toast.success(
      'This feature is coming soon. Please download receipt form web app.'
    );
  };
  return (
    <>
      <Container>
        <ListStyle>
          <CardDetail1> {Name}</CardDetail1>

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
                      {internalFees == 'internalFees' ? (
                        <FileDownloadOutlinedIcon
                          onClick={() => {
                            clickIcon(
                              item.ReceiptNo,
                              item.InternalFeeDetailsId,
                              item.SerialNo
                            );
                          }}
                        />
                      ) : (
                        <>
                          {item.IsConcessionFee == true ? null : (
                            <FileDownloadOutlinedIcon
                              onClick={() => {
                                downloadReceiptFile(
                                  item.ReceiptNo,
                                  item.AccountHeaderId
                                );
                              }}
                            />
                          )}
                        </>
                      )}
                    </a>
                  </Box>
                </>
              )}
            </Box>
          </CardDetail>
          <Typography mt={-0.5}>{item.PaidDateString}</Typography>
        </ListStyle>
      </Container>
    </>
  );
}
export default Card5Fees;
