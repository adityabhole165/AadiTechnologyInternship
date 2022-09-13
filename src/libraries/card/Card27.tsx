import { useTheme, Grid } from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import { Container, Card } from '@mui/material';
import PropTypes from 'prop-types';
import { Styles } from 'src/assets/style/student-style';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Card16 from 'src/libraries/card/Card16';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import ErrorMessages from '../ErrorMessages/ErrorMessages';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'src/store';
// import CurrencyRupeeRoundedIcon from '@mui/icons-material/CurrencyRupeeRounded';
import { getReceiptFileName } from 'src/requests/Fees/Fees';

Card27.propTypes = {
  FeesType: PropTypes.string,
  Fee: PropTypes?.array,
  Heading: PropTypes?.object,
  Note: PropTypes?.string
};

function Card27({ FeesType, Fee, Heading, Note }) {
  const theme = useTheme();
  const classes = Styles();
  const dispatch = useDispatch();

  const FeesObject: any = useSelector(
    (state: RootState) => state.Fees.FeesData2
  );
  const receiptFileName : any = useSelector(
    (state: RootState) => state.Fees.ReceiptFileName
  );

  const schoolId = localStorage.getItem('localSchoolId');
  const academicYearId = sessionStorage.getItem('AcademicYearId');
  const studentId = sessionStorage.getItem('StudentId');
  const authData = JSON.parse(localStorage.getItem("auth")); 
  const userLoginId = authData.data.AuthenticateUserResult.UserLogin
  const filePath = receiptFileName.replace(/\\/g, "/");
    let sitePath = 'https://192.168.1.80';
    let downloadPathOfReceipt = sitePath + filePath;

  const downloadReceiptFile = (receiptNo) =>{
    const getReceiptFileName_body: any ={
        asSchoolId: schoolId,
        asReceiptNo: receiptNo,
        asAcademicYearId: academicYearId,
        asAccountHeaderId: "0",
        asIsRefundFee: "0",
        asStudentId: studentId,
        asSerialNo:"0",
        asLoginUserId: userLoginId
    }
    dispatch(getReceiptFileName(getReceiptFileName_body))
    setTimeout(() => {
      window.open(downloadPathOfReceipt);
    }, 1000);
  }

  return (
    <>
      <Container sx={{ pl: '-8px',pb: '5px', }}>
        <Accordion  className={classes.ListStyle1}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon sx={{ color: 'black' }} />}
            sx={{
              background: `${theme.colors.gradients.pink1}`,
            
            }}
            className={classes.ListStyle1}
          >
            <Typography sx={{ color: 'black' }}>
              <b>{FeesType}</b> &nbsp;:&nbsp;
              {/* <CurrencyRupeeRoundedIcon  sx={{fontSize:'18px',position:'relative',top:'5px'}}/>  */}
              <b>{FeesType == 'Paid Fees' ? FeesObject.TotalFeesPaid : FeesObject.FeesTobePaid} </b>
            </Typography>
          </AccordionSummary>
          {FeesType == 'Paid Fees' ? (
            <AccordionDetails
              sx={{
                borderRadius: 1,
                mb: 1,
              }}
            >
              {FeesObject == undefined ? null : FeesObject.TotalFeesPaid ==
                0 ? (
                <ErrorMessages Error={'No fees has been paid'} />
              ) : Fee == undefined ? null : (
                Fee.map((item, i) => {
                  return item.AmountPayable == 0 ? (
                    <Card
                      sx={{
                        background: `${theme.colors.gradients.pink1}`,
                        marginTop: '0.3rem',
                      }}
                      key={i}
                    >
                      <Grid container direction="row">
                        <Grid
                          xs={6}
                          sx={{
                            borderRight: 1,
                            borderRadius: 1,
                            border: 'none'
                          }}
                        >
                          <Typography
                            component="div"
                            variant="h5"
                            sx={{ pl: 2, pt: 1, pb: 1, textAlign: 'start' }}
                          >
                            {item.OriginalFeeType}
                          </Typography>
                        </Grid>
                        <Grid xs={4}>
                          <Typography
                            component="div"
                            variant="h5"
                            sx={{  textAlign: 'right' }}
                          >
                            {/* <CurrencyRupeeRoundedIcon  sx={{fontSize:'18px',position:'relative',top:'5px'}}/> */}
                            {item.Amount}
                          </Typography>
                        </Grid>
                        <Grid
                          xs={2}
                          sx={{
                            borderRight: 1,
                            borderRadius: 1,
                            border: 'none'
                          }}
                        >
                          <Typography
                            component="div"
                            variant="h5"
                            sx={{ pl: 2, pt: '3px', pb: 1, textAlign: 'start',cursor:'pointer' }}
                            onClick={()=> downloadReceiptFile(item.ReceiptNo)}
                          >
                          <FileDownloadOutlinedIcon />
                          </Typography>
                        </Grid>
                      </Grid>
                    </Card>
                  ) : null;
                })
              )}
            </AccordionDetails>
          ) : (
            <AccordionDetails
              sx={{
                borderRadius: 1,
                mb: 1,
              }}
            >
              <Card16
                Fee={Fee}
                Heading={Heading}
                Note={Note}
                FeesTypes={FeesType}
              />
            </AccordionDetails>
          )}
        </Accordion>
      </Container>
    </>
  );
}

export default Card27;
