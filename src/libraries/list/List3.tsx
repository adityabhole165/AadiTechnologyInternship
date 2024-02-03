import {
  Box,
  Container,
  Grid,
  List,
  Typography,
  useTheme
} from '@mui/material';

import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { Link as RouterLink, useLocation, useParams } from 'react-router-dom';
import { Styles } from 'src/assets/style/student-style';
import CheckboxImg from '../card/CheckboxImg';

List3.propTypes = {
  data: PropTypes.any,
  handleChange: PropTypes.any,
  check: PropTypes.any,
  Attachments: PropTypes.any,
  FromRoute: PropTypes.string,
  pointerEvent: PropTypes?.string,
  Id: PropTypes?.any
};

function List3({
  data,
  handleChange,
  check,
  Attachments,
  FromRoute,
  pointerEvent,
  Id
}) {
  const [checked, setChecked] = useState(false);

  const checkedbox = (event) => {
    setChecked(event.checked);
    handleChange(event);
  };

  const location = useLocation();
  const PageName = location.pathname.split('/')[2];

  const theme = useTheme();
  const classes = Styles();
  const params = useParams();

  useEffect(() => {
    if (!check) {
      setChecked(false);
    }
  }, [check]);

  return (
    <>
      <Container>
        <List
          className={classes.ListStyle}
          sx={{
            background: checked
              ? `${theme.colors.gradients.selectedlistColor}`
              : `${theme.colors.gradients.listColor}`
          }}
        >
          <Box>
            <Grid container>
              <Grid item xs={2} md={1} sx={{ mx: 'auto' }}>
                <CheckboxImg
                  checked={PageName == 'SMSCenter' ? check : checked}
                  onChange={(event) => checkedbox(event)}
                  value={data.Id}
                  name={data.Name}
                />
              </Grid>

              <Grid item xs={10}>
                <RouterLink
                  key={data.Id}
                  to={
                    `/${
                      location.pathname.split('/')[1]
                    }/MessageCenter/viewMSg/` +
                    data.DetailsId +
                    FromRoute
                  }
                  color="primary"
                  style={{
                    textDecoration: 'none',
                    pointerEvents: pointerEvent
                  }}
                >
                  <Grid item xs={12}>
                    <Typography className={classes.Listfont1}>
                      {data.Subject}
                      {data.Name}
                    </Typography>
                  </Grid>
                  <Grid container xs={12}>
                    <Grid item xs={6}>
                      <Typography>{data.UserName}</Typography>
                    </Grid>

                    <Grid xs={6}>
                      <Typography
                        className={classes.Listfont2}
                        sx={{ display: 'flex', flexDirection: 'row-reverse' }}
                      >
                        {Date}&nbsp;
                        {data.Time}&nbsp;
                        {data.Date}
                      </Typography>
                    </Grid>
                  </Grid>
                </RouterLink>
              </Grid>
              <Grid container>
                <Grid item xs={9}></Grid>
              </Grid>
            </Grid>
          </Box>
        </List>
      </Container>
    </>
  );
}

export default List3;
