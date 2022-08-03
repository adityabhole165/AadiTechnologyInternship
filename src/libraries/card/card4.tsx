import {
    Box,
    Card,
    Typography,
    useTheme,
    Container,
    Fab,
} from '@mui/material';
import PropTypes from 'prop-types';
import { Styles } from 'src/assets/style/student-style'
import BackButton from '../button/BackButton';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import ReplyIcon from '@mui/icons-material/Reply';
import {useNavigate} from 'react-router-dom'

Card4.propTypes = {
    Title: PropTypes.string,
    ViewDetail: PropTypes.object,
    SubjectName: PropTypes.string,
    Assignedate: PropTypes.string,
    CompletedDate: PropTypes.string,
    Attachments: PropTypes.string,
    Details: PropTypes.string
}

function Card4({ ViewDetail, SubjectName, Title, Assignedate, CompletedDate, Attachments, Details }) {
    const theme = useTheme();
    const file_path = "http://riteschool_old.aaditechnology.com/RITeSchool" + "/DOWNLOADS/Homework/" + Attachments;

    // const navigate = useNavigate();
    
    // const getAssignDate = () => {
    //     navigate("/extended-sidebar/Student/Homework/" + Assignedate);
    // }

    const classes = Styles();
    return (
        <>
            <Container>
                <Card sx={{
                    background: `${theme.colors.gradients.pink1}`,
                }}>
                   
                   <BackButton/>
                    <Box
                        display="flex"
                        justifyContent="space-between"
                        p={2}
                        alignItems="flex-start"
                        flexDirection="column"
                        marginTop="10px"
                    >

                        <Typography className={classes.Cardfont1}>{ViewDetail.SubjectName}</Typography>
                        <Typography className={classes.Cardfont2} >{SubjectName}</Typography>

                        <Typography className={classes.Cardfont1}>{ViewDetail.Title}</Typography>
                        <Typography className={classes.Cardfont2} >{Title}</Typography>

                        <Typography className={classes.Cardfont1}>{ViewDetail.AssignedDate}</Typography>
                        <Typography className={classes.Cardfont2} >{Assignedate}</Typography>

                        <Typography className={classes.Cardfont1}>{ViewDetail.CompleteByDate}</Typography>
                        <Typography className={classes.Cardfont2} >{CompletedDate}</Typography>

                        {
                            (Attachments.length === 0) ?
                                null
                                : <>
                                    <Typography className={classes.Cardfont1}>{ViewDetail.AttachmentPath}</Typography>
                                    <Typography sx={{ color: "blue" }} className={classes.Cardfont2}
                                        onClick={(event: React.MouseEvent<HTMLElement>) => {
                                            window.open(file_path);
                                        }}>{Attachments}</Typography>
                                </>

                        }

                        <Typography className={classes.Cardfont1}>{ViewDetail.Details}</Typography>
                        <Typography className={classes.Cardfont2} >{Details}</Typography>

                    </Box>
                </Card>
            </Container>
        </>
    );
}
export default Card4;
