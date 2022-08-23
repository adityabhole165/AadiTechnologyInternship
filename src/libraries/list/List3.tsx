import {
  Box,
  Typography,
  useTheme,
  List,
  Container,
  Grow,
  Checkbox,
  Grid,
  styled,
  FormGroup,
  IconButton
} from '@mui/material';

import { useDispatch } from 'react-redux';
import { positions, spacing } from '@mui/system';
import { Link as RouterLink, useParams, useLocation } from 'react-router-dom';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Styles } from 'src/assets/style/student-style';
import InboxIcon from '@mui/icons-material/Inbox';
import DeleteIcon from '@mui/icons-material/Delete';
import { getSentList } from 'src/requests/Student/Sentmessage';
import { getInboxList } from 'src/requests/Student/InboxMessage';
import { getTrashList } from 'src/requests/MessageCenter/MessaageCenter';
import AttachmentIcon from '@mui/icons-material/Attachment';
import Card33 from '../card/Card33';
const Checked = styled('span')(
  ({ theme }) => `
      Color : white;
      margin-left: -9px;
    margin-top: -10px; `
);

List3.propTypes = {
  data: PropTypes.any,
  handleChange: PropTypes.any,
  check: PropTypes.any,
  Attachments: PropTypes.any,
  FromRoute: PropTypes.string
};

function List3({ data, handleChange, check, Attachments, FromRoute }) {
  const dispatch = useDispatch();

  const [checked, setChecked] = useState(false);

  const checkedbox = (event) => {
    setChecked(event.checked);
    // setChecked(event.target.checked);
    handleChange(event);
  };

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
            background: `${theme.colors.gradients.pink1}`
          }}
        >
          <Box>
            <Grid container>
              <Grid item xs={2} md={1} sx={{ mx: 'auto' }}>
                {/* <Checkbox
                  checked={checked}
                  onChange={(event) => checkedbox(event)}
                  inputProps={{ 'aria-label': 'controlled' }}
                  value={data.DetailsId}
                  name={data.ReceiverDetailsId}
                /> */}
                
                <Card33 
                  checked={checked}
                  onChange={(event) => checkedbox(event)}
                  // inputProps={{ 'aria-label': 'controlled' }}
                  value={data.DetailsId}
                  name={data.ReceiverDetailsId}
                />

              </Grid>

              <Grid item xs={10}>
                <RouterLink
                  key={data.Id}
                  to={
                    `/${location.pathname.split('/')[1]
                    }/MessageCenter/viewMSg/` + data.DetailsId + FromRoute
                  }
                  color="primary"
                  style={{ textDecoration: 'none' }}
                >
                  <Grid item xs={12}>
                    <Typography
                      className={classes.Listfont1}
                      sx={{
                        whiteSpace: 'nowrap',
                        textOverflow: 'ellipsis',
                        overflow: 'hidden'
                      }}
                    >
                      {data.Subject}
                    </Typography>
                  </Grid>
                  <Grid container xs={12}>
                    <Grid item xs={6}>
                      <Typography
                        sx={{
                          whiteSpace: 'nowrap',
                          textOverflow: 'ellipsis',
                          overflow: 'hidden'
                        }}
                      >
                        {data.UserName}
                      </Typography>
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
