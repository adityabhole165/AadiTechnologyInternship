import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import ISchoolnotice, {
  GetSchoolNoticesResult
} from 'src/interfaces/Student/LoginSchoolNotice';
import PageHeader from 'src/libraries/heading/PageHeader';
import { getLoginSchoolNotice } from 'src/requests/LoginSchoolNotice/LoginSchoolNotice';
import { RootState } from 'src/store';
// import List2 from "src/library/Lists small/List1";
import ReplyIcon from '@mui/icons-material/Reply';
import { Box, Fab, Grid, useTheme } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Styles } from 'src/assets/style/student-style';
import ErrorMessages from 'src/libraries/ErrorMessages/ErrorMessages';
import List1 from 'src/libraries/Lists small/List1';

function LoginSchoolNotice() {
  const navigate = useNavigate();
  const classes = Styles();
  const theme = useTheme();

  const styles = {
    paperContainer: {
      // backgroundImage: `url(${school5})`,
      backgroundColor: '#f4f3f2'
    }
  };

  const dispatch = useDispatch();
  const LoginSchoolNoticeList = useSelector(
    (state: RootState) => state.LoginList.LoginSchoolNoticeData
  );

  const asSchoolId = localStorage.getItem('localSchoolId');
  const userId = localStorage.getItem('UserId');

  let location = useLocation();

  const body: ISchoolnotice = {
    asSchoolId: asSchoolId,
    asNoticeId: 0,
    asUserId: userId
  };

  useEffect(() => {
    dispatch(getLoginSchoolNotice(body));
  }, []);

  return (
    <>
      <Grid style={styles.paperContainer}>
        <PageHeader heading={'School Notice'} subheading={''} />
        <span style={{ position: 'relative', left: '20px', top: '-38px' }}>
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
        </span>
        {LoginSchoolNoticeList.length == 0 ? (
          <ErrorMessages Error={'No records found'} />
        ) : (
          LoginSchoolNoticeList.map((items: GetSchoolNoticesResult, i) => (
            <Link
              style={{ color: '#424242', textDecoration: 'none' }}
              key={i}
              to={'/LoginViewSchoolNotice/' + items.Id}
            >
              <List1
                Date={items.Date}
                Name={items.Name}
                FileName={items.FileName}
                key={i}
              />
            </Link>
          ))
        )}
      </Grid>
    </>
  );
}

export default LoginSchoolNotice;
